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
    "Google Discover Image Optimizer | Create 1200x700 SEO Ready Images",
  description:
    "Free Google Discover Image Optimizer to resize images to 1200x700 and improve contrast, brightness and clarity. Create Discover friendly images that increase impressions, clicks and traffic.",
  slug: "/google-discover-image-optimizer",
  focusKeyword: "Google Discover Image Optimizer",
  keywords: [
    "google discover image optimizer",
    "optimize images for google discover",
    "google discover image size",
    "resize image 1200x700",
    "discover image tool",
    "increase google discover clicks",
    "boost google discover traffic",
    "seo image optimizer",
    "discover friendly images",
    "google discover seo",
    "image enhancement tool",
    "image contrast enhancer",
    "image brightness tool",
    "image optimizer online",
    "webp image optimizer",
    "avif image converter",
    "image compression tool",
    "discover thumbnail optimizer",
    "google discover guidelines",
    "image optimization for seo"
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Google Discover Image Optimizer",
            description:
              "Free online tool to optimize images for Google Discover. Instantly resize to 1200x700px with enhanced contrast and brightness for maximum traffic boost.",
            slug: "/google-discover-image-optimizer",
            category: "Image Processing",
          }),
          buildHowToJsonLd({
            name: "How to Optimize Images for Google Discover",
            description:
              "Step-by-step guide to optimize your images for Google Discover to increase traffic by 300%.",
            steps: [
              {
                name: "Upload Your Image",
                text: "Drag and drop your image or click to browse. Supports JPG, PNG, WebP up to 10MB.",
              },
              {
                name: "Click Optimize Button",
                text: "Click the 'Boost My Google Discover Traffic Now!' button to start optimization.",
              },
              {
                name: "Download Optimized Image",
                text: "Download your Google Discover-ready image in JPG, WebP, or AVIF format.",
              },
              {
                name: "Use in Your Content",
                text: "Replace your original image with the optimized version to boost Google Discover traffic.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "How does this tool increase Google Discover traffic?",
              answer:
                "Our tool optimizes images to Google's recommended 1200x700px dimensions and enhances contrast/brightness by 110%, making them more likely to be featured and clicked in Google Discover feeds.",
            },
            {
              question: "Is the Google Discover Image Optimizer really free?",
              answer:
                "Yes, completely free forever! No signup required, no hidden fees, no watermarks. All processing happens in your browser for complete privacy.",
            },
            {
              question: "What image formats are supported?",
              answer:
                "Input: JPG, PNG, WebP up to 10MB. Output: JPG (universal), WebP (25–35% smaller), AVIF (50% smaller) — all optimized for Google Discover.",
            },
            {
              question: "How long does the optimization take?",
              answer:
                "Usually under 30 seconds. The tool runs entirely in your browser using advanced HTML5 Canvas technology for instant processing.",
            },
            {
              question: "Will this work for all types of content?",
              answer:
                "Yes. Its perfect for blog posts, news stories, lifestyle articles, tech content — any piece that needs to perform better in Google Discover.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}