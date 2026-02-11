"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [mounted, setMounted] = useState(false);
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } else {
      setError("Invalid or expired reset link");
    }
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
            Reset Password ☕
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Choose a new password for your account
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                New Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b08968] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b08968] outline-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-[#7f5539] text-white py-2 rounded-lg font-semibold hover:bg-[#6f4e37]"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium">
              Password reset successful 🎉
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login...
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 text-[#7f5539] hover:underline"
            >
              Go to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
