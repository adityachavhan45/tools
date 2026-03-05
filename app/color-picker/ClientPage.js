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
  const [hex, setHex] = useState("#3b82f6");

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
      <div className="max-w-3xl mx-auto card-surface p-6 sm:p-8">
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
            <button type="button" onClick={() => copy(hex)} className="!bg-black !text-white !py-1.5 !px-3 !rounded-lg !text-xs !shadow-none">Copy</button>
          </div>
          <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-3">
            <span className="text-sm font-medium text-black">RGB: {rgbText}</span>
            <button type="button" onClick={() => copy(rgbText)} className="!bg-black !text-white !py-1.5 !px-3 !rounded-lg !text-xs !shadow-none">Copy</button>
          </div>
          <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-3">
            <span className="text-sm font-medium text-black">HSL: {hslText}</span>
            <button type="button" onClick={() => copy(hslText)} className="!bg-black !text-white !py-1.5 !px-3 !rounded-lg !text-xs !shadow-none">Copy</button>
          </div>
        </div>
      </div>
    </section>
  );
}
