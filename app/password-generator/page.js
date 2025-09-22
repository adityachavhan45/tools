import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Password Generator — Strong Random Passwords",
  description:
    "Generate strong random passwords with custom length and character sets. Local and secure.",
  slug: "/password-generator",
  keywords: ["password generator", "strong passwords", "random password"],
});

export default function Page() {
  return <ClientPage />;
}

