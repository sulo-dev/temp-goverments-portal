"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import AnimatedButton from "@/components/layout/AnimatedButton";
import {
  Activity,
  BarChart4,
  CalendarDays,
  Filter,
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  PieChart,
  Target,
  ShieldCheck,
  Printer,
  Sparkles,
} from "lucide-react";

// --- DATA STATISTIK ---
const reportStats = [
  {
    title: "Total Dokumen Masuk",
    value: "1,248",
    unit: "Berkas",
    trend: "+12.5%",
    isUp: true,
    icon: <FileText size={24} />,
    color: "text-blue-500",
    glow: "bg-blue-500",
  },
  {
    title: "Berhasil Diterbitkan",
    value: "1,180",
    unit: "SK/Izin",
    trend: "+15.0%",
    isUp: true,
    icon: <ShieldCheck size={24} />,
    color: "text-emerald-500",
    glow: "bg-emerald-500",
  },
  {
    title: "Tingkat Penolakan",
    value: "5.4",
    unit: "%",
    trend: "-2.1%",
    isUp: true,
    icon: <TrendingDown size={24} />,
    color: "text-red-500",
    glow: "bg-red-500",
  },
  {
    title: "Rata-rata SLA",
    value: "1.2",
    unit: "Hari",
    trend: "Optimal",
    isUp: true,
    icon: <Clock size={24} />,
    color: "text-amber-500",
    glow: "bg-amber-500",
  },
];

const trendData = [
  { month: "Mei", total: 180, approved: 170 },
  { month: "Jun", total: 220, approved: 205 },
  { month: "Jul", total: 210, approved: 190 },
  { month: "Ags", total: 280, approved: 260 },
  { month: "Sep", total: 250, approved: 235 },
  { month: "Okt", total: 290, approved: 280 },
];

const serviceDistribution = [
  {
    name: "Persetujuan Bangunan Gedung",
    count: 450,
    percentage: 38,
    color: "from-amber-400 to-amber-600",
  },
  {
    name: "Izin Praktik Tenaga Kesehatan",
    count: 320,
    percentage: 27,
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Izin Usaha Mikro & Kecil",
    count: 280,
    percentage: 23,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    name: "Layanan Kependudukan Lainnya",
    count: 130,
    percentage: 12,
    color: "from-purple-400 to-purple-600",
  },
];

