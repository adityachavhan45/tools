import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Word Counter Online | Free, Fast & Accurate Tool to Count Words & Characters",
  description:
    "Count words, characters, sentences, and lines instantly with our free Word Counter online. Perfect for students, writers, bloggers, SEO experts, and content creators. Fast, accurate, and works 100% in your browser — no login or upload required.",
  slug: "/word-counter",
  keywords:
    "word counter, character count, text analysis, online word counter, free word counter, live word counter, text counter, word and character counter, essay word counter, seo word counter, instant word count, article word counter, text length checker, blog word counter, social media character counter, accurate word counter, word counter tool, content word counter, count text online, best word counter"
});

export default function Page() {
  return <ClientPage />;
}
