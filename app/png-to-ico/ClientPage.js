"use client";

import { useState } from "react";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

// Simple PNG->ICO (single image 256x256)
function pngToIcoDataURL(pngCanvas) {
  const pngData = atob(pngCanvas.toDataURL("image/png").split(",")[1]);
  const pngBytes = new Uint8Array(pngData.length);
  for (let i = 0; i < pngData.length; i++) pngBytes[i] = pngData.charCodeAt(i);

  const header = new Uint8Array(6);
  header[2] = 1; // ICO type
  header[4] = 1; // number of images

  const dir = new Uint8Array(16);
  dir[0] = 0; // width = 256
  dir[1] = 0; // height = 256
  dir[4] = 1;
  dir[6] = 32;

  const imageSize = pngBytes.length;
  const sizeBytes = new Uint8Array(4);
  new DataView(sizeBytes.buffer).setUint32(0, imageSize, true);

  const offBytes = new Uint8Array(4);
  const imageOffset = 6 + 16;
  new DataView(offBytes.buffer).setUint32(0, imageOffset, true);

  const ico = new Uint8Array(imageOffset + imageSize);
  ico.set(header, 0);
  ico.set(dir, 6);
  ico.set(sizeBytes, 14);
  ico.set(offBytes, 18);
  ico.set(pngBytes, imageOffset);

  const blob = new Blob([ico], { type: "image/x-icon" });
  return URL.createObjectURL(blob);
}

