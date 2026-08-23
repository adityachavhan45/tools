import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { siteConstants } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toIsoDate(timestamp) {
  if (!timestamp) {
    return new Date().toISOString();
  }

  if (typeof timestamp?.toDate === "function") {
    return timestamp.toDate().toISOString();
  }

  const seconds = Number(timestamp?.seconds || 0);
  const nanoseconds = Number(timestamp?.nanoseconds || 0);
  const millis = seconds * 1000 + Math.floor(nanoseconds / 1_000_000);

  if (!millis) {
    return new Date().toISOString();
  }

  return new Date(millis).toISOString();
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildBlogSitemapXml(urlEntries) {
  const urlsXml = urlEntries
    .map(
      (entry) => `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
}

async function getBlogEntries() {
  const { SITE_URL } = siteConstants();
  const snapshot = await getDocs(collection(db, "blogs"));

  return snapshot.docs.map((blogDoc) => {
    const data = blogDoc.data();
    const updatedAt = data.updatedAt || data.createdAt || null;
    const slugOrId = data.slug || blogDoc.id;

    return {
      loc: `${SITE_URL}/blog/${slugOrId}`,
      lastmod: toIsoDate(updatedAt),
    };
  });
}

export async function GET() {
  try {
    const urlEntries = await getBlogEntries();
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

export async function POST() {
  try {
    const urlEntries = await getBlogEntries();
    return NextResponse.json({ status: "success", count: urlEntries.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Blog sitemap update failed.";
    return NextResponse.json(
      { status: "error", message },
      { status: 500 }
    );
  }
}
