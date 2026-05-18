"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function SvgToPngPage() {
  const [file, setFile] = useState(null);
  const [scale, setScale] = useState(2);
  const [out, setOut] = useState("");
  const [message, setMessage] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  async function convert() {
    if (!file) return;
    try {
      setMessage("⏳ Converting your SVG...");
      const text = await file.text();
      const svg = new Blob([text], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svg);
      const img = new Image();
      
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = url;
      });
      
      const width = img.width || 512;
      const height = img.height || 512;
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(width * scale);
      canvas.height = Math.ceil(height * scale);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const png = canvas.toDataURL("image/png");
      
      setOut(png);
      setDimensions({ width: canvas.width, height: canvas.height });
      setMessage("✅ Conversion successful! Your PNG is ready to download.");
      URL.revokeObjectURL(url);
    } catch {
      setMessage("❌ Failed to convert SVG. Please ensure your file is a valid SVG format.");
      setOut("");
    }
  }

  function resetAll() {
    setFile(null);
    setOut("");
    setDimensions({ width: 0, height: 0 });
    setScale(2);
    setMessage("🧹 All fields cleared!");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-10 px-4">
      <JsonLd
        data={buildToolJsonLd({
          name: "SVG to PNG Converter - Free Online Tool",
          description: "Convert SVG vector images to high-quality PNG format instantly. Free online SVG to PNG converter with adjustable scaling and no quality loss.",
          slug: "/svg-to-png",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "SVG to PNG Converter", slug: "/svg-to-png" },
        ])}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-10">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            SVG to PNG Converter
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
            Transform your scalable vector graphics into high-quality PNG images instantly. Free, fast, and secure conversion with adjustable scaling options.
          </p>
        </div>

        {/* Main Tool Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200 mb-8">
          <div className="space-y-6">
            {/* Status Message */}
            {message && (
              <div className={`px-5 py-3 rounded-xl shadow-sm border ${
                message.includes('✅') 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : message.includes('❌')
                  ? 'bg-red-50 border-red-200'
                  : message.includes('⏳')
                  ? 'bg-cyan-50 border-cyan-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <p className="text-sm font-medium text-gray-800">{message}</p>
              </div>
            )}

            {/* File Upload Section */}
            <div className="bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-dashed border-cyan-300">
              <label className="block cursor-pointer">
                <div className="text-center">
                  <div className="text-5xl mb-3">📁</div>
                  <p className="text-base font-semibold text-gray-700 mb-2">
                    Click to upload your SVG file
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports .svg files up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/svg+xml,.svg"
                  onChange={(e) => setFile((e.target.files || [])[0] || null)}
                  className="hidden"
                />
              </label>
              
              {file && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-cyan-200">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">✓</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scale Control */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
              <label className="block text-base font-semibold text-gray-800 mb-4">
                Output Scale: {scale}x (Output will be {scale}× larger)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">1×</span>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={scale}
                  onChange={(e) => setScale(parseInt(e.target.value, 10))}
                  className="flex-1 h-3 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-700"
                />
                <span className="text-sm font-medium text-gray-600">8×</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Higher scale = larger file size but better quality for print and high-resolution displays
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className={`flex-1 px-6 py-4 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!file
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-700 to-blue-700 text-white hover:from-cyan-800 hover:to-blue-800 transform hover:scale-105"}`}
                disabled={!file}
                onClick={convert}
              >
                {file ? "🎨 Convert to PNG" : "Upload SVG First"}
              </button>
              <button
                onClick={resetAll}
                disabled={!file && !out}
                className={`px-6 py-4 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!file && !out
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transform hover:scale-105"}`}
              >
                🔄 Reset Everything
              </button>
            </div>

            {/* Output Preview */}
            {out && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Your Converted PNG Image
                </h3>
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                    <img
                      src={out}
                      alt="PNG output preview"
                      className="max-w-full h-auto border-2 border-gray-300 rounded shadow-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="flex-1 text-sm text-gray-600">
                    <p><strong>Dimensions:</strong> {dimensions.width} × {dimensions.height} pixels</p>
                    <p><strong>Format:</strong> PNG with transparency support</p>
                  </div>
                  <a
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-700 font-semibold transition-all duration-200 transform hover:scale-105"
                    href={out}
                    download={`${file?.name.replace('.svg', '') || 'converted'}.png`}
                  >
                    ⬇️ Download PNG
                  </a>
                </div>
              </div>
            )}

            {/* Quick Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-800 mb-1">Lightning Fast</h4>
                <p className="text-xs text-gray-600">Instant conversion in your browser</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-800 mb-1">100% Secure</h4>
                <p className="text-xs text-gray-600">Files never leave your device</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-1">Perfect Quality</h4>
                <p className="text-xs text-gray-600">No quality loss with vector source</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Information Section */}
        <article className="prose prose-lg max-w-none">
  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why SVG to PNG Conversion Is Important in Modern Design Workflows
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        SVG and PNG are two of the most commonly used image formats on the
        internet, but they work in completely different ways. SVG files use
        vector-based structures built with mathematical paths and shapes, while
        PNG files use raster graphics made from individual pixels.
      </p>

      <p>
        SVG format is extremely useful for scalable graphics because it can be
        resized infinitely without losing quality. This makes it ideal for logos,
        icons, illustrations, and UI elements. However, many websites,
        applications, and platforms still require raster image formats like PNG
        for compatibility and consistent rendering.
      </p>

      <p>
        Converting SVG to PNG helps users create universally supported image
        files that work properly across browsers, social media platforms, mobile
        apps, email clients, and content management systems.
      </p>

      <p>
        Designers preparing assets for multiple platforms often combine image
        workflows with{" "}
        <a
          href="https://convertixy.com/image-resizer"
          className="text-blue-600 font-medium hover:underline"
        >
          Image Resizer
        </a>{" "}
        to generate optimized dimensions for different devices and layouts.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Understanding the Difference Between Vector and Raster Graphics
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Vector graphics store shapes and design elements mathematically instead
        of using fixed pixels. Because of this, SVG images remain perfectly sharp
        regardless of scaling size.
      </p>

      <p>
        Raster graphics like PNG are built from pixels with fixed resolutions.
        They cannot scale infinitely without quality loss, but they provide
        excellent compatibility across almost every platform and software
        environment.
      </p>

      <p>
        This difference explains why SVG files are often used during the design
        stage while PNG files become the preferred format for publishing,
        sharing, and deployment.
      </p>

      <p>
        PNG format also supports transparent backgrounds, making it ideal for
        overlays, logos, product images, UI components, and marketing graphics.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Many Platforms Prefer PNG Instead of SVG
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Even though SVG is powerful, not every platform handles vector graphics
        consistently. Some social media websites, email clients, CMS platforms,
        and older browsers either block SVG uploads or render them incorrectly.
      </p>

      <p>
        PNG solves these compatibility issues because it is universally supported
        across modern digital environments. Designers often convert SVG graphics
        into PNG before uploading assets to social media, creating website
        thumbnails, or sending graphics through email campaigns.
      </p>

      <p>
        E-commerce stores, blogs, online portfolios, and business websites also
        frequently use PNG versions of vector graphics to ensure consistent
        display quality across all devices and operating systems.
      </p>

      <p>
        Website owners optimizing frontend performance may additionally use{" "}
        <a
          href="https://convertixy.com/image-compressor"
          className="text-blue-600 font-medium hover:underline"
        >
          Image Compressor
        </a>{" "}
        after conversion to reduce PNG file sizes for faster loading speeds.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      How SVG to PNG Conversion Works
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        SVG to PNG conversion works by rendering vector graphics into pixel-based
        image data at a selected resolution. During this process, the browser or
        rendering engine interprets the mathematical SVG instructions and creates
        a rasterized PNG output.
      </p>

      <p>
        The chosen scale factor directly affects output resolution. Higher scale
        values generate sharper PNG files with more pixels, while smaller scales
        create lighter file sizes optimized for faster loading.
      </p>

      <p>
        Since PNG supports transparency, transparent elements inside SVG graphics
        are usually preserved automatically during conversion.
      </p>

      <p>
        Modern browser-based converters perform this process instantly without
        requiring software installation or advanced technical knowledge.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Benefits of Browser-Based SVG Conversion
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Browser-based conversion tools improve both convenience and privacy.
        Instead of uploading graphics to external servers, processing happens
        directly inside the browser itself.
      </p>

      <p>
        This local-processing approach ensures that confidential designs, logos,
        branding assets, and unreleased graphics remain on the user’s device
        throughout the entire workflow.
      </p>

      <p>
        Local conversion also improves speed because files do not need to travel
        through remote servers before processing begins.
      </p>

      <p>
        Designers and businesses handling private visual assets often prefer
        browser-based workflows for stronger security and reduced data exposure
        risks.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Real-World Applications Across Different Industries
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Web developers frequently convert SVG icons and illustrations into PNG
        for email templates, browser compatibility fallbacks, and social media
        sharing assets.
      </p>

      <p>
        Graphic designers create PNG exports from vector logos for presentations,
        advertisements, brand kits, and digital campaigns. Marketing teams use
        PNG files for social media creatives, promotional banners, and email
        newsletters.
      </p>

      <p>
        Mobile app developers generate PNG icons from SVG source graphics because
        many application ecosystems still rely heavily on raster image assets for
        compatibility and performance reasons.
      </p>

      <p>
        UI designers often combine SVG conversion workflows with{" "}
        <a
          href="https://convertixy.com/color-picker"
          className="text-blue-600 font-medium hover:underline"
        >
          Color Picker
        </a>{" "}
        tools to maintain brand-consistent visuals across digital interfaces.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Choosing the Right Scale Factor for Better Quality
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Selecting the correct scale factor is one of the most important parts of
        SVG to PNG conversion. Small-scale exports create lightweight images
        suitable for websites and mobile apps, while larger scales provide
        sharper results for printing and high-resolution displays.
      </p>

      <p>
        For most websites and social media graphics, 2× scaling usually provides
        an excellent balance between quality and file size.
      </p>

      <p>
        Larger banners, presentations, and print-related graphics may benefit
        from higher scaling values like 4× or 6× to preserve detail and visual
        sharpness.
      </p>

      <p>
        However, unnecessarily large PNG files may increase loading times and
        bandwidth usage, so choosing practical resolutions remains important.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Common Mistakes People Make During Conversion
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        One common mistake is exporting PNG files at resolutions that are too
        small for their intended usage. Upscaling low-resolution PNG files later
        often causes blurry and pixelated results.
      </p>

      <p>
        Another issue occurs when users generate unnecessarily massive PNG files
        for simple web graphics. Large files increase page loading times and
        negatively impact website performance.
      </p>

      <p>
        Some users also forget to optimize exported PNG images afterward, which
        can lead to unnecessarily high bandwidth usage across websites and apps.
      </p>

      <p>
        Proper planning and selecting appropriate scaling settings usually solve
        most conversion quality problems effectively.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6" style={{ textAlign: "justify" }}>
      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Does SVG to PNG conversion reduce quality?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          No. SVG files render sharply at the chosen export resolution. Quality
          issues usually occur only when PNG files are enlarged beyond their
          exported size later.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Can transparent backgrounds be preserved?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. PNG format fully supports transparency, so transparent SVG areas
          usually remain transparent after conversion.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Which scale factor should I use?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          2× scaling works well for most websites and digital graphics, while
          larger scales are better for print and high-resolution displays.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Is browser-based conversion secure?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Browser-based converters process files locally without uploading
          graphics to external servers.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Why do some platforms reject SVG uploads?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Some platforms restrict SVG files because of compatibility and security
          concerns, making PNG the safer and more widely supported option.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Can PNG files be resized infinitely like SVG?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          No. PNG is a raster format with fixed resolution, so enlarging it too
          much eventually reduces visual quality.
        </p>
      </div>
    </div>
  </section>

  <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-cyan-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Final Thoughts
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        SVG to PNG conversion remains an essential workflow for designers,
        developers, marketers, and businesses needing universal image
        compatibility across digital platforms.
      </p>

      <p>
        SVG files provide unmatched scalability during design and editing, while
        PNG offers reliable rendering support across browsers, social media,
        websites, email systems, and applications.
      </p>

      <p>
        Browser-based conversion tools simplify the process by delivering secure,
        fast, and installation-free workflows directly inside modern web
        browsers.
      </p>

      <p>
        By selecting proper scaling values and optimizing exported PNG files
        carefully, users can create professional-quality graphics suitable for
        websites, applications, branding materials, and marketing campaigns
        across every major digital platform.
      </p>
    </div>
  </section>
</article>
      </div>
    </main>
  );
}