export default function PngToIcoPage() {
  const [file, setFile] = useState(null);
  const [outUrl, setOutUrl] = useState("");
  const [message, setMessage] = useState("");
  const [converting, setConverting] = useState(false);

  async function convert() {
    if (!file) {
      setMessage("⚠️ Please select an image file first.");
      return;
    }

    setConverting(true);
    setMessage("");

    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = () => rej(new Error("Failed to load image"));
        img.src = url;
      });

      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";

      const scale = Math.min(size / img.width, size / img.height);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const x = Math.floor((size - w) / 2);
      const y = Math.floor((size - h) / 2);

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, x, y, w, h);

      const icoUrl = pngToIcoDataURL(canvas);
      setOutUrl(icoUrl);
      setMessage("✅ ICO file created successfully! Ready to download.");
      URL.revokeObjectURL(url);
    } catch (error) {
      setMessage("❌ Failed to convert image. Please try a different file.");
      console.error(error);
    } finally {
      setConverting(false);
    }
  }

  function resetAll() {
    setFile(null);
    setOutUrl("");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <JsonLd
        data={buildToolJsonLd({
          name: "PNG to ICO Converter",
          description: "Convert PNG images to ICO icon files. Create favicons for websites and desktop applications instantly.",
          slug: "/png-to-ico",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PNG to ICO Converter", slug: "/png-to-ico" },
        ])}
      />

      <div className="max-w-5xl mx-auto p-6 py-12">
        {/* Header */}
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-10">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PNG to ICO Converter
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Transform your images into professional favicon ICO files instantly. Free, secure, and works directly in your browser.
          </p>
        </div>

        {/* Main Converter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-cyan-700 to-blue-700 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
              <span className="text-3xl">🎨</span>
              Image to Icon Converter
            </h2>
          </div>

          <div className="p-8 space-y-6">
            {/* Status Messages */}
            {message && (
              <div className={`px-4 py-3 border rounded-xl text-sm font-medium ${
                message.includes("✅") 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : message.includes("❌") 
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-cyan-50 border-cyan-200 text-cyan-800"
              }`}>
                {message}
              </div>
            )}

            {/* Upload Area */}
            <div className="border-2 border-dashed border-cyan-300 rounded-xl p-8 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-cyan-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Select Your Image
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                PNG, JPG, GIF, or any image format supported
              </p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setFile((e.target.files || [])[0] || null);
                    setMessage("");
                    setOutUrl("");
                  }}
                  className="block w-full text-sm text-gray-700
                             file:mr-4 file:py-3 file:px-6 file:rounded-lg 
                             file:border-0 file:bg-cyan-700 file:text-white 
                             file:font-medium file:shadow-md
                             hover:file:bg-cyan-800 hover:file:shadow-lg
                             file:transition-all file:duration-200
                             cursor-pointer"
                />
              </label>
            </div>

            {/* File Info */}
            {file && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-lg">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {(file.size / 1024).toFixed(2)} KB | Type: {file.type || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 
                           bg-gradient-to-r from-blue-600 to-indigo-600 
                           bg-gradient-to-r from-cyan-700 to-blue-700 
                           text-white font-semibold rounded-lg shadow-lg 
                           hover:from-cyan-800 hover:to-blue-800 
                           hover:shadow-xl disabled:opacity-50 
                           disabled:cursor-not-allowed transition-all duration-200"
                disabled={!file || converting}
                onClick={convert}
              >
                {converting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Converting...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Convert to ICO
                  </>
                )}
              </button>

              <button
                onClick={resetAll}
                disabled={!file && !outUrl}
                className="inline-flex items-center gap-2 px-8 py-4 
                           border-2 border-gray-300 rounded-lg bg-white 
                           text-gray-700 font-semibold hover:bg-gray-50 
                           hover:border-gray-400 disabled:opacity-50 
                           disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>

            {/* Preview and Download */}
            {outUrl && (
              <div className="mt-8 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  ✨ Your ICO File is Ready!
                </h3>
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-cyan-300">
                    <p className="text-sm text-gray-600 mb-2 text-center">Preview (256×256)</p>
                    <img
                      src={outUrl}
                      alt="ICO preview"
                      className="w-32 h-32 border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                  <a
                    className="inline-flex items-center gap-2 px-8 py-4 
                               bg-gradient-to-r from-green-600 to-emerald-600 
                               text-white font-bold rounded-lg shadow-lg 
                               hover:from-green-700 hover:to-emerald-700 
                               hover:shadow-xl transition-all duration-200"
                    href={outUrl}
                    download="favicon.ico"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download favicon.ico
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            How to Use This Tool
          </h3>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-700 text-white text-sm font-bold flex-shrink-0">1</span>
              <span>Click the file input and select your PNG, JPG, or any image file from your device.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-700 text-white text-sm font-bold flex-shrink-0">2</span>
              <span>The tool will display your selected file name and size for confirmation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-700 text-white text-sm font-bold flex-shrink-0">3</span>
              <span>Click the "Convert to ICO" button to process your image into a 256×256 ICO file.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-700 text-white text-sm font-bold flex-shrink-0">4</span>
              <span>Preview your icon and download it as favicon.ico for use in your projects.</span>
            </li>
          </ol>
        </div>

        {/* Comprehensive Information Section */}
        <section className="space-y-8 max-w-5xl mx-auto">
  <div className="p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border border-indigo-100 rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Why PNG to ICO Conversion Is Important for Modern Websites
    </h2>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Every professional website needs a recognizable favicon. Those small icons
      visible in browser tabs, bookmarks, search results, and shortcuts may seem
      minor, but they play a major role in branding and user experience. ICO
      files are the standard format used for favicons and application icons
      because they are supported across browsers, operating systems, and desktop
      environments.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      PNG images are excellent for design work because they support transparency
      and high-quality graphics. However, browsers and applications often prefer
      ICO format for proper favicon implementation. Converting PNG to ICO helps
      website owners and developers create professional icons that display
      correctly across multiple platforms and devices.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Understanding What ICO Files Actually Do
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      ICO files are specially designed icon containers that can hold multiple
      image sizes within a single file. This allows browsers and operating
      systems to automatically select the most suitable resolution depending on
      where the icon is being displayed.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Unlike regular image formats that usually store only one version of an
      image, ICO files provide flexibility for different display environments.
      This makes them ideal for browser tabs, desktop shortcuts, taskbars, and
      bookmark systems.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Developers managing website branding assets often combine favicon creation
      with tools like{" "}
      <a
        href="https://convertixy.com/image-resizer"
        className="text-blue-600 font-medium hover:underline"
      >
        Image Resizer
      </a>{" "}
      to prepare perfectly optimized square images before conversion.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Why Favicons Matter More Than Most People Think
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Favicons improve website recognition instantly. When users open many tabs
      in their browser, the favicon becomes the fastest way to identify a
      website visually. Without a favicon, websites appear generic and less
      professional.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Strong favicons also improve branding consistency. The same icon can appear
      in bookmarks, browser history, mobile shortcuts, and app-like website
      installations. This repeated visual exposure helps users remember the
      brand more effectively.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Search engines and mobile browsers increasingly display favicons in search
      results and navigation interfaces, making them an important part of a
      website’s overall presentation.
    </p>
  </div>

  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      How PNG to ICO Conversion Works
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      PNG to ICO conversion involves much more than simply changing a file
      extension. The converter must resize the image correctly, preserve
      transparency, optimize quality, and package the result inside the ICO file
      structure.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      High-quality converters automatically scale images while maintaining sharp
      edges and balanced proportions. This is important because favicons are
      often displayed at very small sizes where blurry or poorly scaled graphics
      become unreadable.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Browser-based converters process everything locally, which improves both
      speed and privacy. Users can convert images instantly without uploading
      sensitive branding assets to external servers.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Tips for Designing Better Favicons
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Good favicon design focuses on simplicity. Tiny icons cannot display
      detailed logos effectively, so strong shapes, bold colors, and minimal
      designs usually perform best.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Many successful websites use simplified versions of their logos or just
      the first letter of their brand name. High contrast also improves
      visibility because favicons appear in different browser themes and
      operating system styles.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Transparent backgrounds often create cleaner and more professional-looking
      icons, especially in dark mode browser environments.
    </p>
  </div>

  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Why Browser-Based Conversion Is Better for Privacy
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Traditional online converters usually upload files to remote servers for
      processing. While convenient, this creates privacy concerns because logos
      and branding assets temporarily leave the user’s device.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Browser-based PNG to ICO tools solve this issue by processing files
      directly inside the browser. Images remain on the user’s system throughout
      the conversion process, reducing security risks and improving speed.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      This approach is especially useful for businesses, agencies, and
      developers working with confidential branding materials or unreleased
      project assets.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Common Use Cases Beyond Website Favicons
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      ICO files are not limited to websites. Windows desktop applications also
      use ICO format for software icons, folder shortcuts, and taskbar branding.
      Developers often convert company logos into ICO files for use inside
      desktop programs and custom software interfaces.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Progressive Web Apps and installable browser applications may also use ICO
      files alongside PNG assets to support multiple platforms properly.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Custom desktop shortcuts and internal company tools frequently rely on ICO
      icons to improve organization and visual recognition.
    </p>
  </div>

  <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Best Practices for High-Quality Icon Conversion
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Starting with a high-resolution PNG file produces better results. Low
      quality or compressed images often appear blurry after resizing, especially
      at smaller favicon dimensions.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Square images work best because ICO files are designed for balanced icon
      layouts. If the original image is rectangular, adding transparent spacing
      around the design helps maintain proper proportions during conversion.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Website owners frequently use{" "}
      <a
        href="https://convertixy.com/image-compressor"
        className="text-blue-600 font-medium hover:underline"
      >
        Image Compressor
      </a>{" "}
      after favicon creation to optimize supporting branding assets and improve
      website loading speed.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Proper Favicon Implementation on Websites
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      After creating the ICO file, website owners usually upload it to the root
      directory of their website using the name favicon.ico. Most browsers
      automatically detect this file without additional configuration.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Modern websites often add explicit favicon declarations inside the HTML
      head section for better compatibility across browsers and devices. This
      ensures consistent display behavior on desktops, tablets, and smartphones.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Developers should also remember that browsers cache favicons aggressively,
      so changes may not appear immediately after updates.
    </p>
  </div>

  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Building a Strong Visual Brand Identity
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      A favicon may be small, but it contributes significantly to a website’s
      professional appearance. Consistent branding across browser tabs, bookmarks,
      search results, and applications strengthens trust and recognition over
      time.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Even simple icons become powerful identifiers when users interact with a
      brand repeatedly. Professional favicon implementation shows attention to
      detail and improves overall user experience.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Website creators focusing on SEO and branding optimization may also use{" "}
      <a
        href="https://convertixy.com/meta-tag-generator"
        className="text-blue-600 font-medium hover:underline"
      >
        Meta Tag Generator
      </a>{" "}
      to improve search visibility and maintain consistent website metadata.
    </p>
  </div>

  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Final Thoughts
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      PNG to ICO conversion is an essential step for creating professional
      favicons and application icons. ICO files ensure compatibility across
      browsers, operating systems, and desktop environments while helping brands
      maintain a polished digital presence.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Browser-based converters make the process simple, secure, and accessible
      for everyone without requiring complicated software installations. By
      starting with high-quality PNG images and following good favicon design
      practices, users can create icons that remain sharp, recognizable, and
      visually effective across all platforms.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Whether you are building a personal website, launching a business brand,
      developing desktop software, or improving your online identity, a
      well-designed favicon helps create stronger recognition and a more
      professional user experience.
    </p>
  </div>
</section>
      </div>
    </main>
  );
}
