export const SEO_AUDIT_PREMIUM_STORAGE_KEY = "seo-audit-premium";

export const SEO_AUDIT_FREE_LIMIT = 1;

export const SEO_AUDIT_PRICING_PLAN = {
  id: "seo-audit-premium-699",
  name: "SEO Audit Premium",
  badge: "Agency Ready",
  price: "₹499",
  amount: 49900,
  period: "/ month",
  highlight: "Manual + AI hybrid audit",
  features: [
    "Unlimited website audits",
    "Manual technical checks",
    "AI strategic recommendations",
    "Priority audit depth",
    "Executive-ready issue breakdown",
  ],
};

export function getSeoAuditPlan(planId) {
  return planId === SEO_AUDIT_PRICING_PLAN.id ? SEO_AUDIT_PRICING_PLAN : null;
}

export function getValidatedSeoAuditPremiumFromStorage(user) {
  if (!user || typeof window === "undefined") {
    return null;
  }

  try {
    const storedPremium = JSON.parse(
      window.localStorage.getItem(SEO_AUDIT_PREMIUM_STORAGE_KEY) || "null"
    );

    const isValid =
      storedPremium?.uid === user.uid &&
      Number.isFinite(storedPremium?.expiresAt) &&
      storedPremium.expiresAt * 1000 > Date.now();

    if (isValid) {
      return storedPremium;
    }

    window.localStorage.removeItem(SEO_AUDIT_PREMIUM_STORAGE_KEY);
    return null;
  } catch {
    window.localStorage.removeItem(SEO_AUDIT_PREMIUM_STORAGE_KEY);
    return null;
  }
}
