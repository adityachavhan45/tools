import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

const ALLOWED_FOLDERS = new Set([
  "convertixy/blog-feature",
  "convertixy/blog-content",
  "convertixy/ads",
]);
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") || "").toString();

    if (!(file instanceof Blob) || file.size === 0) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json({ error: "Image must be 10 MB or smaller." }, { status: 400 });
    }

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: "Invalid image folder." }, { status: 400 });
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

    const timestamp = Math.floor(Date.now() / 1000);
    const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", String(timestamp));
    cloudinaryFormData.append("folder", folder);
    cloudinaryFormData.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData,
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result?.error?.message || "Cloudinary upload failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch {
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
  }
}
