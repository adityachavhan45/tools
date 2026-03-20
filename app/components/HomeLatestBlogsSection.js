"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

function toDateLabel(timestamp) {
  if (!timestamp) return "";
  if (typeof timestamp?.toDate === "function") {
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const seconds = Number(timestamp?.seconds || 0);
  const nanoseconds = Number(timestamp?.nanoseconds || 0);
  const millis = seconds * 1000 + Math.floor(nanoseconds / 1_000_000);
  if (!millis) return "";

  return new Date(millis).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HomeLatestBlogsSection() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const latestBlogsQuery = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(6)
        );
        const snapshot = await getDocs(latestBlogsQuery);
        const items = snapshot.docs.map((blogDoc) => {
          const data = blogDoc.data();
          return {
            id: blogDoc.id,
            title: data.title || "Untitled Blog",
            slug: data.slug || blogDoc.id,
            featureImage: data.featureImage || "",
            createdAt: data.createdAt || null,
          };
        });

        setLatestBlogs(items);
        setLoading(false);
      } catch {
        setLatestBlogs([]);
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-600">Loading latest blogs...</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Latest Blogs</h2>
        <Link href="/blog" className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      {latestBlogs.length === 0 ? (
        <p className="text-sm text-gray-600">No blogs available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="block rounded-xl border border-gray-200 overflow-hidden bg-white hover:border-blue-300 hover:shadow-sm transition"
            >
              {blog.featureImage ? (
                <img
                  src={blog.featureImage}
                  alt={blog.title}
                  width="1280"
                  height="720"
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-100" />
              )}

              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-gray-500 mt-2">{toDateLabel(blog.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
