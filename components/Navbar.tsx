"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../public/Husky Logo.png";

const navItems = ["Home", "Menu", "About"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleAdminClick = () => {
    setOpen(false);
    if (status !== "authenticated") {
      router.push("/login");
    } else {
      router.push("/admin");
    }
  };

  const isActive = (item: string) => {
    const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Glass background */}
      <div className="backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between text-white">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              className="relative w-14 h-14 sm:w-16 sm:h-16"
            >
              <span className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 rounded-full border border-white/20 backdrop-blur-md" />

              <Image
                src={Logo}
                alt="Huskyy Coffee Logo"
                fill
                priority
                sizes="64px"
                className="relative z-10 rounded-full object-contain bg-white p-2 shadow-xl"
              />

              
            </motion.div>

            <span className="flex flex-col leading-none">
              <span className="text-2xl sm:text-3xl font-serif font-semibold">
                Huskyy
              </span>
              <span className="text-sm sm:text-base tracking-widest text-amber-300">
                Brews & Bites
              </span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10 text-base lg:text-lg font-medium">
            {navItems.map((item) => {
              const active = isActive(item);

              return (
                <Link
                  key={item}
                  href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  className="relative group"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      active ? "text-amber-400" : "group-hover:text-amber-400"
                    }`}
                  >
                    {item}
                  </span>

                  <span
                    className={`absolute left-0 -bottom-2 h-[2px] bg-amber-400 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />

                  {active && (
                    <span className="absolute -inset-2 rounded-lg bg-amber-400/10 blur-xl -z-10" />
                  )}
                </Link>
              );
            })}

            {/* Admin Button */}
            <button
              onClick={handleAdminClick}
              className="border border-amber-400 text-amber-400 px-5 py-2 rounded-full font-semibold hover:bg-amber-400 hover:text-black transition shadow-lg"
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden backdrop-blur-md bg-black/40 border-b border-white/10"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-lg font-medium text-white">
              {navItems.map((item) => {
                const active = isActive(item);

                return (
                  <Link
                    key={item}
                    href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`transition ${
                      active
                        ? "text-amber-400 font-semibold"
                        : "hover:text-amber-400"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}

              {/* Admin Button (Mobile) */}
              <button
                onClick={handleAdminClick}
                className="mt-2 border border-amber-400 text-amber-400 px-8 py-3 rounded-full font-semibold hover:bg-amber-400 hover:text-black transition shadow-lg"
              >
                Admin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
