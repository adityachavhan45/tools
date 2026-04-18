import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Images to PDF Online Free | Convert JPG and PNG to PDF Instantly",
  description:
    "Convert images to PDF instantly. Turn JPG and PNG files into a single PDF quickly with this free and easy to use online tool.",
  slug: "/images-to-pdf",
  focusKeyword: "images to pdf online",
  keywords: [
    "images to pdf",
    "images to pdf online",
    "jpg to pdf",
    "png to pdf",
    "convert images to pdf",
    "photo to pdf converter",
    "picture to pdf",
    "jpeg to pdf",
    "multiple images to pdf",
    "combine images into pdf",
    "convert photo into pdf",
    "create pdf from images",
    "merge images into pdf",
    "pdf maker from images",
    "online photo to pdf",
    "free image to pdf converter",
    "batch image to pdf",
    "convert jpg png to pdf"
  ],
});

export default function Page() {
  return <ClientPage />;
}