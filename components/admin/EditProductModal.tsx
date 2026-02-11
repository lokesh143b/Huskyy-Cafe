"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle, X } from "lucide-react";

const CATEGORIES = ["Coffee", "Tea", "Pastries", "Cakes", "Sandwiches" , "Others"];

export default function EditProductModal({
  product,
  onClose,
  onUpdated,
}: any) {
  const [form, setForm] = useState({
    name: product.name || "",
    price: product.price || "",
    origin: product.origin || "",
    roast: product.roast || "",
    aroma: product.aroma || "",
    strength: product.strength || "",
    description: product.description || "",
    category: product.category || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      setLoading(true);

      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      onUpdated(updated);
      setSuccess(true);

      setTimeout(onClose, 800);
    } catch {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9 }}
          className="bg-zinc-900 border border-white/20 rounded-2xl p-6 w-full max-w-5xl"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-amber-400">
              Edit Product ✏️
            </h2>
            <button onClick={onClose}>
              <X className="text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* STATUS */}
          <AnimatePresence>
            {error && (
              <motion.div className="mb-4 flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-3 rounded-lg">
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            {success && (
              <motion.div className="mb-4 flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-3 rounded-lg">
                <CheckCircle size={18} /> Product updated successfully
              </motion.div>
            )}
          </AnimatePresence>

          {/* FORM */}
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <AnimatedInput label="Name" name="name" value={form.name} onChange={handleChange} />
            <AnimatedInput label="Price" name="price" value={form.price} onChange={handleChange} />
            <AnimatedInput label="Origin" name="origin" value={form.origin} onChange={handleChange} />
            <AnimatedInput label="Roast" name="roast" value={form.roast} onChange={handleChange} />
            <AnimatedInput label="Aroma" name="aroma" value={form.aroma} onChange={handleChange} />
            <AnimatedInput label="Strength" name="strength" value={form.strength} onChange={handleChange} />

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="
                  w-full rounded-lg
                  bg-black/40 border border-white/20
                  p-3 outline-none
                  focus:ring-2 focus:ring-amber-400
                "
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-300 mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="
                  w-full h-28 rounded-lg
                  bg-black/40 border border-white/20
                  p-3 outline-none
                  focus:ring-2 focus:ring-amber-400
                "
              />
            </div>

            {/* ACTIONS */}
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </button>

              <motion.button
                whileHover={!loading ? { scale: 1.05 } : {}}
                disabled={loading}
                className="
                  bg-amber-400 text-black
                  px-8 py-3 rounded-xl font-semibold
                  disabled:opacity-70
                "
              >
                {loading && <Loader2 className="animate-spin inline mr-2" />}
                {loading ? "Updating..." : "Update Product"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- INPUT ---------- */
function AnimatedInput({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-gray-300 mb-1 block">{label}</label>
      <input
        {...props}
        className="
          w-full rounded-lg
          bg-black/40 border border-white/20
          p-3 outline-none
          focus:ring-2 focus:ring-amber-400
        "
      />
    </div>
  );
}
