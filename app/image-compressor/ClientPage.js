"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import ToolSection from "../components/ToolSection";

export default function ImageCompressorPage() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.7);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  async function handleCompress() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
    const outputs = [];
    try {
      for (const file of files) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 2000,
          initialQuality: quality,
          useWebWorker: true,
        });
        const url = URL.createObjectURL(compressed);
        outputs.push({
          name: file.name,
          url,
          size: compressed.size,
          original: file.size,
        });
      }
      setResults(outputs);
      setMessage("Compression completed successfully.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setResults([]);
    setMessage("Cleared.");
  }

  const compressionPercent = files.length
    ? results.length
      ? Math.round(
          (1 - results.reduce((a, r) => a + r.size, 0) / files.reduce((a, f) => a + f.size, 0)) * 100
        )
      : null
    : null;

  return (
    <ToolSection
      title="Free Online Image Compressor"
      subtitle="Reduce JPG, PNG, and WebP file size in your browser. No upload to server fast, private, and works on all devices."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Image Compressor",
          description: "Compress images (JPG, PNG, WebP) in the browser without uploading. Reduce file size while keeping good quality.",
          slug: "/image-compressor",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Image Compressor", slug: "/image-compressor" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("successfully") ? "bg-emerald-600" : ""}
          ${message.includes("wrong") ? "bg-rose-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Image Compressor Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Compress multiple images in one place with adjustable quality and instant download.
          </p>
        </div>

        {/* Upload area */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200 shadow-sm">
          <p className="text-slate-600 mb-3 text-sm sm:text-base">
            Drag and drop images here or click to choose files
          </p>
          <input
            className="file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer text-slate-600"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          {files.length > 0 && (
            <p className="mt-3 text-slate-500 text-sm">
              {files.length} file{files.length > 1 ? "s" : ""} selected
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
            min="0.2"
            max="0.95"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
          />
          <span className="text-xs text-slate-500">Higher = better quality, larger file</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
          <button
            onClick={handleCompress}
            disabled={processing || !files.length}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {processing ? "Compressing…" : "Compress images"}
          </button>
          <button
            onClick={resetAll}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
          >
            Clear all
          </button>
        </div>

        {/* Summary when results exist */}
        {results.length > 0 && compressionPercent != null && (
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 text-teal-800 text-sm sm:text-base">
            Total size reduced by about <strong>{compressionPercent}%</strong>. Download your compressed images below.
          </div>
        )}

        {/* Results grid */}
        {results.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((r, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center p-2">
                  <img
                    src={r.url}
                    alt={r.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <p className="truncate font-medium text-slate-800 text-sm">{r.name}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Original: {(r.original / 1024).toFixed(1)} KB → Compressed: {(r.size / 1024).toFixed(1)} KB
                  </p>
                  <a
                    className="inline-block mt-3 w-full text-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition"
                    href={r.url}
                    download={r.name}
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Information section – 1000+ words, unique, text-justify */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Free Online Image Compressor for Faster Websites and Smaller Image Files
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Large image files are one of the biggest reasons why websites become slow and difficult to use on mobile devices. A high quality image may look good, but if the file size is too large, it can increase page loading time, consume more bandwidth, and create a poor user experience for visitors. This free online image compressor helps reduce image size directly inside your browser without making your photos look heavily damaged or blurry. The tool is designed for bloggers, developers, students, marketers, freelancers, and anyone who wants smaller image files without installing heavy software.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The best part is that everything works locally on your device. Your images are not uploaded to any server, which means your files remain private during the compression process. Whether you want to optimize photos for a website, reduce storage usage on your laptop, or send images through email without hitting attachment limits, this tool makes the process simple and fast.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Compressing Images Is Important
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many people upload original camera images directly to websites without optimization. Modern smartphones and cameras create photos that are extremely large in size. While these images may look sharp, they often slow down websites and negatively affect performance scores. Search engines prefer fast-loading pages because they provide a better experience for users. Compressing images before uploading them can help reduce page size and improve website speed.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    If you are managing a blog or business website, image optimization becomes even more important. Smaller images reduce hosting bandwidth usage and make websites load faster on slower internet connections. Website owners who focus on SEO often use tools like{" "}
    <a
      href="https://convertixy.com/google-discover-image-optimizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Google Discover Image Optimizer
    </a>{" "}
    to improve image visibility and loading performance for modern search platforms.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Online Image Compressor Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This compressor uses browser-based processing to reduce image size. Once you select an image, the compression happens directly inside your browser using web technologies supported by modern devices. Since the process runs locally, you do not need to wait for uploads or depend on cloud processing systems. This also helps improve privacy because your files never leave your computer or phone.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The tool allows you to adjust image quality depending on your needs. Higher quality settings keep more visual detail while lower quality settings create smaller file sizes. Most users find that medium quality levels provide an excellent balance between image clarity and compression. For website usage, this balance is usually enough to maintain visual quality while significantly improving loading speed.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Supported Image Formats
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This image compressor supports commonly used formats including JPG, PNG, and WebP. Each format serves a different purpose depending on the type of image you are working with.
  </p>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      JPG files are commonly used for photographs and social media images because they offer good compression with decent quality.
    </li>
    <li>
      PNG files are often used for transparent graphics, logos, screenshots, and design elements.
    </li>
    <li>
      WebP images provide modern compression and are widely used for faster websites and better performance optimization.
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    If you want to convert formats for additional optimization, you can also use tools like{" "}
    <a
      href="https://convertixy.com/jpg-to-webp"
      className="text-blue-600 hover:underline font-medium"
    >
      JPG to WebP
    </a>{" "}
    or{" "}
    <a
      href="https://convertixy.com/png-to-jpg"
      className="text-blue-600 hover:underline font-medium"
    >
      PNG to JPG
    </a>{" "}
    depending on your workflow requirements.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Benefits of Using Browser-Based Compression
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Traditional image compression tools usually require software installation or cloud uploads. Both methods can create problems for users who want quick processing or better privacy. Browser-based image compression removes these limitations by allowing instant optimization without external software.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since everything happens locally, the process is generally faster for smaller and medium-sized images. You can compress files on Windows, Linux, macOS, Android, and iPhone devices without worrying about compatibility issues. This makes the tool useful for both casual users and professionals working across different platforms.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Best Use Cases for Image Compression
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Image compression is useful in many real-world situations. Bloggers often compress feature images before publishing articles to improve loading speed and SEO performance. Ecommerce websites optimize product photos to create a faster shopping experience for visitors. Students compress screenshots and project files before uploading assignments to educational portals.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Freelancers and graphic designers also use image compression to reduce project delivery sizes. Smaller files are easier to send through messaging apps and email platforms. Social media managers compress visual content before posting to maintain faster uploads and lower data usage. Even regular smartphone users benefit from compression when device storage becomes limited.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    If you are creating image-heavy documents, you can combine compressed photos using tools like{" "}
    <a
      href="https://convertixy.com/images-to-pdf"
      className="text-blue-600 hover:underline font-medium"
    >
      Images to PDF
    </a>{" "}
    to make files easier to share and store.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Tips to Maintain Good Image Quality
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    One common mistake people make is over-compressing images. Extremely low quality settings can create blurry photos and visible compression marks. For most web usage, moderate compression works best. Keeping quality between medium and high usually provides a strong balance between appearance and file size.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    It is also recommended to resize oversized images before compression. For example, uploading a 6000-pixel-wide image to a small blog post is unnecessary and wastes bandwidth. Using an{" "}
    <a
      href="https://convertixy.com/image-resizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Resizer
    </a>{" "}
    before compression can significantly improve results and reduce storage usage even more.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy and File Safety
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Online privacy has become an important concern for internet users. Many compression platforms upload images to external servers where files may remain stored temporarily. This tool avoids that problem completely by processing files directly inside the browser. Your images are not shared, saved, or transferred anywhere during the compression process.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This local-first approach makes the tool suitable for personal images, confidential business graphics, screenshots, and sensitive documents that users may not want to upload to third-party servers. You maintain full control over your files throughout the process.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Mistakes People Make While Optimizing Images
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>
      Uploading extremely large images without resizing them first
    </li>
    <li>
      Compressing the same image multiple times repeatedly
    </li>
    <li>
      Choosing very low quality settings that damage image clarity
    </li>
    <li>
      Ignoring modern formats like WebP for website optimization
    </li>
    <li>
      Forgetting to keep a backup of the original image
    </li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Avoiding these mistakes can help maintain better visual quality while still achieving smaller file sizes. Smart optimization improves both website performance and user experience.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    Image compression is no longer optional for modern websites and digital workflows. Smaller image files improve loading speed, reduce storage usage, and create a smoother experience for users across desktops and mobile devices. This free online image compressor provides a simple way to optimize JPG, PNG, and WebP images directly from your browser without complicated software or server uploads.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 text-justify">
    Whether you are a blogger, developer, student, ecommerce seller, freelancer, or casual internet user, optimizing images can save time, storage, and bandwidth. With local browser processing, adjustable quality settings, and support for modern image formats, this tool helps create smaller files while keeping images visually clean and professional.
  </p>
</section>
    </ToolSection>
  );
}
