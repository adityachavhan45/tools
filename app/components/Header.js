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
    <header className="sticky top-0 z-30 border-b border-white/10 bg-gradient-to-b from-gray-900 to-black text-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight hover:opacity-90 transition-all duration-200 hover:scale-105">
          convertixy
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3 text-sm">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/20 p-2 sm:p-2.5 text-gray-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
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
          <div className="hidden md:flex items-center gap-1 lg:gap-2 text-sm lg:text-base">
            <Link href="/" className="px-2 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium" onClick={handleNavClick}>
              Home
            </Link>
            <Link href="/google-discover-image-optimizer" className="px-2 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-blue-300 hover:text-blue-200" onClick={handleNavClick}>
              🚀 Discover Optimizer
            </Link>
            <Link href="/adsense-rpm-calculator" className="px-2 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-green-300 hover:text-green-200" onClick={handleNavClick}>
              💰 RPM Calculator
            </Link>
            {sections.map((section) => (
              <div key={section.key} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(section.key)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-all duration-200 font-medium"
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
                    } bg-white rounded-xl shadow-xl border border-gray-200 p-3 animate-in fade-in-0 zoom-in-95 duration-200`}
                  >
                    <div
                      className={`grid grid-cols-1 gap-1 text-sm ${
                        section.gridClass ?? ""
                      }`}
                    >
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium"
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
            <Link href="/contact" className="px-2 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium" onClick={handleNavClick}>
              Contact
            </Link>
          </div>
        </nav>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
          <nav className="px-4 sm:px-6 py-4 space-y-3 text-sm">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium"
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link
              href="/google-discover-image-optimizer"
              className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium text-blue-300 hover:text-blue-200"
              onClick={handleNavClick}
            >
              🚀 Discover Optimizer
            </Link>
            <Link
              href="/adsense-rpm-calculator"
              className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium text-green-300 hover:text-green-200"
              onClick={handleNavClick}
            >
              💰 RPM Calculator
            </Link>
            {sections.map((section) => (
              <div
                key={`${section.key}-mobile`}
                className="rounded-lg border border-white/10 bg-black/30"
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown(section.key)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-white/10 transition-all duration-200 font-medium"
                  aria-expanded={openDropdown === section.key}
                  aria-controls={`${section.key}-mobile-menu`}
                >
                  <span>{section.label}</span>
                  <CaretIcon isOpen={openDropdown === section.key} />
                </button>
                {openDropdown === section.key && (
                  <div
                    id={`${section.key}-mobile-menu`}
                    className="border-t border-white/10 px-3 py-2 animate-in slide-in-from-top-1 duration-200"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {section.links.map((link) => (
                        <Link
                          key={`${link.href}-mobile`}
                          href={link.href}
                          className="block rounded-lg border border-white/10 px-3 py-2 hover:bg-white/10 transition-all duration-200 font-medium"
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
              className="block rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium"
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

