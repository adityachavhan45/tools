import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "URL Encoder/Decoder Online — Free Tool for Safe Percent Encoding",
  description:
    "Free URL Encoder/Decoder online. Instantly encode URLs into percent-encoding format or decode them back to normal text. Fast, secure, and private tool for developers, SEO experts, bloggers, and digital marketers working with web projects.",
  slug: "/url-encoder",
  keywords:
    "url encoder, url decoder, percent encoding, online url encoder, url encode decode, encode url online, decode url online, url encoding tool, url converter, url escape tool, safe url encoder, instant url decoder, secure url converter, url string converter, best url encoder, free url decoder, encode urls for seo, url converter online, url encoding decoding tool, developer url encoder"
});

export default function Page() {
  return <ClientPage />;
}
