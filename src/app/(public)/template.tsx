"use client";

import { motion } from "framer-motion";

export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        duration: 0.4 
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}