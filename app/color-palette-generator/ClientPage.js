"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function ColorPaletteGeneratorPage() {
  const [paletteType, setPaletteType] = useState("complementary");
  const [colorCount, setColorCount] = useState("5");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function generatePalette() {
    const count = parseInt(colorCount) || 5;

    if (count < 3 || count > 10) {
      setMessage("⚠️ Color count must be between 3 and 10.");
      return;
    }

    try {
      const generateColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
        const lightness = Math.floor(Math.random() * 40) + 30; // 30-70%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      };

      const generateComplementary = () => {
        const baseHue = Math.floor(Math.random() * 360);
        const colors = [];
        for (let i = 0; i < count; i++) {
          const hue = (baseHue + (i * 360 / count)) % 360;
          const saturation = Math.floor(Math.random() * 30) + 60;
          const lightness = Math.floor(Math.random() * 30) + 40;
          colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
      };

      const generateAnalogous = () => {
        const baseHue = Math.floor(Math.random() * 360);
        const colors = [];
        for (let i = 0; i < count; i++) {
          const hue = (baseHue + (i * 30)) % 360;
          const saturation = Math.floor(Math.random() * 30) + 60;
          const lightness = Math.floor(Math.random() * 30) + 40;
          colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
      };

      const generateTriadic = () => {
        const baseHue = Math.floor(Math.random() * 360);
        const colors = [];
        for (let i = 0; i < count; i++) {
          const hue = (baseHue + (i * 120)) % 360;
          const saturation = Math.floor(Math.random() * 30) + 60;
          const lightness = Math.floor(Math.random() * 30) + 40;
          colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
      };

      const generateMonochromatic = () => {
        const baseHue = Math.floor(Math.random() * 360);
        const colors = [];
        for (let i = 0; i < count; i++) {
          const hue = baseHue;
          const saturation = Math.floor(Math.random() * 30) + 60;
          const lightness = Math.floor(Math.random() * 40) + 30;
          colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
      };

      let colors = [];
      switch (paletteType) {
        case "complementary":
          colors = generateComplementary();
          break;
        case "analogous":
          colors = generateAnalogous();
          break;
        case "triadic":
          colors = generateTriadic();
          break;
        case "monochromatic":
          colors = generateMonochromatic();
          break;
        default:
          colors = Array.from({ length: count }, generateColor);
      }

      const resultText = `# Color Palette Generator
# Generated on: ${new Date().toISOString()}

# Palette Settings
# Type: ${paletteType.charAt(0).toUpperCase() + paletteType.slice(1)}
# Colors: ${count}
# Harmony: ${paletteType}
# Quality: High

# Generated Colors
${colors.map((color, index) => `${index + 1}. ${color}`).join('\n')}

# Color Codes
# - Hex: ${colors.map(color => {
        const hsl = color.match(/\d+/g);
        const h = parseInt(hsl[0]);
        const s = parseInt(hsl[1]);
        const l = parseInt(hsl[2]);
        const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l / 100 - c / 2;
        let r, g, b;
        if (h < 60) { r = c; g = x; b = 0; }
        else if (h < 120) { r = x; g = c; b = 0; }
        else if (h < 180) { r = 0; g = c; b = x; }
        else if (h < 240) { r = 0; g = x; b = c; }
        else if (h < 300) { r = x; g = 0; b = c; }
        else { r = c; g = 0; b = x; }
        const hex = ((Math.round((r + m) * 255) << 16) | (Math.round((g + m) * 255) << 8) | Math.round((b + m) * 255)).toString(16).padStart(6, '0');
        return `#${hex}`;
      }).join(', ')}

# Usage Instructions
# 1. Select palette type and color count
# 2. Click "Generate Palette" to process
# 3. Copy the generated colors

# Quality Notes
# - Professional color harmony
# - High-quality color generation
# - Consistent color schemes
# - Optimized for design`;

      setResult(resultText);
      setMessage("✅ Color palette generated successfully!");
    } catch (error) {
      setMessage("❌ Error generating color palette.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Generated palette copied to clipboard!");
  }

  function reset() {
    setPaletteType("complementary");
    setColorCount("5");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Color Palette Generator"
      subtitle="Generate color palettes online. Free color palette generator with harmony options and color schemes for web design and graphic design."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Color Palette Generator",
          description: "Generate color palettes online.",
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

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Palette Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Palette Type
          </label>
          <select
            value={paletteType}
            onChange={(e) => setPaletteType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="complementary">Complementary</option>
            <option value="analogous">Analogous</option>
            <option value="triadic">Triadic</option>
            <option value="monochromatic">Monochromatic</option>
            <option value="random">Random</option>
          </select>
        </div>

        {/* Color Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Colors (3-10)
          </label>
          <input
            type="number"
            min="3"
            max="10"
            value={colorCount}
            onChange={(e) => setColorCount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Palette
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={generatePalette}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700"
          >
            🎨 Generate Palette
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Palette Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Palette Types</h4>
          <div className="text-sm space-y-1">
            <div>• Complementary: Opposite colors</div>
            <div>• Analogous: Adjacent colors</div>
            <div>• Triadic: Three evenly spaced colors</div>
            <div>• Monochromatic: Same hue, different shades</div>
            <div>• Random: Random color selection</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Color Palette Generator</h3>
        <p className="text-gray-700 mb-4">
          Generate professional color palettes for web design and graphic design. This tool helps you 
          create harmonious color schemes, useful for branding, design, and visual content creation.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Generate harmonious color palettes</li>
          <li>Multiple color harmony options</li>
          <li>Customizable color count and schemes</li>
          <li>Professional color generation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Select the palette type.</li>
          <li>Set the number of colors.</li>
          <li>Click <strong>Generate Palette</strong> to process.</li>
          <li>Copy the generated colors.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web design and branding</li>
          <li>Graphic design and visual content</li>
          <li>Color scheme development</li>
          <li>Design inspiration and creativity</li>
        </ul>
      </section>
    </ToolSection>
  );
}