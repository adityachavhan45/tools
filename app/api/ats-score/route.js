import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { verifyFirebaseToken } from "../../../lib/firebaseAuth";
import {
  ATS_PREMIUM_COOKIE,
  buildAtsPremiumCookieHeader,
  verifyAtsPremiumCookieValue,
} from "../../../lib/atsEntitlement";
import { db } from "../../../lib/firebase/firebaseConfig";

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const ATS_FREE_LIMIT = 4;
const ATS_USAGE_COOKIE = "ats_free_usage";

function getCookieValue(request, name) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? cookie.slice(name.length + 1) : "";
}

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function getUsageFromCookie(request, userUid) {
  const secret = process.env.RAZORPAY_KEY_SECRET || process.env.SECRET_TOKEN || "";
  const cookieValue = getCookieValue(request, ATS_USAGE_COOKIE);
  if (!secret || !cookieValue) return { usedCount: 0 };

  const [encoded, signature] = cookieValue.split(".");
  if (!encoded || !signature) return { usedCount: 0 };

  const expected = sign(encoded, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return { usedCount: 0 };
  }

  try {
    const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (decoded?.uid !== userUid) {
      return { usedCount: 0 };
    }

    const usedCount = Number.isFinite(decoded?.usedCount)
      ? Math.max(0, decoded.usedCount)
      : 0;

    return { usedCount };
  } catch {
    return { usedCount: 0 };
  }
}

function buildUsageCookieHeader(payload) {
  const secret = process.env.RAZORPAY_KEY_SECRET || process.env.SECRET_TOKEN || "";
  if (!secret) return "";

  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded, secret);
  return `${ATS_USAGE_COOKIE}=${encoded}.${signature}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly`;
}

async function getPremiumAccess(request, user) {
  if (!user?.uid) {
    return null;
  }

  const cookieValue = getCookieValue(request, ATS_PREMIUM_COOKIE);
  const payload = verifyAtsPremiumCookieValue(
    cookieValue,
    process.env.RAZORPAY_KEY_SECRET
  );

  if (payload && payload.uid === user.uid) {
    return { ...payload, source: "cookie" };
  }

  try {
    const subscriptionsQuery = query(
      collection(db, "ats_subscriptions"),
      where("uid", "==", user.uid)
    );
    const snapshot = await getDocs(subscriptionsQuery);
    const now = Math.floor(Date.now() / 1000);

    let latestActiveSubscription = null;
    for (const subscriptionDoc of snapshot.docs) {
      const data = subscriptionDoc.data();
      const expiresAt = Number(data?.expiresAt || 0);

      if (!Number.isFinite(expiresAt) || expiresAt <= now) {
        continue;
      }

      if (!latestActiveSubscription || expiresAt > latestActiveSubscription.expiresAt) {
        latestActiveSubscription = {
          expiresAt,
          orderId: data?.orderId || "",
          paymentId: data?.paymentId || subscriptionDoc.id,
          planId: data?.planId,
          planName: data?.subscriptionName || data?.planName || "ATS Premium Plan",
          uid: user.uid,
        };
      }
    }

    if (!latestActiveSubscription) {
      return null;
    }

    return {
      uid: latestActiveSubscription.uid,
      planId: latestActiveSubscription.planId,
      planName: latestActiveSubscription.planName,
      paymentId: latestActiveSubscription.paymentId,
      orderId: latestActiveSubscription.orderId,
      exp: latestActiveSubscription.expiresAt,
      source: "db",
    };
  } catch (subscriptionLookupError) {
    console.error("ATS premium subscription lookup failed:", subscriptionLookupError);
    return null;
  }
}

