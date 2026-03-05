export async function uploadImageToCloudinary(file, folder = "convertixy/blogs") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/cloudinary/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || "Upload failed.");
  }

  return result;
}
