import { createVerify } from "crypto";

const FIREBASE_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

let cachedFirebaseCerts = null;
let cachedFirebaseCertsUntil = 0;

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

async function getFirebaseCerts() {
  if (cachedFirebaseCerts && cachedFirebaseCertsUntil > Date.now()) {
    return cachedFirebaseCerts;
  }

  const response = await fetch(FIREBASE_CERTS_URL);
  const cacheControl = response.headers.get("cache-control") || "";
  const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1] || 3600);

  cachedFirebaseCerts = await response.json();
  cachedFirebaseCertsUntil = Date.now() + maxAge * 1000;

  return cachedFirebaseCerts;
}

export async function verifyFirebaseToken(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) return null;

  const [encodedHeader, encodedPayload, signature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !signature) return null;

  try {
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const certs = await getFirebaseCerts();
    const cert = certs[header.kid];
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    if (!cert || !projectId) return null;

    const verifier = createVerify("RSA-SHA256");
    verifier.update(`${encodedHeader}.${encodedPayload}`);
    verifier.end();

    const isValidSignature = verifier.verify(cert, signature, "base64url");
    const isValidPayload =
      isValidSignature &&
      payload.aud === projectId &&
      payload.iss === `https://securetoken.google.com/${projectId}` &&
      payload.sub &&
      payload.exp * 1000 > Date.now();

    if (!isValidPayload) {
      return null;
    }

    const uid =
      (typeof payload.user_id === "string" && payload.user_id) ||
      (typeof payload.sub === "string" && payload.sub) ||
      null;

    if (!uid) {
      return null;
    }

    return {
      ...payload,
      uid,
    };
  } catch {
    return null;
  }
}
