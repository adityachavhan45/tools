import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to HTML Encoder Online | Free, Fast & Secure HTML Encode/Decode Tool",
  description:
    "Convert text to HTML and HTML to text instantly with our free online HTML Encoder. Encode or decode HTML entities with accuracy, formatting, and copy support. Perfect for developers, bloggers, content creators, and SEO professionals. 100% browser-based and secure.",
  slug: "/text-to-html-encoder",
  keywords:
    "text to html, html to text, html encoder, html decoder, text to html code, convert text to html, html escape tool, html converter online, html code generator, html formatter, encode html entities, html decode tool, free html encoder, instant html converter, secure html tool, html string converter, html encoding tool, html converter for developers, html entity encoder, online html encoder, text to html converter"
});

export default function Page() {
  return <ClientPage />;
}
