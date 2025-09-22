import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Meta Tag Generator — SEO, Open Graph, Twitter",
  description:
    "Generate SEO meta tags, Open Graph, and Twitter cards with live preview.",
  slug: "/meta-tag-generator",
  keywords: ["meta tags", "open graph", "twitter cards", "seo"],
});

export default function Page() {
  return <ClientPage />;
}

