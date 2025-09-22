import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Split — Split PDF Pages Online",
  description:
    "Split a PDF into separate pages quickly in your browser. No signup, private, and fast.",
  slug: "/pdf-split",
  keywords: ["pdf split", "split pdf", "extract pdf pages", "separate pdf"],
});

export default function Page() {
  return <ClientPage />;
}

