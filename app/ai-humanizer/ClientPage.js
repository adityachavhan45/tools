"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Clipboard,
  Crown,
  LogIn,
  Loader2,
  Lock,
  RefreshCw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildToolJsonLd } from "../../lib/seo";
import { auth } from "../../lib/firebase/firebaseConfig";
import {
  HUMANIZER_FREE_LIMIT,
  HUMANIZER_PREMIUM_STORAGE_KEY,
  HUMANIZER_PRICING_PLANS,
  getValidatedPremiumFromStorage,
} from "../../lib/humanizerPlans";

const USAGE_STORAGE_KEY = "ai-humanizer-usage";
const PREMIUM_DURATION_SECONDS = 60 * 60 * 24 * 30;
const GUEST_USER = {
  uid: "guest",
  email: "",
  displayName: "",
  async getIdToken() {
    return "";
  },
};

function getWordCount(value) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getHumanizerScore(text) {
  const cleanText = text.trim();
  const words = cleanText.match(/\b[\w']+\b/g) || [];

  if (!cleanText || words.length < 5) {
    return {
      score: 0,
      label: "Needs text",
      tone: "Add more text to check the score.",
      colorClass: "stroke-slate-300",
      textClass: "text-slate-600",
    };
  }

  const sentences = cleanText
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const lowerText = cleanText.toLowerCase();
  const roboticPhrases = [
    "it is important to note",
    "in conclusion",
    "moreover",
    "furthermore",
    "as an ai",
    "delve into",
    "utilize",
    "facilitate",
    "comprehensive overview",
    "in today's digital landscape",
    "seamlessly",
    "robust",
    "leverage",
  ];
  const conversationalMarkers = [
    "you",
    "we",
    "i",
    "your",
    "let's",
    "don't",
    "can't",
    "it's",
    "that's",
    "you're",
  ];
  const sentenceLengths = sentences.map((sentence) => getWordCount(sentence));
  const averageSentenceLength =
    sentenceLengths.reduce((total, length) => total + length, 0) /
    Math.max(sentenceLengths.length, 1);
  const uniqueLengths = new Set(sentenceLengths).size;
  const variationRatio = uniqueLengths / Math.max(sentenceLengths.length, 1);
  const roboticHits = roboticPhrases.filter((phrase) =>
    lowerText.includes(phrase)
  ).length;
  const conversationalHits = conversationalMarkers.filter((marker) =>
    new RegExp(`\\b${marker.replace("'", "'?")}\\b`, "i").test(cleanText)
  ).length;
  const longWordRatio =
    words.filter((word) => word.length >= 11).length / Math.max(words.length, 1);
  const repeatedWordRatio =
    1 - new Set(words.map((word) => word.toLowerCase())).size / words.length;
  const punctuationVariety = [",", ";", ":", "?", "!"].filter((mark) =>
    cleanText.includes(mark)
  ).length;

  let score = 58;

  if (averageSentenceLength >= 10 && averageSentenceLength <= 24) score += 12;
  if (averageSentenceLength > 30) score -= 12;
  if (averageSentenceLength < 7) score -= 6;
  score += Math.min(variationRatio * 14, 14);
  score += Math.min(conversationalHits * 3, 12);
  score += Math.min(punctuationVariety * 2, 8);
  score -= roboticHits * 8;
  score -= Math.min(longWordRatio * 35, 14);
  score -= Math.min(repeatedWordRatio * 25, 12);

  const finalScore = clampScore(score);

  if (finalScore >= 80) {
    return {
      score: finalScore,
      label: "Human-like",
      tone: "This reads naturally and conversationally.",
      colorClass: "stroke-emerald-500",
      textClass: "text-emerald-700",
    };
  }

  if (finalScore >= 55) {
    return {
      score: finalScore,
      label: "Mixed",
      tone: "This is readable, but it can sound more natural.",
      colorClass: "stroke-blue-500",
      textClass: "text-blue-700",
    };
  }

  return {
    score: finalScore,
    label: "AI-like",
    tone: "This may sound formal, repetitive, or robotic.",
    colorClass: "stroke-amber-500",
    textClass: "text-amber-700",
  };
}

function getScoreRing(score) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const normalized = Math.max(0, Math.min(100, Number(score) || 0));
  const offset = circumference - (normalized / 100) * circumference;
  return { radius, circumference, offset };
}

function getTodayKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Kolkata",
    year: "numeric",
  }).formatToParts(new Date());
  const dateParts = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
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

