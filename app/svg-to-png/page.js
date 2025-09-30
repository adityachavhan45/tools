import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "SVG to PNG Converter Online — Free Tool to Convert SVG Files to PNG",
  description:
    "Free SVG to PNG Converter online. Instantly convert scalable vector graphics (SVG) files into high-quality PNG images. Fast, secure, and easy-to-use image converter for designers, developers, marketers, and students. Works directly in your browser.",
  slug: "/svg-to-png",
  keywords:
    "svg to png, convert svg, image converter, svg to png converter, free svg to png tool, online image converter, svg to png online, vector to png, convert svg file, svg graphics to png, svg to png free, svg converter online, scalable vector graphics to png, best svg to png converter, svg to png fast, svg to png secure, svg to png high quality, svg image converter, svg to png for web, instant svg to png converter"
});

export default function Page() {
  return <ClientPage />;
}