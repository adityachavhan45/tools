import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text Diff Checker — Compare and Find Differences in Text Online",
  description:
    "Compare two texts and find differences online. Free text diff checker with highlighting and side-by-side comparison support.",
  slug: "/text-diff-checker",
  keywords: ["text diff", "text difference", "text compare", "text comparison", "diff checker"],
});

export default function Page() {
  return <ClientPage />;
}