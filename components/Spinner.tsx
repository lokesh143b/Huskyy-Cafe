// components/Spinner.tsx
import { motion } from "framer-motion";


export default function Spinner({ size = 20 }: { size?: number }) {
  return (
<div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#7f5539] border-t-transparent rounded-full"
      />
    </div>
  );
}
