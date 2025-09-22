import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Image Compressor — Reduce Image Size Online",
  description:
    "Compress images (JPG, PNG, WebP) without losing quality. Private, fast, and runs in your browser.",
  slug: "/image-compressor",
  keywords: ["image compressor", "compress image", "reduce image size", "optimize images"],
});

export default function Page() {
  return <ClientPage />;
}

