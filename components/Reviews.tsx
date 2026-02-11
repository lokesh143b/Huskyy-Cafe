import { FC } from "react";
import { motion } from "framer-motion";
import { reviews } from "../data/coffeeData";

type Review = {
  name: string;
  rating: number;
  text: string;
};

const Reviews: FC = () => {
  return (
    <>
      {/* Reviews */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12 text-center">
          What Our Customers Say
        </h2>

        <motion.div
          className="flex w-full space-x-8 overflow-hidden"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...reviews, ...reviews].map((r: Review, idx: number) => (
            <motion.div
              key={idx}
              className="relative min-w-[300px] sm:min-w-[320px] md:min-w-[350px] bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-transform"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20 blur-xl" />

              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center font-bold text-black text-lg shadow-md">
                  {r.name.charAt(0)}
                </div>

                <div className="ml-3">
                  <p className="text-white font-semibold text-lg">{r.name}</p>
                  <div className="text-amber-300 font-bold text-sm">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                </div>
              </div>

              <p className="text-white/90 italic text-md sm:text-lg leading-relaxed">
                "{r.text}"
              </p>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/10 blur-xl" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Reviews;
