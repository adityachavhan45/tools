import Link from "next/link";
import { formatBlogDate, getBlogs } from "@/lib/blog/server";

export default async function HomeLatestBlogsSection() {
  let latestBlogs = [];

  try {
    latestBlogs = await getBlogs(6);
  } catch {
    // Keep the homepage usable when Firestore is temporarily unavailable.
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
              href={`/blog/${blog.slug || blog.id}`}
              className="block rounded-xl border border-gray-200 overflow-hidden bg-white hover:border-blue-300 hover:shadow-sm transition"
            >
              {blog.featureImage ? (
                <img
                  src={blog.featureImage}
                  alt={blog.title}
                  width="1280"
                  height="720"
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-100" />
              )}

              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-gray-500 mt-2">{formatBlogDate(blog.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
