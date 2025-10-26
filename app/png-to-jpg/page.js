import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "PNG to JPG Converter Online | Free, Fast & High-Quality Image Tool",
  description:
    "Convert PNG to JPG online for free with our fast and secure image converter. Get high-quality JPG images without losing clarity — perfect for students, designers, bloggers, and professionals. Works directly in your browser, no upload required.",
  slug: "/png-to-jpg",
  keywords:
    "png to jpg, convert png to jpg, image converter, online png to jpg, free png to jpg tool, best png to jpg converter, fast png to jpg conversion, png to jpg no quality loss, convert images online, photo to jpg, picture converter, png file to jpg, secure png to jpg converter, instant png to jpg, png to jpg for web, png to jpg for social media, convert png pictures, png to jpg free converter, jpg converter online"
});

export default function Page() {
  return <ClientPage />;
}
