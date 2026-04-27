"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Clipboard,
  Crown,
  FileSearch,
  Loader2,
  LogIn,
  RefreshCw,
  Sparkles,
  Target,
  Upload,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import JSZip from "jszip";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildToolJsonLd } from "../../lib/seo";
import { auth } from "../../lib/firebase/firebaseConfig";
import {
  ATS_PRICING_PLAN,
  ATS_PREMIUM_STORAGE_KEY,
  getValidatedAtsPremiumFromStorage,
} from "../../lib/atsPlans";

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

function getScoreRing(score) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const normalized = Math.max(0, Math.min(100, Number(score) || 0));
  const offset = circumference - (normalized / 100) * circumference;
  return { radius, circumference, offset };
}

function getScoreTheme(score) {
  const normalized = Math.max(0, Math.min(100, Number(score) || 0));

  if (normalized >= 80) {
    return {
      ringClass: "stroke-emerald-600",
      levelClass: "text-emerald-700",
    };
  }

  if (normalized >= 60) {
    return {
      ringClass: "stroke-orange-500",
      levelClass: "text-orange-700",
    };
  }

  return {
    ringClass: "stroke-yellow-500",
    levelClass: "text-yellow-700",
  };
}

function normalizeExtractedText(text) {
  return text
    .replace(/\u0000/g, " ")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extractTextFromPdf(file) {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }
  const buffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  });

  const pdf = await loadingTask.promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str || "").join(" ");
    pages.push(pageText);
  }

  return normalizeExtractedText(pages.join("\n\n"));
}

function decodeXmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
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

async function extractTextFromDocx(file) {
  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);
  const documentXml = await zip.file("word/document.xml")?.async("string");

  if (!documentXml) {
    throw new Error("Could not read DOCX content. Please try another file.");
  }

  const withLineBreaks = documentXml
    .replace(/<\/w:p>/g, "\n")
    .replace(/<w:br\/>/g, "\n")
    .replace(/<w:tab\/>/g, " ");
  const withoutTags = withLineBreaks.replace(/<[^>]+>/g, " ");
  return normalizeExtractedText(decodeXmlEntities(withoutTags));
}

