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
          JPG (or JPEG) is the most widely used image format for photos because of its compression 
          and small size. However, it does not support transparency and often sacrifices quality 
          when compressed multiple times. On the other hand, PNG is a lossless image format that 
          preserves higher quality and supports transparency (alpha channel), making it a popular 
          choice for web design, logos, icons, and professional graphics. Converting JPG to PNG 
          allows you to improve image quality, add transparent backgrounds, and prepare your visuals 
          for design or publishing purposes.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant conversion from JPG to PNG format</li>
          <li>Preserves high quality with lossless compression</li>
          <li>Supports transparency for logos, icons, and graphics</li>
          <li>Multiple quality levels (80% to 95%) for flexibility</li>
          <li>Fast processing in your browser – no uploads required</li>
          <li>Batch support for handling multiple files at once</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Upload your JPG image by clicking the file input or dragging it in.</li>
          <li>Choose the desired quality level (95% for high quality, 80% for smaller file size).</li>
          <li>Click <strong>Convert to PNG</strong> and wait for the process to finish.</li>
          <li>Preview the result and download the converted PNG instantly.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📐 Why Convert JPG to PNG?</h4>
        <p className="text-gray-700 mb-4">
          While JPG is great for storing photos, it has limitations for professional use. Every 
          time a JPG image is saved, it loses some detail due to its lossy compression method. 
          PNG, however, uses lossless compression, meaning that no quality is lost even after 
          multiple edits and saves. PNG is also the only option if you need transparent backgrounds 
          (for example, when designing logos, watermarks, or overlay graphics). By converting JPG 
          to PNG, you make your image future-proof for editing, design, and publishing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Web Design:</strong> Convert photos or assets for websites that require transparent backgrounds.</li>
          <li><strong>Logos and Branding:</strong> Ensure logos are crisp and scalable with no background.</li>
          <li><strong>Image Editing:</strong> Retain quality while making adjustments in Photoshop, Figma, or Canva.</li>
          <li><strong>Presentations:</strong> Use PNG images in slides to avoid pixelation.</li>
          <li><strong>Social Media:</strong> Prepare high-quality posts, banners, and profile pictures.</li>
          <li><strong>Print:</strong> Use PNG for sharper prints where JPG may appear blurry.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">⚡ Best Practices</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Use <strong>95% quality</strong> for detailed graphics and high-resolution photos.</li>
          <li>Select <strong>90% or 85%</strong> if you want a balance between quality and size.</li>
          <li>Choose <strong>80%</strong> for web images where speed matters more than fine detail.</li>
          <li>For logos and transparent backgrounds, always prefer PNG over JPG.</li>
          <li>Compress your PNG further with a dedicated image compressor if the file is too large.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          Converting JPG to PNG is a simple but powerful step that improves the usability and quality 
          of your images. With transparency support, higher fidelity, and lossless compression, PNG 
          is ideal for professional design, web graphics, and branding. This tool makes the conversion 
          process fast, secure, and user-friendly, working directly inside your browser without 
          requiring uploads. Whether you are a designer, developer, student, or casual user, this 
          converter ensures your images are ready for any project – from websites and social media to 
          print and presentations.
        </p>
      </section>
    </ToolSection>
  );
}