import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "SVG to PNG — Convert SVG Files to PNG",
  description:
    "Convert SVG vector images to PNG bitmaps instantly in your browser.",
  slug: "/svg-to-png",
  keywords: ["svg to png", "convert svg", "image converter"],
});

export default function Page() {
  return <ClientPage />;
}