export default function LaporanKinerjaPimpinan() {
  const [period, setPeriod] = useState("Semester 2 - 2026");

  const handlePrint = () => {
    window.print();
  };

  const maxTotal = Math.max(...trendData.map((d) => d.total));

  // --- Varian Animasi ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 md:space-y-10 pb-12 font-sans selection:bg-amber-500/30"
    >
      {/* =========================================
          INJEKSI CSS UNTUK PRINT REPORT
      ========================================= */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #executive-report, #executive-report * { visibility: visible !important; }
          #executive-report { 
            position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 20px; 
            background: white; box-shadow: none; border: none;
          }
          .print-hide { display: none !important; }
          .print-show { display: block !important; }
          .chart-bar-bg { background-color: #f1f5f9 !important; }
          .chart-bar-fill { background-color: #f59e0b !important; background-image: none !important; }
        }
      `}</style>

      {/* =========================================
          HEADER EKSEKUTIF
      ========================================= */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 print-hide"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-3">
            <div className="p-3 bg-white border border-slate-200 shadow-[0_10px_20px_rgba(0,0,0,0.05)] rounded-2xl hidden sm:block">
              <BarChart4 className="text-amber-500" size={32} />
            </div>
            Laporan & Analitik
          </h1>
          <p className="text-slate-500 font-bold text-lg max-w-2xl leading-relaxed">
            Pusat pantauan metrik kinerja layanan secara komprehensif untuk
            mendukung keputusan strategis Bapak/Ibu Pimpinan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AnimatedButton
            onClick={handlePrint}
            enableGlow={false}
            className="flex items-center gap-2.5 px-8 py-4 bg-slate-950 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] text-base group"
          >
            <Printer
              size={20}
              className="group-hover:text-amber-400 transition-colors"
            />
            <span>Cetak Laporan</span>
          </AnimatedButton>
        </div>
      </motion.div>

      {/* =========================================
          FILTER BAR (Capsule Glass)
      ========================================= */}
      <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-2xl p-5 md:p-6 rounded-[2.5rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row gap-5 print-hide relative z-10"
      >
        <div className="relative flex-1 group/filter">
          <CalendarDays
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/filter:text-amber-500 transition-colors pointer-events-none"
            size={20}
          />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full appearance-none bg-slate-50/50 border-2 border-white hover:border-slate-200 rounded-[1.5rem] py-4 pl-14 pr-12 text-sm font-black text-slate-800 focus:outline-none focus:bg-white focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm cursor-pointer"
          >
            <option value="Bulan Ini (Okt 2026)">Bulan Ini (Okt 2026)</option>
            <option value="Kuartal 3 - 2026">
              Kuartal 3 - 2026 (Jul - Sep)
            </option>
            <option value="Semester 2 - 2026">
              Semester 2 - 2026 (Jul - Des)
            </option>
            <option value="Tahun 2026">Tahun 2026 (Jan - Des)</option>
          </select>
        </div>

        <div className="relative flex-1 group/filter2">
          <Filter
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/filter2:text-amber-500 transition-colors pointer-events-none"
            size={20}
          />
          <select className="w-full appearance-none bg-slate-50/50 border-2 border-white hover:border-slate-200 rounded-[1.5rem] py-4 pl-14 pr-12 text-sm font-black text-slate-800 focus:outline-none focus:bg-white focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm cursor-pointer">
            <option value="Semua Layanan">Semua Kategori Layanan</option>
            <option value="Perizinan Berusaha">Perizinan Berusaha (OSS)</option>
            <option value="Non-Perizinan">Non-Perizinan & Rekomendasi</option>
          </select>
        </div>
      </motion.div>

      {/* =========================================
          AREA CETAK & LAPORAN UTAMA
      ========================================= */}
      <div id="executive-report" className="space-y-8 md:space-y-10 relative">
        {/* Kop Laporan (Hanya untuk Print) */}
        <div className="hidden print:block text-center border-b-4 border-slate-900 pb-8 mb-10 mt-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-slate-400">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest leading-tight">
            Laporan Kinerja Pelayanan Publik
          </h2>
          <p className="text-base font-bold text-slate-600 mt-2 tracking-widest uppercase">
            Periode Laporan: {period}
          </p>
        </div>

        {/* 1. KARTU METRIK UTAMA (3D Glass) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportStats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-500 group relative overflow-hidden cursor-default"
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-10 ${stat.glow} pointer-events-none group-hover:opacity-20 transition-opacity duration-700`}
              />

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div
                  className={`p-4 rounded-2xl bg-white border border-slate-100 shadow-sm ${stat.color} group-hover:scale-110 transition-transform duration-500`}
                >
                  {stat.icon}
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border shadow-sm ${stat.isUp ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-red-600 bg-red-50 border-red-100"}`}
                >
                  {stat.isUp ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}{" "}
                  {stat.trend}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter flex items-baseline gap-1.5">
                  {stat.value}{" "}
                  <span className="text-sm font-bold text-slate-400">
                    {stat.unit}
                  </span>
                </h3>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. AREA GRAFIK & DISTRIBUSI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- CHART TREN VOLUME (Glass Cylinder 3D) --- */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <div>
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 border border-amber-100">
                    <Activity size={24} />
                  </div>
                  Tren Volume Pelayanan
                </h3>
                <p className="text-sm font-bold text-slate-500 mt-2">
                  Komparasi total dokumen masuk dan dokumen disahkan.
                </p>
              </div>

              {/* Legend */}
              <div className="flex gap-5 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 print-hide shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-200 shadow-inner"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Masuk
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-800">
                    Disahkan
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-4 relative pt-6 min-h-[300px]">
              {/* Garis Latar (Axis) */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[300, 225, 150, 75, 0].map((line, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 w-full opacity-40"
                  >
                    <span className="text-[10px] font-black text-slate-300 w-8 text-right">
                      {line}
                    </span>
                    <div className="flex-1 h-px border-b-2 border-dashed border-slate-200"></div>
                  </div>
                ))}
              </div>

              {/* Batang Grafik 3D (Animasi Tumbuh) */}
              <div className="w-full flex justify-between items-end h-full pb-8 pl-14 relative z-10">
                {trendData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 w-full group relative cursor-crosshair"
                  >
                    <div className="flex items-end justify-center gap-1 sm:gap-2 h-full w-full relative z-10">
                      {/* Bar Total (Abu-abu Glass) */}
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: `${(data.total / maxTotal) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + index * 0.1,
                          ease: "easeOut",
                        }}
                        className="w-5 sm:w-10 bg-slate-100/80 rounded-t-[1rem] relative overflow-hidden flex items-end border-x border-t border-white shadow-inner chart-bar-bg group-hover:bg-slate-200/80 transition-colors duration-500"
                      />

                      {/* Bar Disahkan (Emas Metalik 3D) */}
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: `${(data.approved / maxTotal) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: 0.3 + index * 0.1,
                          ease: "easeOut",
                        }}
                        className="w-5 sm:w-10 rounded-t-[1rem] relative overflow-hidden flex items-end shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-shadow duration-700 ease-out"
                      >
                        <div className="w-full h-full bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-300 rounded-t-[1rem] chart-bar-fill relative">
                          <div className="absolute top-0 left-0 w-full h-2 bg-white/40 rounded-t-[1rem] print-hide" />
                        </div>
                      </motion.div>
                    </div>

                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                      {data.month}
                    </span>

                    {/* Tooltip Cinematic Hover */}
                    <div className="opacity-0 group-hover:opacity-100 print-hide transition-all duration-300 bg-slate-950 text-white p-4 rounded-2xl absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none min-w-[140px] z-30 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-slate-700 transform scale-95 group-hover:scale-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 pb-2.5 border-b border-slate-800">
                        {data.month} 2026
                      </p>
                      <div className="space-y-1.5">
                        <p className="text-xs font-bold flex items-center justify-between gap-4">
                          Masuk:{" "}
                          <span className="text-white font-black">
                            {data.total}
                          </span>
                        </p>
                        <p className="text-xs font-bold flex items-center justify-between gap-4">
                          Disahkan:{" "}
                          <span className="text-amber-400 font-black">
                            {data.approved}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- DISTRIBUSI LAYANAN (Holographic Dark Panel) --- */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-950 p-8 md:p-10 rounded-[3rem] border border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col relative overflow-hidden group"
          >
            {/* Background Ambient Glow & Grid */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber-500/20 transition-colors duration-1000" />

            <h3 className="text-2xl font-black text-white flex items-center gap-3 mb-10 relative z-10 tracking-tight">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <PieChart size={24} />
              </div>
              Distribusi Layanan
            </h3>

            <div className="space-y-7 flex-1 relative z-10">
              {serviceDistribution.map((item, idx) => (
                <div key={idx} className="group/item">
                  <div className="flex justify-between items-end mb-2.5">
                    <p
                      className="text-sm font-bold text-slate-300 max-w-[200px] truncate leading-tight group-hover/item:text-white transition-colors"
                      title={item.name}
                    >
                      {item.name}
                    </p>
                    <p className="text-base font-black text-white">
                      {item.percentage}%
                    </p>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden shadow-inner border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 0.4 + idx * 0.1,
                        ease: "easeOut",
                      }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -translate-x-full" />
                    </motion.div>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest group-hover/item:text-slate-400 transition-colors">
                    {item.count} Dokumen
                  </p>
                </div>
              ))}
            </div>

            {/* Rekomendasi / Top Service */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 relative z-10">
              <div className="flex items-center gap-4 bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 backdrop-blur-md">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0">
                  <Target size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest">
                    Kategori Terbanyak
                  </p>
                  <p className="text-sm font-black text-white mt-1 leading-tight tracking-tight">
                    Persetujuan Bangunan Gedung
                  </p>
                </div>
                <Sparkles
                  size={20}
                  className="text-amber-500/40 absolute top-4 right-4"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
