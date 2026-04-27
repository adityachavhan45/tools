import crypto from "crypto";

export const ATS_PREMIUM_COOKIE = "ats_premium";
const PREMIUM_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

export function createAtsPremiumCookieValue(payload, secret) {
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encoded, secret);
  return `${encoded}.${signature}`;
}

export function verifyAtsPremiumCookieValue(cookieValue, secret) {
  if (!cookieValue || !secret) return null;

  const [encoded, signature] = cookieValue.split(".");
  if (!encoded || !signature) return null;

  const expected = sign(encoded, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encoded));
    if (!payload?.exp || payload.exp * 1000 <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function buildAtsPremiumCookieHeader(payload, secret) {
  const value = createAtsPremiumCookieValue(payload, secret);
  return `${ATS_PREMIUM_COOKIE}=${value}; Path=/; Max-Age=${PREMIUM_COOKIE_MAX_AGE}; SameSite=Lax; HttpOnly`;
}
