"use client";

import { motion } from "framer-motion";
import { PlusSquare, Coffee, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type Props = {
  active: "add" | "all";
  setActive: (val: "add" | "all") => void;
};

export default function Sidebar({ active, setActive }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        w-full md:w-64
        md:min-h-screen
        bg-black/50 backdrop-blur-xl
        border-b md:border-b-0 md:border-r border-white/10
        p-4 md:p-6
        md:sticky md:top-0
        flex flex-col
      "
    >
      <div>
        <h2 className="text-lg md:text-2xl font-bold text-amber-400 mb-4 md:mb-8 text-center md:text-left">
          Admin Panel
        </h2>

        <nav className="flex md:flex-col gap-3 justify-center md:justify-start">
          <MenuItem
            icon={<PlusSquare size={20} />}
            label="Add Product"
            active={active === "add"}
            onClick={() => setActive("add")}
          />

          <MenuItem
            icon={<Coffee size={20} />}
            label="All Products"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
        </nav>
      </div>

      {/* Sticky Logout Button */}
      <div className="mt-auto sticky bottom-5">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 15px rgba(120, 85, 250, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className=" w-full
            flex items-center gap-3 justify-center
            px-4 py-3 md:py-4
            rounded-2xl
            font-semibold
            text-white
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            shadow-md shadow-indigo-500/50
            hover:shadow-lg transition-all duration-300    
          "
        >
          <LogOut size={22} />
          <span className="text-lg md:text-base">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}

function MenuItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        flex items-center gap-2
        px-4 py-2 md:py-3 rounded-xl
        transition
        whitespace-nowrap
        ${
          active
            ? "bg-amber-400 text-black shadow-md shadow-amber-400/50"
            : "text-gray-300 hover:bg-white/10 hover:shadow-sm"
        }
      `}
    >
      {icon}
      <span className="text-sm md:text-base font-medium">{label}</span>
    </motion.button>
  );
}
