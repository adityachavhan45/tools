import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Image Compressor Online — Free Tool to Reduce Image Size Instantly",
  description:
    "Free Image Compressor online. Quickly compress and reduce image size (JPG, PNG, WebP) without losing quality. Fast, secure, and easy-to-use tool for web optimization, SEO, performance, and storage saving.",
  slug: "/image-compressor",
  keywords:
    "image compressor, compress image, reduce image size, optimize images, jpg compressor, png compressor, webp compressor, online image compressor, free image compression, image optimizer tool, compress photo online, reduce photo size, image compression tool, picture compressor, shrink image size, best image compressor, fast image compressor, image quality optimizer, image resizer and compressor, compress image for web, compress image without losing quality, compress photo free, compress png online, compress jpg online, website image optimizer"
});

export default function Page() {
  return <ClientPage />;
}