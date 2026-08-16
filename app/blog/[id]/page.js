import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogDateToISOString,
  decodeBlogRouteValue,
  formatBlogDate,
  getBlogBySlugOrId,
  getBlogs,
} from "@/lib/blog/server";
import { siteConstants } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const routeValue = decodeBlogRouteValue(id);
  const blog = await getBlogBySlugOrId(routeValue);

  if (!blog) {
    return {
      title: "Blog not found",
      description: "The requested Convertixy blog could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || `Read ${blog.title} on Convertixy blog.`;
  const canonicalPath = `/blog/${blog.slug || blog.id}`;

  return {
    title,
    description,
    keywords: blog.focusKeyword || undefined,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "article",
      publishedTime: blogDateToISOString(blog.createdAt) || undefined,
      modifiedTime: blogDateToISOString(blog.updatedAt) || undefined,
      images: blog.featureImage ? [{ url: blog.featureImage, alt: blog.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.featureImage ? [blog.featureImage] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blog = await getBlogBySlugOrId(decodeBlogRouteValue(id));
  if (!blog) notFound();

  let latestBlogs = [];
  try {
    const blogs = await getBlogs(7);
    latestBlogs = blogs.filter((item) => item.id !== blog.id).slice(0, 6);
  } catch {
    // The article should remain available if the sidebar query fails.
  }

  const { SITE_URL } = siteConstants();
  const canonicalUrl = `${SITE_URL}/blog/${blog.slug || blog.id}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || `Read ${blog.title} on Convertixy blog.`,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    image: blog.featureImage || undefined,
    datePublished: blogDateToISOString(blog.createdAt) || undefined,
    dateModified:
      blogDateToISOString(blog.updatedAt) || blogDateToISOString(blog.createdAt) || undefined,
    author: { "@type": "Organization", name: "Convertixy" },
    publisher: { "@type": "Organization", name: "Convertixy", url: SITE_URL },
  };

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="max-w-6xl mx-auto">
        <Link href="/blog" className="inline-block text-sm text-blue-700 mb-6 hover:underline">
          Back to Blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 min-w-0">
            <h1 className="text-3xl font-semibold text-black">{blog.title}</h1>
            <p className="mt-3 text-sm font-medium text-gray-700">
              By Convertixy Editorial Team
            </p>
            <time
              className="block text-sm text-gray-600 mt-2"
              dateTime={blogDateToISOString(blog.createdAt) || undefined}
            >
              {formatBlogDate(blog.createdAt)}
            </time>

            {blog.featureImage ? (
              <img
                src={blog.featureImage}
                alt={blog.title}
                width="1280"
                height="720"
                className="w-full mt-6 rounded-xl border border-gray-300"
              />
            ) : null}

            <div
              className="blog-content text-black mt-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          <aside className="lg:col-span-4">
            <section className="border border-gray-300 rounded-xl p-5">
              <h2 className="text-xl font-semibold text-black mb-4">Latest Blogs</h2>
              {latestBlogs.length === 0 ? (
                <p className="text-sm text-gray-600">No latest blogs found.</p>
              ) : (
                <ul className="space-y-3">
                  {latestBlogs.map((latestBlog) => (
                    <li
                      key={latestBlog.id}
                      className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                    >
                      <Link
                        href={`/blog/${latestBlog.slug || latestBlog.id}`}
                        className="text-sm font-medium text-black hover:text-blue-700"
                      >
                        {latestBlog.title}
                      </Link>
                      <time
                        className="block text-xs text-gray-600 mt-1"
                        dateTime={blogDateToISOString(latestBlog.createdAt) || undefined}
                      >
                        {formatBlogDate(latestBlog.createdAt)}
                      </time>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
