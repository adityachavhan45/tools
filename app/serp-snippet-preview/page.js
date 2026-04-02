import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import ClientPage from "./ClientPage";

export const metadata = buildMetadata({
  title:
    "SERP Snippet Preview Tool Preview Google Search Results Before Publishing Free 2026",
  description:
    "Preview how your page title, URL and meta description will look in Google search results instantly with our free online SERP Snippet Preview Tool. Improve SEO titles and meta descriptions before publishing. Perfect for bloggers, developers and SEO professionals. No signup needed!",
  slug: "/serp-snippet-preview",
  focusKeyword: "SERP Snippet Preview Tool Online Free",
  keywords: [
    "serp snippet preview",
    "serp snippet preview tool",
    "google snippet preview",
    "meta title preview",
    "meta description preview",
    "serp simulator",
    "seo snippet preview tool",
    "search result preview",
    "google serp preview",
    "title and meta description preview",
    "snippet preview online",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "SERP Snippet Preview Tool",
            description:
              "Free SERP Snippet Preview tool to test SEO titles, URLs, and descriptions before publishing a page.",
            slug: "/serp-snippet-preview",
            category: "SEO Tools",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "SERP Snippet Preview", slug: "/serp-snippet-preview" },
          ]),
          buildHowToJsonLd({
            name: "How to Preview a Search Snippet Online",
            description:
              "Enter your title, URL, and description to see how the snippet may appear in search results.",
            steps: [
              { name: "Enter title", text: "Type the SEO title you want to preview." },
              { name: "Add URL and description", text: "Fill in the page URL and meta description." },
              { name: "Check the preview", text: "Review the snippet layout and text length." },
              { name: "Improve and publish", text: "Adjust the content until the snippet feels clear and compelling." },
            ],
          }),
          buildFaqJsonLd([
            { question: "What is a SERP snippet preview tool?", answer: "A SERP snippet preview tool helps you see how your title and meta description may appear in search results." },
            { question: "Will Google always show the same snippet?", answer: "No, search engines can rewrite snippets, but strong metadata still improves your starting point." },
            { question: "Why should I preview my snippet?", answer: "Previewing helps improve clarity, length, and click appeal before the page is published." },
            { question: "Can I check both title and description length?", answer: "Yes, this tool helps you review both your SEO title and meta description together." },
            { question: "Is this snippet preview free?", answer: "Yes, this SERP Snippet Preview tool is free to use online." },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
