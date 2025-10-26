import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title:
    "PDF to Image Converter Online - Free Tool to Convert PDF to JPG & PNG Instantly",
  description:
    "Free PDF to Image Converter online. Instantly convert PDF pages into high-quality JPG or PNG images. Fast, private, and secure converter for students, professionals, and businesses. Works 100% in your browser — no uploads or signups required.",
  slug: "/pdf-to-image",
  focusKeyword: "PDF to Image Converter Online",
  keywords: [
    "pdf to image",
    "pdf to png",
    "pdf to jpg",
    "convert pdf",
    "pdf to image converter",
    "pdf to jpg online",
    "pdf to png online",
    "convert pdf to pictures",
    "extract images from pdf",
    "free pdf to image tool",
    "online pdf converter",
    "pdf to photo",
    "pdf pages to jpg",
    "pdf to image high quality",
    "pdf to image free",
    "secure pdf to image converter",
    "best pdf to jpg tool",
    "pdf to png converter online",
    "instant pdf to image",
    "pdf image extractor",
    "pdf converter for students",
    "browser pdf to image tool",
    "pdf image conversion online",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "PDF to Image Converter Online",
            description:
              "Free online PDF to Image Converter tool. Convert PDF pages to high-quality JPG or PNG images instantly — secure, private, and fast.",
            slug: "/pdf-to-image",
            category: "Document Tools",
          }),
          buildHowToJsonLd({
            name: "How to Convert PDF to Image Online",
            description:
              "Step-by-step guide to convert PDF pages into JPG or PNG images instantly and securely.",
            steps: [
              {
                name: "Upload Your PDF File",
                text: "Click 'Choose File' or drag your PDF into the upload box. The tool supports files up to 20MB.",
              },
              {
                name: "Select Output Format",
                text: "Choose between JPG or PNG format depending on your image quality preference.",
              },
              {
                name: "Click 'Convert PDF'",
                text: "Press the button to convert your PDF pages into images. The process happens instantly in your browser.",
              },
              {
                name: "Download Images",
                text: "Once complete, download your converted images individually or as a ZIP file. 100% secure and private.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Is this PDF to Image converter free to use?",
              answer:
                "Yes, it’s completely free. You can convert unlimited PDFs into images without sign-up or watermarks.",
            },
            {
              question: "Are my files safe while converting PDFs?",
              answer:
                "Absolutely. All conversions happen locally in your browser — no data is uploaded or stored anywhere.",
            },
            {
              question: "What image formats does this tool support?",
              answer:
                "It supports both JPG and PNG formats. You can choose whichever suits your needs best.",
            },
            {
              question: "Can I convert specific pages from a PDF?",
              answer:
                "Yes! You can choose specific pages or convert the entire document — the tool gives you full control.",
            },
            {
              question: "Does the converted image lose quality?",
              answer:
                "No, the tool maintains high resolution and clear output while keeping file sizes optimized.",
            },
            {
              question: "Do I need to install any software?",
              answer:
                "No installation required. Everything runs directly in your browser — fast, safe, and private.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
