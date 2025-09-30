import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Split Online — Free Tool to Split & Extract PDF Pages Instantly",
  description:
    "Free PDF Split tool online. Instantly split a PDF into separate pages or extract specific sections securely in your browser. Fast, private, and easy-to-use PDF splitter for students, professionals, and business use. No signup required.",
  slug: "/pdf-split",
  keywords:
    "pdf split, split pdf, extract pdf pages, separate pdf, pdf splitter, free pdf split tool, online pdf split, split pdf online free, pdf page extractor, split pdf without software, secure pdf split, fast pdf splitter, pdf pages separator, pdf editing tool, split large pdf, pdf document splitter, easy pdf split, pdf page separation, extract pdf online, instant pdf split tool"
});

export default function Page() {
  return <ClientPage />;
}