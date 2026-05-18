"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolSection from "../components/ToolSection";

function dataUrlToUint8Array(dataUrl) {
  const base64 = dataUrl.split(",")[1];
  if (!base64) return new Uint8Array(0);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function loadImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      URL.revokeObjectURL(url);
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

export default function ImagesToPdfPage() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCreatePdf() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const isPng = /\.png$/i.test(file.name);
        const isWebP = /\.webp$/i.test(file.name);

        let img;
        if (isPng) {
          img = await pdfDoc.embedPng(arrayBuffer);
        } else if (isWebP) {
          const dataUrl = await loadImageAsDataUrl(file);
          const bytes = dataUrlToUint8Array(dataUrl);
          img = await pdfDoc.embedPng(bytes);
        } else {
          img = await pdfDoc.embedJpg(arrayBuffer);
        }
        const { width, height } = img.scale(1);
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(img, { x: 0, y: 0, width, height });
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `images-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setMessage("PDF created successfully. Check your downloads.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create PDF. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setMessage("Cleared.");
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function moveFile(index, direction) {
    const next = index + direction;
    if (next < 0 || next >= files.length) return;
    setFiles((prev) => {
      const arr = [...prev];
      [arr[index], arr[next]] = [arr[next], arr[index]];
      return arr;
    });
  }

  return (
    <ToolSection
      title="Free Images to PDF Converter"
      // subtitle="Combine multiple images (JPG, PNG, WebP) into one PDF in your browser. No upload to server private and works on all devices."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Images to PDF",
          description: "Convert multiple images (JPG, PNG, WebP) into a single PDF file in the browser. Free, private, no sign-up.",
          slug: "/images-to-pdf",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Images to PDF", slug: "/images-to-pdf" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("successfully") ? "bg-emerald-600" : ""}
          ${message.includes("Failed") ? "bg-rose-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Images to PDF Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Combine multiple images into a single PDF with page order control.
          </p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200 shadow-sm">
          <p className="text-slate-600 mb-3 text-sm sm:text-base">
            Drag and drop images here or click to choose files
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer text-slate-600"
            onChange={(e) => {
              const list = e.target.files ? Array.from(e.target.files) : [];
              setFiles((prev) => [...prev, ...list]);
              e.target.value = "";
            }}
          />
          {files.length > 0 && (
            <p className="mt-3 text-slate-500 text-sm">
              {files.length} image{files.length !== 1 ? "s" : ""} selected. Order = PDF page order.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
          <button
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={handleCreatePdf}
            disabled={!files.length || processing}
          >
            {processing ? "Creating PDF…" : "Create PDF"}
          </button>
          <button
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
            onClick={resetAll}
          >
            Clear all
          </button>
        </div>

        {/* File list with preview, remove, reorder */}
        {files.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Preview and order (top = page 1)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((f, i) => (
                <div
                  key={`${f.name}-${i}`}
                  className="relative border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="p-2 flex items-center justify-between gap-1">
                    <span className="text-xs text-slate-600 truncate flex-1" title={f.name}>
                      {i + 1}. {f.name}
                    </span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveFile(i, -1)}
                        disabled={i === 0}
                        className="p-1 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
                        title="Move earlier"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveFile(i, 1)}
                        disabled={i === files.length - 1}
                        className="p-1 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
                        title="Move later"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="p-1 rounded text-rose-600 hover:bg-rose-50 text-xs font-medium"
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Convert Multiple Images Into One PDF File Online Without Losing Quality
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Managing multiple image files can become frustrating when you need to send documents, screenshots, notes, certificates, or photographs together in a single organized file. Sharing several images individually often creates confusion, increases upload time, and makes documents look unprofessional. This is why many users prefer converting images into a PDF file before sharing or storing them. A single PDF document is easier to manage, easier to upload, and supported across almost every device and platform.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This free Images to PDF tool allows users to combine multiple JPG, PNG, and WebP images into one PDF directly from the browser. There is no need to install heavy software or create an account. The process is simple, fast, and works smoothly on desktops, tablets, and smartphones. Since the conversion happens locally inside the browser, your images remain private throughout the process.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why People Convert Images Into PDF Files
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    PDF files have become one of the most widely accepted document formats on the internet. Schools, offices, government portals, businesses, and online forms often prefer PDF uploads because the formatting remains consistent across all devices. Instead of sending ten separate images one by one, users can combine everything into a single organized PDF document.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Students often convert handwritten notes, assignments, and screenshots into PDF format before uploading them to educational portals. Businesses use PDF files for invoices, reports, contracts, receipts, and presentations. Freelancers and designers also create PDF portfolios because they look cleaner and easier to share with clients.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Before converting images into PDF, many users first optimize image size using{" "}
    <a
      href="https://convertixy.com/image-compressor"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Compressor
    </a>{" "}
    so the final PDF remains smaller and easier to upload online.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Images to PDF Tool Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This tool combines selected images into a single PDF document directly inside the browser. Once images are uploaded, they are arranged according to the selected order. Each image becomes a separate page inside the final PDF file.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users can rearrange image order before generating the PDF. This is especially useful when creating notes, reports, portfolios, or scanned documents that need proper page sequencing. After the PDF is generated, the file becomes instantly available for download.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since the processing happens locally inside the browser, files are not uploaded to external servers. This improves privacy while also reducing waiting time during conversion.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Supported Image Formats
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The converter supports commonly used image formats including JPG, PNG, and WebP. These formats are widely used across websites, mobile devices, social media platforms, and graphic design workflows.
  </p>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      JPG images are widely used for photographs and smartphone pictures.
    </li>
    <li>
      PNG images are commonly used for graphics, screenshots, and transparent visuals.
    </li>
    <li>
      WebP images are optimized for modern websites and faster loading speeds.
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users who work with modern website optimization frequently convert files using{" "}
    <a
      href="https://convertixy.com/jpg-to-webp"
      className="text-blue-600 hover:underline font-medium"
    >
      JPG to WebP
    </a>{" "}
    before combining images into PDF documents.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Benefits of Creating PDF Files From Images
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>Combines multiple images into one organized file</li>
    <li>Improves document sharing and uploading</li>
    <li>Creates professional-looking files</li>
    <li>Works across almost all operating systems and devices</li>
    <li>Reduces confusion caused by multiple separate attachments</li>
    <li>Useful for assignments, reports, invoices, and portfolios</li>
    <li>Easy to store and archive for future reference</li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    These advantages make PDF conversion extremely useful for both personal and professional workflows.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Use Cases for Images to PDF Conversion
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Students often use image-to-PDF converters for homework submissions, handwritten notes, scanned assignments, and project reports. Many online learning platforms require PDF uploads because they are easier to review and download.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Office workers and freelancers combine invoices, receipts, agreements, screenshots, and documents into PDF format before sending them to clients or coworkers. Ecommerce sellers sometimes create PDF catalogs from product images for easier sharing with customers.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Families and casual users also create PDF photo collections for travel memories, scanned documents, and digital archives. Instead of managing dozens of separate images, a single PDF keeps everything properly organized.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Tips for Creating Better PDF Files
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      Arrange images in the correct order before conversion
    </li>
    <li>
      Compress large images before generating the PDF
    </li>
    <li>
      Use clear and readable image quality
    </li>
    <li>
      Remove duplicate or unnecessary images
    </li>
    <li>
      Resize oversized images for smaller PDF output
    </li>
    <li>
      Keep document orientation consistent whenever possible
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users who want smaller PDF files often resize large images first using{" "}
    <a
      href="https://convertixy.com/image-resizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Resizer
    </a>{" "}
    before starting the conversion process.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Browser-Based PDF Conversion Advantages
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser-based tools provide several advantages compared to traditional desktop software. Users do not need installation, subscriptions, or technical knowledge to perform basic document conversion tasks. Everything works directly through a web browser.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This Images to PDF converter works on Windows, Linux, macOS, Android, and iPhone devices. Whether you are working from a desktop computer or a mobile phone, the conversion process remains simple and accessible.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Website owners and bloggers also optimize uploaded visuals using{" "}
    <a
      href="https://convertixy.com/google-discover-image-optimizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Google Discover Image Optimizer
    </a>{" "}
    to improve image visibility and performance across search platforms.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy and Local File Processing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Privacy is an important concern for many users when uploading documents online. Some conversion platforms store uploaded files temporarily on servers, which may create risks for sensitive or personal documents.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This tool avoids that issue by processing files directly inside the browser. Images remain on your device during the entire conversion session. Since no external server upload is required, the process becomes faster and more secure for personal as well as professional usage.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Difference Between PDF Conversion and Image Merging
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Some users confuse PDF conversion with image merging. When images are converted into PDF, each image usually becomes a separate page inside the final document. Image merging, on the other hand, combines visuals into a single large image.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    PDF conversion is generally better for reports, notes, forms, presentations, and official documentation because it creates a clean multi-page structure that is easier to read and share.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    Converting images into PDF files is one of the easiest ways to organize and share multiple visuals professionally. Whether you are a student submitting assignments, a freelancer sending reports, a business owner managing documents, or someone simply organizing personal files, PDF conversion helps simplify digital workflows.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 text-justify">
    This free Images to PDF tool provides a fast, private, and user-friendly solution directly inside the browser without requiring software installation or account creation. With support for JPG, PNG, and WebP images, flexible ordering options, local processing, and instant downloads, the tool is suitable for everyday users as well as professionals who need reliable document conversion online.
  </p>
</section>
    </ToolSection>
  );
}
