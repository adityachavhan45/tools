import AuthForm from "../components/AuthForm";

export const metadata = {
  title: "Login",
  description: "Login or register your Convertixy account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AuthForm />;
}
