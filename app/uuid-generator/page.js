import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "UUID Generator — Generate UUID v4",
  description:
    "Generate UUID v4 identifiers instantly in your browser. Copy with one click.",
  slug: "/uuid-generator",
  keywords: ["uuid generator", "uuid v4", "guid"],
});

export default function Page() {
  return <ClientPage />;
}

