import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Free SEO Checker Tool | Audit Website & Fix SEO Issues Fast",
  description:
    "Run a complete SEO audit for your website in seconds. Detect errors, fix SEO issues, improve rankings, and boost traffic with our free AI-powered SEO checker tool.",
  slug: "/seo-audit-checker",
  keywords:
    "free seo checker,seo audit checker, website seo audit tool, technical seo audit, ai seo audit, on-page seo checker",
});

export default function Page() {
  return <ClientPage />;
}
