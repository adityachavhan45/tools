import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Image Resizer Online — Free Tool to Resize JPG, PNG, WebP Instantly",
  description:
    "Free Image Resizer online. Instantly resize images by width and height without losing quality. Supports JPG, PNG, WebP formats. Fast, secure, and easy-to-use tool for web, social media, blogs, eCommerce, and professional use.",
  slug: "/image-resizer",
  keywords:
    "image resizer, resize image, resize jpg, resize png, resize webp, online image resizer, free image resize tool, resize photo online, picture resizer, best image resizer, compress and resize image, instant photo resizer, resize image without losing quality, crop and resize, image resize for web, social media image resizer, resize images for facebook, resize images for instagram, resize photo for whatsapp, image resize online free, simple image resizer, fast image resizer, resize multiple images, batch image resizer, resize pictures instantly, online picture resizer"
});

export default function Page() {
  return <ClientPage />;
}