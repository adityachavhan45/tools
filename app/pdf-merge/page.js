import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title: "PDF Merge Online - Free Tool to Combine & Join PDF Files Instantly",
  description:
    "Free PDF Merge tool online. Quickly combine multiple PDF files into one document directly in your browser. Fast, private, and secure — perfect for students, professionals, and business users. No upload or registration required.",
  slug: "/pdf-merge",
  focusKeyword: "PDF Merge Online",
  keywords: [
    "pdf merge",
    "merge pdf",
    "combine pdf",
    "join pdf",
    "pdf merger tool",
    "free pdf merge",
    "online pdf joiner",
    "merge pdf files online",
    "combine pdfs free",
    "join multiple pdfs",
    "best pdf merge tool",
    "pdf combiner",
    "merge pdf without upload",
    "pdf join tool",
    "secure pdf merge",
    "fast pdf merger",
    "pdf file merger",
    "easy pdf merge",
    "pdf combine online free",
    "pdf joining tool",
    "merge pdfs locally",
    "pdf merger for students",
    "pdf merge for office",
    "browser pdf merge tool",
    "private pdf merger",
    "instant pdf joiner",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "PDF Merge Online",
            description:
              "Free online tool to merge multiple PDF files into one. Fast, secure, and privacy-friendly — works directly in your browser.",
            slug: "/pdf-merge",
            category: "Document Tools",
          }),
          buildHowToJsonLd({
            name: "How to Merge PDF Files Online",
            description:
              "Step-by-step guide to combine multiple PDF files into a single document using the free online PDF Merge tool.",
            steps: [
              {
                name: "Upload Your PDF Files",
                text: "Click on 'Choose Files' or drag multiple PDFs into the upload area. The tool supports up to 20MB total.",
              },
              {
                name: "Arrange File Order",
                text: "Use drag-and-drop to reorder your PDFs before merging. The order determines how they appear in the final document.",
              },
              {
                name: "Click 'Merge PDFs'",
                text: "Press the merge button to instantly combine your files. The process takes only a few seconds.",
              },
              {
                name: "Download the Combined File",
                text: "Once completed, click 'Download PDF' to save your newly merged document — completely secure and private.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Is this PDF Merge tool free to use?",
              answer:
                "Yes, it's 100% free and requires no sign-up. You can merge unlimited PDFs instantly in your browser.",
            },
            {
              question: "Is my data safe while merging PDFs?",
              answer:
                "Absolutely. All merging happens locally on your device — no files are uploaded or stored on any server.",
            },
            {
              question: "Can I merge large PDF files?",
              answer:
                "Yes, you can merge large files up to 20MB total. For very large documents, we recommend compressing them first using the PDF Compressor tool.",
            },
            {
              question: "Will the merged PDF lose quality?",
              answer:
                "No. The tool preserves original quality, fonts, and formatting while combining the files seamlessly.",
            },
            {
              question: "Can I rearrange or remove pages before merging?",
              answer:
                "Yes! You can easily reorder or remove files before merging to create your ideal final document.",
            },
            {
              question: "Do I need to install any software?",
              answer:
                "No installation required — everything runs securely in your browser on any device.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
