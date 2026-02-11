"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditProductModal from "./EditProductModal";

export default function AllProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null); // Track deletion

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    setDeletingId(id); // show spinner for this card
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Update product after edit
  const handleUpdated = (updated: any) => {
    if (!updated?._id) return;
    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-amber-400" size={32} />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex flex-col shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-lg font-semibold text-amber-300">
                {product.name}
              </h3>

              <p className="text-gray-400">₹ {product.price}</p>

              <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                {product.description}
              </p>

              <div className="flex gap-3 mt-auto pt-4">
                <button
                  onClick={() => setEditing(product)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition disabled:opacity-70"
                  disabled={deletingId === product._id}
                >
                  {deletingId === product._id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Trash size={16} />
                  )}
                  {deletingId === product._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {editing && (
        <EditProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onUpdated={handleUpdated}
        />
      )}
    </>
  );
}