const AI_HUMANIZER_LONGFORM_CONTENT = [
  "AI humanization is the process of transforming text that sounds rigid, generic, or template-driven into writing that feels natural, specific, and reader-aware. The objective is not to hide intent or manipulate detection systems; the objective is better communication quality. Many AI-generated drafts are structurally correct but emotionally flat, with repetitive transitions, abstract phrasing, and weak narrative rhythm. Human readers notice this quickly, especially in marketing copy, emails, academic explanations, social posts, and long-form educational content. A good humanizer workflow improves sentence variety, clarifies meaning, and aligns tone with audience expectations. It should preserve original intent while removing robotic artifacts. When done well, the output reads like it was written by someone who understands the topic and the reader context, rather than by a system generating statistically probable phrases from a broad language pattern.",
  "One common misconception is that humanization means simply replacing formal words with casual words. In reality, strong human writing depends on deeper factors: intent clarity, sentence flow, pacing, specificity, and contextual relevance. A paragraph can use simple words and still feel robotic if every sentence follows the same length, same rhythm, and same conclusion style. Likewise, professional writing can remain formal and still feel human if it includes concrete details, deliberate transitions, and audience-centric framing. Effective humanization therefore starts with diagnosis: identify repetitive constructs, passive framing, vague claims, and filler phrases. Then rebuild the text around clear message units. Ask what each paragraph should achieve, what evidence supports it, and what action the reader should take next. This process makes content not only more natural but also more persuasive and easier to trust.",
  "Tone calibration is critical because different channels demand different levels of formality, energy, and precision. A product landing page, a client proposal, a founder newsletter, and an academic assignment all require distinct voice settings. AI outputs often miss this nuance by defaulting to neutral corporate language that feels safe but unmemorable. Humanization should intentionally adapt tone to channel and audience maturity. For beginner audiences, simplify jargon and introduce examples earlier. For expert audiences, increase specificity and reduce explanatory overhead. For conversion-focused copy, emphasize outcomes and friction reduction with concise value framing. For educational pieces, sequence concepts progressively and reinforce with practical analogies. Tone is not cosmetic; it determines readability, retention, and response rates. Strong humanized text sounds as if it was written for a person, not for a generic content slot.",
  "Sentence architecture has direct impact on perceived authenticity. Machine-like drafts frequently use predictable lengths and repetitive openings, creating monotony that reduces engagement. Human writers naturally vary cadence: short lines for emphasis, longer lines for explanation, and occasional rhetorical shifts to maintain momentum. You can improve architecture by mixing statement types, using active verbs, and avoiding stacked subordinate clauses that blur the point. Transitional logic also matters. Instead of relying on generic connectors such as moreover and furthermore in every paragraph, use context-specific bridges that explain why the next idea matters. Another useful tactic is to remove unnecessary throat-clearing phrases and move key information earlier in the sentence. Readers reward clarity and momentum. When sentence flow feels intentional, content becomes easier to read, easier to remember, and more likely to produce action.",
  "Specificity is where most humanization gains are won. AI drafts often produce broad claims that sound plausible but unsupported, such as improve productivity, enhance quality, or optimize outcomes. Human-centered writing turns these into concrete statements: what improved, for whom, under what conditions, and by how much. Adding realistic examples, mini-scenarios, and operational details makes the text believable. Specificity also reduces ambiguity for search intent and audience comprehension. If you are writing for business readers, include process, metric, and decision context. If writing for students, include simple examples and stepwise guidance. If writing for creators, include workflow implications and practical tradeoffs. A humanizer tool should help you move from generic to grounded language without changing your core message. Better specificity increases trust and reduces cognitive effort for the reader.",
  "Editing discipline is essential when using AI outputs in production workflows. Treat AI drafts as first versions, not final deliverables. A reliable editing loop includes four passes: meaning, structure, tone, and polish. In the meaning pass, verify factual accuracy and intent alignment. In the structure pass, reorganize paragraphs for logical progression and remove redundancy. In the tone pass, adapt voice for audience and medium. In the polish pass, tighten wording, improve rhythm, and correct grammar. Humanization tools can accelerate this loop by suggesting natural alternatives and improving fluency, but editorial judgment remains critical. This hybrid approach is faster than writing from scratch while maintaining quality standards. Teams that adopt disciplined editing workflows typically produce more consistent content across blogs, ads, emails, and documentation without sacrificing brand voice.",
  "For SEO and discoverability, humanized content often performs better because search engines increasingly reward usefulness, clarity, and topical depth over keyword stuffing. Over-optimized AI drafts can sound repetitive and thin, which may increase bounce rates even if they contain target terms. Humanized writing improves dwell time by delivering cleaner structure, stronger examples, and clearer value pathways. It also supports semantic relevance by naturally incorporating related concepts instead of repeating exact-match phrases unnaturally. In practical terms, this means your content can satisfy both algorithmic and human evaluation: search systems can interpret topic coverage, and readers can quickly find actionable answers. The best results come from combining intent mapping, concise headings, and reader-first paragraph design. Humanization is therefore not only a style upgrade; it is also a performance strategy for organic growth.",
  "Academic and professional integrity should remain central when humanizing text. The purpose is to improve readability and originality of expression, not to fabricate expertise or bypass policy boundaries. If you use AI assistance for assignments, reports, or client deliverables, ensure the final content reflects your own understanding, voice, and accountability. Cite sources where needed, verify facts independently, and avoid presenting uncertain claims as conclusions. In workplace contexts, align with brand and compliance guidelines before publication. Ethical use creates long-term trust and reduces downstream risk. Humanization works best when it helps you communicate more clearly what you genuinely know. When your text is accurate, audience-aware, and naturally written, you build credibility that compounds over time across professional, educational, and creator environments.",
  "Scalable content teams can benefit significantly from humanizer-driven workflows when paired with clear operating standards. Define tone templates per channel, maintain a banned-phrases list for robotic clichés, and create review checklists for clarity, specificity, and factual integrity. Use AI to draft quickly, then apply structured humanization before publishing. Track quality signals such as engagement time, scroll depth, conversion rate, and support ticket reduction to measure impact. Over time, this data helps refine tone guidelines and improve consistency across writers. Humanization at scale is not random rewriting; it is a repeatable system for producing content that feels personal while meeting business goals. With the right process, teams can increase output volume without compromising trust, readability, or strategic message control.",
];

