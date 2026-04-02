import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to HTML Encoder Online Convert Text to HTML and Decode HTML Entities Free 2026",
  description:
    "Convert text to HTML and decode HTML entities instantly with our free online Text to HTML Encoder. Includes formatting and copy support. Perfect for developers, bloggers, content creators and SEO professionals. Fast, secure and no signup needed!",
  slug: "/text-to-html-encoder",
  focusKeyword: "Text to HTML Encoder Online Free",
  keywords:
    "text to html, html to text, html encoder, html decoder, text to html code, convert text to html, html escape tool, html converter online, html code generator, html formatter, encode html entities, html decode tool, free html encoder, instant html converter, secure html tool, html string converter, html encoding tool, html converter for developers, html entity encoder, online html encoder, text to html converter"
});

export default function Page() {
  return <ClientPage />;
}
