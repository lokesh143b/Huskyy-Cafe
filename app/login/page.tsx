"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Spinner from "@/components/Spinner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value.trim();

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <>
      {/* ✅ CENTER LOADER */}
      {loading && <Spinner />}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ede0d4] to-[#ddb892] px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#5a3e2b]">
              Huskyy Coffee ☕
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Login to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                disabled={loading}
                required
                placeholder="you@huskyycoffee.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b08968] disabled:bg-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b08968] pr-10 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-[#7f5539] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button (TEXT ONLY) */}
            <motion.button
              whileHover={{ scale: !loading ? 1.03 : 1 }}
              whileTap={{ scale: !loading ? 0.97 : 1 }}
              disabled={loading}
              className="w-full bg-[#7f5539] text-white py-2 rounded-lg font-semibold hover:bg-[#6f4e37] transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#7f5539] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
