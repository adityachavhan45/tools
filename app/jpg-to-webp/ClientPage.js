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
      plainSidebar
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

      <div className="space-y-6">
        {/* Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200">
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
            Quality: <span className="text-teal-600">{(quality * 100).toFixed(0)}%</span>
          </label>
          <input
            className="accent-teal-600 flex-1 min-w-[120px] max-w-[280px] h-2 rounded-full"
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
          />
          <span className="text-xs text-slate-500">Higher = better quality, larger file</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
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
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About JPG to WebP Conversion
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Converting JPG to WebP means turning a JPEG image into the WebP format. WebP is a modern image format developed by Google that typically produces smaller files than JPEG at the same visual quality, or better quality at the same file size. It supports both lossy and lossless compression and can also support transparency, similar to PNG. This converter runs in your browser: you select one or more JPG files, set a quality level, and click convert. The tool draws each image onto a canvas and exports it as WebP. No file is sent to a server, so the process is private and fast. People convert JPG to WebP to reduce file size for websites and apps, to improve page load speed and Core Web Vitals, or because a platform or workflow requires WebP. Whether you are a developer, designer, or content creator, this tool provides a simple way to get WebP images from JPG without installing software.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is WebP and Why Use It?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          WebP was introduced to offer better compression than JPEG and PNG for use on the web. In lossy mode, WebP often achieves 25 to 35 percent smaller file sizes than JPEG at similar visual quality. That means faster-loading web pages, lower bandwidth use, and better performance scores in tools like Google PageSpeed Insights. WebP also supports an alpha channel for transparency, so it can replace PNG in many cases with smaller files. All major modern browsers support WebP, including Chrome, Firefox, Safari, and Edge, as do Android and iOS. Converting existing JPGs to WebP is a common step when optimising a website or preparing assets for an app. The format is widely supported enough that it is a practical default for many web projects today.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Converter Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you select JPG files, they are added to a list. You can adjust the quality slider from about 30 percent to 100 percent. Higher values keep more detail and produce larger files; lower values reduce file size but may introduce visible compression. When you click convert, each image is loaded into the browser, drawn onto an off-screen canvas at its original dimensions, and then exported using the canvas API as WebP with your chosen quality. The result is a data URL that is shown as a preview and offered as a download. The tool processes one image after another so that multiple files are converted in sequence. All of this happens locally; no copy of your image is sent to a server. The tool works in any modern browser that supports canvas and the WebP export option.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Quality and File Size</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          WebP uses lossy compression when you set a quality value below 100 percent. The slider in this tool controls that value. A setting around 85 to 95 percent often gives a good balance: the image looks very close to the original JPG while the file size is usually smaller. Lower settings (for example 50 or 60 percent) produce smaller files but may show more compression artefacts, especially in detailed or sharp areas. There is no single best value; it depends on how much you prioritise file size versus quality. For hero images or important visuals, a higher quality is usually better. For thumbnails or background images, a lower setting may be acceptable. You can convert the same JPG at different quality levels and compare the results to find what works for your use case.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">When to Use WebP Instead of JPG</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Use WebP when you want smaller file sizes for the same visual quality, when you are optimising a website or app for speed, or when your hosting or CDN supports WebP and you want to serve it to supporting browsers. Use JPG when you need maximum compatibility with very old software or devices, or when a system explicitly requires JPEG. Many sites use both: they serve WebP to browsers that support it and fall back to JPG for others. Converting JPG to WebP is useful when you have a library of JPEGs and want to create WebP versions for your site or app without re-exporting from an editor. It is also useful when you receive JPGs from a camera or download and need to supply WebP for a project that requires it.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Open the tool in your browser on a computer, tablet, or phone. Click the upload area or the file button and select one or more JPG or JPEG images. The number of selected files is shown. Move the quality slider to your preferred level; 90 percent is a good default. Click the convert to WebP button. The tool will process each image in turn; wait until the conversion is complete. The converted WebP images appear in a grid with a preview, the new file name, and the approximate size change (original JPG size versus converted WebP size). Click the download link under each image to save that WebP file to your device. You can then use the files in your website, app, or design tool. To convert more images, add more files and convert again, or use clear all and start over. There is no fixed limit on how many images you convert; very large or numerous files may take longer depending on your device.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Benefits for Websites and Performance</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Smaller images mean faster page loads, which improves user experience and can positively affect search engine rankings. Google and other tools that measure page speed often recommend WebP for images. Converting your JPGs to WebP and serving them to supporting browsers can reduce bandwidth usage and hosting costs, especially on high-traffic sites. Mobile users on slower connections benefit from smaller image downloads. E-commerce sites can keep product images sharp while improving load times. Blogs and portfolios can show more images per page without slowing down the site. Even if you keep JPG as a fallback, having WebP versions gives you a simple way to optimise for visitors whose browsers support the format.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Web developers and designers convert JPG to WebP when building or optimising websites so that image-heavy pages load faster. Content creators and bloggers use it to prepare images for their CMS or static site generator. E-commerce teams use it for product photos and category banners. Social media managers and marketers sometimes convert assets to WebP for landing pages or ad creatives where file size matters. Students and educators can reduce the size of image-heavy documents or presentations. Anyone who has a batch of JPGs and wants WebP versions without opening each file in an editor can use this tool to convert them quickly in the browser. The ability to set quality and to convert multiple files in one go makes it suitable for both one-off and repeated use.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Security</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This converter runs entirely in your browser. The JPG files you select are read by the browser and kept in memory only for the time you are on the page. The conversion is done locally using the canvas API; no copy of your image is sent to a server or stored by us. When you download a WebP file, it is saved from your browser to your device. If you close the tab or leave the page, the image data is gone. This local-first approach is useful when you are converting sensitive or confidential images and do not want to upload them to an online service. You can use the tool on a shared or public computer with less worry about leaving files behind, as long as you download your results and clear the page when you are done.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Browser Support and Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          WebP is supported in all major modern browsers. If your browser can export WebP from the canvas (which this tool uses), the conversion will work. Very old browsers may not support WebP export; in that case you would need to use a newer browser or a different device. This tool converts one or more JPGs to WebP; it does not resize, crop, or add transparency. If your JPG has no transparent areas, the WebP will also have no transparency. The converted file size shown is an estimate based on the data URL length; the actual downloaded file may differ slightly. Very large images (for example tens of megapixels) or many files at once may take longer to process or may slow down the browser on low-memory devices. For typical photos and graphics, the tool works quickly and reliably.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Converting JPG to WebP is a simple way to get smaller, web-friendly images without losing much quality. This free converter runs in your browser, accepts one or more JPG or JPEG files, and lets you set the WebP quality with a slider. Your files are not uploaded to any server. Use it when you need WebP for a website, app, or project, or when you want to reduce file size for faster loading. For most images, a quality setting around 85 to 95 percent gives a good balance. Download your WebP files and use them wherever the format is supported. For quick, private, and straightforward JPG to WebP conversion, this tool is a reliable option.
        </p>
      </section>
    </ToolSection>
  );
}
