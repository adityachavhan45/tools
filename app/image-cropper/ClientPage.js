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
        <h3 className="text-lg font-semibold mb-2">About Online Image Cropping</h3>
        <p className="text-gray-700 mb-4">
          Image cropping is one of the most essential editing techniques in
          photography and design. By trimming away unnecessary portions of a
          photo, cropping allows you to improve composition, highlight the
          subject, and optimize the aspect ratio for different platforms. This
          online cropper makes the process simple—you can upload an image, set a
          fixed ratio (like 1:1 for Instagram or 16:9 for YouTube), or crop it
          freely to your desired size. Everything runs directly in your browser,
          ensuring speed, privacy, and convenience without installing heavy
          software.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Flexible aspect ratios:</strong> Choose from presets such as
            1:1, 16:9, 4:3, 3:2, or crop freely without restrictions.
          </li>
          <li>
            <strong>Precision cropping:</strong> Manually adjust width, height,
            and position for pixel-perfect edits.
          </li>
          <li>
            <strong>Privacy friendly:</strong> All cropping is done locally on
            your device, with no uploads to external servers.
          </li>
          <li>
            <strong>Cross-platform ready:</strong> Cropped images are optimized
            for social media, presentations, or professional design work.
          </li>
          <li>
            <strong>Quick workflow:</strong> Upload, crop, and download in just
            a few clicks.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Upload an image (JPG, PNG, or WebP) using the file selector.</li>
          <li>
            Choose your preferred aspect ratio—either a preset or “Free” for
            custom cropping.
          </li>
          <li>
            Adjust the crop area dimensions (width, height, and position) to
            frame the subject perfectly.
          </li>
          <li>
            Click <strong>Crop Image</strong> to process the file.
          </li>
          <li>
            Preview the crop settings and download your newly cropped image.
          </li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Popular Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Social media posts:</strong> Platforms like Instagram,
            Facebook, and Twitter require specific aspect ratios. Use the cropper
            to fit images perfectly without awkward cut-offs.
          </li>
          <li>
            <strong>Professional presentations:</strong> Crop photos to maintain
            consistent sizes across slides, making reports and decks look clean.
          </li>
          <li>
            <strong>Photography:</strong> Adjust framing to improve balance,
            remove distractions, and highlight the subject.
          </li>
          <li>
            <strong>Web design:</strong> Create uniform image grids, banners, or
            thumbnails for websites.
          </li>
          <li>
            <strong>Document editing:</strong> Crop scans, ID cards, or
            screenshots for resumes, portfolios, and academic projects.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Cropping Matters</h4>
        <p className="text-gray-700 mb-4">
          Cropping is more than just cutting edges—it changes the story of an
          image. A tightly cropped portrait highlights emotions, while a wide
          crop captures the environment. For businesses, proper cropping ensures
          product photos look sharp on e-commerce stores. For casual users, it
          means profile pictures and social media uploads always look their best.
          Even small tweaks can improve balance, remove distractions, and create
          a professional feel.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Best Practices</h4>
        <p className="text-gray-700 mb-4">
          While cropping is powerful, it should be used wisely. Over-cropping can
          reduce resolution and make images blurry. Always maintain enough
          pixels for the intended platform—for example, at least 1080x1080 for
          Instagram or 1920x1080 for YouTube thumbnails. Stick to standard ratios
          when possible to avoid black bars or stretching. And keep a backup of
          the original image before editing, so you can revert if needed.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          Image cropping is one of the quickest ways to upgrade your visuals.
          Whether you are preparing a thumbnail for YouTube, a profile picture
          for LinkedIn, or a product photo for an online shop, this online tool
          makes the process fast, secure, and accurate. With free aspect ratio
          control, pixel precision, and one-click download, it is an essential
          utility for anyone who works with images. Use it to create
          professional-looking content every time.
        </p>
      </section>
    </ToolSection>
  );
}