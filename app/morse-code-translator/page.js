import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Morse Code Translator — Translate Morse Code Online",
  description:
    "Translate Morse code online. Free Morse code translator with encoding and decoding options for communication and cryptography.",
  slug: "/morse-code-translator",
  keywords: ["morse code", "morse translator", "morse decoder", "morse encoder"],
});

export default function Page() {
  return <ClientPage />;
}