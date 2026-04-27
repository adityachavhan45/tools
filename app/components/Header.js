"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../lib/firebase/firebaseConfig";
import { sections as toolSections } from "../data/tools";
import {
  getValidatedPremiumFromStorage,
} from "../../lib/humanizerPlans";
import { collection, getDocs, limit, orderBy, query as firestoreQuery } from "firebase/firestore";

function SearchBox({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const allTools = useMemo(() => {
    return toolSections.flatMap((section) =>
      section.links.map((tool) => ({
        ...tool,
        sectionKey: section.key,
      }))
    );
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsQuery = firestoreQuery(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const snapshot = await getDocs(blogsQuery);
        const items = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            href: `/blog/${data.slug || doc.id}`,
            label: data.title || "Untitled Blog",
            desc: data.excerpt || "",
            sectionKey: "blog",
          };
        });
        setBlogs(items);
      } catch {
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const combined = [...allTools, ...blogs];
    if (!q) return combined.slice(0, 10);
    return combined
      .filter((tool) =>
        [tool.label, tool.desc, tool.sectionKey]
          .filter(Boolean)
          .some((val) => val.toLowerCase().includes(q))
      )
      .slice(0, 10);
  }, [allTools, blogs, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filtered.length > 0) {
      onNavigate(filtered[0].href);
    }
  };

  return (
    <div className="relative w-full flex-1 min-w-0 max-w-full md:min-w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 120)}
          placeholder="Search Something..."
          className="w-full rounded-xl border border-white/30 bg-black/20 px-3 py-2 pr-16 text-sm text-white placeholder:text-white/70 focus:border-blue-300 focus:outline-none"
          aria-label="Search tools"
          autoComplete="off"
          inputMode="search"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white/80 hover:bg-white/25"
            aria-label="Clear search"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        ) : null}
        <svg
          className="absolute right-3 h-4 w-4 text-white/80 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </form>

      {isFocused && filtered.length > 0 && (
        <div className="absolute left-0 right-0 mt-3 rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-2xl shadow-blue-500/10 overflow-hidden">
          <ul className="divide-y divide-gray-100 text-sm">
            {filtered.map((tool) => (
              <li key={tool.href}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onNavigate(tool.href)}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition"
                >
                  <span className="mt-0.5 rounded-lg bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-700">
                    {tool.sectionKey?.toUpperCase() || "TOOL"}
                  </span>
                  <div>
                    <div className="font-semibold">{tool.label}</div>
                    {tool.desc ? (
                      <div className="text-xs text-gray-600 line-clamp-2">{tool.desc}</div>
                    ) : null}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isFocused && filtered.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-2xl">
          No matching tools yet.
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const premiumToolsLabel = "Premium Tools";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [premiumPlan, setPremiumPlan] = useState(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setProfileMenuOpen(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setPremiumPlan(getValidatedPremiumFromStorage(user));

    const intervalId = window.setInterval(() => {
      setPremiumPlan(getValidatedPremiumFromStorage(user));
    }, 60 * 1000);

    const handleStorage = () => {
      setPremiumPlan(getValidatedPremiumFromStorage(user));
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("storage", handleStorage);
    };
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      return next;
    });
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavigate = (href) => {
    window.location.href = href;
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const profileLabel = (user?.displayName || user?.email || "P").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-gradient-to-b from-gray-900 to-black text-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight hover:opacity-90 transition-all duration-200 hover:scale-105">
          convertixy
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3 text-sm">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/20 p-2 sm:p-2.5 text-gray-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-3 lg:gap-4 text-sm lg:text-base w-full">
            <Link href="/" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium" onClick={handleNavClick}>
              Home
            </Link>
            <SearchBox onNavigate={handleNavigate} />
            
            {/* navigate */}
            {/* <Link href="/pro-tool" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium" onClick={handleNavClick}>
              <span suppressHydrationWarning>{premiumToolsLabel}</span>
            </Link> */}

            <Link href="/blog" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium" onClick={handleNavClick}>
              Blog
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium" onClick={handleNavClick}>
              Contact
            </Link>
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900 shadow-md transition hover:bg-gray-100"
                  aria-label="Open profile menu"
                  aria-expanded={profileMenuOpen}
                >
                  {profileLabel}
                </button>
                {profileMenuOpen ? (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                    <div className="mb-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                        Subscription
                      </div>
                      <div className="mt-1 text-sm font-bold text-gray-900">
                        {premiumPlan ? premiumPlan.planName : "Free Plan"}
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        {premiumPlan
                          ? `Active until ${new Date(
                              premiumPlan.expiresAt * 1000
                            ).toLocaleDateString()}`
                          : "No active premium access"}
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={handleNavClick}
                      className="mb-1 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link href="/login" className="px-3 py-1.5 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 font-semibold" onClick={handleNavClick}>
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
          <nav className="px-4 sm:px-6 py-4 space-y-4 text-sm">
            <div className="rounded-lg border border-white/10 bg-black/40 p-3">
              <SearchBox onNavigate={handleNavigate} />
            </div>
            <Link
              href="/"
              className="block rounded-lg px-4 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium"
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block rounded-lg px-4 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium"
              onClick={handleNavClick}
            >
              Blog
            </Link>

            {/* premium tools navigate */}
            {/* <Link
              href="/pro-tool"
              className="block rounded-lg px-4 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium"
              onClick={handleNavClick}
            >
              <span suppressHydrationWarning>{premiumToolsLabel}</span>
            </Link> */}
            <Link
              href="/contact"
              className="block rounded-lg px-4 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium"
              onClick={handleNavClick}
            >
              Contact
            </Link>
            {user ? (
              <>
              <Link
                href="/profile"
                className="block rounded-lg px-4 py-2.5 hover:bg-white/10 transition-all duration-200 font-medium"
                onClick={handleNavClick}
              >
                Profile
              </Link>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-left">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Subscription
                </div>
                <div className="mt-1 text-sm font-bold text-white">
                  {premiumPlan ? premiumPlan.planName : "Free Plan"}
                </div>
                <div className="mt-1 text-xs text-gray-300">
                  {premiumPlan
                    ? `Active until ${new Date(
                        premiumPlan.expiresAt * 1000
                      ).toLocaleDateString()}`
                    : "No active premium access"}
                </div>
              </div>
              <button
                type="button"
                className="block w-full rounded-lg bg-white px-3 py-2.5 text-center font-semibold text-red-600 transition-all duration-200 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block rounded-lg bg-white px-3 py-2.5 text-center font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100"
                onClick={handleNavClick}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
