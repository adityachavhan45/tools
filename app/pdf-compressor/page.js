import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title: "PDF Compressor Online - Free Tool to Reduce PDF File Size Instantly",
  description:
    "Free PDF Compressor online. Quickly compress and reduce PDF size without losing quality. Fast, secure, and easy-to-use PDF optimization tool for students, professionals, and businesses. Works 100% in your browser.",
  slug: "/pdf-compressor",
  focusKeyword: "PDF Compressor Online",
  keywords: [
    "pdf compressor",
    "compress pdf",
    "reduce pdf size",
    "pdf optimization",
    "smaller pdf",
    "free pdf compressor",
    "online pdf tool",
    "pdf reducer",
    "compress pdf online",
    "optimize pdf files",
    "shrink pdf size",
    "fast pdf compression",
    "secure pdf compressor",
    "compress pdf without losing quality",
    "pdf file optimizer",
    "compress large pdf",
    "easy pdf compression",
    "best pdf compressor online",
    "pdf compression tool",
    "instant pdf reducer",
    "online pdf shrinker",
    "pdf optimizer free",
    "reduce pdf for email",
    "compress pdf for web",
    "pdf compression without quality loss",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "PDF Compressor Online",
            description:
              "Free online PDF Compressor tool to instantly reduce PDF file size without losing quality. Fast, secure, and privacy-friendly.",
            slug: "/pdf-compressor",
            category: "Document Tools",
          }),
          buildHowToJsonLd({
            name: "How to Compress a PDF File Online",
            description:
              "Follow these simple steps to reduce the size of your PDF files instantly and securely.",
            steps: [
              {
                name: "Upload Your PDF File",
                text: "Click on 'Choose File' or drag your PDF into the upload box. The tool supports files up to 20MB.",
              },
              {
                name: "Click 'Compress PDF'",
                text: "Press the compress button. The tool will analyze and reduce your file size automatically.",
              },
              {
                name: "Wait a Few Seconds",
                text: "The process usually takes less than 10 seconds depending on file size and compression level.",
              },
              {
                name: "Download Your Optimized PDF",
                text: "Click 'Download PDF' to get your reduced-size file instantly — with no quality loss.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Is this PDF Compressor free to use?",
              answer:
                "Yes! It’s 100% free and works directly in your browser. No registration, ads, or hidden costs.",
            },
            {
              question: "Will compressing my PDF reduce quality?",
              answer:
                "No — our smart algorithm maintains visual clarity while optimizing the file structure to achieve the best size-quality balance.",
            },
            {
              question: "Is my data safe while using this tool?",
              answer:
                "Yes, your PDF files never leave your device. All compression happens locally in your browser for total privacy.",
            },
            {
              question: "What types of PDFs can I compress?",
              answer:
                "You can compress scanned PDFs, image-heavy files, or text-based documents. Works with all standard PDF formats.",
            },
            {
              question: "Can I compress multiple PDFs at once?",
              answer:
                "Currently, it supports one file at a time, but multi-file compression is coming soon!",
            },
            {
              question: "What’s the ideal size for web or email PDFs?",
              answer:
                "For web uploads or email attachments, try keeping PDFs under 2MB for fast loading and compatibility.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
