"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";
import ToolSection from "../components/ToolSection";

export default function ImageResizerPage() {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [format, setFormat] = useState("png");
  const [outUrl, setOutUrl] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  async function resize() {
    if (!file) {
      setMessage("Please select an image first.");
      return;
    }
    setProcessing(true);
    setMessage("");
    const img = new Image();
    const url = URL.createObjectURL(file);
    try {
      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = url;
      });

      let targetW = Math.max(1, width || img.naturalWidth);
      let targetH = Math.max(1, height || img.naturalHeight);

      if (keepAspect) {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (width && !height) targetH = Math.round(targetW / ratio);
        else if (height && !width) targetW = Math.round(targetH * ratio);
        else {
          targetH = Math.round(targetW / ratio);
          targetW = targetW;
        }
      }

      targetW = Math.max(1, Math.min(targetW, 8000));
      targetH = Math.max(1, Math.min(targetH, 8000));

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setMessage("Canvas not supported in this browser.");
        setProcessing(false);
        URL.revokeObjectURL(url);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetW, targetH);

      const mimeType =
        format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
      const quality = format === "png" ? 1 : 0.92;
      const out = canvas.toDataURL(mimeType, quality);
      setOutUrl(out);
      setMessage("Image resized successfully. Download below.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
      URL.revokeObjectURL(url);
    }
  }

  function resetAll() {
    setFile(null);
    setWidth(800);
    setHeight(0);
    setOutUrl("");
    setMessage("Cleared.");
  }

  return (
    <ToolSection
      title="Free Online Image Resizer"
      subtitle="Resize images by width and height in your browser. Keep aspect ratio, choose PNG, JPG, or WebP no upload to server, works on all devices."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Image Resizer",
          description: "Resize images online with aspect ratio lock and PNG, JPG, WebP output. Free, private, in-browser.",
          slug: "/image-resizer",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Image Resizer", slug: "/image-resizer" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("successfully") ? "bg-emerald-600" : ""}
          ${message.includes("wrong") || message.includes("not supported") ? "bg-rose-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}
          ${message.includes("Please select") ? "bg-amber-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200">
          <p className="text-slate-600 mb-3 text-sm sm:text-base">
            Drag and drop an image here or click to choose a file
          </p>
          <input
            type="file"
            accept="image/*"
            className="file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer text-slate-600"
            onChange={(e) => {
              const f = (e.target.files || [])[0];
              setFile(f || null);
              setOutUrl("");
              if (f) setMessage("");
            }}
          />
          {file && (
            <p className="mt-3 text-slate-500 text-sm">
              {file.name}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-sm font-medium text-slate-700">Output dimensions</p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Width (px)</label>
              <input
                className="w-full sm:w-28 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono"
                type="number"
                min={1}
                max={8000}
                value={width || ""}
                onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Height (px)</label>
              <input
                className="w-full sm:w-28 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono"
                type="number"
                min={1}
                max={8000}
                value={height || ""}
                onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={keepAspect}
                onChange={(e) => setKeepAspect(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-slate-700">Keep aspect ratio</span>
            </label>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Format</label>
              <select
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={resize}
            disabled={!file || processing}
          >
            {processing ? "Resizing…" : "Resize image"}
          </button>
          <button
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
            onClick={resetAll}
          >
            Clear all
          </button>
        </div>

        {/* Output */}
        {outUrl && (
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-700 mb-3">Resized image</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={outUrl}
                alt="Resized result"
                className="max-h-64 max-w-full rounded-lg border border-slate-200"
              />
              <a
                href={outUrl}
                download={`resized.${format}`}
                className="inline-block px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition"
              >
                Download {format.toUpperCase()}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This Online Image Resizer
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          An online image resizer is a browser-based tool that changes the dimensions of an image—making it larger or smaller in width and height—without sending your file to a server. Resizing is one of the most common tasks in digital workflows: you might need to shrink a photo to fit a website, enlarge a thumbnail for print, or match the exact dimensions required by a social network or ad platform. This resizer runs entirely in your browser using the canvas API, so your images stay on your device and are never uploaded to any external service. You can set the output width and height in pixels, lock the aspect ratio to avoid distortion, and choose the output format (PNG, JPG, or WebP) before downloading. Whether you are a designer, a blogger, or someone who occasionally needs to adjust image size, this tool provides a fast, private, and reliable way to get the dimensions you need.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is Image Resizing?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Resizing means changing the pixel dimensions of an image. When you reduce the size (for example from 4000×3000 to 800×600), the image contains fewer pixels and usually a smaller file size; when you increase it, the image is stretched to more pixels, which can make it look soft or blocky if the original was small. Unlike cropping, which cuts away part of the image, resizing keeps the whole picture and scales it. That makes it essential for fitting images into layouts, meeting platform size limits, reducing page weight for the web, and preparing files for print or social media. A good resizer preserves sharpness when downscaling by using high-quality smoothing, and lets you choose whether to keep the original aspect ratio or stretch to custom width and height. This tool does all of that in the browser with no installation or account required.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Resizer Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you select an image, the tool loads it in memory and reads its natural width and height. You then enter the desired output width and optionally the height. If you enable the keep-aspect-ratio option, changing the width automatically updates the height (or the other way around) so the image is not stretched or squashed. When you click the resize button, the tool draws the image onto a canvas at the new dimensions using high-quality smoothing, then exports the result in your chosen format. You can preview the resized image and download it with one click. All processing happens locally: no data is sent to a server, which keeps your photos private and allows the tool to work even on slow or restricted networks after the page has loaded. The output is limited to a maximum of 8000 pixels on either side to avoid overloading the browser on very large images.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Key Features</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This image resizer supports common formats as input (JPEG, PNG, WebP, and other browser-supported image types) and lets you choose the output format: PNG for graphics or when you need transparency, JPG for photographs with smaller file size, or WebP for a modern format that often offers the best balance of quality and size. You can set width and height in pixels; when aspect ratio is locked, entering one dimension updates the other automatically. High-quality image smoothing is used when downscaling so the result stays sharp. Because the tool runs in the browser, there is no sign-up, no installation, and no upload to a third party. You get a direct download as soon as the resize is done, and you can repeat the process as many times as you like with different dimensions or formats. The interface works on desktop, tablet, and phone so you can resize images wherever you are.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          First, open the tool in a modern browser on your computer, tablet, or phone. Click or tap the upload area and select an image from your device, or drag and drop a file onto the page. Once the file is selected, enter the width you want in pixels; if you want a specific height as well, enter it in the height field. If you prefer proportional scaling, leave the keep-aspect-ratio option enabled and set only the width or only the height; the other dimension will be calculated automatically. Choose the output format from the dropdown: PNG for lossless quality or transparency, JPG for smaller photo files, or WebP for a good balance. When the settings look right, click the resize button and wait a moment. When processing is finished, the resized image appears with a download button. Click it to save the file to your device. You can change the dimensions or format and resize again, or select a new image and start over. There is no limit on how many images you resize or how many times you use the tool.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Image Dimensions Matter</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Different platforms and uses expect different image sizes. Social networks often recommend specific dimensions for profile pictures, cover photos, and posts; for example, many suggest 1080 pixels on the longer side for feeds. Websites load faster when images are no larger than the size they are displayed at, so resizing a 4000-pixel-wide photo down to 1200 pixels for a blog hero can significantly improve page speed and SEO. E-commerce sites may require product images within a certain range of dimensions for consistent listing appearance. Email attachments and presentations benefit from smaller images so that files stay under size limits and open quickly. By resizing your images to match the target use, you avoid unnecessary file size, reduce bandwidth and storage, and ensure that visuals look sharp and professional instead of stretched, pixelated, or unnecessarily heavy.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Resizing vs. Cropping and Compression</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Resizing changes the pixel dimensions of the whole image; cropping selects a region and discards the rest; compression reduces file size by reducing quality or using a more efficient encoding. They are often used together. You might crop to improve composition, then resize to fit a layout, then compress to reduce file size for the web. This tool focuses on resizing. If you need to crop to a specific area or aspect ratio, use a dedicated cropper; if you need to reduce file size without changing dimensions, use a compressor. Understanding the difference helps you choose the right tool for each step of your workflow. For many users, resizing alone is enough when the goal is to meet dimension requirements or reduce resolution for faster loading.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Common Dimensions and Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Social media and marketing often use fixed dimensions. Instagram square posts are typically 1080×1080 pixels; stories and reels use 1080×1920. Facebook cover photos are often 820×312; YouTube thumbnails are usually 1280×720 or 1920×1080. Blog and website heroes might be 1200×630 or 1920×1080 depending on layout. E-commerce product images are often 2000×2000 or similar for zoom and clarity. This resizer does not enforce these values; you enter the width and height you need. Keeping aspect ratio enabled helps when you only know one dimension (for example the width) and want the height to follow automatically. Use a quick web search for the latest platform recommendations if you are targeting a specific network or ad size.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Security</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Many online tools upload your files to their servers for processing. That can be a concern when images are personal or confidential. This resizer does not upload your images anywhere. The file you select is read by your browser and kept in memory only for the time you are on the page. The resize is done locally using the browser canvas API, and the result is generated on your device. When you download the resized image, it is saved from your browser to your computer or phone. No copy is stored on a remote server or shared with third parties. If you close the tab or clear the page, the image data is gone. This local-first approach is especially important for users who handle sensitive visuals or who prefer not to rely on external services for simple edits.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Best Practices</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When downscaling, use at least the display size you need; for example, if your blog image is shown at 800 pixels wide, resizing to 800 or 1200 pixels wide is usually enough. Avoid upscaling small images to much larger dimensions, as that tends to make them look soft or blocky. Use JPG for photographs when you want smaller files and do not need transparency; use PNG when you need sharp edges or transparency; use WebP when your target platform supports it and you want a good balance of quality and size. Keep aspect ratio enabled unless you intentionally need to stretch or squash the image for a specific layout. If you need both resizing and smaller file size, resize first then use a compressor. Always preview the result before downloading to confirm dimensions and quality.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This resizer is designed for straightforward dimension changes. Very large source images (for example tens of megapixels) may take a few seconds to process depending on your device; the output is capped at 8000 pixels on each side to keep the browser responsive. The tool does not support batch resizing of multiple images in one go; process one image at a time. Advanced options such as sharpening, watermarking, or custom DPI are not included; for those you would use desktop or professional software. The output format follows your selection (PNG, JPG, or WebP); conversion between formats may change file size and quality. For most users—web, social media, email, and simple design tasks—these limitations do not affect the result. For high-volume or professional workflows, consider a dedicated editor or script in addition to this utility.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Resizing images is a simple way to match dimensions, reduce file size, and improve performance. This free online image resizer runs in your browser, supports width and height control with optional aspect ratio lock, and lets you choose PNG, JPG, or WebP output. Your files stay on your device and are never uploaded to a server. Use it for websites, social media, email, or any task where you need an image at a specific size. Keep aspect ratio enabled when you want proportional scaling, pick the right format for your use case, and you will get professional results quickly and safely.
        </p>
      </section>
    </ToolSection>
  );
}
