"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

const ADMIN_AUTH_KEY = "admin_logged_in";
const SUBSCRIPTION_SOURCES = [
  {
    collectionName: "humanizer_subscriptions",
    toolName: "AI Humanizer",
  },
  {
    collectionName: "ats_subscriptions",
    toolName: "ATS-Friendly Resume Checker",
  },
  {
    collectionName: "seo_audit_subscriptions",
    toolName: "SEO Audit Checker",
  },
];

function parseFirestoreDate(value) {
  const dateFromToDate = value?.toDate?.();
  if (dateFromToDate instanceof Date) return dateFromToDate;

  if (typeof value?.seconds === "number") {
    return new Date(value.seconds * 1000);
  }

  return null;
}

export default function AdminSubscriptionsPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState("");

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

    const fetchSubscriptions = async () => {
      setLoadingSubscriptions(true);
      setSubscriptionError("");

      try {
        const snapshots = await Promise.all(
          SUBSCRIPTION_SOURCES.map((source) =>
            getDocs(
              query(
                collection(db, source.collectionName),
                orderBy("createdAt", "desc")
              )
            )
          )
        );

        const subscriptionItems = snapshots.flatMap((snapshot, sourceIndex) => {
          const source = SUBSCRIPTION_SOURCES[sourceIndex];

          return snapshot.docs.map((subscriptionDoc) => {
            const data = subscriptionDoc.data();
            const expiresAt = Number(data.expiresAt || 0);
            const createdAt = parseFirestoreDate(data.createdAt);
            const formattedCreatedAt = createdAt ? createdAt.toLocaleString() : "N/A";
            const formattedExpiresAt = expiresAt
              ? new Date(expiresAt * 1000).toLocaleString()
              : "N/A";

            return {
              id: `${source.collectionName}-${subscriptionDoc.id}`,
              toolName: source.toolName,
              name: data.name || "Guest User",
              email: data.email || "",
              subscriptionName: data.subscriptionName || data.planName || "Premium",
              formattedCreatedAt,
              formattedExpiresAt,
              createdAtTs: createdAt ? createdAt.getTime() : 0,
              status: expiresAt * 1000 > Date.now() ? "Active" : "Expired",
            };
          });
        });

        const sortedItems = subscriptionItems.sort(
          (a, b) => Number(b.createdAtTs || 0) - Number(a.createdAtTs || 0)
        );

        setSubscriptions(sortedItems);
      } catch {
        setSubscriptionError("Subscription list load nahi ho paayi.");
      } finally {
        setLoadingSubscriptions(false);
      }
    };

    fetchSubscriptions();
  }, [isChecking]);

  if (isChecking) {
    return null;
  }

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-black">Subscriptions</h1>
            <p className="text-gray-600 mt-2">Paid users ka record yahan dikhega.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="!bg-white !text-black !border !border-black !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
            >
              Back to Dashboard
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/add-blog")}
              className="!bg-black !text-white !rounded-xl !shadow-none !py-2 !px-4 !text-sm !font-medium"
            >
              Add Blog
            </button>
          </div>
        </div>

        {loadingSubscriptions ? <p className="text-gray-700">Loading subscriptions...</p> : null}
        {subscriptionError ? <p className="text-red-600">{subscriptionError}</p> : null}

        {!loadingSubscriptions && !subscriptionError && subscriptions.length === 0 ? (
          <p className="text-gray-700">No subscriptions found.</p>
        ) : null}

        {!loadingSubscriptions && !subscriptionError && subscriptions.length > 0 ? (
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full bg-white text-black">
              <colgroup>
                <col className="w-12" />
                <col />
                <col className="w-64" />
                <col className="w-56" />
                <col className="w-56" />
                <col className="w-40" />
                <col className="w-48" />
                <col className="w-44" />
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-3 text-sm font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Email</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Tool</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Subscription</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold whitespace-nowrap">
                    Purchased At
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold whitespace-nowrap">
                    Expires At
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription, index) => (
                  <tr key={subscription.id} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{subscription.name}</td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">{subscription.email || "N/A"}</td>
                    <td className="px-4 py-3 text-sm">{subscription.toolName}</td>
                    <td className="px-4 py-3 text-sm">{subscription.subscriptionName}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          subscription.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {subscription.formattedCreatedAt}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {subscription.formattedExpiresAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}
