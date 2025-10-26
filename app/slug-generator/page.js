import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Slug Generator Online | Free SEO-Friendly URL Slug Creator Tool",
  description:
    "Generate clean, SEO-friendly, and URL-safe slugs instantly with our free Slug Generator online. Convert any text or blog title into a perfect URL slug — ideal for developers, bloggers, and marketers. Fast, secure, and works directly in your browser.",
  slug: "/slug-generator",
  keywords:
    "slug generator, url slug, text to slug, slug maker, seo slug generator, online slug tool, convert text to slug, url friendly slug generator, free slug generator, slug creator, clean url slug, seo url generator, blog slug generator, website slug tool, best slug generator, instant slug maker, slugify text online, create seo friendly urls, url slug converter, text slug generator, seo url creator"
});

export default function Page() {
  return <ClientPage />;
}
