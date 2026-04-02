import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Slug Generator Online Convert Text and Blog Titles to SEO Friendly URL Slugs Free 2026",
  description:
    "Convert any text or blog title into clean SEO friendly URL slugs instantly with our free online Slug Generator. Perfect for developers, bloggers and marketers. Fast, secure and works 100% in your browser. No signup needed!",
  slug: "/slug-generator",
  focusKeyword: "Slug Generator Online Free",
  keywords:
    "slug generator, url slug, text to slug, slug maker, seo slug generator, online slug tool, convert text to slug, url friendly slug generator, free slug generator, slug creator, clean url slug, seo url generator, blog slug generator, website slug tool, best slug generator, instant slug maker, slugify text online, create seo friendly urls, url slug converter, text slug generator, seo url creator"
});

export default function Page() {
  return <ClientPage />;
}
