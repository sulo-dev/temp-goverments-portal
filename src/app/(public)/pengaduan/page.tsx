"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, CheckCircle, AlertTriangle, 
  Info, Shield, ArrowRight, FileText, Sparkles, Loader2 
} from "lucide-react";
import AnimatedButton from "@/components/layout/AnimatedButton";

type FormData = {
  kategori: string;
  judul: string;
  deskripsi: string;
  lokasi: string;
};

type FormErrors = {
  kategori?: string;
  judul?: string;
  deskripsi?: string;
};

export default function LayananPengaduan() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    kategori: "",
    judul: "",
    deskripsi: "",
    lokasi: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.kategori) {
      newErrors.kategori = "Silakan pilih kategori laporan Anda.";
      isValid = false;
    }
    if (!formData.judul.trim()) {
      newErrors.judul = "Judul laporan tidak boleh kosong.";
      isValid = false;
    } else if (formData.judul.length < 5) {
      newErrors.judul = "Judul laporan minimal 5 karakter.";
      isValid = false;
    }
    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi kronologi wajib diisi.";
      isValid = false;
    } else if (formData.deskripsi.length < 20) {
      newErrors.deskripsi = "Jelaskan lebih detail (minimal 20 karakter).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; 

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000); 
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          FIXED AMBIENT 3D BACKGROUND
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyber-red/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] bg-neon-orange/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-24 md:py-32 min-h-[85vh]">
        
        {/* =========================================
            HEADER SECTION
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-3xl">
            {/* Floating 3D Badge */}
            <div className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-slate-800 text-sm font-extrabold mb-8 hover:shadow-[0_10px_30px_rgba(250,77,9,0.15)] cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Sparkles size={16} className="text-neon-orange" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-cyber-red">
                Suara Masyarakat
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
              Layanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Pengaduan</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
              Sampaikan laporan, keluhan, atau aspirasi Anda terkait infrastruktur dan pelayanan publik. Kami menjamin kerahasiaan identitas dan data Anda.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =========================================
              KOLOM KIRI: FORM / SUCCESS STATE
          ========================================= */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                /* --- FORMULIR PENGADUAN --- */
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group/form"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-neon-orange/10 via-cyber-red/5 to-transparent rounded-bl-full pointer-events-none" />

                  <div className="relative z-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Formulir Laporan</h2>
                    <p className="text-slate-500 font-medium text-sm mb-10">Isi detail kejadian dengan jelas agar laporan mudah ditindaklanjuti.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Kategori */}
                        <div className="space-y-3">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Kategori Laporan <span className="text-cyber-red">*</span></label>
                          <div className="relative">
                            <select 
                              name="kategori"
                              value={formData.kategori}
                              onChange={handleInputChange}
                              className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner appearance-none cursor-pointer ${
                                errors.kategori ? "border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20"
                              }`}
                            >
                              <option value="" disabled className="font-medium text-slate-400">Pilih Kategori...</option>
                              <option value="infrastruktur">Infrastruktur & Jalan Raya</option>
                              <option value="pelayanan">Kualitas Pelayanan Publik</option>
                              <option value="kesehatan">Kesehatan & Lingkungan</option>
                              <option value="keamanan">Ketertiban & Keamanan</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><ArrowRight size={18} className="rotate-90" /></div>
                          </div>
                          {errors.kategori && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5"><AlertTriangle size={14} /> {errors.kategori}</p>}
                        </div>
                        
                        {/* Judul */}
                        <div className="space-y-3">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Judul Laporan <span className="text-cyber-red">*</span></label>
                          <input 
                            type="text" 
                            name="judul"
                            value={formData.judul}
                            onChange={handleInputChange}
                            placeholder="Cth: Jalan Berlubang..." 
                            className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 ${
                              errors.judul ? "border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20"
                            }`}
                          />
                          {errors.judul && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5"><AlertTriangle size={14} /> {errors.judul}</p>}
                        </div>
                      </div>

                      {/* Deskripsi */}
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Detail Kronologi <span className="text-cyber-red">*</span></label>
                        <textarea 
                          name="deskripsi"
                          value={formData.deskripsi}
                          onChange={handleInputChange}
                          rows={5} 
                          placeholder="Jelaskan secara runtut..." 
                          className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 resize-none ${
                            errors.deskripsi ? "border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20"
                          }`}
                        ></textarea>
                        {errors.deskripsi && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5"><AlertTriangle size={14} /> {errors.deskripsi}</p>}
                      </div>

                      {/* Upload & Lokasi */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                         <div className="space-y-3">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Lokasi Opsional</label>
                          <input 
                            type="text" 
                            name="lokasi"
                            value={formData.lokasi}
                            onChange={handleInputChange}
                            placeholder="Detail Jalan / Patokan..." 
                            className="w-full bg-white/50 backdrop-blur-md border-2 border-white rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white focus:ring-4 focus:ring-neon-orange/20 focus:border-neon-orange transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Lampiran Bukti</label>
                          <div className="border-2 border-dashed border-slate-300 rounded-[1.5rem] py-3.5 px-4 flex items-center justify-center gap-3 bg-white/40 backdrop-blur-sm hover:bg-white hover:border-neon-orange/50 transition-all cursor-pointer group">
                            <Upload size={20} className="text-slate-400 group-hover:text-neon-orange transition-colors" />
                            <span className="text-sm font-bold text-slate-600 group-hover:text-neon-orange">Pilih File (Max 10MB)</span>
                            <input type="file" className="hidden" />
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions with AnimatedButton */}
                      <div className="pt-8 border-t border-white/80 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2 text-sm font-black text-emerald-600 bg-emerald-50/80 px-4 py-2.5 rounded-xl border border-emerald-100 w-full sm:w-auto justify-center shadow-sm">
                          <Shield size={18} /> Anonimitas Terjamin
                        </div>
                        
                        <AnimatedButton 
                          type="submit"
                          disabled={isSubmitting}
                          glowColor="from-cyber-red to-neon-orange"
                          className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 text-base"
                        >
                          {isSubmitting ? (
                            <><Loader2 size={20} className="animate-spin" /> Memproses...</>
                          ) : (
                            <>Kirim Laporan <ArrowRight size={20} className="ml-1" /></>
                          )}
                        </AnimatedButton>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                
                /* --- TAMPILAN SUKSES (TIKET) --- */
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white/60 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center flex flex-col items-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                    className="relative w-40 h-40 mb-8"
                  >
                    <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-[40px] animate-pulse-slow" />
                    <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center relative border-4 border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                      <CheckCircle size={80} className="text-emerald-500" />
                    </div>
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Laporan Terkirim!</h2>
                  <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                    Terima kasih atas kepedulian Anda. Laporan telah masuk ke sistem dan akan segera diinvestigasi secara tertutup oleh instansi terkait.
                  </p>
                  
                  {/* Dark Glass Ticket Box */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                    className="bg-slate-900 p-10 rounded-[3rem] border border-slate-700 shadow-[0_20px_50px_rgba(15,23,42,0.4)] relative overflow-hidden mb-12 w-full max-w-md group"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-orange/20 rounded-full blur-[60px] pointer-events-none" />
                    <div className="relative z-10">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Nomor Tiket Laporan</p>
                      <div className="text-4xl font-black text-white tracking-widest mb-8">TKT-2026-882</div>
                      <div className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-4 rounded-2xl text-sm font-bold border border-white/20">
                        <FileText size={18} className="text-neon-orange"/> Gunakan untuk melacak status
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-xl">
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ kategori: "", judul: "", deskripsi: "", lokasi: "" });
                        setErrors({});
                      }} 
                      className="flex-1 bg-white/80 border-2 border-white hover:bg-white px-8 py-4 rounded-2xl font-black text-slate-800 transition-all shadow-sm hover:shadow-md"
                    >
                      Lapor Lagi
                    </button>
                    <div className="flex-1">
                      <AnimatedButton 
                        onClick={() => router.push("/lacak")}
                        glowColor="from-cyber-red to-neon-orange"
                        className="w-full bg-slate-900 text-white px-8 py-4"
                      >
                        Lacak Laporan
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =========================================
              KOLOM KANAN: PANDUAN & PERINGATAN
          ========================================= */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 sticky top-32 space-y-8"
          >
            {/* Panel Panduan (Glassmorphism) */}
            <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-neon-orange/20 rounded-full blur-[50px] pointer-events-none" />
              <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4 relative z-10 tracking-tight">
                <div className="p-3 rounded-2xl bg-orange-50 text-neon-orange border border-orange-100 shadow-sm relative overflow-hidden">
                  <Info size={28} />
                </div>
                Panduan Lapor
              </h3>
              
              <ul className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:to-transparent z-10">
                {[
                  { title: "Tulis Kronologi", desc: "Jelaskan permasalahan secara lengkap, runtut, dan jelas." },
                  { title: "Sertakan Bukti", desc: "Lampirkan foto atau video agar laporan mudah diverifikasi." },
                  { title: "Terima Tiket", desc: "Sistem akan memberi nomor tiket pelacakan otomatis." },
                  { title: "Pantau Progres", desc: "Gunakan fitur lacak melihat status penyelesaian." }
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-6 relative group/step">
                    <div className="flex items-center justify-center w-12 h-12 rounded-[1rem] bg-white border-2 border-slate-100 text-slate-400 font-black shrink-0 mt-0.5 transition-all duration-300 z-10 relative">
                      {idx + 1}
                    </div>
                    <div className="pb-2 pt-1">
                      <h4 className="text-base font-extrabold text-slate-800 mb-1.5">{step.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Panel Peringatan (Dark Glass) */}
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.4)] group">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-red-600/40 rounded-full blur-[60px] pointer-events-none group-hover:bg-red-600/60 transition-colors" />
              <AlertTriangle className="absolute -bottom-8 -right-8 text-white/5 w-48 h-48 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/10 text-red-500 group-hover:scale-110 transition-transform">
                  <AlertTriangle size={28} />
                </div>
                <h3 className="font-black text-white text-2xl mb-4 tracking-tight">Peringatan Penting!</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Laporan palsu, fitnah, informasi hoaks, atau yang mengandung unsur SARA <strong className="text-red-400 font-bold border-b border-red-400/50">tidak diproses</strong> dan dapat ditindak secara hukum sesuai UU ITE.
                </p>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}