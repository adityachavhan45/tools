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
      whiteBackground
      hideSidebar
      centerHeader
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

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Image Resizer Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Resize images with aspect-ratio control and export in PNG, JPG, or WebP.
          </p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200 shadow-sm">
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
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
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
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Free Online Image Resizer for Better Website Performance and Social Media Uploads
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Images are one of the most important parts of modern digital content. Whether you are running a website, creating social media posts, designing presentations, managing an online store, or uploading personal photos, image size always matters. Large images can slow down websites, increase storage usage, and create problems while uploading files to online platforms. An image resizer helps solve these issues by allowing users to adjust image dimensions quickly without needing advanced editing skills.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This free online image resizer is designed for people who want a fast and simple way to resize images directly inside their browser. The tool works without heavy software installation, complicated editing panels, or account registration. You simply upload an image, choose the required dimensions, and download the resized version within seconds. Since the processing happens locally in your browser, your files remain private throughout the resizing process.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Image Size Matters on Modern Websites
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Website speed has become an important ranking and user experience factor. Visitors expect webpages to load quickly on both mobile devices and desktop computers. Large unoptimized images often become one of the biggest reasons behind slow websites. When high-resolution images are uploaded without resizing, browsers need more time and bandwidth to display content properly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Resizing images before uploading them can significantly reduce page weight and improve loading speed. Faster websites generally provide a better browsing experience and lower bounce rates. Bloggers, ecommerce store owners, and developers frequently resize images before publishing content online to maintain better performance.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many website owners also combine resizing with tools like{" "}
    <a
      href="https://convertixy.com/image-compressor"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Compressor
    </a>{" "}
    to reduce overall file size even further without noticeably affecting image quality.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    What Does an Image Resizer Actually Do?
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    An image resizer changes the dimensions of an image by adjusting its width and height in pixels. This allows users to make photos smaller or larger depending on where the image will be used. Unlike cropping, resizing keeps the complete image visible while changing its dimensions proportionally or manually.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    For example, a smartphone photo may originally have dimensions of 4000×3000 pixels. While this size may be useful for printing, it is unnecessarily large for a blog post or social media upload. Resizing the image to 1200×900 pixels can make the file much easier to upload and display online.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Reasons People Resize Images
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>Reducing website loading time</li>
    <li>Preparing social media posts and profile pictures</li>
    <li>Optimizing ecommerce product images</li>
    <li>Creating thumbnails and banners</li>
    <li>Adjusting images for presentations and assignments</li>
    <li>Meeting upload dimension requirements</li>
    <li>Saving storage space on devices</li>
    <li>Improving image handling in emails and messaging apps</li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    These use cases show why image resizing has become an essential part of digital content management.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Online Image Resizer Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This tool works completely inside your browser using modern web technologies. Once an image is uploaded, the browser reads its dimensions and allows you to set a new width and height according to your needs. You can maintain the original aspect ratio for balanced resizing or manually enter custom dimensions.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since the resizing process happens locally on your device, your files are not uploaded to external servers. This improves both privacy and speed. After resizing is complete, the new image becomes available instantly for download.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Supported Image Formats
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The image resizer supports multiple widely used image formats including JPG, PNG, and WebP. These formats are commonly used across websites, social media platforms, blogs, mobile apps, and digital design projects.
  </p>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      JPG is ideal for photographs and social media images because it provides smaller file sizes.
    </li>
    <li>
      PNG is commonly used for graphics, logos, screenshots, and transparent images.
    </li>
    <li>
      WebP is a modern image format designed for faster websites and better optimization.
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users who want better website performance often convert files using{" "}
    <a
      href="https://convertixy.com/jpg-to-webp"
      className="text-blue-600 hover:underline font-medium"
    >
      JPG to WebP
    </a>{" "}
    because WebP images usually provide smaller file sizes while maintaining strong visual quality.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Difference Between Resizing and Cropping
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many people confuse image resizing with image cropping, but both processes are different. Resizing changes the dimensions of the entire image while keeping all visible content intact. Cropping removes unwanted areas from the image and focuses only on selected sections.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    For example, if you want to remove extra background from a photo, cropping is the correct option. If you only want to reduce dimensions for faster loading, resizing is usually enough. Some users first crop unnecessary areas and then resize the final image for optimization.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    If you need to remove unnecessary image sections before resizing, tools like{" "}
    <a
      href="https://convertixy.com/image-cropper"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Cropper
    </a>{" "}
    can help improve composition and alignment.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Benefits of Browser-Based Image Resizing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser-based tools are becoming increasingly popular because they are fast, lightweight, and accessible from almost any device. Unlike desktop editing software, online tools do not require installation or advanced technical knowledge.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This image resizer can be used on Windows, Linux, macOS, Android, and iPhone devices directly through a modern browser. Whether you are working from a desktop computer or a smartphone, the resizing process remains simple and accessible.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers and content creators also use{" "}
    <a
      href="https://convertixy.com/google-discover-image-optimizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Google Discover Image Optimizer
    </a>{" "}
    to prepare images for faster indexing and better visibility across modern search platforms.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Tips for Better Resizing Results
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      Maintain aspect ratio to avoid stretched images
    </li>
    <li>
      Use high-resolution originals for cleaner resized output
    </li>
    <li>
      Avoid increasing very small images too much
    </li>
    <li>
      Choose WebP format for modern website optimization
    </li>
    <li>
      Resize images according to actual display dimensions
    </li>
    <li>
      Compress resized images for additional optimization
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Following these practices can help maintain visual quality while reducing unnecessary file size and improving overall performance.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy and Local File Processing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many users worry about uploading personal or confidential images to third-party servers. This tool solves that concern by processing files directly inside your browser. Your images remain on your device during the entire resizing session.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since there is no server upload involved, the resizing process becomes faster and more private. This approach is especially useful for people handling business graphics, sensitive screenshots, private photographs, or confidential documents.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    An image resizer is one of the most useful tools for modern digital workflows. Whether you are managing websites, creating social media content, uploading ecommerce products, preparing assignments, or sharing personal images online, resizing helps improve performance, save storage, and maintain better visual presentation.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 text-justify">
    This free online image resizer provides a fast, simple, and privacy-focused way to resize JPG, PNG, and WebP images directly inside your browser. With support for custom dimensions, aspect ratio control, local processing, and modern image formats, the tool is suitable for beginners as well as professional users who want reliable image optimization without unnecessary complexity.
  </p>
</section>
    </ToolSection>
  );
}
