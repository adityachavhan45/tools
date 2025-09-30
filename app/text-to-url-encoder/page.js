import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to URL Encoder Online — Free Tool to Encode & Decode URL Strings",
  description:
    "Free Text to URL Encoder online. Instantly convert text to URL code and URL back to text with formatting, validation, and copy options. Useful tool for developers, bloggers, SEO experts, and digital marketers working with web projects.",
  slug: "/text-to-url-encoder",
  keywords:
    "text to url, url to text, url encoder, url decoder, text to url code, convert text to url, online url tool, url string converter, url code generator, encode url online, decode url online, url converter tool, url formatter, free url encoder, secure url converter, instant url decoder, text to url converter, url encoding tool, url escape tool, url encode decode online"
});

export default function Page() {
  return <ClientPage />;
}
