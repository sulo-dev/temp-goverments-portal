"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Clock, 
  Building, 
  Filter, 
  ChevronRight, 
  Tags, 
  Loader2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { dummyServices } from "@/lib/dummy-data";

// =========================================
// KOMPONEN KONTEN UTAMA
// =========================================
function KatalogContent() {
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const query = searchParams.get("q");
    if (query !== null) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const filteredServices = dummyServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative z-10 w-full">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 animate-fade-in-up pt-8">
        
        {/* Floating 3D Badge */}
        <div className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-slate-800 text-sm font-extrabold mb-8 hover:shadow-[0_10px_30px_rgba(250,77,9,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Sparkles size={16} className="text-neon-orange" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-cyber-red">
            Katalog Digital Terpadu
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
          Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Layanan Publik</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
          Temukan informasi, persyaratan, dan ajukan permohonan untuk berbagai layanan pemerintahan secara instan dan transparan.
        </p>
      </div>

      {/* --- 3D SEARCH & FILTER BAR --- */}
      <div className="w-full max-w-5xl mx-auto relative group z-30 mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-orange to-cyber-red rounded-[2.5rem] blur-xl opacity-10 group-focus-within:opacity-30 transition duration-500" />
        
        <div className="relative bg-white/70 backdrop-blur-2xl border-2 border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] p-2 flex flex-col md:flex-row items-center gap-2">
          
          {/* Input Pencarian */}
          <div className="flex-1 relative flex items-center w-full">
            <Search className="absolute left-6 text-neon-orange shrink-0" size={24} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari layanan apa hari ini?" 
              className="w-full bg-transparent border-none py-5 pl-16 pr-6 text-slate-800 placeholder-slate-400 text-lg focus:outline-none focus:ring-0 font-bold"
            />
          </div>

          <div className="w-full md:w-px h-px md:h-12 bg-slate-200/50 hidden md:block"></div>

          {/* Dropdown Kategori */}
          <div className="relative flex items-center w-full md:w-auto min-w-[240px]">
            <Filter className="absolute left-6 text-slate-400 shrink-0" size={20} />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 md:bg-transparent border border-slate-200 md:border-none rounded-xl md:rounded-none py-5 pl-14 pr-10 text-slate-700 font-bold text-base appearance-none focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">Semua Kategori</option>
              <option value="perizinan">Perizinan Berusaha</option>
              <option value="kependudukan">Administrasi Kependudukan</option>
              <option value="kesehatan">Layanan Kesehatan</option>
              <option value="ketenagakerjaan">Ketenagakerjaan</option>
              <option value="sosial">Bantuan Sosial</option>
            </select>
            {/* Custom Arrow for Select */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronRight size={20} className="rotate-90" />
            </div>
          </div>

        </div>
      </div>

      {/* --- GRID KARTU LAYANAN --- */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredServices.map((service, idx) => (
            <div 
              key={service.id} 
              className="relative bg-white/60 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(250,77,9,0.15)] hover:-translate-y-3 transition-all duration-500 group overflow-hidden flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${0.05 * idx}s` }}
            >
              {/* Highlight Refleksi Kaca (Atas) */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent opacity-60 pointer-events-none z-0" />
              
              {/* Glow Kategori di Sudut (Merespon Hover) */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-orange/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="bg-white/80 backdrop-blur-sm border border-slate-100 text-neon-orange text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                  {service.category}
                </span>
                <span className="flex items-center text-slate-500 font-bold text-xs gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                  <Clock size={14} className="text-slate-400" /> {service.estimatedDays} Hari
                </span>
              </div>
              
              <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-neon-orange transition-colors leading-snug relative z-10">
                {service.name}
              </h3>
              
              <p className="text-slate-500 text-sm mb-8 flex-grow line-clamp-3 leading-relaxed font-medium relative z-10">
                {service.description}
              </p>
              
              <div className="pt-6 border-t border-slate-200/50 flex flex-col gap-5 relative z-10 mt-auto">
                <div className="flex items-start gap-3 text-sm text-slate-500 font-bold">
                  <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 shrink-0 group-hover:bg-neon-orange/10 group-hover:border-neon-orange/20 transition-colors">
                    <Building size={16} className="text-slate-400 group-hover:text-neon-orange transition-colors" />
                  </div>
                  <span className="line-clamp-2 mt-1">{service.opd}</span>
                </div>
                
                <Link 
                  href={`/layanan/${service.id}`}
                  className="w-full flex items-center justify-between bg-slate-900 text-white px-2 py-2 pl-6 rounded-2xl hover:bg-gradient-to-r hover:from-cyber-red hover:to-neon-orange transition-all duration-300 font-extrabold shadow-md group/btn"
                >
                  <span className="text-sm tracking-wide">Lihat Detail</span>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                    <ArrowRight size={18} className="text-white" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE 3D --- */
        <div className="bg-white/60 backdrop-blur-2xl py-24 rounded-[3rem] border border-white text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-4xl mx-auto animate-fade-in-up">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-cyber-red/20 rounded-full blur-[30px] animate-pulse-slow" />
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-cyber-red border-2 border-white shadow-xl relative z-10 rotate-3">
              <Search size={40} />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Oops! Tidak Ditemukan</h3>
          <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed">
            Kami tidak dapat menemukan layanan dengan kata kunci "<strong className="text-slate-800">{searchQuery}</strong>".<br />
            Silakan coba kata kunci lain.
          </p>
        </div>
      )}
    </div>
  );
}

// =========================================
// ROOT LAYOUT & WRAPPER
// =========================================
export default function KatalogLayanan() {
  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col items-center font-sans overflow-hidden">
      
      {/* --- FIXED AMBIENT 3D BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-red/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-neon-orange/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[150px] mix-blend-multiply" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04] bg-repeat" />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-24 lg:py-32 min-h-screen relative z-10">
        <Suspense fallback={
          <div className="w-full h-[60vh] flex flex-col items-center justify-center text-neon-orange relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-orange/30 rounded-full blur-[20px] animate-pulse" />
              <Loader2 size={56} className="animate-spin mb-6 relative z-10" />
            </div>
            <p className="font-black text-slate-800 text-xl tracking-wide">Menyiapkan Katalog...</p>
          </div>
        }>
          <KatalogContent />
        </Suspense>
      </div>
    </div>
  );
}