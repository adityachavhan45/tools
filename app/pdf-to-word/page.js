import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "PDF to Word Converter Online Convert PDF to Editable DOCX Without Losing Formatting Free 2026",
  description:
    "Convert PDF to editable Word DOCX documents instantly without losing formatting with our free online PDF to Word Converter. Fast, secure and works 100% in your browser. Perfect for students, professionals and business users. No signup needed!",
  slug: "/pdf-to-word",
  focusKeyword: "PDF to Word Converter Online Free",
  keywords:
    "pdf to word, pdf to docx, convert pdf, pdf converter, pdf to word online, free pdf to word converter, pdf to editable word, pdf to word tool, pdf text extractor, pdf to word secure, instant pdf to docx, best pdf to word converter, convert pdf to word document, pdf to word without losing formatting, browser based pdf converter, pdf to word free, pdf to word fast, pdf to word for students, pdf to word for business"
});

export default function Page() {
  return <ClientPage />;
}
