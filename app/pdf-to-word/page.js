import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF to Word Converter Online | Free, Fast & Secure PDF to DOCX Tool",
  description:
    "Convert PDF to Word online for free. Use our fast, secure PDF to DOCX converter to make editable Word documents without losing formatting. Perfect for students, professionals, and business users. 100% browser-based — no uploads, no sign-up required.",
  slug: "/pdf-to-word",
  keywords:
    "pdf to word, pdf to docx, convert pdf, pdf converter, pdf to word online, free pdf to word converter, pdf to editable word, pdf to word tool, pdf text extractor, pdf to word secure, instant pdf to docx, best pdf to word converter, convert pdf to word document, pdf to word without losing formatting, browser based pdf converter, pdf to word free, pdf to word fast, pdf to word for students, pdf to word for business"
});

export default function Page() {
  return <ClientPage />;
}
