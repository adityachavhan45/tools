"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState, useCallback } from "react";

export default function PngToJpgPage() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.9);
  const [outputs, setOutputs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.includes("image/png") || f.name.toLowerCase().endsWith('.png')
    );
    if (droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles]);
      setMessage("");
    } else {
      setMessage("⚠️ Please drop only PNG files.");
    }
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  async function convert() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
    const results = [];
    try {
      for (const file of files) {
        const img = new Image();
        const url = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpgUrl = canvas.toDataURL("image/jpeg", quality);
        results.push({
          name: file.name.replace(/\.png$/i, "") + ".jpg",
          url: jpgUrl,
          size: Math.round((jpgUrl.length * 3) / 4 / 1024),
        });
        URL.revokeObjectURL(url);
      }
      setOutputs(results);
      setMessage("✓ Conversion successful! Your JPG files are ready for download.");
    } catch (error) {
      setMessage("✕ Conversion failed. Please try again with valid PNG files.");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setOutputs([]);
    setMessage("All files cleared.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <JsonLd
        data={buildToolJsonLd({
          name: "PNG to JPG Converter - Free Online Image Conversion Tool",
          description: "Convert PNG images to JPG format online for free. Adjust quality, batch convert, and download instantly in your browser. No software required.",
          slug: "/png-to-jpg",
          category: "Image Converter Tools",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Image Tools", slug: "/image-tools" },
          { name: "PNG to JPG", slug: "/png-to-jpg" },
        ])}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-10">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PNG to JPG Converter
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Convert your PNG images to JPG format instantly, securely, and completely free. No installation needed—everything happens right in your browser with your files staying private.
          </p>
        </div>

        {/* Main Converter Box */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-200">
          <div className="p-8 md:p-10">
            {message && (
              <div className={`mb-6 px-6 py-4 rounded-xl text-sm font-medium transition-all ${
                message.includes("✓") 
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                  : message.includes("✕")
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-cyan-50 text-cyan-800 border border-cyan-200"
              }`}>
                {message}
              </div>
            )}

            {/* Drag & Drop Zone */}
            <div
              onDrop={onDrop}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                dragActive
                  ? "border-cyan-500 bg-cyan-50 shadow-lg"
                  : "border-gray-300 hover:border-cyan-400 hover:bg-gray-50"
              }`}
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z" />
                </svg>
              </div>
              <p className="text-gray-700 text-lg font-semibold mb-2">
                Drag and drop PNG files here
              </p>
              <p className="text-gray-500 mb-4">or</p>
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/png"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files || []);
                    if (selectedFiles.length > 0) {
                      setFiles((prev) => [...prev, ...selectedFiles]);
                      setMessage("");
                    }
                  }}
                />
                <span className="px-6 py-3 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors font-semibold cursor-pointer inline-block">
                  Browse Files
                </span>
              </label>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Files ({files.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow bg-white"
                    >
                      <div className="w-full h-32 bg-gray-100 relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate font-medium" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Slider */}
            {files.length > 0 && (
              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-800 block mb-2">
                      JPG Quality Level
                    </label>
                    <p className="text-sm text-gray-600">
                      Higher quality = larger file size. Adjust the slider to find the best balance.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-shrink-0">
                    <input
                      type="range"
                      min="0.3"
                      max="1"
                      step="0.05"
                      value={quality}
                      className="w-32 h-2 rounded-lg appearance-none cursor-pointer accent-cyan-700"
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                    />
                    <span className="text-lg font-bold text-cyan-700 min-w-fit">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={convert}
                disabled={processing || !files.length}
                className={`flex-1 px-8 py-4 font-semibold rounded-xl transition-all text-lg ${
                  processing || !files.length
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-cyan-700 text-white hover:bg-cyan-800 shadow-lg hover:shadow-xl"
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Converting...
                  </span>
                ) : (
                  "Convert to JPG"
                )}
              </button>

              <button
                onClick={resetAll}
                disabled={!files.length && !outputs.length}
                className={`flex-1 px-8 py-4 font-semibold rounded-xl transition-all text-lg ${
                  !files.length && !outputs.length
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl"
                }`}
              >
                Clear All
              </button>
            </div>

            {/* Progress Bar */}
            {processing && (
              <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-cyan-700 h-2 rounded-full animate-pulse w-full"></div>
              </div>
            )}

            {/* Output Results */}
            {outputs.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Ready for Download ({outputs.length} files)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outputs.map((output, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden"
                    >
                      <div className="w-full h-40 bg-gray-100 relative">
                        <img
                          src={output.url}
                          alt={output.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-sm font-semibold text-gray-800 mb-2 break-words">
                          {output.name}
                        </p>
                        <p className="text-xs text-gray-600 mb-4 font-medium">
                          Size: {output.size} KB
                        </p>
                        <a
                          className="w-full block text-center px-4 py-3 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors font-semibold"
                          href={output.url}
                          download={output.name}
                        >
                          Download JPG
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Information Section - 1200+ Words */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 mb-12">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
    Complete Guide to Converting PNG Images to JPG Format
  </h2>

  <div className="space-y-8 text-justify">
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Understanding the Difference Between PNG and JPG
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        PNG and JPG are two of the most widely used image formats on the
        internet, but both serve completely different purposes. PNG files are
        designed to preserve image quality with lossless compression, while JPG
        files focus on reducing file size through lossy compression technology.
        Choosing the correct format depends on how the image will be used.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        PNG works best for graphics, logos, illustrations, screenshots, and
        transparent images because it keeps sharp edges and preserves all visual
        details. JPG is more suitable for photographs and web images where
        smaller file sizes are important for performance and faster loading
        times.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Website creators and designers often use{" "}
        <a
          href="https://convertixy.com/jpg-to-webp"
          className="text-blue-600 font-medium hover:underline"
        >
          JPG to WebP
        </a>{" "}
        after optimization workflows to further reduce image sizes and improve
        website speed performance.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Why People Convert PNG Files to JPG
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        The biggest reason for PNG to JPG conversion is file size reduction. PNG
        images can become very large because they preserve every detail without
        compression loss. While this is excellent for editing and design work,
        it becomes less practical for websites, emails, social media uploads,
        and storage management.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        JPG files are significantly smaller while still maintaining acceptable
        visual quality for most users. Smaller images improve website loading
        speed, reduce bandwidth usage, and create better user experiences,
        especially for mobile visitors using slower internet connections.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Faster-loading websites also improve SEO performance because search
        engines prioritize speed and user experience as ranking factors.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        How PNG to JPG Conversion Works
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        PNG to JPG conversion involves more than simply changing the file
        extension. The converter processes the original image, compresses visual
        information intelligently, and generates a new JPG file optimized for
        reduced storage size.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        During conversion, transparency support is removed because JPG format
        does not support transparent backgrounds. Transparent areas are usually
        replaced with white or another background color automatically.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Modern converters use advanced image processing methods that maintain
        sharpness and color accuracy while significantly reducing overall file
        size.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        The Importance of Image Optimization for Websites
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        Large images are one of the biggest reasons websites load slowly.
        Unoptimized PNG files can dramatically increase page weight, leading to
        poor user experience and reduced search engine visibility.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Converting PNG images into JPG format helps reduce loading times,
        especially on mobile devices where bandwidth and speed limitations are
        more noticeable. This improves engagement and lowers bounce rates
        because users are less likely to leave a fast-loading website.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Website owners frequently combine JPG optimization with{" "}
        <a
          href="https://convertixy.com/image-compressor"
          className="text-blue-600 font-medium hover:underline"
        >
          Image Compressor
        </a>{" "}
        tools to achieve even smaller file sizes without major quality loss.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Understanding JPG Quality Settings
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        JPG conversion usually includes adjustable quality settings. Higher
        quality levels preserve more detail but create larger files, while lower
        settings reduce file size more aggressively.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        For websites and social media, quality settings around 75% to 85% often
        provide the best balance between visual appearance and file size. Most
        users cannot notice major quality differences at these levels, but the
        storage savings are substantial.
      </p>

      <p className="text-gray-700 leading-relaxed">
        For printing or professional photography, higher quality settings may be
        preferred to preserve image detail more accurately.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Why Browser-Based Conversion Is More Secure
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        Many online converters upload files to external servers for processing.
        While convenient, this raises privacy concerns because personal or
        professional images temporarily leave the user’s device.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Browser-based conversion tools improve security by processing files
        directly inside the browser itself. Images remain on the local device
        during the entire conversion process, reducing the risk of data exposure
        or unauthorized access.
      </p>

      <p className="text-gray-700 leading-relaxed">
        This privacy-focused approach is especially useful for businesses,
        photographers, designers, and agencies working with confidential visual
        assets.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Common Real-World Use Cases
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        PNG to JPG conversion is useful across many industries and workflows.
        Bloggers optimize screenshots and feature images for faster website
        loading. E-commerce businesses reduce product image sizes to improve
        shopping performance. Social media creators compress graphics before
        uploading content online.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Photographers also convert large PNG exports into JPG format for client
        delivery and portfolio websites. Marketing teams optimize banners,
        presentations, and advertising creatives for email campaigns and landing
        pages.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Students and office workers frequently convert PNG documents into JPG
        format to simplify file sharing through messaging platforms and email
        services.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Things to Consider Before Conversion
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        Since JPG uses lossy compression, some image detail will always be
        removed during conversion. This is usually acceptable for photographs
        but may not work well for logos, transparent graphics, or images with
        sharp text.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Users should always keep the original PNG file as a backup before
        converting. This allows future editing without quality degradation.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Designers handling transparency-heavy graphics may also use{" "}
        <a
          href="https://convertixy.com/webp-to-png"
          className="text-blue-600 font-medium hover:underline"
        >
          WebP to PNG
        </a>{" "}
        when restoring transparent image assets for design and editing purposes.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Batch Conversion and Productivity Benefits
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        Batch processing is one of the most valuable features in modern image
        converters. Instead of converting files individually, users can process
        multiple PNG images at once, saving significant time and effort.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        This is especially useful for photographers, web developers, marketing
        teams, and content creators who regularly manage large collections of
        images.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Organized workflows with optimized JPG files improve storage management,
        upload speed, and overall productivity across digital projects.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Frequently Asked Questions About PNG to JPG Conversion
      </h3>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-600">
          <p className="font-semibold text-gray-800 mb-2">
            Does JPG support transparency?
          </p>
          <p className="text-gray-700">
            No. JPG format does not support transparent backgrounds. Transparent
            areas are usually filled with white during conversion.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-600">
          <p className="font-semibold text-gray-800 mb-2">
            Why are JPG files smaller than PNG files?
          </p>
          <p className="text-gray-700">
            JPG uses lossy compression that removes some image data to reduce
            file size significantly while keeping acceptable visual quality.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-600">
          <p className="font-semibold text-gray-800 mb-2">
            Is browser-based conversion safe?
          </p>
          <p className="text-gray-700">
            Yes. Browser-based converters process files locally on the device,
            meaning images are not uploaded to external servers.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-600">
          <p className="font-semibold text-gray-800 mb-2">
            Can I convert multiple PNG files together?
          </p>
          <p className="text-gray-700">
            Most modern converters support batch processing, allowing multiple
            images to be converted simultaneously.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-600">
          <p className="font-semibold text-gray-800 mb-2">
            Which format is better for websites?
          </p>
          <p className="text-gray-700">
            JPG is usually better for photographs and large visual content
            because of smaller file sizes, while PNG is better for transparent
            graphics and logos.
          </p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Final Thoughts
      </h3>

      <p className="text-gray-700 leading-relaxed">
        PNG to JPG conversion plays a major role in modern digital workflows.
        From website optimization and social media content to photography,
        marketing, and cloud storage management, converting large PNG files into
        efficient JPG images improves speed, compatibility, and overall
        performance. Browser-based conversion tools make the process simple,
        secure, and accessible without requiring expensive software or technical
        expertise. By understanding when and why to use JPG format, users can
        create faster websites, reduce storage usage, and improve digital
        experiences across all devices and platforms.
      </p>
    </div>
  </div>
</section>

<section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200 p-8 md:p-12">
  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
    Additional Image Optimization Resources
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-justify">
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="font-semibold text-gray-800 mb-3">
        Choosing the Right Quality Setting
      </h4>

      <p className="text-gray-700 text-sm leading-relaxed">
        Lower JPG quality creates smaller files but may reduce sharpness. For
        most websites and social platforms, 75% to 85% quality provides an
        excellent balance between compression and visual appearance.
      </p>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="font-semibold text-gray-800 mb-3">
        When PNG Still Makes More Sense
      </h4>

      <p className="text-gray-700 text-sm leading-relaxed">
        PNG remains the better option for transparent graphics, icons, logos,
        screenshots, and design assets where preserving every detail is more
        important than reducing file size.
      </p>
    </div>
  </div>
</section>
      </div>
    </main>
  );
}
