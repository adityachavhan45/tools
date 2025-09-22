import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Slug Generator — URL-friendly Slugs",
  description:
    "Generate clean, URL-friendly slugs from any text. Copy instantly.",
  slug: "/slug-generator",
  keywords: ["slug generator", "url slug", "text to slug"],
});

export default function Page() {
  return <ClientPage />;
}

