import crypto from "crypto";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { buildAtsPremiumCookieHeader } from "../../../../lib/atsEntitlement";
import { getAtsPlan } from "../../../../lib/atsPlans";
import { db } from "../../../../lib/firebase/firebaseConfig";

export async function POST(request) {
  try {
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      planId,
      uid,
      email,
      name,
    } = await request.json();

    const plan = getAtsPlan(planId);
    if (!plan || !orderId || !paymentId || !signature) {
      return Response.json({ error: "Invalid payment payload." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      !process.env.RAZORPAY_KEY_SECRET ||
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return Response.json({ error: "Payment verification failed." }, { status: 400 });
    }

    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
    const entitlement = {
      uid: uid || "guest",
      planId: plan.id,
      planName: plan.name,
      paymentId,
      orderId,
      exp: expiresAt,
    };

    try {
      await setDoc(doc(collection(db, "ats_subscriptions"), paymentId), {
        uid: uid || "guest",
        name: name || email || "Guest User",
        email: email || "",
        planId: plan.id,
        subscriptionName: plan.name,
        paymentId,
        orderId,
        expiresAt,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (subscriptionError) {
      console.error("Failed to persist ATS subscription:", subscriptionError);
    }

    const response = Response.json({
      success: true,
      plan: {
        id: plan.id,
        name: plan.name,
      },
      entitlement: {
        planId: plan.id,
        planName: plan.name,
        expiresAt,
      },
    });

    response.headers.set(
      "Set-Cookie",
      buildAtsPremiumCookieHeader(entitlement, process.env.RAZORPAY_KEY_SECRET || "")
    );

    return response;
  } catch (error) {
    console.error("ATS Razorpay verify error:", error);
    return Response.json(
      { error: error?.message || "Unable to verify payment." },
      { status: 500 }
    );
  }
}
