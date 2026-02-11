"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email.value,
      }),
    });

    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ede0d4] to-[#ddb892] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#5a3e2b]">
            Forgot Password 🔐
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            We’ll help you get back to your coffee ☕
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@huskyycoffee.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b08968] outline-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-[#7f5539] text-white py-2 rounded-lg font-semibold hover:bg-[#6f4e37] transition"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium">
              If this email exists, a reset link has been sent 📩
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 text-[#7f5539] hover:underline"
            >
              Back to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
