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
    "Google Discover Image Optimizer - Boost Clicks with 1200x700 SEO-Ready Images (Free Tool)",
  description:
    "Use this free Google Discover Image Optimizer to instantly resize images to 1200x700px and enhance contrast, brightness, and clarity. Create Discover-friendly images that drive more impressions, clicks, and traffic to your blog or news site — no signup required.",
  slug: "/google-discover-image-optimizer",
  focusKeyword: "Google Discover Image Optimizer",
  keywords: [
    "google discover image optimizer",
    "optimize images for google discover",
    "google discover image size 1200x700",
    "google discover image tool",
    "boost google discover traffic",
    "increase google discover clicks",
    "discover friendly images",
    "seo image optimizer",
    "google discover optimization",
    "image contrast brightness enhancer",
    "google discover format",
    "google discover seo",
    "google discover image guidelines",
    "resize image for google discover",
    "discover feed image optimizer",
    "google discover thumbnail optimizer",
    "best images for google discover",
    "discover image converter",
    "webp optimizer",
    "avif converter",
    "image compression tool",
    "image enhancement for seo",
    "google discover ready images",
    "viral content images",
    "discover article image optimizer",
    "image optimizer online free",
    "1200x700 image resize",
    "image sharpness enhancer",
    "google discover engagement",
    "discover image requirements",
    "optimize photos for discover",
    "google discover click through rate",
    "discover seo image tool",
    "content image optimization",
    "google discover image improvement",
    "increase website traffic images",
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
