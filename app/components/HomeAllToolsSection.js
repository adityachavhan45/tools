"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const INITIAL_VISIBLE = 16;
const LOAD_STEP = 12;

const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-yellow-500 to-orange-500",
  "from-cyan-500 to-blue-500",
];

const ICON_MAP = {
  "/pdf-merge": "PDF",
  "/pdf-split": "PDF",
  "/pdf-to-image": "IMG",
  "/pdf-compressor": "ZIP",
  "/pdf-password-remover": "LOCK",
  "/pdf-rotate": "ROT",
  "/image-compressor": "IMG",
  "/image-resizer": "SIZE",
  "/image-cropper": "CROP",
  "/png-to-jpg": "PNG",
  "/jpg-to-png": "JPG",
  "/jpg-to-webp": "WEBP",
  "/webp-to-png": "WEBP",
  "/svg-to-png": "SVG",
  "/png-to-ico": "ICO",
  "/images-to-pdf": "IMG",
  "/word-counter": "TXT",
  "/json-formatter": "JSON",
  "/html-formatter": "HTML",
  "/markdown-to-html": "MD",
  "/meta-tag-generator": "SEO",
  "/schema-markup-generator": "SCH",
  "/robots-txt-generator": "BOT",
  "/serp-snippet-preview": "SERP",
  "/url-encoder": "URL",
  "/uuid-generator": "UUID",
  "/password-generator": "PWD",
  "/bmi-calculator": "BMI",
  "/age-calculator": "AGE",
  "/sip-calculator": "SIP",
  "/gst-calculator": "GST",
  "/loan-calculator": "LOAN",
  "/tip-calculator": "TIP",
  "/percentage-calculator": "%",
  "/compound-interest-calculator": "INT",
  "/temperature-converter": "TEMP",
  "/unit-converter": "UNIT",
  "/time-zone-converter": "TIME",
  "/csv-to-json": "CSV",
  "/json-to-csv": "JSON",
  "/morse-code-translator": "MRS",
  "/random-number-generator": "RND",
  "/lorem-ipsum-generator": "TXT",
  "/color-palette-generator": "CLR",
  "/hash-generator": "HASH",
  "/regex-tester": "REGX",
  "/color-picker": "CLR",
  "/qr-code": "QR",
  "/unix-time": "UNIX",
};

export default function HomeAllToolsSection({ toolSections }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const allTools = useMemo(() => {
    return toolSections.flatMap((section) =>
      section.links.map((tool) => ({
        ...tool,
        sectionKey: section.key,
      }))
    );
  }, [toolSections]);

  const visibleTools = allTools.slice(0, visibleCount);
  const hasMore = visibleCount < allTools.length;

  return (
    <section id="all-tools" className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Available Tools
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse our complete collection of 65+ professional tools
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleTools.map((tool, index) => {
          const gradient = GRADIENTS[index % GRADIENTS.length];
          const icon = ICON_MAP[tool.href] || "TOOL";

          return (
            <Link
              key={`${tool.href}-${index}`}
              href={tool.href}
              className="group relative block p-5 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}
              />

              <div className="relative mb-3">
                <div
                  className={`inline-flex items-center justify-center min-w-12 h-12 px-2 rounded-lg bg-gradient-to-br ${gradient} text-white text-xs font-semibold shadow-md group-hover:scale-110 transition-transform`}
                >
                  {icon}
                </div>
              </div>

              <div className="relative">
                <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tool.label}
                </h4>
                {tool.desc ? (
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">{tool.desc}</p>
                ) : null}
              </div>

              <div className="relative mt-3 flex items-center text-blue-600 text-xs font-medium">
                <span className="group-hover:mr-1 transition-all">Use Tool</span>
                <svg
                  className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + LOAD_STEP)}
            className="!bg-black !text-white !rounded-xl !shadow-none !py-2.5 !px-6 !text-sm !font-medium"
          >
            Load More
          </button>
        </div>
      ) : null}
    </section>
  );
}
