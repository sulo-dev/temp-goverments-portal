"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedButton from "@/components/layout/AnimatedButton";
import { 
  PenTool, 
  CheckCircle, 
  Activity, 
  Star, 
  TrendingUp, 
  BarChart3,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from "lucide-react";

// --- DATA DUMMY ---
const pimpinanStats = [
  { title: "Menunggu TTE", value: "18", trend: "Prioritas", trendUp: false, iconType: "pen", color: "text-amber-500", bg: "bg-amber-50/50", border: "border-amber-100" },
  { title: "Disetujui Bulan Ini", value: "412", trend: "+15%", trendUp: true, iconType: "check", color: "text-emerald-500", bg: "bg-emerald-50/50", border: "border-emerald-100" },
  { title: "Rata-rata SLA", value: "1.2", unit: "Hari", trend: "Optimal", trendUp: true, iconType: "activity", color: "text-blue-500", bg: "bg-blue-50/50", border: "border-blue-100" },
  { title: "Indeks Kepuasan", value: "4.8", unit: "/5.0", trend: "Sangat Baik", trendUp: true, iconType: "star", color: "text-purple-500", bg: "bg-purple-50/50", border: "border-purple-100" },
];

const pimpinanPerformanceData = [
  { month: "Mei", approved: 320, rejected: 12 },
  { month: "Jun", approved: 350, rejected: 18 },
  { month: "Jul", approved: 310, rejected: 9 },
  { month: "Ags", approved: 420, rejected: 22 },
  { month: "Sep", approved: 390, rejected: 15 },
  { month: "Okt", approved: 412, rejected: 8 },
];

const pimpinanPendingTTE = [
  { id: "REG-2026-101", name: "PT. Maju Mundur", service: "Persetujuan Bangunan Gedung (PBG)", time: "1 Jam lalu", verifier: "Admin Utama" },
  { id: "REG-2026-102", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", time: "2 Jam lalu", verifier: "Verifikator Ahli" },
  { id: "REG-2026-103", name: "CV. Abadi Jaya", service: "Izin Usaha Mikro dan Kecil", time: "3 Jam lalu", verifier: "Admin Utama" },
  { id: "REG-2026-104", name: "Ahmad Dahlan", service: "Pembuatan Akta Kelahiran", time: "5 Jam lalu", verifier: "Petugas Loket 1" },
];

export default function BerandaPimpinan() {
  const router = useRouter();
  const safePerfData = pimpinanPerformanceData || [];
  const maxApproved = safePerfData.length > 0 ? Math.max(...safePerfData.map(d => d.approved)) : 500;

  // Helper Icon Dinamis
  const renderIcon = (type: string) => {
    switch (type) {
      case "pen": return <PenTool size={24} />;
      case "check": return <CheckCircle size={24} />;
      case "activity": return <Activity size={24} />;
      case "star": return <Star size={24} />;
      default: return <Activity size={24} />;
    }
  };

  // --- Varian Animasi ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 md:space-y-10 pb-12 font-sans selection:bg-amber-500/30"
    >
      
      {/* =========================================
          1. HERO BANNER EKSEKUTIF (Deep Gold Glass)
      ========================================= */}
      <motion.div variants={itemVariants} className="bg-slate-950 rounded-[3rem] p-8 md:p-14 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col xl:flex-row items-center justify-between gap-10">
        
        {/* Ambient Gold & Emerald Orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow mix-blend-screen" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse-slow mix-blend-screen" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />
        
        <div className="relative z-10 xl:max-w-2xl w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black mb-8 backdrop-blur-md uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Sesi Eksekutif: Pimpinan / Kepala Dinas
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
            Selamat Datang, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center gap-3 mt-1">
              Bapak/Ibu Pimpinan <Sparkles size={32} className="text-amber-400 hidden md:block" />
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg font-bold mb-10 leading-relaxed max-w-xl">
            Performa instansi bulan ini sangat baik. Terdapat <strong className="text-white px-2 py-0.5 bg-white/10 rounded-md">18 berkas</strong> yang telah divalidasi oleh tim verifikator dan menanti otorisasi TTE Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <AnimatedButton 
              onClick={() => router.push('/pimpinan/persetujuan')}
              glowColor="from-amber-500 to-orange-500"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4.5 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(245,158,11,0.3)]"
            >
              <PenTool size={22} /> Eksekusi TTE Masal
            </AnimatedButton>
          </div>
        </div>

        {/* Lencana Otoritas 3D */}
        <motion.div 
          initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
          className="relative z-10 hidden xl:flex flex-col items-center justify-center p-1 bg-gradient-to-b from-amber-400/30 to-amber-600/5 rounded-full shadow-[0_0_50px_rgba(245,158,11,0.15)] shrink-0 group cursor-default"
        >
           <div className="bg-slate-900 border border-amber-500/30 w-64 h-64 rounded-full flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-slate-800 transition-colors duration-500">
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.2] bg-repeat" />
             <ShieldCheck size={72} className="text-amber-400 mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
             <p className="text-white font-black text-xl text-center leading-tight tracking-tight relative z-10">Otoritas <br/> Penerbitan</p>
             <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-3 bg-emerald-400/10 px-4 py-1.5 rounded-lg border border-emerald-400/20 relative z-10 shadow-sm backdrop-blur-md">Sistem Aman</p>
           </div>
        </motion.div>
      </motion.div>

      {/* =========================================
          2. STATS GRID EKSEKUTIF (Ultra Glass Cards)
      ======================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pimpinanStats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
          >
            {/* Ambient Latar */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${stat.bg.replace('/50', '')}`} />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={`p-4 rounded-[1.25rem] ${stat.bg} ${stat.color} ${stat.border} border-2 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                {renderIcon(stat.iconType)}
              </div>
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border ${stat.trendUp ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
                <TrendingUp size={14} className={!stat.trendUp ? "rotate-180" : ""} /> {stat.trend}
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter flex items-baseline gap-1">
                {stat.value} {stat.unit && <span className="text-base font-bold text-slate-400">{stat.unit}</span>}
              </h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* =========================================
          3. CHARTS & ACTION SECTION
      ========================================= */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Grafik Kinerja Persetujuan (Glass Capsule 3D) --- */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-2 tracking-tight">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 border border-amber-100"><BarChart3 size={24} /></div> 
                Tren Penerbitan Izin
              </h3>
              <p className="text-sm font-bold text-slate-500">Volume dokumen yang telah Anda TTE selama 6 bulan terakhir.</p>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 relative pt-6 min-h-[250px]">
            {/* Garis Horizontal Latar */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {[500, 375, 250, 125, 0].map((line, i) => (
                <div key={i} className="flex items-center gap-4 w-full opacity-40">
                  <span className="text-[10px] font-black text-slate-300 w-6 text-right">{line}</span>
                  <div className="flex-1 h-px border-b-2 border-dashed border-slate-200"></div>
                </div>
              ))}
            </div>

            {/* Kolom Grafik Emas 3D Dinamis */}
            <div className="w-full flex justify-between items-end h-full pb-8 pl-12 relative z-10">
              {safePerfData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-4 group w-full cursor-pointer">
                  {/* Floating Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl absolute -top-10 pointer-events-none transform -translate-y-4 group-hover:-translate-y-2 shadow-xl z-20 whitespace-nowrap">
                    {data.approved} Berkas Di-TTE
                  </div>
                  
                  {/* Kapsul Latar Belakang Grafik */}
                  <div className="w-10 sm:w-16 bg-slate-100/80 rounded-t-2xl relative overflow-hidden h-full flex items-end group-hover:bg-slate-200/80 transition-colors border-x border-t border-white/50 shadow-inner">
                    {/* Isi Bar Tumbuh Menggunakan Framer Motion */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.approved / (maxApproved || 500)) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                      className="w-full bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t-xl group-hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.3)] relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/40 rounded-t-xl" />
                    </motion.div>
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-amber-500 transition-colors">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Daftar Menunggu TTE (Floating Cards) --- */}
        <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <div className="p-2.5 rounded-xl bg-red-50 text-cyber-red border border-red-100"><PenTool size={24} /></div> 
              Perlu TTE Segera
            </h3>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 mb-6">
            {pimpinanPendingTTE.map((doc, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (idx * 0.1), type: "spring", stiffness: 250 }}
                className="p-5 bg-white border border-slate-100 hover:border-amber-200 rounded-[1.5rem] transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_10px_25px_rgba(245,158,11,0.15)] hover:scale-[1.02] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-2.5">
                  <span className="text-[10px] font-black bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-500 group-hover:text-amber-600 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors uppercase tracking-widest">{doc.id}</span>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 bg-white"><Clock size={12}/> {doc.time}</span>
                </div>
                
                <p className="font-black text-slate-800 text-sm truncate mb-1">{doc.name}</p>
                <p className="text-xs font-bold text-slate-500 truncate mb-4">{doc.service}</p>
                
                <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                     <CheckCircle2 size={14} className="text-emerald-500"/> OP: {doc.verifier}
                   </p>
                   <Link href="/pimpinan/persetujuan" className="text-[11px] font-black uppercase tracking-widest text-slate-300 group-hover:text-amber-500 flex items-center gap-1 transition-colors">
                     Tinjau <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatedButton 
            onClick={() => router.push('/pimpinan/persetujuan')}
            enableGlow={false}
            className="w-full bg-slate-900 text-white text-sm font-black py-4.5 rounded-[1.25rem] flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.2)]"
          >
            Lihat Semua Antrean TTE
          </AnimatedButton>
        </div>

      </motion.div>
    </motion.div>
  );
}