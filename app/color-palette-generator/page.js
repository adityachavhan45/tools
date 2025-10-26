import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Color Palette Generator Online - Create Beautiful Color Schemes Instantly (Free Tool)",
  description:
    "Use this free Color Palette Generator online to instantly create stunning color schemes, gradients, and design palettes. Perfect for web design, UI/UX, branding, and digital art. Generate harmonious color combinations with HEX, RGB, and HSL values.",
  slug: "/color-palette-generator",
  focusKeyword: "Color Palette Generator Online",
  keywords: [
    "color palette generator",
    "color scheme generator",
    "free color palette generator",
    "create color schemes online",
    "online color generator",
    "color harmony tool",
    "color picker tool",
    "design color combinations",
    "best color generator for designers",
    "web design color palettes",
    "graphic design color tool",
    "ui ux color palette generator",
    "color scheme creator",
    "branding color palette tool",
    "color theme generator",
    "digital art color palette",
    "random color palettes",
    "pastel color palette generator",
    "aesthetic color schemes",
    "palette creator online",
    "professional color palette tool",
    "color code generator",
    "hex color palette",
    "rgb color palette",
    "gradient generator online",
    "color wheel harmony tool",
    "color tone generator",
    "color matching tool",
    "color design online",
    "color combination generator",
    "creative color palette generator",
    "web designer color picker",
    "color ideas generator",
    "ui color inspiration"
  ],
});

export default function Page() {
  return <ClientPage />;
}
