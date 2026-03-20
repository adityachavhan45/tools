import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import BlogDetailClient from "./BlogDetailClient";

export const runtime = "nodejs";

function decodeRouteValue(value) {
  const raw = (value || "").toString().trim();
  if (!raw) return "";

  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw;
  }
}

function readValueByPath(source, path) {
  if (!source || !path) return "";

  if (!path.includes(".")) {
    const directValue = source[path];
    return typeof directValue === "string" ? directValue : "";
  }

  const value = path.split(".").reduce((acc, segment) => {
    if (acc && typeof acc === "object") {
      return acc[segment];
    }
    return undefined;
  }, source);

  return typeof value === "string" ? value : "";
}

function readFirstNonEmptyValue(source, keys) {
  for (const key of keys) {
    const value = readValueByPath(source, key);
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function mapSeoFields(data = {}) {
  return {
    title: data.title || "Untitled Blog",
    metaTitle: readFirstNonEmptyValue(data, [
      "metaTitle",
      "meta_title",
      "metatitle",
      "metaTital",
      "meta_tital",
      "meta title",
      "seo.metaTitle",
      "seo.meta_title",
      "seo.metaTital",
      "seo.title",
      "meta.title",
      "metadata.title",
    ]),
    metaDescription: readFirstNonEmptyValue(data, [
      "metaDescription",
      "meta_description",
      "metadescription",
      "metaDiscription",
      "meta_discription",
      "meta description",
      "seo.metaDescription",
      "seo.meta_description",
      "seo.metaDiscription",
      "seo.description",
      "meta.description",
      "metadata.description",
    ]),
    focusKeyword: readFirstNonEmptyValue(data, [
      "focusKeyword",
      "focus_keyword",
      "focuskeyword",
      "focus keyword",
      "seo.focusKeyword",
      "seo.focus_keyword",
      "seo.keyword",
      "seo.keywords",
      "meta.focusKeyword",
      "metadata.focusKeyword",
    ]),
  };
}

async function getBlogBySlugOrId(routeValue) {
  const slugOrId = decodeRouteValue(routeValue);
  if (!slugOrId) return null;

  try {
    const slugQuery = query(collection(db, "blogs"), where("slug", "==", slugOrId), limit(1));
    const slugSnap = await getDocs(slugQuery);
    if (!slugSnap.empty) {
      return slugSnap.docs[0].data();
    }
  } catch {}

  try {
    const docSnap = await getDoc(doc(db, "blogs", slugOrId));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch {}

  return null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const routeValue = decodeRouteValue(id);
  const blogData = await getBlogBySlugOrId(routeValue);

  if (!blogData) {
    return {
      title: "Blog",
      description: "Read blogs on Convertixy.",
      keywords: "blogs, convertixy blog",
    };
  }

  const seo = mapSeoFields(blogData);
  const seoTitle = seo.metaTitle || seo.title;
  const seoDescription = seo.metaDescription || `Read ${seo.title} on Convertixy blog.`;
  const seoKeywords = seo.focusKeyword || "";

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const routeValue = decodeRouteValue(id);
  return <BlogDetailClient slugOrId={routeValue} />;
}
