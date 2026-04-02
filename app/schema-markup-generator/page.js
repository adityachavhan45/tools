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
    "Schema Markup Generator Online Create JSON LD Structured Data for SEO Free 2026",
  description:
    "Create valid JSON LD structured data instantly for articles, FAQs, products, organizations, websites and local business pages with our free online Schema Markup Generator. Perfect for bloggers, developers and SEO professionals. Fast and no signup needed!",
  slug: "/schema-markup-generator",
  focusKeyword: "Schema Markup Generator Online Free",
  keywords: [
    "schema markup generator",
    "schema generator online",
    "json ld generator",
    "structured data generator",
    "schema markup generator online",
    "json ld schema generator",
    "free schema markup generator",
    "faq schema generator",
    "article schema generator",
    "product schema generator",
    "organization schema generator",
    "website schema generator",
    "local business schema generator",
    "structured data markup tool",
    "google rich results schema generator",
  ],
});
export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Schema Markup Generator Online",
            description:
              "Free online Schema Markup Generator to create JSON-LD structured data for articles, FAQ pages, products, organizations, websites, and local business pages.",
            slug: "/schema-markup-generator",
            category: "SEO Tools",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Schema Markup Generator", slug: "/schema-markup-generator" },
          ]),
          buildHowToJsonLd({
            name: "How to Generate Schema Markup Online",
            description:
              "Create JSON-LD schema markup by selecting a schema type, entering important page details, and copying the generated output.",
            steps: [
              { name: "Select schema type", text: "Choose the type of schema markup you want to create." },
              { name: "Fill in the fields", text: "Enter title, description, URL, and any other relevant details." },
              { name: "Generate the schema", text: "Review the generated JSON-LD output instantly." },
              { name: "Copy and use it", text: "Copy the output and add it to your webpage." },
            ],
          }),
          buildFaqJsonLd([
            { question: "What is schema markup?", answer: "Schema markup is structured data that helps search engines understand webpage content more clearly and can support rich result eligibility." },
            { question: "Which schema format is best?", answer: "JSON-LD is widely used and commonly recommended because it is easier to manage and implement on modern websites." },
            { question: "Can this tool generate FAQ schema?", answer: "Yes, this tool can generate FAQ schema along with several other useful schema types for SEO." },
            { question: "Is this schema generator free?", answer: "Yes, this Schema Markup Generator is free to use online and works directly in your browser." },
            { question: "Do I need coding knowledge to use it?", answer: "No, basic users can fill in the form and copy the generated JSON-LD output without writing schema manually." },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
