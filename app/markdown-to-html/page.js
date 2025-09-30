import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Markdown to HTML Converter Online — Free Tool for Developers & Writers",
  description:
    "Free Markdown to HTML Converter online. Instantly convert Markdown files into clean HTML code with formatting, syntax highlighting, and preview options. Perfect tool for developers, bloggers, technical writers, and web content creators.",
  slug: "/markdown-to-html",
  keywords:
    "markdown to html, convert markdown to html, markdown converter, html converter, markdown editor, markdown to html online, free markdown to html tool, markdown to html code, markdown to html generator, markdown to html with preview, convert md file to html, markdown to website converter, markdown html formatter, markdown to html instant, best markdown converter, markdown to html syntax highlighter, markdown to html tool for developers, markdown parser online, markdown to html for blogging, markdown converter free"
});

export default function Page() {
  return <ClientPage />;
}