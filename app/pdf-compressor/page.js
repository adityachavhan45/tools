import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Compressor Online — Free Tool to Reduce PDF File Size Instantly",
  description:
    "Free PDF Compressor online. Instantly compress PDF files and reduce size without losing quality. Fast, secure, and easy-to-use PDF optimization tool for students, professionals, and businesses. Works directly in your browser.",
  slug: "/pdf-compressor",
  keywords:
    "pdf compressor, compress pdf, reduce pdf size, pdf optimization, smaller pdf, free pdf compressor, online pdf tool, pdf reducer, compress pdf online, optimize pdf files, shrink pdf size, fast pdf compression, secure pdf compressor, compress pdf without losing quality, pdf file optimizer, compress large pdf, easy pdf compression, best pdf compressor online, pdf compression tool, instant pdf reducer"
});

export default function Page() {
  return <ClientPage />;
}