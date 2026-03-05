"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

const ADMIN_AUTH_KEY = "admin_logged_in";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(ADMIN_AUTH_KEY) === "true";

    if (isLoggedIn) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const adminRef = collection(db, "adminuser");
      const adminQuery = query(
        adminRef,
        where("Email", "==", email.trim()),
        where("Password", "==", password)
      );

      const adminSnap = await getDocs(adminQuery);

      if (adminSnap.empty) {
        setError("Invalid email or password.");
        return;
      }

      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      router.push("/admin/dashboard");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md card-surface p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}
