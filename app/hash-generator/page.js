import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Hash Generator Online — Free Hash Calculator for MD5, SHA1, SHA256",
  description:
    "Free Hash Generator online. Instantly generate secure hash values with MD5, SHA1, SHA256, SHA512, and more. Easy-to-use tool for developers, cybersecurity experts, students, and data integrity verification. Supports multiple algorithms and encoding formats.",
  slug: "/hash-generator",
  keywords:
    "hash generator, online hash calculator, hash function tool, cryptography tool, md5 generator, sha1 generator, sha256 generator, sha512 generator, password hash generator, online hashing tool, free hash converter, data integrity tool, generate hash online, text to hash converter, file hash calculator, secure hash algorithm, hash encoding tool, best online hash generator, quick hash generator, developer hash tool, string to hash converter, cryptographic hash function, hash value calculator, online encryption tool, hash verification tool, digital signature hash, security hash generator"
});

export default function Page() {
  return <ClientPage />;
}