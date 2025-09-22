import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Case Converter — Uppercase, Lowercase, Title Case",
  description:
    "Convert text to uppercase, lowercase, title case, and sentence case easily.",
  slug: "/case-converter",
  keywords: ["case converter", "uppercase", "lowercase", "title case"],
});

export default function Page() {
  return <ClientPage />;
}

