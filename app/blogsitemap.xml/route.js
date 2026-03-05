import { buildBlogSitemapXml, getBlogSitemapEntries } from "@/app/blogsitemap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const urlEntries = await getBlogSitemapEntries();
    const xml = buildBlogSitemapXml(urlEntries);

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(message, { status: 500 });
  }
}
