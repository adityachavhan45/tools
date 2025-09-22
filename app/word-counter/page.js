import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Word Counter — Count Words & Characters",
  description:
    "Count words, characters, and lines in text. Live counts in your browser.",
  slug: "/word-counter",
  keywords: ["word counter", "character count", "text analysis"],
});

export default function Page() {
  return <ClientPage />;
}

