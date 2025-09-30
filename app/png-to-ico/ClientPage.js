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

  async function convert() {
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
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
    setMessage("✅ ICO created successfully!");
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    setFile(null);
    setOutUrl("");
    setMessage("🧹 Cleared!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "PNG to ICO",
          description: "Convert PNG images to ICO icon files suitable for favicons.",
          slug: "/png-to-ico",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PNG to ICO", slug: "/png-to-ico" },
        ])}
      />

      <div className="max-w-3xl mx-auto p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900">PNG to ICO Converter</h2>
        <p className="text-gray-600 mt-1">
          Create a 256×256 favicon (.ico) from a PNG or any image file.
        </p>

        {/* Messages */}
        {message && (
          <div className="mt-3 px-4 py-2 bg-green-50 border border-green-300 rounded-lg text-green-800 text-sm shadow">
            {message}
          </div>
        )}

        {/* File Upload */}
        <div className="mt-6">
          <label className="block w-full cursor-pointer">
            <span className="sr-only">Choose PNG</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile((e.target.files || [])[0] || null)}
              className="block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-5 file:rounded-full 
                         file:border-0 file:bg-slate-900 file:text-white 
                         hover:file:bg-black cursor-pointer"
            />
          </label>
        </div>

        {/* File Info */}
        {file && (
          <div className="mt-5 p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">
              Size: {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 flex gap-3 flex-wrap">
          <button
            className="px-6 py-2 bg-slate-900 text-white rounded-full shadow hover:bg-black disabled:opacity-60"
            disabled={!file}
            onClick={convert}
          >
            🚀 Convert
          </button>
          <button
            onClick={resetAll}
            disabled={!file && !outUrl}
            className="px-6 py-2 border rounded-full bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Preview */}
        {outUrl && (
          <div className="mt-8 p-5 border rounded-lg bg-white shadow-sm w-fit">
            <h4 className="font-semibold text-gray-800 mb-2">Preview</h4>
            <img
              src={outUrl}
              alt="ICO preview"
              className="w-16 h-16 border rounded mx-auto"
            />
            <a
              className="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              href={outUrl}
              download="favicon.ico"
            >
              ⬇️ Download ICO
            </a>
          </div>
        )}

        {/* Info Section */}
        <section className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">About PNG to ICO Tool</h3>
          <p className="text-gray-700 mb-4">
            The PNG to ICO converter is a simple yet highly practical tool designed
            for developers, designers, and everyday users who want to create favicon
            files quickly. In today’s digital world, a favicon is like a brand’s
            signature. Whenever you open a website, the tiny icon you see in the browser
            tab or bookmark bar is an ICO file. Without a favicon, even a beautiful
            website looks incomplete. That’s why this converter makes it easy to turn
            any PNG image into a professional ICO file without installing complicated
            design software.
          </p>

          <p className="text-gray-700 mb-4">
            The tool works completely in your browser. You upload an image (PNG, JPG,
            or other formats), and it generates a favicon.ico file of size 256×256 pixels.
            The processing happens locally, meaning your file never leaves your device.
            This is not only convenient but also ensures privacy and security.
            No uploads, no waiting, just instant results.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Why Favicons and ICO Files Matter</h4>
          <p className="text-gray-700 mb-4">
            Favicons are small, but their role in branding is huge. They improve user
            experience by helping visitors identify your site quickly when multiple tabs
            are open. A clean favicon also adds professionalism and trust. For example,
            imagine opening two websites — one has a crisp branded icon, and the other
            shows a generic browser symbol. Instinctively, you trust the one with the
            proper favicon. That’s the subtle power of a well-made ICO file.
          </p>

          <p className="text-gray-700 mb-4">
            ICO (icon) files are unique because they can contain multiple image sizes in
            a single file. Browsers and operating systems automatically pick the
            appropriate size depending on where the icon is displayed. In our tool, we
            focus on generating a 256×256 version which works as a universal size for
            favicons and app shortcuts.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🔧 How This PNG to ICO Converter Works</h4>
          <p className="text-gray-700 mb-4">
            The converter uses modern browser technologies like HTML canvas and
            JavaScript to resize your PNG into a square 256×256 canvas. It then
            packages this canvas into an ICO file format with proper headers.
            Everything is automatic — you just upload your image, click convert, and
            download the favicon.ico file. No design experience required.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Step 1: Upload your PNG or any image file.</li>
            <li>Step 2: The tool resizes and centers the image inside a 256×256 canvas.</li>
            <li>Step 3: It converts the canvas into ICO binary format.</li>
            <li>Step 4: Preview the icon instantly and download it as favicon.ico.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <p className="text-gray-700 mb-4">
            The PNG to ICO tool can be used in countless scenarios. Here are some
            practical examples:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Website Development:</strong> Add a professional favicon.ico to
              your site so it looks polished in browser tabs and search results.</li>
            <li><strong>Desktop Applications:</strong> Convert your app logo into ICO
              format for Windows shortcuts and installers.</li>
            <li><strong>Personal Projects:</strong> Create fun favicons for blogs,
              portfolios, or student projects.</li>
            <li><strong>Brand Identity:</strong> Ensure your logo is consistent across
              platforms, from websites to apps to desktop icons.</li>
            <li><strong>Testing and Prototyping:</strong> Quickly generate temporary
              favicons while experimenting with design ideas.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">💡 Benefits of Using This Tool</h4>
          <p className="text-gray-700 mb-4">
            Unlike heavy graphic software such as Photoshop or Illustrator, this tool is
            lightweight and instant. It runs on any modern browser, works offline once
            loaded, and doesn’t require any installation. Designers can save time by
            generating favicons on the fly, while beginners can create icons without
            learning complex design workflows.
          </p>
          <p className="text-gray-700 mb-4">
            Another benefit is privacy. Since everything runs locally, you don’t have to
            worry about your files being uploaded to a server. This makes it suitable
            for sensitive logos, brand designs, or private projects.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Does it only work with PNG?</strong> No, you can upload JPG,
              GIF, or other formats. They will be converted into ICO.</li>
            <li><strong>Why 256×256 size?</strong> It is a standard size supported by
              browsers and operating systems, ensuring maximum compatibility.</li>
            <li><strong>Is it secure?</strong> Yes, all processing is done in your
              browser, so no data is sent to any server.</li>
            <li><strong>Can I use it for commercial projects?</strong> Absolutely. You
              can generate favicons for personal or business websites without limitations.</li>
            <li><strong>Will quality be preserved?</strong> The tool uses
              high-quality image smoothing so your icon looks sharp.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
          <p className="text-gray-700">
            A favicon may look small, but it makes a big difference in user experience
            and branding. With this PNG to ICO converter, you can create professional
            icons in seconds without design skills or technical knowledge. Whether you
            are launching a new website, updating your blog, or building a desktop app,
            having a proper favicon sets you apart from the crowd. Try it now, and give
            your projects the polished, professional touch they deserve.
          </p>
        </section>
      </div>
    </main>
  );
}
