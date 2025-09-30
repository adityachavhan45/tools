import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PNG to JPG Converter Online — Free & Fast Image Conversion Tool",
  description:
    "Free PNG to JPG Converter online. Instantly convert PNG images into high-quality JPG format without losing clarity. Fast, secure, and easy-to-use image conversion tool for students, designers, bloggers, and professionals. Works directly in your browser.",
  slug: "/png-to-jpg",
  keywords:
    "png to jpg, convert png to jpg, image converter, free png to jpg tool, online image converter, best png to jpg converter, fast png to jpg conversion, png to jpg online, convert images online, png to jpg no quality loss, picture converter, photo to jpg, simple png to jpg tool, png file to jpg, secure png to jpg converter, instant png to jpg, png to jpg for web, png to jpg for social media, convert png pictures, png to jpg free converter"
});

export default function Page() {
  return <ClientPage />;
}