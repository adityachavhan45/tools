import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Rotate Online — Free Tool to Rotate PDF Pages Instantly",
  description:
    "Free PDF Rotate tool online. Instantly rotate PDF pages by 90°, 180°, or 270° with batch processing support. Fast, secure, and easy-to-use PDF page rotator for students, professionals, and businesses. Works directly in your browser without uploads.",
  slug: "/pdf-rotate",
  keywords:
    "pdf rotate, rotate pdf, pdf orientation, rotate pdf pages, pdf page rotator, free pdf rotate tool, online pdf rotation, rotate pdf online free, batch pdf rotate, rotate pdf 90 degrees, rotate pdf 180 degrees, rotate pdf 270 degrees, pdf editing tool, change pdf orientation, pdf page rotation tool, rotate multiple pdfs, secure pdf rotator, fast pdf rotate tool, rotate pdf without software, instant pdf rotation"
});

export default function Page() {
  return <ClientPage />;
}