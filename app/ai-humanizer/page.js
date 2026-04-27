import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Free Humanize AI Text &amp; AI Humanizer Online<",

  description:
    "Your ultimate AI Humanizer to Humanize AI text perfectly. Our AI to human converter transforms ChatGPT and Claude content into natural, human-like text",

  slug: "/ai-humanizer",

  keywords:
    "ai humanizer free, humanize ai text online, ai to human text converter, remove ai detection tool, rewrite ai content naturally, ai content humanizer, undetectable ai text tool",
});

export default function Page() {
  return <ClientPage />;
}