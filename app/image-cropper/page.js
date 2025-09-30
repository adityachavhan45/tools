import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Image Cropper Online — Free Tool to Crop & Resize Images Instantly",
  description:
    "Free Image Cropper online. Easily crop, resize, and edit images (JPG, PNG, WebP) with custom aspect ratios and batch processing. Fast, secure, and simple crop tool for web, social media, and professional use.",
  slug: "/image-cropper",
  keywords:
    "image cropper, crop image, online image cropper, free crop tool, image editor, crop picture online, photo cropper, crop and resize images, best image cropper, crop jpg, crop png, crop webp, crop photo without losing quality, online crop tool, free photo editor, image resize and crop, crop pictures for social media, crop image to ratio, crop image tool, crop photo fast, crop picture free, online image editor, crop images for website, instant image cropper"
});

export default function Page() {
  return <ClientPage />;
}