import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text Diff Checker Online Compare Text Code and Documents Side by Side Free 2026",
  description:
    "Compare text, code and documents side by side instantly with our free online Text Diff Checker. View differences with color highlighting for easy analysis. Perfect for writers, editors, developers and students. Fast, secure and no signup needed!",
  slug: "/text-diff-checker",
  focusKeyword: "Text Diff Checker Online Free",
  keywords:
    "text diff, text difference, text compare, text comparison, diff checker, online text comparison, code diff tool, text difference checker, compare documents online, side by side text comparison, free diff checker, document compare tool, instant text compare, content comparison tool, text changes checker, text diff for developers, text compare for writers, best text difference tool, diff tool online, secure text diff"
});

export default function Page() {
  return <ClientPage />;
}
