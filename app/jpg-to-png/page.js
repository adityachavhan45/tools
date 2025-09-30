import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "JPG to PNG Converter Online — Free & Instant Image Conversion",
  description:
    "Free JPG to PNG Converter online. Instantly convert JPG images into high-quality PNG format with transparency support. Fast, secure, and easy-to-use image converter with batch processing for designers, students, and professionals.",
  slug: "/jpg-to-png",
  keywords:
    "jpg to png, convert jpg to png, free jpg to png converter, online image converter, png converter, jpg to png transparent, convert images online, picture format converter, photo to png, instant jpg to png, best jpg to png tool, batch jpg to png converter, secure image converter, convert jpg images, jpg to png fast, jpg to png no quality loss, simple jpg to png tool, convert photo online, jpg image to png, free image format converter, jpg to png with transparency"
});

export default function Page() {
  return <ClientPage />;
}