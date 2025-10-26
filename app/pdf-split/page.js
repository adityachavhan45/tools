import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title: "PDF Split Online - Free Tool to Split & Extract PDF Pages Instantly",
  description:
    "Free PDF Split tool online. Instantly split PDF files into separate pages or extract specific sections securely in your browser. Fast, private, and easy-to-use PDF splitter for students, professionals, and businesses. No signup or upload required.",
  slug: "/pdf-split",
  focusKeyword: "PDF Split Online",
  keywords: [
    "pdf split",
    "split pdf",
    "extract pdf pages",
    "separate pdf",
    "pdf splitter",
    "free pdf split tool",
    "online pdf split",
    "split pdf online free",
    "pdf page extractor",
    "split pdf without software",
    "secure pdf split",
    "fast pdf splitter",
    "pdf pages separator",
    "pdf editing tool",
    "split large pdf",
    "pdf document splitter",
    "easy pdf split",
    "pdf page separation",
    "extract pdf online",
    "instant pdf split tool",
    "browser pdf splitter",
    "private pdf split tool",
    "pdf splitter for students",
    "pdf splitter for professionals",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "PDF Split Online",
            description:
              "Free online tool to split PDF files or extract specific pages instantly. Fast, secure, and privacy-friendly — works directly in your browser.",
            slug: "/pdf-split",
            category: "Document Tools",
          }),
          buildHowToJsonLd({
            name: "How to Split PDF Files Online",
            description:
              "Follow these simple steps to split or extract pages from any PDF file quickly and securely.",
            steps: [
              {
                name: "Upload Your PDF File",
                text: "Click 'Choose File' or drag your PDF into the upload area. The tool supports files up to 20MB.",
              },
              {
                name: "Select Split Option",
                text: "Choose whether to split all pages individually or extract a specific page range (e.g., 5–10).",
              },
              {
                name: "Click 'Split PDF'",
                text: "Press the button to instantly process your file. The tool runs locally in your browser for full privacy.",
              },
              {
                name: "Download Split PDF",
                text: "Once completed, download your separated PDF files instantly — fast and secure.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Is this PDF Split tool free to use?",
              answer:
                "Yes, its 100% free and unlimited. You can split as many PDF files as you like — no registration needed.",
            },
            {
              question: "Is my document safe while splitting the PDF?",
              answer:
                "Absolutely. All processing happens locally in your browser. Your files never leave your device or get stored anywhere.",
            },
            {
              question: "Can I extract specific pages from a PDF?",
              answer:
                "Yes, you can extract a single page, multiple pages, or even custom ranges like 2–5 or 10–15.",
            },
            {
              question: "Does this tool change the PDF quality?",
              answer:
                "No, it keeps the original quality, fonts, and formatting intact while splitting or extracting pages.",
            },
            {
              question: "Do I need to install any software?",
              answer:
                "No installation required — everything runs online in your browser instantly and securely.",
            },
            {
              question: "Can I split large PDF documents?",
              answer:
                "Yes! The tool supports large PDFs up to 20MB per session for fast, efficient splitting.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
