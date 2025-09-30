import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Color Palette Generator Online — Create Beautiful Color Schemes Instantly",
  description:
    "Free Color Palette Generator online. Instantly create beautiful color palettes, color schemes, and harmony combinations for web design, graphic design, UI/UX, branding, and digital art projects. Easy-to-use tool for designers and developers.",
  slug: "/color-palette-generator",
  keywords:
    "color palette generator, color scheme generator, free color palettes, online color generator, create color palettes, color harmony tool, color picker, design color combinations, best color generator, web design colors, graphic design color tool, ui ux color palette, color scheme creator, branding color palette, color theme generator, digital art colors, random color palettes, pastel color palette, aesthetic color schemes, palette creator, professional color tool, color code generator, hex color palette, rgb color palette, gradient generator, color wheel harmony, color tone generator, color matching tool, color design online"
});

export default function Page() {
  return <ClientPage />;
}