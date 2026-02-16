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
      plainSidebar
      whiteBackground
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

      <div className="space-y-6">
        {/* Upload area */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 transition-all duration-200">
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
        <div className="flex gap-3 flex-wrap">
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
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This Online Image Compressor
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          An online image compressor is a web-based tool that reduces the file size of digital images without requiring you to install software or send your files to a remote server. Large image files can slow down websites, fill up storage quickly, and make it hard to share photos over email or messaging apps when size limits apply. This compressor runs entirely inside your browser using modern web technologies, so your images stay on your device and are never uploaded to any external server. That means faster processing, better privacy, and no dependency on an internet connection after the page has loaded. Whether you are a blogger, a small business owner, a student, or someone who simply wants to free up space on their phone or computer, compressing images the right way helps you get smaller files that still look sharp and load quickly on any device.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How Image Compression Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Image compression works by removing or simplifying data that the human eye barely notices. There are two main approaches: lossless and lossy compression. Lossless methods keep every pixel exactly as in the original, so the file size reduction is limited but quality stays identical. Lossy compression, which is what most photo compressors use for formats like JPEG and WebP, discards some visual information in exchange for much smaller files. The compressor you use here applies a configurable quality level so you can choose the balance between file size and how good the image looks. For instance, a quality setting around 70% often gives a result that is hard to distinguish from the original on screen while cutting the file size by half or more. Understanding this trade-off helps you pick the right setting for web use, social media, or print.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Key Features of This Tool</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This image compressor supports the most common web and mobile image formats: JPEG, PNG, and WebP. You can upload a single image or several at once and process them in one go. A quality slider lets you control how much compression is applied, so you can favour smaller files or higher visual quality depending on your needs. Because everything runs in the browser, there is no need to create an account or wait for uploads to a server; you simply select your files, set the quality, and click compress. After processing, you see the compressed image with the new file size and can download it with one click. The tool is designed to work on desktops, tablets, and phones, so you can optimize images whether you are at your desk or on the move. All of this is done locally on your device, which keeps your photos private and avoids any reliance on third-party image storage or processing services.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Using this compressor is straightforward. First, open the tool on any modern browser. Then, either drag one or more images onto the upload area or click to open the file picker and select the images you want to compress. Once the files are selected, you will see how many images are ready. Next, move the quality slider to your preferred level; a value around 70% is a good starting point for most photos. When you are ready, click the compress button and wait a few seconds while the tool processes your images. When processing is done, you will see a grid of compressed images with the original and new file sizes. You can compare the results and, if needed, try again with a different quality setting. Finally, use the download button under each image to save the compressed file to your device. There is no limit on how many times you can compress; you can run the tool again whenever you have new images to optimize.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Image File Size Matters for Websites</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          On many websites, images account for more than half of the total page size. Unoptimized images lead to slower loading times, especially for users on mobile networks or older devices. Search engines like Google take page speed into account when ranking sites, so smaller, well-compressed images can indirectly help your pages rank better and improve the experience for visitors. Faster pages also tend to have lower bounce rates and higher engagement, which matters for blogs, online stores, and portfolios. By compressing images before you upload them to your site or CMS, you reduce bandwidth usage, save hosting resources, and make your content more accessible to people with limited data or slow connections. Even if you are not building a website, smaller images are easier to attach to emails, share in chat apps, and store in the cloud without hitting size limits or paying for extra storage.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Practical Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Bloggers and content creators can use an image compressor to prepare photos and graphics for articles and social media. Smaller files mean quicker uploads to WordPress, Medium, or other platforms and faster page loads for readers. E-commerce sellers often need to display product images in high resolution while keeping page speed under control; compressing product photos before uploading helps achieve both. Photographers and designers can create lighter previews or thumbnails to send to clients without losing too much detail. Students and educators can reduce the size of diagrams and screenshots before submitting assignments or sharing slides. Travelers and everyday users can compress vacation photos or family pictures to save phone storage and mobile data when backing up or sharing. Small businesses that send newsletters or brochures by email can stay within attachment limits by compressing images first. In short, anyone who works with digital images can benefit from a quick, free, and private way to reduce file size without leaving the browser.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Understanding Image Formats: JPG, PNG, and WebP</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          JPEG, or JPG, is the most common format for photographs. It supports millions of colours and uses lossy compression, which makes it ideal for photos where a small loss in detail is acceptable in exchange for much smaller files. PNG is often used for graphics, logos, and images that need transparency or sharp edges; it typically produces larger files than JPEG but preserves fine details and supports a transparent background. WebP is a modern format developed by Google that can be either lossy or lossless and often offers better compression than JPEG and PNG for the same visual quality. Many browsers and platforms now support WebP, making it a strong choice for web use. This compressor works with all three formats so you can optimize whatever type of image you have, whether it is a photo from your camera, a screenshot, or an illustration exported from design software.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Security</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you use an online tool, it is natural to wonder where your files go. With this image compressor, your images never leave your device. The compression is performed entirely in your browser using JavaScript and standard web APIs. No copy of your image is sent to a server, stored in a database, or shared with any third party. That is important for personal photos, confidential documents, or any image you do not want to upload to the cloud. It also means you can use the tool on a public or shared computer with less worry about leaving traces of your files behind. As long as you download your compressed images and clear the page or close the tab when you are done, there is no persistent storage of your pictures on the web. This local-first approach is one of the main advantages of browser-based compression compared to services that require you to upload files to their servers.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Best Practices and Tips</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          For most photographs, a quality setting between 60% and 80% gives a good balance: the image still looks clear on screen and in print, while the file size drops noticeably. For graphics, logos, or images with text, you may want to use a higher quality or consider keeping them in PNG if transparency is needed. It is always a good idea to keep a copy of the original high-resolution file before compressing, especially for important or one-of-a-kind images. If you are compressing for a specific platform, check whether that platform has recommended dimensions or file size limits and adjust your quality or resolution accordingly. When you compress multiple images, you can try one first with a chosen quality, check the result, and then apply the same setting to the rest. Finally, remember that over-compressing can make images look blurry or blocky; if the result looks worse than you want, increase the quality and compress again until you are satisfied.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Benefits for Different Users</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Website owners and developers benefit from compressed images because faster-loading pages improve user satisfaction and can positively influence search engine rankings. Social media managers and marketers can prepare visuals for posts and ads without hitting platform size limits or losing too much quality. Educators and students can shrink screenshots, diagrams, and project images so that they upload quickly to learning management systems and email. Freelancers and remote workers can send client previews and deliverables in smaller attachments that are easier to open on slow connections. Mobile users can compress photos and videos before backing them up or sharing in chat apps, saving both device storage and data. Even casual users who only occasionally need to email a photo or fill a form with an image will find that a quick compression step avoids frustrating file-too-large errors. The same tool serves all these needs without sign-up, installation, or cost.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations to Keep in Mind</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This tool is intended for normal photo and image compression. Very large files or a very high number of images at once may take longer to process or, on low-memory devices, might cause the browser to slow down. The output format depends on what your browser supports; in most cases you will get a compressed version in a compatible format. Compression cannot add detail that was not in the original image, so starting with a clear, well-exposed photo will always give better results than trying to fix a blurry or dark image by compressing it. If you need exact pixel dimensions or specific format conversion for print or professional workflows, you might still need dedicated desktop or professional software; this compressor is best for quick, everyday optimization for web, email, and casual use. For most users, these limitations do not get in the way of achieving smaller, web-friendly images quickly and safely.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Reducing image file size is a simple habit that improves website performance, saves storage, and makes sharing easier. This free online image compressor runs in your browser, supports JPG, PNG, and WebP, and lets you control quality with a slider. Because processing happens locally, your images stay private and you do not need to create an account or wait for server uploads. Whether you are optimizing photos for a blog, preparing images for email, or freeing up space on your device, you can use this tool on a computer, tablet, or phone to get smaller, high-quality images in just a few clicks. Keep your originals when it matters, choose a sensible quality level, and you will have images that load fast and look great everywhere they are used.
        </p>
      </section>
    </ToolSection>
  );
}
