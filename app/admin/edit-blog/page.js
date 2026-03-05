"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImageClient";
import { BLOG_CATEGORIES } from "@/lib/blog/categories";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const ADMIN_AUTH_KEY = "admin_logged_in";

function isEditorContentEmpty(html) {
  const plainText = (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();

  return plainText.length === 0;
}

function normalizeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function EditBlogPage() {
  const router = useRouter();
  const quillRef = useRef(null);

  const [isChecking, setIsChecking] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [content, setContent] = useState("");
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFeatureImage, setUploadingFeatureImage] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("");

      try {
        const blogQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(blogQuery);
        const blogItems = snapshot.docs.map((blogDoc) => {
          const data = blogDoc.data();
          return {
            id: blogDoc.id,
            title: data.title || "Untitled Blog",
            category: data.category || "",
            slug: data.slug || "",
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            focusKeyword: data.focusKeyword || "",
            featureImage: data.featureImage || "",
            content: data.content || "",
          };
        });

        setBlogs(blogItems);

        if (blogItems.length > 0) {
          const requestedId =
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("id")
              : null;
          const selectedBlog =
            (requestedId && blogItems.find((blog) => blog.id === requestedId)) || blogItems[0];

          setSelectedBlogId(selectedBlog.id);
          setTitle(selectedBlog.title);
          setCategory(selectedBlog.category);
          setSlug(selectedBlog.slug || normalizeSlug(selectedBlog.title));
          setMetaTitle(selectedBlog.metaTitle);
          setMetaDescription(selectedBlog.metaDescription);
          setFocusKeyword(selectedBlog.focusKeyword);
          setFeatureImage(selectedBlog.featureImage);
          setContent(selectedBlog.content);
        }
      } catch {
        setMessage("Blogs load nahi hue.");
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [isChecking]);

  const handleEditorImageUpload = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }

      setMessage("Uploading content image...");

      try {
        const { url } = await uploadImageToCloudinary(file, "convertixy/blog-content");
        const quill = quillRef.current?.getEditor();

        if (!quill) {
          return;
        }

        const range = quill.getSelection(true);
        const insertAt = range ? range.index : quill.getLength();

        quill.insertEmbed(insertAt, "image", url, "user");
        quill.setSelection(insertAt + 1, 0, "user");
        setMessage("");
      } catch (error) {
        setMessage(error.message || "Content image upload failed.");
      }
    };

    input.click();
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: handleEditorImageUpload,
        },
      },
      history: {
        delay: 1000,
        maxStack: 500,
        userOnly: true,
      },
    }),
    [handleEditorImageUpload]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "blockquote",
    "link",
    "image",
  ];

  const handleBlogChange = (blogId) => {
    setSelectedBlogId(blogId);
    const selected = blogs.find((blog) => blog.id === blogId);

    if (selected) {
      setTitle(selected.title);
      setCategory(selected.category || "");
      setSlug(selected.slug || normalizeSlug(selected.title));
      setMetaTitle(selected.metaTitle);
      setMetaDescription(selected.metaDescription);
      setFocusKeyword(selected.focusKeyword);
      setFeatureImage(selected.featureImage);
      setContent(selected.content);
      setMessage("");
    }
  };

  const handleFeatureImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadingFeatureImage(true);
    setMessage("Uploading feature image...");

    try {
      const { url } = await uploadImageToCloudinary(file, "convertixy/blog-feature");
      setFeatureImage(url);
      setMessage("");
    } catch (error) {
      setMessage(error.message || "Feature image upload failed.");
    } finally {
      setUploadingFeatureImage(false);
      event.target.value = "";
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selectedBlogId) {
      setMessage("Edit karne ke liye blog select karo.");
      return;
    }

    const finalSlug = normalizeSlug(slug);

    if (!title.trim() || !category.trim() || !finalSlug || isEditorContentEmpty(content)) {
      setMessage("Title, category, slug aur content required hain.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const existingSlugSnap = await getDocs(
        query(collection(db, "blogs"), where("slug", "==", finalSlug), limit(1))
      );

      if (!existingSlugSnap.empty && existingSlugSnap.docs[0].id !== selectedBlogId) {
        setMessage("Ye slug already use me hai. Dusra slug do.");
        return;
      }

      await updateDoc(doc(db, "blogs", selectedBlogId), {
        title: title.trim(),
        category: category.trim(),
        slug: finalSlug,
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        focusKeyword: focusKeyword.trim(),
        featureImage: featureImage.trim(),
        content,
        updatedAt: serverTimestamp(),
      });

      const sitemapResponse = await fetch("/api/sitemap/blogs", {
        method: "POST",
      });

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === selectedBlogId
            ? {
                ...blog,
                title: title.trim(),
                category: category.trim(),
                slug: finalSlug,
                metaTitle: metaTitle.trim(),
                metaDescription: metaDescription.trim(),
                focusKeyword: focusKeyword.trim(),
                featureImage: featureImage.trim(),
                content,
              }
            : blog
        )
      );

      setMessage(
        sitemapResponse.ok
          ? "Blog update ho gaya."
          : "Blog update ho gaya, par blogsitemap update nahi hua."
      );
    } catch {
      setMessage("Blog update nahi hua. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isChecking) {
    return null;
  }

  return (
    <section className="min-h-[70vh] bg-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-black mb-8">Edit Blog</h1>

        {loadingBlogs ? <p className="text-gray-700">Loading blogs...</p> : null}

        {!loadingBlogs && blogs.length === 0 ? (
          <p className="text-gray-700">Edit ke liye koi blog available nahi hai.</p>
        ) : null}

        {!loadingBlogs && blogs.length > 0 ? (
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label htmlFor="blog-select" className="block text-sm font-medium mb-2 text-black">
                Select Blog
              </label>
              <select
                id="blog-select"
                value={selectedBlogId}
                onChange={(e) => handleBlogChange(e.target.value)}
                className="w-full !bg-white !text-black"
              >
                {blogs.map((blog) => (
                  <option key={blog.id} value={blog.id}>
                    {blog.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2 text-black">
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full !bg-white !text-black placeholder:text-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2 text-black">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full !bg-white !text-black"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {BLOG_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2 text-black">
                Slug
              </label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(normalizeSlug(e.target.value))}
                placeholder="enter-blog-slug"
                className="w-full !bg-white !text-black placeholder:text-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="meta-title" className="block text-sm font-medium mb-2 text-black">
                Meta Title
              </label>
              <input
                id="meta-title"
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Enter meta title"
                className="w-full !bg-white !text-black placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="meta-description" className="block text-sm font-medium mb-2 text-black">
                Meta Description
              </label>
              <textarea
                id="meta-description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Enter meta description"
                className="w-full !bg-white !text-black placeholder:text-gray-500 min-h-28"
              />
            </div>

            <div>
              <label htmlFor="focus-keyword" className="block text-sm font-medium mb-2 text-black">
                Focus Keyword
              </label>
              <input
                id="focus-keyword"
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="Enter focus keyword"
                className="w-full !bg-white !text-black placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="feature-image" className="block text-sm font-medium mb-2 text-black">
                Feature Image
              </label>
              <input
                id="feature-image"
                type="file"
                accept="image/*"
                onChange={handleFeatureImageChange}
                disabled={uploadingFeatureImage}
                className="w-full !text-black"
              />
              {uploadingFeatureImage ? <p className="mt-2 text-sm text-gray-700">Uploading image...</p> : null}
              {featureImage ? (
                <div className="mt-3">
                  <img src={featureImage} alt="Feature preview" className="w-44 h-28 object-cover rounded-lg border border-gray-300" />
                  <p className="text-xs text-gray-600 mt-2 break-all">{featureImage}</p>
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-black">Blog Content</label>
              <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
                <ReactQuill
                  ref={quillRef}
                  className="admin-blog-editor"
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Edit your blog content..."
                />
              </div>
            </div>

            {message ? <p className="text-sm text-black">{message}</p> : null}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving || uploadingFeatureImage}
                className="!bg-black !text-white !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
              >
                {saving ? "Updating..." : "Update Blog"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
                className="!bg-gray-200 !text-black !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
}
