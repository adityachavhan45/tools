import Razorpay from "razorpay";
import { getAtsPlan } from "../../../../lib/atsPlans";

function buildReceipt(planId, uid) {
  const safePlan = String(planId || "plan").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 12);
  const safeUid = String(uid || "guest").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 10);
  const receipt = `ats_${safePlan}_${safeUid}_${Date.now().toString(36)}`;
  return receipt.slice(0, 40);
}

export async function POST(request) {
  try {
    const { planId, uid, email, name } = await request.json();
    const plan = getAtsPlan(planId);

    if (!plan) {
      return Response.json({ error: "Invalid plan selected." }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return Response.json({ error: "Razorpay is not configured." }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: "INR",
      receipt: buildReceipt(plan.id, uid),
      notes: {
        uid: uid || "guest",
        email: email || "",
        name: name || "",
        planId: plan.id,
        planName: plan.name,
      },
    });

    return Response.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      order,
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        amount: plan.amount,
      },
      user: {
        email: email || "",
        name: name || email || "",
      },
    });
  } catch (error) {
    console.error("ATS Razorpay order error:", error);
    return Response.json(
      { error: error?.message || "Unable to create payment order." },
      { status: 500 }
    );
  }
}
