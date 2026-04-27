export const ATS_PREMIUM_STORAGE_KEY = "ats-premium";

export const ATS_PRICING_PLAN = {
  id: "ats-premium-149",
  name: "ATS Premium Plan",
  badge: "Most Popular",
  price: "₹149",
  amount: 14900,
  period: "/ 30 days",
  highlight: "Unlock full ATS report",
  features: [
    "Unlimited ATS checks",
    "Full section coverage report",
    "ATS improvement tips",
    "Matched and missing keywords",
  ],
};

export function getAtsPlan(planId) {
  return planId === ATS_PRICING_PLAN.id ? ATS_PRICING_PLAN : null;
}

export function getValidatedAtsPremiumFromStorage(user) {
  if (!user || typeof window === "undefined") {
    return null;
  }

  try {
    const storedPremium = JSON.parse(
      window.localStorage.getItem(ATS_PREMIUM_STORAGE_KEY) || "null"
    );

    const isValid =
      storedPremium?.uid === user.uid &&
      Number.isFinite(storedPremium?.expiresAt) &&
      storedPremium.expiresAt * 1000 > Date.now();

    if (isValid) {
      return storedPremium;
    }

    window.localStorage.removeItem(ATS_PREMIUM_STORAGE_KEY);
    return null;
  } catch {
    window.localStorage.removeItem(ATS_PREMIUM_STORAGE_KEY);
    return null;
  }
}
