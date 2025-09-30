import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Word Counter Online — Free Tool to Count Words, Characters & Text",
  description:
    "Free Word Counter online. Instantly count words, characters, sentences, and lines in your text. Perfect tool for students, writers, bloggers, SEO experts, and content creators. Fast, accurate, and works directly in your browser.",
  slug: "/word-counter",
  keywords:
    "word counter, character count, text analysis, online word counter, free word counter, live word counter, text counter, word and character counter, essay word counter, seo word counter, instant word count, best online word counter, article word counter, text length checker, blog word counter, social media character counter, accurate word counter, word counter tool, content word counter, count text online"
});

export default function Page() {
  return <ClientPage />;
}