const AI_HUMANIZER_FAQS = [
  {
    question: "What is the main purpose of an AI Humanizer tool?",
    answer:
      "The main purpose is to improve readability and natural flow by rewriting robotic or overly generic text into language that sounds more human and audience-aware. It helps with tone, sentence rhythm, clarity, and specificity while preserving your original meaning.",
  },
  {
    question: "Will humanized text still keep my original idea intact?",
    answer:
      "Yes, if used correctly. A good humanizer should retain the core message and improve expression rather than changing intent. You should still review output to confirm factual accuracy, context fit, and tone alignment for your specific audience.",
  },
  {
    question: "Is this tool useful for blogs, emails, and social media copy?",
    answer:
      "Absolutely. These channels require natural, clear, and engaging language. Humanization helps remove repetitive phrasing, improve pacing, and make content feel more conversational, which can increase engagement and response quality.",
  },
  {
    question: "Can I use AI Humanizer for professional business writing?",
    answer:
      "Yes. It is useful for proposals, outreach emails, documentation, and internal communication where clarity and credibility matter. For business use, keep tone professional and validate key facts before sending final content.",
  },
  {
    question: "Does humanizing text improve SEO performance?",
    answer:
      "In many cases, yes. Humanized content tends to be easier to read and more useful, which can improve engagement signals such as time on page and lower bounce behavior. It also supports natural semantic coverage instead of awkward keyword repetition.",
  },
  {
    question: "How much text should I paste at once?",
    answer:
      "Use a manageable chunk size that matches your plan limits and editing goals. For long articles, process section by section so you can maintain tone consistency and quality control. This also makes revision faster and more accurate.",
  },
  {
    question: "Do I still need to edit after using the tool?",
    answer:
      "Yes. Humanization accelerates writing quality but should be part of an editorial workflow, not the final step alone. Review for accuracy, brand voice, compliance needs, and any claims that require source validation before publishing.",
  },
  {
    question: "Can this tool make content sound less robotic without becoming too casual?",
    answer:
      "Yes. You can maintain a professional tone while improving natural flow. Human-sounding writing is not always informal; it is clear, purposeful, and context-aware. The goal is better communication, not forced casual language.",
  },
];

