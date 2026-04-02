import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Word Counter Free Online | Instant Words, Characters and Sentence Counter",
  description:
    "Count words, characters, sentences and lines instantly. Free, no login required. Perfect for students, writers, bloggers and SEO experts. Fast, accurate and works 100% in your browser. No upload required.",
  slug: "/word-counter",
  keywords:
    "word counter, word counter online, character counter, count words online, free word counter, instant word counter, text word counter, words and characters counter, essay word counter, seo word counter, sentence counter, line counter, text length checker, blog word counter, article word counter, content word counter, social media character counter, best word counter, word counter no login, word count tool"
});

export default function Page() {
  return <ClientPage />;
}
