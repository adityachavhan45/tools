import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Password Strength Checker — Check Password Security Online",
  description:
    "Check password strength and security online. Free password strength checker with analysis and recommendations support.",
  slug: "/password-strength-checker",
  keywords: ["password strength", "password security", "password checker", "password analysis", "password validation"],
});

export default function Page() {
  return <ClientPage />;
}