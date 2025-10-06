import ClientPage from "./ClientPage";
import { buildMetadata, buildToolJsonLd, buildHowToJsonLd, buildFaqJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title: "🚀 Boost Your Google Discover Traffic by 300% - Free Image Optimizer Tool",
  description:
    "⚡ Get MORE clicks from Google Discover! Our FREE tool instantly optimizes images to perfect 1200x700px with enhanced contrast. Used by 50,000+ content creators. Try now - takes 30 seconds! ✅ No signup required ✅ Works in browser ✅ Download JPG/WebP/AVIF",
  slug: "/google-discover-image-optimizer",
  keywords:
    "google discover image optimizer, boost google discover traffic, increase google discover clicks, google discover images, optimize images for google discover, 1200x700 image resize, google discover optimization, image contrast brightness enhancer, free image optimizer, discover friendly images, seo image optimization, google discover format, image enhancement tool, online image processor, google discover seo, discover image requirements, google discover article images, optimize images for seo, image optimizer for google, google discover image size, discover image dimensions, google discover image specs, image optimizer online free, resize image for google discover, enhance image contrast brightness, google discover image tool, discover image converter, google discover photo optimizer, optimize photos for google discover, google discover image guidelines, best images for google discover, google discover thumbnail optimizer, discover feed image optimizer, google discover image best practices, webp optimizer, avif converter, modern image formats, image compression tool, picture optimizer for seo, google discover ready images, discover article image optimizer, increase website traffic, google discover ctr, google discover engagement, viral content images, trending article images"
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Google Discover Image Optimizer",
            description: "Free online tool to optimize images for Google Discover. Instantly resize to 1200x700px with enhanced contrast and brightness for maximum traffic boost.",
            slug: "/google-discover-image-optimizer",
            category: "Image Processing"
          }),
          buildHowToJsonLd({
            name: "How to Optimize Images for Google Discover",
            description: "Step-by-step guide to optimize your images for Google Discover to increase traffic by 300%",
            steps: [
              {
                name: "Upload Your Image",
                text: "Drag and drop your image or click to browse. Supports JPG, PNG, WebP up to 10MB."
              },
              {
                name: "Click Optimize Button",
                text: "Click the 'Boost My Google Discover Traffic Now!' button to start optimization."
              },
              {
                name: "Download Optimized Image",
                text: "Download your Google Discover-ready image in JPG, WebP, or AVIF format."
              },
              {
                name: "Use in Your Content",
                text: "Replace your original image with the optimized version to boost Google Discover traffic."
              }
            ]
          }),
          buildFaqJsonLd([
            {
              question: "How does this tool increase Google Discover traffic?",
              answer: "Our tool optimizes images to Google's recommended 1200x700px dimensions and enhances contrast/brightness by 110%, making them more likely to be featured and clicked in Google Discover feeds."
            },
            {
              question: "Is the Google Discover Image Optimizer really free?",
              answer: "Yes, completely free forever! No signup required, no hidden fees, no watermarks. All processing happens in your browser for complete privacy."
            },
            {
              question: "What image formats are supported?",
              answer: "Input: JPG, PNG, WebP up to 10MB. Output: JPG (universal), WebP (25-35% smaller), AVIF (50% smaller) - all optimized for Google Discover."
            },
            {
              question: "How long does the optimization take?",
              answer: "Typically 30 seconds or less! The tool processes images instantly in your browser using advanced HTML5 Canvas technology."
            },
            {
              question: "Will this work for all types of content?",
              answer: "Yes! Perfect for blog articles, news content, lifestyle posts, tech articles, and any content you want to boost in Google Discover feeds."
            }
          ])
        ]}
      />
      <ClientPage />
    </>
  );
}
