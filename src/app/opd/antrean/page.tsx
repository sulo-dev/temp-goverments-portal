"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { opdQueueData } from "@/lib/dummy-data";
import AnimatedButton from "@/components/layout/AnimatedButton";
import { 
  Search, 
  Download, 
  ArrowRight, 
  FileText, 
  Clock, 
  MoreVertical,
  SlidersHorizontal,
  RefreshCw,
  Zap
} from "lucide-react";

export default function DaftarAntreanOPD() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = ["Semua", "Baru", "Diproses", "Revisi", "Selesai"];

  // Filter Data berdasarkan Tab dan Pencarian
  const filteredData = opdQueueData.filter(item => {
    const matchesTab = activeTab === "Semua" || item.status === activeTab;
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Varian Animasi untuk Baris Tabel
  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }
  };

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          HEADER SECTION (Glass & Glow)
      ========================================= */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-slate-200/60 text-slate-500 text-xs font-black mb-4 shadow-sm backdrop-blur-md uppercase tracking-widest">
            <Zap size={14} className="text-neon-orange" /> Modul Antrean Masuk
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-3 flex items-center gap-3">
            Manajemen Antrean
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-xl">
            Kelola, verifikasi, dan tindak lanjuti permohonan layanan publik secara <em className="text-neon-orange font-bold not-italic">real-time</em>.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className="w-14 h-14 flex items-center justify-center text-slate-500 bg-white border-2 border-white hover:border-neon-orange hover:text-neon-orange rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(250,77,9,0.15)] transition-all active:scale-95"
          >
            <RefreshCw size={22} className={isRefreshing ? "animate-spin text-neon-orange" : ""} />
          </button>
          <AnimatedButton 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-[0_8px_20px_rgba(15,23,42,0.2)] text-base"
          >
            <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Ekspor Data
          </AnimatedButton>
        </div>
      </motion.div>

      {/* =========================================
          MAIN COMMAND CARD (Hyper-Glassmorphism)
      ========================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative"
      >
        
        {/* Latar Ambient Card */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-orange/5 rounded-full blur-[80px] pointer-events-none" />

        {/* --- Top Bar: 3D Tabs & Capsule Search --- */}
        <div className="p-6 md:p-8 md:pb-6 border-b border-white flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-10">
          
          {/* 3D Pill Tabs (Segmented Control Apple Style) */}
          <div className="flex overflow-x-auto hide-scrollbar gap-1 bg-slate-100/80 p-1.5 rounded-[1.5rem] border border-slate-200 shadow-inner w-fit relative z-10">
            {tabs.map((tab) => {
              const count = tab === "Semua" ? opdQueueData.length : opdQueueData.filter(d => d.status === tab).length;
              const isActive = activeTab === tab;
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-sm whitespace-nowrap transition-colors relative z-10 ${
                    isActive ? "text-neon-orange" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white rounded-xl shadow-[0_4px_15px_rgba(250,77,9,0.15)] -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {tab}
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black tracking-widest transition-colors ${
                    isActive ? "bg-orange-50 text-neon-orange border border-orange-100" : "bg-slate-200/70 text-slate-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Capsule Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative group flex-1 xl:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-orange transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Cari nomor tiket, nama..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-md border-2 border-white rounded-2xl py-3.5 pl-12 pr-4 text-sm font-extrabold text-slate-800 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:border-neon-orange/50 focus:ring-4 focus:ring-neon-orange/10 transition-all shadow-sm hover:border-slate-200"
              />
            </div>
            <button className="w-14 h-14 flex items-center justify-center bg-white/80 backdrop-blur-md border-2 border-white text-slate-500 hover:text-neon-orange hover:border-neon-orange/50 rounded-2xl transition-all shadow-sm shrink-0 hover:shadow-[0_8px_20px_rgba(250,77,9,0.1)] active:scale-95">
              <SlidersHorizontal size={22} />
            </button>
          </div>
        </div>

        {/* --- Data Table (Staggered Animation Rows) --- */}
        <div className="overflow-x-auto min-h-[400px] p-4 md:p-8 bg-slate-50/30">
          <AnimatePresence mode="wait">
            {filteredData.length > 0 ? (
              <motion.table 
                key="data-table"
                variants={tableVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="w-full text-left border-separate border-spacing-y-3 min-w-[1000px]"
              >
                <thead>
                  <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 w-48">Nomor Tiket</th>
                    <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60">Pemohon & Layanan</th>
                    <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 w-48">Waktu Masuk</th>
                    <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 text-center w-40">Status</th>
                    <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 text-right w-40">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredData.map((item) => (
                      <motion.tr 
                        variants={rowVariants}
                        key={item.id} 
                        layout="position"
                        className="bg-white/80 hover:bg-white transition-colors duration-300 group hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] relative"
                      >
                        
                        {/* Tiket */}
                        <td className="px-6 py-5 rounded-l-2xl border-y border-l border-white group-hover:border-slate-100">
                          <div className="inline-flex items-center gap-2 font-black text-slate-700 bg-slate-100 border border-slate-200/60 px-3 py-1.5 rounded-xl group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-neon-orange transition-colors shadow-sm">
                            <FileText size={14} className="text-slate-400 group-hover:text-neon-orange transition-colors" />
                            {item.id}
                          </div>
                        </td>
                        
                        {/* Pemohon & Layanan */}
                        <td className="px-6 py-5 border-y border-white group-hover:border-slate-100">
                          <p className="font-black text-slate-800 text-sm mb-1.5 tracking-tight">{item.name}</p>
                          <p className="text-xs font-bold text-slate-500 truncate max-w-[300px]" title={item.service}>
                            {item.service}
                          </p>
                        </td>
                        
                        {/* Waktu Masuk */}
                        <td className="px-6 py-5 border-y border-white group-hover:border-slate-100">
                          <p className="font-extrabold text-slate-700 text-sm mb-1.5">{item.date}</p>
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                            <Clock size={12} className="text-slate-400" /> {item.time}
                          </div>
                        </td>
                        
                        {/* Status & SLA */}
                        <td className="px-6 py-5 text-center border-y border-white group-hover:border-slate-100">
                          <span className={`inline-flex items-center justify-center px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 w-full shadow-sm ${
                            item.status === 'Baru' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            item.status === 'Diproses' ? 'bg-orange-50 text-neon-orange border-orange-200' :
                            item.status === 'Revisi' ? 'bg-red-50 text-cyber-red border-red-200' :
                            'bg-emerald-50 text-emerald-600 border-emerald-200'
                          }`}>
                            {item.status}
                          </span>
                          {item.status !== 'Selesai' && (
                            <div className={`mt-2.5 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                              item.sla === 'Kedaluwarsa' ? 'text-cyber-red' : 
                              item.sla === 'Peringatan' ? 'text-amber-500' : 
                              'text-emerald-500'
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                item.sla === 'Kedaluwarsa' ? 'bg-cyber-red animate-pulse' : 
                                item.sla === 'Peringatan' ? 'bg-amber-500' : 
                                'bg-emerald-500'
                              }`}></div>
                              SLA: {item.sla}
                            </div>
                          )}
                        </td>

                        {/* Aksi Button */}
                        <td className="px-6 py-5 text-right rounded-r-2xl border-y border-r border-white group-hover:border-slate-100">
                          {item.status !== 'Selesai' ? (
                            <Link href={`/opd/antrean/verifikasi/${item.id}`} className="inline-flex items-center gap-2 bg-slate-900 hover:bg-neon-orange text-white px-5 py-3 rounded-xl text-xs font-black transition-all shadow-[0_4px_15px_rgba(15,23,42,0.2)] hover:shadow-[0_8px_20px_rgba(250,77,9,0.3)] group/btn hover:-translate-y-0.5">
                              Periksa <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          ) : (
                            <button className="inline-flex items-center justify-center p-3 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200">
                              <MoreVertical size={20} />
                            </button>
                          )}
                        </td>
                        
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </motion.table>
            ) : (
              /* --- 3D Empty State --- */
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-24 text-center px-4"
              >
                <div className="relative w-32 h-32 mb-8 group cursor-default mx-auto">
                  <div className="absolute inset-0 bg-neon-orange/20 rounded-full blur-[30px] animate-pulse-slow" />
                  <motion.div 
                    initial={{ rotate: 15 }} 
                    animate={{ rotate: 0 }} 
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-slate-300 border-4 border-white shadow-xl relative z-10"
                  >
                    <Search size={56} />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Pencarian Tidak Ditemukan</h3>
                <p className="text-slate-500 font-medium max-w-md mx-auto text-lg">
                  Tidak ada data antrean yang cocok dengan filter atau kata kunci "<strong className="text-slate-800">{searchQuery}</strong>".
                </p>
                <AnimatedButton 
                  enableGlow={false}
                  onClick={() => {setSearchQuery(""); setActiveTab("Semua");}}
                  className="mt-8 px-8 py-3.5 bg-white border-2 border-white hover:border-slate-200 text-slate-700 hover:text-neon-orange font-black rounded-2xl shadow-sm text-sm"
                >
                  Reset Filter Pencarian
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* --- Premium Pagination --- */}
        <div className="p-6 md:px-8 border-t border-white flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 relative z-10">
          <p className="text-sm font-bold text-slate-500">
            Menampilkan <strong className="text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm mx-1">{filteredData.length}</strong> dari <strong className="text-slate-900">{opdQueueData.length}</strong> total antrean
          </p>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 shadow-inner">
            <button className="px-4 py-2 rounded-xl text-sm font-black text-slate-400 cursor-not-allowed">Sebel</button>
            <button className="w-10 h-10 flex items-center justify-center bg-white text-neon-orange rounded-xl text-sm font-black shadow-sm border border-slate-200">1</button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl text-sm font-black text-slate-600 transition-colors">2</button>
            <button className="px-4 py-2 hover:bg-white rounded-xl text-sm font-black text-slate-600 transition-colors">Lanjut</button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}