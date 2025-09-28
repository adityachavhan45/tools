import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Binary to Text — Convert Binary to Text Online",
  description:
    "Convert binary to text online. Free binary to text converter with encoding options and text formatting for data conversion and text processing.",
  slug: "/binary-to-text",
  keywords: ["binary to text", "convert binary", "text converter", "binary decoder"],
});

export default function Page() {
  return <ClientPage />;
}