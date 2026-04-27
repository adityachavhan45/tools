export const HUMANIZER_FREE_LIMIT = 400;
export const HUMANIZER_PREMIUM_STORAGE_KEY = "ai-humanizer-premium";

export const HUMANIZER_PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter Plan",
    badge: "Most Popular",
    price: "₹299",
    amount: 29900,
    period: "/ month",
    audience: "Best for students & bloggers",
    highlight: "Only ₹10/day",
    featured: true,
    maxWordsPerRequest: 1000,
    monthlyTokens: "~300K tokens/month",
    features: [
      "Up to ~300K tokens/month",
      "1000 words per request",
      "Faster response",
      "Better quality rewriting",
      "Unlimited uses (fair usage)",
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    badge: "Best Value Plan",
    price: "₹699",
    amount: 69900,
    period: "/ month",
    audience: "Best for regular & serious users",
    highlight: "Best Value Plan",
    featured: false,
    maxWordsPerRequest: 1500,
    monthlyTokens: "~600K tokens/month",
    features: [
      "Up to ~600K tokens/month",
      "1500 words per request",
      "AI detection optimization",
      "No ads",
    ],
  },
  {
    id: "ultimate",
    name: "Ultimate Plan",
    badge: "For Heavy Users",
    price: "₹999",
    amount: 99900,
    period: "/ month",
    audience: "Best for professionals & heavy users",
    highlight: "Priority support included",
    featured: false,
    maxWordsPerRequest: 2000,
    monthlyTokens: "~1M tokens/month",
    features: [
      "Up to ~1M tokens/month",
      "2000 words per request",
      "Premium rewriting quality",
      "Bulk text processing",
      "Priority support",
    ],
  },
];

export function getHumanizerPlan(planId) {
  return HUMANIZER_PRICING_PLANS.find((plan) => plan.id === planId) || null;
}

export function getValidatedPremiumFromStorage(user) {
  if (!user || typeof window === "undefined") {
    return null;
  }

  try {
    const storedPremium = JSON.parse(
      window.localStorage.getItem(HUMANIZER_PREMIUM_STORAGE_KEY) || "null"
    );

    const isValid =
      storedPremium?.uid === user.uid &&
      Number.isFinite(storedPremium?.expiresAt) &&
      storedPremium.expiresAt * 1000 > Date.now();

    if (isValid) {
      return storedPremium;
    }

    window.localStorage.removeItem(HUMANIZER_PREMIUM_STORAGE_KEY);
    return null;
  } catch {
    window.localStorage.removeItem(HUMANIZER_PREMIUM_STORAGE_KEY);
    return null;
  }
}
