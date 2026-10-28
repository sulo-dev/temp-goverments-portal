// components/AnimatedButton.tsx
"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
}

export default function AnimatedButton({ 
  children, 
  className = "", 
  disabled,
  whileHover,
  whileTap,
  ...props 
}: AnimatedButtonProps) {
  return (
    <motion.button
      // Matikan efek animasi jika tombol disabled
      whileHover={disabled ? undefined : (whileHover ?? { scale: 1.02, y: -2 })}
      whileTap={disabled ? undefined : (whileTap ?? { scale: 0.95 })}
      
      // Fisika pegas organik & snappy
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }}
      
      disabled={disabled}
      className={`relative overflow-hidden font-black transition-colors disabled:pointer-events-none disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}