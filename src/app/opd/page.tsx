"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  opdDashboardStats, 
  opdChartData, 
  opdTopServices, 
  opdRecentActivities 
} from "@/lib/dummy-data";
import { 
  FileStack, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Activity,
  TrendingUp,
  FileText,
  BarChart3,
  PieChart,
  Calendar,
  MoreHorizontal,
  Sparkles
} from "lucide-react";
import AnimatedButton from "@/components/layout/AnimatedButton";

export default function BerandaOPD() {
  const maxChartValue = Math.max(...opdChartData.map(d => d.value));

  // Fungsi helper untuk merender ikon dinamis dari dummy-data
  const renderIcon = (type: string) => {
    switch (type) {
      case "file": return <FileStack size={24} />;
      case "clock": return <Clock size={24} />;
      case "alert": return <AlertCircle size={24} />;
      case "check": return <CheckCircle size={24} />;
      default: return <Activity size={24} />;
    }
  };

  // --- Varian Animasi Framer Motion ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 md:space-y-10 pb-12 font-sans selection:bg-neon-orange/30"
    >
      
      {/* =========================================
          1. HERO COMMAND CENTER (Deep Space Glass)
      ========================================= */}
      <motion.div variants={itemVariants} className="bg-slate-950 rounded-[3rem] p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col xl:flex-row items-center justify-between gap-10">
        
        {/* Animated Orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-neon-orange/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow mix-blend-screen" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyber-red/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow mix-blend-screen" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />
        
        <div className="relative z-10 xl:max-w-2xl w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-black mb-8 backdrop-blur-md shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Sesi Aktif: Verifikator DPMPTSP
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
            Selamat Datang di <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red flex items-center gap-3">
              Command Center <Sparkles size={36} className="text-neon-orange hidden md:block" />
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed max-w-xl">
            Anda memiliki <strong className="text-white px-2 py-0.5 bg-white/10 rounded-md">45 antrean baru</strong> yang memerlukan verifikasi hari ini. Percepat proses untuk menjaga SLA tetap hijau.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <AnimatedButton 
              onClick={() => window.location.href = "/opd/antrean"} 
              glowColor="from-cyber-red to-neon-orange"
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4.5 rounded-2xl font-black shadow-lg text-lg flex items-center justify-center gap-3"
            >
              Mulai Verifikasi <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
            
            <AnimatedButton 
              enableGlow={false}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-4.5 rounded-2xl font-bold transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm text-lg hover:bg-white/10"
            >
              Lihat Laporan Bulanan
            </AnimatedButton>
          </div>
        </div>

        {/* 3D KPI Cards */}
        <div className="relative z-10 hidden xl:flex flex-col gap-5 shrink-0">
          {[
            { label: "Rata-rata SLA", value: "1.2", unit: "Hari", icon: <Activity size={28} />, color: "emerald" },
            { label: "Tingkat Validitas", value: "94", unit: "%", icon: <CheckCircle size={28} />, color: "blue" }
          ].map((kpi, idx) => (
            <motion.div 
              key={idx}
              custom={idx}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: (i) => ({ opacity: 1, x: 0, transition: { delay: 0.6 + (i * 0.2), type: "spring" } })
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] flex items-center gap-6 w-72 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div className={`w-16 h-16 rounded-[1.25rem] bg-${kpi.color}-500/10 border border-${kpi.color}-500/20 flex items-center justify-center text-${kpi.color}-400 shrink-0 group-hover:scale-110 group-hover:bg-${kpi.color}-500/20 transition-all duration-500 shadow-inner`}>
                {kpi.icon}
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{kpi.label}</p>
                <p className="text-3xl font-black text-white tracking-tighter">{kpi.value} <span className="text-sm font-bold text-slate-500 tracking-normal">{kpi.unit}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* =========================================
          2. STATS GRID (Ultra-Glass Cards)
      ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {opdDashboardStats.map((stat, idx) => (
          <motion.div 
            variants={itemVariants}
            key={idx} 
            className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(250,77,9,0.1)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
          >
            {/* Ambient Glow Latar */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${stat.bg.replace('/50', '')}`} />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={`p-4 rounded-[1.25rem] ${stat.bg} ${stat.color} ${stat.border} border-2 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                {renderIcon(stat.iconType)}
              </div>
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border ${stat.trendUp ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-cyber-red bg-red-50 border-red-100'}`}>
                {stat.trendUp ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />} {stat.trend}
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* =========================================
          3. CHARTS SECTION (3D Columns & Glowing Bars)
      ========================================= */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bar Chart 3D */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-2 tracking-tight">
                <div className="p-2.5 rounded-xl bg-orange-50 text-neon-orange border border-orange-100"><BarChart3 size={24} /></div> Tren Pengajuan
              </h3>
              <p className="text-sm font-medium text-slate-500">Volume dokumen masuk selama 7 hari terakhir.</p>
            </div>
            <button className="p-3 text-slate-400 hover:text-neon-orange bg-white hover:bg-orange-50 border border-slate-100 hover:border-orange-100 rounded-2xl transition-all shadow-sm">
              <Calendar size={20} />
            </button>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 relative pt-6">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {[100, 75, 50, 25, 0].map((line, i) => (
                <div key={i} className="flex items-center gap-4 w-full opacity-40">
                  <span className="text-[10px] font-black text-slate-300 w-6 text-right">{line}</span>
                  <div className="flex-1 h-px border-b-2 border-dashed border-slate-200"></div>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-between items-end h-full pb-8 pl-12 relative z-10">
              {opdChartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-4 group w-full cursor-pointer">
                  {/* Floating Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl absolute -top-10 pointer-events-none transform -translate-y-4 group-hover:-translate-y-2 shadow-xl z-20">
                    {data.value} Berkas
                  </div>
                  
                  <div className="w-10 sm:w-14 bg-slate-100/80 rounded-t-2xl relative overflow-hidden h-full flex items-end group-hover:bg-slate-200/80 transition-colors border-x border-t border-white/50 shadow-inner">
                    {/* Animated Bar Height */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.value / maxChartValue) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                      className="w-full bg-gradient-to-t from-cyber-red to-neon-orange rounded-t-xl group-hover:brightness-110 shadow-[0_0_20px_rgba(250,77,9,0.3)] relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/40 rounded-t-xl" />
                    </motion.div>
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-neon-orange transition-colors">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layanan Terpopuler */}
        <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <div className="p-2.5 rounded-xl bg-red-50 text-cyber-red border border-red-100"><PieChart size={24} /></div> Terpopuler
            </h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={24}/></button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8">
            {opdTopServices.map((srv, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm font-extrabold text-slate-700 truncate max-w-[70%] group-hover:text-neon-orange transition-colors">{srv.name}</span>
                  <span className="text-base font-black text-slate-900">{srv.count} <span className="text-[10px] text-slate-400 uppercase tracking-widest">Kali</span></span>
                </div>
                <div className="w-full h-4 bg-slate-100/80 rounded-full overflow-hidden border border-white shadow-inner p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${srv.percentage}%` }}
                    transition={{ duration: 1.2, delay: 0.8 + (idx * 0.2), ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${srv.color} rounded-full relative`}
                  >
                    <div className="absolute top-0 right-0 w-3 h-full bg-white/50 rounded-full blur-[2px]" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* =========================================
          4. RECENT ACTIVITY TABLE (Floating Rows)
      ========================================= */}
      <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] overflow-hidden relative">
        <div className="p-8 md:p-10 border-b border-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight mb-2">
              <Activity size={28} className="text-neon-orange" /> Antrean Real-Time Masuk
            </h2>
            <p className="text-sm text-slate-500 font-medium">Daftar permohonan terakhir yang masuk melalui portal publik hari ini.</p>
          </div>
          <Link href="/opd/antrean" className="text-sm font-extrabold text-neon-orange hover:text-white transition-colors flex items-center gap-2 bg-white hover:bg-neon-orange px-6 py-4 rounded-2xl border-2 border-orange-100 hover:border-neon-orange shadow-sm group/link">
            Kelola Semua <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="overflow-x-auto p-4 md:p-6">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="text-xs font-black text-slate-400 uppercase tracking-widest border-b-2 border-slate-100">
                <th className="px-6 py-5 w-48">Nomor Tiket</th>
                <th className="px-6 py-5">Pemohon & Layanan</th>
                <th className="px-6 py-5 w-48">Waktu Masuk</th>
                <th className="px-6 py-5 text-center w-40">SLA Status</th>
                <th className="px-6 py-5 text-right w-40">Aksi</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr><td colSpan={5} className="h-2"></td></tr>
              
              {opdRecentActivities.map((activity, idx) => (
                <motion.tr 
                  variants={itemVariants}
                  key={idx} 
                  className="bg-white/50 hover:bg-white rounded-2xl transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:scale-[1.01] hover:z-10 relative cursor-pointer"
                >
                  <td className="px-6 py-5 rounded-l-2xl">
                    <div className="inline-flex items-center gap-2 font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl group-hover:bg-orange-50 group-hover:text-neon-orange group-hover:border-orange-200 transition-colors shadow-sm">
                      <FileText size={16} className="text-slate-400 group-hover:text-neon-orange" />
                      {activity.id}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-black text-slate-800 text-sm mb-1.5">{activity.name}</p>
                    <p className="text-xs font-bold text-slate-500 truncate max-w-[280px]" title={activity.service}>
                      {activity.service}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-slate-500">
                    <div className="flex items-center gap-2 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                      <Clock size={16} className="text-slate-400" /> {activity.time}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center justify-center px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 w-full shadow-sm ${
                      activity.status === 'Baru' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      activity.status === 'Revisi' ? 'bg-red-50 text-cyber-red border-red-200' :
                      'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                      {activity.status}
                    </span>
                    <p className={`text-[10px] font-black mt-2 uppercase tracking-widest ${
                      activity.sla.includes('Kedaluwarsa') ? 'text-cyber-red' : 'text-slate-400'
                    }`}>
                      SLA: {activity.sla}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-right rounded-r-2xl">
                    <Link href={`/opd/antrean/${activity.id}`} className="inline-flex items-center justify-center bg-slate-900 text-white hover:bg-neon-orange p-3.5 rounded-xl transition-all shadow-md hover:shadow-[0_8px_20px_rgba(250,77,9,0.3)] group/btn hover:-translate-y-1">
                      <ArrowRight size={20} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}