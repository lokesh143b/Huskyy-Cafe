"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-white">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl px-12 py-10 shadow-2xl text-center border border-white/10"
      >
        {/* Rotating coffee */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="text-6xl mb-6"
        >
          ☕
        </motion.div>

        <p className="text-2xl font-serif font-semibold text-amber-400">
          Brewing your coffee
        </p>

        <p className="text-sm text-gray-300 mt-2 tracking-wide">
          Please wait a moment…
        </p>
      </motion.div>
    </div>
  );
}
