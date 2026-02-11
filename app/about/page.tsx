"use client";

import DiscountSpinner from "@/components/DiscountSpinner";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-32 px-6 md:px-16 overflow-hidden">
      
      {/* Decorative gradient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-700/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        
        {/* Small Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.4em] text-amber-400 mb-4"
        >
          Our Story
        </motion.h2>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-8 leading-tight"
        >
          Crafting Moments, <br />
          <span className="text-amber-400">One Bean at a Time</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-16"
        >
          Founded in 2024, our coffee journey began with a simple belief —
          great coffee starts at the source. We partner with ethical farmers,
          roast in small batches, and brew with passion.  
          <br /><br />
          Coffee isn’t just a drink for us — it’s a ritual, a pause, a moment of warmth.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-amber-400 mb-4">
              Ethically Sourced
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We work directly with farmers who care deeply about quality and sustainability,
              ensuring fair trade and rich flavors in every cup.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-amber-400 mb-4">
              Small Batch Roasted
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Every batch is roasted with precision to bring out the unique character
              of each origin — smooth, bold, and unforgettable.
            </p>
          </motion.div>

        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 italic text-xl text-gray-300"
        >
          “Good coffee is a pleasure. Great coffee is an experience.”
        </motion.div>
      </div>

      <DiscountSpinner/>
    </section>
  );
}
