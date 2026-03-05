import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { siteConstants } from "@/lib/seo";

function toIsoDate(timestamp) {
  if (!timestamp) return new Date().toISOString();
  if (typeof timestamp?.toDate === "function") return timestamp.toDate().toISOString();

  const seconds = Number(timestamp?.seconds || 0);
  const nanoseconds = Number(timestamp?.nanoseconds || 0);
  const millis = seconds * 1000 + Math.floor(nanoseconds / 1_000_000);

  return millis ? new Date(millis).toISOString() : new Date().toISOString();
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function getBlogSitemapEntries() {
  const { SITE_URL } = siteConstants();
  const snapshot = await getDocs(collection(db, "blogs"));

  return snapshot.docs.map((blogDoc) => {
    const data = blogDoc.data();
    const slugOrId = data.slug || blogDoc.id;
    const updatedAt = data.updatedAt || data.createdAt || null;

    return {
      loc: `${SITE_URL}/blog/${slugOrId}`,
      lastmod: toIsoDate(updatedAt),
    };
  });
}

export function buildBlogSitemapXml(urlEntries) {
  const urlsXml = urlEntries
    .map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
}
