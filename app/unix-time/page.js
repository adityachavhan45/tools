import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Unix Time Converter — Epoch to Human Date",
  description:
    "Convert Unix timestamp to human-readable date and vice versa. Works offline once loaded.",
  slug: "/unix-time",
  keywords: ["unix time", "epoch converter", "timestamp"],
});

export default function Page() {
  return <ClientPage />;
}

