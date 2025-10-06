import {
  buildMetadata,
  buildToolJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import ClientPage from "./ClientPage";

export const metadata = buildMetadata({
  title: "💕 Free Love Calculator - Test Your Relationship Compatibility Online",
  description:
    "💖 Calculate love compatibility with names and birth dates! Free online love calculator with detailed analysis, love percentage, and relationship insights. Test your romantic compatibility now - works instantly in your browser! ✅ 100% Free ✅ Fun & Entertaining ✅ Detailed Results",
  slug: "/love-calculator",
  keywords: [
    "love calculator",
    "love compatibility",
    "relationship calculator",
    "love percentage",
    "compatibility test",
    "love test online",
    "romantic compatibility",
    "name compatibility",
    "birth date compatibility",
    "love match calculator",
    "relationship compatibility test",
    "love analyzer",
    "couple compatibility",
    "love meter",
    "romance calculator",
    "soulmate calculator",
    "love prediction",
    "relationship analysis",
    "love score calculator",
    "compatibility checker",
    "love compatibility test",
    "free love calculator",
    "online love test",
    "love calculator with names",
    "love calculator with birthdate",
    "relationship love test",
    "love percentage calculator",
    "romantic love calculator",
    "true love calculator",
    "love match test",
    "couple love calculator",
    "love compatibility checker",
    "relationship love meter",
    "love analysis tool",
    "compatibility love test",
    "love calculator online free",
    "name love calculator",
    "birth date love test",
    "love compatibility analysis",
    "romantic compatibility test",
    "love calculator tool",
    "relationship compatibility calculator",
    "love test calculator",
    "compatibility love calculator",
    "love meter online",
    "relationship love calculator",
    "love compatibility meter",
    "couple compatibility test",
    "love calculator free online",
    "romantic love test"
  ],
});

export default function LoveCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Love Calculator",
            description: "Calculate love compatibility with names and birth dates online.",
            slug: "/love-calculator",
            category: "Utilities/Entertainment",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Love Calculator", slug: "/love-calculator" },
          ]),
          buildFaqJsonLd([
            {
              question: "How does the love calculator work?",
              answer:
                "The love calculator uses name numerology and birth date analysis to calculate compatibility. It analyzes the letters in both names, birth date patterns, and various romantic factors to generate a love percentage and detailed relationship analysis.",
            },
            {
              question: "Is the love calculator accurate?",
              answer:
                "The love calculator is designed for entertainment purposes only. While it uses interesting algorithms, real relationship compatibility depends on many factors like communication, shared values, and emotional connection that cannot be measured by names and dates alone.",
            },
            {
              question: "What information do I need to use the love calculator?",
              answer:
                "You need to enter your name, your partner's name, your birth date, and your partner's birth date. The calculator will then analyze this information to provide a love compatibility percentage and detailed analysis.",
            },
            {
              question: "Can I use the love calculator for any relationship?",
              answer:
                "Yes, you can use the love calculator to test compatibility between any two people. It works for romantic relationships, friendships, or just for fun to see compatibility between any two names and birth dates.",
            },
            {
              question: "Is my data safe when using the love calculator?",
              answer:
                "Yes, your data is completely safe. All calculations happen locally in your browser, and no personal information is stored or sent to any server. Your names and birth dates remain private.",
            },
            {
              question: "Can I share my love calculator results?",
              answer:
                "Yes, you can copy your detailed love analysis results and share them with friends or on social media. The results include your love percentage, compatibility analysis, and personalized relationship insights.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
