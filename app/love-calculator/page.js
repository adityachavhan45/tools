import {
  buildMetadata,
  buildToolJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import ClientPage from "./ClientPage";

export const metadata = buildMetadata({
  title:
    "💕 Love Calculator Online - Free Relationship Compatibility Test by Name & Birth Date",
  description:
    "💖 Free Love Calculator Online! Test your love compatibility with names and birth dates. Get instant love percentage, detailed relationship insights, and compatibility score. 100% Free • Fun • Private • No Signup Needed.",
  slug: "/love-calculator",
  focusKeyword: "Love Calculator Online",
  keywords: [
    "love calculator",
    "love calculator online",
    "free love calculator",
    "love compatibility",
    "relationship calculator",
    "love test online",
    "compatibility test",
    "love percentage calculator",
    "romantic compatibility",
    "name compatibility",
    "birth date compatibility",
    "love match calculator",
    "relationship compatibility test",
    "love analyzer",
    "couple compatibility",
    "love meter",
    "soulmate calculator",
    "love prediction",
    "relationship analysis",
    "love score calculator",
    "compatibility checker",
    "love compatibility test",
    "love calculator with names",
    "love calculator with birthdate",
    "relationship love test",
    "true love calculator",
    "couple love calculator",
    "romantic love calculator",
    "love match test",
    "love compatibility checker",
    "love compatibility meter",
    "compatibility love test",
    "relationship compatibility calculator",
    "fun love test",
    "love meter online",
    "romantic compatibility test",
    "love test calculator",
    "name love calculator",
    "love match finder",
    "love calculator free online",
    "valentine love test",
    "love percentage test",
    "relationship compatibility analysis",
  ],
});

export default function LoveCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Love Calculator Online",
            description:
              "Free Love Calculator to test romantic compatibility by name and birth date. Get instant love percentage and relationship analysis.",
            slug: "/love-calculator",
            category: "Entertainment Tools",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Love Calculator", slug: "/love-calculator" },
          ]),
          buildFaqJsonLd([
            {
              question: "How does the Love Calculator work?",
              answer:
                "The Love Calculator uses a unique algorithm combining name numerology and birth date compatibility to calculate your love percentage and relationship insights instantly.",
            },
            {
              question: "Is the Love Calculator accurate?",
              answer:
                "The results are for fun and entertainment. Real compatibility depends on emotional connection, communication, and understanding, which go beyond algorithmic prediction.",
            },
            {
              question: "What information do I need to use it?",
              answer:
                "Simply enter your name, your partner’s name, and both birth dates. The calculator instantly provides your love compatibility score and analysis.",
            },
            {
              question: "Can I use it for friends or family too?",
              answer:
                "Yes! It’s not limited to romantic relationships. You can test compatibility with friends, coworkers, or anyone you’re curious about.",
            },
            {
              question: "Is my personal data safe?",
              answer:
                "Absolutely. All processing happens locally in your browser — no data is saved or transmitted anywhere. Your inputs remain 100% private.",
            },
            {
              question: "Can I share my love results?",
              answer:
                "Yes! You can copy or share your results with friends or on social media. It’s a fun way to compare compatibility scores and have a laugh together!",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
