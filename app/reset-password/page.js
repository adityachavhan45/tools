import { Suspense } from "react";
import ClientPage from "./ClientPage";

export const metadata = {
  title: "Reset Password",
  description: "Reset your Convertixy account password securely.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
              <p className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                Loading reset password page...
              </p>
            </div>
          </div>
        </section>
      }
    >
      <ClientPage />
    </Suspense>
  );
}
