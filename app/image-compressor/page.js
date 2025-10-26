import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Image Compressor Online - Free Tool to Reduce Image Size Instantly Without Quality Loss",
  description:
    "Use this free Image Compressor online to reduce image size (JPG, PNG, WebP) instantly without losing quality. Fast, secure, and easy-to-use tool for web optimization, SEO performance, faster loading speed, and storage saving.",
  slug: "/image-compressor",
  focusKeyword: "Image Compressor Online",
  keywords: [
    "image compressor",
    "image compressor online",
    "compress image",
    "reduce image size",
    "optimize images",
    "jpg compressor",
    "png compressor",
    "webp compressor",
    "free image compression tool",
    "online image compressor",
    "image optimizer tool",
    "compress photo online",
    "reduce photo size",
    "image compression tool",
    "picture compressor",
    "shrink image size",
    "best image compressor",
    "fast image compressor",
    "image quality optimizer",
    "image resizer and compressor",
    "compress image for web",
    "compress image without losing quality",
    "compress photo free",
    "compress png online",
    "compress jpg online",
    "website image optimizer",
    "seo image optimization tool",
    "photo compression online",
    "image compression for website speed",
    "web image optimization",
    "compress large images online",
    "reduce file size for uploading",
    "lossless image compressor",
    "image compression without quality loss"
  ],
});

export default function Page() {
  return <ClientPage />;
}
