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

  const sidebar = (
    <div className="space-y-4 text-sm text-gray-700 text-justify">
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="font-semibold text-blue-900 mb-2">Palette types</p>
        <p className="text-blue-800 text-justify">
          Complementary: opposite on the wheel. Analogous: next to each other. Triadic: evenly spaced. Monochromatic: one hue, different shades. Random: mixed.
        </p>
      </div>
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="font-semibold text-amber-900 mb-2">Tip</p>
        <p className="text-amber-800 text-justify">
          Click a color swatch to copy its HEX code. Use &quot;Copy palette&quot; to copy all codes at once.
        </p>
      </div>
    </div>
  );

  return (
    <ToolSection
      title="Color Palette Generator"
      subtitle="Create harmonious color palettes for web design, branding, and UI. Choose palette type and number of colors get HEX and HSL values instantly."
      plain
      plainSidebar
      whiteBackground
      sidebar={sidebar}
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

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify" aria-labelledby="about-palette-heading">
        <h2 id="about-palette-heading" className="text-xl font-semibold text-gray-900 mb-4">About the Color Palette Generator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This free Color Palette Generator creates harmonious color schemes for design projects. You choose a palette type (complementary, analogous, triadic, monochromatic, or random) and how many colors you need (3–10). The tool generates colors using basic color theory and gives you each color in HEX and HSL so you can use them in CSS, design software, or branding. No account or upload is required; everything runs in your browser.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select a <strong>palette type</strong> from the dropdown.</li>
          <li>Set the <strong>number of colors</strong> (3 to 10).</li>
          <li>Click <strong>Generate palette</strong> to create a new set of colors.</li>
          <li>Click a color swatch to copy its HEX code, or use <strong>Copy palette</strong> to copy all codes.</li>
        </ol>

        <h2 id="palette-guide" className="text-xl font-semibold text-gray-900 mt-10 mb-4">Color Palettes and Design: A Complete Guide</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Color palettes are sets of colors chosen to work together in a design. They affect how a brand, website, or product is perceived. Good palettes are based on color theory: the relationships between hues on the color wheel, and how saturation and lightness create contrast or harmony. This section explains why palettes matter and how to use a palette generator effectively in web design, branding, and UI work.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Why color palettes matter</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Consistent use of a limited set of colors makes interfaces easier to scan and brands easier to remember. In web design, a palette defines backgrounds, text, links, and accents so the site feels coherent. In branding, colors carry meaning and emotion; the same product in different colors can feel premium, playful, or serious. A palette generator does not replace design judgment, but it speeds up exploration and ensures that the colors you choose have a clear relationship (e.g. complementary or analogous), which reduces the chance of clashing or muddy results.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">The color wheel and harmony types</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The color wheel arranges hues in a circle. Primary colors (red, yellow, blue) and secondary colors (orange, green, violet) sit at fixed positions. Complementary colors are opposite each other (e.g. red and green); they create strong contrast and are useful for call-to-action buttons or emphasis. Analogous colors sit next to each other (e.g. blue, blue-green, green); they feel smooth and are often used for backgrounds and gradients. Triadic palettes use three hues 120 degrees apart (e.g. red, yellow, blue); they are vibrant but need care so they do not look chaotic. Monochromatic palettes use a single hue with different saturation and lightness; they look clean and are easy to apply. This tool lets you generate all these types so you can compare and pick what fits your project.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Complementary palettes</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Complementary colors sit opposite each other on the color wheel. When used together, they create strong contrast and draw attention. In UI design, a complementary accent (e.g. orange on blue) is often used for buttons or links. Overuse can feel harsh, so many designers use one color as the dominant and the other for small accents. The generator produces complementary-based palettes by spreading hues around the wheel from a random base, so you get a set that includes opposing pairs and related shades. Use these when you want clarity and emphasis rather than a soft, blended look.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Analogous palettes</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Analogous colors are next to each other on the wheel (e.g. yellow, yellow-green, green). They usually share a dominant wavelength, so they feel harmonious and easy on the eye. Analogous palettes are common in nature and in designs that aim for a calm or cohesive mood. They work well for backgrounds, hero sections, and illustrations where you want flow rather than sharp contrast. This tool generates analogous palettes by moving in steps around the wheel from a random starting hue, giving you a range of related colors that you can use for gradients or layered elements.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Triadic palettes</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Triadic palettes use three hues 120 degrees apart on the wheel (e.g. red, blue, yellow). They offer balance and variety without the intensity of a strict complementary pair. Triadic schemes are used in branding and marketing when a brand wants to feel dynamic and multi-faceted. The downside is that all three can compete for attention if used in equal amounts; usually one is chosen as primary and the others as secondary or accent. The generator creates triadic-based sets so you get a balanced spread of hues that still relate through the wheel.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Monochromatic palettes</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Monochromatic palettes use a single hue and vary only saturation and lightness. The result is a cohesive look that feels intentional and often minimal. Monochromatic schemes are popular in apps and dashboards where too many hues could distract. They also work well for accessibility when you use light and dark shades for contrast. This generator produces monochromatic palettes by keeping the hue fixed and randomising saturation and lightness within readable ranges, so you get a set of shades and tints that work together without introducing new hues.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">HEX and HSL explained</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          HEX codes (e.g. #3B82F6) are the standard way to specify colors in CSS and many design tools. They represent red, green, and blue (RGB) in hexadecimal. HSL (Hue, Saturation, Lightness) is another way to describe color: hue is the angle on the color wheel (0–360), saturation is the intensity (0–100%), and lightness is how light or dark the color is (0–100%). HSL is useful when you want to create variations of a color (e.g. same hue, different lightness). This tool generates colors in HSL for harmony logic and converts them to HEX for easy copy-paste into your projects. Both values are shown so you can use whichever format your software expects.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Web design and UI</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          In web design, a typical palette includes a primary color (brand or main actions), a secondary color (secondary actions or backgrounds), a neutral (text and borders), and sometimes an accent for highlights or errors. Generated palettes can serve as a starting point: pick one or two colors for primary and secondary, use lighter or darker versions for hover states, and keep text and backgrounds in neutrals or very low saturation. Always check contrast (e.g. WCAG) for text and interactive elements so that your palette is both attractive and accessible.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Branding and marketing</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Brands often lock in one or two signature colors and use a small set of supporting colors. A palette generator can suggest supporting colors that harmonise with a hue you already have: for example, choose an analogous or monochromatic run and pick the shades that match your logo or mood. Cultural and industry norms matter too; finance often uses blues and greens for trust, while entertainment may use bold or playful palettes. Use the generator to explore options quickly, then refine with your audience and message in mind.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Limitations and best practices</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Generated palettes are mathematically harmonious but may need tweaking for your context. Screen calibration, lighting, and device differences can change how colors look. Test palettes on real devices and against real content. Also, harmony does not guarantee accessibility; always check contrast ratios for text and important UI. If you need to match an existing brand color, you may need to fix one hue and generate the rest around it; this tool generates fully random bases each time, which is ideal for inspiration and exploration rather than exact brand matching. For strict brand work, use a design tool that allows input of a base color.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Color Palette Generator creates harmonious color sets based on complementary, analogous, triadic, monochromatic, or random logic. You choose the type and number of colors, then get a visual palette with HEX and HSL values. Use it for web design, UI, branding, or inspiration. Click a swatch to copy one color or copy the full palette. Combine the tool with contrast checks and real-world testing for best results.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Disclaimer</h3>
        <p className="text-gray-700 leading-relaxed">
          This tool is for general design and inspiration only. Color appearance depends on screens and settings. We are not responsible for the use of generated colors in branding or design. Verify accessibility and suitability for your project yourself.
        </p>
      </section>
    </ToolSection>
  );
}
