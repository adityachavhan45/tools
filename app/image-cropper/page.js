import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Image Cropper Online - Free Tool to Crop & Resize Images Instantly (JPG, PNG, WebP)",
  description:
    "Use this free Image Cropper online to crop, resize, and edit images instantly. Supports JPG, PNG, and WebP formats with custom aspect ratios and batch processing. Perfect for web design, social media, and professional photo editing.",
  slug: "/image-cropper",
  focusKeyword: "Image Cropper Online",
  keywords: [
    "image cropper",
    "image cropper online",
    "crop image",
    "free crop tool",
    "online image cropper",
    "photo cropper",
    "crop and resize images",
    "crop picture online",
    "best image cropper",
    "crop jpg",
    "crop png",
    "crop webp",
    "crop photo without losing quality",
    "image resize and crop",
    "free photo editor",
    "online crop tool",
    "crop pictures for social media",
    "crop image to ratio",
    "crop image tool",
    "crop photo fast",
    "crop picture free",
    "online image editor",
    "crop images for website",
    "instant image cropper",
    "image cutter online",
    "resize and crop images online",
    "photo crop tool",
    "crop square image",
    "crop image for instagram",
    "crop image without quality loss",
    "easy crop photo tool",
    "batch crop and resize",
    "online image crop tool",
    "crop and save photos"
  ],
});

export default function Page() {
  return <ClientPage />;
}
