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
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About QR Code Tool
          </h3>
          <p className="text-gray-700 mb-4">
            QR codes (Quick Response codes) are scannable barcodes that store
            data like links, text, or contact details. This free tool lets you
            generate QR codes instantly in your browser with custom size and
            colors, and download them as PNG.
          </p>

          <h4 className="font-semibold mt-4 mb-2">✨ Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Instant QR code generation</li>
            <li>Custom size (128px – 512px)</li>
            <li>Foreground & background color options</li>
            <li>Download as PNG</li>
            <li>Works offline in your browser</li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">📦 Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Share website links quickly</li>
            <li>Create event tickets or passes</li>
            <li>Generate Wi-Fi access codes</li>
            <li>Store vCard or contact info</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
