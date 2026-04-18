import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Image Compressor Online Free | Reduce Image Size Without Quality Loss",
  description:
    "Compress images instantly without losing quality. Reduce JPG, PNG, and WebP file size for faster loading and better performance.",
  slug: "/image-compressor",
  focusKeyword: "image compressor online",
  keywords: [
    "image compressor",
    "image compressor online",
    "compress image",
    "reduce image size",
    "image optimizer",
    "jpg compressor",
    "png compressor",
    "webp compressor",
    "compress photo online",
    "reduce photo size",
    "image compression tool",
    "picture compressor",
    "shrink image size",
    "compress image for web",
    "lossless image compressor",
    "compress jpg online",
    "compress png online",
    "image optimization tool",
    "reduce file size image",
    "free image compressor"
  ],
});

export default function Page() {
  return <ClientPage />;
}