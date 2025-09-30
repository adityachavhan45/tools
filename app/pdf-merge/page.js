import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Merge Online — Free Tool to Combine & Join PDF Files",
  description:
    "Free PDF Merge tool online. Instantly combine multiple PDF files into a single document securely in your browser. Fast, private, and easy-to-use PDF joiner for students, professionals, and business use. No uploads required.",
  slug: "/pdf-merge",
  keywords:
    "pdf merge, merge pdf, combine pdf, join pdf, pdf merger tool, free pdf merge, online pdf joiner, merge pdf files online, combine pdfs free, join multiple pdfs, best pdf merge tool, pdf combiner, merge pdf without upload, pdf join tool, secure pdf merge, fast pdf merger, pdf file merger, easy pdf merge, pdf combine online free, pdf joining tool"
});

export default function Page() {
  return <ClientPage />;
}