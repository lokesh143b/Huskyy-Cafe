"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {allCoffees , Coffee } from "../../../data/coffeeData";
import Reviews from "@/components/Reviews";



export default function CoffeeDetail() {
  const params = useParams();
  // Ensure `name` is string
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  if (!name) return <p className="text-white text-center mt-20">Loading...</p>;

  const coffee: Coffee | undefined = allCoffees.find(c => decodeURIComponent(name) === c.name);

  if (!coffee)
    return <p className="text-white text-center mt-20">Coffee not found!</p>;

  return (
    <div className="relative min-h-screen font-sans">
      

      {/* Coffee Section */}
      <div className="relative z-10 max-w-6xl mx-auto py-24 px-6 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full lg:w-1/2 h-96 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition"
        >
          <Image src={coffee.image} alt={coffee.name} fill className="object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl"
        >
          <h1 className="text-5xl font-extrabold text-amber-400">{coffee.name}</h1>
          <p className="text-white/90 mt-6 text-lg">{coffee.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-white">
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Origin</p>
              <p>{coffee.origin}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Roast</p>
              <p>{coffee.roast}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Aroma</p>
              <p>{coffee.aroma}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl shadow-md">
              <p className="font-semibold">Strength</p>
              <p>{coffee.strength}</p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block mt-8 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full shadow-lg transition-all"
          >
            Back to Menu
          </Link>
        </motion.div>
      </div>

      {/* Reviews */}

      <Reviews/>
      
    </div>
  );
}