const AI_HUMANIZER_GUIDE_SECTIONS = [
  {
    title: "1. Humanization Fundamentals",
    from: 0,
    to: 1,
    highlights: [
      "Goal is better communication quality, not just word replacement.",
      "Natural writing depends on rhythm, clarity, and audience context.",
      "Diagnose robotic patterns before rewriting.",
    ],
  },
  {
    title: "2. Tone, Voice, And Audience Fit",
    from: 2,
    to: 3,
    highlights: [
      "Different channels need different voice settings.",
      "Sentence variation improves engagement and authenticity.",
      "Clear transitions are better than repetitive connector words.",
    ],
  },
  {
    title: "3. Specificity And Editorial Workflow",
    from: 4,
    to: 5,
    highlights: [
      "Specific examples make content credible and useful.",
      "Use a 4-pass editing loop: meaning, structure, tone, polish.",
      "AI draft should be treated as version one, not final copy.",
    ],
  },
  {
    title: "4. SEO Performance And Ethical Usage",
    from: 6,
    to: 7,
    highlights: [
      "Humanized content often improves engagement quality signals.",
      "Use AI responsibly with fact checks and policy compliance.",
      "Authenticity matters for long-term trust.",
    ],
  },
  {
    title: "5. Scaling Content Operations",
    from: 8,
    to: 8,
    highlights: [
      "Use tone templates and review checklists for consistency.",
      "Track quality metrics like dwell time and conversion.",
      "Build a repeatable system instead of random rewrites.",
    ],
  },
];

