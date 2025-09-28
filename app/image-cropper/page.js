import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Image Cropper — Crop Images Online",
  description:
    "Crop images online. Free image cropper with aspect ratio options and batch processing for image editing and resizing.",
  slug: "/image-cropper",
  keywords: ["image cropper", "crop image", "image editor", "crop tool"],
});

export default function Page() {
  return <ClientPage />;
}