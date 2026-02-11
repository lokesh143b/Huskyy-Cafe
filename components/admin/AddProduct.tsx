"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const defaultCategories = ["Coffee", "Tea", "Pastries", "Cakes", "Sandwiches" , "Others"];

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    origin: "",
    roast: "",
    aroma: "",
    strength: "",
    description: "",
    category: defaultCategories[0],
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.name || !form.price) {
      setError("Name and Price are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      setForm({
        name: "",
        price: "",
        origin: "",
        roast: "",
        aroma: "",
        strength: "",
        description: "",
        category: defaultCategories[0],
        image: "",
      });

      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 max-w-5xl mx-auto"
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-6 text-amber-400">
        Add New Coffee ☕
      </h2>

      {/* STATUS MESSAGES */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-3 rounded-lg"
          >
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-3 rounded-lg"
          >
            <CheckCircle size={18} /> Product added successfully
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatedInput label="Name" name="name" value={form.name} onChange={handleChange} />
        <AnimatedInput label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
        <AnimatedInput label="Origin" name="origin" value={form.origin} onChange={handleChange} />
        <AnimatedInput label="Roast" name="roast" value={form.roast} onChange={handleChange} />
        <AnimatedInput label="Aroma" name="aroma" value={form.aroma} onChange={handleChange} />
        <AnimatedInput label="Strength" name="strength" value={form.strength} onChange={handleChange} />

        {/* CATEGORY SELECT */}
        <motion.div whileFocus={{ scale: 1.01 }}>
          <label className="text-sm text-gray-300 mb-1 block">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg bg-black/40 border border-white/20 p-3 outline-none focus:ring-2 focus:ring-amber-400"
          >
            {defaultCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        <AnimatedInput label="Image URL" name="image" value={form.image} onChange={handleChange} />

        <motion.div whileFocus={{ scale: 1.01 }} className="sm:col-span-2">
          <label className="text-sm text-gray-300 mb-1 block">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full h-28 rounded-lg bg-black/40 border border-white/20 p-3 outline-none focus:ring-2 focus:ring-amber-400"
          />
        </motion.div>

        <div className="sm:col-span-2">
          <motion.button
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-400 text-black px-8 py-3 rounded-xl font-semibold disabled:opacity-70"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Adding..." : "Add Product"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

function AnimatedInput({ label, ...props }: any) {
  return (
    <div className="transition focus-within:scale-[1.02]">
      <label className="text-sm text-gray-300 mb-1 block">{label}</label>
      <input {...props} className="w-full rounded-lg bg-black/40 border border-white/20 p-3 outline-none focus:ring-2 focus:ring-amber-400" />
    </div>
  );
}
