import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to HTML Encoder Online — Free Tool to Convert & Decode HTML Code",
  description:
    "Free Text to HTML Encoder online. Instantly convert text to HTML code and HTML back to text with formatting, validation, and copy support. Useful tool for developers, bloggers, content creators, and SEO professionals.",
  slug: "/text-to-html-encoder",
  keywords:
    "text to html, html to text, html encoder, html decoder, text to html code, convert text to html, html escape tool, html converter online, html code generator, html formatter, encode html entities, html decode tool, html converter free, instant html encoder, secure html converter, html string converter, text to html for developers, html encoding tool, text to html converter online"
});

export default function Page() {
  return <ClientPage />;
}
