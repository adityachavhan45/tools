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
          Colors are one of the most powerful tools in design, branding, and
          communication. The right color palette can set the mood of a website,
          influence purchasing decisions, or simply make a graphic visually
          striking. A Color Palette Generator simplifies the process of
          selecting and combining colors by automatically creating harmonious
          sets based on different design principles. This tool is especially
          helpful for web designers, graphic artists, UI/UX professionals,
          marketers, and even students who want to explore the psychology of
          colors without needing deep technical knowledge.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Multiple palette styles:</strong> Choose between
            complementary, analogous, triadic, monochromatic, or random color
            schemes to match your creative needs.
          </li>
          <li>
            <strong>Customizable count:</strong> Generate between 3 and 10
            colors per palette depending on the complexity of your project.
          </li>
          <li>
            <strong>Professional harmony:</strong> Colors are generated based on
            color theory principles, ensuring consistency and balance.
          </li>
          <li>
            <strong>Easy copy:</strong> One-click copy feature lets you grab
            your palette and use it instantly in your design software.
          </li>
          <li>
            <strong>Versatile formats:</strong> Get colors in HSL and HEX code
            formats so they can be applied anywhere, from CSS files to graphics
            tools.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Select your desired palette type from the dropdown menu.</li>
          <li>
            Enter the number of colors you want to generate (between 3 and 10).
          </li>
          <li>Click on the 🎨 Generate Palette button.</li>
          <li>
            Review the generated colors displayed with HSL and HEX values.
          </li>
          <li>
            Copy the palette codes using the 📋 Copy Result button to paste them
            directly into your project.
          </li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Web design:</strong> Build visually appealing websites by
            applying balanced color palettes for backgrounds, typography, and
            buttons.
          </li>
          <li>
            <strong>Brand identity:</strong> Companies use specific color
            palettes to create memorable brand images. This tool can inspire
            fresh brand color schemes.
          </li>
          <li>
            <strong>UI/UX design:</strong> Ensure that your app or digital
            product uses consistent colors that are pleasing to users.
          </li>
          <li>
            <strong>Marketing campaigns:</strong> Colors influence emotions and
            behavior. Generate palettes that evoke trust, excitement, or
            urgency.
          </li>
          <li>
            <strong>Art & inspiration:</strong> Artists can use the tool to
            spark creativity and explore new color combinations.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Understanding Palette Types</h4>
        <p className="text-gray-700 mb-4">
          The tool supports multiple palette types based on established design
          principles:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Complementary:</strong> Colors that are opposite each other
            on the color wheel, producing strong contrast and energy.
          </li>
          <li>
            <strong>Analogous:</strong> Colors that sit next to each other,
            creating smooth and harmonious blends.
          </li>
          <li>
            <strong>Triadic:</strong> Three evenly spaced colors on the wheel,
            offering vibrant but balanced results.
          </li>
          <li>
            <strong>Monochromatic:</strong> Different shades and tints of the
            same hue, giving a clean and minimalistic look.
          </li>
          <li>
            <strong>Random:</strong> A playful mix of colors for unique and
            unexpected combinations.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          A color palette generator is not only for professionals. Students
          working on projects, hobbyists designing posters, or social media
          creators editing their content can all benefit from quick access to
          harmonious colors. Instead of guessing which colors might look good
          together, this tool ensures that the combinations follow proven design
          logic. It saves time, reduces frustration, and boosts creativity.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Things to Keep in Mind</h4>
        <p className="text-gray-700 mb-4">
          While the generated palettes are mathematically and aesthetically
          sound, context always matters. Colors may look different on screens
          due to brightness or calibration, and cultural meanings of colors vary
          worldwide. For example, white represents purity in some cultures but
          mourning in others. Designers should always consider their audience,
          medium, and brand message when applying palettes.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          The Color Palette Generator bridges the gap between creativity and
          practicality. It gives you quick access to ready-to-use harmonious
          color sets while allowing you to explore different styles like
          complementary, analogous, triadic, or monochromatic. Whether you are a
          designer working on a new brand identity, a student experimenting with
          visual storytelling, or just someone curious about colors, this tool
          helps you save time and spark ideas. By turning color theory into an
          easy-to-use interactive experience, it ensures that great design is
          never out of reach.
        </p>
      </section>

    </ToolSection>
  );
}