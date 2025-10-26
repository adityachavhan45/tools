import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "URL Encoder/Decoder Online | Free, Fast & Secure Percent Encoding Tool",
  description:
    "Convert and decode URLs instantly with our free URL Encoder/Decoder online. Encode text into safe percent-encoded format or decode it back to readable text. Ideal for developers, SEO experts, bloggers, and digital marketers. 100% browser-based and secure.",
  slug: "/url-encoder",
  keywords:
    "url encoder, url decoder, percent encoding, url encode decode, encode url online, decode url online, url encoding tool, online url encoder, url converter, url escape tool, safe url encoder, instant url decoder, secure url converter, url string converter, best url encoder, free url decoder, encode urls for seo, url converter online, url encoding decoding tool, developer url encoder"
});

export default function Page() {
  return <ClientPage />;
}
