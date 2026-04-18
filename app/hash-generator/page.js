import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Hash Generator Online Free | MD5, SHA1, SHA256, SHA512 Tool",
  description:
    "Generate secure hash values instantly using MD5, SHA1, SHA256, and SHA512. Fast and simple online hash generator for developers and data verification.",
  slug: "/hash-generator",
  focusKeyword: "hash generator online",
  keywords: [
    "hash generator",
    "hash generator online",
    "md5 hash generator",
    "sha1 hash generator",
    "sha256 hash generator",
    "sha512 hash generator",
    "online hash calculator",
    "generate hash online",
    "password hash generator",
    "string to hash converter",
    "file hash calculator",
    "hash value generator",
    "data integrity tool",
    "hash verification tool",
    "cryptographic hash function",
    "secure hash generator",
    "hash algorithm tool",
    "developer hash tool",
    "online hashing tool",
    "free hash generator"
  ],
});

export default function Page() {
  return <ClientPage />;
}