const ATS_LONGFORM_CONTENT = [
  "An ATS friendly resume is not about gaming software; it is about communicating your experience in a structure that both machines and recruiters can understand quickly. Hiring teams often review very large applicant pools, so the applicant tracking system performs the first screening pass and surfaces profiles that appear relevant to the role. If your resume uses complex visual layouts, nonstandard headings, text inside graphics, or weak role-specific terminology, your profile can be under-ranked even when your real capability is strong. That is why ATS optimization should be seen as a clarity layer. You are not changing your story; you are improving how your story is parsed, indexed, and evaluated. A strong resume for modern hiring has three qualities at the same time: parser-safe format, role-aligned language, and proof-backed achievements that reduce decision risk for recruiters and managers.",
  "Parsing accuracy is one of the most underestimated factors in resume performance. Two resumes can look equally strong to a human reader, but once uploaded to different ATS platforms, the extracted text quality can vary significantly. Multi-column structures, floating text boxes, icon-only labels, and decorative timelines often break extraction order, causing key details to appear in the wrong section or disappear entirely. This affects your score because the system may fail to connect your experience with required skills. The safest format is a clean single-column layout with predictable section flow, consistent dates, and plain bullet formatting. You can still keep your resume professional and polished, but avoid design elements that carry critical meaning visually without clear text hierarchy. Before applying, always validate your document by extracting plain text and checking whether roles, tools, and achievements remain readable and correctly ordered.",
  "Keyword strategy should be intentional, evidence-driven, and tailored to each application. Instead of stuffing as many words as possible, start by identifying recurring terms in the job description: core tools, responsibility verbs, domain concepts, and role outcomes. Then map these terms to real achievements from your background. If a posting emphasizes stakeholder communication, dashboarding, and process automation, demonstrate where you coordinated teams, built reporting workflows, and improved measurable outcomes. This approach strengthens relevance while preserving authenticity. Recruiters and ATS systems both favor resumes where keywords appear in meaningful context, not isolated lists. Your Skills section should act as an index, but your Experience bullets should provide proof. Good optimization is less about repetition and more about alignment. When language mirrors business needs and evidence supports claims, your resume becomes easier to shortlist and easier to defend in interviews.",
  "Section completeness plays a direct role in ATS interpretation and recruiter confidence. Most high-performing resumes use a predictable architecture: Contact Information, Professional Summary, Skills, Experience, Projects, Education, and optional Certifications depending on role type. Missing sections do not always eliminate candidates, but they reduce context and can lower classification confidence in automated systems. Your summary should communicate role fit and value proposition in clear, specific language, not generic career objectives. Your experience section should focus on impact, not task lists. Projects are especially valuable for freshers and early-career applicants because they demonstrate applied skills in practical environments. When section labels are standardized and content is logically organized, parsing quality improves and decision-makers can evaluate you faster. In competitive pipelines, reducing friction in understanding your profile can be as important as adding one more skill keyword.",
  "Quantified achievements consistently improve resume quality because they transform claims into evidence. Hiring decisions are risk decisions, and numbers reduce ambiguity. Instead of saying you improved efficiency, clarify what changed: turnaround time, error rate, conversion, adoption, throughput, retention, or revenue impact. You do not always need exact confidential metrics; directional or percentage-based indicators are often enough. Strong bullets usually follow a practical pattern: action, method, and outcome. For example, mention the process you redesigned, the tools you used, and the measurable improvement delivered. This format also naturally includes relevant keywords and increases ATS match quality. If your resume has many responsibility-only bullets, your score and interview conversion can both suffer because value is implied but not demonstrated. Measurable language helps systems and humans quickly understand scope, ownership, and business contribution.",
  "Formatting errors still cause avoidable rejection for qualified candidates. Frequent issues include uploading scanned PDFs, placing contact details in headers or footers, using image-based templates, inconsistent date formats, and over-decorated typography that disrupts parsing. File type alone does not guarantee compatibility; the content must be text-readable and structurally stable. PDF and DOCX are both acceptable in many portals, but always follow employer instructions when a format is specified. Keep naming conventions professional, use standard section headings, and avoid abbreviations that hide important role terminology. A quick parser test before submission can prevent silent failures where your experience appears incomplete to the ATS. Think of this step as quality control, not extra effort. Ten minutes of validation can save days of lost opportunities by ensuring your application enters screening with accurate, complete, and searchable information.",
  "Customization is essential, but it should be efficient and repeatable. The best workflow is to maintain a master resume and create role-cluster variants rather than rewriting from zero every time. Group target jobs into categories such as frontend, data analytics, operations, marketing, or product support. For each category, build a keyword bank and an achievement bank that reflect typical expectations. When applying to a specific role, update the summary, top skills, and first few bullets to align with that posting. Keep your core experience truthful and stable while shifting emphasis toward relevant outcomes. This method improves ATS alignment and keeps application speed manageable. Resume optimization works best in cycles: tune, test score, submit, observe response quality, and refine. Over time, you build a high-performing system instead of depending on one generic resume for all roles.",
  "ATS score should be treated as diagnostic feedback, not a final hiring verdict. A higher score usually indicates stronger structural quality and relevance, but interviews depend on additional factors like competition level, referral pathways, salary match, location, market timing, and recruiter priorities. Use the score to identify controllable gaps such as missing sections, weak keyword coverage, unclear achievements, or inconsistent formatting. Once those issues are fixed, spend equal energy on distribution strategy: better role targeting, thoughtful networking, portfolio visibility, and application timing. If score improves but callbacks do not, the issue may be positioning, not formatting. Effective job search performance comes from combined strengths: clear resume, precise targeting, and strong interview readiness. Optimization should make your profile easier to evaluate, but long-term success comes from aligning your value narrative with market demand.",
  "Ethical optimization matters because resume quality should increase clarity, not exaggeration. Avoid listing tools you cannot use, claiming ownership for team outcomes you did not drive, or inflating metrics that you cannot explain confidently. ATS may not detect exaggeration, but interviews will. The right approach is to express your real work with stronger framing: define the problem, your role, the method, and the result. If a project was collaborative, state your contribution accurately. If outcomes were estimated, use transparent language. Honest, evidence-based resumes build consistency between application and interview conversations, which improves confidence and credibility. This ATS checker is most valuable when used as a communication coach: it helps you uncover blind spots in structure, relevance, and proof density so your true capability is represented clearly and competitively in modern hiring pipelines.",
];

