import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Image Resizer — Resize Images Online",
  description:
    "Resize images by width and height proportionally. Works locally in your browser.",
  slug: "/image-resizer",
  keywords: ["image resizer", "resize image", "resize jpg", "resize png"],
});

export default function Page() {
  return <ClientPage />;
}

