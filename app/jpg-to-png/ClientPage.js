"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function JpgToPngPage() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file || (file.type !== "image/jpeg" && file.type !== "image/jpg")) {
      setMessage("Please select a valid JPG or JPEG file.");
      setImage("");
      setResult("");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result || "");
      setResult("");
      setMessage("Image loaded. Click Convert to PNG when ready.");
    };
    reader.readAsDataURL(file);
  }

  function convertToPng() {
    if (!image.trim()) {
      setMessage("Please upload a JPG image first.");
      return;
    }
    setProcessing(true);
    setMessage("");
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setMessage("Canvas not supported in this browser.");
          setProcessing(false);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const pngDataUrl = canvas.toDataURL("image/png");
        setResult(pngDataUrl);
        setMessage("Conversion complete. Download your PNG below.");
      } catch {
        setMessage("Something went wrong. Please try again.");
      } finally {
        setProcessing(false);
      }
    };
    img.onerror = () => {
      setMessage("Failed to load image.");
      setProcessing(false);
    };
    img.src = image;
  }

  function reset() {
    setImage("");
    setResult("");
    setMessage("Cleared.");
  }

  return (
    <ToolSection
      title="Free JPG to PNG Converter"
      subtitle="Convert JPG or JPEG images to PNG in your browser. Lossless conversion, no upload to server works on all devices."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "JPG to PNG",
          description: "Convert JPG and JPEG images to PNG online. Lossless, in-browser, no sign-up.",
          slug: "/jpg-to-png",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "JPG to PNG", slug: "/jpg-to-png" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("complete") || message.includes("loaded") ? "bg-emerald-600" : ""}
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
            JPG to PNG Converter Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Convert JPG and JPEG images into high-quality PNG format in seconds.
          </p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200 shadow-sm">
          <p className="text-slate-600 mb-3 text-sm sm:text-base">
            Choose a JPG or JPEG image to convert
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            onChange={handleImageUpload}
            className="file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer text-slate-600"
          />
        </div>

        {/* Preview */}
        {image && (
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-700 mb-2">Preview</p>
            <div className="inline-block max-w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={image}
                alt="Uploaded JPG"
                className="max-h-64 w-auto block"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
          <button
            onClick={convertToPng}
            disabled={!image.trim() || processing}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {processing ? "Converting…" : "Convert to PNG"}
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
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-700 mb-3">PNG image</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={result}
                alt="Converted PNG"
                className="max-h-64 rounded-lg border border-slate-200"
              />
              <a
                href={result}
                download="converted.png"
                className="inline-block px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition"
              >
                Download PNG
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
     <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Transform JPEG Images Into High-Quality PNG Files Without Software
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Image format conversion has become an important part of modern digital workflows. Different websites, design platforms, applications, and editing tools support different image formats depending on quality requirements, transparency support, and compression methods. One of the most common conversions people perform online is converting JPG images into PNG format. This process helps users preserve image quality, improve editing flexibility, and meet platform-specific upload requirements.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This JPG to PNG converter provides a simple and fast way to change image formats directly inside the browser. Users can upload a JPG image, convert it into PNG format within seconds, and download the final file instantly without installing any software. Since the conversion process happens locally on the device, files remain private throughout the entire process.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why People Convert JPG Images Into PNG Format
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    JPG and PNG formats are designed for different purposes. JPG images are usually smaller in size because they use lossy compression. This makes JPG ideal for photographs, social media uploads, and websites where smaller file size matters more than perfect image preservation.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    PNG files, on the other hand, are designed for higher image preservation and transparency support. Designers, developers, students, content creators, and businesses often prefer PNG when they need cleaner graphics, sharper text, or transparent backgrounds. Because PNG uses lossless compression, image quality remains more stable during repeated editing and saving.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users who later want smaller optimized versions of PNG images often use{" "}
    <a
      href="https://convertixy.com/image-compressor"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Compressor
    </a>{" "}
    to reduce file size while maintaining acceptable visual quality.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Understanding the Main Difference Between JPG and PNG
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    JPG format is mainly optimized for photographs and smaller file sizes. It reduces image size by removing some visual information that may not be immediately noticeable to the human eye. This process helps reduce storage usage and improve loading speed on websites.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    PNG format focuses more on preserving image details. It supports transparent backgrounds and keeps image data more accurately during editing. This makes PNG useful for graphics, screenshots, logos, UI elements, presentations, diagrams, and digital artwork where image clarity is important.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Converting a JPG image into PNG does not magically restore details already lost during JPG compression, but it helps prevent additional quality reduction during future editing and saving operations.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Situations Where PNG Works Better
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>Creating logos and transparent graphics</li>
    <li>Designing website elements and interface components</li>
    <li>Editing screenshots and diagrams</li>
    <li>Preparing images for presentations and documents</li>
    <li>Preserving visual quality during repeated editing</li>
    <li>Uploading graphics to platforms that require PNG format</li>
    <li>Creating overlays for videos and social media content</li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    These situations explain why PNG remains one of the most popular image formats for design-related workflows.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This JPG to PNG Converter Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This converter works completely inside the browser using modern web technologies. After selecting a JPG image, the browser processes the file locally and converts it into PNG format within seconds. Once the conversion finishes, the PNG file becomes available for download immediately.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since no external server upload is required, the process remains fast and private. Users do not need to create accounts, install applications, or share personal files with third-party services.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Designers Prefer PNG Files
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Designers frequently work with layered graphics, icons, logos, screenshots, and interface components where sharpness matters. PNG helps preserve edge clarity and text readability much better than heavily compressed JPG files.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Transparency support is another major advantage. PNG allows transparent backgrounds, making it useful for website logos, product cutouts, overlays, stickers, and social media designs. JPG format does not support transparency, which limits its flexibility for certain creative workflows.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    File Size and Quality Considerations
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    PNG images are often larger than JPG files because they preserve more visual information. This means PNG is usually better for editing and graphics, while JPG remains better for lightweight photo sharing and web performance.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users managing websites often balance quality and performance carefully. They may use PNG for graphics and logos while using JPG or WebP for photographs. Many developers also convert optimized PNG images using{" "}
    <a
      href="https://convertixy.com/jpg-to-webp"
      className="text-blue-600 hover:underline font-medium"
    >
      JPG to WebP
    </a>{" "}
    workflows to improve modern website loading performance.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Best Practices Before Converting Images
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>Use the highest-quality original JPG image possible</li>
    <li>Avoid repeatedly saving heavily compressed JPG files</li>
    <li>Resize oversized images before conversion if necessary</li>
    <li>Keep backup copies of original files</li>
    <li>Choose PNG mainly for graphics and editing flexibility</li>
    <li>Use optimized formats for website performance when needed</li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Following these practices helps maintain cleaner image quality and better workflow efficiency during editing and publishing.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Browser-Based Conversion Advantages
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser-based image converters provide several advantages compared to traditional desktop software. Users can access tools instantly without installation, licensing costs, or technical setup. This makes online converters highly convenient for quick tasks and everyday image editing needs.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This converter works on Windows, Linux, macOS, Android, and iPhone devices directly through the browser. Whether users are working from a desktop computer or mobile device, the conversion process remains simple and accessible.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Website owners and content creators often improve visual optimization using{" "}
    <a
      href="https://convertixy.com/google-discover-image-optimizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Google Discover Image Optimizer
    </a>{" "}
    for better loading speed and search visibility across image-heavy webpages.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy and Local File Processing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Privacy concerns are becoming more important for online users, especially when handling personal images, confidential graphics, or business files. Some online converters upload files to remote servers, which may create security concerns for sensitive data.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This JPG to PNG converter processes files locally inside the browser instead of relying on external uploads. Images remain on the device during conversion, helping users maintain better privacy and faster processing speeds.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Difference Between Conversion and Editing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Image conversion changes the file format, while image editing changes the visual content itself. Converting a JPG into PNG does not automatically remove backgrounds, sharpen blurry photos, or improve image resolution. It simply changes the storage format and compression behavior.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    If users need transparent backgrounds or advanced editing, they usually perform those tasks separately using dedicated design or editing software after conversion.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    Converting JPG images into PNG format is a practical solution for users who need stronger image preservation, transparent graphics support, and better editing flexibility. Whether you are a designer, developer, student, blogger, content creator, or casual user, PNG files often provide cleaner and more reliable results for graphics-focused workflows.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 text-justify">
    This free JPG to PNG converter offers a fast, browser-based, and privacy-focused way to change image formats without software installation or account registration. With local file processing, instant conversion, and broad device compatibility, the tool helps users handle image format changes quickly and efficiently whenever PNG output is required.
  </p>
</section>
    </ToolSection>
  );
}
