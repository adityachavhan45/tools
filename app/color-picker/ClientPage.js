"use client";

import { useMemo, useState } from "react";

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
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-3xl mx-auto rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-black mb-6">Color Picker</h1>

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

      <div className="max-w-3xl mx-auto mt-8 space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">About This Color Picker</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            <p>
              The Color Picker helps you choose a color and instantly copy its HEX, RGB,
              and HSL values. Designers, developers, bloggers, and brand owners often need
              the same color in different formats because design tools, CSS, image editors,
              and content platforms may not all use the same color notation.
            </p>
            <p>
              HEX is compact and common in web design, RGB is easy to understand when working
              with screen colors, and HSL is useful when you want to adjust hue, saturation,
              or lightness more intentionally. Showing all three formats together saves time
              when matching buttons, backgrounds, borders, charts, or social graphics.
            </p>
            <p>
              The conversion happens in your browser as soon as you pick a color. No signup is
              required, and the selected color values are not intentionally uploaded for
              processing.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">How to Use the Color Picker</h2>
          <ol className="mt-4 list-decimal list-inside space-y-2 text-sm leading-7 text-gray-700 sm:text-base">
            <li>Select a color from the color input or type a HEX value manually.</li>
            <li>Review the automatically generated HEX, RGB, and HSL formats.</li>
            <li>Use the copy button next to the format your project needs.</li>
            <li>Paste the value into CSS, a design tool, a brand guide, or an editor.</li>
          </ol>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">When Each Color Format Helps</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">HEX</h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Best for CSS, brand palettes, and compact color references like #000000.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">RGB</h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Useful for screen colors, design handoff, and systems that use red, green,
                and blue channels.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">HSL</h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Helpful when adjusting color families, making lighter variants, or tuning
                saturation.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg bg-gray-50 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-gray-900">Can I type a color manually?</summary>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Yes. You can type a HEX color in the text field, and the tool will calculate
                matching RGB and HSL values.
              </p>
            </details>
            <details className="rounded-lg bg-gray-50 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-gray-900">Which color format should I use for CSS?</summary>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                HEX, RGB, and HSL all work in modern CSS. HEX is common for simple colors,
                while HSL is often easier when creating lighter or darker variations.
              </p>
            </details>
            <details className="rounded-lg bg-gray-50 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-gray-900">Is the selected color saved?</summary>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                The color conversion runs locally in your browser. Convertixy does not require
                an account or intentionally store your selected color values for this tool.
              </p>
            </details>
          </div>
        </section>
      </div>
    </section>
  );
}
