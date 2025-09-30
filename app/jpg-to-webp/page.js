import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "JPG to WebP Converter Online — Free & Fast Image Conversion",
  description:
    "Free JPG to WebP Converter online. Instantly convert JPG images into modern WebP format for faster loading, better compression, and high quality. Secure, private, and easy-to-use tool for web optimization, SEO, and performance improvement.",
  slug: "/jpg-to-webp",
  keywords:
    "jpg to webp, convert jpg to webp, free jpg to webp converter, online image converter, jpg to webp online, best jpg to webp tool, fast jpg to webp converter, webp converter free, compress jpg to webp, convert photo to webp, jpg to webp batch converter, jpg to webp without quality loss, jpg to webp secure tool, jpg to webp for website, optimize images webp, convert images to webp online, jpg image converter, instant jpg to webp, webp format converter, image optimization tool"
});

export default function Page() {
  return <ClientPage />;
}
