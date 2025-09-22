"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useMemo, useState } from "react";

function hexToRgb(hex) {
  const m = hex.replace(/^#/, "").match(/^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

export default function ColorPickerPage() {
  const [hex, setHex] = useState("#3498db");
  const [message, setMessage] = useState("");
  const rgb = useMemo(() => hexToRgb(hex), [hex]);

  function copyValue(value) {
    navigator.clipboard.writeText(value);
    showMessage(`📋 Copied: ${value}`, "success");
  }

  function resetColor() {
    setHex("#3498db");
    showMessage("🧹 Reset to default!", "info");
  }

  function showMessage(msg, type) {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "Color Picker",
          description: "Pick colors and copy HEX, RGB, and HSL values.",
          slug: "/color-picker",
          category: "Utilities/Design",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Color Picker", slug: "/color-picker" },
        ])}
      />

      {/* Toast Message */}
      {message.text && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition
          ${message.type === "success" ? "bg-green-500" : ""}
          ${message.type === "error" ? "bg-red-500" : ""}
          ${message.type === "info" ? "bg-blue-500" : ""}`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800">Color Picker / HEX ↔ RGB</h2>
          <p className="text-gray-600 mt-1">
            Pick a color and instantly convert between HEX and RGB formats.
          </p>

          {/* Input Controls */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-14 h-14 cursor-pointer rounded-md border shadow"
            />
            <input
              className="p-3 border rounded-lg w-40 font-mono text-slate-800 focus:ring-2 focus:ring-indigo-400"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
            />
            <div className="p-3 border rounded-lg font-mono bg-slate-50 text-slate-800">
              {rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid HEX"}
            </div>
          </div>

          {/* Copy & Reset Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md hover:scale-105 transition"
              onClick={() => copyValue(hex)}
            >
              Copy HEX
            </button>
            {rgb && (
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:scale-105 transition"
                onClick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
              >
                Copy RGB
              </button>
            )}
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              onClick={resetColor}
            >
              Reset
            </button>
          </div>

          {/* Preview Shades */}
          <div className="mt-8">
            <h4 className="font-semibold mb-3 text-slate-800">Preview Shades</h4>
            <div className="grid grid-cols-4 gap-3">
              {[0.25, 0.5, 0.75, 1].map((alpha) => (
                <div
                  key={alpha}
                  className="h-16 rounded-lg shadow border"
                  style={{ backgroundColor: hex, opacity: alpha }}
                />
              ))}
            </div>
          </div>

          {/* Big Preview Box */}
          <div className="mt-8">
            <h4 className="font-semibold mb-3 text-slate-800">Selected Color</h4>
            <div
              className="h-24 w-full rounded-lg shadow-md border"
              style={{ backgroundColor: hex }}
            />
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-slate-800">
            About Color Picker / HEX ↔ RGB Tool
          </h3>
          <p className="text-gray-700 mb-4">
            This free online tool helps you pick a color and convert it between
            HEX and RGB formats instantly. HEX codes are commonly used in web
            design (e.g., #3498db), while RGB values represent colors as a
            combination of red, green, and blue (e.g., rgb(52, 152, 219)).
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Pick colors using the color input</li>
            <li>Instant HEX ↔ RGB conversion</li>
            <li>Copy values with one click</li>
            <li>Preview different opacity levels</li>
            <li>Responsive design for mobile & desktop</li>
            <li>Reset option to go back to default</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Choose a color using the color picker or type a HEX code.</li>
            <li>Instantly see the RGB equivalent displayed next to the input box.</li>
            <li>Copy HEX or RGB values with one click for use in design or code.</li>
            <li>Preview shades with different opacity levels.</li>
            <li>Reset anytime to go back to the default color.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Web developers working with CSS and HTML colors</li>
            <li>UI/UX designers picking brand colors</li>
            <li>Students learning about color codes</li>
            <li>Content creators designing graphics and posts</li>
            <li>Anyone needing quick HEX ↔ RGB conversion</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
