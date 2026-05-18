"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const bigint = parseInt(value, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h;
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0);
      break;
    case gn:
      h = (bn - rn) / d + 2;
      break;
    default:
      h = (rn - gn) / d + 4;
      break;
  }

  h /= 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ClientPage() {
  const [hex, setHex] = useState("#000000");

  const { rgbText, hslText } = useMemo(() => {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    return {
      rgbText: `rgb(${r}, ${g}, ${b})`,
      hslText: `hsl(${h}, ${s}%, ${l}%)`,
    };
  }, [hex]);

  const copy = async (value) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <ToolSection
      title="Color Picker"
      subtitle="Pick any color and instantly get HEX, RGB, and HSL values. Fast, browser-based tool for design and frontend workflows."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <div className="max-w-3xl mx-auto rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-black mb-6">Choose and copy color values</h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="!p-0 !w-24 !h-14 !rounded-lg border border-gray-300"
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-full !bg-white !text-black"
          />
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-3">
            <span className="text-sm font-medium text-black">HEX: {hex}</span>
            <button type="button" onClick={() => copy(hex)} className="!bg-blue-600 !text-white !py-1.5 !px-3 !rounded-lg !text-xs !shadow-none">Copy</button>
          </div>
          <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-3">
            <span className="text-sm font-medium text-black">RGB: {rgbText}</span>
            <button type="button" onClick={() => copy(rgbText)} className="!bg-blue-600 !text-white !py-1.5 !px-3 !rounded-lg !text-xs !shadow-none">Copy</button>
          </div>
          <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-3">
            <span className="text-sm font-medium text-black">HSL: {hslText}</span>
            <button type="button" onClick={() => copy(hslText)} className="!bg-blue-600 !text-white !py-1.5 !px-3 !rounded-lg !text-xs !shadow-none">Copy</button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-6 grid gap-4 md:grid-cols-5">
        <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
          <p className="font-semibold text-blue-900 mb-2">Formats</p>
          <p className="text-blue-800 text-sm text-justify">
            Instantly get HEX, RGB, and HSL for the same selected color so it is easy to use in CSS, UI kits, and graphics tools.
          </p>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
          <p className="font-semibold text-amber-900 mb-2">Tip</p>
          <p className="text-amber-800 text-sm text-justify">
            Use the copy button beside each format and paste directly into your styles or design tokens.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 space-y-6">

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      About This Color Picker
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

      <p>
        The Color Picker helps users select colors and instantly convert them into HEX,
        RGB, and HSL formats for websites, applications, graphics, branding, and creative
        projects. Designers, developers, marketers, and content creators often work with
        different color formats because design software, CSS, image editors, and frontend
        frameworks may use different color systems.
      </p>

      <p>
        Instead of manually converting colors between formats, this tool instantly displays
        multiple representations of the same color. This improves workflow speed and helps
        users maintain consistency across websites, applications, social graphics, product
        interfaces, and digital branding materials.
      </p>

      <p>
        Color selection strongly affects readability, user experience, emotional response,
        and brand identity. Small color changes can completely change how a design feels to
        users. Bright colors may feel energetic, while softer neutral colors often create
        cleaner and more professional visual experiences.
      </p>

      <p>
        Designers experimenting with multiple color combinations frequently use the{" "}
        <a
          href="/color-palette-generator"
          className="text-blue-600 underline font-medium"
        >
          Color Palette Generator
        </a>{" "}
        to generate matching palettes and harmonious combinations for websites and branding
        projects.
      </p>

    </div>

  </section>

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      Why Different Color Formats Matter
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

      <p>
        Different color systems exist because each format solves different design and
        development requirements. Some formats are easier for coding, while others are
        better for visual editing and design adjustments.
      </p>

      <p>
        HEX values are commonly used in CSS and frontend development because they are
        compact and supported across all browsers. RGB values represent colors using red,
        green, and blue channels, making them useful for screen-based systems and image
        editing applications.
      </p>

      <p>
        HSL stands for Hue, Saturation, and Lightness. Many designers prefer HSL because it
        makes it easier to adjust color brightness and saturation without manually changing
        individual RGB values.
      </p>

      <p>
        Frontend developers styling websites and interfaces often optimize reusable CSS
        code using the{" "}
       
          CSS Minifier
       {" "}
        before deploying production-ready projects.
      </p>

    </div>

  </section>

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      How Colors Influence User Experience
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

      <p>
        Colors influence attention, emotions, readability, and user interaction. Websites
        and applications with balanced color systems generally feel more professional and
        easier to navigate.
      </p>

      <p>
        Bright accent colors are often used for buttons and calls to action because they
        attract attention quickly. Neutral backgrounds improve readability and help reduce
        visual clutter, especially in content-heavy interfaces.
      </p>

      <p>
        Businesses carefully choose colors based on industry expectations and audience
        psychology. Financial companies often use blue tones to create trust, health brands
        commonly use green shades, and luxury brands frequently use darker minimal color
        systems.
      </p>

      <p>
        Designers building gradients and layered backgrounds also combine selected colors
        with the{" "}
       
          Gradient Generator
        {" "}
        to create smoother visual transitions across sections and hero banners.
      </p>

    </div>

  </section>

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      Color Selection in Web Design
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

      <p>
        Modern websites rely heavily on color systems to maintain consistency across pages,
        navigation menus, buttons, forms, and content sections. Designers usually create a
        primary color, secondary color, background palette, and accent system before
        building full interfaces.
      </p>

      <p>
        Proper color balance improves readability and reduces eye strain. Excessive contrast
        or overly saturated colors may create uncomfortable experiences for users,
        especially during long reading sessions.
      </p>

      <p>
        UI developers often preview layout structure and visual spacing alongside selected
        colors using the{" "}
       
          HTML Preview Tool
        {" "}
        before publishing responsive interfaces online.
      </p>

      <p>
        Developers testing responsive color visibility across different screen sizes also
        verify layouts through the{" "}
       
          Responsive Design Checker
        {" "}
        to ensure consistent appearance on mobile and desktop devices.
      </p>

    </div>

  </section>

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      Color Pickers for Branding and Marketing
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

      <p>
        Branding agencies and marketing teams frequently use color pickers while designing
        logos, advertisements, social media banners, product packaging, and promotional
        graphics. Maintaining consistent color identity across platforms helps brands appear
        more recognizable and professional.
      </p>

      <p>
        Marketing visuals often require optimized image assets for faster loading and better
        performance. Designers preparing banners and graphics commonly compress images using
        the{" "}
        <a
          href="/image-compressor"
          className="text-blue-600 underline font-medium"
        >
          Image Compressor
        </a>{" "}
        or convert files through the{" "}
        <a
          href="/jpg-to-webp"
          className="text-blue-600 underline font-medium"
        >
          JPG to WEBP Converter
        </a>{" "}
        before uploading them to websites and advertising platforms.
      </p>

      <p>
        Social media creators and digital marketers also generate downloadable QR codes
        linking to campaigns, offers, or landing pages through the{" "}
        <a
          href="/qr-code"
          className="text-blue-600 underline font-medium"
        >
          QR Code Generator
        </a>{" "}
        for easier customer access.
      </p>

    </div>

  </section>

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      Why Browser-Based Color Tools Save Time
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

      <p>
        Manual color conversion becomes inefficient when switching between multiple design
        platforms and coding environments. Browser-based color tools simplify this process
        by instantly generating usable values without requiring additional software.
      </p>

      <p>
        Designers and developers can quickly copy HEX, RGB, or HSL values directly into
        CSS files, design systems, style guides, or frontend frameworks.
      </p>

      <p>
        Teams organizing branding documents and downloadable resources often combine design
        workflows with the{" "}
        <a
          href="/pdf-merge"
          className="text-blue-600 underline font-medium"
        >
          PDF Merge Tool
        </a>{" "}
        and the{" "}
        <a
          href="/pdf-compressor"
          className="text-blue-600 underline font-medium"
        >
          PDF Compressor
        </a>{" "}
        while sharing design presentations and client resources.
      </p>

    </div>

  </section>

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      Privacy and Browser-Based Processing
    </h2>

    <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

      <p>
        Privacy matters while working with creative projects and design systems. This Color
        Picker processes color selections directly inside the browser without requiring
        account creation or unnecessary uploads.
      </p>

      <p>
        Designers and developers managing cloud-based tools and online workspaces also
        improve account security using the{" "}
        <a
          href="/password-generator"
          className="text-blue-600 underline font-medium"
        >
          Password Generator
        </a>{" "}
        and verify stronger credentials through the{" "}
        <a
          href="/password-strength-checker"
          className="text-blue-600 underline font-medium"
        >
          Password Strength Checker
        </a>{" "}
        before storing sensitive project information online.
      </p>

    </div>

  </section>

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold text-gray-900">
      Frequently Asked Questions
    </h2>

    <div className="mt-4 space-y-3">

      <details className="rounded-lg bg-gray-50 px-4 py-3">
        <summary className="cursor-pointer font-semibold text-gray-900">
          Can I manually enter a HEX color?
        </summary>

        <p className="mt-2 text-sm leading-6 text-gray-700">
          Yes. Users can manually enter HEX values, and the tool automatically converts the
          selected color into matching RGB and HSL formats.
        </p>
      </details>

      <details className="rounded-lg bg-gray-50 px-4 py-3">
        <summary className="cursor-pointer font-semibold text-gray-900">
          Which color format works best for CSS?
        </summary>

        <p className="mt-2 text-sm leading-6 text-gray-700">
          HEX, RGB, and HSL all work in modern CSS. Developers usually choose formats based
          on readability and editing preferences.
        </p>
      </details>

      <details className="rounded-lg bg-gray-50 px-4 py-3">
        <summary className="cursor-pointer font-semibold text-gray-900">
          Is my selected color stored online?
        </summary>

        <p className="mt-2 text-sm leading-6 text-gray-700">
          The color conversion process works directly in the browser, and no account is
          required for usage.
        </p>
      </details>

    </div>

  </section>

</div>
    </ToolSection>
  );
}
