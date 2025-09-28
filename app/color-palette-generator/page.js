import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Color Palette Generator — Generate Color Palettes Online",
  description:
    "Generate color palettes online. Free color palette generator with harmony options and color schemes for web design and graphic design.",
  slug: "/color-palette-generator",
  keywords: ["color palette", "color generator", "color scheme", "color harmony"],
});

export default function Page() {
  return <ClientPage />;
}