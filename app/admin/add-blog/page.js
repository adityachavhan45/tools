"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { addDoc, collection, getDocs, limit, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImageClient";
import { deleteCloudinaryImages } from "@/lib/cloudinary/publicId";
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

export default function AddBlogPage() {
  const router = useRouter();
  const quillRef = useRef(null);
  const pendingContentImageIdsRef = useRef(new Set());

  const [isChecking, setIsChecking] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [pendingFeatureImageId, setPendingFeatureImageId] = useState("");
  const [content, setContent] = useState("");
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
        const { url, publicId } = await uploadImageToCloudinary(file, "convertixy/blog-content");
        const quill = quillRef.current?.getEditor();

        if (!quill) {
          if (publicId) await deleteCloudinaryImages([publicId]).catch(() => {});
          return;
        }

        const range = quill.getSelection(true);
        const insertAt = range ? range.index : quill.getLength();

        quill.insertEmbed(insertAt, "image", url, "user");
        quill.setSelection(insertAt + 1, 0, "user");
        if (publicId) pendingContentImageIdsRef.current.add(publicId);
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

  const handleFeatureImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadingFeatureImage(true);
    setMessage("Uploading feature image...");

    try {
      const { url, publicId } = await uploadImageToCloudinary(file, "convertixy/blog-feature");

      if (pendingFeatureImageId && pendingFeatureImageId !== publicId) {
        await deleteCloudinaryImages([pendingFeatureImageId]).catch(() => {});
      }

      setFeatureImage(url);
      setPendingFeatureImageId(publicId || "");
      setMessage("");
    } catch (error) {
      setMessage(error.message || "Feature image upload failed.");
    } finally {
      setUploadingFeatureImage(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      if (!existingSlugSnap.empty) {
        setMessage("Ye slug already use me hai. Dusra slug do.");
        return;
      }

      await addDoc(collection(db, "blogs"), {
        title: title.trim(),
        category: category.trim(),
        slug: finalSlug,
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        focusKeyword: focusKeyword.trim(),
        featureImage: featureImage.trim(),
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setTitle("");
      setCategory("");
      setSlug("");
      setSlugTouched(false);
      setMetaTitle("");
      setMetaDescription("");
      setFocusKeyword("");
      setFeatureImage("");
      setPendingFeatureImageId("");
      pendingContentImageIdsRef.current.clear();
      setContent("");
      setMessage("Blog add ho gaya.");
    } catch {
      setMessage("Blog save nahi hua. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = async () => {
    const pendingImageIds = [
      pendingFeatureImageId,
      ...pendingContentImageIdsRef.current,
    ].filter(Boolean);
    await deleteCloudinaryImages(pendingImageIds).catch(() => {});
    router.push("/admin/dashboard");
  };

  if (isChecking) {
    return null;
  }

  return (
    <section className="min-h-[70vh] bg-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-black mb-8">Add Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2 text-black">
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                const nextTitle = e.target.value;
                setTitle(nextTitle);

                if (!slugTouched) {
                  setSlug(normalizeSlug(nextTitle));
                }
              }}
              placeholder="Enter blog title"
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
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(normalizeSlug(e.target.value));
              }}
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
                placeholder="Write your blog content..."
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
              {saving ? "Saving..." : "Save Blog"}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="!bg-gray-200 !text-black !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
