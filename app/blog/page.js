import Link from "next/link";
import { blogDateToISOString, formatBlogDate, getBlogs } from "@/lib/blog/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blogs",
  description: "Read the latest blogs on Convertixy.",
  keywords: ["blogs", "Convertixy blog", "latest blog posts"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Convertixy Blogs",
    description: "Read the latest blogs on Convertixy.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogListPage() {
  let blogs = [];
  let error = false;

  try {
    blogs = await getBlogs();
  } catch {
    error = true;
  }

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-black mb-8">Blogs</h1>

        {error ? <p className="text-red-600">Blogs load nahi hue.</p> : null}
        {!error && blogs.length === 0 ? <p className="text-gray-700">No blogs found.</p> : null}

        {!error && blogs.length > 0 ? (
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
                  <time
                    className="block text-sm text-gray-600 mt-2"
                    dateTime={blogDateToISOString(blog.createdAt) || undefined}
                  >
                    {formatBlogDate(blog.createdAt)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
