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
    "JPG to WebP Converter Online - Free & Fast Image Conversion for Web Optimization",
  description:
    "Use this free JPG to WebP Converter online to instantly convert JPG images into WebP format for faster website loading, smaller file sizes, and higher quality. Secure, private, and easy-to-use tool for SEO and web performance optimization.",
  slug: "/jpg-to-webp",
  focusKeyword: "JPG to WebP Converter Online",
  keywords: [
    "jpg to webp",
    "jpg to webp converter",
    "jpg to webp converter online",
    "convert jpg to webp",
    "free jpg to webp converter",
    "online image converter",
    "jpg to webp online",
    "fast jpg to webp converter",
    "webp converter free",
    "compress jpg to webp",
    "convert photo to webp",
    "jpg to webp batch converter",
    "jpg to webp without quality loss",
    "secure image converter",
    "jpg to webp for website",
    "optimize images webp",
    "convert images to webp online",
    "jpg image converter",
    "instant jpg to webp",
    "webp format converter",
    "image optimization tool",
    "webp image converter for seo",
    "jpg to webp no watermark",
    "photo to webp converter",
    "convert jpg images online",
    "best jpg to webp tool",
    "image compression converter",
    "jpg to webp converter fast free",
    "convert multiple jpg to webp",
    "online webp optimization tool",
    "webp converter for developers",
    "jpg to webp converter for designers",
    "jpg to webp convert tool"
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "JPG to WebP Converter Online",
            description:
              "Free online tool to convert JPG images into WebP format instantly. Improve loading speed, SEO, and performance with optimized WebP images.",
            slug: "/jpg-to-webp",
            category: "Image Tools",
          }),
          buildHowToJsonLd({
            name: "How to Convert JPG to WebP Online",
            description:
              "Step-by-step guide to convert JPG images into high-quality, optimized WebP format instantly.",
            steps: [
              {
                name: "Upload Your JPG Image",
                text: "Click the upload area or drag and drop your JPG image file. You can upload multiple images at once.",
              },
              {
                name: "Click Convert to WebP",
                text: "Press the 'Convert' button to start the conversion process. The tool runs instantly in your browser.",
              },
              {
                name: "Download WebP File",
                text: "After conversion, download your optimized WebP file for web use, SEO, or design projects.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What is a WebP image format?",
              answer:
                "WebP is a modern image format developed by Google that provides superior compression and quality compared to JPG and PNG. It helps websites load faster while maintaining high visual quality.",
            },
            {
              question: "Can I convert JPG to WebP without losing quality?",
              answer:
                "Yes, our converter uses smart compression that reduces file size while preserving visual clarity. You can expect 25–35% smaller files without noticeable quality loss.",
            },
            {
              question: "Is this JPG to WebP converter free to use?",
              answer:
                "Yes, it’s 100% free with no signup, no watermark, and unlimited conversions. Everything happens securely in your browser for complete privacy.",
            },
            {
              question: "Why should I convert images to WebP format?",
              answer:
                "WebP images load faster and use less bandwidth, which improves SEO, Core Web Vitals, and Google Discover eligibility. It’s ideal for modern websites, blogs, and eCommerce platforms.",
            },
            {
              question: "Does it support batch conversion?",
              answer:
                "Yes, you can upload multiple JPG files and convert them all to WebP in one go for faster workflow.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
