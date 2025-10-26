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
    "Meta Tag Generator Online - Free SEO, Open Graph & Twitter Card Creator",
  description:
    "Use this free Meta Tag Generator online to instantly create SEO meta tags, Open Graph tags for Facebook, and Twitter Card tags with live preview. Perfect tool for bloggers, developers, and marketers to improve CTR and website SEO.",
  slug: "/meta-tag-generator",
  focusKeyword: "Meta Tag Generator Online",
  keywords: [
    "meta tag generator",
    "meta tag generator online",
    "seo meta tags",
    "open graph generator",
    "twitter card generator",
    "free meta tag generator",
    "html meta tags",
    "meta tag creator",
    "seo optimization tool",
    "website meta tags",
    "generate og tags",
    "generate twitter cards",
    "best meta tag generator",
    "meta tags for blog",
    "online meta tag tool",
    "custom meta tag generator",
    "social media meta tags",
    "meta tag builder",
    "meta tags preview tool",
    "meta tag generator for developers",
    "meta tag generator for seo",
    "meta title generator",
    "meta description generator",
    "meta tag maker online",
    "website seo tag generator",
    "meta tag editor",
    "meta tag code generator",
    "meta tag generator with preview",
    "facebook og tag creator",
    "twitter card preview generator",
    "meta tag seo tool",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Meta Tag Generator Online",
            description:
              "Free online tool to create SEO, Open Graph, and Twitter Card meta tags instantly with live preview. Improve website SEO and click-through rate.",
            slug: "/meta-tag-generator",
            category: "SEO Tools",
          }),
          buildHowToJsonLd({
            name: "How to Generate SEO Meta Tags Online",
            description:
              "Step-by-step guide to create and preview SEO meta tags, Open Graph, and Twitter Card tags for your website.",
            steps: [
              {
                name: "Enter Website Details",
                text: "Add your website title, description, URL, and keywords in the provided fields.",
              },
              {
                name: "Select Meta Tag Type",
                text: "Choose between SEO meta tags, Open Graph (Facebook), or Twitter Card formats.",
              },
              {
                name: "Preview Tags Instantly",
                text: "See how your tags appear on search results and social platforms with the live preview option.",
              },
              {
                name: "Copy and Paste into Your HTML",
                text: "Once satisfied, copy the generated meta tag code and paste it into your website’s <head> section.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What is a meta tag generator?",
              answer:
                "A meta tag generator helps you automatically create SEO meta tags, Open Graph, and Twitter Card tags to improve website ranking and social media sharing performance.",
            },
            {
              question: "Are meta tags important for SEO?",
              answer:
                "Yes. Meta tags like title and description directly impact click-through rate (CTR) and help search engines understand your page better.",
            },
            {
              question: "Can I generate Open Graph and Twitter Card tags too?",
              answer:
                "Absolutely. This tool generates SEO, Facebook Open Graph, and Twitter Card tags with live preview, ensuring your content looks perfect across all platforms.",
            },
            {
              question: "Is this meta tag generator free to use?",
              answer:
                "Yes, it’s completely free, with no sign-up or limitations. You can create unlimited tags instantly in your browser.",
            },
            {
              question: "Does it store any of my data?",
              answer:
                "No. All processing happens locally in your browser — no data is stored or sent to any server, ensuring full privacy.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
