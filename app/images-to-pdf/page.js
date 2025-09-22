import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Images to PDF — Convert JPG/PNG to PDF",
  description:
    "Convert multiple images (JPG, PNG) into a single PDF instantly in your browser.",
  slug: "/images-to-pdf",
  keywords: ["images to pdf", "jpg to pdf", "png to pdf", "convert images to pdf"],
});

export default function Page() {
  return <ClientPage />;
}

