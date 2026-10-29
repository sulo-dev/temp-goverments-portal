"use client";

import { motion } from "framer-motion";
import React from "react";

export default function OpdTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 16, 
        scale: 0.99,
        filter: "blur(8px)" 
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)" 
      }}
      exit={{ 
        opacity: 0, 
        y: -16, 
        scale: 0.99,
        filter: "blur(8px)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 24, 
        mass: 0.8,
        restDelta: 0.001 
      }}
      // Mengunci rendering ke GPU untuk mencegah lag saat load data tabel yang berat
      className="w-full h-full will-change-transform flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}