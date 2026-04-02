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
    "Robots.txt Generator Online Create Allow Disallow and Sitemap Rules for SEO Free 2026",
  description:
    "Create a clean robots.txt file instantly with allow, disallow, crawl delay and sitemap rules using our free online Robots.txt Generator. Perfect for bloggers, developers and SEO professionals. Simple, fast and no signup needed!",
  slug: "/robots-txt-generator",
  focusKeyword: "Robots.txt Generator Online Free",
  keywords: [
    "robots txt generator",
    "robots.txt generator online",
    "free robots txt generator",
    "create robots txt",
    "robots file generator",
    "seo robots txt tool",
    "allow disallow robots txt",
    "sitemap robots txt generator",
    "robots txt maker",
    "robots txt file creator",
    "generate robots txt online",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Robots.txt Generator Online",
            description:
              "Free online Robots.txt Generator to create crawler rules, allow and disallow paths, and sitemap directives quickly.",
            slug: "/robots-txt-generator",
            category: "SEO Tools",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Robots.txt Generator", slug: "/robots-txt-generator" },
          ]),
          buildHowToJsonLd({
            name: "How to Create a Robots.txt File Online",
            description:
              "Enter a user agent, define allow and disallow paths, add sitemap details, and generate a robots.txt file instantly.",
            steps: [
              { name: "Enter user agent", text: "Choose the crawler name or use the default wildcard." },
              { name: "Add rules", text: "Enter the allow and disallow paths you want to use." },
              { name: "Add sitemap details", text: "Include your sitemap URL and crawl delay if needed." },
              { name: "Copy the result", text: "Copy the generated robots.txt file and upload it to your website root." },
            ],
          }),
          buildFaqJsonLd([
            { question: "What is robots.txt?", answer: "robots.txt is a text file that tells search engine bots which paths they can or should not crawl on a website." },
            { question: "Does robots.txt block indexing?", answer: "Not always. robots.txt mainly controls crawling, while indexing behavior can depend on other signals too." },
            { question: "Where should I upload robots.txt?", answer: "You should place robots.txt in the root of your website, such as example.com/robots.txt." },
            { question: "Should I add a sitemap URL in robots.txt?", answer: "Yes, adding your sitemap URL in robots.txt is a common and useful SEO practice." },
            { question: "Is this robots.txt generator free?", answer: "Yes, this Robots.txt Generator is free to use online and works in your browser." },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
