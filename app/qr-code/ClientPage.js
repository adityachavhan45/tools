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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(240, 147, 251, 0.4);
        }

        .btn-success {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          transition: all 0.3s ease;
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
        }

        .btn-danger {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          transition: all 0.3s ease;
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(250, 112, 154, 0.4);
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

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professional QR Code Generator
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Create stunning, customizable QR codes in seconds. Perfect for business, marketing, events, and personal use.
            </p>
          </div>

          {/* Main Generator Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8 card-hover animate-fade-in">
            {message && (
              <div className="mb-6 px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl text-gray-800 text-base font-medium shadow-md animate-fade-in text-center">
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
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-800 placeholder-gray-400 transition-all resize-none"
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-800 cursor-pointer"
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
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-inner border-2 border-gray-200 qr-preview">
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
              className="w-full mt-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold shadow-lg transition-all text-sm md:text-base"
            >
              📋 Copy to Clipboard
            </button>
          </div>

          {/* Comprehensive Information Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Complete Guide to QR Code Generation
            </h2>

            <div className="prose max-w-none">
              <section className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What Are QR Codes and Why Are They Important?</h3>
                <p className="content-text text-gray-700 mb-4">
                  QR codes, short for Quick Response codes, represent one of the most revolutionary innovations in data encoding and information sharing technology. Developed in 1994 by Denso Wave, a subsidiary of Toyota, these two-dimensional matrix barcodes were initially designed to track vehicle parts during manufacturing. However, their utility quickly expanded far beyond the automotive industry, transforming how we share and access information in our increasingly digital world. Unlike traditional one-dimensional barcodes that can only store limited numeric data, QR codes can encode vast amounts of information including text, URLs, contact details, payment information, WiFi credentials, location coordinates, and much more.
                </p>
                <p className="content-text text-gray-700 mb-4">
                  The fundamental advantage of QR codes lies in their scanning speed and data capacity. A single QR code can store up to 4,296 alphanumeric characters or 7,089 numeric characters, making them incredibly versatile for various applications. When scanned using a smartphone camera or dedicated QR scanner application, these codes instantly reveal their encoded information without requiring manual data entry. This seamless interaction has made QR codes ubiquitous in modern society, appearing everywhere from product packaging and advertising materials to restaurant menus and payment systems. The COVID-19 pandemic particularly accelerated QR code adoption, as businesses sought contactless solutions for menu viewing, payment processing, and contact tracing.
                </p>
                <p className="content-text text-gray-700">
                  Our comprehensive QR Code Generator tool empowers individuals and businesses to create professional-grade QR codes without requiring technical expertise or expensive software. Whether you a small business owner looking to enhance customer engagement, a teacher sharing educational resources, or an event organizer managing attendee information, this free online generator provides all the functionality you need. The tool operates entirely within your browser, ensuring complete privacy and security since your data never leaves your device. This client-side processing approach means you maintain full control over your information while enjoying instant QR code generation capabilities.
                </p>
              </section>

              <section className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Features and Customization Options</h3>
                <p className="content-text text-gray-700 mb-4">
                  Our QR Code Generator distinguishes itself through comprehensive customization features that allow you to create QR codes perfectly aligned with your brand identity and specific requirements. The size adjustment capability ranges from compact 128-pixel codes suitable for small print materials to high-resolution 512-pixel codes ideal for large format printing and billboards. This flexibility ensures your QR codes remain scannable and professional-looking regardless of their application. The color customization feature enables you to match QR codes to your brand colors, creating visually cohesive marketing materials. However, it crucial to maintain sufficient contrast between foreground and background colors to ensure reliable scanning across different devices and lighting conditions.
                </p>
                <p className="content-text text-gray-700 mb-4">
                  The error correction level selection represents another sophisticated feature that significantly impacts QR code reliability. Four standardized error correction levels (L, M, Q, and H) determine how much of the QR code can be damaged or obscured while still remaining scannable. Low error correction (L) recovers up to 7% of data, suitable for pristine environments where damage is unlikely. Medium correction (M) handles up to 15% damage, representing a balanced choice for most applications. Quartile correction (Q) manages 25% damage, recommended for codes that might experience moderate wear or partial obstruction. High correction (H) remarkably recovers up to 30% of damaged data, ideal for outdoor applications, heavily-used materials, or situations where you want to embed logos within the QR code design.
                </p>
                <p className="content-text text-gray-700">
                  The download functionality provides both PNG and SVG format options, catering to different use cases. PNG files offer universal compatibility and are perfect for digital displays, social media posts, and standard printing applications. SVG files provide vector-based scalability, maintaining perfect clarity at any size without quality degradation, making them ideal for professional printing, large-format displays, and situations requiring logo integration. The clipboard copy feature facilitates quick sharing and insertion into design software, streamlining your workflow when creating marketing materials or documentation.
                </p>
              </section>

              <section className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications Across Industries</h3>
                <p className="content-text text-gray-700 mb-4">
                  Business applications of QR codes have expanded dramatically, revolutionizing customer engagement and operational efficiency. Retail businesses utilize QR codes on product packaging to provide detailed product information, usage instructions, authenticity verification, and promotional content. Restaurant and hospitality industries have embraced digital menus accessible via QR codes, reducing printing costs while enabling instant menu updates and multilingual support. Real estate professionals incorporate QR codes in property listings, allowing potential buyers to instantly access virtual tours, detailed specifications, and contact information. Marketing campaigns leverage QR codes to bridge offline and online experiences, tracking engagement metrics while providing customers with exclusive content, special offers, or app download links.
                </p>
                <p className="content-text text-gray-700 mb-4">
                  Educational institutions have discovered numerous innovative applications for QR codes. Teachers create codes linking to supplementary learning materials, homework assignments, instructional videos, and interactive quizzes. Libraries use QR codes for book cataloging, allowing patrons to quickly access digital resources, reading guides, and availability information. Campus navigation becomes simplified with QR codes providing building directories, maps, and department information. Museums and galleries enhance visitor experiences by placing QR codes near exhibits, offering detailed historical context, artist interviews, and multimedia content that enriches the physical viewing experience.
                </p>
                <p className="content-text text-gray-700 mb-4">
                  The healthcare sector employs QR codes for patient identification, medication tracking, appointment scheduling, and health record access. Pharmaceutical companies include QR codes on medication packaging, enabling patients to verify authenticity, access usage instructions in multiple languages, and report adverse effects. Medical facilities use QR codes for visitor management, contactless check-ins, and wayfinding assistance. Emergency medical information cards featuring QR codes can provide first responders with crucial health information when patients cannot communicate directly.
                </p>
                <p className="content-text text-gray-700">
                  Event management has been transformed by QR code technology. Conference organizers use QR codes for ticketing, attendee registration, session check-ins, and networking facilitation. Virtual and hybrid events integrate QR codes to seamlessly connect physical and digital experiences. Trade show exhibitors employ QR codes for lead capture, product demonstrations, and literature distribution. Wedding planners utilize QR codes for RSVP management, gift registry access, and event schedule sharing, while festival organizers implement QR codes for cashless payment systems and interactive experiences.
                </p>
              </section>

              <section className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications and Best Practices</h3>
                <p className="content-text text-gray-700 mb-4">
                  Understanding QR code technical specifications ensures optimal performance and reliability. QR codes consist of version numbers ranging from 1 to 40, with each version containing a different number of modules (the individual black and white squares that comprise the code). Version 1 contains 21×21 modules, while Version 40 contains 177×177 modules, with each successive version adding four modules per side. Higher versions accommodate more data but require larger physical sizes or higher resolution to maintain scannability. Our generator automatically selects the appropriate version based on your data input, optimizing between size and information capacity.
                </p>
                <p className="content-text text-gray-700 mb-4">
                  The quiet zone, or border area surrounding the QR code, plays a critical role in successful scanning. This white space should measure at least four modules wide on all sides, preventing interference from adjacent graphics or text. Many scanning failures result from insufficient quiet zones or QR codes placed against busy backgrounds. When incorporating QR codes into designs, always ensure adequate surrounding space and avoid placing them on surfaces with complex patterns or gradients that might confuse scanning algorithms.
                </p>
                <p className="content-text text-gray-700 mb-4">
                  Color selection significantly impacts scanning reliability. While black foreground on white background provides optimal contrast and universal compatibility, creative color combinations remain viable with proper contrast ratios. Aim for at least 60% contrast between foreground and background colors. Dark colors work well for foreground elements, while light colors suit backgrounds. Avoid using similar shades or low-contrast combinations like light gray on white or dark blue on black. Test your colored QR codes across multiple scanning devices before finalizing designs, especially for mass production or critical applications.
                </p>
                <p className="content-text text-gray-700">
                  Print quality considerations become paramount for physical QR code applications. Ensure printer resolution meets minimum requirements, typically 300 DPI for standard printing and 600 DPI for professional applications. Test printed QR codes before mass production, checking scannability under various lighting conditions and from different angles. Consider material properties when selecting printing surfaces; glossy materials might cause glare issues, while textured surfaces could interfere with scanning. For outdoor applications, use weather-resistant materials and protective coatings to prevent degradation from environmental exposure.
                </p>
              </section>

              <section className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy, Security, and Future Developments</h3>
                <p className="content-text text-gray-700 mb-4">
                  Privacy concerns surrounding QR codes have gained attention as their usage proliferates. Our generator addresses these concerns through client-side processing, meaning all QR code generation occurs locally in your browser without transmitting data to external servers. This approach guarantees complete privacy for sensitive information like WiFi passwords, contact details, or confidential URLs. Static QR codes generated through our tool never expire and don require ongoing server connections, eliminating tracking possibilities inherent in dynamic QR code services. Users maintain full control over their data, with no storage, logging, or third-party sharing occurring during the generation process.
                </p>
                <p className="content-text text-gray-700 mb-4">
                  Security best practices recommend implementing several protective measures when deploying QR codes publicly. Verify all generated QR codes before distribution by scanning them yourself to ensure they direct to intended destinations. Consider URL shortening services with analytics for tracking and management capabilities while maintaining transparency about data collection. Educate users about QR code security, encouraging them to preview URLs before visiting websites and avoid scanning codes from untrusted sources. For payment applications, implement additional verification steps beyond QR code scanning to prevent fraud.
                </p>
                <p className="content-text text-gray-700">
                  The future of QR code technology promises exciting developments. Enhanced visual QR codes incorporating brand logos, custom shapes, and artistic elements are becoming increasingly sophisticated while maintaining scannability. Augmented reality integration enables QR codes to trigger immersive experiences combining digital content with physical environments. Blockchain technology integration offers possibilities for verification, authentication, and secure transaction processing through QR interfaces. As smartphone camera technology advances and scanning algorithms improve, we can expect even more reliable recognition of partially damaged or creatively designed QR codes, expanding design possibilities while maintaining functionality.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Are QR codes generated by this tool truly free?</h4>
                    <p className="content-text text-gray-700">
                      Absolutely. This QR Code Generator is completely free with no limitations on usage, hidden fees, or subscription requirements. Generate unlimited QR codes for personal or commercial purposes without any restrictions or watermarks.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Do static QR codes ever expire?</h4>
                    <p className="content-text text-gray-700">
                      No, static QR codes generated through our tool never expire. Once created, they remain functional indefinitely since the data is permanently encoded within the image itself. Unlike dynamic QR codes that redirect through intermediary servers, static codes directly contain all information.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Can I use custom colors without affecting functionality?</h4>
                    <p className="content-text text-gray-700">
                      Yes, you can customize colors while maintaining functionality, provided you ensure sufficient contrast between foreground and background. Maintain at least 60% contrast ratio for reliable scanning. Test colored QR codes across multiple devices before finalizing your design for production use.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Does the generator work offline?</h4>
                    <p className="content-text text-gray-700">
                      Once the page loads initially, the generator functions completely offline without requiring internet connectivity. All processing occurs locally in your browser, ensuring privacy and enabling QR code generation even in environments without network access.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Is my data private and secure?</h4>
                    <p className="content-text text-gray-700">
                      Absolutely. All QR code generation happens entirely within your browser through client-side processing. Your input data never gets transmitted to external servers, logged, stored, or shared with third parties, guaranteeing complete privacy and data security.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">What the difference between error correction levels?</h4>
                    <p className="content-text text-gray-700">
                      Error correction levels determine how much damage a QR code can sustain while remaining scannable. Higher levels create more redundant data, allowing the code to function even when portions are obscured or damaged. Choose higher levels for outdoor use, small prints, or when embedding logos within QR codes.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Should I choose PNG or SVG format?</h4>
                    <p className="content-text text-gray-700">
                      PNG files work universally for digital displays and standard printing. SVG files provide vector scalability, maintaining perfect clarity at any size without quality loss, making them ideal for professional printing, large-format applications, and design software integration where resizing flexibility is essential.
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