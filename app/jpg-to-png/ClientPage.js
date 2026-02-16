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
      plainSidebar
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

      <div className="space-y-6">
        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200">
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
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
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
        <div className="flex gap-3 flex-wrap">
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
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
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
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About JPG to PNG Conversion
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Converting JPG to PNG means turning a JPEG image into a PNG image. JPG (or JPEG) is a format that uses lossy compression: it keeps file sizes small but discards some detail each time the image is saved. PNG uses lossless compression, so it keeps every pixel exactly as it is and supports transparency, which JPG does not. This converter runs in your browser: you select a JPG file, click convert, and download the resulting PNG. No file is sent to a server, so the process is private and fast. People convert JPG to PNG when they need a transparent background, when they want to avoid further quality loss from re-saving, or when a website or application requires PNG format. Whether you are a designer, a student, or someone preparing images for the web or print, this tool provides a simple way to get a PNG from a JPG without installing software.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is the Difference Between JPG and PNG?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          JPG was designed for photographs. It uses lossy compression, which means that when you save a JPG, some visual information is discarded to reduce file size. The result is usually good for viewing, but if you open, edit, and save the same JPG again and again, quality can drop. JPG also does not support transparency: every pixel is either a colour or opaque. PNG was designed for graphics, logos, and images where sharp edges and transparency matter. It uses lossless compression, so saving a PNG does not reduce quality. PNG supports an alpha channel, so pixels can be fully transparent, partly transparent, or opaque. That makes PNG the usual choice for logos, icons, overlays, and web graphics that need to sit on different backgrounds. Converting a JPG to PNG does not add detail that was already lost in the JPG; it prevents further loss from future saves and, if you need a transparent background, you would need to edit the image separately to add transparency. For most uses, converting to PNG is about preserving quality and meeting format requirements.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Converter Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you select a JPG file, the tool loads it in your browser and shows a preview. When you click the convert button, the image is drawn onto an off-screen canvas at its original dimensions. The canvas is then exported as a PNG data URL, which is displayed as the result and offered as a download. The conversion is lossless from the point of view of the pixel data: the PNG contains the same pixels as the JPG you uploaded. Because PNG uses a different compression method, the file size of the PNG may be larger or smaller than the JPG depending on the image content. All of this happens locally; no copy of your image is sent to a server. The tool works in any modern browser that supports the canvas API and works on desktop, tablet, and phone.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">When to Use PNG Instead of JPG</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Use PNG when you need transparency (for example a logo or icon without a background), when you are going to edit the image many times and want to avoid the quality loss that comes with re-saving JPG, or when the target platform or tool requires PNG. Use JPG when you are storing or sharing photographs and want smaller file sizes and when transparency is not needed. Many websites and design tools accept both; some specify one or the other. Print shops and publishers sometimes prefer PNG for graphics because of the lossless quality. Converting an existing JPG to PNG is useful when you have received or downloaded a JPG and need to supply a PNG for a project, or when you want to archive an image in a format that will not lose quality if someone opens and saves it again later.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Open the tool in your browser on a computer, tablet, or phone. Click the upload area or the file button and select a JPG or JPEG image from your device. The image will appear as a preview. Check that it is the correct file. Then click the convert to PNG button. The tool will process the image in a few seconds. When the conversion is complete, the PNG version will appear with a download link. Click the download link to save the PNG file to your device. You can then use the file in your design software, upload it to a website, or attach it to an email. If you need to convert another image, use the clear button and select a new file. There is no limit on how many images you convert; each conversion is done one image at a time.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Quality and File Size</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          PNG is a lossless format, so the converter does not reduce the resolution or colour information of your image. The PNG you get has the same dimensions and the same pixel data as the JPG you uploaded (as your browser decoded it). The file size of the PNG can be larger than the JPG, especially for photographs, because PNG compression is lossless and does not discard detail. For graphics with flat colours and sharp edges, PNG files are often small and efficient. If the resulting PNG is too large for your needs, you can use a separate image compressor or resizer after conversion. This tool focuses only on format conversion; it does not compress or resize the image.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Web designers and developers often need PNGs for logos, icons, and graphics that must have transparent backgrounds or stay sharp at different sizes. Converting a JPG to PNG is a first step when the only available version of an asset is JPG. Students and educators might convert diagrams or screenshots to PNG before inserting them into documents or presentations to avoid further quality loss. Small businesses might convert product photos or branding images to PNG for use in templates or print. Social media managers and content creators sometimes need PNG for overlays or graphics that require transparency. Anyone who has received a JPG from a camera, phone, or download and needs to submit or use a PNG for a form, platform, or project can use this converter to get the right format quickly without installing software.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Security</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This converter runs entirely in your browser. The JPG file you select is read by the browser and kept in memory only for the time you are on the page. The conversion is done locally using the canvas API; no copy of your image is sent to a server or stored by us. When you download the PNG, it is saved from your browser to your device. If you close the tab or leave the page, the image data is gone. This local-first approach is useful when you are converting sensitive or confidential images and do not want to upload them to an online service. You can use the tool on a shared or public computer with less worry about leaving files behind, as long as you download your result and clear the page when you are done.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This tool converts one JPG to PNG at a time. It does not support batch conversion of multiple files in one go; for that you would run the tool multiple times or use a desktop application. The output PNG has the same dimensions as the input JPG; the tool does not resize, crop, or add transparency. If your JPG has no transparent areas (which is normal for JPG), the PNG will also have no transparency; adding a transparent background would require editing in an image editor. Very large images (for example tens of megapixels) may take a few seconds to process or, on low-memory devices, may cause the browser to slow down. The tool accepts only JPG and JPEG files; for other formats you would need a different converter. For most users converting typical photos or graphics, these limitations do not affect the result.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Converting JPG to PNG is a simple way to get a lossless, widely compatible image format from a JPEG file. This free converter runs in your browser, accepts JPG and JPEG, and produces a PNG that you can download with one click. Your files are not uploaded to any server. Use it when you need a PNG for a website, design, or submission, or when you want to avoid further quality loss from re-saving. For transparency or advanced editing, use an image editor after conversion. For quick, private, and straightforward JPG to PNG conversion, this tool is a reliable option.
        </p>
      </section>
    </ToolSection>
  );
}
