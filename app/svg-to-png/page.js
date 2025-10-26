import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "SVG to PNG Converter Online | Free, Fast & High-Quality Image Tool",
  description:
    "Convert SVG to PNG instantly with our free online image converter. Get high-quality PNG images from SVG files — fast, secure, and easy to use. Perfect for designers, developers, marketers, and students. 100% browser-based with no uploads required.",
  slug: "/svg-to-png",
  keywords:
    "svg to png, convert svg, image converter, svg to png converter, free svg to png tool, online image converter, svg to png online, vector to png, convert svg file, svg graphics to png, svg to png free, svg converter online, scalable vector graphics to png, best svg to png converter, svg to png fast, svg to png secure, svg to png high quality, svg image converter, svg to png for web, instant svg to png converter, svg converter tool"
});

export default function Page() {
  return <ClientPage />;
}
