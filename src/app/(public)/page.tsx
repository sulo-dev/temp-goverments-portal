"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  FileText, 
  Activity, 
  ShieldCheck, 
  Newspaper, 
  Building2, 
  Users, 
  CheckCircle, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import AnimatedButton from "@/components/layout/AnimatedButton";

const MotionLink = motion.create(Link);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/layanan?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 flex flex-col items-center overflow-hidden font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          AMBIENT 3D BACKGROUND (GLOWING ORBS)
      ========================================= */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-red/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow mix-blend-multiply" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-neon-orange/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04] bg-repeat pointer-events-none" />

      {/* =========================================
          MAIN HERO CONTENT
      ========================================= */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-20 lg:py-32 flex flex-col items-center text-center">
        
        {/* Floating 3D Badge */}
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-slate-800 text-sm font-extrabold mb-10 hover:shadow-[0_10px_30px_rgba(250,77,9,0.15)] cursor-default relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Sparkles size={16} className="text-neon-orange" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-cyber-red">
            Portal Layanan Terintegrasi V2.0
          </span>
        </motion.div>

        {/* Hero Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black text-slate-900 tracking-tighter mb-8 leading-[1.1]">
          Satu Pintu Untuk Semua <br className="hidden md:block" />
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-cyber-red to-neon-orange bg-[length:200%_auto] animate-gradient-x">
              Layanan Pemerintahan
            </span>
            <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-neon-orange to-cyber-red opacity-30 pointer-events-none" />
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-slate-500 text-lg md:text-2xl mb-14 font-medium leading-relaxed">
          Akses layanan publik, lacak dokumen permohonan, dan sampaikan aspirasi Anda dengan lebih cepat, transparan, dan mudah tanpa antrean fisik.
        </p>

        {/* =========================================
            3D GLASSMORPHISM SEARCH BAR & ANIMATED BUTTON
        ========================================= */}
        <div className="w-full max-w-4xl relative group z-30 mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-orange to-cyber-red rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
          
          <form onSubmit={handleSearch} className="relative bg-white/70 backdrop-blur-2xl border-2 border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] p-3 pl-8 flex items-center transition-transform duration-300">
            <Search className="text-neon-orange shrink-0" size={28} />
            
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari perizinan... (KTP, Domisili, PBG)" 
              className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-bold text-lg md:text-xl py-4 px-6 focus:ring-0"
            />
            
            {/* 
                ✨ PERBAIKAN ANIMATED BUTTON V3.0 ✨
                - Dibuat bersih tanpa span dan absolute div tambahan
                - Menggunakan bg-slate-900/80 agar efek kaca dari V3.0 (backdrop-blur-3xl) berfungsi sempurna
                - Memanfaatkan properti glowColor dan spotlightColor secara bawaan
            */}
            <AnimatedButton 
              type="submit" 
              glowColor="from-neon-orange via-cyber-red to-orange-500"
              spotlightColor="rgba(255, 255, 255, 0.25)"
              className="bg-slate-900/80 text-white px-8 md:px-12 py-4 md:py-5 text-lg flex items-center shrink-0"
            >
              Lihat Detail
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>

          </form>
        </div>

        {/* =========================================
            GLASS DASHBOARD PANEL (STATS)
        ========================================= */}
        <div className="w-full max-w-5xl mx-auto bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] p-4 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x-0 md:divide-x divide-slate-200/50">
            {[
              { icon: <FileText size={28} className="text-neon-orange" />, count: "150+", label: "Layanan Tersedia" },
              { icon: <Building2 size={28} className="text-cyber-red" />, count: "42", label: "Instansi Terhubung" },
              { icon: <Users size={28} className="text-blue-500" />, count: "10K+", label: "Pemohon Terbantu" },
              { icon: <CheckCircle size={28} className="text-emerald-500" />, count: "98%", label: "Tingkat Kepuasan" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center justify-center p-4 group cursor-default"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-1">{stat.count}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            3D FEATURE CARDS
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-24 w-full text-left">
          {[
            { href: "/layanan", icon: <FileText size={32} className="text-neon-orange" />, title: "Katalog Layanan", desc: "Eksplorasi ratusan perizinan dan layanan publik secara lengkap.", color: "group-hover:text-neon-orange", bgGlow: "group-hover:shadow-[0_0_40px_rgba(250,77,9,0.15)]" },
            { href: "/lacak", icon: <Activity size={32} className="text-cyber-red" />, title: "Lacak Permohonan", desc: "Pantau status pengajuan dokumen Anda secara real-time.", color: "group-hover:text-cyber-red", bgGlow: "group-hover:shadow-[0_0_40px_rgba(225,29,72,0.15)]" },
            { href: "/pengaduan", icon: <ShieldCheck size={32} className="text-solar-yellow" />, title: "Layanan Pengaduan", desc: "Sampaikan laporan dan aspirasi masyarakat kepada instansi.", color: "group-hover:text-amber-500", bgGlow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]" },
            { href: "/informasi", icon: <Newspaper size={32} className="text-blue-500" />, title: "Informasi & Agenda", desc: "Berita terbaru dan jadwal kegiatan pemerintahan daerah.", color: "group-hover:text-blue-500", bgGlow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]" }
          ].map((feature, idx) => (
            <MotionLink 
              href={feature.href} 
              key={idx} 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 group overflow-hidden ${feature.bgGlow}`}
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-50 pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner relative z-10">
                {feature.icon}
              </div>
              
              <h3 className={`text-slate-800 font-extrabold text-xl mb-3 transition-colors duration-300 relative z-10 ${feature.color}`}>
                {feature.title}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 relative z-10">
                {feature.desc}
              </p>
              
              <div className="mt-auto flex items-center justify-between text-sm font-black text-slate-400 relative z-10">
                <span className={`transition-colors duration-300 ${feature.color}`}>Lihat Detail</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  <ChevronRight size={16} />
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
        
      </div>
    </div>
  );
}