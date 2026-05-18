"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";
import ToolSection from "../components/ToolSection";

export default function JpgToWebpPage() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.9);
  const [outputs, setOutputs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const safeQuality = Number.isFinite(quality) ? quality : 0.9;

  async function convert() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
    const results = [];
    try {
      for (const file of files) {
        if (file.type !== "image/jpeg" && file.type !== "image/jpg") continue;
        const img = new Image();
        const url = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
          img.src = url;
        });
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          throw new Error("Canvas not supported");
        }
        ctx.drawImage(img, 0, 0);
        const webpUrl = canvas.toDataURL("image/webp", quality);
        URL.revokeObjectURL(url);
        const name = file.name.replace(/\.(jpe?g)$/i, "") || "image";
        results.push({
          name: `${name}.webp`,
          url: webpUrl,
          original: file.size,
          converted: Math.round((webpUrl.length * 3) / 4),
        });
      }
      setOutputs(results);
      setMessage("Conversion complete. Download your WebP files below.");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setOutputs([]);
    setMessage("Cleared.");
  }

  return (
    <ToolSection
      title="Free JPG to WebP Converter"
      subtitle="Convert JPG or JPEG images to WebP in your browser. Adjust quality, smaller file size no upload to server, works on all devices."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "JPG to WebP",
          description: "Convert JPG and JPEG to WebP online with quality control. In-browser, no sign-up.",
          slug: "/jpg-to-webp",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "JPG to WebP", slug: "/jpg-to-webp" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("complete") ? "bg-emerald-600" : ""}
          ${message.includes("wrong") ? "bg-rose-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            JPG to WebP Converter Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Convert JPG and JPEG images into optimized WebP format in seconds.
          </p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200 shadow-sm">
          <p className="text-slate-600 mb-3 text-sm sm:text-base">
            Drag and drop JPG images here or click to choose files
          </p>
          <input
            type="file"
            accept="image/jpeg,image/jpg,.jpg,.jpeg"
            multiple
            className="file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer text-slate-600"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          {files.length > 0 && (
            <p className="mt-3 text-slate-500 text-sm">
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Quality */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <label className="text-sm font-medium text-slate-700 min-w-[100px]">
            Quality: <span className="text-teal-600">{(safeQuality * 100).toFixed(0)}%</span>
          </label>
          <input
            className="accent-teal-600 flex-1 min-w-[120px] max-w-[280px] h-2 rounded-full"
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={safeQuality}
            onChange={(e) => {
              const next = parseFloat(e.target.value);
              setQuality(Number.isFinite(next) ? next : 0.9);
            }}
          />
          <span className="text-xs text-slate-500">Higher = better quality, larger file</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
          <button
            onClick={convert}
            disabled={processing || !files.length}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {processing ? "Converting…" : "Convert to WebP"}
          </button>
          <button
            onClick={resetAll}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
          >
            Clear all
          </button>
        </div>

        {/* Outputs */}
        {outputs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {outputs.map((o, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center p-2">
                  <img src={o.url} alt={o.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="p-4">
                  <p className="truncate font-medium text-slate-800 text-sm">{o.name}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {(o.original / 1024).toFixed(1)} KB → {(o.converted / 1024).toFixed(1)} KB
                  </p>
                  <a
                    href={o.url}
                    download={o.name}
                    className="inline-block mt-3 w-full text-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition"
                  >
                    Download WebP
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          Why More Websites Are Moving From JPG to WebP Images
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Website speed has become one of the most important parts of creating a better user experience online. Visitors expect pages to open quickly, images to load smoothly, and websites to work properly even on slower mobile networks. Because of this, image optimisation is no longer something only developers care about. Bloggers, online store owners, designers, students, marketers, and content creators are all searching for better image formats that help reduce loading time without making photos look blurry.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          JPG has been one of the most commonly used image formats for years because it works almost everywhere and keeps image quality decent while reducing file size. However, modern websites now need lighter and more efficient image formats. WebP has become a popular choice because it can often create much smaller image files while still keeping visuals sharp and clean. This is one of the main reasons why so many website owners are converting JPG images into WebP format today.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This JPG to WebP Converter helps users transform images directly inside the browser without installing heavy software or uploading files to third party servers. The process stays simple, fast, and beginner friendly. Whether you are improving blog performance, preparing product images for an ecommerce website, or trying to improve Core Web Vitals scores, converting images into WebP format can make a noticeable difference.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Understanding the Difference Between JPG and WebP
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          JPG images are widely used because they balance image quality and file size reasonably well. Cameras, smartphones, editing tools, and websites commonly use JPG files for photographs and graphics. The problem appears when websites contain many large JPG images. Bigger image sizes can slow down websites, increase mobile data usage, and negatively affect user experience.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          WebP was introduced as a modern image format designed mainly for web performance. In many situations, WebP files become significantly smaller compared to JPG images while keeping similar visual quality. Smaller image sizes help websites load faster, especially on mobile devices. Faster loading can improve visitor retention and may also support better search performance over time.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Many developers now combine WebP images with performance optimisation strategies such as image compression, lazy loading, caching, and SEO improvements. If you are already improving website speed using tools like the <a href="https://convertixy.com/seo-audit-checker" className="text-blue-600 hover:underline font-medium">SEO Audit Checker</a>, converting heavy JPG images into WebP can further improve loading performance naturally.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          How This Browser Based Converter Handles Image Conversion
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          One of the biggest advantages of this tool is that everything works directly inside your browser. Users simply upload JPG or JPEG files, choose their preferred quality level, and start the conversion process. The browser processes images locally using canvas technology and generates downloadable WebP files within seconds.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Since the conversion happens locally, your images are not stored on external servers during the process. This helps maintain better privacy and also reduces waiting time because files do not need to travel through remote systems before conversion. Many users prefer browser based tools because they feel simpler, faster, and safer for everyday use.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          The tool is designed for both casual and regular usage. Someone converting a few personal images can use it easily, while bloggers or website owners handling multiple graphics can also process several files quickly without needing advanced technical knowledge.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Why Smaller Images Matter More Than Ever
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Modern internet users rarely wait patiently for slow websites. Even a delay of a few seconds can increase bounce rates. Heavy images are often one of the biggest reasons websites feel slow. Compressing and converting images into efficient formats helps reduce unnecessary page weight.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Smaller image sizes improve website speed in multiple ways. Pages open faster, users consume less mobile data, and hosting bandwidth usage becomes lower. Faster pages also improve the overall browsing experience for visitors using older devices or slower network connections.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Website optimisation is not only about images though. Many site owners also optimise code, text formatting, and SEO settings together. For example, developers often use tools such as the <a href="https://convertixy.com/html-formatter" className="text-blue-600 hover:underline font-medium">HTML Formatter</a> to clean webpage structure while simultaneously reducing image sizes for better performance.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Choosing the Right WebP Quality Settings
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Quality settings play a major role during image conversion. Higher quality settings keep more details inside the image but usually create slightly larger files. Lower quality settings reduce file size further but can sometimes introduce visible compression artefacts.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          For most websites, a quality range between 80 and 95 percent works well. This range generally keeps photos sharp while still reducing file size significantly compared to standard JPG images. Product pages, blog banners, portfolio images, and thumbnails often perform well within this range.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Users should test different settings based on their goals. If maximum image quality is important, a higher setting may work better. If speed and lightweight performance are the priority, slightly lower quality levels can help achieve faster loading times.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Situations Where WebP Conversion Becomes Extremely Useful
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Bloggers frequently use WebP images to improve article loading speed and make long content pages feel smoother. Ecommerce websites use WebP to display product galleries without making pages heavy. Portfolio websites benefit because high quality images can still load quickly. Educational websites and online learning platforms also reduce image sizes to improve accessibility for students using slower internet connections.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Developers working on performance optimisation projects often combine WebP conversion with additional image adjustments. For example, users may first resize large photos using the <a href="https://convertixy.com/image-resizer" className="text-blue-600 hover:underline font-medium">Image Resizer</a> before converting them into WebP format for better optimisation results.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Content creators who regularly publish feature images, banners, and thumbnails can save considerable storage space over time by switching from large JPG files to lighter WebP versions. This becomes especially important for websites containing hundreds or thousands of images.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Privacy Benefits of Local Image Processing
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Privacy matters to many internet users today. Some online image tools require uploading files to remote servers where users cannot always know how files are stored or managed. Browser based image processing helps reduce those concerns.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Since this converter works locally inside the browser, selected images remain on the user device during the process. After conversion, files can be downloaded directly without depending on external storage systems. This approach feels more comfortable for users handling personal photos, confidential graphics, or business related media.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Local processing also helps reduce unnecessary waiting times because users do not need to upload large files before conversion begins. Everything stays lightweight and efficient.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Browser Compatibility and Modern Web Support
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          WebP support has improved significantly over the years. Most modern browsers including Chrome, Edge, Firefox, and Safari now support WebP images properly. Mobile browsers also handle the format efficiently, making it practical for modern web development.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Many content management systems, website builders, and hosting platforms now support WebP images by default. Developers commonly use WebP alongside responsive image strategies to improve loading speed across different devices and screen sizes.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          If users need additional optimisation for already converted files, they can also reduce image size further using tools such as the <a href="https://convertixy.com/image-compressor" className="text-blue-600 hover:underline font-medium">Image Compressor</a> depending on their project requirements.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Practical Tips for Better Website Image Optimisation
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Good optimisation is usually achieved through a combination of small improvements rather than relying on only one change. Website owners should avoid uploading unnecessarily large images. Resizing photos before uploading, compressing images carefully, using responsive dimensions, and selecting efficient formats all help improve performance.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          File naming and organisation also matter. Clear file names help maintain better workflow management and may support SEO efforts naturally. Consistent optimisation habits can make websites feel cleaner and more professional over time.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Users should regularly review image quality after conversion to ensure visuals still look attractive across desktop and mobile devices. Performance should improve without damaging user experience.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          Final Thoughts on Using JPG to WebP Conversion
        </h3>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Converting JPG images into WebP format has become one of the easiest ways to improve website performance while maintaining strong visual quality. Smaller image sizes can help websites load faster, improve browsing experience, reduce bandwidth usage, and support better overall optimisation practices.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
          This browser based JPG to WebP Converter keeps the process simple for everyone. Users can upload images, choose quality settings, convert files quickly, and download optimised WebP versions without needing technical expertise. Because the tool works locally inside the browser, it also provides a more private and convenient experience.
        </p>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
          Whether you are running a blog, building an ecommerce store, managing a portfolio website, or simply organising personal images, WebP conversion can help create a faster and more efficient digital experience. Using lightweight image formats is no longer only a developer practice. It has now become an important part of building modern, user friendly websites.
        </p>
      </section>
    </ToolSection>
  );
}
