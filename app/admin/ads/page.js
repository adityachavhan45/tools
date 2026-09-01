"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImageClient";
import {
  deleteCloudinaryImages,
  extractCloudinaryPublicId,
} from "@/lib/cloudinary/publicId";

const ADMIN_AUTH_KEY = "admin_logged_in";
const MAX_CONTENT_LENGTH = 180;
const PLACEMENT_OPTIONS = [
  { value: "top", label: "Top" },
  { value: "center", label: "Center" },
  { value: "bottom", label: "Bottom" },
];
const PLACEMENT_LIMITS = { top: 1, center: 2, bottom: 1 };

function getPlacementLabel(value) {
  return PLACEMENT_OPTIONS.find((option) => option.value === value)?.label || "Auto";
}

function normalizeExternalLink(value) {
  const trimmedValue = value.trim();
  const withProtocol = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;
  const parsedUrl = new URL(withProtocol);

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error("Please enter a valid website link.");
  }

  return parsedUrl.toString();
}

function formatFirestoreDate(value) {
  const date = value?.toDate?.();
  return date instanceof Date ? date.toLocaleString() : "Just now";
}

export default function AdminAdsPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [selectedAdId, setSelectedAdId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [placement, setPlacement] = useState("");
  const [image, setImage] = useState("");
  const [pendingImageId, setPendingImageId] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingAdId, setDeletingAdId] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(ADMIN_AUTH_KEY) === "true";

    if (!isLoggedIn) {
      router.replace("/admin");
      return;
    }

    setIsChecking(false);
  }, [router]);

  useEffect(() => {
    if (isChecking) return;

    const fetchAds = async () => {
      setLoadingAds(true);
      setMessage("");

      try {
        const snapshot = await getDocs(
          query(collection(db, "ads"), orderBy("createdAt", "desc"))
        );
        const items = snapshot.docs.map((adDoc) => {
          const data = adDoc.data();
          return {
            id: adDoc.id,
            name: data.name || "Untitled Ad",
            content: data.content || "",
            link: data.link || "",
            image: data.image || "",
            placement: data.placement || "",
            createdAt: formatFirestoreDate(data.createdAt),
          };
        });

        setAds(items);
      } catch {
        setIsError(true);
        setMessage("Ads list load nahi ho paayi.");
      } finally {
        setLoadingAds(false);
      }
    };

    fetchAds();
  }, [isChecking]);

  const clearForm = () => {
    setSelectedAdId("");
    setName("");
    setContent("");
    setLink("");
    setPlacement("");
    setImage("");
    setPendingImageId("");
  };

  const cleanupPendingImage = async () => {
    if (!pendingImageId) return;
    await deleteCloudinaryImages([pendingImageId]).catch(() => {});
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setIsError(false);
    setMessage("Uploading ad image...");

    try {
      const uploadedImage = await uploadImageToCloudinary(file, "convertixy/ads");

      if (pendingImageId && pendingImageId !== uploadedImage.publicId) {
        await deleteCloudinaryImages([pendingImageId]).catch(() => {});
      }

      setImage(uploadedImage.url);
      setPendingImageId(uploadedImage.publicId || "");
      setMessage("");
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Ad image upload nahi hui.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);

    if (!name.trim() || !content.trim() || !link.trim() || !image || !placement) {
      setIsError(true);
      setMessage("Ad name, image, content, link aur placement sab required hain.");
      return;
    }

    const adsAtPlacement = ads.filter(
      (ad) => ad.id !== selectedAdId && ad.placement === placement
    ).length;

    if (adsAtPlacement >= PLACEMENT_LIMITS[placement]) {
      setIsError(true);
      setMessage(
        placement === "center"
          ? "Center me maximum 2 ads rakh sakte hain. Pehle existing center ad edit ya delete karein."
          : `${getPlacementLabel(placement)} position par already ek ad hai. Pehle usse edit ya delete karein.`
      );
      return;
    }

    let finalLink;
    try {
      finalLink = normalizeExternalLink(link);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const adData = {
        name: name.trim(),
        content: content.trim(),
        link: finalLink,
        image,
        placement,
        updatedAt: serverTimestamp(),
      };

      if (selectedAdId) {
        const previousAd = ads.find((ad) => ad.id === selectedAdId);
        await updateDoc(doc(db, "ads", selectedAdId), adData);

        setAds((currentAds) =>
          currentAds.map((ad) =>
            ad.id === selectedAdId ? { ...ad, ...adData, updatedAt: undefined } : ad
          )
        );
        setPendingImageId("");

        if (previousAd?.image && previousAd.image !== image) {
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
          const oldImageId = extractCloudinaryPublicId(previousAd.image, cloudName);
          if (oldImageId) await deleteCloudinaryImages([oldImageId]).catch(() => {});
        }

        clearForm();
        setMessage("Ad update ho gaya.");
      } else {
        const adRef = await addDoc(collection(db, "ads"), {
          ...adData,
          createdAt: serverTimestamp(),
        });

        setAds((currentAds) => [
          {
            id: adRef.id,
            name: adData.name,
            content: adData.content,
            link: adData.link,
            image: adData.image,
            placement: adData.placement,
            createdAt: "Just now",
          },
          ...currentAds,
        ]);
        setPendingImageId("");
        clearForm();
        setMessage("Ad add ho gaya.");
      }
    } catch {
      setIsError(true);
      setMessage(selectedAdId ? "Ad update nahi hua." : "Ad save nahi hua.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (ad) => {
    await cleanupPendingImage();
    setSelectedAdId(ad.id);
    setName(ad.name);
    setContent(ad.content);
    setLink(ad.link);
    setPlacement(ad.placement || "");
    setImage(ad.image);
    setPendingImageId("");
    setIsError(false);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = async () => {
    await cleanupPendingImage();
    clearForm();
    setIsError(false);
    setMessage("");
  };

  const handleDelete = async (ad) => {
    if (!window.confirm(`Delete "${ad.name}"?`)) return;

    setDeletingAdId(ad.id);
    setIsError(false);
    setMessage("");

    try {
      await deleteDoc(doc(db, "ads", ad.id));
      setAds((currentAds) => currentAds.filter((item) => item.id !== ad.id));

      if (selectedAdId === ad.id) {
        await cleanupPendingImage();
        clearForm();
      }

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
      const imageId = extractCloudinaryPublicId(ad.image, cloudName);

      try {
        if (imageId) await deleteCloudinaryImages([imageId]);
        setMessage("Ad delete ho gaya.");
      } catch {
        setIsError(true);
        setMessage("Ad delete ho gaya, par image cleanup nahi hui.");
      }
    } catch {
      setIsError(true);
      setMessage("Ad delete nahi hua.");
    } finally {
      setDeletingAdId("");
    }
  };

  if (isChecking) return null;

  return (
    <section className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Content management
            </p>
            <h1 className="!text-3xl font-semibold tracking-tight !text-slate-950">Ads</h1>
            <p className="mt-2 max-w-2xl !text-sm !text-slate-600">
              Har ad ka Top, Center ya Bottom placement yahin se control karein.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="!rounded-xl !border !border-slate-300 !bg-white !px-4 !py-2.5 !text-sm !font-semibold !text-slate-800 !shadow-sm"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
            <div className="mb-6">
              <h2 className="!text-lg font-semibold !text-slate-950">
                {selectedAdId ? "Update ad" : "Add a new ad"}
              </h2>
              <p className="mt-1 !text-sm !text-slate-500">
                Image aur text dono par poora ad link clickable hoga.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="ad-name" className="mb-2 block text-sm font-medium !text-slate-800">
                  Ad name
                </label>
                <input
                  id="ad-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  placeholder="Example: Summer offer"
                  className="w-full !bg-white !text-slate-950 placeholder:!text-slate-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="ad-image" className="mb-2 block text-sm font-medium !text-slate-800">
                  Ad image
                </label>
                <input
                  id="ad-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploadingImage}
                  className="w-full !px-3 !text-sm !text-slate-700"
                />
                {uploadingImage ? <p className="mt-2 !text-xs !text-slate-500">Uploading image...</p> : null}
                {image ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={image} alt="Ad preview" className="aspect-[16/9] w-full bg-white object-contain" />
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="ad-placement" className="mb-2 block text-sm font-medium !text-slate-800">
                  Show ad at
                </label>
                <select
                  id="ad-placement"
                  value={placement}
                  onChange={(event) => setPlacement(event.target.value)}
                  className="w-full !bg-white !text-slate-950"
                  required
                >
                  <option value="" disabled>Select placement</option>
                  {PLACEMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}{option.value === "center" ? " (maximum 2 ads)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label htmlFor="ad-content" className="block text-sm font-medium !text-slate-800">
                    Short content
                  </label>
                  <span className="text-xs text-slate-400">
                    {content.length}/{MAX_CONTENT_LENGTH}
                  </span>
                </div>
                <textarea
                  id="ad-content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  maxLength={MAX_CONTENT_LENGTH}
                  rows={3}
                  placeholder="Ad ke baare mein 1–2 lines likhein"
                  className="w-full resize-none !bg-white !text-slate-950 placeholder:!text-slate-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="ad-link" className="mb-2 block text-sm font-medium !text-slate-800">
                  Destination link
                </label>
                <input
                  id="ad-link"
                  type="text"
                  inputMode="url"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  placeholder="https://example.com/offer"
                  className="w-full !bg-white !text-slate-950 placeholder:!text-slate-400"
                  required
                />
              </div>

              {message ? (
                <p
                  role="status"
                  className={`rounded-xl px-3 py-2.5 !text-sm ${
                    isError ? "bg-red-50 !text-red-700" : "bg-emerald-50 !text-emerald-700"
                  }`}
                >
                  {message}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="!rounded-xl !bg-slate-950 !px-5 !py-2.5 !text-sm !font-semibold !text-white !shadow-none"
                >
                  {saving ? "Saving..." : selectedAdId ? "Update Ad" : "Add Ad"}
                </button>
                {selectedAdId ? (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="!rounded-xl !border !border-slate-300 !bg-white !px-5 !py-2.5 !text-sm !font-semibold !text-slate-700 !shadow-none"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="!text-lg font-semibold !text-slate-950">All ads</h2>
                <p className="mt-0.5 !text-xs !text-slate-500">Selected position ke according ads public pages par dikhte hain.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {ads.length} total
              </span>
            </div>

            {loadingAds ? <p className="p-6 !text-sm !text-slate-600">Loading ads...</p> : null}

            {!loadingAds && ads.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="!text-sm font-medium !text-slate-700">Abhi koi ad add nahi hai.</p>
                <p className="mt-1 !text-xs !text-slate-500">Pehla ad left-side form se add karein.</p>
              </div>
            ) : null}

            {!loadingAds && ads.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {ads.map((ad) => (
                  <article key={ad.id} className="grid gap-4 p-5 sm:grid-cols-[144px_minmax(0,1fr)_auto] sm:items-center sm:px-6">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img src={ad.image} alt="" className="aspect-[16/9] w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate !text-sm font-semibold !text-slate-950">{ad.name}</h3>
                        <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                          {getPlacementLabel(ad.placement)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 !text-sm !text-slate-600">{ad.content}</p>
                      <a
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 block truncate text-xs font-medium text-blue-700 hover:underline"
                      >
                        {ad.link}
                      </a>
                      <p className="mt-1 !text-[11px] !text-slate-400">Added {ad.createdAt}</p>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <button
                        type="button"
                        onClick={() => handleEdit(ad)}
                        disabled={Boolean(deletingAdId)}
                        className="!rounded-lg !border !border-slate-300 !bg-white !px-3 !py-1.5 !text-xs !font-semibold !text-slate-700 !shadow-none"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(ad)}
                        disabled={Boolean(deletingAdId)}
                        className="!rounded-lg !bg-red-600 !px-3 !py-1.5 !text-xs !font-semibold !text-white !shadow-none"
                      >
                        {deletingAdId === ad.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
