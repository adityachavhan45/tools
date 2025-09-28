import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Keyword Density Checker — Check Keyword Density Online",
  description:
    "Check keyword density online. Free keyword density checker with analysis tools and SEO optimization for content marketing and search engine optimization.",
  slug: "/keyword-density-checker",
  keywords: ["keyword density", "seo checker", "keyword analysis", "content optimization"],
});

export default function Page() {
  return <ClientPage />;
}