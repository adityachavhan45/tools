"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import {
  collectCloudinaryPublicIds,
  deleteCloudinaryImages,
} from "@/lib/cloudinary/publicId";

const ADMIN_AUTH_KEY = "admin_logged_in";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [deletingBlogId, setDeletingBlogId] = useState("");
  const [blogError, setBlogError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(ADMIN_AUTH_KEY) === "true";

    if (!isLoggedIn) {
      router.replace("/admin");
      return;
    }

    setIsChecking(false);
  }, [router]);

  useEffect(() => {
    if (isChecking) {
      return;
    }

    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      setBlogError("");

      try {
        const blogQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(blogQuery);

        const blogItems = snapshot.docs.map((blogDoc) => {
          const data = blogDoc.data();
          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate().toLocaleString()
            : "N/A";

          return {
            id: blogDoc.id,
            title:
              data.title ||
              data.blogTitle ||
              data.name ||
              data.heading ||
              "Untitled Blog",
            createdAt,
            featureImage: data.featureImage || "",
            content: data.content || "",
          };
        });

        setBlogs(blogItems);
      } catch {
        setBlogError("Blog list load nahi ho paayi.");
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [isChecking]);

  const handleDeleteBlog = async (blogId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this blog?");

    if (!shouldDelete) {
      return;
    }

    setDeletingBlogId(blogId);
    setBlogError("");

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
      const blogToDelete = blogs.find((blog) => blog.id === blogId);
      const publicIds = blogToDelete ? collectCloudinaryPublicIds(blogToDelete, cloudName) : [];

      await deleteDoc(doc(db, "blogs", blogId));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));

      try {
        await deleteCloudinaryImages(publicIds);
      } catch {
        setBlogError("Blog delete ho gaya, par uski images cleanup nahi hui.");
      }
    } catch {
      setBlogError("Blog delete nahi hua. Please try again.");
    } finally {
      setDeletingBlogId("");
    }
  };

  if (isChecking) {
    return null;
  }

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-black mb-8">Admin Dashboard</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={() => router.push("/admin/add-blog")}
            className="!bg-black !text-white !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
          >
            Add Blog
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/subscriptions")}
            className="!bg-white !text-black !border !border-black !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
          >
            Subscriptions
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/ads")}
            className="!bg-white !text-black !border !border-black !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
          >
            Ads
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Blog List</h2>

          {loadingBlogs ? <p className="text-gray-700">Loading blogs...</p> : null}
          {blogError ? <p className="text-red-600">{blogError}</p> : null}

          {!loadingBlogs && !blogError && blogs.length === 0 ? (
            <p className="text-gray-700">No blogs found.</p>
          ) : null}

          {!loadingBlogs && !blogError && blogs.length > 0 ? (
            <div className="overflow-x-auto border border-gray-300 rounded-lg">
              <table className="w-full bg-white text-black">
                <colgroup>
                  <col className="w-12" />
                  <col />
                  <col className="w-44" />
                  <col className="w-36" />
                </colgroup>
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-3 text-sm font-semibold">#</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold whitespace-nowrap">Created At</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, index) => (
                    <tr key={blog.id} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm">{blog.title}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{blog.createdAt}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => router.push(`/admin/edit-blog?id=${blog.id}`)}
                            className="!bg-black !text-white !rounded-lg !shadow-none !py-1.5 !px-3 !text-xs"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(blog.id)}
                            disabled={Boolean(deletingBlogId)}
                            className="!bg-red-600 !text-white !rounded-lg !shadow-none !py-1.5 !px-3 !text-xs"
                          >
                            {deletingBlogId === blog.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

      </div>
    </section>
  );
}
