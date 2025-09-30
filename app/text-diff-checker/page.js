import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text Diff Checker Online — Free Tool to Compare & Find Text Differences",
  description:
    "Free Text Diff Checker online. Instantly compare two texts, documents, or code snippets and find differences with side-by-side highlighting. Perfect for writers, editors, developers, students, and professionals. Fast, secure, and works in your browser.",
  slug: "/text-diff-checker",
  keywords:
    "text diff, text difference, text compare, text comparison, diff checker, online text comparison, code diff tool, text difference checker, compare documents online, text diff highlighter, free diff checker, side by side text comparison, document compare tool, online diff checker, instant text compare, content comparison tool, text changes checker, text compare for writers, text diff for developers, best text difference tool"
});

export default function Page() {
  return <ClientPage />;
}
