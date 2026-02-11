"use client";

import { motion } from "framer-motion";

export default function WhyOurCoffee() {
  return (
    <>
      {/* WHY OUR COFFEE */}
      <section className="relative z-10 py-24 px-6 md:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
        >
          Why Our Coffee?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Ethically Sourced",
              desc: "Handpicked beans from sustainable farms across the globe.",
              icon: "🌱",
            },
            {
              title: "Expertly Roasted",
              desc: "Small-batch roasting to preserve aroma and depth.",
              icon: "🔥",
            },
            {
              title: "Brewed Fresh",
              desc: "Every cup prepared fresh for the perfect experience.",
              icon: "☕",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-amber-400 mb-3">
                {item.title}
              </h3>
              <p className="text-white/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
