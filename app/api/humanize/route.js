import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { verifyFirebaseToken } from "../../../lib/firebaseAuth";
import {
  HUMANIZER_FREE_LIMIT,
  HUMANIZER_PRICING_PLANS,
  getHumanizerPlan,
} from "../../../lib/humanizerPlans";
import {
  HUMANIZER_PREMIUM_COOKIE,
  buildPremiumCookieHeader,
  verifyPremiumCookieValue,
} from "../../../lib/razorpayEntitlement";
import { db } from "../../../lib/firebase/firebaseConfig";

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const USAGE_COOKIE = "ai_humanizer_usage";

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
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

function getUsageFromCookie(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim().split("="))
      .filter(([key, value]) => key && value)
  );

  try {
    const usage = JSON.parse(decodeURIComponent(cookies[USAGE_COOKIE] || ""));
    const today = getTodayKey();

    if (usage?.date === today && Number.isFinite(usage?.used)) {
      return { date: today, used: Math.max(0, usage.used) };
    }
  } catch {
    // Ignore broken usage cookies and start a fresh daily counter.
  }

  return { date: getTodayKey(), used: 0 };
}

function createUsageCookie(usage) {
  const value = encodeURIComponent(JSON.stringify(usage));
  return `${USAGE_COOKIE}=${value}; Path=/; Max-Age=172800; SameSite=Lax; HttpOnly`;
}

function usagePayload(usage) {
  return {
    used: usage.used,
    limit: HUMANIZER_FREE_LIMIT,
    remaining: Math.max(HUMANIZER_FREE_LIMIT - usage.used, 0),
  };
}

function getCookieValue(request, name) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? cookie.slice(name.length + 1) : "";
}

async function getPremiumAccess(request, user) {
  if (!user?.uid) {
    return null;
  }

  const cookieValue = getCookieValue(request, HUMANIZER_PREMIUM_COOKIE);
  const payload = verifyPremiumCookieValue(
    cookieValue,
    process.env.RAZORPAY_KEY_SECRET
  );

  if (payload && payload.uid === user.uid) {
    return { ...payload, source: "cookie" };
  }

  try {
    const subscriptionsQuery = query(
      collection(db, "humanizer_subscriptions"),
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
          planName: data?.subscriptionName || data?.planName || "Premium Plan",
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
    console.error("Premium subscription lookup failed:", subscriptionLookupError);
    return null;
  }
}

function resolveHumanizerPlanFromEntitlement(premiumAccess) {
  if (!premiumAccess) return null;

  const byId = getHumanizerPlan(premiumAccess.planId);
  if (byId) return byId;

  const normalizedPlanName = String(premiumAccess.planName || "")
    .trim()
    .toLowerCase();
  if (!normalizedPlanName) return null;

  const byName = HUMANIZER_PRICING_PLANS.find(
    (plan) => String(plan.name || "").trim().toLowerCase() === normalizedPlanName
  );
  return byName || null;
}

export async function POST(request) {
  try {
    const user = await verifyFirebaseToken(request);

    if (!user) {
      return Response.json(
        { error: "Please login to use the AI Humanizer Tool." },
        { status: 401 }
      );
    }

    const { text } = await request.json();
    const input = typeof text === "string" ? text.trim() : "";
    const inputWords = countWords(input);
    const usage = getUsageFromCookie(request);
    const premiumAccess = await getPremiumAccess(request, user);
    const premiumPlan = resolveHumanizerPlanFromEntitlement(premiumAccess);
    const hasPremiumAccess = Boolean(premiumAccess && premiumPlan);
    const requestLimit = hasPremiumAccess
      ? premiumPlan.maxWordsPerRequest
      : HUMANIZER_FREE_LIMIT;

    if (!input) {
      return Response.json(
        { error: "Please enter text before humanizing." },
        { status: 400 }
      );
    }

    if (inputWords > requestLimit) {
      return Response.json(
        {
          error: premiumPlan
            ? `Your ${premiumPlan.name} allows up to ${requestLimit} words per request.`
            : `Free limit is ${HUMANIZER_FREE_LIMIT} words per day. Please upgrade for larger requests.`,
        },
        { status: 400 }
      );
    }

    if (!hasPremiumAccess && inputWords + usage.used > HUMANIZER_FREE_LIMIT) {
      return Response.json(
        {
          message: `You have ${Math.max(
            HUMANIZER_FREE_LIMIT - usage.used,
            0
          )} free words left today. Upgrade to Premium to humanize more text.`,
          usage: usagePayload(usage),
        },
        { status: 429 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `Rewrite the following text in a natural, human-like tone.
Use simple English, conversational style, and avoid robotic phrases.
Do not change the meaning.
Return only one rewritten version. Do not include headings, options, markdown, or explanations.

Text:
${input}`;

    const result = await model.generateContent(prompt);
    const output = result.response.text().trim();
    const updatedUsage = {
      ...usage,
      used: hasPremiumAccess ? usage.used : usage.used + inputWords,
    };
    const response = Response.json({
      text: output,
      usage: usagePayload(updatedUsage),
      premium: hasPremiumAccess
        ? {
            planId: premiumAccess.planId,
            name: premiumPlan?.name || "Premium Plan",
            maxWordsPerRequest: requestLimit,
          }
        : null,
    });

    if (!hasPremiumAccess) {
      response.headers.set("Set-Cookie", createUsageCookie(updatedUsage));
    } else if (premiumAccess.source === "db" && process.env.RAZORPAY_KEY_SECRET) {
      response.headers.append(
        "Set-Cookie",
        buildPremiumCookieHeader(premiumAccess, process.env.RAZORPAY_KEY_SECRET)
      );
    }
    return response;
  } catch (error) {
    console.error("Humanize API error:", error);

    if (error?.status === 429) {
      return Response.json(
        { error: "Gemini quota limit reached. Please try again later." },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "Unable to humanize text right now. Please try again." },
      { status: 500 }
    );
  }
}
