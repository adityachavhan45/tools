import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF to Word Converter — Convert PDF to DOCX Online",
  description:
    "Convert PDF files to Word documents (DOCX) online. Extract text and formatting from PDFs. Free, secure, works in browser.",
  slug: "/pdf-to-word",
  keywords: ["pdf to word", "pdf to docx", "convert pdf", "pdf converter", "extract text from pdf"],
});

export default function Page() {
  return <ClientPage />;
}
