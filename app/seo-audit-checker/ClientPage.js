"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Crown,
  Gauge,
  Globe,
  Lock,
  Loader2,
  LogIn,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildToolJsonLd } from "../../lib/seo";
import { auth, db } from "../../lib/firebase/firebaseConfig";
import {
  SEO_AUDIT_PREMIUM_STORAGE_KEY,
  SEO_AUDIT_PRICING_PLAN,
  getValidatedSeoAuditPremiumFromStorage,
} from "../../lib/seoAuditPlans";

const PREMIUM_DURATION_SECONDS = 60 * 60 * 24 * 30;
const GUEST_USER = {
  uid: "guest",
  email: "",
  displayName: "",
  async getIdToken() {
    return "";
  },
};

function scoreTheme(score) {
  if (score >= 85) {
    return {
      label: "Excellent",
      className: "text-emerald-700",
      ringClass: "stroke-emerald-500",
    };
  }

  if (score >= 70) {
    return {
      label: "Good",
      className: "text-blue-700",
      ringClass: "stroke-blue-500",
    };
  }

  if (score >= 50) {
    return {
      label: "Needs Work",
      className: "text-amber-700",
      ringClass: "stroke-amber-500",
    };
  }

  return {
    label: "Critical",
    className: "text-rose-700",
    ringClass: "stroke-rose-500",
  };
}

function getScoreRing(score) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const normalized = Math.max(0, Math.min(100, Number(score) || 0));
  const offset = circumference - (normalized / 100) * circumference;
  return { radius, circumference, offset };
}

