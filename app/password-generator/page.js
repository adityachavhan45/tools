import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Password Generator Online — Free Strong & Secure Random Password Tool",
  description:
    "Free Password Generator online. Instantly generate strong, secure, and random passwords with custom length, symbols, numbers, and character sets. Perfect for online accounts, security, developers, and personal data protection.",
  slug: "/password-generator",
  keywords:
    "password generator, strong passwords, random password, secure password generator, free password generator, online password tool, generate random password, strong random password generator, best password generator, custom password generator, password creator, random password tool, complex password generator, secure online password, instant password generator, password generator with symbols, long password generator, password security tool, create random password, generate safe password, hacker proof password generator"
});

export default function Page() {
  return <ClientPage />;
}