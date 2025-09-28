import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Hash Generator — Generate Hash Values Online",
  description:
    "Generate hash values online. Free hash generator with multiple algorithms and encoding options for data security and cryptography.",
  slug: "/hash-generator",
  keywords: ["hash generator", "hash calculator", "hash function", "cryptography"],
});

export default function Page() {
  return <ClientPage />;
}