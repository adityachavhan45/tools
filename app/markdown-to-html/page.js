import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title:
    "Markdown to HTML Converter Online - Free Tool for Developers, Bloggers & Writers",
  description:
    "Use this free Markdown to HTML Converter online to instantly convert Markdown text or .md files into clean HTML code with proper formatting, syntax highlighting, and live preview. Perfect for developers, content creators, and technical writers.",
  slug: "/markdown-to-html",
  focusKeyword: "Markdown to HTML Converter Online",
  keywords: [
    "markdown to html",
    "convert markdown to html",
    "markdown converter",
    "html converter",
    "markdown editor",
    "markdown to html online",
    "free markdown to html tool",
    "markdown to html code",
    "markdown to html generator",
    "markdown to html with preview",
    "convert md file to html",
    "markdown to website converter",
    "markdown html formatter",
    "markdown to html instant",
    "best markdown converter",
    "markdown to html syntax highlighter",
    "markdown to html tool for developers",
    "markdown parser online",
    "markdown to html for blogging",
    "markdown converter free",
    "markdown html converter",
    "markdown viewer online",
    "md to html converter",
    "markdown to html exporter",
    "markdown code to html",
    "markdown to html free tool",
    "markdown preview tool",
    "markdown formatter online",
    "markdown converter for github",
    "markdown to html seo tool",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Markdown to HTML Converter Online",
            description:
              "Free Markdown to HTML Converter to instantly generate clean, formatted HTML code with syntax highlighting and live preview. Ideal for developers, bloggers, and content creators.",
            slug: "/markdown-to-html",
            category: "Developer Tools",
          }),
          buildHowToJsonLd({
            name: "How to Convert Markdown to HTML Online",
            description:
              "Step-by-step guide to convert Markdown text or .md files into HTML format instantly using this free online tool.",
            steps: [
              {
                name: "Enter or Upload Markdown Text",
                text: "Paste your Markdown text directly into the editor or upload a .md file to start conversion.",
              },
              {
                name: "Click Convert to HTML",
                text: "Press the 'Convert' button to instantly transform your Markdown into formatted HTML code.",
              },
              {
                name: "Preview and Copy Output",
                text: "View the HTML preview instantly and copy or download your generated HTML code for your website or CMS.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What is Markdown?",
              answer:
                "Markdown is a lightweight markup language used to format text easily for blogs, documentation, and websites. It’s simple, readable, and converts directly into HTML.",
            },
            {
              question: "How does this Markdown to HTML converter work?",
              answer:
                "This tool parses your Markdown text and converts it to valid, well-formatted HTML code instantly using modern JavaScript-based Markdown rendering engines.",
            },
            {
              question: "Is this Markdown to HTML converter free?",
              answer:
                "Yes, it’s 100% free and works directly in your browser — no signup, ads, or watermarks.",
            },
            {
              question: "Can I upload Markdown files (.md)?",
              answer:
                "Yes! You can upload Markdown files directly and the tool will instantly display formatted HTML output with syntax highlighting.",
            },
            {
              question: "Is my data safe when using this converter?",
              answer:
                "Absolutely. All conversion happens locally in your browser, ensuring your text or files are never uploaded or stored on any server.",
            },
            {
              question: "Who can use this Markdown to HTML tool?",
              answer:
                "This converter is perfect for developers, content creators, bloggers, technical writers, and students who work with Markdown files or write web content.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
