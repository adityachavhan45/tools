import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "URL Encoder and Decoder Free Online | Instant Text to URL Converter",
  description:
    "Encode or decode URLs instantly. Free, no login required. Convert text to URL-safe format and decode URL strings back to plain text with accuracy and copy support. Ideal for developers, SEO professionals and digital marketers. 100% browser-based and secure.",
  slug: "/text-to-url-encoder",
  keywords:
    "url encoder, url decoder, url encode decode online, encode url online, decode url online, text to url converter, url encoding tool, url decoding tool, free url encoder, instant url encoder, url string converter, online url converter, url escape tool, url formatter online, url encoder no login, best url encoder, url encoder for developers, url encoder for seo, percent encoding tool, url encode decode free"
});

export default function Page() {
  return <ClientPage />;
}
