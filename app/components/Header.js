"use client";

import { useState } from "react";
import Link from "next/link";

const sections = [
  {
    key: "images",
    label: "Images",
    dropdownWidth: "w-[320px] md:w-[520px]",
    gridClass: "md:grid-cols-2",
    links: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-resizer", label: "Image Resizer" },
      { href: "/png-to-jpg", label: "PNG to JPG" },
      { href: "/jpg-to-webp", label: "JPG to WebP" },
      { href: "/webp-to-png", label: "WebP to PNG" },
      { href: "/svg-to-png", label: "SVG to PNG" },
      { href: "/png-to-ico", label: "PNG to ICO" },
      { href: "/images-to-pdf", label: "Images to PDF" },
    ],
  },
  {
    key: "pdf",
    label: "PDF",
    dropdownWidth: "w-[280px]",
    links: [
      { href: "/pdf-merge", label: "PDF Merge" },
      { href: "/pdf-split", label: "PDF Split" },
      { href: "/pdf-to-image", label: "PDF to Image" },
    ],
  },
  {
    key: "text",
    label: "Text",
    dropdownWidth: "w-[280px]",
    links: [
      { href: "/word-counter", label: "Word Counter" },
      { href: "/case-converter", label: "Case Converter" },
      { href: "/slug-generator", label: "Slug Generator" },
      { href: "/json-formatter", label: "JSON Formatter" },
      { href: "/base64", label: "Base64 Encode/Decode" },
    ],
  },
  {
    key: "seo",
    label: "SEO",
    dropdownWidth: "w-[300px]",
    links: [
      { href: "/meta-tag-generator", label: "Meta Tag Generator" },
      { href: "/url-encoder", label: "URL Encoder/Decoder" },
      { href: "/uuid-generator", label: "UUID Generator" },
      { href: "/password-generator", label: "Password Generator" },
    ],
  },
  {
    key: "extras",
    label: "Extras",
    dropdownWidth: "w-[280px]",
    links: [
      { href: "/color-picker", label: "Color Picker" },
      { href: "/qr-code", label: "QR Code" },
      { href: "/unix-time", label: "Unix Time" },
    ],
  },
];

function CaretIcon({ isOpen }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-3 w-3 transform transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) {
        setOpenDropdown(null);
      }
      return next;
    });
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-90 transition">
          convertixy
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded border border-white/20 p-2 text-gray-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/" className="hover:underline" onClick={handleNavClick}>
              Home
            </Link>
            {sections.map((section) => (
              <div key={section.key} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(section.key)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500/40"
                  aria-expanded={openDropdown === section.key}
                  aria-controls={`${section.key}-menu`}
                >
                  <span>{section.label}</span>
                  <CaretIcon isOpen={openDropdown === section.key} />
                </button>
                {openDropdown === section.key && (
                  <div
                    id={`${section.key}-menu`}
                    className={`absolute left-0 mt-2 ${
                      section.dropdownWidth ?? "w-64"
                    } card-surface shadow-xl p-3`}
                  >
                    <div
                      className={`grid grid-cols-1 gap-2 text-sm ${
                        section.gridClass ?? ""
                      }`}
                    >
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="px-3 py-2 rounded-md hover:bg-gray-50"
                          onClick={handleNavClick}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" className="hover:underline" onClick={handleNavClick}>
              Contact
            </Link>
          </div>
        </nav>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur">
          <nav className="px-4 py-4 space-y-3 text-sm">
            <Link
              href="/"
              className="block rounded px-3 py-2 hover:bg-white/10"
              onClick={handleNavClick}
            >
              Home
            </Link>
            {sections.map((section) => (
              <div
                key={`${section.key}-mobile`}
                className="rounded border border-white/10 bg-black/30"
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown(section.key)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-white/10"
                  aria-expanded={openDropdown === section.key}
                  aria-controls={`${section.key}-mobile-menu`}
                >
                  <span>{section.label}</span>
                  <CaretIcon isOpen={openDropdown === section.key} />
                </button>
                {openDropdown === section.key && (
                  <div
                    id={`${section.key}-mobile-menu`}
                    className="border-t border-white/10 px-3 py-2"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {section.links.map((link) => (
                        <Link
                          key={`${link.href}-mobile`}
                          href={link.href}
                          className="block rounded border border-white/10 px-3 py-2 hover:bg-white/10"
                          onClick={handleNavClick}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="block rounded px-3 py-2 hover:bg-white/10"
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

