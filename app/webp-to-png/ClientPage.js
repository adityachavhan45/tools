"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function WebpToPngPage() {
  const [files, setFiles] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  async function convert() {
    if (!files.length) {
      setMessage("⚠️ Please select WebP files first.");
      return;
    }
    
    setProcessing(true);
    setMessage("🔄 Converting images...");
    
    try {
      const results = [];
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
        ctx.drawImage(img, 0, 0);
        
        const out = canvas.toDataURL("image/png");
        const name = file.name.replace(/\.webp$/i, "");
        
        results.push({
          name: `${name}.png`,
          url: out,
          originalSize: file.size,
          dimensions: `${img.width} × ${img.height}`,
          width: img.width,
          height: img.height
        });
        
        URL.revokeObjectURL(url);
      }
      
      setOutputs(results);
      setMessage(`✅ Successfully converted ${results.length} image${results.length > 1 ? 's' : ''}!`);
    } catch (error) {
      setMessage("❌ Error converting images. Please try again.");
      console.error(error);
    } finally {
      setProcessing(false);
    }
  }

  function reset() {
    setFiles([]);
    setOutputs([]);
    setMessage("🔄 Converter reset successfully!");
    setTimeout(() => setMessage(""), 2000);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "image/webp"
    );
    
    if (droppedFiles.length > 0) {
      setFiles(droppedFiles);
      setMessage(`📁 ${droppedFiles.length} WebP file${droppedFiles.length > 1 ? 's' : ''} selected!`);
    } else {
      setMessage("⚠️ Please drop only WebP files.");
    }
  }

  function handleFileInput(e) {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setMessage(`📁 ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected!`);
    }
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-10">
      <JsonLd
        data={buildToolJsonLd({
          name: "WebP to PNG Converter",
          description: "Free online WebP to PNG converter. Convert WebP images to PNG format instantly in your browser with quality preservation.",
          slug: "/webp-to-png",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "WebP to PNG", slug: "/webp-to-png" },
        ])}
      />

      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Status Message */}
        {message && (
          <div className="px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl shadow-sm animate-fadeIn">
            <p className="text-sm font-semibold text-blue-800">{message}</p>
          </div>
        )}

        {/* Main Converter Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">WebP to PNG Converter</h1>
            <p className="text-green-100 text-sm mt-2">Convert WebP images to PNG format with transparency preservation</p>
          </div>

          <div className="p-8">
            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50 hover:border-green-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/webp"
                multiple
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              
              <div className="pointer-events-none">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Drop WebP files here or click to browse
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Supports multiple files • Works entirely in your browser • No upload required
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg pointer-events-none">
                  <span>📁</span>
                  <span>Select WebP Files</span>
                </div>
              </div>
            </div>

            {/* Selected Files Display */}
            {files.length > 0 && (
              <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-sm font-bold text-green-900 mb-4">
                  📁 Selected Files ({files.length})
                </h3>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-green-200 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🖼️</span>
                        <div>
                          <div className="font-semibold text-gray-800">{file.name}</div>
                          <div className="text-xs text-gray-600">{formatFileSize(file.size)}</div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        WebP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={convert}
                disabled={processing || !files.length}
                className="flex-1 min-w-[200px] px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {processing ? "🔄 Converting..." : "⚡ Convert to PNG"}
              </button>

              <button
                onClick={reset}
                disabled={!files.length && !outputs.length}
                className="px-8 py-4 rounded-xl bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                🔄 Reset
              </button>
            </div>

            {/* Conversion Results */}
            {outputs.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  ✅ Converted Images ({outputs.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outputs.map((output, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-xl transition-all duration-300 group">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-slate-100 flex items-center justify-center p-4">
                        <img
                          src={output.url}
                          alt={output.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="text-sm font-semibold text-gray-800 truncate" title={output.name}>
                          {output.name}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>📐 {output.dimensions}</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">PNG</span>
                        </div>
                        <a
                          href={output.url}
                          download={output.name}
                          className="block w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-center rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                        >
                          ⬇️ Download PNG
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Guide */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-3">
            <span className="text-3xl">📖</span> Quick Conversion Guide
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="font-bold text-blue-800 mb-3 text-base">🎯 Why Convert WebP to PNG?</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Universal compatibility</strong> with all software</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Perfect for editing</strong> in Photoshop, GIMP, etc.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Preserves transparency</strong> perfectly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Works everywhere</strong> - emails, documents, apps</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="font-bold text-blue-800 mb-3 text-base">⚡ Conversion Features</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">•</span>
                  <span>100% browser-based (no server upload)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">•</span>
                  <span>Batch processing for multiple files</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">•</span>
                  <span>Quality preservation guaranteed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">•</span>
                  <span>Instant preview before download</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comprehensive Educational Content - 1000+ Words */}
        <article className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <header className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Guide to WebP to PNG Conversion</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
          </header>

          <div className="prose max-w-none space-y-8 text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding WebP and PNG Image Formats</h3>
              <p className="mb-4">
                WebP represents a modern image format developed by Google that achieves superior compression efficiency compared to traditional formats while maintaining visual quality. Released in 2010, WebP employs both lossy and lossless compression techniques, enabling significantly smaller file sizes that reduce bandwidth consumption and improve website loading speeds. The format supports transparency through alpha channels and even animation capabilities, making it a versatile choice for web developers seeking to optimize performance. Modern browsers universally support WebP, with adoption reaching nearly complete saturation across desktop and mobile platforms, cementing its position as a cornerstone of contemporary web optimization strategies.
              </p>
              <p className="mb-4">
                PNG (Portable Network Graphics) predates WebP considerably, having been developed in the mid-1990s as a patent-free replacement for the GIF format. PNG excels at lossless compression, meaning images retain perfect quality without any degradation regardless of how many times theyre saved or edited. The formats robust support for transparency through alpha channels makes it ideal for graphics requiring precise transparency control, such as logos, icons, interface elements, and any imagery requiring compositing over varied backgrounds. PNGs universal compatibility extends beyond web browsers to virtually every image editing application, document processor, and design tool ever created, ensuring files remain accessible across diverse software ecosystems.
              </p>
              <p className="mb-4">
                The need to convert between WebP and PNG arises from the tension between web optimization and universal compatibility. While WebP delivers excellent performance for web delivery, many desktop applications, especially older versions of popular software, cannot open or edit WebP files. Professional design tools, print production workflows, legacy content management systems, and certain mobile applications may lack WebP support entirely. Converting WebP to PNG resolves these compatibility barriers, enabling users to work with images across any platform, application, or workflow without encountering format-related obstacles. Our converter facilitates this transformation seamlessly, processing conversions entirely within your browser to ensure privacy and security while delivering instant results.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Aspects of Format Conversion</h3>
              <p className="mb-4">
                Converting WebP to PNG involves decoding the WebP image data into a raw bitmap representation, then re-encoding this data using PNG compression algorithms. This process must carefully preserve important image properties including pixel data accuracy, transparency information, color depth, and metadata when possible. Modern browsers provide native WebP decoding capabilities through their image rendering engines, enabling JavaScript-based converters to load WebP files, extract pixel data using canvas elements, and generate PNG output using the standard toDataURL() method with PNG MIME type specification. This client-side approach eliminates server upload requirements, ensuring conversion speed, privacy protection, and reduced infrastructure costs.
              </p>
              <p className="mb-4">
                The conversion process inherently involves certain trade-offs and considerations that affect output characteristics. Since PNG employs different compression algorithms than WebP, converted PNG files typically occupy more storage space than their WebP sources, sometimes significantly so depending on image characteristics. Lossy WebP images, having already discarded certain visual information during their creation, cannot recover that lost detail through conversion to PNG—the conversion preserves the quality present in the WebP file but cannot enhance it. Lossless WebP conversions maintain perfect quality in PNG output, as both formats support lossless compression, though file sizes may still differ due to algorithmic differences between the formats.
              </p>
              <p className="mb-4">
                Transparency handling requires special attention during conversion to ensure alpha channel information transfers correctly. WebP supports both simple transparency (pixels are either fully transparent or fully opaque) and advanced semi-transparency (pixels can have any opacity level from 0% to 100%). PNG similarly supports full alpha channel transparency, ensuring perfect preservation of transparency data during conversion. However, certain edge cases around color profiles, gamma correction, and metadata preservation may require careful handling depending on the specific images being converted and their intended use cases. Our converter implements best practices for transparency preservation, ensuring converted PNG files maintain the exact transparency characteristics present in source WebP images.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications and Use Cases</h3>
              <p className="mb-4">
                Graphic designers and digital artists frequently encounter WebP files downloaded from websites or received from clients, yet their professional tools may require PNG format for editing workflows. Adobe Photoshop, while supporting WebP through plugins in recent versions, historically lacked native WebP support, forcing designers to convert files before editing. Other professional tools like Affinity Designer, Sketch, or specialized applications for logo design, icon creation, or print production may similarly require PNG input. Converting WebP to PNG enables designers to import images into their preferred tools without compatibility barriers, maintaining project workflows and ensuring all team members can access and edit visual assets regardless of their software versions.
              </p>
              <p className="mb-4">
                Web developers and content creators managing websites built on older content management systems or frameworks may need PNG versions of WebP images for backward compatibility. While modern CMS platforms increasingly support WebP, legacy systems, custom-built websites, or platforms with limited plugin ecosystems might lack proper WebP handling. Converting images to PNG ensures content displays correctly across all platforms and browser versions, preventing broken images for users accessing sites through outdated browsers or systems. Email marketing campaigns particularly benefit from PNG conversion, as email clients show highly variable image format support, with PNG offering the most reliable cross-client compatibility.
              </p>
              <p className="mb-4">
                Documentation, education, and presentation contexts frequently require PNG format for maximum compatibility and quality assurance. Students creating reports, teachers developing educational materials, business professionals building presentations, or technical writers compiling documentation all benefit from PNGs universal software support. Screenshots captured in WebP format on modern systems need conversion to PNG for inclusion in PDF documents, Microsoft Office files, Google Workspace documents, or printed materials. The conversion ensures images display correctly when documents are shared, viewed on different systems, or sent to professional printing services that may not recognize WebP format in their production workflows.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Considerations and Optimization</h3>
              <p className="mb-4">
                Understanding quality implications of WebP to PNG conversion helps users make informed decisions about when and how to perform conversions. If the source WebP file was created using lossless compression, converting to PNG preserves perfect quality since both formats support lossless encoding. The PNG output will be visually identical to the original image that was compressed into WebP format, maintaining every pixel exactly as it appeared originally. However, lossless WebP to PNG conversion typically increases file size significantly, as PNG compression algorithms generally achieve lower compression ratios than WebP for similar quality levels, particularly for photographic content with complex color variations.
              </p>
              <p className="mb-4">
                Lossy WebP sources present different quality considerations during PNG conversion. Since lossy compression discards visual information deemed less perceptually important, this lost data cannot be recovered through format conversion. Converting lossy WebP to PNG produces a lossless PNG file that perfectly preserves the quality present in the WebP source, but cannot enhance or restore information removed during the original lossy compression process. Users should understand that the PNG output quality matches the WebP input quality—conversion doesnt degrade quality further, but neither does it magically improve quality of lossy sources. For critical applications requiring maximum quality, maintaining original uncompressed or lossless source images proves preferable to converting lossy compressed files.
              </p>
              <p className="mb-4">
                File size management becomes important when converting multiple images or large files, as PNG versions typically consume more storage than equivalent WebP files. Users working with limited storage, slow internet connections, or large image libraries should consider whether PNG conversion is necessary for all files or only those specifically requiring PNG format for compatibility reasons. Maintaining WebP versions for web deployment while creating PNG versions specifically for editing workflows or compatibility requirements provides a balanced approach. Batch conversion tools, including our browser-based converter, enable efficient processing of multiple files simultaneously, though users should monitor available storage and browser memory limits when converting numerous or very large images.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Browser-Based Conversion: Security and Privacy</h3>
              <p className="mb-4">
                Client-side image conversion, where processing occurs entirely within the users web browser rather than uploading files to remote servers, offers significant security and privacy advantages. When users upload images to server-based conversion services, those images traverse networks, temporarily reside on service provider servers, and potentially get stored, logged, or analyzed depending on the services privacy policies and security practices. Sensitive images—confidential business documents, personal photographs, unreleased product designs, or any proprietary visual content—face exposure risks when transmitted to and processed by third-party services, even those claiming to delete files after processing.
              </p>
              <p className="mb-4">
                Browser-based conversion eliminates these concerns by performing all processing locally on the users device using JavaScript and browser APIs. Images never leave the users computer, never traverse networks, and never reach external servers. The conversion process loads WebP files into browser memory, decodes them using native browser capabilities, renders them to HTML canvas elements, and exports PNG data using standard browser functions—all operations executing entirely within the browsers sandboxed environment. This architecture ensures that even service providers operating browser-based tools cannot access user images, as the conversion code executes on user devices rather than provider servers.
              </p>
              <p className="mb-4">
                Additional privacy benefits emerge from browser-based processing, including elimination of file size upload limits, removal of network speed constraints affecting conversion time, independence from server availability or service reliability, and avoidance of account creation or user tracking requirements common with online services. Users working with sensitive content, operating under strict confidentiality agreements, or simply valuing privacy can convert images confidently knowing their data remains completely private. The only limitation involves browser capabilities and device performance—complex conversions or very large files may strain browser resources, but this trade-off between privacy and performance often proves acceptable for users prioritizing data security.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Practices and Workflow Integration</h3>
              <p className="mb-4">
                Establishing efficient workflows for image format management involves strategic decisions about when to use WebP, when to use PNG, and when conversion between formats provides value. Web-focused workflows should prioritize WebP for actual website deployment to maximize loading speed and minimize bandwidth costs, while maintaining PNG versions of master images for editing purposes. This dual-format approach ensures optimal web performance without sacrificing editing flexibility or compatibility with professional tools. Automated build processes can convert PNG masters to WebP during website deployment, ensuring web-optimized formats without manual conversion overhead while preserving high-quality PNG sources.
              </p>
              <p className="mb-4">
                Organizing converted files with clear naming conventions and directory structures prevents confusion and facilitates efficient asset management. Maintaining separate directories for web-optimized WebP images and editable PNG versions, using consistent naming that indicates format and purpose, and documenting conversion settings for reproducibility all contribute to maintainable workflows. Version control systems should track master PNG files while treating generated WebP versions as build artifacts excluded from repositories. This approach keeps repositories focused on source assets while enabling automated generation of optimized formats during deployment processes.
              </p>
              <p className="mb-4">
                Batch conversion strategies streamline processing of multiple images simultaneously, saving time and ensuring consistency across image libraries. When converting entire directories or projects, establishing quality standards, file naming patterns, and organizational schemes before beginning batch operations prevents cleanup work later. Testing conversion settings on representative sample images before batch processing large libraries helps identify issues early. Regular audits of converted images verify quality preservation, proper transparency handling, and appropriate file sizing, ensuring conversion processes maintain standards throughout project lifecycles. Integrating conversion tools into existing design and development workflows rather than treating conversion as separate, ad-hoc activities improves efficiency and reduces errors.
              </p>
            </section>

            <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border-2 border-green-200 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion: Seamless Format Conversion for Modern Workflows</h3>
              <p className="mb-4">
                WebP to PNG conversion bridges the gap between modern web optimization and universal compatibility, enabling users to leverage WebPs efficiency advantages while maintaining PNG compatibility wherever needed. Understanding the technical aspects of format conversion, quality implications, security considerations, and workflow integration strategies empowers users to make informed decisions about image format management. Whether working with professional design tools requiring PNG input, supporting legacy systems lacking WebP capabilities, or ensuring maximum compatibility across diverse platforms, reliable format conversion proves essential.
              </p>
              <p>
                Our WebP to PNG converter provides instant, secure, browser-based conversion that preserves image quality and transparency while protecting privacy through client-side processing. With support for batch conversion, drag-and-drop convenience, and immediate preview capabilities, the tool streamlines format conversion workflows for designers, developers, content creators, and anyone working with digital images. Start converting your WebP images to PNG today and experience the freedom of format-independent image workflows with our fast, free, and completely private conversion tool.
              </p>
            </section>
          </div>
        </article>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
          <h3 className="text-xl font-bold text-orange-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">💡</span> Expert Conversion Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Keep Original Files</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Always maintain backups of original high-quality images before conversion. Store both WebP and PNG versions if you need images for both web deployment and editing purposes.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Batch Convert Efficiently</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>When converting multiple files, organize them first and use batch processing to save time. This ensures consistent quality across all converted images.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Check Transparency</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>After conversion, verify that transparent areas appear correctly, especially for logos and graphics. PNG preserves transparency perfectly when properly converted.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Use WebP for Web</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Keep WebP versions for website use to maximize loading speed. Use PNG only where compatibility with editing tools or legacy systems is required.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}