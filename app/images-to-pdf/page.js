import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Images to PDF Online — Free JPG & PNG to PDF Converter",
  description:
    "Free Images to PDF Converter online. Instantly convert JPG, PNG, and other image formats into a single PDF file. Fast, secure, and easy-to-use tool for documents, assignments, office work, and professional use.",
  slug: "/images-to-pdf",
  keywords:
    "images to pdf, jpg to pdf, png to pdf, convert images to pdf, photo to pdf converter, picture to pdf, jpeg to pdf, multiple images to pdf, free pdf converter, online images to pdf tool, image file to pdf, make pdf from images, batch images to pdf, convert photo into pdf, create pdf from jpg, combine images into pdf, convert png into pdf, online picture to pdf converter, best images to pdf converter, photo to pdf online free, images to pdf fast, secure pdf converter"
});

export default function Page() {
  return <ClientPage />;
}