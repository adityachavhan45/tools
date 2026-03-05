"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

function toMillis(timestamp) {
  if (!timestamp) return 0;
  if (typeof timestamp?.toMillis === "function") return timestamp.toMillis();
  const seconds = Number(timestamp?.seconds || 0);
  const nanoseconds = Number(timestamp?.nanoseconds || 0);
  return seconds * 1000 + Math.floor(nanoseconds / 1_000_000);
}

function formatDate(timestamp) {
  const millis = toMillis(timestamp);
  if (!millis) return "N/A";
  return new Date(millis).toLocaleString();
}

function upsertMetaTag(attribute, key, content) {
  if (!content) return;

  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

export default function BlogDetailPage() {
  const params = useParams();
  const slugOrId = useMemo(() => params?.id?.toString() || "", [params]);

  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slugOrId) {
      return;
    }

    setLoading(true);
    setError("");

    const latestQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribeLatest = onSnapshot(
      latestQuery,
      (snapshot) => {
        const allItems = snapshot.docs
          .map((latestDoc) => {
            const latestData = latestDoc.data();
            return {
              id: latestDoc.id,
              slug: latestData.slug || "",
              title: latestData.title || "Untitled Blog",
              metaTitle: latestData.metaTitle || "",
              metaDescription: latestData.metaDescription || "",
              focusKeyword: latestData.focusKeyword || "",
              featureImage: latestData.featureImage || "",
              content: latestData.content || "",
              createdAt: latestData.createdAt || null,
            };
          });

        const currentBlog = allItems.find(
          (item) => item.slug === slugOrId || item.id === slugOrId
        );

        if (!currentBlog) {
          setBlog(null);
          setError("Blog not found.");
          setLoading(false);
          setLatestBlogs([]);
          return;
        }

        setBlog(currentBlog);
        setError("");
        setLoading(false);

        const latestItems = allItems
          .filter((item) => item.id !== currentBlog.id)
          .slice(0, 6);

        setLatestBlogs(latestItems);
      },
      () => {
        setError("Blog load nahi hua.");
        setLoading(false);
        setLatestBlogs([]);
      }
    );

    return () => {
      unsubscribeLatest();
    };
  }, [slugOrId]);

  useEffect(() => {
    if (!blog) {
      return;
    }

    const seoTitle = blog.metaTitle?.trim() || blog.title;
    const seoDescription =
      blog.metaDescription?.trim() || `Read ${blog.title} on Convertixy blog.`;
    const seoKeywords = blog.focusKeyword?.trim() || "";

    document.title = seoTitle;
    upsertMetaTag("name", "description", seoDescription);
    upsertMetaTag("name", "keywords", seoKeywords);
    upsertMetaTag("property", "og:title", seoTitle);
    upsertMetaTag("property", "og:description", seoDescription);
    upsertMetaTag("name", "twitter:title", seoTitle);
    upsertMetaTag("name", "twitter:description", seoDescription);
  }, [blog]);

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <Link href="/blog" className="inline-block text-sm text-blue-700 mb-6 hover:underline">
          Back to Blogs
        </Link>

        {loading ? <p className="text-gray-700">Loading blog...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}

        {!loading && !error && blog ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <article className="lg:col-span-8">
              <h1 className="text-3xl font-semibold text-black">{blog.title}</h1>
              <p className="text-sm text-gray-600 mt-2">{formatDate(blog.createdAt)}</p>

              {blog.featureImage ? (
                <img
                  src={blog.featureImage}
                  alt={blog.title}
                  className="w-full mt-6 rounded-xl border border-gray-300"
                />
              ) : null}

              <div
                className="blog-content text-black mt-8"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            <aside className="lg:col-span-4">
              <div className="border border-gray-300 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-black mb-4">Latest Blogs</h2>

                {latestBlogs.length === 0 ? (
                  <p className="text-sm text-gray-600">No latest blogs found.</p>
                ) : (
                  <ul className="space-y-3">
                    {latestBlogs.map((latestBlog) => (
                      <li key={latestBlog.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                        <Link
                          href={`/blog/${latestBlog.slug || latestBlog.id}`}
                          className="text-sm font-medium text-black hover:text-blue-700"
                        >
                          {latestBlog.title}
                        </Link>
                        <p className="text-xs text-gray-600 mt-1">{formatDate(latestBlog.createdAt)}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </section>
  );
}
