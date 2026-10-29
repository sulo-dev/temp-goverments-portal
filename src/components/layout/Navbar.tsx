"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, UserCircle, X, Sparkles, ArrowRight } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import AnimatedButton from "@/components/layout/AnimatedButton";

// =========================================
// DESKTOP NAV LINKS COMPONENT (WITH MAGIC SLIDE)
// =========================================
function NavLinks() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Katalog", path: "/layanan" },
    { name: "Informasi", path: "/informasi" },
    { name: "Pengaduan", path: "/pengaduan" },
    { name: "Lacak", path: "/lacak" },
  ];

  return (
    <div className="flex items-center gap-1 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white shadow-[0_8px_20px_rgba(0,0,0,0.03)] relative">
      {navLinks.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link 
            key={link.name} 
            href={link.path} 
            className={`relative px-5 py-2.5 rounded-full text-sm font-black transition-colors duration-300 z-10 ${
              isActive ? "text-neon-orange" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {/* ✨ MAGIC TAB INDICATOR */}
            {isActive && (
              <motion.div 
                layoutId="active-nav-pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100 -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            
            {/* Hover Background */}
            {!isActive && (
              <div className="absolute inset-0 bg-white/50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full -z-10" />
            )}
            
            <span className="relative z-10">{link.name}</span>
            
            {/* Glowing Dot */}
            {isActive && (
              <motion.div 
                layoutId="active-nav-dot"
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-orange rounded-full shadow-[0_0_8px_rgba(250,77,9,0.8)]"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}

// =========================================
// NAVBAR CONTENT (TANPA AUTHENTICATION)
// =========================================
function NavbarContent() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Deteksi Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu jika route berubah
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const mobileNavLinks = [
    { name: "Beranda", path: "/" },
    { name: "Katalog Layanan", path: "/layanan" },
    { name: "Pusat Informasi", path: "/informasi" },
    { name: "Layanan Pengaduan", path: "/pengaduan" },
    { name: "Lacak Permohonan", path: "/lacak" },
  ];

  // Variants Animasi Menu Samping (Mobile)
  const menuVariants: Variants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 400, damping: 30 } },
    open: { x: 0, transition: { type: "spring", stiffness: 400, damping: 30, staggerChildren: 0.05, delayChildren: 0.1 } }
  };
  const itemVariants: Variants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? "py-3 bg-white/70 backdrop-blur-3xl border-b border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]" 
            : "py-5 md:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand 3D */}
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-cyber-red to-neon-orange flex items-center justify-center shadow-[0_8px_20px_rgba(250,77,9,0.3)] group-hover:shadow-[0_10px_25px_rgba(250,77,9,0.5)] group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="text-white font-black text-2xl relative z-10">P1</span>
              </div>
              <span className="text-slate-900 font-black text-2xl tracking-tighter hidden lg:block group-hover:text-neon-orange transition-colors">
                Portal<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Pemerintahan</span>
              </span>
            </div>

            {/* Navigasi Tengah (Desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
              <NavLinks />
            </div>

            {/* Aksi Kanan (Pencarian & Login Statis) */}
            <div className="flex items-center gap-3 sm:gap-4 relative">
              <button className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-neon-orange bg-white/50 backdrop-blur-md rounded-[1rem] transition-all shadow-sm border border-white hover:shadow-md hover:-translate-y-0.5 group">
                <Search size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <div className="hidden sm:block">
                <AnimatedButton 
                  onClick={() => router.push("/login")}
                  glowColor="from-cyber-red to-neon-orange"
                  className="bg-slate-900 text-white px-6 py-3 rounded-[1rem] text-sm font-black flex items-center gap-2 shadow-[0_8px_20px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_25px_rgba(15,23,42,0.4)]"
                >
                  <UserCircle size={18} className="text-white/70 group-hover:text-white transition-colors" />
                  Masuk Portal
                </AnimatedButton>
              </div>
              
              {/* Tombol Mobile Menu */}
              <div className="md:hidden flex items-center">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="w-12 h-12 flex items-center justify-center text-slate-700 hover:text-neon-orange bg-white/80 backdrop-blur-md rounded-[1rem] shadow-sm border border-white transition-all active:scale-95"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </nav>

      {/* =========================================
          PREMIUM MOBILE MENU (ANIMATE PRESENCE)
      ========================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto">
            
            {/* Backdrop Kaca Gelap */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-lg"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Panel Menu Samping */}
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white/90 backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
            >
              {/* Header Mobile Menu */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-red to-neon-orange flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-xl">P1</span>
                  </div>
                  <span className="font-black text-xl text-slate-900 tracking-tight">Portal</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:text-cyber-red hover:bg-red-50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links Mobile Menu */}
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                {mobileNavLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div key={link.name} variants={itemVariants}>
                      <Link 
                        href={link.path}
                        className={`flex items-center justify-between p-4 rounded-2xl font-black text-lg transition-all ${
                          isActive 
                            ? "bg-gradient-to-r from-orange-50 to-red-50 text-neon-orange border border-orange-100 shadow-sm" 
                            : "text-slate-600 hover:bg-slate-50 border border-transparent"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {isActive && <Sparkles size={18} className="text-neon-orange" />}
                          {link.name}
                        </span>
                        {isActive && <ArrowRight size={18} className="text-neon-orange" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Mobile Menu (CTA) */}
              <motion.div variants={itemVariants} className="p-6 border-t border-slate-100/50 bg-slate-50/50 mt-auto flex flex-col gap-3">
                <AnimatedButton 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/login");
                  }}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3"
                >
                  <UserCircle size={22} /> Masuk ke Portal
                </AnimatedButton>
              </motion.div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// =========================================
// DEFAULT EXPORT DENGAN SUSPENSE BOUNDARY
// =========================================
export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-24 w-full bg-transparent" />}>
      <NavbarContent />
    </Suspense>
  );
}