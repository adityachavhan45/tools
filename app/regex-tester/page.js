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
  title: "Regex Tester Online | Free Regular Expression Test Tool",
  description:
    "Test regular expressions online with live matches, flags, capture groups, and replace preview. Use this free Regex Tester for fast regular expression checking and debugging.",
  slug: "/regex-tester",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex test online",
    "regex tester online",
    "regex checker",
    "regex replace tool",
    "regex match tester",
    "free regex tool",
    "regular expression test tool",
    "regex online editor",
    "regex debug tool",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Regex Tester Online",
            description:
              "Free online Regex Tester with live matches, common flags, and replacement preview for developers and testers.",
            slug: "/regex-tester",
            category: "Developer Tools",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Regex Tester", slug: "/regex-tester" },
          ]),
          buildHowToJsonLd({
            name: "How to Test Regex Online",
            description:
              "Enter a pattern, choose flags, paste test text, and review matches and replacement output instantly.",
            steps: [
              { name: "Enter regex pattern", text: "Type the regular expression you want to test." },
              { name: "Choose flags", text: "Enable the flags that match your use case." },
              { name: "Paste text", text: "Add the sample text where the pattern should run." },
              { name: "Check results", text: "Review matches and replacement output right away." },
            ],
          }),
          buildFaqJsonLd([
            { question: "What is a regex tester?", answer: "A regex tester helps you run a regular expression on sample text and inspect what matches." },
            { question: "Can I test flags like g, i, and m?", answer: "Yes, this Regex Tester supports common flags such as global, case-insensitive, and multiline." },
            { question: "Does it show replacement output?", answer: "Yes, it also previews replacement output for regex replace testing." },
            { question: "Can I use it for debugging patterns?", answer: "Yes, it is useful for fast regex debugging and pattern testing before production use." },
            { question: "Is this regex tester free?", answer: "Yes, this Regex Tester is free to use online." },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
