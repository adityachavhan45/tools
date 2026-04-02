import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "URL Encoder and Decoder Free Online | Instant Percent Encoding Tool",
  description:
    "Encode or decode URLs instantly. Free, no login required. Convert text into safe percent-encoded format or decode it back to readable text. Ideal for developers, SEO experts and digital marketers. 100% browser-based and secure.",
  slug: "/url-encoder",
  keywords:
    "url encoder, url decoder, url encoder decoder, encode url online, decode url online, percent encoding tool, url encoding tool, url decoding tool, free url encoder, instant url encoder, url string converter, online url converter, url escape tool, url encoder for seo, url encoder for developers, best url encoder, url converter online, url encode decode free, url encoder no login, percent encode decode online"
});
export default function Page() {
  return <ClientPage />;
}
