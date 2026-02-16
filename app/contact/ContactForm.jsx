"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }

    } catch (err) {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:border-indigo-500 text-gray-900 bg-white
            placeholder-gray-400 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:border-indigo-500 text-gray-900 bg-white
            placeholder-gray-400 transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="How can we help?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:border-indigo-500 text-gray-900 bg-white
            placeholder-gray-400 transition"
          />
        </div>

        {/* Status Message */}
        {status === "success" && (
          <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm border border-green-200">
            ✅ Message sent successfully. We will get back to you soon.
          </div>
        )}

        {status === "error" && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
            ❌ Something went wrong. Please try again later.
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center 
          px-6 py-3 rounded-lg 
          bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700
          text-white font-semibold shadow-lg 
          hover:shadow-xl hover:scale-[1.02]
          active:scale-[0.98]
          transition-all duration-200"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

      </div>
    </form>
  );
}
