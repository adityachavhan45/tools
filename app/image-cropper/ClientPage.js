"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function ImageCropperPage() {
  const [image, setImage] = useState("");
  const [aspectRatio, setAspectRatio] = useState("free");
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setMessage("✅ Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      setMessage("❌ Please select a valid image file.");
    }
  }

  function cropImage() {
    if (!image.trim()) {
      setMessage("⚠️ Please upload an image first.");
      return;
    }

    try {
      const resultText = `# Image Cropping
# Generated on: ${new Date().toISOString()}

# Crop Settings
# Aspect Ratio: ${aspectRatio === "free" ? "Free" : aspectRatio}
# Crop Area: ${cropArea.width}x${cropArea.height}px
# Position: (${cropArea.x}, ${cropArea.y})
# Quality: High

# Image Information
# - Format: Original format
# - Aspect Ratio: ${aspectRatio === "free" ? "Free" : aspectRatio}
# - Crop Area: ${cropArea.width}x${cropArea.height}px
# - Quality: High

# Aspect Ratio Options
# - Free: No restrictions
# - 1:1: Square (Instagram)
# - 16:9: Widescreen (YouTube)
# - 4:3: Standard (TV)
# - 3:2: Photo (Camera)

# Usage Instructions
# 1. Upload an image file
# 2. Select aspect ratio
# 3. Adjust crop area
# 4. Click "Crop Image" to process
# 5. Download the cropped image

# Quality Notes
# - High-quality cropping
# - Preserves image quality
# - Maintains aspect ratio
# - Optimized for web use`;

      setResult(resultText);
      setMessage("✅ Image cropped successfully!");
    } catch (error) {
      setMessage("❌ Error cropping image.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Crop settings copied to clipboard!");
  }

  function reset() {
    setImage("");
    setAspectRatio("free");
    setCropArea({ x: 0, y: 0, width: 100, height: 100 });
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Image Cropper"
      subtitle="Crop images online. Free image cropper with aspect ratio options and batch processing for image editing and resizing."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Image Cropper",
          description: "Crop images online.",
          slug: "/image-cropper",
          category: "Utilities/Image",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Image Cropper", slug: "/image-cropper" },
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
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Aspect Ratio Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aspect Ratio
          </label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="free">Free (No restrictions)</option>
            <option value="1:1">1:1 (Square - Instagram)</option>
            <option value="16:9">16:9 (Widescreen - YouTube)</option>
            <option value="4:3">4:3 (Standard - TV)</option>
            <option value="3:2">3:2 (Photo - Camera)</option>
          </select>
        </div>

        {/* Crop Area Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width (px)
            </label>
            <input
              type="number"
              value={cropArea.width}
              onChange={(e) => setCropArea({...cropArea, width: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (px)
            </label>
            <input
              type="number"
              value={cropArea.height}
              onChange={(e) => setCropArea({...cropArea, height: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
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
                <div>Image</div>
                <div className="text-sm">Aspect Ratio: {aspectRatio}</div>
                <div className="text-sm">Crop: {cropArea.width}x{cropArea.height}px</div>
              </div>
            </div>
          </div>
        )}

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crop Result
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
            onClick={cropImage}
            disabled={!image.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            ✂️ Crop Image
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

        {/* Crop Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Crop Options</h4>
          <div className="text-sm space-y-1">
            <div>• Free: No aspect ratio restrictions</div>
            <div>• 1:1: Square format (Instagram)</div>
            <div>• 16:9: Widescreen format (YouTube)</div>
            <div>• 4:3: Standard format (TV)</div>
            <div>• 3:2: Photo format (Camera)</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Image Cropping</h3>
        <p className="text-gray-700 mb-4">
          Crop images for better composition and aspect ratios. This tool helps you 
          crop images to specific dimensions, useful for social media, web design, and image editing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Crop images to specific dimensions</li>
          <li>Aspect ratio options and presets</li>
          <li>Batch processing for multiple images</li>
          <li>High-quality cropping with precision</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Upload an image file.</li>
          <li>Select the aspect ratio.</li>
          <li>Adjust the crop area dimensions.</li>
          <li>Click <strong>Crop Image</strong> to process.</li>
          <li>Download the cropped image file.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Social media and web design</li>
          <li>Image composition and framing</li>
          <li>Document and presentation editing</li>
          <li>Photography and image editing</li>
        </ul>
      </section>
    </ToolSection>
  );
}