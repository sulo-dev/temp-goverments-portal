// components/layout/AnimatedButton.tsx
"use client";

import { HTMLMotionProps, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  glowColor?: string;      // Warna aura luar (contoh: "from-neon-orange to-cyber-red")
  spotlightColor?: string; // Warna sorotan kursor (RGBA string)
  enableGlow?: boolean;
}

export default function AnimatedButton({ 
  children, 
  className = "", 
  disabled,
  whileHover,
  whileTap,
  glowColor = "from-neon-orange via-cyber-red to-solar-yellow",
  spotlightColor = "rgba(255, 255, 255, 0.2)", // Sorotan cahaya putih transparan by default
  enableGlow = true,
  ...props 
}: AnimatedButtonProps) {
  
  // ⚡ FRAMER MOTION VALUES: Menghitung posisi kursor dengan performa 60FPS
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      whileHover={
        disabled ? undefined : (whileHover ?? { scale: 1.03, y: -2 })
      }
      whileTap={
        disabled ? undefined : (whileTap ?? { scale: 0.96 })
      }
      transition={{ 
        type: "spring", 
        stiffness: 450, 
        damping: 15,
        mass: 0.8 // Memberikan kesan ringan dan responsif
      }}
      disabled={disabled}
      className={`relative group font-black rounded-2xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-3xl selection:bg-none disabled:pointer-events-none disabled:opacity-50 outline-none select-none overflow-hidden ${className}`}
      {...props}
    >
      {/* 1. AMBIENT OUTER GLOW (Aura Luar) */}
      {enableGlow && !disabled && (
        <div className={`absolute -inset-1 bg-gradient-to-r ${glowColor} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none -z-20`} />
      )}

      {/* 2. DYNAMIC MOUSE SPOTLIGHT (Cahaya mengikuti kursor) */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                100px circle at ${mouseX}px ${mouseY}px,
                ${spotlightColor},
                transparent 80%
              )
            `,
          }}
        />
      )}

      {/* 3. 3D GLASS EDGE LIGHTING (Garis Cahaya Tajam di Tepi Atas) */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
      
      {/* 4. SPECULAR TOP REFLECTION (Kaca Lengkung Atas) */}
      <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none z-10 rounded-t-[inherit]" />

      {/* 5. INNER SHADOW (Memberikan ilusi kedalaman 3D) */}
      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)] pointer-events-none z-10" />

      {/* 6. KONTEN UTAMA */}
      <span className="relative z-30 flex items-center justify-center gap-2">
        {children}
      </span>
      
    </motion.button>
  );
}