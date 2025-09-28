import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Compressor — Reduce PDF File Size Online",
  description:
    "Compress PDF files to reduce size without losing quality. Free PDF compression tool that works in your browser.",
  slug: "/pdf-compressor",
  keywords: ["pdf compressor", "compress pdf", "reduce pdf size", "pdf optimization", "smaller pdf"],
});

export default function Page() {
  return <ClientPage />;
}
