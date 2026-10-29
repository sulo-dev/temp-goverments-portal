"use client";

import { motion } from "framer-motion";
import React from "react";

export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 24, 
        scale: 0.98,
        filter: "blur(12px)" 
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)" 
      }}
      exit={{ 
        opacity: 0, 
        y: -24, 
        scale: 0.98,
        filter: "blur(12px)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 240, 
        damping: 28, 
        mass: 0.8,
        restDelta: 0.001 
      }}
      // will-change memaksa browser menggunakan GPU untuk merender animasi tanpa lag (jank-free)
      className="w-full flex-grow flex flex-col will-change-transform"
    >
      {children}
    </motion.div>
  );
}