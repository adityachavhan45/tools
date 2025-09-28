import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to HTML Encoder — Convert Text to HTML Code Online",
  description:
    "Convert text to HTML code and HTML to text online. Free text to HTML encoder with formatting and validation support.",
  slug: "/text-to-html-encoder",
  keywords: ["text to html", "text to html", "html encoder", "html encoder", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}