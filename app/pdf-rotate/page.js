import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title: "PDF Rotate Online - Free Tool to Rotate PDF Pages Instantly",
  description:
    "Free PDF Rotate tool online. Instantly rotate PDF pages by 90°, 180°, or 270° with batch rotation support. Fast, secure, and privacy-friendly PDF rotator for students, professionals, and business users. Works 100% in your browser.",
  slug: "/pdf-rotate",
  focusKeyword: "PDF Rotate Online",
  keywords: [
    "pdf rotate",
    "rotate pdf",
    "pdf orientation",
    "rotate pdf pages",
    "pdf page rotator",
    "free pdf rotate tool",
    "online pdf rotation",
    "rotate pdf online free",
    "batch pdf rotate",
    "rotate pdf 90 degrees",
    "rotate pdf 180 degrees",
    "rotate pdf 270 degrees",
    "pdf editing tool",
    "change pdf orientation",
    "pdf page rotation tool",
    "rotate multiple pdfs",
    "secure pdf rotator",
    "fast pdf rotate tool",
    "rotate pdf without software",
    "instant pdf rotation",
    "browser pdf rotator",
    "private pdf rotation tool",
    "pdf rotation for office",
    "pdf rotation for students",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "PDF Rotate Online",
            description:
              "Free online PDF rotation tool to instantly rotate PDF pages by 90°, 180°, or 270°. Fast, secure, and works entirely in your browser.",
            slug: "/pdf-rotate",
            category: "Document Tools",
          }),
          buildHowToJsonLd({
            name: "How to Rotate PDF Pages Online",
            description:
              "Step-by-step guide to rotate PDF pages easily and securely using the free online PDF Rotate tool.",
            steps: [
              {
                name: "Upload Your PDF File",
                text: "Click 'Choose File' or drag your PDF into the upload box. The tool supports PDFs up to 20MB.",
              },
              {
                name: "Choose Rotation Angle",
                text: "Select 90°, 180°, or 270° to rotate pages clockwise or counterclockwise.",
              },
              {
                name: "Apply Rotation",
                text: "Click 'Rotate PDF' to process the file instantly. You can preview changes before saving.",
              },
              {
                name: "Download Rotated PDF",
                text: "Once complete, click 'Download PDF' to save your newly rotated document — secure and ready to use.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Is this PDF Rotate tool free to use?",
              answer:
                "Yes, it's completely free and unlimited. You can rotate as many PDFs as you like without sign-up or watermarks.",
            },
            {
              question: "Is my PDF safe while using this tool?",
              answer:
                "Yes, 100% safe. All file processing happens directly in your browser — no uploads or external servers involved.",
            },
            {
              question: "Can I rotate multiple PDF pages at once?",
              answer:
                "Yes! The tool supports batch rotation, allowing you to rotate all pages or specific ones simultaneously.",
            },
            {
              question: "Does rotating a PDF affect its quality?",
              answer:
                "No, the original quality and formatting are fully preserved during rotation.",
            },
            {
              question: "Do I need to install any software?",
              answer:
                "No installation required. Everything works online inside your browser for quick and secure rotation.",
            },
            {
              question: "Can I rotate both portrait and landscape PDFs?",
              answer:
                "Absolutely! You can rotate any page orientation, whether it’s portrait or landscape, and adjust as needed.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
