"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

const MAX_ADS_PER_PAGE = 4;
const SLOT_ATTRIBUTE = "data-convertixy-ad-slot";

function isSafeLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function arrangeAdsByPlacement(items) {
  const placedAds = { top: [], center: [], bottom: [] };
  const unassignedAds = [];
  const limits = { top: 1, center: 2, bottom: 1 };

  items.forEach((ad) => {
    if (Object.hasOwn(limits, ad.placement)) {
      if (placedAds[ad.placement].length < limits[ad.placement]) {
        placedAds[ad.placement].push({ ...ad, displayPlacement: ad.placement });
      }
      return;
    }

    unassignedAds.push(ad);
  });

  ["top", "center", "center", "bottom"].forEach((placement) => {
    if (placedAds[placement].length >= limits[placement] || unassignedAds.length === 0) return;
    const ad = unassignedAds.shift();
    placedAds[placement].push({ ...ad, displayPlacement: placement });
  });

  return [placedAds.top[0], ...placedAds.center, placedAds.bottom[0]]
    .filter(Boolean)
    .slice(0, MAX_ADS_PER_PAGE);
}

function getElementDepth(element, root) {
  let depth = 0;
  let current = element;

  while (current && current !== root) {
    depth += 1;
    current = current.parentElement;
  }

  return depth;
}

function findPlacementTargets(root, placementCount) {
  const rootRect = root.getBoundingClientRect();
  const rootTop = rootRect.top + window.scrollY;
  const contentHeight = Math.max(root.scrollHeight, rootRect.height);
  const minimumWidth = Math.min(320, rootRect.width * 0.45);
  const structuralElements = Array.from(root.querySelectorAll("section, article"));
  const supportingElements = Array.from(root.querySelectorAll("div"));
  const candidates = [...new Set([...structuralElements, ...supportingElements])]
    .filter((element) => {
      if (!element.isConnected || element.hasAttribute(SLOT_ATTRIBUTE)) return false;
      if (element.closest("a, button, label, details, form")) return false;

      const rect = element.getBoundingClientRect();
      const textLength = element.textContent?.trim().length || 0;
      const bottom = rect.bottom + window.scrollY;

      return (
        rect.height >= 80 &&
        rect.width >= minimumWidth &&
        textLength >= 20 &&
        bottom > rootTop + 140 &&
        bottom < rootTop + contentHeight - 40
      );
    })
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        bottom: rect.bottom + window.scrollY,
        depth: getElementDepth(element, root),
      };
    });

  const selected = [];
  const usedElements = new Set();
  const minimumSpacing = Math.min(
    420,
    Math.max(160, (contentHeight / (placementCount + 1)) * 0.4)
  );

  for (let index = 0; index < placementCount; index += 1) {
    const desiredPosition = rootTop + contentHeight * ((index + 1) / (placementCount + 1));
    const unusedCandidates = candidates.filter(
      (candidate) => !usedElements.has(candidate.element)
    );
    const spacedCandidates = unusedCandidates.filter(
        (candidate) =>
          selected.every(
            (selectedCandidate) =>
              Math.abs(selectedCandidate.bottom - candidate.bottom) >= minimumSpacing
          )
      );
    const bestCandidate = (spacedCandidates.length > 0 ? spacedCandidates : unusedCandidates)
      .sort((first, second) => {
        const firstScore = Math.abs(first.bottom - desiredPosition) + first.depth * 24;
        const secondScore = Math.abs(second.bottom - desiredPosition) + second.depth * 24;
        return firstScore - secondScore;
      })[0];

    if (!bestCandidate) break;
    usedElements.add(bestCandidate.element);
    selected.push(bestCandidate);
  }

  return selected.sort((first, second) => first.bottom - second.bottom);
}

function InlineAd({ ad }) {
  return (
    <aside aria-label="Sponsored link" className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
      <a
        href={ad.link}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group relative flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 sm:flex-row sm:items-center"
        aria-label={`${ad.name || "Sponsored link"}: ${ad.content}`}
      >
        <div className="aspect-video w-full shrink-0 overflow-hidden bg-white sm:w-60 md:w-72">
          <img
            src={ad.image}
            alt={ad.name || "Sponsored content"}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 pr-10 sm:px-6 sm:py-5 sm:pr-12">
          <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Ad · Sponsored
          </span>
          {ad.name ? (
            <h2 className="break-words !text-sm font-semibold leading-5 !text-slate-950 sm:!text-base">
              {ad.name}
            </h2>
          ) : null}
          <p className={`${ad.name ? "mt-1" : ""} break-words !text-xs leading-5 !text-slate-600 sm:!text-sm`}>
            {ad.content}
          </p>
        </div>
      </a>
    </aside>
  );
}

export default function AdsSection() {
  const pathname = usePathname();
  const [ads, setAds] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setAds([]);
      return;
    }

    let isMounted = true;

    const fetchAds = async () => {
      try {
        const adsQuery = query(
          collection(db, "ads"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(adsQuery);
        const validItems = snapshot.docs
          .map((adDoc) => ({ id: adDoc.id, ...adDoc.data() }))
          .filter((ad) => ad.image && ad.content && isSafeLink(ad.link));
        const items = arrangeAdsByPlacement(validItems);

        if (isMounted) setAds(items);
      } catch {
        if (isMounted) setAds([]);
      }
    };

    fetchAds();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    document.querySelectorAll(`[${SLOT_ATTRIBUTE}]`).forEach((slot) => slot.remove());
    setSlots([]);

    if (pathname.startsWith("/admin") || ads.length === 0) return undefined;

    let cancelled = false;
    let secondFrame;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;

        const pageRoot = document.querySelector("main[data-page-content]");
        if (!pageRoot) return;

        const topAd = ads.find((ad) => ad.displayPlacement === "top");
        const middleAds = ads.filter((ad) => ad.displayPlacement === "center");
        const bottomAd = ads.find((ad) => ad.displayPlacement === "bottom");
        const middleTargets = findPlacementTargets(pageRoot, middleAds.length);
        const nextSlots = [];

        const createSlot = (position, index) => {
          const slot = document.createElement("div");
          slot.setAttribute(SLOT_ATTRIBUTE, `${position}-${index}`);
          slot.className = "col-span-full w-full bg-white";
          slot.style.gridColumn = "1 / -1";
          slot.style.flex = "0 0 100%";
          return slot;
        };

        if (topAd) {
          const topSlot = createSlot("top", 0);
          pageRoot.insertBefore(topSlot, pageRoot.firstChild);
          nextSlots.push({ element: topSlot, ad: topAd });
        }

        middleTargets.forEach((target, index) => {
          const middleSlot = createSlot("middle", index);
          target.element.insertAdjacentElement("afterend", middleSlot);
          nextSlots.push({ element: middleSlot, ad: middleAds[index] });
        });

        if (bottomAd) {
          const bottomSlot = createSlot("bottom", ads.length - 1);
          pageRoot.appendChild(bottomSlot);
          nextSlots.push({ element: bottomSlot, ad: bottomAd });
        }

        if (!cancelled) setSlots(nextSlots);
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      document.querySelectorAll(`[${SLOT_ATTRIBUTE}]`).forEach((slot) => slot.remove());
    };
  }, [ads, pathname]);

  if (pathname.startsWith("/admin")) return null;

  return slots.map(({ element, ad }) =>
    createPortal(<InlineAd key={ad.id} ad={ad} />, element, ad.id)
  );
}
