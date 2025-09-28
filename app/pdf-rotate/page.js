import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Rotate — Rotate PDF Pages Online",
  description:
    "Rotate PDF pages online. Free PDF rotation tool with 90°, 180°, 270° options and batch processing for document orientation and viewing.",
  slug: "/pdf-rotate",
  keywords: ["pdf rotate", "rotate pdf", "pdf orientation", "pdf pages"],
});

export default function Page() {
  return <ClientPage />;
}