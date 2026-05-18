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
  const [errorLevel, setErrorLevel] = useState("M");
  const [message, setMessage] = useState("");
  const canvasRef = useRef(null);

  async function generate() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      await QRCode.toCanvas(canvas, text || " ", {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: { dark: fgColor, light: bgColor },
      });
      setMessage("✅ QR code generated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to generate QR code. Please check your input.");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-code-${Date.now()}.png`;
    a.click();
    setMessage("📥 Downloaded successfully!");
    setTimeout(() => setMessage(""), 3000);
  }

  function downloadSvg() {
    if (!text) return;
    QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: errorLevel,
      color: { dark: fgColor, light: bgColor },
      margin: 2,
      width: size
    })
      .then(svg => {
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `qr-code-${Date.now()}.svg`;
        a.click();
        URL.revokeObjectURL(url);
        setMessage("📥 SVG downloaded successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        setMessage("❌ Failed to download SVG.");
        setTimeout(() => setMessage(""), 3000);
      });
  }

  function resetAll() {
    setText("https://example.com");
    setSize(256);
    setFgColor("#000000");
    setBgColor("#ffffff");
    setErrorLevel("M");
    setMessage("🔄 Reset to defaults!");
    setTimeout(() => setMessage(""), 3000);
  }

  function copyToClipboard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (blob) {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]).then(() => {
          setMessage("📋 Copied to clipboard!");
          setTimeout(() => setMessage(""), 3000);
        }).catch(() => {
          setMessage("❌ Copy failed. Please use download instead.");
          setTimeout(() => setMessage(""), 3000);
        });
      }
    });
  }

  useEffect(() => {
    generate();
  }, [text, size, fgColor, bgColor, errorLevel]);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap');
        
        .content-text {
          text-align: justify;
          text-justify: inter-word;
          line-height: 1.8;
        }

        @media (max-width: 640px) {
          .content-text {
            text-align: left;
          }
        }

        .gradient-bg {
          background: #ffffff;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .btn-primary {
          background: linear-gradient(135deg, #0e7490 0%, #1d4ed8 100%);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(14, 116, 144, 0.35);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #0891b2 0%, #2563eb 100%);
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(8, 145, 178, 0.35);
        }

        .btn-success {
          background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);
          transition: all 0.3s ease;
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 118, 110, 0.35);
        }

        .btn-danger {
          background: linear-gradient(135deg, #475569 0%, #334155 100%);
          transition: all 0.3s ease;
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(51, 65, 85, 0.35);
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .qr-preview {
          animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        * {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      <main className="min-h-screen gradient-bg py-12 px-4">
        {/* SEO */}
        <JsonLd
          data={buildToolJsonLd({
            name: "QR Code Generator - Create Custom QR Codes Online Free",
            description:
              "Free online QR code generator. Create custom QR codes for URLs, text, WiFi, vCards, and more. Download in PNG or SVG format. No registration required.",
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

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-10 animate-fade-in">
            <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
              Professional QR Code Generator
            </h1>
            <p className="mt-2 text-center text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Create stunning, customizable QR codes in seconds. Perfect for business, marketing, events, and personal use.
            </p>
          </div>

          {/* Main Generator Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 mb-8 card-hover animate-fade-in">
            {message && (
              <div className="mb-6 px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl text-gray-800 text-base font-medium shadow-md animate-fade-in text-center">
                {message}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 Enter Text or URL
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none text-gray-800 placeholder-gray-400 transition-all resize-none"
                    placeholder="https://example.com or any text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📏 QR Code Size: {size}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={size}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-700"
                    onChange={(e) => setSize(parseInt(e.target.value, 10))}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Small (128px)</span>
                    <span>Large (512px)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🎨 Foreground Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-16 h-16 rounded-xl cursor-pointer border-2 border-gray-200"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🖌️ Background Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-16 h-16 rounded-xl cursor-pointer border-2 border-gray-200"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🛡️ Error Correction Level
                  </label>
                  <select
                    value={errorLevel}
                    onChange={(e) => setErrorLevel(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none text-gray-800 cursor-pointer"
                  >
                    <option value="L">Low (7% recovery)</option>
                    <option value="M">Medium (15% recovery)</option>
                    <option value="Q">Quartile (25% recovery)</option>
                    <option value="H">High (30% recovery)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Higher levels allow QR codes to work even if partially damaged
                  </p>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-gradient-to-br from-slate-50 to-cyan-50 p-8 rounded-2xl shadow-inner border-2 border-cyan-200 qr-preview">
                  <canvas
                    ref={canvasRef}
                    className="bg-white rounded-xl shadow-lg"
                    width={size}
                    height={size}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  🔄 Auto-generated preview
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              <button
                onClick={generate}
                className="px-6 py-3.5 btn-primary text-white rounded-xl font-semibold shadow-lg text-sm md:text-base"
              >
                ✨ Generate
              </button>
              <button
                onClick={downloadPng}
                className="px-6 py-3.5 btn-success text-white rounded-xl font-semibold shadow-lg text-sm md:text-base"
              >
                📥 PNG
              </button>
              <button
                onClick={downloadSvg}
                className="px-6 py-3.5 btn-secondary text-white rounded-xl font-semibold shadow-lg text-sm md:text-base"
              >
                📥 SVG
              </button>
              <button
                onClick={resetAll}
                className="px-6 py-3.5 btn-danger text-white rounded-xl font-semibold shadow-lg text-sm md:text-base"
              >
                🔄 Reset
              </button>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full mt-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold shadow-lg transition-all text-sm md:text-base"
            >
              📋 Copy to Clipboard
            </button>
          </div>

          {/* Comprehensive Information Section */}
         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 animate-fade-in">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
    Complete Guide to Creating Professional QR Codes
  </h2>

  <div className="prose max-w-none">
    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Understanding How QR Codes Work
      </h3>

      <p className="content-text text-gray-700 mb-4">
        QR codes have become one of the most widely used technologies for quick
        information sharing. The term QR stands for Quick Response, which
        perfectly describes their purpose. These square-shaped patterns can
        instantly store and transfer information when scanned through smartphones
        or QR scanner applications.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Unlike traditional barcodes that only hold limited numerical data, QR
        codes can store URLs, contact information, WiFi credentials, payment
        links, text messages, app download links, product information, and much
        more. This flexibility has made QR codes useful across businesses,
        education, healthcare, retail, marketing, and event management.
      </p>

      <p className="content-text text-gray-700">
        Today, almost every smartphone camera supports QR scanning directly,
        making the technology more accessible than ever before. Businesses and
        creators can now connect offline and online experiences instantly with a
        simple scan.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Why QR Codes Became So Popular
      </h3>

      <p className="content-text text-gray-700 mb-4">
        QR codes gained massive popularity because they remove the need for
        manual typing. Instead of entering long URLs, passwords, or contact
        details manually, users can simply scan a code and access the
        information instantly.
      </p>

      <p className="content-text text-gray-700 mb-4">
        During the rise of contactless services, QR codes became even more
        important. Restaurants adopted digital menus, businesses introduced QR
        payments, and event organizers used QR-based ticket systems for faster
        check-ins and better convenience.
      </p>

      <p className="content-text text-gray-700">
        Modern marketing campaigns also use QR codes heavily because they create
        direct connections between physical products and digital experiences.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Key Features That Make QR Codes Useful
      </h3>

      <p className="content-text text-gray-700 mb-4">
        One of the biggest strengths of QR codes is their flexibility. A single
        code can contain large amounts of information while still remaining easy
        to scan. Businesses can print them on posters, packaging, business
        cards, websites, invoices, or even billboards.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Customization options also make QR codes more visually appealing.
        Modern QR generators allow users to change colors, adjust sizes, and
        select different output formats while maintaining scannability.
      </p>

      <p className="content-text text-gray-700">
        Designers often combine QR creation with{" "}
        <a
          href="https://convertixy.com/color-picker"
          className="text-blue-600 font-medium hover:underline"
        >
          Color Picker
        </a>{" "}
        tools to create brand-consistent QR designs for websites and marketing
        materials.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Understanding Error Correction Levels
      </h3>

      <p className="content-text text-gray-700 mb-4">
        QR codes include built-in error correction technology, which allows them
        to remain scannable even when partially damaged or covered. This feature
        makes QR codes highly reliable for real-world applications.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Lower error correction levels generate smaller and simpler codes, while
        higher levels add more recovery data for improved durability. High error
        correction is especially useful for outdoor printing, posters, packaging,
        or situations where the code may experience wear and tear.
      </p>

      <p className="content-text text-gray-700">
        Businesses often use stronger error correction levels when embedding
        logos or design elements inside QR codes.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Real-World Business Applications
      </h3>

      <p className="content-text text-gray-700 mb-4">
        QR codes are now deeply integrated into modern business operations.
        Retail stores use them for product information, promotions, and digital
        payment systems. Restaurants use QR menus to reduce printing costs and
        simplify menu updates.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Marketing agencies use QR codes on advertisements, brochures, banners,
        and packaging to direct customers toward websites, apps, or promotional
        campaigns instantly.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Event organizers rely on QR-based ticket verification systems for faster
        check-ins and improved attendee management. Real estate businesses use
        QR codes to connect property listings with virtual tours and detailed
        information pages.
      </p>

      <p className="content-text text-gray-700">
        Businesses managing online marketing campaigns may also use{" "}
        <a
          href="https://convertixy.com/url-encoder"
          className="text-blue-600 font-medium hover:underline"
        >
          URL Encoder
        </a>{" "}
        for properly formatted URLs before embedding them into QR codes.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Educational and Healthcare Use Cases
      </h3>

      <p className="content-text text-gray-700 mb-4">
        Schools and universities use QR codes to distribute assignments,
        attendance systems, digital learning resources, and campus information.
        Students can scan codes to access notes, presentations, videos, or
        online learning platforms instantly.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Healthcare institutions use QR technology for patient identification,
        appointment scheduling, medication tracking, and digital medical record
        access. This improves efficiency while reducing paperwork and manual
        processing errors.
      </p>

      <p className="content-text text-gray-700">
        Museums and educational exhibitions also use QR codes to provide
        interactive learning experiences through additional multimedia content.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Why Browser-Based QR Generation Is Safer
      </h3>

      <p className="content-text text-gray-700 mb-4">
        Privacy is extremely important when generating QR codes that contain
        sensitive information such as passwords, payment details, or business
        links. Traditional server-based tools may temporarily upload data to
        external systems during processing.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Browser-based QR generators improve privacy significantly because all
        processing happens directly inside the browser. Information remains on
        the local device and does not need to be uploaded externally.
      </p>

      <p className="content-text text-gray-700">
        This local-processing approach is especially useful for businesses,
        professionals, and individuals handling confidential or sensitive data.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Best Practices for Better QR Code Design
      </h3>

      <p className="content-text text-gray-700 mb-4">
        High contrast is one of the most important factors in QR code design.
        Dark foreground colors combined with light backgrounds usually produce
        the best scanning results.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Sufficient spacing around the QR code is also critical. This white
        border area helps scanning devices identify the code properly without
        interference from surrounding graphics or text.
      </p>

      <p className="content-text text-gray-700 mb-4">
        Testing QR codes before printing or publishing is highly recommended.
        Different smartphones and scanning applications may interpret designs
        differently depending on color combinations and image quality.
      </p>

      <p className="content-text text-gray-700">
        Designers frequently optimize QR graphics using{" "}
        <a
          href="https://convertixy.com/image-cropper"
          className="text-blue-600 font-medium hover:underline"
        >
          Image Cropper
        </a>{" "}
        before adding them into posters, social media creatives, or website
        banners.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        PNG vs SVG QR Code Downloads
      </h3>

      <p className="content-text text-gray-700 mb-4">
        QR generators usually provide PNG and SVG download options. PNG format
        works well for websites, social media, and standard printing because it
        is universally supported.
      </p>

      <p className="content-text text-gray-700 mb-4">
        SVG format is ideal for professional printing and scalable graphics
        because it preserves perfect sharpness at any size. This makes SVG
        especially useful for banners, large posters, and high-resolution
        branding materials.
      </p>

      <p className="content-text text-gray-700">
        Businesses creating professional print campaigns often prefer SVG files
        because they maintain clarity even when enlarged significantly.
      </p>
    </section>

    <section className="mb-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Future of QR Code Technology
      </h3>

      <p className="content-text text-gray-700 mb-4">
        QR code technology continues evolving rapidly. Modern systems now combine
        QR codes with augmented reality experiences, advanced analytics, digital
        authentication, and contactless payment ecosystems.
      </p>

      <p className="content-text text-gray-700 mb-4">
        As smartphone cameras and scanning algorithms become more advanced, QR
        codes are expected to support even more interactive experiences in
        education, retail, healthcare, and digital marketing.
      </p>

      <p className="content-text text-gray-700">
        Businesses investing in digital transformation increasingly rely on QR
        technology to create seamless connections between physical and online
        environments.
      </p>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Are QR codes generated by this tool free?
          </h4>

          <p className="content-text text-gray-700">
            Yes. The QR Code Generator is completely free without hidden charges
            or usage restrictions.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Do static QR codes expire?
          </h4>

          <p className="content-text text-gray-700">
            No. Static QR codes remain functional permanently because the data is
            directly encoded inside the image itself.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Is browser-based QR generation secure?
          </h4>

          <p className="content-text text-gray-700">
            Yes. Since processing happens locally in the browser, information is
            not uploaded to external servers.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Which format is better: PNG or SVG?
          </h4>

          <p className="content-text text-gray-700">
            PNG works well for websites and social media, while SVG is better
            for professional printing and scalable designs.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Can custom colors affect QR scanning?
          </h4>

          <p className="content-text text-gray-700">
            Yes. Low contrast combinations may reduce scanning reliability.
            Always maintain strong contrast between foreground and background
            colors.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Can QR codes store large amounts of data?
          </h4>

          <p className="content-text text-gray-700">
            Yes. QR codes can store URLs, text, contact details, WiFi passwords,
            and many other types of information efficiently.
          </p>
        </div>
      </div>
    </section>
  </div>
</div>
          </div>
        
      </main>
    </>
  );
}
