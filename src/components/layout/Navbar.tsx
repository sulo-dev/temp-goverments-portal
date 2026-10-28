"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, UserCircle, X, Sparkles, ArrowRight } from "lucide-react";
import { Suspense, useState, useEffect } from "react";

// =========================================
// DESKTOP NAV LINKS COMPONENT
// =========================================
function NavLinks() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Katalog", path: "/layanan" },
    { name: "Informasi", path: "/informasi" },
    { name: "Pengaduan", path: "/pengaduan" },
    { name: "Lacak", path: "/lacak" }, // Menambahkan Lacak ke Navigasi
  ];

  return (
    <div className="flex items-center gap-1 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
      {navLinks.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link 
            key={link.name} 
            href={link.path} 
            className={`relative px-5 py-2.5 rounded-full text-sm font-black transition-all duration-300 group overflow-hidden ${
              isActive 
                ? "bg-white text-neon-orange shadow-sm border border-slate-100" 
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {/* Latar Belakang Hover Halus */}
            {!isActive && (
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-full" />
            )}
            
            <span className="relative z-10">{link.name}</span>
            
            {/* Titik Active (Glowing Dot) */}
            {isActive && (
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-orange rounded-full shadow-[0_0_8px_rgba(250,77,9,0.8)]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

// =========================================
// MAIN NAVBAR COMPONENT
// =========================================
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Deteksi Scroll untuk efek Glassmorphism dinamis
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu mobile jika route berubah
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Katalog Layanan", path: "/layanan" },
    { name: "Pusat Informasi", path: "/informasi" },
    { name: "Layanan Pengaduan", path: "/pengaduan" },
    { name: "Lacak Permohonan", path: "/lacak" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? "py-3 bg-white/70 backdrop-blur-2xl border-b border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]" 
            : "py-5 md:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand 3D */}
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-cyber-red to-neon-orange flex items-center justify-center shadow-[0_8px_20px_rgba(250,77,9,0.3)] group-hover:shadow-[0_10px_25px_rgba(250,77,9,0.5)] group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="text-white font-black text-2xl relative z-10">P1</span>
              </div>
              <Link href="/" className="text-slate-900 font-black text-2xl tracking-tighter hidden lg:block group-hover:text-neon-orange transition-colors">
                Portal<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Pemerintahan</span>
              </Link>
            </div>

            {/* Navigasi Tengah (Desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
              <Suspense fallback={<div className="h-14 w-[400px] bg-white/50 animate-pulse rounded-full border border-white" />}>
                <NavLinks />
              </Suspense>
            </div>

            {/* Aksi Kanan (Pencarian & Login) */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-neon-orange bg-white/50 backdrop-blur-md rounded-[1rem] transition-all shadow-sm border border-white hover:shadow-md hover:-translate-y-0.5 group">
                <Search size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <Link 
                href="/login" 
                className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-[1rem] text-sm font-black transition-all shadow-[0_8px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_25px_rgba(15,23,42,0.3)] hover:-translate-y-0.5 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-red to-neon-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <UserCircle size={20} className="relative z-10 text-white/70 group-hover:text-white transition-colors" />
                <span className="relative z-10">Masuk Portal</span>
              </Link>
              
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
          PREMIUM MOBILE MENU (FULLSCREEN OVERLAY)
      ========================================= */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-500 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop Kaca Gelap */}
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-lg transition-opacity duration-500 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Panel Menu Samping */}
        <div 
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white/90 backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
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
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={`flex items-center justify-between p-4 rounded-2xl font-black text-lg transition-all ${
                    isActive 
                      ? "bg-gradient-to-r from-orange-50 to-red-50 text-neon-orange border border-orange-100" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  style={{ transitionDelay: `${idx * 50}ms`, transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)', opacity: mobileMenuOpen ? 1 : 0 }}
                >
                  <span className="flex items-center gap-3">
                    {isActive && <Sparkles size={18} className="text-neon-orange" />}
                    {link.name}
                  </span>
                  {isActive && <ArrowRight size={18} className="text-neon-orange" />}
                </Link>
              );
            })}
          </div>

          {/* Footer Mobile Menu (CTA) */}
          <div className="p-6 border-t border-slate-100/50 bg-slate-50/50 mt-auto">
            <Link 
              href="/login" 
              className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white p-4 rounded-2xl font-black text-lg shadow-[0_10px_25px_rgba(15,23,42,0.2)] active:scale-95 transition-transform"
            >
              <UserCircle size={22} /> Masuk ke Portal
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}