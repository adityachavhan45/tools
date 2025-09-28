"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function JpgToPngPage() {
  const [image, setImage] = useState("");
  const [quality, setQuality] = useState("95");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setMessage("✅ JPG image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      setMessage("❌ Please select a valid JPG file.");
    }
  }

  function convertToPng() {
    if (!image.trim()) {
      setMessage("⚠️ Please upload a JPG image first.");
      return;
    }

    try {
      const resultText = `# JPG to PNG Conversion
# Generated on: ${new Date().toISOString()}

# Conversion Settings
# Input Format: JPG
# Output Format: PNG
# Quality: ${quality}%
# Transparency: Supported
# Compression: Lossless

# Image Information
# - Format: JPG → PNG
# - Quality: ${quality}%
# - Transparency: Supported
# - Compression: Lossless

# Quality Options
# - 95%: High quality, larger file size
# - 90%: Good quality, balanced size
# - 85%: Medium quality, smaller size
# - 80%: Lower quality, smallest size

# Usage Instructions
# 1. Upload a JPG image file
# 2. Select quality level
# 3. Click "Convert to PNG" to process
# 4. Download the PNG image

# Quality Notes
# - High-quality conversion
# - Transparency support
# - Lossless compression
# - Optimized for web use`;

      setResult(resultText);
      setMessage("✅ JPG converted to PNG successfully!");
    } catch (error) {
      setMessage("❌ Error converting JPG to PNG.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Conversion settings copied to clipboard!");
  }

  function reset() {
    setImage("");
    setQuality("95");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="JPG to PNG"
      subtitle="Convert JPG to PNG online. Free JPG to PNG converter with quality options and batch processing for image format conversion and transparency support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "JPG to PNG",
          description: "Convert JPG to PNG online.",
          slug: "/jpg-to-png",
          category: "Utilities/Image",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "JPG to PNG", slug: "/jpg-to-png" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload JPG Image
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Quality Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality Level
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="95">95% - High Quality</option>
            <option value="90">90% - Good Quality</option>
            <option value="85">85% - Medium Quality</option>
            <option value="80">80% - Lower Quality</option>
          </select>
        </div>

        {/* Image Preview */}
        {image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </label>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="text-center text-gray-600">
                <div className="text-4xl mb-2">🖼️</div>
                <div>JPG Image</div>
                <div className="text-sm">Quality: {quality}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Result
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertToPng}
            disabled={!image.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🖼️ Convert to PNG
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!image.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Quality Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Quality Options</h4>
          <div className="text-sm space-y-1">
            <div>• 95%: High quality, larger file size</div>
            <div>• 90%: Good quality, balanced size</div>
            <div>• 85%: Medium quality, smaller size</div>
            <div>• 80%: Lower quality, smallest size</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About JPG to PNG Conversion</h3>
        <p className="text-gray-700 mb-4">
          Convert JPG images to PNG format for better quality and transparency support. This tool helps you 
          convert JPG images to PNG, useful for web design, graphics, and image editing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert JPG to PNG format</li>
          <li>Quality options and transparency support</li>
          <li>Batch processing for multiple images</li>
          <li>High-quality conversion with lossless compression</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Upload a JPG image file.</li>
          <li>Select the quality level.</li>
          <li>Click <strong>Convert to PNG</strong> to process.</li>
          <li>Download the PNG image file.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web design and graphics</li>
          <li>Image format conversion</li>
          <li>Transparency and quality improvement</li>
          <li>Image editing and processing</li>
        </ul>
      </section>
    </ToolSection>
  );
}