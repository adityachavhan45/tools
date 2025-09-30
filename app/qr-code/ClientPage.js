"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useRef, useState, useEffect } from "react";
import QRCode from "qrcode";

export default function QrCodePage() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [message, setMessage] = useState("");
  const canvasRef = useRef(null);

  async function generate() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      await QRCode.toCanvas(canvas, text || " ", {
        width: size,
        margin: 2,
        errorCorrectionLevel: "M",
        color: { dark: fgColor, light: bgColor },
      });
      setMessage("✅ QR code generated successfully!");
    } catch (err) {
      setMessage("❌ Failed to generate QR code.");
    }
  }

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  }

  function resetAll() {
    setText("");
    setMessage("🧹 Cleared!");
  }

  useEffect(() => {
    generate();
  }, [text, size, fgColor, bgColor]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      {/* SEO */}
      <JsonLd
        data={buildToolJsonLd({
          name: "QR Code Generator",
          description:
            "Generate QR codes for text, URLs, or contact info in your browser.",
          slug: "/qr-code",
          category: "Utilities/Generators",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "QR Code Generator", slug: "/qr-code" },
        ])}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            QR Code Generator
          </h2>
          <p className="text-gray-600 mt-1">
            Create custom QR codes instantly and download as PNG.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          {/* Inputs */}
          <div className="mt-5 space-y-5">
            <input
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-900 outline-none 
                         text-gray-800 placeholder-gray-400"
              placeholder="Enter text or URL"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Size: {size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                className="flex-1 accent-slate-900"
                onChange={(e) => setSize(parseInt(e.target.value, 10))}
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Foreground</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Background</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={generate}
                className="flex-1 min-w-[120px] px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium shadow hover:bg-slate-800 transition"
              >
                Generate
              </button>
              <button
                onClick={downloadPng}
                className="flex-1 min-w-[120px] px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-500 transition"
              >
                Download PNG
              </button>
              <button
                onClick={resetAll}
                className="flex-1 min-w-[120px] px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium shadow hover:bg-red-600 transition"
              >
                Reset
              </button>
            </div>

            {/* QR Preview */}
            <div className="mt-6 flex justify-center">
              <div className="p-4 bg-gray-50 border rounded-xl shadow">
                <canvas
                  ref={canvasRef}
                  className="bg-white rounded"
                  width={size}
                  height={size}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            About QR Code Generator Tool
          </h3>
          <p className="text-gray-700 mb-4">
            A QR code (short for “Quick Response code”) is a two-dimensional barcode
            that can store large amounts of data in a compact square image. Unlike
            traditional barcodes, which can only hold numbers, QR codes can contain
            text, URLs, contact details, payment info, Wi-Fi credentials, and much
            more. Scanning them with a smartphone camera or QR scanner instantly
            reveals the information. Our free online QR Code Generator lets you create
            customized QR codes directly in your browser without uploading files or
            relying on third-party services.
          </p>

          <p className="text-gray-700 mb-4">
            This tool is designed for anyone who wants to share information quickly and
            securely. Whether you’re a business owner creating QR codes for product
            packaging, a teacher sharing links with students, or just someone who wants
            to generate a Wi-Fi QR code for guests, this generator makes the process
            simple and efficient. You can adjust the size, choose foreground and
            background colors, preview the QR code instantly, and download it as a PNG
            file with just one click.
          </p>

          <h4 className="font-semibold mt-5 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Generate QR codes instantly in your browser</li>
            <li>Customizable size from 128px up to 512px</li>
            <li>Foreground and background color customization</li>
            <li>Supports text, links, and contact information</li>
            <li>Download high-quality PNG for free</li>
            <li>Works offline once loaded — fully private</li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">📦 Common Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Website Links:</strong> Share your website URL quickly without typing.</li>
            <li><strong>Event Tickets:</strong> Add QR codes to tickets or passes for easy scanning.</li>
            <li><strong>Business Cards:</strong> Store vCard information so clients can save your contact instantly.</li>
            <li><strong>Wi-Fi Access:</strong> Create a QR code containing Wi-Fi SSID and password for guests.</li>
            <li><strong>Payments:</strong> Many digital wallets and UPI services use QR codes for quick transactions.</li>
            <li><strong>Education:</strong> Teachers can create QR codes for assignments, forms, or extra resources.</li>
            <li><strong>Marketing:</strong> Brands add QR codes on posters, brochures, and packaging for promotions.</li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Type or paste the text/URL you want to encode.</li>
            <li>Adjust the size slider to select QR resolution.</li>
            <li>Pick foreground and background colors to match your design.</li>
            <li>Click <strong>Generate</strong> to preview your QR code instantly.</li>
            <li>Download the PNG file and use it anywhere — online or print.</li>
          </ol>

          <h4 className="font-semibold mt-5 mb-2">🙋 Frequently Asked Questions</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Is this tool free?</strong> Yes, it’s 100% free with no limits.</li>
            <li><strong>Do QR codes expire?</strong> Static QR codes (like from this tool) never expire.</li>
            <li><strong>Can I generate colored QR codes?</strong> Yes, you can customize colors, but ensure enough contrast for readability.</li>
            <li><strong>Does it work offline?</strong> Yes, once loaded, the generator works without internet.</li>
            <li><strong>Are my QR codes private?</strong> Absolutely — all processing happens locally in your browser.</li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">🚀 Final Thoughts</h4>
          <p className="text-gray-700">
            QR codes have become a universal standard for quick information sharing.
            From mobile payments to event check-ins, from education to marketing,
            their usage is only expanding. With this free QR Code Generator, you can
            create unlimited, high-quality, and customized QR codes instantly without
            worrying about privacy or hidden costs. Whether you’re an individual user,
            a small business owner, or a professional designer, this tool gives you
            flexibility, simplicity, and security — all inside your web browser.
          </p>
        </section>
      </div>
    </main>
  );
}
