"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Loader from "@/components/Loaders/Loader";

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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);


//   Loader
  if (loading) return <Loader />;

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl px-12 py-10 shadow-2xl text-center max-w-md"
        >
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-amber-400 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            The coffee you’re looking for doesn’t exist or was removed.
          </p>
          <Link
            href="/menu"
            className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full shadow-lg transition"
          >
            Back to Menu
          </Link>
        </motion.div>
      </div>
    );

  return (
    <div className="relative min-h-screen font-sans pt-8  text-white">
      {/* Product Section */}
      <div className="relative z-10 max-w-6xl mx-auto py-24 px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Floating Image */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full lg:w-1/2 h-96 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
          />
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl"
        >
          <h1 className="text-5xl font-extrabold text-amber-400">
            {product.name}
          </h1>

          <p className="text-white/90 mt-6 text-lg">{product.description}</p>

          {/* Attributes */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-white">
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Origin</p>
              <p>{product.origin}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Roast</p>
              <p>{product.roast}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Aroma</p>
              <p>{product.aroma}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Strength</p>
              <p>{product.strength}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-8 text-3xl font-bold text-amber-400">
            ₹ {product.price}
          </div>

          {/* Back button */}
          <Link
            href="/menu"
            className="inline-block mt-8 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full shadow-lg transition-all"
          >
            Back to Menu
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
