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
      plainSidebar
      whiteBackground
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

      <div className="space-y-6">
        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200">
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
        <div className="flex gap-3 flex-wrap">
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
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This Images to PDF Tool
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          An images-to-PDF converter is a browser-based tool that combines multiple image files into a single PDF document. Instead of sending several separate images by email or upload, you get one file that opens in any PDF reader and keeps the order and quality of your pictures. This tool runs entirely in your browser: your images are never uploaded to a server, so the process is private, fast, and works even on slow or restricted networks after the page has loaded. You can add as many images as you like, change their order, remove any you do not need, and then generate the PDF with one click. Whether you are merging scanned documents, creating a photo album, or turning screenshots into a report, this converter provides a simple and reliable way to create a PDF from images without installing software or creating an account.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is an Images-to-PDF Converter?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          An images-to-PDF converter takes one or more image files (such as JPEG, PNG, or WebP) and assembles them into a single PDF. Each image becomes one page of the PDF, in the order you choose. The result is a standard PDF file that you can open on any device, attach to emails, upload to cloud storage, or print. Unlike a folder of loose images, a PDF is a single document that is easy to share and archive. Many organisations and platforms prefer PDFs for submissions, reports, and records because the format preserves layout and is widely supported. This tool does not edit the images themselves; it only places them into a PDF in sequence. You keep full control over which images are included and in what order.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Tool Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you select or drag and drop images onto the page, they are added to a list in the order you provide. You can reorder them using the up and down controls so that the first image in the list becomes page 1 of the PDF, the second becomes page 2, and so on. You can also remove any image from the list before generating the file. When you click the create-PDF button, the tool builds the PDF in your browser using standard web APIs: each image is embedded as a page, with the page size matching the image dimensions so that there is no cropping or letterboxing. When the PDF is ready, a download starts automatically and the file is saved to your device. No copy of your images or the PDF is sent to or stored on any server. The whole process happens locally, which ensures privacy and speed.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Key Features</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This converter supports common image formats: JPEG, PNG, and WebP. You can add multiple images in one go or in several steps; the list shows a thumbnail and the file name for each image so you can see what will be in the PDF. The order of the list is the order of the pages in the PDF, and you can move images up or down or remove them before creating the file. There is no fixed limit on the number of images, though very large or numerous files may take longer to process depending on your device. The output is a standard PDF that works in any reader. Because the tool runs in the browser, there is no sign-up, no installation, and no upload to a third party. You get a direct download as soon as the PDF is created, and you can repeat the process as many times as you like with different images or a different order.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          First, open the tool in a modern browser on your computer, tablet, or phone. Click or tap the upload area and select one or more images, or drag and drop them onto the page. The images appear in a grid with their order number. If the order is wrong, use the up and down arrows next to each image to move it earlier or later in the list. To remove an image, click the remove button on its card. When the list looks correct, click the create-PDF button and wait a few seconds. When processing is finished, the PDF is downloaded automatically to your device. You can open it in any PDF reader to confirm the pages and order. If you want to change something, use clear all, add your images again, adjust the order, and create a new PDF. There is no limit on how many PDFs you create or how many images you combine.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Convert Images to PDF?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          A single PDF is easier to share than many image files. Email and messaging apps often limit the number of attachments or their size; one PDF can hold dozens of pages and is simpler for the recipient to open and print. PDFs are also the standard for official documents, forms, and submissions: many schools, employers, and government portals ask for documents in PDF format. Converting images to PDF lets you turn scans, photos, or screenshots into a proper document that looks the same on every device. Archiving is easier too: one file per project or event instead of a folder full of images. Businesses use this for invoices, receipts, and contracts; students use it for notes and assignments; and individuals use it for photo albums, travel logs, or warranty papers. In short, whenever you need to present or preserve a set of images as one document, converting them to PDF is a practical solution.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Students and educators can merge lecture slides, handwritten notes, or screenshots into one PDF for revision or submission. Freelancers and remote workers can combine screenshots, mock-ups, or signed documents into a single deliverable for clients. Small businesses can turn scanned receipts, invoices, and contracts into one PDF for accounting or records. Photographers and event planners can create simple photo albums or proof sheets as a PDF. Job seekers can assemble portfolio pieces or certificates into one document to attach to applications. Anyone who has multiple images that belong together—whether receipts, ID copies, or holiday photos—can use this tool to create a single, shareable PDF without installing software or paying for a subscription. The same tool works for personal, academic, and professional use.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Security</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Many online converters ask you to upload files to their servers. That can be a concern when the images contain personal or confidential information. This tool does not upload your images anywhere. The files you select are read by your browser and kept in memory only for the time you are on the page. The PDF is built locally using JavaScript and standard web APIs, and the result is generated on your device. When the download starts, the file is saved from your browser to your computer or phone. No copy is stored on a remote server or shared with third parties. If you close the tab or clear the page, the image and PDF data are gone. This local-first approach is especially important for sensitive documents such as IDs, medical records, or business papers. You can use the tool on a shared or public computer with less worry about leaving files behind.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Supported Formats and Quality</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          The tool accepts JPEG, PNG, and WebP images. Each image is embedded in the PDF at its original dimensions, so the quality you get depends on the quality of the source images. High-resolution images produce larger PDFs; smaller or compressed images produce smaller PDFs. There is no automatic compression or resizing; the tool preserves the pixel dimensions of each image. If you need a smaller file size, consider compressing or resizing your images before adding them to the converter. The order of pages in the PDF matches the order of the list on the page, so arrange your images in the right sequence before clicking create. If you have a mix of portrait and landscape images, that is fine: each page will have the size of its image, so the PDF may have varying page dimensions, which is normal and supported by all PDF readers.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Best Practices</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Before creating the PDF, review the list of images and remove any duplicates or mistakes. Use the order controls to put pages in a logical sequence (for example chronological, or by topic). If you are combining scanned documents, ensure the scans are clear and right-side up; the tool does not rotate or edit images. For very large sets of images, consider splitting into multiple PDFs if a single file becomes too big to open or send easily. Naming your images in a clear order (for example 01-intro.png, 02-section1.png) can help you add them in the right sequence. When the PDF is downloaded, open it once to confirm that all pages are present and in the correct order before sharing or submitting. Keeping a copy of the original images is a good idea in case you need to regenerate the PDF with a different order or selection later.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This tool is designed for combining images into a PDF. It does not add text overlays, watermarks, or page numbers; for that you would use a desktop or professional PDF editor. The page size of each PDF page is determined by the image size, so you cannot set a uniform page size for all pages in this tool. Very large images (for example tens of megapixels) or a very high number of images may take longer to process or, on low-memory devices, may cause the browser to slow down. The tool works best in modern browsers that support the APIs used for image and PDF handling. For most users—documents, albums, screenshots, and simple merges—these limitations do not affect the result. For advanced layout or editing, consider a full-featured PDF application in addition to this converter.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Converting images to PDF is a simple way to combine multiple pictures or documents into one file that is easy to share and archive. This free images-to-PDF tool runs in your browser, supports JPEG, PNG, and WebP, and lets you reorder and remove images before creating the PDF. Your files stay on your device and are never uploaded to a server. Use it for receipts, notes, screenshots, photo albums, or any set of images that you want as a single PDF. Arrange the order, click create, and download your document in seconds.
        </p>
      </section>
    </ToolSection>
  );
}
