import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF to Image Converter Online — Free Tool to Convert PDF to JPG & PNG",
  description:
    "Free PDF to Image Converter online. Instantly convert PDF pages into high-quality JPG or PNG images. Fast, secure, and easy-to-use tool for students, professionals, and business use. Works directly in your browser with no uploads required.",
  slug: "/pdf-to-image",
  keywords:
    "pdf to image, pdf to png, pdf to jpg, convert pdf, pdf to image converter, pdf to jpg online, pdf to png online, convert pdf to pictures, extract images from pdf, free pdf to image tool, online pdf converter, pdf to photo, pdf pages to jpg, pdf to image high quality, pdf to image free, secure pdf to image converter, best pdf to jpg tool, pdf to png converter online, instant pdf to image, pdf image extractor"
});

export default function Page() {
  return <ClientPage />;
}