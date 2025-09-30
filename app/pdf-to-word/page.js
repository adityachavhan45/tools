import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF to Word Converter Online — Free & Secure PDF to DOCX Tool",
  description:
    "Free PDF to Word Converter online. Instantly convert PDF files into editable Word documents (DOCX) with text, tables, and formatting preserved. Fast, secure, and easy-to-use tool for students, professionals, and businesses. Works directly in your browser.",
  slug: "/pdf-to-word",
  keywords:
    "pdf to word, pdf to docx, convert pdf, pdf converter, extract text from pdf, pdf to editable word, free pdf to word converter, pdf to word online, best pdf converter, pdf to word free tool, convert pdf to word document, pdf text extractor, pdf to word secure, instant pdf to docx, pdf to word without losing formatting, pdf to word fast, pdf to word for students, pdf to word for office, pdf to word legal docs, browser based pdf converter"
});

export default function Page() {
  return <ClientPage />;
}
