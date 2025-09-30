import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Meta Tag Generator Online — Free SEO, Open Graph & Twitter Card Tool",
  description:
    "Free Meta Tag Generator online. Instantly create SEO meta tags, Open Graph tags for Facebook, and Twitter card tags with live preview. Perfect for bloggers, developers, marketers, and SEO professionals to optimize websites and improve CTR.",
  slug: "/meta-tag-generator",
  keywords:
    "meta tag generator, seo meta tags, open graph generator, twitter card generator, free meta tag generator, html meta tags, meta tag creator, seo optimization tool, website meta tags, generate og tags, generate twitter cards, best meta tag generator, meta tags for blog, online meta tag tool, custom meta tag generator, social media meta tags, meta tag builder, meta tags preview tool, meta tag generator for developers, meta tag generator for seo"
});

export default function Page() {
  return <ClientPage />;
}