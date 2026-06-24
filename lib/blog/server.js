import "server-only";

import { cache } from "react";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

function readValueByPath(source, path) {
  if (!source || !path) return "";

  const value = path.split(".").reduce((current, segment) => {
    if (current && typeof current === "object") return current[segment];
    return undefined;
  }, source);

  return typeof value === "string" ? value.trim() : "";
}

function readFirstNonEmptyValue(source, keys) {
  for (const key of keys) {
    const value = readValueByPath(source, key);
    if (value) return value;
  }
  return "";
}

function normalizeBlog(blogDoc) {
  const data = blogDoc.data();

  return {
    id: blogDoc.id,
    slug: data.slug || "",
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
    featureImage: data.featureImage || "",
    content: data.content || "",
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  };
}

export function decodeBlogRouteValue(value) {
  const raw = (value || "").toString().trim();
  if (!raw) return "";

  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw;
  }
}

export function blogDateToISOString(timestamp) {
  if (!timestamp) return null;
  if (typeof timestamp?.toDate === "function") return timestamp.toDate().toISOString();

  const seconds = Number(timestamp?.seconds || 0);
  const nanoseconds = Number(timestamp?.nanoseconds || 0);
  const millis = seconds * 1000 + Math.floor(nanoseconds / 1_000_000);
  return millis ? new Date(millis).toISOString() : null;
}

export function formatBlogDate(timestamp) {
  const isoDate = blogDateToISOString(timestamp);
  if (!isoDate) return "N/A";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(isoDate));
}

export const getBlogBySlugOrId = cache(async (routeValue) => {
  const slugOrId = decodeBlogRouteValue(routeValue);
  if (!slugOrId) return null;

  try {
    const slugQuery = query(collection(db, "blogs"), where("slug", "==", slugOrId), limit(1));
    const slugSnapshot = await getDocs(slugQuery);
    if (!slugSnapshot.empty) return normalizeBlog(slugSnapshot.docs[0]);
  } catch {
    // The route can still be a Firestore document id.
  }

  try {
    const blogSnapshot = await getDoc(doc(db, "blogs", slugOrId));
    return blogSnapshot.exists() ? normalizeBlog(blogSnapshot) : null;
  } catch {
    return null;
  }
});

export const getBlogs = cache(async (maximum) => {
  const blogsQuery = maximum
    ? query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(maximum))
    : query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(blogsQuery);
  return snapshot.docs.map(normalizeBlog);
});
