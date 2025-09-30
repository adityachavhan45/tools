"use client";

import { useEffect, useState } from "react";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import JSZip from "jszip";

// Delay loading pdfjs to client to avoid DOMMatrix errors on SSR
let __pdfjs = null;

export default function PdfToImagePage() {
  const [file, setFile] = useState(null);
  const [rendering, setRendering] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pageCount, setPageCount] = useState(null);
  const [pdfjs, setPdfjs] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (__pdfjs) {
        if (mounted) setPdfjs(__pdfjs);
        return;
      }
      try {
        const lib = await import("pdfjs-dist");
        lib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${lib.version}/pdf.worker.min.js`;
        __pdfjs = lib;
        if (mounted) setPdfjs(lib);
      } catch (e) {
        console.error("Failed to load pdfjs-dist", e);
        if (mounted) setError("⚠️ Failed to load PDF engine. Please refresh.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleFileChange(f) {
    setFile(f);
    setError("");
    setMessage("");
    setImages([]);
    if (f) {
      try {
        const bytes = await f.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: bytes }).promise;
        setPageCount(pdf.numPages);
      } catch {
        setPageCount(null);
        setError("❌ Invalid PDF file.");
      }
    } else {
      setPageCount(null);
    }
  }

  async function renderPdfToImages() {
    setError("");
    if (!file) {
      setError("⚠️ Please select a PDF file.");
      return;
    }
    try {
      setRendering(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const outputs = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport }).promise;
        outputs.push({ url: canvas.toDataURL("image/png"), index: i });
      }
      setImages(outputs);
      setMessage("✅ Conversion complete!");
    } catch (e) {
      console.error(e);
      setError("❌ Failed to render PDF to images.");
    } finally {
      setRendering(false);
    }
  }

  async function downloadAllAsZip() {
    const zip = new JSZip();
    images.forEach((img, i) => {
      const base64 = img.url.split(",")[1];
      zip.file(`page-${i + 1}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pdf-images-${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    setFile(null);
    setImages([]);
    setPageCount(null);
    setError("");
    setMessage("🧹 Cleared!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* SEO JSON-LD */}
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF to Image",
          description: "Convert PDF pages to images (PNG/JPG) instantly in your browser.",
          slug: "/pdf-to-image",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF to Image", slug: "/pdf-to-image" },
        ])}
      />

      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900">📄 PDF to Image Converter</h2>
        <p className="text-gray-600 mt-1">
          Convert each PDF page to a high-quality PNG image directly in your browser.
        </p>

        {/* Alerts */}
        {message && (
          <div className="mt-4 px-4 py-3 bg-green-50 border border-green-300 rounded-lg text-green-800 text-sm shadow">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm shadow">
            {error}
          </div>
        )}

        {/* File Input */}
        <div className="mt-6">
          <label className="block w-full cursor-pointer">
            <span className="sr-only">Choose PDF</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange((e.target.files || [])[0] || null)}
              className="block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-5 file:rounded-full 
                         file:border-0 file:bg-slate-900 file:text-white 
                         hover:file:bg-black cursor-pointer"
            />
          </label>
        </div>

        {/* File Card */}
        {file && (
          <div className="mt-5 flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{file.name}</p>
              {pageCount !== null && (
                <p className="text-gray-500 text-sm">Total Pages: {pageCount}</p>
              )}
              <p className="text-xs text-gray-400">
                Size: {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={renderPdfToImages}
            disabled={rendering || !file}
            className="px-6 py-2 rounded-full bg-slate-900 text-white shadow 
                       hover:bg-black disabled:opacity-50"
          >
            {rendering ? "⏳ Converting…" : "🚀 Convert"}
          </button>
          <button
            onClick={resetAll}
            disabled={!file && !images.length}
            className="px-6 py-2 rounded-full border bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
          {images.length > 0 && (
            <button
              onClick={downloadAllAsZip}
              className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
            >
              ⬇️ Download All (ZIP)
            </button>
          )}
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="border rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={img.url}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-auto hover:scale-[1.02] transition"
                />
                <div className="p-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Page {idx}</span>
                  <a
                    href={img.url}
                    download={`page-${idx + 1}.png`}
                    className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full hover:bg-black"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <section className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">About PDF to Image Tool</h3>
          <p className="text-gray-700 mb-4">
            PDF files are excellent for preserving formatting, but sometimes you need
            the content as images. Converting PDF pages into PNG or JPG makes it easier
            to share visuals, embed documents into websites, or create previews without
            requiring the recipient to open a PDF viewer. This free PDF to Image tool
            lets you do exactly that, quickly and securely, right in your browser.
          </p>

          <p className="text-gray-700 mb-4">
            The entire conversion process runs locally on your device using modern
            browser technology. Your files are never uploaded to a server, which means
            you can safely convert sensitive contracts, reports, or personal documents
            without worrying about privacy. Each page is rendered as a high-quality
            image that you can download individually or bundled together as a ZIP file.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert PDF pages into PNG images instantly</li>
            <li>Preview and download each page individually</li>
            <li>Download all pages together as a ZIP archive</li>
            <li>Runs locally in your browser — fully private</li>
            <li>High-resolution rendering with PDF.js</li>
            <li>Works across devices with no installation required</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Upload a PDF file using the file input above.</li>
            <li>Wait for the tool to detect the total number of pages.</li>
            <li>Click <strong>Convert</strong> to generate images for each page.</li>
            <li>Preview the images directly on the page.</li>
            <li>Download individual pages or use the ZIP option to get all at once.</li>
            <li>Use <strong>Reset</strong> to clear and start fresh if needed.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Business:</strong> Generate image previews of reports or slides for quick sharing.</li>
            <li><strong>Education:</strong> Convert lecture notes into images for use in presentations or study apps.</li>
            <li><strong>Legal:</strong> Create visual copies of contracts or evidence documents for easier review.</li>
            <li><strong>Design & Publishing:</strong> Export PDFs as images for inclusion in web pages or design files.</li>
            <li><strong>Personal:</strong> Turn scanned certificates, IDs, or receipts into easily shareable image files.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔒 Benefits of Local Conversion</h4>
          <p className="text-gray-700 mb-4">
            Many online converters require you to upload documents to a server, which
            can pose risks if your PDFs contain confidential or sensitive information.
            With this tool, everything happens in your browser. No data leaves your
            device, so you maintain complete control over your documents. Local
            conversion is also faster because there are no file transfer delays.
          </p>

          <h4 className="font-semibold mt-4 mb-1">⚡ Advantages of Image Format</h4>
          <p className="text-gray-700 mb-4">
            Converting PDFs to images makes them easier to use in contexts where a PDF
            viewer is not ideal. Images can be embedded into websites, inserted into
            slides, or attached to emails without compatibility issues. They also make
            excellent thumbnails or previews, allowing others to see the content at a
            glance without downloading the full PDF.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🚫 Common Mistakes to Avoid</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Uploading confidential files to unknown online converters</li>
            <li>Forgetting to download images after conversion</li>
            <li>Using low-resolution screenshots instead of proper conversion</li>
            <li>Not renaming image files for clarity when sharing multiple pages</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">📖 Best Practices</h4>
          <p className="text-gray-700 mb-4">
            For professional use, always rename image files meaningfully, such as
            <code>Report-Page1.png</code>. When embedding images into presentations or websites,
            consider compressing them to balance quality and performance. If you need
            editable text rather than flat images, combine this tool with OCR
            (optical character recognition) software. Keep a copy of your original PDF
            before converting, so you can always return to the source if needed.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🌍 Who Can Benefit</h4>
          <p className="text-gray-700 mb-4">
            Students, teachers, lawyers, business professionals, designers, and casual
            users all benefit from PDF-to-image conversion. Students can turn notes
            into images for mobile study apps. Teachers can create quick visual
            references for lessons. Lawyers can prepare image-based exhibits. Designers
            can embed PDF content directly into their layouts. Everyday users can
            convert scanned PDFs into images for easier sharing on messaging apps and
            social media.
          </p>

          <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
          <p className="text-gray-700 leading-relaxed">
            Converting PDFs into images is a simple but powerful way to make documents
            more flexible and shareable. With this PDF to Image tool, the process is
            private, fast, and easy to use. Whether you are preparing reports for
            colleagues, lesson material for students, or simply organizing personal
            records, this tool gives you the freedom to transform PDFs into a format
            that works anywhere. Try it now and take control of your documents with a
            few clicks.
          </p>
        </section>
      </div>
    </main>
  );
}