export default function ClientPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [limitNotice, setLimitNotice] = useState("");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(GUEST_USER);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [activePremiumPlan, setActivePremiumPlan] = useState(null);
  const [paymentNotice, setPaymentNotice] = useState("");
  const [checkoutPlanId, setCheckoutPlanId] = useState("");
  const [usage, setUsage] = useState({
    date: getTodayKey(),
    used: 0,
    limit: HUMANIZER_FREE_LIMIT,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || GUEST_USER);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    try {
      const storedUsage = JSON.parse(
        window.localStorage.getItem(USAGE_STORAGE_KEY) || "{}"
      );
      const today = getTodayKey();

      if (
        storedUsage?.date === today &&
        Number.isFinite(storedUsage?.used)
      ) {
        setUsage({
          date: today,
          used: Math.max(0, storedUsage.used),
          limit: HUMANIZER_FREE_LIMIT,
        });
      }
    } catch {
      window.localStorage.removeItem(USAGE_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    setActivePremiumPlan(getValidatedPremiumFromStorage(currentUser));

    const intervalId = window.setInterval(() => {
      setActivePremiumPlan(getValidatedPremiumFromStorage(currentUser));
    }, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [currentUser]);

  const inputStats = useMemo(
    () => ({
      words: getWordCount(input),
      characters: input.length,
    }),
    [input]
  );

  const outputStats = useMemo(
    () => ({
      words: getWordCount(output),
      characters: output.length,
    }),
    [output]
  );

  const humanizerScore = useMemo(() => getHumanizerScore(input), [input]);
  const scoreRing = useMemo(
    () => getScoreRing(humanizerScore.score),
    [humanizerScore.score]
  );

  const remainingWords = activePremiumPlan
    ? activePremiumPlan.maxWordsPerRequest
    : Math.max(usage.limit - usage.used, 0);
  const isOverLimit = inputStats.words > remainingWords;

  function updateUsage(nextUsage) {
    if (!nextUsage) return;

    const dailyUsage = {
      date: getTodayKey(),
      used: Math.max(0, nextUsage.used || 0),
      limit: nextUsage.limit || HUMANIZER_FREE_LIMIT,
    };

    setUsage(dailyUsage);
    window.localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(dailyUsage));
  }

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

  async function handlePurchase(plan) {
    if (!currentUser || currentUser.uid === GUEST_USER.uid) {
      router.push("/login?redirect=/ai-humanizer");
      return;
    }

    setPaymentNotice("");
    setCheckoutPlanId(plan.id);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Payment gateway could not be loaded.");
      }

      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: plan.id,
          uid: currentUser.uid,
          email: currentUser.email || "",
          name: currentUser.displayName || currentUser.email || "",
        }),
      });

      const orderData = await orderResponse.json().catch(() => ({}));

      if (!orderResponse.ok && orderResponse.status === 401) {
        router.push("/login?redirect=/ai-humanizer");
        return;
      }

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Unable to create payment order.");
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Pro Tool",
        description: plan.name,
        order_id: orderData.order.id,
        prefill: {
          name: orderData.user?.name || currentUser.displayName || "",
          email: orderData.user?.email || currentUser.email || "",
        },
        theme: {
          color: "#0f172a",
        },
        handler: async (response) => {
          const verifyResponse = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              planId: plan.id,
              uid: currentUser.uid,
              email: currentUser.email || "",
              name: currentUser.displayName || currentUser.email || "",
            }),
          });

          const verifyData = await verifyResponse.json().catch(() => ({}));

          if (!verifyResponse.ok) {
            throw new Error(
              verifyData.error || "Payment verification failed."
            );
          }

          const premiumData = {
            uid: currentUser.uid,
            planId: plan.id,
            planName: plan.name,
            maxWordsPerRequest: plan.maxWordsPerRequest,
            expiresAt:
              verifyData.entitlement?.expiresAt ||
              Math.floor(Date.now() / 1000) + PREMIUM_DURATION_SECONDS,
          };

          window.localStorage.setItem(
            HUMANIZER_PREMIUM_STORAGE_KEY,
            JSON.stringify(premiumData)
          );
          setActivePremiumPlan(premiumData);
          setIsPricingOpen(false);
          showToast(`${plan.name} activated successfully`);
        },
        modal: {
          ondismiss: () => {
            setPaymentNotice("");
          },
        },
      });

      razorpay.on("payment.failed", (event) => {
        setPaymentNotice(
          event?.error?.description || "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (purchaseError) {
      setPaymentNotice(
        purchaseError.message || "Unable to start payment right now."
      );
    } finally {
      setCheckoutPlanId("");
    }
  }

  async function humanizeText() {
    const text = input.trim();

    if (!currentUser || currentUser.uid === GUEST_USER.uid) {
      router.push("/login?redirect=/ai-humanizer");
      return;
    }

    if (!text) {
      setError("Please enter text before humanizing.");
      setLimitNotice("");
      return;
    }

    if (!activePremiumPlan && isOverLimit) {
      setError("");
      setLimitNotice(
        `You have ${remainingWords} free words left today. Upgrade to Premium to humanize more text.`
      );
      return;
    }

    if (activePremiumPlan && isOverLimit) {
      setError("");
      setLimitNotice(
        `${activePremiumPlan.planName} allows up to ${remainingWords} words per request.`
      );
      return;
    }

    setError("");
    setLimitNotice("");
    setIsLoading(true);

    try {
      const idToken = await currentUser.getIdToken();
      const headers = {
        "Content-Type": "application/json",
      };
      if (idToken) {
        headers.Authorization = `Bearer ${idToken}`;
      }
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers,
        body: JSON.stringify({ text }),
      });

      const data = await response.json().catch(() => ({}));

      if (data.usage) {
        updateUsage(data.usage);
      }

      if (data.premium) {
        const premiumData = {
          uid: currentUser.uid,
          planId: data.premium.planId,
          planName: data.premium.name,
          maxWordsPerRequest: data.premium.maxWordsPerRequest,
          expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        };
        window.localStorage.setItem(
          HUMANIZER_PREMIUM_STORAGE_KEY,
          JSON.stringify(premiumData)
        );
        setActivePremiumPlan(premiumData);
      }

      if (!response.ok && response.status === 429) {
        setLimitNotice(
          data.message ||
            data.error ||
            "Free daily limit reached. Upgrade to Premium to humanize more text."
        );
        return;
      }

      if (!response.ok && response.status === 401) {
        router.push("/login?redirect=/ai-humanizer");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Unable to humanize text right now.");
      }

      setOutput(data.text || data.output || "");
    } catch (requestError) {
      setError(
        requestError.message ||
          "Something went wrong. Please connect the API route and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!output.trim()) {
      setError("There is no output to copy yet.");
      return;
    }

    await navigator.clipboard.writeText(output);
    setError("");
    showToast("Output copied successfully");
  }

  return (
    <section className="min-h-screen bg-white px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "AI Humanizer Tool",
          description:
            "Convert AI-generated text into natural human-like writing with a clean and simple AI humanizer.",
          slug: "/ai-humanizer",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "AI Humanizer Tool", slug: "/ai-humanizer" },
        ])}
      />

      {toast ? (
        <div className="fixed right-4 top-24 z-50 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-xl shadow-emerald-100">
          {toast}
        </div>
      ) : null}

      {isPricingOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Premium Packages
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Choose your humanizing plan
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Upgrade when you need bigger requests, faster output, and better rewriting quality.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPricingOpen(false)}
                className="self-start !rounded-xl !border !border-slate-200 !bg-white !px-4 !py-2 text-sm font-bold !text-slate-700 !shadow-sm hover:!bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {HUMANIZER_PRICING_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border bg-white p-6 shadow-sm ${
                    plan.featured
                      ? "border-blue-300 ring-4 ring-blue-100"
                      : "border-slate-200"
                  }`}
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {plan.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-slate-600">
                        {plan.audience}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        plan.featured
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black tracking-tight text-slate-950">
                        {plan.price}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-slate-500">
                        {plan.period}
                      </span>
                    </div>
                    <p className="mt-3 rounded-2xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">
                      {plan.highlight}
                    </p>
                  </div>

                  <ul className="mb-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm font-medium leading-6 text-slate-700"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handlePurchase(plan)}
                    disabled={checkoutPlanId === plan.id}
                    className={`inline-flex w-full items-center justify-center gap-2 !rounded-2xl !px-5 !py-4 text-sm font-bold ${
                      plan.featured
                        ? "!bg-blue-600 !text-white !shadow-lg !shadow-blue-200 hover:!bg-blue-700"
                        : "!border !border-slate-200 !bg-white !text-slate-900 hover:!bg-slate-50"
                    } disabled:cursor-wait disabled:opacity-70`}
                  >
                    {checkoutPlanId === plan.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Crown className="h-4 w-4" />
                    )}
                    {checkoutPlanId === plan.id
                      ? "Opening Checkout..."
                      : `Choose ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
            {paymentNotice ? (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {paymentNotice}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Daily limit: {HUMANIZER_FREE_LIMIT} words (Free)
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            AI Humanizer Tool
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Convert AI-generated text into natural human-like writing
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70 sm:p-6 lg:p-8">
          {authLoading ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                Checking login...
              </div>
            </div>
          ) : !currentUser ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-blue-50/70 p-6 text-center shadow-sm sm:p-8">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <Lock className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-950">
                  Login required
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
                  Please login to use the AI Humanizer Tool and access your free
                  daily word limit.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/login?redirect=/ai-humanizer")}
                  className="mt-6 inline-flex items-center justify-center gap-2 !rounded-xl !bg-slate-950 !px-5 !py-3 text-sm font-bold !text-white !shadow-sm hover:!bg-slate-800"
                >
                  <LogIn className="h-4 w-4" />
                  Login to Use Tool
                </button>
              </div>
            </div>
          ) : (
            <>
          {activePremiumPlan ? (
            <div className="mb-6">
              <div className="inline-flex rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-sm font-bold text-blue-950">
                  {activePremiumPlan.planName}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-950">Free Plan</p>
                <p className="mt-1 text-sm text-blue-700">
                  {remainingWords} free words left today.
                </p>
              </div>
              <button
                type="button"
                onClick={openPricing}
                className="inline-flex items-center justify-center gap-2 !rounded-xl !bg-slate-950 !px-5 !py-3 text-sm font-bold !text-white !shadow-sm hover:!bg-slate-800"
              >
                <Crown className="h-4 w-4" />
                Upgrade to Premium
              </button>
            </div>
          )}

          {error ? (
            <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          ) : null}

          {limitNotice ? (
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm font-semibold text-blue-800 sm:flex-row sm:items-center sm:justify-between">
              <span>{limitNotice}</span>
              <button
                type="button"
                onClick={openPricing}
                className="inline-flex items-center justify-center gap-2 !rounded-xl !bg-slate-950 !px-4 !py-2 text-sm font-bold !text-white !shadow-sm hover:!bg-slate-800"
              >
                <Crown className="h-4 w-4" />
                Upgrade
              </button>
            </div>
          ) : null}

          <div className="flex min-h-[360px] flex-col rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <label
                htmlFor="humanizer-input"
                className="text-sm font-bold text-slate-900"
              >
                Input Text
              </label>
              <div
                className={`text-xs font-semibold ${
                  isOverLimit ? "text-rose-600" : "text-slate-500"
                }`}
              >
                {inputStats.words}/{remainingWords} words available ·{" "}
                {inputStats.characters} characters
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 shrink-0">
                    <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r={scoreRing.radius}
                        strokeWidth="9"
                        className="stroke-slate-200 fill-none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={scoreRing.radius}
                        strokeWidth="9"
                        strokeLinecap="round"
                        className={`${humanizerScore.colorClass} fill-none transition-all duration-500`}
                        strokeDasharray={scoreRing.circumference}
                        strokeDashoffset={scoreRing.offset}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <p className="text-lg font-black leading-none text-slate-950">
                        {humanizerScore.score}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Humanizer Score
                    </p>
                    <p className={`mt-1 text-sm font-bold ${humanizerScore.textClass}`}>
                      {humanizerScore.label}
                    </p>
                  </div>
                </div>
                <p className="max-w-sm text-sm font-medium leading-6 text-slate-600">
                  {humanizerScore.tone}
                </p>
              </div>
            </div>

            <textarea
              id="humanizer-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
                setLimitNotice("");
              }}
              className="min-h-[260px] flex-1 resize-none !rounded-2xl !border-slate-200 !bg-white !p-5 text-base leading-7 !text-slate-950 !shadow-inner !shadow-slate-100 placeholder:!text-slate-400 focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-100"
              placeholder="Paste AI-generated text here..."
            />
          </div>

          <div className="my-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={humanizeText}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 !rounded-2xl !bg-blue-600 !px-5 !py-4 text-sm font-bold !text-white !shadow-lg !shadow-blue-200 hover:!bg-blue-700 disabled:hover:!translate-y-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Wand2 className="h-5 w-5" />
              )}
              {isLoading ? "Humanizing..." : "Humanize Text"}
            </button>

            <button
              type="button"
              onClick={humanizeText}
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center justify-center gap-2 !rounded-2xl !border !border-slate-200 !bg-white !px-5 !py-4 text-sm font-bold !text-slate-800 !shadow-sm hover:!bg-slate-50 disabled:hover:!translate-y-0"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
              Regenerate
            </button>

            <button
              type="button"
              onClick={copyOutput}
              disabled={!output.trim()}
              className="inline-flex items-center justify-center gap-2 !rounded-2xl !border !border-slate-200 !bg-white !px-5 !py-4 text-sm font-bold !text-slate-800 !shadow-sm hover:!bg-slate-50 disabled:hover:!translate-y-0"
            >
              <Clipboard className="h-5 w-5" />
              Copy Output
            </button>
          </div>

          <div className="flex min-h-[360px] flex-col rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <label
                htmlFor="humanizer-output"
                className="text-sm font-bold text-slate-900"
              >
                Humanized Output
              </label>
              <div className="text-xs font-semibold text-slate-500">
                {outputStats.words} words · {outputStats.characters} characters
              </div>
            </div>

            <textarea
              id="humanizer-output"
              value={output}
              readOnly
              className="min-h-[260px] flex-1 resize-none !rounded-2xl !border-slate-200 !bg-white !p-5 text-base leading-7 !text-slate-950 !shadow-inner !shadow-slate-100 placeholder:!text-slate-400"
              placeholder="Your humanized version will appear here..."
            />
          </div>
            </>
          )}
        </div>

      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            AI Humanizer: In-Depth Writing Quality Guide
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Detailed framework for converting robotic drafts into natural, high-performing content.
          </p>
          <div className="mt-6 space-y-4">
            {AI_HUMANIZER_GUIDE_SECTIONS.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-lg font-bold text-slate-950">{section.title}</h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {buildBulletPointsFromParagraphs(
                    AI_HUMANIZER_LONGFORM_CONTENT.slice(section.from, section.to + 1),
                    8
                  ).map((point) => (
                    <div
                      key={`${section.title}-${point}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
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

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            AI Humanizer FAQ
          </h2>
          <div className="mt-5 space-y-3">
            {AI_HUMANIZER_FAQS.map((item, index) => (
              <details
                key={`humanizer-faq-${index}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
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
