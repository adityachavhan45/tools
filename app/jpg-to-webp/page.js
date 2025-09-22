import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "JPG to WebP — Convert JPG Images to WebP",
  description:
    "Convert JPG images to modern WebP format in your browser. Fast and private.",
  slug: "/jpg-to-webp",
  keywords: ["jpg to webp", "convert jpg to webp", "image converter"],
});

export default function Page() {
  return <ClientPage />;
}

