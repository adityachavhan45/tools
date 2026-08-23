import { redirect } from "next/navigation";

export const metadata = {
  title: "Register",
  description: "Create a Convertixy account for premium access and account management.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  redirect("/login");
}
