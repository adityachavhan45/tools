import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "URL Encoder/Decoder",
  description:
    "Encode or decode URLs (percent-encoding) safely. Simple, fast, and private.",
  slug: "/url-encoder",
  keywords: ["url encoder", "url decoder", "percent encoding"],
});

export default function Page() {
  return <ClientPage />;
}

