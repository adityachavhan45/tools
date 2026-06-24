const CLOUDINARY_HOST = "res.cloudinary.com";

export function extractCloudinaryPublicId(value, expectedCloudName = "") {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.hostname !== CLOUDINARY_HOST) return null;

    const pathParts = url.pathname.split("/").filter(Boolean);
    const [cloudName, resourceType, deliveryType] = pathParts;

    if (
      !cloudName ||
      (expectedCloudName && cloudName !== expectedCloudName) ||
      resourceType !== "image" ||
      deliveryType !== "upload"
    ) {
      return null;
    }

    const versionIndex = pathParts.findIndex((part, index) => index >= 3 && /^v\d+$/.test(part));
    if (versionIndex === -1 || versionIndex === pathParts.length - 1) return null;

    const publicIdWithExtension = pathParts.slice(versionIndex + 1).join("/");
    const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
    return decodeURIComponent(
      lastDotIndex === -1
        ? publicIdWithExtension
        : publicIdWithExtension.slice(0, lastDotIndex)
    );
  } catch {
    return null;
  }
}

export function collectCloudinaryPublicIds(blog, expectedCloudName = "") {
  const ids = new Set();
  const featureImageId = extractCloudinaryPublicId(blog?.featureImage, expectedCloudName);
  if (featureImageId) ids.add(featureImageId);

  const contentImageMatches =
    blog?.content?.match(/https?:\/\/res\.cloudinary\.com\/[^\s"'<>]+/g) || [];

  for (const imageUrl of contentImageMatches) {
    const publicId = extractCloudinaryPublicId(imageUrl, expectedCloudName);
    if (publicId) ids.add(publicId);
  }

  return [...ids];
}

export function getRemovedCloudinaryPublicIds(previousBlog, nextBlog, expectedCloudName = "") {
  const previousIds = collectCloudinaryPublicIds(previousBlog, expectedCloudName);
  const nextIds = new Set(collectCloudinaryPublicIds(nextBlog, expectedCloudName));
  return previousIds.filter((publicId) => !nextIds.has(publicId));
}

export async function deleteCloudinaryImages(publicIds) {
  const uniqueIds = [...new Set(publicIds.filter(Boolean))];
  if (uniqueIds.length === 0) return;

  const response = await fetch("/api/cloudinary/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicIds: uniqueIds }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.error || "Cloudinary image cleanup failed.");
  }
}
