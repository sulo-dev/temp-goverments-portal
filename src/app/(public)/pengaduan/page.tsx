"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MessageSquare, Upload, CheckCircle, AlertTriangle, 
  Info, Shield, ArrowRight, FileText, Check, Sparkles, Loader2 
} from "lucide-react";

// Tipe data untuk form state
type FormData = {
  kategori: string;
  judul: string;
  deskripsi: string;
  lokasi: string;
};

// Tipe data untuk error state
type FormErrors = {
  kategori?: string;
  judul?: string;
  deskripsi?: string;
};

export default function LayananPengaduan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State untuk menyimpan nilai input
  const [formData, setFormData] = useState<FormData>({
    kategori: "",
    judul: "",
    deskripsi: "",
    lokasi: "",
  });

  // State untuk menyimpan pesan error
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
      newErrors.judul = "Judul laporan terlalu singkat (minimal 5 karakter).";
      isValid = false;
    }
    
    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi kronologi wajib diisi agar mudah ditindaklanjuti.";
      isValid = false;
    } else if (formData.deskripsi.length < 20) {
      newErrors.deskripsi = "Jelaskan kronologi secara lebih detail (minimal 20 karakter).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus pesan error saat user mulai mengetik ulang di field tersebut
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Jalankan validasi kustom
    if (!validateForm()) {
      return; 
    }

    setIsSubmitting(true);
    
    // Simulasi proses pengiriman data ke server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000); // 2 detik agar efek 3D loading terasa
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-in-up">
          <div className="max-w-3xl">
            {/* Floating 3D Badge */}
            <div className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-slate-800 text-sm font-extrabold mb-8 hover:shadow-[0_10px_30px_rgba(250,77,9,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =========================================
              KOLOM KIRI: FORM / SUCCESS STATE (8 KOLOM)
          ========================================= */}
          <div className="lg:col-span-8 animate-fade-in-up">
            {!isSubmitted ? (
              
              /* --- FORMULIR 3D GLASSMORPHISM --- */
              <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group/form">
                
                {/* Efek Glow Latar Belakang */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-neon-orange/10 via-cyber-red/5 to-transparent rounded-bl-full pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Formulir Laporan</h2>
                  <p className="text-slate-500 font-medium text-sm mb-10">Isi detail kejadian dengan jelas agar laporan mudah ditindaklanjuti.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      
                      {/* Kategori Laporan */}
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Kategori Laporan <span className="text-cyber-red">*</span></label>
                        <div className="relative">
                          <select 
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleInputChange}
                            className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner appearance-none cursor-pointer ${
                              errors.kategori ? "border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20 hover:border-slate-200"
                            }`}
                          >
                            <option value="" disabled className="font-medium text-slate-400">Pilih Kategori Laporan...</option>
                            <option value="infrastruktur">Infrastruktur & Jalan Raya</option>
                            <option value="pelayanan">Kualitas Pelayanan Publik</option>
                            <option value="kesehatan">Kesehatan & Lingkungan</option>
                            <option value="keamanan">Ketertiban & Keamanan</option>
                            <option value="lainnya">Lainnya</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <ArrowRight size={18} className="rotate-90" />
                          </div>
                        </div>
                        {errors.kategori && (
                          <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5 animate-fade-in-up">
                            <AlertTriangle size={14} /> {errors.kategori}
                          </p>
                        )}
                      </div>
                      
                      {/* Judul Laporan */}
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Judul Laporan <span className="text-cyber-red">*</span></label>
                        <input 
                          type="text" 
                          name="judul"
                          value={formData.judul}
                          onChange={handleInputChange}
                          placeholder="Cth: Jalan Berlubang di Poros Utama" 
                          className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 ${
                            errors.judul ? "border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20 hover:border-slate-200"
                          }`}
                        />
                        {errors.judul && (
                          <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5 animate-fade-in-up">
                            <AlertTriangle size={14} /> {errors.judul}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Detail Kronologi */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Detail Kronologi / Keluhan <span className="text-cyber-red">*</span></label>
                      <textarea 
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleInputChange}
                        rows={5} 
                        placeholder="Jelaskan secara runtut keluhan atau aspirasi Anda di sini..." 
                        className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 resize-none ${
                          errors.deskripsi ? "border-red-400 focus:ring-4 focus:ring-red-500/20" : "border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20 hover:border-slate-200"
                        }`}
                      ></textarea>
                      {errors.deskripsi && (
                        <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5 animate-fade-in-up">
                          <AlertTriangle size={14} /> {errors.deskripsi}
                        </p>
                      )}
                    </div>

                    {/* Lokasi */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Lokasi Kejadian <span className="text-slate-400 font-bold">(Opsional)</span></label>
                      <input 
                        type="text" 
                        name="lokasi"
                        value={formData.lokasi}
                        onChange={handleInputChange}
                        placeholder="Contoh: Jl. Poros Utama, Depan Pasar Tradisional" 
                        className="w-full bg-white/50 backdrop-blur-md border-2 border-white rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white focus:ring-4 focus:ring-neon-orange/20 focus:border-neon-orange transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 hover:border-slate-200" 
                      />
                    </div>

                    {/* Upload Zone */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Lampiran Bukti Foto/Video</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm hover:bg-white hover:border-neon-orange/50 hover:shadow-[0_10px_30px_rgba(250,77,9,0.1)] transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:border-neon-orange/30 group-hover:shadow-[0_10px_20px_rgba(250,77,9,0.2)] transition-all duration-300">
                          <Upload size={28} className="text-slate-400 group-hover:text-neon-orange transition-colors" />
                        </div>
                        <p className="text-base font-extrabold text-slate-700 group-hover:text-neon-orange transition-colors mb-2">Klik atau seret file ke sini</p>
                        <p className="text-sm font-medium text-slate-500">Maksimal ukuran file 10MB (JPG, PNG, MP4)</p>
                        <input type="file" className="hidden" />
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-10 border-t border-white/80 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-3 text-sm font-black text-emerald-600 bg-emerald-50 px-5 py-3 rounded-xl border border-emerald-100 w-full sm:w-auto justify-center shadow-sm">
                        <Shield size={20} className="text-emerald-500" />
                        Anonimitas Terjamin
                      </div>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="relative overflow-hidden w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_40px_rgba(250,77,9,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg group/btn hover:-translate-y-1"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyber-red to-neon-orange opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        {isSubmitting ? (
                          <span className="relative z-10 flex items-center gap-3"><Loader2 size={24} className="animate-spin" /> Memproses...</span>
                        ) : (
                          <span className="relative z-10 flex items-center gap-3">Kirim Laporan <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" /></span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* --- TAMPILAN SUKSES (Telah Tersubmit) PRO MAX --- */
              <div className="bg-white/60 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center animate-fade-in-up flex flex-col items-center">
                
                {/* 3D Checkmark */}
                <div className="relative w-40 h-40 mb-8 group">
                  <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-[40px] animate-pulse-slow" />
                  <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30" />
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center relative border-4 border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform duration-500">
                    <CheckCircle size={80} className="text-emerald-500" />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Laporan Terkirim!</h2>
                <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                  Terima kasih atas kepedulian Anda. Laporan telah masuk ke sistem dan akan segera diinvestigasi secara tertutup oleh instansi terkait.
                </p>
                
                {/* Dark Glass Ticket Box */}
                <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-700 shadow-[0_20px_50px_rgba(15,23,42,0.4)] relative overflow-hidden mb-12 w-full max-w-md">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-neon-orange/20 rounded-full blur-[60px] pointer-events-none" />
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-repeat pointer-events-none" />
                  
                  <div className="relative z-10">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Nomor Tiket Laporan</p>
                    <div className="text-4xl font-black text-white tracking-widest mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      TKT-2026-882
                    </div>
                    <div className="inline-flex items-center justify-center w-full gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-4 rounded-2xl text-sm font-bold shadow-sm">
                      <FileText size={18} className="text-neon-orange"/> Gunakan untuk melacak status
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-xl">
                  <button onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ kategori: "", judul: "", deskripsi: "", lokasi: "" });
                    setErrors({});
                  }} className="flex-1 flex items-center justify-center bg-white/80 backdrop-blur-md text-slate-800 border-2 border-white hover:bg-white px-8 py-5 rounded-2xl font-black transition-all text-lg shadow-sm hover:shadow-xl hover:-translate-y-1">
                    Lapor Lagi
                  </button>
                  <Link href="/lacak" className="flex-1 flex items-center justify-center bg-gradient-to-r from-cyber-red to-neon-orange hover:from-neon-orange hover:to-cyber-red text-white px-8 py-5 rounded-2xl font-black transition-all shadow-[0_10px_25px_rgba(250,77,9,0.3)] hover:shadow-[0_15px_35px_rgba(250,77,9,0.5)] text-lg hover:-translate-y-1">
                    Lacak Laporan
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* =========================================
              KOLOM KANAN: PANDUAN & PERINGATAN (4 KOLOM, STICKY)
          ========================================= */}
          <div className="lg:col-span-4 sticky top-32 space-y-8 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            
            {/* Panel Panduan (Glassmorphism) */}
            <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-neon-orange/20 rounded-full blur-[50px] pointer-events-none group-hover:bg-neon-orange/30 transition-colors duration-500" />
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent opacity-80 pointer-events-none" />
              
              <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4 relative z-10 tracking-tight">
                <div className="p-3 rounded-2xl bg-orange-50 text-neon-orange border border-orange-100 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-neon-orange/10 blur-sm" />
                  <Info size={28} className="relative z-10" />
                </div>
                Panduan Lapor
              </h3>
              
              <ul className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:to-transparent z-10">
                {[
                  { title: "Tulis Kronologi", desc: "Jelaskan permasalahan secara lengkap, runtut, dan jelas." },
                  { title: "Sertakan Bukti", desc: "Lampirkan foto atau video agar laporan lebih mudah diverifikasi." },
                  { title: "Terima Nomor Tiket", desc: "Sistem akan memberikan nomor tiket pelacakan otomatis." },
                  { title: "Pantau Progres", desc: "Gunakan fitur lacak untuk melihat status penyelesaian." }
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-6 relative group/step">
                    <div className="flex items-center justify-center w-12 h-12 rounded-[1rem] bg-white border-2 border-slate-100 text-slate-400 font-black shrink-0 mt-0.5 group-hover/step:border-neon-orange group-hover/step:text-neon-orange group-hover/step:bg-orange-50 group-hover/step:shadow-md transition-all duration-300 z-10 relative">
                      {idx + 1}
                    </div>
                    <div className="pb-2 pt-1">
                      <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover/step:text-neon-orange transition-colors">{step.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Panel Peringatan (Dark Glass) */}
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.4)] group hover:shadow-[0_25px_60px_rgba(220,38,38,0.2)] transition-shadow duration-500">
              {/* Latar Merah Menyala */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-red-600/40 rounded-full blur-[60px] pointer-events-none group-hover:bg-red-600/60 transition-colors duration-700" />
              <AlertTriangle className="absolute -bottom-8 -right-8 text-white/5 w-48 h-48 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/10 text-red-500 group-hover:scale-110 transition-transform duration-500">
                  <AlertTriangle size={28} />
                </div>
                <h3 className="font-black text-white text-2xl mb-4 tracking-tight">Peringatan Penting!</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Laporan palsu, fitnah, informasi hoaks, atau yang mengandung unsur SARA <strong className="text-red-400 font-bold border-b border-red-400/50">tidak akan diproses</strong> dan dapat ditindaklanjuti secara hukum sesuai dengan Undang-Undang ITE.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}