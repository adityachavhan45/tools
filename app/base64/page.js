import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Base64 Encoder/Decoder",
  description:
    "Encode or decode Base64 text and files directly in your browser.",
  slug: "/base64",
  keywords: ["base64", "base64 encode", "base64 decode"],
});

export default function Page() {
  return <ClientPage />;
}

