import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Merge — Combine PDF Files Online",
  description:
    "Merge multiple PDF files into a single PDF securely in your browser. Fast, private, no uploads.",
  slug: "/pdf-merge",
  keywords: ["pdf merge", "merge pdf", "combine pdf", "join pdf"],
});

export default function Page() {
  return <ClientPage />;
}