const ATS_FAQS = [
  {
    question: "What ATS score should I target before applying?",
    answer:
      "A score above 75 is generally a strong baseline, especially when combined with role-specific keywords and clear impact bullets. Between 60 and 75 usually means your resume is partially aligned but still missing relevance or structure in key places. Below 60 often indicates parser, formatting, or section issues that should be fixed first. Treat score as directional feedback and aim for consistent improvement per target job.",
  },
  {
    question: "Do I need a different resume for every job description?",
    answer:
      "You should tailor each application, but that does not require full rewrites. Keep a master resume and update high-impact areas such as summary, top skills, and first experience bullets to match each role. This gives you strong alignment with manageable effort and usually improves both ATS match and recruiter response quality.",
  },
  {
    question: "Can a modern design template reduce ATS performance?",
    answer:
      "Yes, if the design relies on columns, icons, text boxes, or visual sections that parsers cannot read in order. A clean one-column format with standard section labels is safer across ATS platforms. You can still maintain visual quality through spacing and typography, but avoid layouts where meaning depends on graphics.",
  },
  {
    question: "Should I repeat keywords many times to increase score?",
    answer:
      "Keyword stuffing is risky and can reduce readability. Instead, include important terms naturally in achievement bullets where they are supported by evidence. Systems and recruiters both respond better to contextual relevance than raw repetition. Focus on matching intent, not just frequency.",
  },
  {
    question: "Is PDF or DOCX better for ATS submissions?",
    answer:
      "Both formats can work if the text is selectable and properly structured. Always follow employer instructions if a specific format is requested. The key is parse quality, not file extension alone. Validate by copying text into a plain editor and checking whether order and headings remain correct.",
  },
  {
    question: "How can freshers improve ATS score without full-time experience?",
    answer:
      "Freshers should emphasize projects, internships, certifications, coursework outcomes, and practical tool usage. Use measurable results where possible, such as completion time, accuracy gains, or impact in team assignments. Strong structure and relevant keywords can significantly improve shortlist potential even with limited full-time history.",
  },
  {
    question: "Why does my score change after small edits?",
    answer:
      "Small edits can affect multiple scoring signals at once, including keyword relevance, section clarity, and measurable impact. Replacing one generic bullet with a role-aligned quantified bullet can improve score quickly. Likewise, removing a key term or section heading can lower score more than expected.",
  },
  {
    question: "Does a high ATS score guarantee interviews?",
    answer:
      "No, it improves your probability of passing initial screening but cannot guarantee interviews. Selection also depends on competition quality, referrals, budget fit, hiring urgency, and recruiter priorities. Use ATS optimization as one part of a complete strategy that includes targeting, networking, and interview preparation.",
  },
];

const ATS_GUIDE_SECTIONS = [
  {
    title: "1. ATS Basics And Screening Logic",
    from: 0,
    to: 1,
    highlights: [
      "ATS optimization means clarity, not manipulation.",
      "Parser-friendly formatting protects your profile from silent rejection.",
      "Machine readability is the first gate before recruiter review.",
    ],
  },
  {
    title: "2. Keyword Mapping With Real Evidence",
    from: 2,
    to: 3,
    highlights: [
      "Use job-description keywords in context, not as keyword stuffing.",
      "Standard section architecture improves both score and readability.",
      "Role-fit should be visible in summary, skills, and experience bullets.",
    ],
  },
  {
    title: "3. Metrics, Formatting, And File Quality",
    from: 4,
    to: 5,
    highlights: [
      "Quantified achievements reduce hiring risk perception.",
      "Avoid scanned PDFs, image text, and inconsistent date styles.",
      "Always validate parsed text before submitting applications.",
    ],
  },
  {
    title: "4. Customization Workflow For Faster Applications",
    from: 6,
    to: 7,
    highlights: [
      "Maintain a master resume and create role-cluster variants.",
      "Customize high-impact blocks instead of rewriting everything.",
      "Use score feedback with response-rate tracking for better iterations.",
    ],
  },
  {
    title: "5. Ethical Optimization And Long-Term Success",
    from: 8,
    to: 8,
    highlights: [
      "Do not inflate tools, outcomes, or ownership claims.",
      "Strong resumes increase clarity while staying truthful.",
      "Consistency between resume and interview builds real credibility.",
    ],
  },
];

