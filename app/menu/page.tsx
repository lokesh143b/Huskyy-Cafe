"use client";

import Loader from "@/components/Loaders/Loader";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  origin: string;
  roast: string;
  aroma: string;
  strength: string;
  description: string;
  category: string;
  image: string;
}

const categories = [
  "Coffee",
  "Tea",
  "Pastries",
  "Cakes",
  "Sandwiches",
  "Others",
];

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-16 text-white overflow-hidden">
      {/* Luxury lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black -z-10" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-serif mb-4">
          Our Signature Menu
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Crafted moments, slow brews & unforgettable flavors
        </p>
      </motion.div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto space-y-24">
        {categories.map((category) => {
          const categoryItems = products.filter(
            (product) =>
              product.category.toLowerCase() === category.toLowerCase(),
          );

          if (categoryItems.length === 0) return null;

          return (
            <div key={category}>
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-serif mb-10 text-amber-400"
              >
                {category}
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categoryItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    onClick={() => router.push(`/menu/${item._id}`)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -12 }}
                    className="group relative rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition cursor-pointer"
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-3xl bg-amber-400/0 group-hover:bg-amber-400/10 transition" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-4xl mb-4">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        ) : (
                          "☕"
                        )}
                      </div>

                      <h3 className="text-xl font-semibold mb-2">
                        {item.name}
                      </h3>

                      <p className="text-gray-300 text-sm mb-6">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-400">
                          ₹ {item.price}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-gray-400">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-32 text-center text-xl italic text-gray-300"
      >
        “Great coffee is an experience, not just a drink.”
      </motion.div>
    </section>
  );
}
