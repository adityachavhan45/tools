import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF to Image — Convert PDF Pages to Images",
  description:
    "Convert PDF pages to images (PNG/JPG) instantly in your browser. Fast and private.",
  slug: "/pdf-to-image",
  keywords: ["pdf to image", "pdf to png", "pdf to jpg", "convert pdf"],
});

export default function Page() {
  return <ClientPage />;
}