export default function ClientPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [extractError, setExtractError] = useState("");
  const [apiError, setApiError] = useState("");
  const [limitNotice, setLimitNotice] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [toast, setToast] = useState("");
  const [result, setResult] = useState(null);
  const [detailsAvailable, setDetailsAvailable] = useState(false);
  const [remainingFreeChecks, setRemainingFreeChecks] = useState(4);

  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(GUEST_USER);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [activePremiumPlan, setActivePremiumPlan] = useState(null);
  const [paymentNotice, setPaymentNotice] = useState("");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const isPremium = Boolean(activePremiumPlan);
  const scoreRing = getScoreRing(result?.score || 0);
  const scoreTheme = getScoreTheme(result?.score || 0);
  const isFreeLimitReached = !isPremium && remainingFreeChecks === 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || GUEST_USER);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setActivePremiumPlan(getValidatedAtsPremiumFromStorage(currentUser));

    const intervalId = window.setInterval(() => {
      setActivePremiumPlan(getValidatedAtsPremiumFromStorage(currentUser));
    }, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [currentUser]);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  async function handleResumeUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setExtractError("");
    setApiError("");
    setLimitNotice("");
    setIsExtracting(true);
    setResumeFileName(file.name);
    setResult(null);
    setDetailsAvailable(false);

    try {
      const lowerName = file.name.toLowerCase();
      let extracted = "";

      if (lowerName.endsWith(".pdf") || file.type === "application/pdf") {
        extracted = await extractTextFromPdf(file);
      } else if (
        lowerName.endsWith(".docx") ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        extracted = await extractTextFromDocx(file);
      } else if (lowerName.endsWith(".doc") || file.type === "application/msword") {
        throw new Error("DOC format is not supported yet. Please upload PDF or DOCX.");
      } else {
        throw new Error("Unsupported file type. Please upload PDF, DOC, or DOCX.");
      }

      if (!extracted) {
        throw new Error("Could not read resume text from this file. Try another PDF/DOCX file.");
      }

      setResume(extracted);
      showToast("Resume uploaded successfully");
    } catch (error) {
      setResume("");
      setExtractError(error.message || "Could not process the uploaded resume.");
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
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
      router.push("/login?redirect=/ats-resume-checker");
      return;
    }

    setPaymentNotice("");
    setIsCheckoutLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Payment gateway could not be loaded.");
      }

      const orderResponse = await fetch("/api/razorpay/ats-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: ATS_PRICING_PLAN.id,
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
        name: "ATS Resume Checker",
        description: ATS_PRICING_PLAN.name,
        order_id: orderData.order.id,
        prefill: {
          name: orderData.user?.name || currentUser.displayName || "",
          email: orderData.user?.email || currentUser.email || "",
        },
        theme: {
          color: "#0f172a",
        },
        handler: async (response) => {
          const verifyResponse = await fetch("/api/razorpay/ats-verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              planId: ATS_PRICING_PLAN.id,
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
            planId: ATS_PRICING_PLAN.id,
            planName: ATS_PRICING_PLAN.name,
            expiresAt:
              verifyData.entitlement?.expiresAt ||
              Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          };

          window.localStorage.setItem(
            ATS_PREMIUM_STORAGE_KEY,
            JSON.stringify(premiumData)
          );
          setActivePremiumPlan(premiumData);
          setIsPricingOpen(false);
          setLimitNotice("");
          showToast("ATS Premium activated successfully");
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
      setIsCheckoutLoading(false);
    }
  }

  async function checkAtsScore() {
    if (!currentUser || currentUser.uid === GUEST_USER.uid) {
      router.push("/login?redirect=/ats-resume-checker");
      return;
    }

    if (!resume.trim()) {
      setApiError("Please upload resume first.");
      return;
    }

    setApiError("");
    setLimitNotice("");
    setIsChecking(true);

    try {
      const idToken = await currentUser.getIdToken();
      const headers = {
        "Content-Type": "application/json",
      };
      if (idToken) {
        headers.Authorization = `Bearer ${idToken}`;
      }
      const response = await fetch("/api/ats-score", {
        method: "POST",
        headers,
        body: JSON.stringify({
          resumeText: resume,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok && response.status === 429) {
        setResult(null);
        setDetailsAvailable(false);
        setRemainingFreeChecks(
          Number.isFinite(data.remainingFreeChecks) ? data.remainingFreeChecks : 0
        );
        setLimitNotice(
          data.error ||
            "Free plan limit reached. Upgrade to ATS Premium for full reports."
        );
        return;
      }

      if (!response.ok && response.status === 401) {
        router.push("/login?redirect=/ats-resume-checker");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Unable to check ATS score right now.");
      }

      setResult(data.result || null);
      setDetailsAvailable(Boolean(data.detailsAvailable));
      if (Number.isFinite(data.remainingFreeChecks)) {
        setRemainingFreeChecks(Math.max(0, data.remainingFreeChecks));
      }
      showToast("ATS score generated");
    } catch (error) {
      setResult(null);
      setDetailsAvailable(false);
      setApiError(error.message || "Unable to check ATS score right now.");
    } finally {
      setIsChecking(false);
    }
  }

  function copyReport() {
    if (!result || !detailsAvailable) return;

    const report = `ATS Resume Score Report\n=======================\n\nScore: ${result.score}/100\nLevel: ${result.level}\nWord Count: ${result.wordCount}\nKeyword Match: ${result.keywordMatchPercent}%\n\nMissing Sections:\n${result.sections
      .filter((item) => !item.pass)
      .map((item) => `- ${item.label}`)
      .join("\n") || "- None"}\n\nTop Suggestions:\n${(result.suggestions || []).map((tip) => `- ${tip}`).join("\n")}\n\nMissing Keywords:\n${(result.missingKeywords || []).slice(0, 12).join(", ") || "None"}`;

    navigator.clipboard.writeText(report);
    showToast("Report copied");
  }

  function clearAll() {
    setResume("");
    setResumeFileName("");
    setExtractError("");
    setApiError("");
    setLimitNotice("");
    setResult(null);
    setDetailsAvailable(false);
    showToast("Cleared");
  }

  const scoreCard = useMemo(() => {
    if (!result) return null;
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">ATS Score</p>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative h-24 w-24 shrink-0">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={scoreRing.radius} strokeWidth="9" className="stroke-slate-200 fill-none" />
              <circle
                cx="50"
                cy="50"
                r={scoreRing.radius}
                strokeWidth="9"
                strokeLinecap="round"
                className={`${scoreTheme.ringClass} fill-none transition-all duration-500`}
                strokeDasharray={scoreRing.circumference}
                strokeDashoffset={scoreRing.offset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <p className="text-lg font-black leading-none text-slate-950">{result.score}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">out of 100</p>
            <p className={`mt-1 text-xs font-semibold ${scoreTheme.levelClass}`}>{result.level}</p>
            {!detailsAvailable ? (
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Free plan shows ATS score only.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }, [detailsAvailable, result, scoreRing, scoreTheme]);

  return (
    <section className="min-h-screen bg-white px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "ATS Friendly Resume Checker",
          description:
            "Analyze your resume for ATS compatibility with score, missing sections, keyword match, and optimization tips.",
          slug: "/ats-resume-checker",
          category: "Utilities/Career",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "ATS Friendly Resume Checker", slug: "/ats-resume-checker" },
        ])}
      />

      {toast ? (
        <div className="fixed right-4 top-24 z-50 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow-xl shadow-blue-100">
          {toast}
        </div>
      ) : null}

      {isPricingOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
                  ATS Premium
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Unlock Full ATS Report</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Free users get 4 ATS score checks. Upgrade to unlock detailed analysis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPricingOpen(false)}
                className="!rounded-xl !border !border-slate-200 !bg-white !px-3 !py-2 text-sm font-semibold !text-slate-700 hover:!bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-900">{ATS_PRICING_PLAN.name}</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-black text-slate-950">{ATS_PRICING_PLAN.price}</span>
                <span className="pb-1 text-sm font-semibold text-slate-500">{ATS_PRICING_PLAN.period}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-blue-700">{ATS_PRICING_PLAN.highlight}</p>

              <ul className="mt-4 space-y-2">
                {ATS_PRICING_PLAN.features.map((feature) => (
                  <li key={feature} className="text-sm font-medium text-slate-700">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>

            {paymentNotice ? (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {paymentNotice}
              </div>
            ) : null}

            <button
              type="button"
              onClick={handlePurchase}
              disabled={isCheckoutLoading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 !rounded-2xl !bg-slate-950 !px-5 !py-3 text-sm font-bold !text-white !shadow-sm hover:!bg-slate-800 disabled:cursor-wait disabled:opacity-70"
            >
              {isCheckoutLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crown className="h-4 w-4" />}
              {isCheckoutLoading ? "Opening Checkout..." : `Upgrade for ${ATS_PRICING_PLAN.price}`}
            </button>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Free: 4 ATS score checks • Premium: full report unlocked
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            ATS Friendly Resume Checker
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Upload your resume, check ATS score, and unlock complete insights with Premium.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70 sm:p-6 lg:p-8">
          {authLoading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                Checking login...
              </div>
            </div>
          ) : !currentUser ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-blue-50/70 p-6 text-center shadow-sm sm:p-8">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <LogIn className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-950">Login required</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
                  Please login to use ATS Resume Checker. Free users can check 4 ATS scores. Premium users get full reports.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/login?redirect=/ats-resume-checker")}
                  className="mt-6 inline-flex items-center justify-center gap-2 !rounded-xl !bg-slate-950 !px-5 !py-3 text-sm font-bold !text-white !shadow-sm hover:!bg-slate-800"
                >
                  <LogIn className="h-4 w-4" />
                  Login to Use Tool
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5 flex flex-col gap-4 rounded-3xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-950">
                    {isPremium ? ATS_PRICING_PLAN.name : "Free Plan"}
                  </p>
                  <p className="mt-1 text-sm text-blue-700">
                    {isPremium
                      ? "Full ATS report unlocked."
                      : `Free checks left: ${Math.max(remainingFreeChecks, 0)} of 4`}
                  </p>
                </div>
                {isFreeLimitReached ? (
                  <button
                    type="button"
                    onClick={openPricing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800"
                  >
                    <Crown className="h-4 w-4" />
                    Upgrade {ATS_PRICING_PLAN.price}
                  </button>
                ) : null}
              </div>

              <div>
                <div className="flex flex-col rounded-3xl border border-slate-300 bg-slate-50 p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <label htmlFor="resume-file" className="text-sm font-bold text-slate-900">
                      Resume Upload (PDF/DOC/DOCX)
                    </label>
                    <span className="text-xs font-semibold text-slate-500">
                      {getWordCount(resume)} words extracted
                    </span>
                  </div>

                  <label
                    htmlFor="resume-file"
                    className="mb-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base font-semibold text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                  >
                    {isExtracting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        Extracting resume text...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-blue-600" />
                        Upload Resume
                      </>
                    )}
                  </label>

                  <input
                    ref={fileInputRef}
                    id="resume-file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />

                  {resumeFileName ? (
                    <p className="mb-2 text-xs font-medium text-slate-500">
                      Selected file: {resumeFileName}
                    </p>
                  ) : null}

                  {extractError ? (
                    <div className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                      {extractError}
                    </div>
                  ) : null}
                </div>
              </div>

              {apiError ? (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {apiError}
                </div>
              ) : null}

              {limitNotice ? (
                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm font-semibold text-blue-800">
                  <span>{limitNotice}</span>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={checkAtsScore}
                  disabled={!resume.trim() || isExtracting || isChecking}
                  className="inline-flex items-center justify-center gap-2 !rounded-xl !bg-slate-950 !px-5 !py-3 text-sm font-bold !text-white !shadow-sm hover:!bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Target className="h-4 w-4" />
                  )}
                  {isChecking ? "Checking..." : "Check ATS Score"}
                </button>
                <button
                  type="button"
                  onClick={copyReport}
                  disabled={!result || !detailsAvailable}
                  className="inline-flex items-center justify-center gap-2 !rounded-xl !bg-slate-950 !px-5 !py-3 text-sm font-bold !text-white !shadow-sm hover:!bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Clipboard className="h-4 w-4" />
                  Copy report
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center justify-center gap-2 !rounded-xl !border !border-slate-200 !bg-white !px-5 !py-3 text-sm font-bold !text-slate-700 !shadow-sm hover:!bg-slate-50"
                >
                  <RefreshCw className="h-4 w-4" />
                  Clear
                </button>
              </div>

              {result ? (
                <>
                  {scoreCard}

                  {detailsAvailable ? (
                    <>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                            Keyword Match
                          </p>
                          <p className="mt-2 text-3xl font-black text-slate-950">
                            {result.keywordMatchPercent}
                            <span className="text-sm font-semibold text-slate-500">%</span>
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                            Bullet Points
                          </p>
                          <p className="mt-2 text-3xl font-black text-slate-950">{result.bulletCount}</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                            Metrics Used
                          </p>
                          <p className="mt-2 text-3xl font-black text-slate-950">{result.metricHits}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                            <BadgeCheck className="h-4 w-4 text-emerald-600" />
                            Section Coverage
                          </p>
                          <div className="space-y-3">
                            {(result.sections || []).map((item) => (
                              <div
                                key={item.key}
                                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2"
                              >
                                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                                <span
                                  className={`rounded-full px-2 py-1 text-xs font-bold ${
                                    item.pass
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {item.pass ? "Present" : "Missing"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                            <Target className="h-4 w-4 text-blue-600" />
                            ATS Improvement Tips
                          </p>
                          <ul className="space-y-3 text-sm text-slate-700">
                            {(result.suggestions || []).map((tip, index) => (
                              <li
                                key={`${tip}-${index}`}
                                className="rounded-2xl border border-slate-200 bg-white px-3 py-2"
                              >
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                            <FileSearch className="h-4 w-4 text-blue-600" />
                            Matched Keywords
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(result.matchedKeywords || []).length ? (
                              result.matchedKeywords.map((word) => (
                                <span
                                  key={word}
                                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                                >
                                  {word}
                                </span>
                              ))
                            ) : (
                              <p className="text-sm text-slate-600">No matched keywords returned yet.</p>
                            )}
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                            <FileSearch className="h-4 w-4 text-amber-600" />
                            Missing Keywords
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(result.missingKeywords || []).length ? (
                              result.missingKeywords.map((word) => (
                                <span
                                  key={word}
                                  className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                                >
                                  {word}
                                </span>
                              ))
                            ) : (
                              <p className="text-sm text-slate-600">No major missing keywords found.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm font-semibold text-blue-800">
                      Detailed ATS insights are premium-only.
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm font-semibold text-slate-600">
                  Upload resume and click Check ATS Score.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Complete ATS Resume Optimization Guide
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Long-form playbook to improve resume readability, keyword alignment, and interview probability.
          </p>
          <div className="mt-6 space-y-4">
            {ATS_GUIDE_SECTIONS.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-lg font-bold text-slate-950">{section.title}</h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {buildBulletPointsFromParagraphs(
                    ATS_LONGFORM_CONTENT.slice(section.from, section.to + 1),
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
            ATS Resume Checker FAQ
          </h2>
          <div className="mt-5 space-y-3">
            {ATS_FAQS.map((item, index) => (
              <details
                key={`ats-faq-${index}`}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4"
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
