"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

function toMillis(timestamp) {
  if (!timestamp) return 0;
  if (typeof timestamp?.toMillis === "function") return timestamp.toMillis();
  const seconds = Number(timestamp?.seconds || 0);
  const nanoseconds = Number(timestamp?.nanoseconds || 0);
  return seconds * 1000 + Math.floor(nanoseconds / 1_000_000);
}

function formatDate(timestamp) {
  if (!timestamp) return "N/A";
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

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Blogs";
    upsertMetaTag("name", "description", "Read the latest blogs on Convertixy.");
    upsertMetaTag("name", "keywords", "blogs, convertixy blog, latest blog posts");
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");

    const fetchBlogs = async () => {
      try {
        const blogQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(blogQuery);
        const blogItems = snapshot.docs.map((blogDoc) => {
          const data = blogDoc.data();
          return {
            id: blogDoc.id,
            slug: data.slug || "",
            title: data.title || "Untitled Blog",
            featureImage: data.featureImage || "",
            createdAt: data.createdAt || null,
          };
        });

        setBlogs(blogItems);
        setLoading(false);
      } catch {
        setError("Blogs load nahi hue.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const hasBlogs = useMemo(() => blogs.length > 0, [blogs]);

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-black mb-8">Blogs</h1>

        {loading ? <p className="text-gray-700">Loading blogs...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}

        {!loading && !error && !hasBlogs ? <p className="text-gray-700">No blogs found.</p> : null}

        {!loading && !error && hasBlogs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug || blog.id}`}
                className="block border border-gray-300 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                {blog.featureImage ? (
                  <img
                    src={blog.featureImage}
                    alt={blog.title}
                    width="1280"
                    height="720"
                    className="w-full h-auto"
                  />
                ) : null}

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-black line-clamp-2">{blog.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{formatDate(blog.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
