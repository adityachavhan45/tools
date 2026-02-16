"use client";

import { useState, useCallback } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

const ASPECT_RATIOS = [
  { value: "free", label: "Free", ratio: null },
  { value: "1:1", label: "1:1 (Square)", ratio: 1 },
  { value: "16:9", label: "16:9 (Widescreen)", ratio: 16 / 9 },
  { value: "4:3", label: "4:3 (Standard)", ratio: 4 / 3 },
  { value: "3:2", label: "3:2 (Photo)", ratio: 3 / 2 },
];

function getRatioFromValue(value) {
  const r = ASPECT_RATIOS.find((a) => a.value === value);
  return r ? r.ratio : null;
}

function centerCrop(imgW, imgH, cropW, cropH) {
  const w = Math.min(cropW, imgW);
  const h = Math.min(cropH, imgH);
  const x = Math.max(0, Math.min(imgW - w, Math.round((imgW - w) / 2)));
  const y = Math.max(0, Math.min(imgH - h, Math.round((imgH - h) / 2)));
  return { x, y, width: w, height: h };
}

export default function ImageCropperPage() {
  const [image, setImage] = useState("");
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState("free");
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const clampToImage = useCallback(
    (w, h) => {
      let width = Math.max(1, Math.min(w, imageDimensions.width));
      let height = Math.max(1, Math.min(h, imageDimensions.height));
      const ratio = getRatioFromValue(aspectRatio);
      if (ratio != null) {
        if (width / height > ratio) width = Math.round(height * ratio);
        else height = Math.round(width / ratio);
        width = Math.max(1, Math.min(width, imageDimensions.width));
        height = Math.max(1, Math.min(height, imageDimensions.height));
      }
      const { x, y, width: cw, height: ch } = centerCrop(
        imageDimensions.width,
        imageDimensions.height,
        width,
        height
      );
      setCropArea({ x, y, width: cw, height: ch });
    },
    [aspectRatio, imageDimensions.width, imageDimensions.height]
  );

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      setMessage("Please select a valid image file (JPG, PNG, or WebP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (!dataUrl) return;
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        setImage(dataUrl);
        setImageDimensions({ width: w, height: h });
        setCropArea({ x: 0, y: 0, width: w, height: h });
        setResult("");
        setMessage("Image loaded. Set crop size and click Crop image.");
      };
      img.onerror = () => setMessage("Failed to load image.");
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  function handleAspectRatioChange(value) {
    setAspectRatio(value);
    if (!imageDimensions.width || !imageDimensions.height) return;
    const ratio = getRatioFromValue(value);
    if (ratio == null) return;
    let w = cropArea.width;
    let h = cropArea.height;
    if (w / h > ratio) w = Math.round(h * ratio);
    else h = Math.round(w / ratio);
    clampToImage(w, h);
  }

  function handleCropDimensionChange(field, value) {
    const num = Math.max(1, parseInt(value, 10) || 1);
    if (field === "width") clampToImage(num, cropArea.height);
    else clampToImage(cropArea.width, num);
  }

  function cropImage() {
    if (!image.trim() || !imageDimensions.width) {
      setMessage("Please upload an image first.");
      return;
    }
    setProcessing(true);
    setMessage("");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setMessage("Canvas not supported in this browser.");
          setProcessing(false);
          return;
        }
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        );
        const mime = image.startsWith("data:image/png") ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mime, 0.92);
        setResult(dataUrl);
        setMessage("Cropped successfully. Download your image below.");
      } catch (err) {
        setMessage("Something went wrong while cropping. Please try again.");
      } finally {
        setProcessing(false);
      }
    };
    img.onerror = () => {
      setMessage("Failed to process image.");
      setProcessing(false);
    };
    img.src = image;
  }

  function reset() {
    setImage("");
    setImageDimensions({ width: 0, height: 0 });
    setAspectRatio("free");
    setCropArea({ x: 0, y: 0, width: 100, height: 100 });
    setResult("");
    setMessage("Cleared.");
  }

  return (
    <ToolSection
      title="Free Online Image Cropper"
      subtitle="Crop images to any aspect ratio in your browser. Square, 16:9, 4:3, or free no upload to server, works on all devices."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Image Cropper",
          description: "Crop images online to square, 16:9, 4:3, or custom size. Free, private, in-browser.",
          slug: "/image-cropper",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Image Cropper", slug: "/image-cropper" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("loaded") || message.includes("successfully") ? "bg-emerald-600" : ""}
          ${message.includes("Please select") || message.includes("Failed") || message.includes("wrong") ? "bg-rose-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}
          ${message.includes("Canvas") ? "bg-amber-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200">
          <p className="text-slate-600 mb-3 text-sm sm:text-base">
            Choose an image to crop (JPG, PNG, WebP)
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer text-slate-600"
          />
        </div>

        {/* Aspect ratio */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <label className="block text-sm font-medium text-slate-700 mb-2">Aspect ratio</label>
          <select
            value={aspectRatio}
            onChange={(e) => handleAspectRatioChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
          >
            {ASPECT_RATIOS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Crop dimensions – only when image loaded */}
        {image && imageDimensions.width > 0 && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Width (px)</label>
              <input
                type="number"
                min={1}
                max={imageDimensions.width}
                value={cropArea.width}
                onChange={(e) => handleCropDimensionChange("width", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Height (px)</label>
              <input
                type="number"
                min={1}
                max={imageDimensions.height}
                value={cropArea.height}
                onChange={(e) => handleCropDimensionChange("height", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <p className="text-xs text-slate-500 col-span-2">
              Crop is centered on the image. Max: {imageDimensions.width} × {imageDimensions.height} px.
            </p>
          </div>
        )}

        {/* Preview */}
        {image && (
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-700 mb-2">Preview</p>
            <div className="relative inline-block max-w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={image}
                alt="Uploaded"
                className="max-h-64 w-auto block"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Crop area: {cropArea.width} × {cropArea.height} px from position ({cropArea.x}, {cropArea.y}).
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={cropImage}
            disabled={!image.trim() || processing}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {processing ? "Cropping…" : "Crop image"}
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
          >
            Clear all
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-700 mb-3">Cropped image</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={result}
                alt="Cropped result"
                className="max-h-48 rounded-lg border border-slate-200"
              />
              <a
                href={result}
                download="cropped-image.png"
                className="inline-block px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition"
              >
                Download cropped image
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This Online Image Cropper
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          An online image cropper is a browser-based tool that lets you trim an image to a chosen region or aspect ratio without installing software or sending your files to a server. Cropping is one of the most common edits in photography and design: it improves composition, removes unwanted edges, and adapts a picture to formats required by social networks, websites, or print. This cropper runs entirely in your browser, so your images stay on your device and are never uploaded to any external service. You can crop to a free size or to fixed ratios such as square (1:1), widescreen (16:9), standard (4:3), or photo (3:2), and then download the result with one click. Whether you need a profile picture, a YouTube thumbnail, or a product image for a listing, this tool provides a fast, private, and reliable way to get the exact crop you need.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is Image Cropping?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Cropping means selecting a rectangular area within an image and discarding the rest. The result is a new image that contains only the selected region, at the same or a lower resolution depending on the dimensions you choose. Unlike resizing, which scales the whole image, cropping changes the frame: you decide what stays in and what is cut off. That makes it essential for fixing composition after a shot, fitting an image to a specific aspect ratio (for example Instagram’s square or a YouTube thumbnail’s 16:9), or removing distractions from the edges. A good crop can turn an average photo into a stronger one by focusing the viewer’s attention on the subject and removing empty or cluttered areas. In design and marketing, cropping ensures that visuals look consistent across slides, banners, and social posts.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Cropper Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you upload an image, the tool loads it in your browser and reads its dimensions. You then choose an aspect ratio from the list or leave it on free for a custom width and height. The crop area is applied from the centre of the image by default, so you get a balanced frame without having to set X and Y manually. You can type the exact width and height in pixels; if an aspect ratio is selected, changing one dimension updates the other to keep the ratio. When you click the crop button, the tool draws the selected region onto a canvas and exports it as a new image file. You can preview the result and download it in one step. All of this happens locally: no data is sent to a server, which keeps your photos private and allows the tool to work even on slow or restricted networks after the page has loaded.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Key Features</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This image cropper supports common formats such as JPEG, PNG, and WebP. You can set a fixed aspect ratio (1:1 for squares, 16:9 for widescreen, 4:3 and 3:2 for standard and photo layouts) or crop freely by entering any width and height. The crop is always centred on the image, which is ideal for profile pictures, thumbnails, and product shots where the subject is in the middle. Pixel dimensions are shown so you can match platform requirements: for instance, 1080×1080 for Instagram or 1920×1080 for a YouTube thumbnail. Because the tool runs in the browser, there is no sign-up, no installation, and no upload to a third party. You get a direct download link as soon as the crop is done, and you can repeat the process as many times as you like with different settings or images.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          First, open the tool in a modern browser on your computer, tablet, or phone. Click or tap the upload area and select an image from your device, or drag and drop a file onto the page. Once the image is loaded, you will see its preview and the current crop dimensions. Choose an aspect ratio from the dropdown if you want a fixed ratio; otherwise leave it on free. Then adjust the width and height in pixels. The crop is applied from the centre, so you do not need to set position manually. When the numbers look right, click the crop button and wait a moment. When processing is finished, the cropped image appears with a download button. Click it to save the file to your device. You can change the dimensions and crop again, or upload a new image and start over. There is no limit on how many images you crop or how many times you use the tool.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Aspect Ratios Matter</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Different platforms and media expect different aspect ratios. Instagram posts and profile pictures are often square (1:1), while YouTube thumbnails and many desktop wallpapers use 16:9. Television and some presentations use 4:3; many cameras and prints use 3:2. If you upload an image in the wrong ratio, the platform may add letterboxing, crop it automatically, or stretch it, which can look unprofessional. By cropping your image to the correct ratio before uploading, you keep full control over what is visible and avoid unexpected cuts or black bars. This cropper gives you presets for the most common ratios and also a free mode when you need a custom size for a website, a poster, or an ad. Knowing the target ratio in advance saves time and ensures your visuals look consistent everywhere they are used.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Social media managers and content creators use croppers to prepare images for Instagram, Facebook, Twitter, and LinkedIn. A single photo can be turned into a square post, a story format, or a cover image by cropping to the right ratio and size. Photographers and designers crop to improve composition, remove unwanted elements, or adapt a shot for print or web. E-commerce sellers crop product photos to a uniform size so listings look neat and load quickly. Educators and students crop screenshots and diagrams to fit slides or reports. Bloggers and marketers crop hero images and thumbnails to improve click-through and readability. Even casual users crop profile pictures, holiday photos, or documents for IDs and forms. Because the tool works in the browser and does not require an account, it is suitable for one-off tasks as well as repeated use. Whatever your goal, cropping before uploading or publishing gives you a cleaner, more professional result.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Security</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Many online tools ask you to upload files to their servers for processing. That can be a concern when the images are personal, confidential, or commercially sensitive. This cropper does not upload your images anywhere. The file you select is read by your browser and kept in memory only for the time you are on the page. The cropping is done locally using the browser’s canvas API, and the result is generated on your device. When you download the cropped image, it is saved from your browser to your computer or phone. No copy is stored on a remote server or shared with third parties. If you close the tab or clear the page, the image data is gone. This local-first approach is especially important for users who handle sensitive visuals or who prefer not to rely on external services for simple edits.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Best Practices</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Before cropping, check the recommended dimensions for the platform you are targeting. For example, Instagram recommends 1080×1080 for square posts and 1080×1350 for portraits; YouTube suggests 1280×720 or 1920×1080 for thumbnails. Use at least these sizes so the image stays sharp when displayed. If you crop to a much smaller size, the result may look blurry on large screens. Keep a copy of the original image before cropping, especially if you might need different crops later or want to revert. When you use a fixed aspect ratio, the tool keeps the ratio locked so you only need to change one dimension; the other updates automatically. For profile pictures and logos, a square crop often works best; for banners and videos, 16:9 is standard. If you are unsure, try the free mode first and enter the exact width and height required by your platform or design.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Cropping vs. Resizing</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Cropping and resizing are different operations. Cropping selects a region and removes the rest, so the output image has a new frame and possibly fewer pixels. Resizing scales the entire image up or down without changing what is visible; the aspect ratio can stay the same or be stretched. When you crop, you lose the areas outside the crop box permanently (unless you keep the original). When you resize, you keep the whole scene but may lose sharpness when downscaling or gain blur when upscaling. For social media and web use, cropping is often used to match aspect ratio and focus the frame, while resizing is used to reduce file size or fit maximum dimensions. This tool focuses on cropping; for resizing or compression you can use a dedicated image resizer or compressor. Combining cropping with resizing in your workflow gives you full control over both composition and file size.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This cropper is designed for straightforward rectangular cropping. The crop is always centred; you cannot drag a custom region to one side or corner in this interface. For advanced control such as freeform selection or multiple crops in one go, you might use desktop software or a more advanced web editor. Very large images (for example tens of megapixels) may take a few seconds to process depending on your device. The output format matches the input where possible (e.g. PNG stays PNG, JPEG stays JPEG) for quality and compatibility. The tool works best in modern browsers that support the canvas API; if you use an older browser, you may need to update it. For most users—social media, thumbnails, profile pictures, and simple design tasks—these limitations do not affect the result. For professional retouching or complex layouts, consider a full-featured editor in addition to this utility.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Cropping is a simple but powerful way to improve your images and adapt them to any platform or format. This free online image cropper runs in your browser, supports common aspect ratios and custom sizes, and keeps your files on your device. You can crop to square for Instagram, to 16:9 for YouTube, or to any width and height you need. The process is fast, private, and does not require an account or installation. Use it for social media, presentations, product photos, or personal projects whenever you need a quick, precise crop. Keep the original file, follow platform size guidelines, and you will get professional-looking results every time.
        </p>
      </section>
    </ToolSection>
  );
}
