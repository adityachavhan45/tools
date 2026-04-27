"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth } from "../../lib/firebase/firebaseConfig";

function getErrorMessage(error) {
  const code = error?.code || "";

  if (code === "auth/expired-action-code") {
    return "This reset link has expired. Please request a new password reset email.";
  }

  if (code === "auth/invalid-action-code") {
    return "This reset link is invalid or already used. Please request a new one.";
  }

  if (code === "auth/weak-password") {
    return "Password is too weak. Use at least 6 characters.";
  }

  return error?.message || "Something went wrong. Please try again.";
}

export default function ResetPasswordClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [accountEmail, setAccountEmail] = useState("");

  const oobCode = useMemo(() => searchParams.get("oobCode") || "", [searchParams]);

  useEffect(() => {
    let active = true;

    async function validateCode() {
      if (!oobCode) {
        if (active) {
          setError("Reset link is missing required information.");
          setLoading(false);
        }
        return;
      }

      try {
        const email = await verifyPasswordResetCode(auth, oobCode);

        if (!active) {
          return;
        }

        setAccountEmail(email || "");
        setError("");
      } catch (verifyError) {
        if (!active) {
          return;
        }

        setError(getErrorMessage(verifyError));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    validateCode();

    return () => {
      active = false;
    };
  }, [oobCode]);

  const canSubmit = !loading && !error && !submitting;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    if (!oobCode) {
      setError("Reset link is invalid. Please request a new one.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password reset successful. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              {accountEmail
                ? `Create a new password for ${accountEmail}`
                : "Create a new password for your account."}
            </p>
          </div>

          {loading ? (
            <p className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Verifying reset link...
            </p>
          ) : null}

          {error ? (
            <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </p>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter new password"
                required
                minLength={6}
                disabled={!canSubmit}
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Re-enter new password"
                required
                minLength={6}
                disabled={!canSubmit}
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Updating password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
