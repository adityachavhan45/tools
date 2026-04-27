"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "../../lib/firebase/firebaseConfig";
import {
  getValidatedPremiumFromStorage,
} from "../../lib/humanizerPlans";
import { getValidatedAtsPremiumFromStorage } from "../../lib/atsPlans";
import { getValidatedSeoAuditPremiumFromStorage } from "../../lib/seoAuditPlans";

const SUBSCRIPTION_SOURCES = [
  {
    id: "ai-humanizer",
    title: "AI Humanizer",
    collectionName: "humanizer_subscriptions",
    getLocalPremium: getValidatedPremiumFromStorage,
  },
  {
    id: "ats-resume-checker",
    title: "ATS Resume Checker",
    collectionName: "ats_subscriptions",
    getLocalPremium: getValidatedAtsPremiumFromStorage,
  },
  {
    id: "seo-audit-checker",
    title: "SEO Audit Checker",
    collectionName: "seo_audit_subscriptions",
    getLocalPremium: getValidatedSeoAuditPremiumFromStorage,
  },
];

function parseCreatedAt(value) {
  const dateFromToDate = value?.toDate?.();
  if (dateFromToDate instanceof Date) return dateFromToDate;

  if (typeof value?.seconds === "number") {
    return new Date(value.seconds * 1000);
  }

  if (typeof value === "number") {
    return new Date(value);
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return null;
}

function toSubscriptionItem(source, data) {
  const expiresAt = Number(data?.expiresAt || 0);
  const createdAt = parseCreatedAt(data?.createdAt);

  return {
    id: source.id,
    productName: source.title,
    planName: data?.subscriptionName || data?.planName || "Premium Plan",
    expiresAt,
    createdAt,
    status: expiresAt * 1000 > Date.now() ? "Active" : "Expired",
  };
}

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setSubscriptions([]);
      return;
    }

    async function fetchSubscriptions() {
      setIsLoadingSubscriptions(true);

      try {
        const results = await Promise.all(
          SUBSCRIPTION_SOURCES.map(async (source) => {
            const snapshot = await getDocs(
              query(
                collection(db, source.collectionName),
                where("uid", "==", currentUser.uid),
                limit(25)
              )
            );

            if (snapshot.empty) {
              return null;
            }

            const docs = snapshot.docs
              .map((item) => toSubscriptionItem(source, item.data()))
              .sort((a, b) => {
                const timeA = a.createdAt ? a.createdAt.getTime() : 0;
                const timeB = b.createdAt ? b.createdAt.getTime() : 0;
                return timeB - timeA;
              });

            return docs[0] || null;
          })
        );

        const firestoreSubscriptions = results.filter(Boolean);
        const localFallbacks = SUBSCRIPTION_SOURCES.map((source) => {
          const localPremium = source.getLocalPremium(currentUser);
          if (!localPremium) {
            return null;
          }

          return {
            id: source.id,
            productName: source.title,
            planName: localPremium.planName || "Premium Plan",
            expiresAt: Number(localPremium.expiresAt || 0),
            createdAt: null,
            status:
              Number(localPremium.expiresAt || 0) * 1000 > Date.now()
                ? "Active"
                : "Expired",
          };
        }).filter(Boolean);

        const mergedMap = new Map();

        [...firestoreSubscriptions, ...localFallbacks].forEach((item) => {
          if (!item) return;

          const existing = mergedMap.get(item.id);
          const existingExpiresAt = Number(existing?.expiresAt || 0);
          const nextExpiresAt = Number(item.expiresAt || 0);

          if (!existing || nextExpiresAt >= existingExpiresAt) {
            mergedMap.set(item.id, item);
          }
        });

        const merged = Array.from(mergedMap.values()).sort(
          (a, b) => Number(b.expiresAt || 0) - Number(a.expiresAt || 0)
        );

        setSubscriptions(merged);
      } catch {
        const localOnly = SUBSCRIPTION_SOURCES.map((source) => {
          const localPremium = source.getLocalPremium(currentUser);
          if (!localPremium) {
            return null;
          }
          return {
            id: source.id,
            productName: source.title,
            planName: localPremium.planName || "Premium Plan",
            expiresAt: Number(localPremium.expiresAt || 0),
            createdAt: null,
            status:
              Number(localPremium.expiresAt || 0) * 1000 > Date.now()
                ? "Active"
                : "Expired",
          };
        }).filter(Boolean);

        setSubscriptions(localOnly);
      } finally {
        setIsLoadingSubscriptions(false);
      }
    }

    fetchSubscriptions();
  }, [currentUser]);

  const activeSubscriptions = useMemo(
    () => subscriptions.filter((item) => item.status === "Active"),
    [subscriptions]
  );

  if (authLoading) {
    return (
      <section className="min-h-[70vh] bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-gray-600">Checking profile...</p>
        </div>
      </section>
    );
  }

  if (!currentUser) {
    return (
      <section className="min-h-[70vh] bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-3 text-gray-600">
            Please login first to view your profile and premium subscriptions.
          </p>
          <Link
            href="/login?redirect=/profile"
            className="mt-6 inline-flex items-center rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Login to continue
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-sm text-gray-600">Account and premium access details.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                Name
              </p>
              <p className="mt-2 text-base font-semibold text-gray-900">
                {currentUser.displayName || "Not set"}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                Email
              </p>
              <p className="mt-2 break-all text-base font-semibold text-gray-900">
                {currentUser.email || "Not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Premium Plans</h2>
              <p className="text-sm text-gray-600">
                {activeSubscriptions.length > 0
                  ? `You have ${activeSubscriptions.length} active premium plan${
                      activeSubscriptions.length > 1 ? "s" : ""
                    }.`
                  : "No active premium plan on your account."}
              </p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                activeSubscriptions.length > 0
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {activeSubscriptions.length > 0 ? "Premium User" : "Free User"}
            </span>
          </div>

          {isLoadingSubscriptions ? (
            <p className="mt-5 text-sm text-gray-600">Loading subscriptions...</p>
          ) : null}

          {!isLoadingSubscriptions && subscriptions.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              Premium status not found yet. Buy a plan from any premium tool and it will appear
              here automatically.
            </div>
          ) : null}

          {!isLoadingSubscriptions && subscriptions.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {subscriptions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-gray-900">{item.productName}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-700">{item.planName}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Valid till{" "}
                    {item.expiresAt
                      ? new Date(item.expiresAt * 1000).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
