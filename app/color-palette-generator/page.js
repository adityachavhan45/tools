import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Color Palette Generator Online | Create Beautiful Color Schemes Instantly",
  description:
    "Free Color Palette Generator to create stunning color schemes instantly. Generate harmonious color combinations with HEX, RGB, and HSL values for web design, UI UX, branding, and digital art.",
  slug: "/color-palette-generator",
  focusKeyword: "Color Palette Generator",
  keywords: [
    "color palette generator",
    "color scheme generator",
    "create color schemes online",
    "free color palette generator",
    "color combination generator",
    "color harmony tool",
    "ui ux color palette generator",
    "web design color palettes",
    "graphic design color tool",
    "color theme generator",
    "hex color palette",
    "rgb color palette",
    "gradient generator",
    "color picker tool",
    "branding color palette",
    "design color combinations",
    "color ideas generator",
    "color matching tool",
    "online color generator",
    "professional color palette tool"
  ],
});

export default function Page() {
  return <ClientPage />;
}