import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const rawPublicIds = Array.isArray(body?.publicIds) ? body.publicIds : [];
    const publicIds = [...new Set(rawPublicIds.map((id) => String(id).trim()).filter(Boolean))];

    if (publicIds.length === 0) {
      return NextResponse.json({ deleted: [], skipped: [] });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary environment variables are missing." },
        { status: 500 }
      );
    }

    const deleted = [];
    const skipped = [];
    const failed = [];

    for (const publicId of publicIds) {
      const timestamp = Math.floor(Date.now() / 1000);
      const signaturePayload = `invalidate=true&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");

      const params = new URLSearchParams({
        public_id: publicId,
        api_key: apiKey,
        timestamp: String(timestamp),
        invalidate: "true",
        signature,
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        }
      );

      const result = await response.json();
      const status = result?.result;

      if (!response.ok) {
        failed.push(publicId);
        continue;
      }

      if (status === "ok") {
        deleted.push(publicId);
      } else if (status === "not found") {
        skipped.push(publicId);
      } else {
        failed.push(publicId);
      }
    }

    if (failed.length > 0) {
      return NextResponse.json(
        { error: "Some Cloudinary images could not be deleted.", failed, deleted, skipped },
        { status: 400 }
      );
    }

    return NextResponse.json({ deleted, skipped });
  } catch {
    return NextResponse.json({ error: "Cloudinary delete failed." }, { status: 500 });
  }
}
