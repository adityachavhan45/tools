import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to URL Encoder Online | Free, Fast & Secure URL Encode/Decode Tool",
  description:
    "Convert text to URL code and URL back to text instantly with our free online URL Encoder. Encode or decode URLs with accuracy, validation, and copy support. Ideal for developers, bloggers, SEO professionals, and digital marketers. 100% browser-based and secure.",
  slug: "/text-to-url-encoder",
  keywords:
    "text to url, url to text, url encoder, url decoder, text to url code, convert text to url, url encoding tool, url decoding tool, encode url online, decode url online, url string converter, online url converter, free url encoder, url escape tool, url formatter, secure url converter, instant url decoder, url encode decode online, url generator tool, text to url converter"
});

export default function Page() {
  return <ClientPage />;
}
