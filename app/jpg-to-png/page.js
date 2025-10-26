import ClientPage from "./ClientPage";
import { buildMetadata, buildToolJsonLd, buildHowToJsonLd, buildFaqJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title:
    "JPG to PNG Converter Online - Free & Instant Image Conversion with Transparency",
  description:
    "Use this free JPG to PNG Converter online to instantly convert JPG images into high-quality PNG format with full transparency support. Fast, secure, and easy-to-use converter for designers, students, and professionals. Convert single or batch images in seconds.",
  slug: "/jpg-to-png",
  focusKeyword: "JPG to PNG Converter Online",
  keywords: [
    "jpg to png",
    "jpg to png converter",
    "jpg to png converter online",
    "convert jpg to png",
    "free jpg to png converter",
    "online image converter",
    "png converter",
    "jpg to png transparent",
    "convert images online",
    "photo to png",
    "instant jpg to png",
    "best jpg to png tool",
    "batch jpg to png converter",
    "secure image converter",
    "convert jpg images",
    "jpg to png fast",
    "jpg to png without quality loss",
    "simple jpg to png tool",
    "convert photo online",
    "jpg image to png",
    "free image format converter",
    "jpg to png with transparency",
    "online jpg to png free",
    "image converter for designers",
    "jpg to png converter tool",
    "convert jpg pictures",
    "photo format converter",
    "instant image converter",
    "high quality jpg to png",
    "jpg to png for web",
    "jpg to png transparent background",
    "jpg to png converter no watermark",
    "convert jpg to png instantly",
    "best online image converter",
    "jpg to png quick converter",
    "jpg to png converter for students"
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "JPG to PNG Converter Online",
            description:
              "Free JPG to PNG Converter online to instantly convert JPG images into high-quality PNG format with transparency. Fast, secure, and simple tool for web, design, and professional use.",
            slug: "/jpg-to-png",
            category: "Image Tools",
          }),
          buildHowToJsonLd({
            name: "How to Convert JPG to PNG Online",
            description:
              "Step-by-step guide to convert JPG images to PNG format instantly and preserve transparency.",
            steps: [
              {
                name: "Upload Your JPG Image",
                text: "Click 'Upload' or drag and drop your JPG file. You can also upload multiple images for batch conversion.",
              },
              {
                name: "Click Convert Button",
                text: "Press the 'Convert to PNG' button to start the conversion process. The tool works instantly in your browser.",
              },
              {
                name: "Download Your PNG File",
                text: "Once processing is done, click 'Download PNG' to save your high-quality image with full transparency.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Can I convert JPG to PNG without losing quality?",
              answer:
                "Yes! Our converter ensures lossless image quality during conversion while maintaining color accuracy and transparency support.",
            },
            {
              question: "Is this JPG to PNG converter free?",
              answer:
                "Yes, completely free! No signup, no watermark, and unlimited conversions directly in your browser.",
            },
            {
              question: "Does it support transparency?",
              answer:
                "Yes. When converting from JPG to PNG, transparent areas are preserved or can be adjusted for web and design purposes.",
            },
            {
              question: "Is my image data safe?",
              answer:
                "Absolutely. All conversions happen in your browser — no files are uploaded or stored on any server, ensuring total privacy.",
            },
            {
              question: "Can I convert multiple JPGs at once?",
              answer:
                "Yes, our batch conversion feature lets you process multiple JPG images into PNG format instantly with one click.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
