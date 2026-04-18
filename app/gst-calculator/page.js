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
  title: "GST Calculator Online Free | Add or Remove GST Instantly",
  description:
    "Calculate GST instantly. Add or remove GST from any amount and get a clear tax breakdown with this free online GST calculator.",
  slug: "/gst-calculator",
  keywords: [
    "gst calculator",
    "gst calculator online",
    "add gst calculator",
    "remove gst calculator",
    "gst inclusive calculator",
    "gst exclusive calculator",
    "gst tax calculator",
    "gst amount calculator",
    "online gst tool",
    "calculate gst amount",
    "gst breakdown calculator",
    "gst price calculator",
    "gst percentage calculator",
    "india gst calculator",
    "gst reverse calculator",
    "gst add remove tool",
    "simple gst calculator",
    "free gst calculator",
    "gst inclusive exclusive tool",
    "gst calculation tool"
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "GST Calculator Online",
            description:
              "Free GST Calculator to add or remove GST from any amount with a simple tax breakdown.",
            slug: "/gst-calculator",
            category: "Calculators",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "GST Calculator", slug: "/gst-calculator" },
          ]),
          buildHowToJsonLd({
            name: "How to Calculate GST Online",
            description:
              "Enter an amount, choose add GST or remove GST mode, set the rate, and check the result instantly.",
            steps: [
              { name: "Enter amount", text: "Add the amount you want to calculate." },
              { name: "Choose mode", text: "Select whether to add GST or remove GST." },
              { name: "Set GST rate", text: "Enter the applicable GST percentage." },
              { name: "Review breakdown", text: "Check base amount, GST amount, and total." },
            ],
          }),
          buildFaqJsonLd([
            { question: "What does a GST calculator do?", answer: "A GST calculator adds GST to a base amount or removes GST from an inclusive amount." },
            { question: "Can I remove GST from a total amount?", answer: "Yes, this GST calculator supports both add GST and remove GST modes." },
            { question: "Can I use a custom GST rate?", answer: "Yes, you can enter a custom GST rate based on your use case." },
            { question: "Is this GST calculator free?", answer: "Yes, this GST Calculator is free to use online." },
            { question: "Does this replace professional tax advice?", answer: "No, it is a quick calculator for estimation and simple GST breakdowns." },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}