import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "JPG to PNG — Convert JPG to PNG Online",
  description:
    "Convert JPG to PNG online. Free JPG to PNG converter with quality options and batch processing for image format conversion and transparency support.",
  slug: "/jpg-to-png",
  keywords: ["jpg to png", "convert jpg", "png converter", "image converter"],
});

export default function Page() {
  return <ClientPage />;
}