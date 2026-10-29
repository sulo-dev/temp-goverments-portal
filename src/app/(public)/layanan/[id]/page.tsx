"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { dummyServices } from "@/lib/dummy-data";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  Building, 
  CheckCircle, 
  AlertCircle, 
  FileUp, 
  ShieldCheck, 
  ChevronRight, 
  Share2, 
  Printer, 
  GitCommit,
  Sparkles
} from "lucide-react";
import AnimatedButton from "@/components/layout/AnimatedButton";

// Simulasi pengambilan data (Karena kita menggunakan "use client", kita ubah props params ini sesuai Next.js 14+)
export default function DetailLayanan({ params }: { params: { id: string } }) {
  const router = useRouter();
  const service = dummyServices.find((s) => s.id === params.id);

  if (!service) {
    // Handling 404 sederhana (atau bisa import notFound dari next/navigation)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <h1 className="text-2xl font-black text-slate-800">Layanan tidak ditemukan.</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          AMBIENT 3D BACKGROUND (GLOWING ORBS)
      ========================================= */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyber-red/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow mix-blend-multiply z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-orange/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow mix-blend-multiply z-0" style={{ animationDelay: '2s' }} />
      <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat pointer-events-none z-0" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-24 md:py-32">
        
        {/* =========================================
            TOP NAVIGATION BAR (GLASS)
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12"
        >
          <Link 
            href="/layanan" 
            className="inline-flex items-center gap-4 text-slate-500 hover:text-slate-900 transition-all font-black text-sm group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center justify-center group-hover:scale-110 group-hover:border-slate-200 transition-transform duration-300">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            Kembali ke Katalog
          </Link>

          {/* Action Buttons (Menggunakan AnimatedButton versi minimalis tanpa glow) */}
          <div className="flex items-center gap-3">
            <AnimatedButton enableGlow={false} className="flex items-center gap-2 px-5 py-3.5 bg-white/70 backdrop-blur-md border border-white text-slate-600 font-extrabold text-sm hover:text-slate-900 hover:bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
              <Printer size={18} /> Cetak Info
            </AnimatedButton>
            <AnimatedButton enableGlow={false} className="flex items-center gap-2 px-5 py-3.5 bg-white/70 backdrop-blur-md border border-white text-slate-600 font-extrabold text-sm hover:text-slate-900 hover:bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
              <Share2 size={18} /> Bagikan
            </AnimatedButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =========================================
              KOLOM KIRI: MAIN CONTENT
          ========================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 space-y-10"
          >
            {/* 3D Glass Hero Card */}
            <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-80 pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-neon-orange/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-neon-orange/30 transition-colors duration-700" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-md">
                  <Sparkles size={14} className="text-neon-orange" />
                  {service.category}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                  {service.name}
                </h1>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                  {service.description}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-slate-300/50 to-transparent mb-12"></div>

                {/* PERSYARATAN DOKUMEN */}
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4 tracking-tight">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-400/20 blur-md" />
                    <CheckCircle size={24} className="relative z-10" />
                  </div>
                  Dokumen Persyaratan
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  {service.requirements.map((req, idx) => (
                    <motion.div 
                      key={req.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white/50 backdrop-blur-md border border-white p-6 rounded-3xl flex items-start gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(250,77,9,0.1)] transition-all duration-300 group/req cursor-default"
                    >
                      <div className="mt-1 w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-100 shrink-0 text-slate-400 group-hover/req:text-neon-orange group-hover/req:scale-110 transition-all duration-300">
                        <FileUp size={24} />
                      </div>
                      <div>
                        <h3 className="text-slate-800 font-extrabold text-sm md:text-base leading-snug mb-3">
                          {req.name}
                        </h3>
                        <div>
                          {req.isMandatory ? (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-cyber-red bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">
                              <AlertCircle size={14}/> Wajib Diunggah
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                              Opsional
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ALUR PEMROSESAN */}
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4 tracking-tight">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-500 border border-blue-100 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-400/20 blur-md" />
                    <GitCommit size={24} className="relative z-10" />
                  </div>
                  Alur Operasional
                </h2>
                
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between relative z-10">
                    {[
                      { step: "1", title: "Pengajuan Online", desc: "Isi form & unggah berkas via portal" },
                      { step: "2", title: "Verifikasi OPD", desc: "Pengecekan keabsahan dokumen" },
                      { step: "3", title: "TTE & Terbit", desc: "Pengesahan final pimpinan" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 relative group/step">
                        <div className="flex items-start gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white font-black text-xl flex items-center justify-center shrink-0 z-10 relative border border-slate-700 shadow-inner group-hover/step:bg-neon-orange group-hover/step:border-neon-orange transition-colors duration-500">
                            <span className="relative z-10">{item.step}</span>
                            <div className="absolute inset-0 bg-neon-orange/50 blur-md opacity-0 group-hover/step:opacity-100 transition-opacity duration-500" />
                          </div>
                          <div className="pt-1">
                            <h4 className="font-extrabold text-white text-base mb-1">{item.title}</h4>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                        
                        {/* Garis Penghubung Desktop */}
                        {idx < 2 && (
                          <div className="hidden md:block absolute top-6 left-16 w-[calc(100%-4rem)] h-0.5 bg-slate-800 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-slate-700 to-slate-800 -translate-x-full group-hover/step:translate-x-full transition-transform duration-1000 ease-in-out" />
                          </div>
                        )}
                        {/* Garis Penghubung Mobile */}
                        {idx < 2 && <div className="md:hidden absolute top-14 left-6 w-0.5 h-full bg-slate-800" />}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* =========================================
              KOLOM KANAN: STICKY ACTION PANEL
          ========================================= */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 sticky top-32 space-y-6"
          >
            <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-neon-orange/20 rounded-full blur-[40px] pointer-events-none transition-colors duration-700" />
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent opacity-80 pointer-events-none" />
              
              <h3 className="text-slate-900 font-black text-2xl mb-10 relative z-10 tracking-tight">
                Ringkasan Eksekutif
              </h3>
              
              <div className="space-y-8 relative z-10">
                {/* Detail OPD */}
                <div className="flex gap-5 items-start group/opd cursor-default">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-white text-slate-800 flex items-center justify-center shrink-0 border border-slate-100 shadow-md group-hover/opd:scale-110 group-hover/opd:border-cyber-red transition-all duration-300">
                    <Building size={28} />
                  </div>
                  <div className="pt-1.5">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Instansi Pemroses</p>
                    <p className="text-slate-800 font-extrabold leading-snug">{service.opd}</p>
                  </div>
                </div>
                
                {/* Detail Waktu */}
                <div className="flex gap-5 items-start group/time cursor-default">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-white text-slate-800 flex items-center justify-center shrink-0 border border-slate-100 shadow-md group-hover/time:scale-110 group-hover/time:border-solar-yellow transition-all duration-300">
                    <Clock size={28} />
                  </div>
                  <div className="pt-1.5">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Estimasi Waktu SLA</p>
                    <p className="text-slate-800 font-extrabold leading-snug text-xl">{service.estimatedDays} Hari <span className="text-sm text-slate-500 font-bold">Kerja</span></p>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-200/60">
                  
                  {/* ✨ ANIMATED BUTTON V3.0 UNTUK CALL TO ACTION ✨ */}
                  <AnimatedButton 
                    onClick={() => router.push(`/layanan/${service.id}/ajukan`)}
                    glowColor="from-cyber-red to-neon-orange"
                    className="w-full flex items-center justify-between bg-slate-900 text-white p-2 pl-8 rounded-3xl text-lg font-black"
                  >
                    Mulai Pengajuan
                    <div className="w-12 h-12 rounded-[1.2rem] bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ChevronRight size={24} className="text-white" />
                    </div>
                  </AnimatedButton>
                  
                  <div className="mt-8 flex items-start gap-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 text-slate-600">
                    <div className="bg-emerald-100 p-2 rounded-full shrink-0">
                      <ShieldCheck size={20} className="text-emerald-600" />
                    </div>
                    <p className="text-xs leading-relaxed font-bold">
                      Layanan ini diproses <span className="text-emerald-600 font-black">Tanpa Pungutan Biaya (Gratis)</span>. Pastikan Anda mengunggah dokumen asli yang valid dan jelas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}