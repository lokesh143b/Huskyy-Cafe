"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { allCoffees, Coffee } from "../data/coffeeData";

import CoffeeCard from "@/components/CoffeeCard";
import WhyOurCoffee from "@/components/WhyOurCoffee";
import Reviews from "@/components/Reviews";

// -----------------------------
// Home Component
// -----------------------------
export default function Home() {
  const [displayImages, setDisplayImages] = useState<StaticImageData[]>([
    allCoffees[0].image,
    allCoffees[1].image,
    allCoffees[2].image,
  ]);

  const router = useRouter();

  // Rotate images every 4 seconds (hero floating effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayImages((prev) => {
        const arr = [...prev];
        const first = arr.shift();
        arr.push(first!);
        return arr;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 pt-36 overflow-hidden z-10">
        {/* LEFT TEXT */}
        <div className="relative z-10 md:w-1/2 space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Your Daily <br />
            <span className="text-amber-400">Coffee Ritual</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-base sm:text-lg max-w-md mx-auto md:mx-0"
          >
            Handcrafted coffee made from carefully roasted beans, brewed fresh
            every morning.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            onClick={() => router.push("/menu")}
            className="bg-[#3b2a20] text-white px-8 py-3 rounded-lg hover:bg-[#2a1d16] transition mx-auto md:mx-0 block cursor-pointer"
          >
            Explore Menu
          </motion.button>
        </div>

        {/* RIGHT FLOATING HERO IMAGES */}
        <div className="md:w-1/2 flex justify-center gap-6 sm:gap-8 flex-wrap mt-12 md:mt-0 relative z-10">
          {displayImages.map((img, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1, y: -10, zIndex: 30 }}
              className="relative rounded-2xl overflow-hidden w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 shadow-xl "
            >
              <Image
                src={img}
                alt={`Coffee ${index}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ALL COFFEES SECTION */}
      <section className="relative z-10 py-20 px-6 md:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Our Coffee Menu
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allCoffees.map((coffee: Coffee) => (
            <motion.div
              key={coffee.name}
              onClick={() => router.push(`/coffee/${coffee.name}`)}
              className="cursor-pointer"
            >
              <CoffeeCard
                name={coffee.name}
                price={coffee.price}
                image={coffee.image}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* why our coffee section */}
      <WhyOurCoffee />

      {/* Reviews */}
      <Reviews />
    </>
  );
}
