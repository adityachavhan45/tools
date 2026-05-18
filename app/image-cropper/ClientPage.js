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
      whiteBackground
      hideSidebar
      centerHeader
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

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Image Cropper Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Crop your images with custom dimensions and fixed aspect ratios in seconds.
          </p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200 shadow-sm">
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
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
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
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Online Image Cropper Tool for Social Media, Websites, and Everyday Editing
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Images are used everywhere today. From social media posts and website banners to online stores and school projects, visuals play a major role in digital content. But many times an image does not fit properly where you want to use it. Sometimes extra background appears in the photo, the dimensions look incorrect, or the subject is not centered properly. That is where image cropping becomes useful. This free online image cropper helps you quickly trim images directly in your browser without downloading heavy software or creating an account.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The tool is designed for people who want a simple and fast way to edit photos for websites, blogs, social media platforms, presentations, ecommerce stores, and personal use. Whether you want to create a profile picture, adjust a thumbnail, remove unwanted edges, or prepare an image for uploading online, this cropper makes the process easy for beginners as well as advanced users.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    What Does Image Cropping Actually Mean?
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Image cropping means cutting away unwanted areas from a photo or graphic so that only the important section remains visible. Instead of editing the entire image, cropping focuses on selecting the exact portion you want to keep. This helps improve composition, remove distractions, and create better framing around the subject.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Cropping is one of the most common editing techniques used in photography, blogging, graphic design, and digital marketing. A properly cropped image often looks cleaner, more professional, and visually balanced compared to the original version. Many websites and apps also require fixed image dimensions, which makes cropping necessary before uploading files online.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why People Use an Online Image Cropper
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Most users do not want to install professional editing software just to make small changes to an image. Desktop software can be heavy, confusing, and unnecessary for simple editing tasks. An online image cropper solves this problem by providing a lightweight solution that works directly inside the browser.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since this tool works online, you can crop images from almost any device including laptops, desktops, tablets, and smartphones. There is no complicated setup process involved. Simply upload your image, select dimensions, crop the picture, and download the final result within seconds.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many website owners also use tools like{" "}
    <a
      href="https://convertixy.com/image-compressor"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Compressor
    </a>{" "}
    after cropping photos so they can reduce file size and improve website loading speed.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Situations Where Cropping Is Useful
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>Creating Instagram profile pictures and social media posts</li>
    <li>Adjusting YouTube thumbnails and blog feature images</li>
    <li>Removing unwanted background objects from photos</li>
    <li>Preparing ecommerce product images for online stores</li>
    <li>Making banners and website hero images fit correctly</li>
    <li>Editing screenshots for presentations and assignments</li>
    <li>Resizing photos for forms, IDs, and portfolios</li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    These are only a few examples. In reality, image cropping is useful for almost every type of digital content creation.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Different Aspect Ratios Explained
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    One important part of cropping is understanding aspect ratios. An aspect ratio defines the relationship between image width and height. Different platforms require different ratios for proper display. If the wrong ratio is used, the image may appear stretched, cut off, or poorly aligned.
  </p>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      1:1 ratio is commonly used for profile pictures and square social media posts
    </li>
    <li>
      16:9 ratio is widely used for YouTube thumbnails, banners, and videos
    </li>
    <li>
      4:3 ratio works well for presentations and traditional displays
    </li>
    <li>
      3:2 ratio is often used in photography and camera images
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Choosing the correct aspect ratio before uploading an image helps maintain better visual quality and prevents automatic cropping by platforms.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Browser-Based Cropper Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This tool performs image cropping directly inside your browser using modern web technologies. Your image is processed locally on your device instead of being uploaded to an external server. This provides better privacy, faster editing, and reduced waiting time.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    After selecting an image, you can enter custom dimensions or choose a fixed aspect ratio. Once cropping is complete, the edited image becomes available for download instantly. Since the process happens locally, your files remain under your control throughout the editing session.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    If you need to optimize image dimensions before cropping, tools like{" "}
    <a
      href="https://convertixy.com/image-resizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Resizer
    </a>{" "}
    can help adjust image resolution more efficiently.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Benefits of Local Image Processing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Privacy is becoming increasingly important for internet users. Many online editing tools upload images to remote servers where files may temporarily remain stored. This can create concerns for people working with personal photos, business graphics, or confidential documents.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since this cropper works locally inside the browser, your files are not transferred to third-party servers during the editing process. This makes the tool safer for sensitive images and also improves speed because there is no need to wait for uploads and downloads.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Tips for Better Cropping Results
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      Keep the main subject near the center for balanced composition
    </li>
    <li>
      Avoid cropping too tightly unless necessary
    </li>
    <li>
      Maintain proper aspect ratios for social media platforms
    </li>
    <li>
      Save the original image before editing
    </li>
    <li>
      Use high-resolution images for cleaner final output
    </li>
    <li>
      Remove distracting objects near image edges
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Following these simple practices can make images look more professional and visually appealing after cropping.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Supported Image Formats
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This cropper supports popular image formats such as JPG, PNG, and WebP. These formats are commonly used across websites, social media platforms, and digital applications.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    JPG images are ideal for photographs and social media content. PNG works better for graphics and transparent images. WebP is a modern image format that provides smaller file sizes while maintaining strong visual quality. Many website owners convert images using{" "}
    <a
      href="https://convertixy.com/jpg-to-webp"
      className="text-blue-600 hover:underline font-medium"
    >
      JPG to WebP
    </a>{" "}
    because it helps improve website speed and performance.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Image Cropping for SEO and Website Performance
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Properly optimized images contribute to better user experience and faster websites. Large and poorly aligned images can negatively affect page loading speed and visual layout. Cropping unnecessary areas reduces image dimensions and helps create cleaner content sections on webpages.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Bloggers and developers often combine cropping with compression and SEO optimization strategies. This creates visually attractive pages without increasing loading time unnecessarily. Search engines generally prefer websites that load quickly and provide a smooth browsing experience for users.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    A reliable image cropper is an essential tool for modern digital work. Whether you are creating content for social media, blogs, ecommerce stores, business websites, or personal projects, cropping helps improve composition and fit images perfectly for different platforms. This online image cropper provides a fast, simple, and privacy-focused solution directly inside your browser without requiring complicated software or account creation.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 text-justify">
    With support for multiple image formats, custom dimensions, fixed aspect ratios, and local processing, the tool is suitable for beginners as well as professional users. By combining proper cropping with smart optimization techniques, you can create cleaner visuals, faster-loading webpages, and more professional digital content for every platform.
  </p>
</section>
    </ToolSection>
  );
}
