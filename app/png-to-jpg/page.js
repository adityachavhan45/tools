import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "PNG to JPG Converter Online Convert PNG Images to High Quality JPG Instantly Free 2026",
  description:
    "Convert PNG images to high quality JPG instantly without losing clarity with our free online PNG to JPG Converter. Perfect for students, designers, bloggers and professionals. Fast, secure and works 100% in your browser. No signup needed!",
  slug: "/png-to-jpg",
  focusKeyword: "PNG to JPG Converter Online Free",
  keywords:
    "png to jpg, convert png to jpg, image converter, online png to jpg, free png to jpg tool, best png to jpg converter, fast png to jpg conversion, png to jpg no quality loss, convert images online, photo to jpg, picture converter, png file to jpg, secure png to jpg converter, instant png to jpg, png to jpg for web, png to jpg for social media, convert png pictures, png to jpg free converter, jpg converter online"
});

export default function Page() {
  return <ClientPage />;
}
