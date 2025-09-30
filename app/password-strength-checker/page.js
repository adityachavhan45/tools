import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Password Strength Checker Online — Free Secure Password Testing Tool",
  description:
    "Free Password Strength Checker online. Instantly check how strong and secure your password is with detailed analysis, scoring, and security recommendations. Useful tool for personal security, developers, and online account protection.",
  slug: "/password-strength-checker",
  keywords:
    "password strength checker, password security, password checker, password analysis, password validation, check password strength, strong password checker, secure password tool, free password strength test, online password analyzer, password security checker, best password strength tool, password score checker, password safety tool, password quality checker, validate password online, password testing tool, online security password checker, password protection tool, password strength meter"
});

export default function Page() {
  return <ClientPage />;
}