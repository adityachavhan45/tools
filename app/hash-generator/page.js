import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Hash Generator Online - Free MD5, SHA1, SHA256, and SHA512 Calculator Tool",
  description:
    "Use this free Hash Generator online to instantly create secure hash values with MD5, SHA1, SHA256, SHA512, and more. Fast, accurate, and developer-friendly tool for encryption, password hashing, and data integrity verification.",
  slug: "/hash-generator",
  focusKeyword: "Hash Generator Online",
  keywords: [
    "hash generator",
    "hash generator online",
    "online hash calculator",
    "md5 hash generator",
    "sha1 hash generator",
    "sha256 hash generator",
    "sha512 hash generator",
    "hash function tool",
    "cryptography tool",
    "password hash generator",
    "generate hash online",
    "text to hash converter",
    "file hash calculator",
    "hash value generator",
    "data integrity tool",
    "hash encoding tool",
    "online hashing tool",
    "free hash converter",
    "secure hash algorithm tool",
    "best online hash generator",
    "developer hash calculator",
    "string to hash converter",
    "cryptographic hash function",
    "hash value calculator",
    "hash verification tool",
    "digital signature hash",
    "security hash generator",
    "hash algorithm online",
    "hash converter for developers",
    "generate md5 sha1 sha256 online",
    "online encryption and hashing tool"
  ],
});

export default function Page() {
  return <ClientPage />;
}
