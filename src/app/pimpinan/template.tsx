"use client";

import { motion } from "framer-motion";

export default function PimpinanTemplate({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={{
        hidden: { 
          opacity: 0, 
          y: 20, 
          scale: 0.98,
          filter: "blur(8px)" // Efek sinematik Out-of-Focus
        },
        enter: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: "blur(0px)",
          transition: { 
            type: "spring", 
            stiffness: 280, 
            damping: 22,
            mass: 0.8
          } 
        },
        exit: { 
          opacity: 0, 
          y: -15, 
          scale: 0.98,
          filter: "blur(8px)",
          transition: { 
            duration: 0.25, 
            ease: "easeInOut" 
          } 
        }
      }}
      // will-change membantu browser mengoptimalkan rendering sebelum animasi dimulai (GPU Acceleration)
      style={{ willChange: "opacity, transform, filter" }}
      className="w-full h-full relative"
    >
      {children}
    </motion.div>
  );
}