function normalizeResult(payload) {
  const rawScore = Number(payload?.score);
  const score = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(100, Math.round(rawScore)))
    : 0;

  const level =
    typeof payload?.level === "string" && payload.level.trim()
      ? payload.level.trim()
      : score >= 80
        ? "Strong ATS-ready"
        : score >= 60
          ? "Good but can improve"
          : "Needs improvement";

  const toNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.round(number)) : 0;
  };

  const sections = Array.isArray(payload?.sections)
    ? payload.sections
        .map((item, index) => ({
          key:
            typeof item?.key === "string" && item.key.trim()
              ? item.key.trim().toLowerCase().replace(/\s+/g, "-")
              : `section-${index + 1}`,
          label:
            typeof item?.label === "string" && item.label.trim()
              ? item.label.trim()
              : `Section ${index + 1}`,
          pass: Boolean(item?.pass),
        }))
        .slice(0, 8)
    : [];

  const normalizeWords = (list) =>
    Array.isArray(list)
      ? list
          .filter((item) => typeof item === "string" && item.trim())
          .map((item) => item.trim().toLowerCase())
          .slice(0, 25)
      : [];

  const normalizeSuggestions = (list) =>
    Array.isArray(list)
      ? list
          .filter((item) => typeof item === "string" && item.trim())
          .map((item) => item.trim())
          .slice(0, 10)
      : [];

  return {
    score,
    level,
    wordCount: toNumber(payload?.wordCount),
    bulletCount: toNumber(payload?.bulletCount),
    metricHits: toNumber(payload?.metricHits),
    actionVerbHits: toNumber(payload?.actionVerbHits),
    keywordMatchPercent: Math.max(0, Math.min(100, toNumber(payload?.keywordMatchPercent))),
    sections,
    matchedKeywords: normalizeWords(payload?.matchedKeywords),
    missingKeywords: normalizeWords(payload?.missingKeywords),
    suggestions: normalizeSuggestions(payload?.suggestions),
  };
}

function buildPrompt(resumeText) {
  return `You are an ATS resume evaluator.
Evaluate the resume against ATS best practices.
Return only valid JSON with this exact schema:
{
  "score": number,
  "level": "Strong ATS-ready" | "Good but can improve" | "Needs improvement",
  "wordCount": number,
  "bulletCount": number,
  "metricHits": number,
  "actionVerbHits": number,
  "keywordMatchPercent": number,
  "sections": [
    { "key": "contact", "label": "Contact details", "pass": true },
    { "key": "summary", "label": "Summary / objective", "pass": true },
    { "key": "experience", "label": "Work experience", "pass": true },
    { "key": "education", "label": "Education", "pass": true },
    { "key": "skills", "label": "Skills", "pass": true }
  ],
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "suggestions": string[]
}
Rules:
- score and keywordMatchPercent must be 0 to 100.
- suggestions max 8.
- Keep values realistic from resume only.

Resume:\n${resumeText}`;
}

export async function POST(request) {
  try {
    const user = await verifyFirebaseToken(request);

    if (!user) {
      return Response.json(
        { error: "Please login to use ATS Resume Checker." },
        { status: 401 }
      );
    }

    const { resumeText } = await request.json();
    const resume = typeof resumeText === "string" ? resumeText.trim() : "";

    if (!resume) {
      return Response.json(
        { error: "Please upload a resume before checking ATS score." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const premiumAccess = await getPremiumAccess(request, user);
    const usage = getUsageFromCookie(request, user.uid);

    if (!premiumAccess && usage.usedCount >= ATS_FREE_LIMIT) {
      return Response.json(
        {
          error: "Free plan limit reached. Upgrade to ATS Premium for full detailed reports.",
          code: "FREE_LIMIT_REACHED",
          detailsAvailable: false,
          isPremium: false,
          freeLimit: ATS_FREE_LIMIT,
          remainingFreeChecks: 0,
        },
        { status: 429 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = buildPrompt(resume);
    const aiResponse = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(aiResponse.response.text().trim());
    const normalized = normalizeResult(parsed);

    if (!premiumAccess) {
      const nextUsedCount = usage.usedCount + 1;
      const remainingFreeChecks = Math.max(ATS_FREE_LIMIT - nextUsedCount, 0);

      const response = Response.json({
        result: {
          score: normalized.score,
          level: normalized.level,
        },
        detailsAvailable: false,
        isPremium: false,
        freeLimit: ATS_FREE_LIMIT,
        remainingFreeChecks,
      });

      const usageCookie = buildUsageCookieHeader({
        uid: user.uid,
        usedCount: nextUsedCount,
      });

      if (usageCookie) {
        response.headers.set("Set-Cookie", usageCookie);
      }

      return response;
    }

    const response = Response.json({
      result: normalized,
      detailsAvailable: true,
      isPremium: true,
      freeLimit: ATS_FREE_LIMIT,
      remainingFreeChecks: null,
    });

    if (premiumAccess.source === "db" && process.env.RAZORPAY_KEY_SECRET) {
      response.headers.append(
        "Set-Cookie",
        buildAtsPremiumCookieHeader(premiumAccess, process.env.RAZORPAY_KEY_SECRET)
      );
    }

    return response;
  } catch (error) {
    console.error("ATS score API error:", error);

    if (error?.status === 429) {
      return Response.json(
        { error: "Gemini quota limit reached. Please try again later." },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "Unable to check ATS score right now. Please try again." },
      { status: 500 }
    );
  }
}
