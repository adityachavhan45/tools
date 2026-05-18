"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

function hslToHex(hslStr) {
  const match = hslStr.match(/\d+/g);
  if (!match || match.length < 3) return "#000000";
  const h = parseInt(match[0], 10);
  const s = parseInt(match[1], 10) / 100;
  const l = parseInt(match[2], 10) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const toByte = (v) => Math.round(Math.max(0, Math.min(1, v + m)) * 255);
  const hex = ((toByte(r) << 16) | (toByte(g) << 8) | toByte(b)).toString(16).padStart(6, "0");
  return `#${hex}`;
}

export default function ColorPaletteGeneratorPage() {
  const [paletteType, setPaletteType] = useState("complementary");
  const [colorCount, setColorCount] = useState("5");
  const [message, setMessage] = useState("");
  const [generatedColors, setGeneratedColors] = useState([]);
  const [resultText, setResultText] = useState("");
  const [hasResult, setHasResult] = useState(false);

  function generatePalette() {
    const count = parseInt(colorCount, 10) || 5;
    if (count < 3 || count > 10) {
      setMessage("Please enter a color count between 3 and 10.");
      return;
    }
    try {
      const generateColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 50) + 50;
        const lightness = Math.floor(Math.random() * 40) + 30;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      };
      const genComplementary = () => {
        const baseHue = Math.floor(Math.random() * 360);
        return Array.from({ length: count }, (_, i) => {
          const hue = (baseHue + (i * 360 / count)) % 360;
          const s = Math.floor(Math.random() * 30) + 60;
          const l = Math.floor(Math.random() * 30) + 40;
          return `hsl(${hue}, ${s}%, ${l}%)`;
        });
      };
      const genAnalogous = () => {
        const baseHue = Math.floor(Math.random() * 360);
        return Array.from({ length: count }, (_, i) => {
          const hue = (baseHue + i * 30) % 360;
          const s = Math.floor(Math.random() * 30) + 60;
          const l = Math.floor(Math.random() * 30) + 40;
          return `hsl(${hue}, ${s}%, ${l}%)`;
        });
      };
      const genTriadic = () => {
        const baseHue = Math.floor(Math.random() * 360);
        return Array.from({ length: count }, (_, i) => {
          const hue = (baseHue + i * 120) % 360;
          const s = Math.floor(Math.random() * 30) + 60;
          const l = Math.floor(Math.random() * 30) + 40;
          return `hsl(${hue}, ${s}%, ${l}%)`;
        });
      };
      const genMonochromatic = () => {
        const baseHue = Math.floor(Math.random() * 360);
        return Array.from({ length: count }, () => {
          const s = Math.floor(Math.random() * 30) + 60;
          const l = Math.floor(Math.random() * 40) + 30;
          return `hsl(${baseHue}, ${s}%, ${l}%)`;
        });
      };
      let colors = [];
      switch (paletteType) {
        case "complementary": colors = genComplementary(); break;
        case "analogous": colors = genAnalogous(); break;
        case "triadic": colors = genTriadic(); break;
        case "monochromatic": colors = genMonochromatic(); break;
        default: colors = Array.from({ length: count }, generateColor);
      }
      const withHex = colors.map((hsl) => ({ hsl, hex: hslToHex(hsl) }));
      setGeneratedColors(withHex);
      setResultText(withHex.map((c) => `${c.hex} ${c.hsl}`).join("\n"));
      setHasResult(true);
      setMessage("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }

  function copyResult() {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setMessage("Palette copied to clipboard.");
  }

  function copyColor(hex) {
    navigator.clipboard.writeText(hex);
    setMessage(`${hex} copied.`);
  }

  function reset() {
    setPaletteType("complementary");
    setColorCount("5");
    setGeneratedColors([]);
    setResultText("");
    setMessage("");
    setHasResult(false);
  }

  return (
    <ToolSection
      title="Color Palette Generator"
      subtitle="Create harmonious color palettes for web design, branding, and UI. Choose palette type and number of colors get HEX and HSL values instantly."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Color Palette Generator",
          description: "Generate color palettes with complementary, analogous, triadic, or monochromatic harmony.",
          slug: "/color-palette-generator",
          category: "Utilities/Design",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Color Palette Generator", slug: "/color-palette-generator" },
        ])}
      />

      <div className="space-y-6">
        {message && (
          <div
            role="alert"
            className="px-4 py-3 text-sm rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-justify"
          >
            {message}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Options</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="palette-type" className="block text-sm font-medium text-gray-700 mb-1.5">Palette type</label>
              <select
                id="palette-type"
                value={paletteType}
                onChange={(e) => setPaletteType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="complementary">Complementary</option>
                <option value="analogous">Analogous</option>
                <option value="triadic">Triadic</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="random">Random</option>
              </select>
            </div>
            <div>
              <label htmlFor="color-count" className="block text-sm font-medium text-gray-700 mb-1.5">Number of colors (3–10)</label>
              <input
                id="color-count"
                type="number"
                min={3}
                max={10}
                value={colorCount}
                onChange={(e) => setColorCount(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={generatePalette}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Generate palette
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">Palette types</p>
            <p className="text-blue-800 text-sm text-justify">
              Complementary: opposite on the wheel. Analogous: next to each other. Triadic: evenly spaced. Monochromatic: one hue, different shades. Random: mixed.
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              Click a color swatch to copy its HEX code. Use &quot;Copy palette&quot; to copy all codes at once.
            </p>
          </div>
        </div>

        {hasResult && generatedColors.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Generated palette</h3>
              <p className="text-indigo-100 text-sm mt-0.5">{paletteType.charAt(0).toUpperCase() + paletteType.slice(1)} • {generatedColors.length} colors</p>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
                {generatedColors.map(({ hsl, hex }, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => copyColor(hex)}
                    className="flex flex-col items-center rounded-xl overflow-hidden border-2 border-gray-200 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                    title={`Click to copy ${hex}`}
                  >
                    <span className="w-16 h-16 sm:w-20 sm:h-20 block" style={{ backgroundColor: hsl }} />
                    <span className="px-2 py-1.5 text-xs font-mono text-gray-700 bg-gray-50 w-full text-center">{hex}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={copyResult}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Copy palette (all codes)
              </button>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Palette types</h4>
          <ul className="text-sm text-gray-700 space-y-1 text-justify">
            <li><strong>Complementary:</strong> Colors opposite on the color wheel; high contrast.</li>
            <li><strong>Analogous:</strong> Adjacent hues; smooth, harmonious.</li>
            <li><strong>Triadic:</strong> Three hues 120° apart; balanced and vibrant.</li>
            <li><strong>Monochromatic:</strong> One hue, varying saturation and lightness.</li>
            <li><strong>Random:</strong> Mixed hues for varied combinations.</li>
          </ul>
        </div>
      </div>

      <section
  className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify"
  aria-labelledby="about-palette-heading"
>

  <h2
    id="about-palette-heading"
    className="text-2xl font-bold text-gray-900 mb-4"
  >
    About the Color Palette Generator
  </h2>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Color Palette Generator helps designers, developers, marketers, content creators,
    and branding professionals create visually balanced color combinations for websites,
    applications, logos, presentations, advertisements, and creative projects. Choosing
    colors manually can be difficult because different shades may clash or create poor
    readability when combined incorrectly.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    This tool simplifies the process by generating harmonious palettes based on color
    theory concepts such as complementary, analogous, monochromatic, triadic, and random
    combinations. Instead of experimenting manually with dozens of shades, users can
    instantly generate visually connected color schemes directly inside the browser.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Color selection strongly affects how users feel about a brand, website, or interface.
    A modern technology brand may use blue tones to create trust, while entertainment and
    gaming platforms often prefer vibrant combinations for energy and excitement.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Designers creating user interfaces and website layouts often combine palette selection
    with the{" "}
    
      Gradient Generator
    {" "}
    to create smoother background transitions and visually engaging UI sections.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Color Palettes Matter
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Colors influence attention, readability, emotions, and user experience. Good color
    palettes create consistency across websites, mobile apps, advertisements, dashboards,
    and digital products. Poor color combinations can reduce readability and make designs
    appear unprofessional or visually uncomfortable.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Strong color consistency also improves brand recognition. Many famous companies use
    carefully selected palettes so users immediately associate certain colors with their
    products and identity.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Designers creating structured web pages frequently preview typography and color
    combinations together while testing layouts and improving visual consistency before
    publishing websites publicly.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Understanding Different Palette Types
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Different palette structures create different moods and visual experiences. Each
    palette type follows specific relationships on the color wheel to maintain harmony and
    balance.
  </p>

  <h4 className="font-semibold text-gray-900 mt-6 mb-2">
    Complementary Palettes
  </h4>

  <p className="text-gray-700 leading-relaxed mb-4">
    Complementary palettes use colors positioned opposite each other on the color wheel.
    These combinations create strong contrast and are commonly used for buttons,
    highlights, call-to-action sections, and marketing banners.
  </p>

  <h4 className="font-semibold text-gray-900 mt-6 mb-2">
    Analogous Palettes
  </h4>

  <p className="text-gray-700 leading-relaxed mb-4">
    Analogous palettes use nearby colors on the wheel, creating smoother and more natural
    visual flow. These combinations are often used in backgrounds, hero sections,
    illustrations, and minimalist layouts.
  </p>

  <h4 className="font-semibold text-gray-900 mt-6 mb-2">
    Triadic Palettes
  </h4>

  <p className="text-gray-700 leading-relaxed mb-4">
    Triadic palettes use three evenly spaced colors on the wheel. They create vibrant and
    energetic combinations while maintaining overall balance. These palettes are common in
    creative branding and entertainment-focused interfaces.
  </p>

  <h4 className="font-semibold text-gray-900 mt-6 mb-2">
    Monochromatic Palettes
  </h4>

  <p className="text-gray-700 leading-relaxed mb-4">
    Monochromatic palettes use different shades and lightness variations of the same base
    color. These palettes create clean and professional visual experiences and are
    commonly used in dashboards, productivity tools, and modern UI systems.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    HEX and HSL Color Formats
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    This tool generates colors using HSL values and converts them into HEX format for
    easier usage in websites, CSS, design tools, and applications. HEX codes are widely
    used in frontend development because they are compact and supported by all browsers.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    HSL stands for Hue, Saturation, and Lightness. It helps designers adjust color
    intensity and brightness more naturally compared to RGB values.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Frontend developers working with styling systems often generate reusable CSS color
    variables and organize layout styling using the{" "}
   
      CSS Minifier
    {" "}
    before deploying optimized production code.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Color Psychology in Design
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Different colors influence user emotions differently. Blue often creates trust and
    professionalism, green is associated with growth and nature, red creates urgency and
    attention, while black is commonly linked with luxury and elegance.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Businesses frequently choose colors based on brand identity and target audience.
    Financial services often prefer blue tones, health brands commonly use green, and
    luxury brands usually rely on dark minimal palettes.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Marketing teams creating promotional assets sometimes optimize images and banners
    using the{" "}
    <a
      href="/image-compressor"
      className="text-blue-600 underline font-medium"
    >
      Image Compressor
    </a>{" "}
    before publishing campaigns online and improving loading speed across devices.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Accessibility and Readability
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Attractive colors alone are not enough. Good design also requires readability and
    accessibility. Text and background combinations should maintain proper contrast so
    users can comfortably read content across different devices and lighting conditions.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Designers often avoid using extremely bright combinations for long reading sections
    because excessive contrast may strain the eyes. Balanced neutral tones generally
    improve readability and user comfort.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    UI developers testing responsive layouts and accessibility improvements frequently
    review structure and styling behavior before launching interfaces publicly and
    improving usability across screen sizes.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Designers Use Online Palette Tools
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Creating palettes manually requires understanding color relationships, balance,
    saturation, and contrast. Online palette generators simplify this process and allow
    designers to experiment quickly without advanced design software.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Browser-based tools improve workflow efficiency because users can instantly generate,
    copy, and reuse palettes across projects without downloading applications.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Designers managing design resources and downloadable branding files also organize
    project documents more efficiently while sharing creative assets with teams or clients.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Privacy and Browser-Based Processing
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Privacy matters while working with creative projects and branding concepts. This Color
    Palette Generator works directly inside the browser without requiring account
    registration or unnecessary uploads.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Creative professionals managing design accounts and cloud resources often improve
    account protection using the{" "}
    <a
      href="/password-generator"
      className="text-blue-600 underline font-medium"
    >
      Password Generator
    </a>{" "}
    and verify stronger credentials using the{" "}
    <a
      href="/password-strength-checker"
      className="text-blue-600 underline font-medium"
    >
      Password Strength Checker
    </a>{" "}
    before storing project files online.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Final Thoughts
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Color Palette Generator helps users create visually balanced color combinations
    for websites, applications, branding, presentations, and creative projects. It
    simplifies color selection by generating harmonious palettes based on established
    color theory principles.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Instead of manually testing random colors, designers and developers can quickly
    explore structured combinations, improve consistency, and create more professional
    visual experiences. Strong color selection improves branding, readability, usability,
    and overall design quality across digital platforms.
  </p>

</section>
    </ToolSection>
  );
}
