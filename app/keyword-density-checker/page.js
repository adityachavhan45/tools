import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Keyword Density Checker Online — Free SEO Tool for Content Optimization",
  description:
    "Free Keyword Density Checker online. Instantly analyze keyword usage, frequency, and percentage in your content. Best SEO tool for writers, bloggers, and marketers to optimize keyword placement, improve on-page SEO, and boost rankings.",
  slug: "/keyword-density-checker",
  keywords:
    "keyword density checker, check keyword density, free seo checker, keyword analysis tool, content optimization tool, keyword frequency checker, seo keyword analyzer, on-page seo tool, keyword density calculator, keyword ratio checker, article seo tool, content seo analyzer, keyword usage checker, keyword placement tool, keyword count tool, keyword optimization tool, seo keyword checker, blog seo checker, keyword analysis online, improve seo content, keyword seo density tool, best keyword checker, online keyword density checker"
});

export default function Page() {
  return <ClientPage />;
}