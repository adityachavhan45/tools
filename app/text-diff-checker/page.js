import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text Diff Checker Online | Free, Fast & Accurate Text Comparison Tool",
  description:
    "Compare text, code, or documents instantly with our free Text Diff Checker online. View side-by-side differences with color highlighting for easy analysis. Perfect for writers, editors, developers, and students. Fast, secure, and 100% browser-based.",
  slug: "/text-diff-checker",
  keywords:
    "text diff, text difference, text compare, text comparison, diff checker, online text comparison, code diff tool, text difference checker, compare documents online, side by side text comparison, free diff checker, document compare tool, instant text compare, content comparison tool, text changes checker, text diff for developers, text compare for writers, best text difference tool, diff tool online, secure text diff"
});

export default function Page() {
  return <ClientPage />;
}
