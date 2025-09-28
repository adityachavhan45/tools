import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Markdown to HTML — Convert Markdown to HTML Online",
  description:
    "Convert Markdown to HTML online. Free Markdown to HTML converter with formatting options and syntax highlighting for web development and content creation.",
  slug: "/markdown-to-html",
  keywords: ["markdown to html", "convert markdown", "html converter", "markdown converter"],
});

export default function Page() {
  return <ClientPage />;
}