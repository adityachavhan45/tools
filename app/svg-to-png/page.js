import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "SVG to PNG Converter Online Convert SVG Files to High Quality PNG Images Free 2026",
  description:
    "Convert SVG files to high quality PNG images instantly with our free online SVG to PNG Converter. Fast, secure and works 100% in your browser. Perfect for designers, developers, marketers and students. No signup needed!",
  slug: "/svg-to-png",
  focusKeyword: "SVG to PNG Converter Online Free",
  keywords:
    "svg to png, convert svg, image converter, svg to png converter, free svg to png tool, online image converter, svg to png online, vector to png, convert svg file, svg graphics to png, svg to png free, svg converter online, scalable vector graphics to png, best svg to png converter, svg to png fast, svg to png secure, svg to png high quality, svg image converter, svg to png for web, instant svg to png converter, svg converter tool"
});
export default function Page() {
  return <ClientPage />;
}