function severityTone(severity) {
  if (severity === "critical") {
    return "bg-rose-50 text-rose-700 border-rose-200";
  }
  if (severity === "high") {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }
  if (severity === "medium") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function prettyCategory(category) {
  if (category === "onpage") return "On-page";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function buildBulletPointsFromParagraphs(paragraphs, limit = 8) {
  return paragraphs
    .flatMap((paragraph) =>
      paragraph
        .split(". ")
        .map((line) => line.trim().replace(/\.$/, ""))
        .filter(Boolean)
    )
    .slice(0, limit);
}

const SEO_AUDIT_LONGFORM_CONTENT = [
  "SEO auditing is the operational discipline of identifying why a website is underperforming in search and translating those findings into prioritized execution. Many teams treat audits as static reports, but effective audits are living systems tied to business outcomes, user behavior, and crawl dynamics. A complete audit does not stop at technical checks or keyword lists. It connects infrastructure health, indexation clarity, content relevance, intent satisfaction, and internal linking architecture to actual traffic and conversion goals. The purpose of this tool is to make that process practical by combining deterministic checks with structured recommendations. Whether you are running a solo blog, SaaS site, agency portfolio, or ecommerce category network, consistent audit cycles help prevent ranking decay, uncover quick wins, and reduce wasted effort on low-impact SEO tasks.",
  "Technical foundations remain the first gate for search visibility because crawlers need stable access before relevance can be evaluated. Core technical audit areas include crawlability, indexability, canonical consistency, renderability, status code hygiene, and performance bottlenecks. If robots directives block key sections, if canonical tags conflict, or if important pages are buried behind weak internal links, search engines may not interpret your site architecture correctly. Performance signals also influence user outcomes; slow pages increase abandonment and reduce engagement depth even when rankings are acceptable. A strong technical audit therefore balances crawler requirements with user experience constraints. The objective is to remove friction from both discovery and consumption. Once technical blockers are resolved, content improvements and authority signals tend to produce better returns because search systems can crawl, understand, and trust the site more efficiently.",
  "On-page optimization is the layer where relevance is communicated explicitly. Title tags, meta descriptions, heading hierarchy, URL clarity, and semantic coverage should align with page intent and user expectations. Many pages fail not because they lack keywords, but because they fail to resolve the specific question implied by the query. Strong on-page work begins with intent mapping: informational, commercial, navigational, or transactional. Then each page is tuned to satisfy one dominant intent while still supporting related sub-intents naturally. Heading structure should guide skimming behavior, and body copy should include concrete answers, examples, and decision-support details. Over-optimization with repetitive exact-match phrases often harms readability and trust. Effective on-page SEO reads naturally for humans while giving clear topical signals to search systems through organized structure, precise language, and contextual depth.",
  "Content quality audits should focus on usefulness, differentiation, and update velocity rather than raw word count alone. Search ecosystems are increasingly crowded with similar summaries, so pages that merely restate common points struggle to sustain visibility. High-performing content typically includes original framing, practical workflows, examples from real scenarios, and clear next-step guidance. During auditing, assess whether each page serves a distinct purpose or cannibalizes another page on the same site. Identify thin pages, outdated claims, and sections that no longer match current search intent. Refreshing content with stronger structure and better evidence often delivers faster gains than publishing large volumes of new low-quality pages. A mature content audit process also tracks internal linking opportunities and conversion pathways, ensuring that traffic growth translates into meaningful business outcomes beyond impressions.",
  "Issue prioritization is where most audits fail operationally. Teams often produce long defect lists without sequencing by impact, effort, and dependency, which leads to delayed execution. A practical model is to classify findings into critical, high, medium, and low severity based on expected effect on crawl access, indexation integrity, user trust, and revenue pathways. Critical items might include accidental noindex directives, broken canonical loops, or major server response errors. High-priority items may include title duplication on key templates, weak internal links to money pages, or unoptimized high-impression content. Medium and low tasks can be scheduled into routine sprint cycles. Prioritization should also consider implementation ownership across engineering, content, and SEO teams. Audit value is realized only when recommendations are converted into accountable tasks with timelines and measurable success metrics.",
  "AI-assisted strategy can accelerate audits when used responsibly. Deterministic checks are excellent for identifying concrete defects, while AI can help synthesize patterns, cluster recurring issues, and suggest sequencing paths based on goals. For example, AI can summarize technical debt themes, propose content restructuring opportunities, and identify messaging gaps in comparison with target intent. However, AI recommendations should be treated as decision support, not automatic truth. Human review is still required for business context, brand positioning, legal constraints, and resource realities. The strongest teams use AI to reduce analysis time and increase strategic clarity, then validate actions through analytics and search console data. This hybrid model improves audit throughput while preserving quality control, enabling faster iterations without sacrificing reliability or accountability.",
  "Measurement closes the audit loop and prevents guesswork. After implementing fixes, monitor ranking movement, indexed page trends, click-through rate changes, engagement behavior, and conversion impact. Not every improvement yields immediate ranking gains, especially in competitive niches, but directional movement in technical health and user interaction often appears first. Build a simple reporting cadence that tracks baseline, changes shipped, and observed outcomes over fixed windows such as two, four, and eight weeks. This allows teams to distinguish between high-leverage actions and low-return activities. Over time, measurement history becomes a strategic asset: you learn what types of changes work best for your site architecture and audience segment. Without measurement, audits become repetitive diagnostics. With measurement, audits become a compounding growth system tied to predictable business improvement.",
  "Common SEO audit mistakes include focusing only on homepage metrics, chasing broad keywords without intent fit, neglecting internal linking depth, and treating every issue as equal priority. Another frequent problem is failing to align audit recommendations with implementation capacity. Even accurate findings lose value if they are too abstract for teams to execute. Recommendations should be specific, scoped, and connected to responsible owners. For content teams, provide clear rewrite objectives and example structure upgrades. For engineering teams, define exact technical changes and expected SEO outcomes. For leadership, summarize impact in business terms such as traffic quality, lead flow, and content ROI. Clear communication across stakeholders is essential because SEO improvements are cross-functional by nature. The best audits are not just technically correct; they are operationally actionable and strategically aligned.",
  "Long-term SEO resilience comes from routine maintenance, not occasional emergency audits. Search landscapes evolve through algorithm shifts, competitive content updates, SERP feature changes, and user behavior trends. Sites that audit regularly can adapt earlier and preserve momentum, while reactive sites often experience sharp visibility drops before action begins. Establish a recurring audit calendar covering technical checks, top landing pages, template performance, and conversion-critical journeys. Pair this with content refresh cycles and internal linking reviews. Over months, this creates compounding gains: better crawl efficiency, stronger topical authority, cleaner architecture, and more reliable traffic quality. This tool is designed to support that operating rhythm by making audits faster, clearer, and easier to prioritize, so teams can spend less time diagnosing and more time shipping meaningful improvements.",
];

const SEO_AUDIT_FAQS = [
  {
    question: "How often should I run an SEO audit?",
    answer:
      "For most active websites, a monthly light audit and a quarterly deep audit is a practical cadence. High-change sites such as ecommerce, news, or SaaS documentation may need more frequent checks. Regular auditing helps catch crawl, indexation, and content quality issues before they impact traffic significantly.",
  },
  {
    question: "What is the difference between technical SEO and on-page SEO?",
    answer:
      "Technical SEO focuses on infrastructure and crawl/index health, including status codes, canonical rules, performance, and site architecture. On-page SEO focuses on page-level relevance such as title tags, headings, topical coverage, and intent satisfaction. Both are essential and work best together.",
  },
  {
    question: "Can I improve rankings without publishing new content?",
    answer:
      "Yes, many sites gain strong results by improving existing pages. Updating outdated content, fixing technical blockers, strengthening internal links, and improving search intent alignment can increase visibility without creating brand-new articles every week.",
  },
  {
    question: "Why do some high-score pages still not rank well?",
    answer:
      "Scores are useful diagnostics but not absolute ranking guarantees. Competition strength, backlink profile, domain trust, content differentiation, and query intent fit also influence rankings. Use audit score as a quality baseline, then optimize strategy based on market context.",
  },
  {
    question: "Should I prioritize Core Web Vitals over content updates?",
    answer:
      "Prioritization depends on severity and business impact. If performance issues are severe enough to hurt usability, fix them quickly. If performance is acceptable but key pages fail intent, content and structure updates may deliver faster gains. Balanced sequencing usually works best.",
  },
  {
    question: "Is AI-generated SEO strategy reliable enough to implement directly?",
    answer:
      "AI strategy is best used as decision support. It can accelerate analysis and prioritization, but recommendations should be validated against analytics, search console data, and business constraints. Human review remains important for accuracy and implementation fit.",
  },
  {
    question: "How do I measure whether audit fixes are working?",
    answer:
      "Track baseline and post-change metrics such as indexed pages, keyword positions, click-through rate, organic sessions, engagement quality, and conversion performance. Review changes across 2-8 week windows and tie outcomes to specific fixes for clearer attribution.",
  },
  {
    question: "Can small websites benefit from SEO audits too?",
    answer:
      "Absolutely. Smaller sites often gain faster from audits because issue scope is manageable and fixes can be implemented quickly. Even basic improvements in crawlability, content clarity, and internal linking can create meaningful traffic growth over time.",
  },
];

const SEO_AUDIT_GUIDE_SECTIONS = [
  {
    title: "1. SEO Audit Purpose And Growth Model",
    from: 0,
    to: 1,
    highlights: [
      "Audits should be continuous growth workflows, not one-time reports.",
      "Technical stability is the first condition for search visibility.",
      "Remove crawl and performance friction before scaling content.",
    ],
  },
  {
    title: "2. On-Page Relevance And Content Quality",
    from: 2,
    to: 3,
    highlights: [
      "Map each page to one primary search intent.",
      "Content quality is usefulness and differentiation, not just length.",
      "Fix cannibalization and outdated sections regularly.",
    ],
  },
  {
    title: "3. Prioritization And Execution Planning",
    from: 4,
    to: 5,
    highlights: [
      "Classify issues by impact, effort, and dependency.",
      "AI helps summarize patterns but requires human validation.",
      "Assign clear owners across engineering, content, and SEO.",
    ],
  },
  {
    title: "4. Measurement And Iterative Optimization",
    from: 6,
    to: 7,
    highlights: [
      "Track baseline and post-fix performance windows.",
      "Tie changes to CTR, indexation, engagement, and conversions.",
      "Operational clarity is as important as technical correctness.",
    ],
  },
  {
    title: "5. Building Long-Term SEO Resilience",
    from: 8,
    to: 8,
    highlights: [
      "Routine audits prevent sudden ranking decay.",
      "Combine maintenance, refresh cycles, and internal linking reviews.",
      "Consistency compounds into stronger organic growth.",
    ],
  },
];

export default function ClientPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [includeAi, setIncludeAi] = useState(true);
  const [error, setError] = useState("");
  const [limitNotice, setLimitNotice] = useState("");
  const [paymentNotice, setPaymentNotice] = useState("");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(GUEST_USER);
  const [activePremiumPlan, setActivePremiumPlan] = useState(null);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [usage, setUsage] = useState({ used: 0, limit: 1, remaining: 1 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || GUEST_USER);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setActivePremiumPlan(getValidatedSeoAuditPremiumFromStorage(currentUser));

    const intervalId = window.setInterval(() => {
      setActivePremiumPlan(getValidatedSeoAuditPremiumFromStorage(currentUser));
    }, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || currentUser.uid === GUEST_USER.uid) {
      return;
    }

    let isCancelled = false;

    async function syncPremiumFromDb() {
      try {
        const snapshot = await getDocs(
          query(
            collection(db, "seo_audit_subscriptions"),
            where("uid", "==", currentUser.uid),
            limit(25)
          )
        );

        if (snapshot.empty || isCancelled) {
          return;
        }

        const now = Math.floor(Date.now() / 1000);
        let latest = null;

        snapshot.docs.forEach((subscriptionDoc) => {
          const data = subscriptionDoc.data();
          const expiresAt = Number(data?.expiresAt || 0);

          if (!Number.isFinite(expiresAt) || expiresAt <= now) {
            return;
          }

          if (!latest || expiresAt > latest.expiresAt) {
            latest = {
              planId: data?.planId || "",
              planName:
                data?.subscriptionName || data?.planName || SEO_AUDIT_PRICING_PLAN.name,
              expiresAt,
            };
          }
        });

        if (!latest || isCancelled) {
          return;
        }

        const premiumData = {
          uid: currentUser.uid,
          planId: latest.planId || SEO_AUDIT_PRICING_PLAN.id,
          planName: latest.planName || SEO_AUDIT_PRICING_PLAN.name,
          expiresAt: latest.expiresAt,
        };

        const existing = getValidatedSeoAuditPremiumFromStorage(currentUser);
        const existingExpiresAt = Number(existing?.expiresAt || 0);
        if (existing && existingExpiresAt >= premiumData.expiresAt) {
          return;
        }

        window.localStorage.setItem(
          SEO_AUDIT_PREMIUM_STORAGE_KEY,
          JSON.stringify(premiumData)
        );
        setActivePremiumPlan(premiumData);
      } catch {
        // Keep current local premium state when DB lookup fails.
      }
    }

    syncPremiumFromDb();

    return () => {
      isCancelled = true;
    };
  }, [currentUser]);

  const isPremium = Boolean(activePremiumPlan);

  const score = result?.audit?.score || 0;
  const theme = scoreTheme(score);
  const ring = getScoreRing(score);

  const issueStats = useMemo(() => {
    const issues = result?.audit?.issues || [];
    return {
      critical: issues.filter((issue) => issue.severity === "critical").length,
      high: issues.filter((issue) => issue.severity === "high").length,
      medium: issues.filter((issue) => issue.severity === "medium").length,
      low: issues.filter((issue) => issue.severity === "low").length,
    };
  }, [result]);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function openPricing() {
    setPaymentNotice("");
    setIsPricingOpen(true);
  }

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePurchase() {
    if (!currentUser || currentUser.uid === GUEST_USER.uid) {
      router.push("/login?redirect=/seo-audit-checker");
      return;
    }

    setPaymentNotice("");
    setIsCheckoutLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Payment gateway could not be loaded.");
      }

      const orderResponse = await fetch("/api/razorpay/seo-audit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: SEO_AUDIT_PRICING_PLAN.id,
          uid: currentUser.uid,
          email: currentUser.email || "",
          name: currentUser.displayName || currentUser.email || "",
        }),
      });

      const orderData = await orderResponse.json().catch(() => ({}));

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Unable to create payment order.");
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "SEO Audit Checker",
        description: SEO_AUDIT_PRICING_PLAN.name,
        order_id: orderData.order.id,
        prefill: {
          name: orderData.user?.name || currentUser.displayName || "",
          email: orderData.user?.email || currentUser.email || "",
        },
        theme: {
          color: "#0f172a",
        },
        handler: async (response) => {
          const verifyResponse = await fetch("/api/razorpay/seo-audit-verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              planId: SEO_AUDIT_PRICING_PLAN.id,
              uid: currentUser.uid,
              email: currentUser.email || "",
              name: currentUser.displayName || currentUser.email || "",
            }),
          });

          const verifyData = await verifyResponse.json().catch(() => ({}));
          if (!verifyResponse.ok) {
            throw new Error(verifyData.error || "Payment verification failed.");
          }

          const premiumData = {
            uid: currentUser.uid,
            planId: SEO_AUDIT_PRICING_PLAN.id,
            planName: SEO_AUDIT_PRICING_PLAN.name,
            expiresAt:
              verifyData.entitlement?.expiresAt ||
              Math.floor(Date.now() / 1000) + PREMIUM_DURATION_SECONDS,
          };

          window.localStorage.setItem(
            SEO_AUDIT_PREMIUM_STORAGE_KEY,
            JSON.stringify(premiumData)
          );

          setActivePremiumPlan(premiumData);
          setIsPricingOpen(false);
          showToast("SEO Audit Premium activated successfully");
        },
      });

      razorpay.on("payment.failed", (event) => {
        setPaymentNotice(
          event?.error?.description || "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (purchaseError) {
      setPaymentNotice(purchaseError.message || "Unable to start payment right now.");
    } finally {
      setIsCheckoutLoading(false);
    }
  }


  async function runAudit() {
    if (!currentUser || currentUser.uid === GUEST_USER.uid) {
      router.push("/login?redirect=/seo-audit-checker");
      return;
    }

    if (!url.trim()) {
      setError("Please enter website URL before running audit.");
      setLimitNotice("");
      return;
    }

    if (includeAi && !activePremiumPlan) {
      setLimitNotice("AI strategy insights are available in the premium plan.");
    }

    setError("");
    setIsLoading(true);

    try {
      const idToken = await currentUser.getIdToken();
      const headers = {
        "Content-Type": "application/json",
      };
      if (idToken) {
        headers.Authorization = `Bearer ${idToken}`;
      }
      const response = await fetch("/api/seo-audit", {
        method: "POST",
        headers,
        body: JSON.stringify({
          url,
          keyword,
          includeAi,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (data.usage) {
        setUsage(data.usage);
      }

      if (!response.ok && response.status === 429) {
        setLimitNotice(
          data.message ||
            "Free audit limit reached. Upgrade to premium for unlimited audits."
        );
        return;
      }

      if (!response.ok && response.status === 401) {
        router.push("/login?redirect=/seo-audit-checker");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Unable to run SEO audit.");
      }

      if (data.premium && currentUser) {
        const premiumData = {
          uid: currentUser.uid,
          planId: data.premium.planId,
          planName: data.premium.name,
          expiresAt: Math.floor(Date.now() / 1000) + PREMIUM_DURATION_SECONDS,
        };
        window.localStorage.setItem(
          SEO_AUDIT_PREMIUM_STORAGE_KEY,
          JSON.stringify(premiumData)
        );
        setActivePremiumPlan(premiumData);
      }

      setResult(data);
      if (!data.ai && includeAi && activePremiumPlan) {
        setLimitNotice("Manual audit completed. AI insights could not be generated this time.");
      }
    } catch (auditError) {
      setError(auditError.message || "Audit failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-white px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "SEO Audit Checker",
            description:
              "Run technical, on-page, content and AI-driven SEO audits for websites.",
            slug: "/seo-audit-checker",
            category: "SEO",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "SEO Audit Checker", url: "/seo-audit-checker" },
          ]),
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-7">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-7 text-white shadow-2xl shadow-slate-300/40 sm:p-9">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative flex flex-wrap items-start gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-4 w-4" />
                Premium SEO Intelligence
              </div>

              <h1 className="text-3xl font-black tracking-tight !text-white sm:text-5xl">
                SEO Audit Checker
              </h1>
              <p className="max-w-2xl text-sm leading-7 !text-white/90 sm:text-base">
                Hybrid engine: manual technical audit + AI strategy planner. Built for serious
                rankings, clear priorities, and executive-ready reporting.
              </p>
            </div>
          </div>
        </div>

        {authLoading ? (
          <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              Checking login...
            </div>
          </div>
        ) : !currentUser ? (
          <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-blue-50/70 p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <Lock className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-950">Login required</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
                Please login to use the SEO Audit Checker and access your free daily audit limit.
              </p>
              <button
                type="button"
                onClick={() => router.push("/login?redirect=/seo-audit-checker")}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800"
              >
                <LogIn className="h-4 w-4" />
                Login to Use Tool
              </button>
            </div>
          </div>
        ) : (
          <>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Run Audit</h2>
                <p className="text-sm text-slate-600">
                  Enter website URL and optional focus keyword for more relevant suggestions.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Website URL</span>
                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">
                  Target Keyword (optional)
                </span>
                <input
                  type="text"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="best seo audit tool"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Include AI Strategy Layer</p>
                  <p className="text-xs text-slate-600">
                    Premium only: adds priority roadmap and quick-win opportunities.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={includeAi}
                  onChange={(event) => setIncludeAi(event.target.checked)}
                  className="h-4 w-4"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={runAudit}
                disabled={isLoading || authLoading}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
                {isLoading ? "Auditing..." : "Run SEO Audit"}
              </button>

              {!currentUser && !authLoading ? (
                <button
                  type="button"
                  onClick={() => router.push("/login?redirect=/seo-audit-checker")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  <LogIn className="h-4 w-4" />
                  Login Required
                </button>
              ) : null}
            </div>

            {error ? (
              <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            {limitNotice ? (
              <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                {limitNotice}
              </p>
            ) : null}
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
              <div className="mb-3 flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                <p className="font-semibold text-slate-900">Access</p>
              </div>

              {isPremium ? (
                <div className="space-y-3">
                  <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                    {activePremiumPlan.planName || "SEO Audit Premium"} active
                  </p>
                  <p className="text-xs text-slate-600">
                    Full manual + AI audits unlocked for this account.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Free users get {usage.limit} manual audit/day. Premium unlocks unlimited audits + AI layer.
                  </p>
                  <button
                    type="button"
                    onClick={openPricing}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500"
                  >
                    <Zap className="h-4 w-4" />
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
              <p className="text-sm font-semibold text-slate-900">Why this tool is pro-grade</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
                  Technical checks: robots, sitemap, links, canonical, noindex.
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="mt-0.5 h-4 w-4 text-blue-500" />
                  On-page + content scoring with clear issue severity.
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="mt-0.5 h-4 w-4 text-violet-500" />
                  AI roadmap for execution-priority recommendations.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {result?.audit ? (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Overall SEO Score</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="relative h-32 w-32">
                    <svg viewBox="0 0 130 130" className="h-32 w-32 -rotate-90">
                      <circle
                        cx="65"
                        cy="65"
                        r={ring.radius}
                        strokeWidth="10"
                        className="stroke-slate-200"
                        fill="none"
                      />
                      <circle
                        cx="65"
                        cy="65"
                        r={ring.radius}
                        strokeWidth="10"
                        className={theme.ringClass}
                        fill="none"
                        strokeDasharray={ring.circumference}
                        strokeDashoffset={ring.offset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">
                      {score}
                    </div>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${theme.className}`}>{theme.label}</p>
                    <p className="text-sm text-slate-600">{result.audit.finalUrl}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:col-span-2">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Category Scores</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {Object.entries(result.audit.categoryScores || {}).map(([category, value]) => (
                    <div
                      key={category}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">{prettyCategory(category)}</p>
                        <p className="text-sm font-bold text-slate-900">{value}</p>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          style={{ width: `${Math.max(4, value)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">Audit Issues</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-700">
                      Critical: {issueStats.critical}
                    </span>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                      High: {issueStats.high}
                    </span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                      Medium: {issueStats.medium}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                      Low: {issueStats.low}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {(result.audit.issues || []).map((issue) => (
                    <article
                      key={issue.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${severityTone(issue.severity)}`}
                        >
                          {issue.severity.toUpperCase()}
                        </span>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          {prettyCategory(issue.category)}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-900">{issue.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{issue.details}</p>
                      <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Fix:</span> {issue.fix}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                  <h3 className="text-base font-bold text-slate-900">Manual Highlights</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    {(result.audit.passedChecks || []).slice(0, 7).map((check) => (
                      <p key={check} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                        {check}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                  <h3 className="text-base font-bold text-slate-900">Top Metrics</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <p className="text-xs text-slate-500">Response Time</p>
                      <p className="font-semibold text-slate-900">
                        {result.audit.metrics.responseTime}ms
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <p className="text-xs text-slate-500">Body Words</p>
                      <p className="font-semibold text-slate-900">
                        {result.audit.metrics.bodyWords}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <p className="text-xs text-slate-500">Internal Links</p>
                      <p className="font-semibold text-slate-900">
                        {result.audit.metrics.internalLinks}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <p className="text-xs text-slate-500">Missing Alt</p>
                      <p className="font-semibold text-slate-900">
                        {result.audit.metrics.imagesMissingAlt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">Meta + Focus Keyword Suggestions</h3>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Suggested Focus Keyword
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {result.audit.enhancements?.seoSuggestions?.focusKeyword || "Not available"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Suggested Meta Title
                    </p>
                    <p className="mt-1 text-sm text-slate-800">
                      {result.audit.enhancements?.seoSuggestions?.suggestedTitle || "Not available"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Suggested Meta Description
                    </p>
                    <p className="mt-1 text-sm text-slate-800">
                      {result.audit.enhancements?.seoSuggestions?.suggestedDescription || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">Schema + Mobile Check (Basic)</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Schema Blocks</p>
                    <p className="text-lg font-bold text-slate-900">
                      {result.audit.enhancements?.schemaCheck?.totalBlocks ?? 0}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Mobile Score</p>
                    <p className="text-lg font-bold text-slate-900">
                      {result.audit.enhancements?.mobileCheck?.score ?? 0}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">Schema Types:</span>{" "}
                    {(result.audit.enhancements?.schemaCheck?.types || []).join(", ") || "Not detected"}
                  </p>
                  {(result.audit.enhancements?.mobileCheck?.checks || []).slice(0, 3).map((item) => (
                    <p key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">Internal Linking Suggestions</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  {(result.audit.enhancements?.internalLinking?.suggestions || []).length === 0 ? (
                    <p className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700">
                      Internal linking looks good. Keep adding contextual deep links.
                    </p>
                  ) : (
                    (result.audit.enhancements?.internalLinking?.suggestions || []).map((item) => (
                      <p key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                        {item}
                      </p>
                    ))
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Anchor Text Samples
                  </p>
                  <div className="mt-2 space-y-2">
                    {(result.audit.enhancements?.internalLinking?.anchorTextSamples || [])
                      .slice(0, 5)
                      .map((sample) => (
                        <div key={`${sample.url}-${sample.anchorText}`} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                          <p className="text-xs font-semibold text-slate-900">{sample.anchorText}</p>
                          <p className="truncate text-xs text-slate-500">{sample.url}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">Missing Content + Keyword Suggestions</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  {(result.audit.enhancements?.missingContent || []).slice(0, 5).map((item) => (
                    <div key={`${item.area}-${item.recommendation}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="font-semibold text-slate-900">{item.area}</p>
                      <p className="mt-1 text-xs text-slate-600">{item.recommendation}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Suggested Keywords
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(result.audit.enhancements?.keywordSuggestions?.topTerms || [])
                      .slice(0, 10)
                      .map((item) => (
                        <span
                          key={item.term}
                          className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                        >
                          {item.term}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-xl shadow-slate-200/70">
              <div className="mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">AI Strategy Layer</h3>
              </div>

              {result.ai ? (
                <div className="space-y-5">
                  <p className="rounded-2xl border border-blue-200 bg-white/80 px-4 py-3 text-sm text-slate-700">
                    {result.ai.summary}
                  </p>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">Top Priorities</p>
                      {(result.ai.priorities || []).map((item, index) => (
                        <div key={`${item.title}-${index}`} className="rounded-xl bg-slate-50 p-3 text-sm">
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="mt-1 text-slate-600">{item.why}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">Quick Wins</p>
                      {(result.ai.quickWins || []).map((item, index) => (
                        <p key={`${item}-${index}`} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                          <Star className="mr-2 inline h-3.5 w-3.5 text-amber-500" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {(result.ai.aiRecommendations || []).map((item, index) => (
                      <div
                        key={`${item.title}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-600">{item.why}</p>
                        <p className="mt-2 text-xs text-slate-500">
                          {(item.steps || []).join(" -> ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-blue-300 bg-white p-5 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">AI strategy is locked for free usage.</p>
                  <p className="mt-1">
                    Unlock high-impact execution roadmap with the premium plan.
                  </p>
                  <button
                    type="button"
                    onClick={openPricing}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white"
                  >
                    <Crown className="h-3.5 w-3.5" />
                    Unlock AI Strategy
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
          </>
        )}
      </div>

      {isPricingOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  <Crown className="h-3.5 w-3.5" />
                  Premium Subscription
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-900">
                  {SEO_AUDIT_PRICING_PLAN.name}
                </h3>
                <p className="text-sm text-slate-600">Manual + AI hybrid audit suite</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPricingOpen(false)}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Price</p>
              <p className="mt-1 text-4xl font-black text-slate-900">
                {SEO_AUDIT_PRICING_PLAN.price}
                <span className="ml-1 text-base font-semibold text-slate-500">
                  {SEO_AUDIT_PRICING_PLAN.period}
                </span>
              </p>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {SEO_AUDIT_PRICING_PLAN.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>

            {paymentNotice ? (
              <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {paymentNotice}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handlePurchase}
              disabled={isCheckoutLoading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCheckoutLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
              {isCheckoutLoading ? "Preparing Checkout..." : "Pay & Activate Premium"}
            </button>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      ) : null}

      <div className="mx-auto mt-10 max-w-7xl rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <p className="flex items-center gap-2 font-semibold text-slate-900">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Audit quality note
        </p>
        <p className="mt-2 leading-6">
          This tool combines deterministic checks and AI insights. Results should guide
          implementation decisions, and major SEO changes should be validated in Search Console.
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            SEO Audit Checker: Complete Practical Guide
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Advanced long-form reference for technical audits, on-page relevance, and execution planning.
          </p>
          <div className="mt-6 space-y-4">
            {SEO_AUDIT_GUIDE_SECTIONS.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-bold text-slate-950">{section.title}</h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {buildBulletPointsFromParagraphs(
                    SEO_AUDIT_LONGFORM_CONTENT.slice(section.from, section.to + 1),
                    8
                  ).map((point) => (
                    <div
                      key={`${section.title}-${point}`}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {point}
                    </div>
                  ))}
                </div>
                <ul className="mt-4 space-y-2 text-sm font-medium text-slate-700">
                  {section.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            SEO Audit Checker FAQ
          </h2>
          <div className="mt-5 space-y-3">
            {SEO_AUDIT_FAQS.map((item, index) => (
              <details
                key={`seo-faq-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <summary className="cursor-pointer list-none text-sm font-bold text-slate-900 sm:text-base">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
