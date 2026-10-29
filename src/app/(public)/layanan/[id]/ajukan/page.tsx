"use client";

import { useState, use, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dummyServices } from "@/lib/dummy-data";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, CheckCircle, Upload, FileText, 
  User, ShieldCheck, AlertCircle, AlertTriangle, FileUp, 
  Check, Building, Clock, Info, Loader2, Sparkles, ChevronRight 
} from "lucide-react";
import AnimatedButton from "@/components/layout/AnimatedButton";

// Tipe Data untuk Form
type FormData = {
  nik: string;
  nama: string;
  email: string;
  whatsapp: string;
  files: Record<string, string>;
  consent: boolean;
};

// Tipe Data untuk Error
type FormErrors = {
  nik?: string;
  nama?: string;
  email?: string;
  whatsapp?: string;
  files?: Record<string, string>;
  consent?: string;
};

// =========================================
// KOMPONEN KONTEN UTAMA
// =========================================
function FormulirContent({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const service = dummyServices.find((s) => s.id === id);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nik: "",
    nama: "",
    email: "",
    whatsapp: "",
    files: {},
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  if (!service) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center gap-6 relative z-10">
        <div className="w-24 h-24 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white shadow-2xl flex items-center justify-center text-slate-300">
          <AlertCircle size={48} />
        </div>
        <p className="text-slate-800 font-black text-2xl tracking-tight">Layanan tidak ditemukan.</p>
        <AnimatedButton onClick={() => router.push("/layanan")} className="bg-slate-900 text-white px-6 py-3">
          Kembali ke Katalog
        </AnimatedButton>
      </div>
    );
  }

  // --- LOGIKA VALIDASI ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileUpload = (reqId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        files: { ...prev.files, [reqId]: file.name }
      }));
      
      if (errors.files?.[reqId]) {
        setErrors((prev) => ({
          ...prev,
          files: { ...prev.files, [reqId]: "" }
        }));
      }
    }
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.nik.trim()) { newErrors.nik = "NIK wajib diisi."; isValid = false; } 
    else if (!/^\d{16}$/.test(formData.nik)) { newErrors.nik = "NIK harus berupa 16 digit angka."; isValid = false; }
    if (!formData.nama.trim()) { newErrors.nama = "Nama lengkap wajib diisi."; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = "Alamat email wajib diisi."; isValid = false; } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = "Format email tidak valid."; isValid = false; }
    if (!formData.whatsapp.trim()) { newErrors.whatsapp = "Nomor WhatsApp wajib diisi."; isValid = false; } 
    else if (!/^\d{9,14}$/.test(formData.whatsapp)) { newErrors.whatsapp = "Nomor WhatsApp harus valid (9-14 digit angka)."; isValid = false; }
    
    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newFileErrors: Record<string, string> = {};
    let isValid = true;
    service.requirements.forEach((req) => {
      if (req.isMandatory && !formData.files[req.id]) {
        newFileErrors[req.id] = `Dokumen ${req.name} wajib diunggah.`;
        isValid = false;
      }
    });
    setErrors({ files: newFileErrors });
    return isValid;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!formData.consent) {
      setErrors({ consent: "Anda harus menyetujui pernyataan validitas data sebelum mengirim." });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000); 
  };

  // Varian Animasi untuk Transisi Form
  const formVariants: Variants = {
    hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, x: -20, filter: "blur(4px)", transition: { duration: 0.2 } }
  };

  return (
    <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-24 md:py-32">
      
      {/* --- HEADER HALAMAN --- */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <Link 
          href={`/layanan/${id}`} 
          className="inline-flex items-center gap-4 text-slate-500 hover:text-slate-900 transition-all font-black text-sm group mb-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center justify-center group-hover:scale-110 group-hover:border-slate-200 transition-transform duration-300">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          Kembali ke Detail Layanan
        </Link>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
          Formulir <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Pengajuan</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
          Lengkapi data diri dan unggah dokumen persyaratan untuk memproses layanan <strong className="text-slate-800">{service.name}</strong>.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* =========================================
            KOLOM KIRI: AREA WIZARD FORM
        ========================================= */}
        <div className="lg:col-span-8">
          
          {/* --- 3D GLOWING STEPPER --- */}
          {step < 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-12 relative px-2 md:px-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 bg-slate-200/50 z-0 rounded-full backdrop-blur-sm" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-cyber-red to-neon-orange z-0 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(250,77,9,0.5)]" 
                style={{ width: `${((step - 1) / 2) * 100}%` }} 
              />
              {[ 
                { num: 1, label: "Data Pemohon", icon: <User size={20} /> },
                { num: 2, label: "Unggah Berkas", icon: <FileText size={20} /> },
                { num: 3, label: "Konfirmasi", icon: <ShieldCheck size={20} /> }
              ].map((item) => (
                <div key={item.num} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] flex items-center justify-center font-bold border-4 transition-all duration-500 shadow-xl ${
                    step > item.num 
                      ? "bg-gradient-to-br from-neon-orange to-cyber-red border-transparent text-white shadow-[0_10px_20px_rgba(250,77,9,0.3)]" :
                    step === item.num 
                      ? "bg-white border-neon-orange text-neon-orange shadow-[0_0_30px_rgba(250,77,9,0.3)] scale-110" : 
                    "bg-white/80 backdrop-blur-md border-white text-slate-300 shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                  }`}>
                    {step > item.num ? <Check size={28} strokeWidth={4} /> : item.icon}
                  </div>
                  <span className={`text-sm font-black transition-colors duration-500 uppercase tracking-widest ${step >= item.num ? "text-slate-800" : "text-slate-400"} hidden md:block absolute -bottom-8 whitespace-nowrap`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* --- KONTAINER FORM INTI (DENGAN ANIMATE PRESENCE) --- */}
          <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden mb-8" style={{ marginTop: step < 4 ? '3rem' : '0' }}>
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-neon-orange/10 via-cyber-red/5 to-transparent rounded-bl-full pointer-events-none" />

            <AnimatePresence mode="wait">
              
              {/* LANGKAH 1: Data Pemohon */}
              {step === 1 && (
                <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10 relative z-10">
                  <div className="border-b border-slate-200/50 pb-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Informasi Identitas</h2>
                    <p className="text-slate-500 font-medium">Pastikan data yang Anda masukkan sesuai dengan Kartu Identitas Resmi (KTP).</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nomor Induk Kependudukan (NIK) <span className="text-cyber-red">*</span></label>
                      <input 
                        type="text" name="nik" value={formData.nik} onChange={handleInputChange} placeholder="16 Digit Angka" 
                        className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 ${errors.nik ? 'border-red-400 focus:ring-4 focus:ring-red-500/20' : 'border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20'}`}
                      />
                      {errors.nik && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5"><AlertTriangle size={14}/> {errors.nik}</p>}
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap Sesuai KTP <span className="text-cyber-red">*</span></label>
                      <input 
                        type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Nama Lengkap" 
                        className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 ${errors.nama ? 'border-red-400 focus:ring-4 focus:ring-red-500/20' : 'border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20'}`}
                      />
                      {errors.nama && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5"><AlertTriangle size={14}/> {errors.nama}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Alamat Email <span className="text-cyber-red">*</span></label>
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="contoh@email.com" 
                        className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 ${errors.email ? 'border-red-400 focus:ring-4 focus:ring-red-500/20' : 'border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20'}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5"><AlertTriangle size={14}/> {errors.email}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nomor WhatsApp Aktif <span className="text-cyber-red">*</span></label>
                      <input 
                        type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="08xxxxxxxxxx" 
                        className={`w-full bg-white/50 backdrop-blur-md border-2 rounded-2xl px-6 py-4 text-slate-800 focus:outline-none focus:bg-white transition-all font-extrabold shadow-inner placeholder:font-medium placeholder:text-slate-300 ${errors.whatsapp ? 'border-red-400 focus:ring-4 focus:ring-red-500/20' : 'border-white focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20'}`}
                      />
                      {errors.whatsapp && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1.5"><AlertTriangle size={14}/> {errors.whatsapp}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LANGKAH 2: Unggah Berkas */}
              {step === 2 && (
                <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10 relative z-10">
                  <div className="border-b border-slate-200/50 pb-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Unggah Dokumen</h2>
                    <p className="text-slate-500 font-medium">Unggah berkas dalam format PDF atau JPG. Ukuran maksimal 5MB per file.</p>
                  </div>
                  
                  <div className="space-y-6">
                    {service.requirements.map((req) => {
                      const isUploaded = !!formData.files[req.id];
                      const hasError = !!errors.files?.[req.id];

                      return (
                        <div 
                          key={req.id} 
                          className={`bg-white/50 backdrop-blur-md border-2 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 group ${hasError ? 'border-red-400 shadow-[0_10px_30px_rgba(239,68,68,0.1)]' : 'border-white hover:border-neon-orange/50 hover:shadow-[0_15px_40px_rgba(250,77,9,0.1)]'}`}
                        >
                          <div className="flex gap-5 items-start">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shrink-0 transition-all duration-500 ${isUploaded ? 'bg-emerald-50 border-emerald-200 text-emerald-500' : 'bg-white border-slate-100 text-slate-400 group-hover:text-neon-orange group-hover:scale-110 shadow-sm'}`}>
                              {isUploaded ? <CheckCircle size={28} /> : <FileUp size={24} />}
                            </div>
                            <div>
                              <h3 className="font-extrabold text-slate-800 text-base leading-snug mb-2">{req.name}</h3>
                              <div className="flex flex-wrap items-center gap-2">
                                {req.isMandatory ? (
                                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-cyber-red bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                    <AlertCircle size={14}/> Wajib
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                    Opsional
                                  </span>
                                )}
                                {isUploaded && (
                                  <span className="text-xs font-black text-emerald-600 truncate max-w-[150px] md:max-w-[250px] bg-emerald-50 px-3 py-1.5 rounded-lg">
                                    {formData.files[req.id]}
                                  </span>
                                )}
                              </div>
                              {hasError && <p className="text-red-500 text-xs font-bold mt-3 flex items-center gap-1.5"><AlertTriangle size={14}/> {errors.files?.[req.id]}</p>}
                            </div>
                          </div>
                          
                          <div className="relative shrink-0">
                            <input 
                              type="file" 
                              onChange={(e) => handleFileUpload(req.id, e)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black transition-all border-2 w-full sm:w-auto shadow-sm relative z-0 overflow-hidden ${isUploaded ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-900 text-white border-slate-900'}`}>
                              <span className="relative z-10 flex items-center gap-2"><Upload size={18} /> {isUploaded ? 'Ganti File' : 'Pilih File'}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* LANGKAH 3: Konfirmasi */}
              {step === 3 && (
                <motion.div key="step3" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10 relative z-10">
                  <div className="border-b border-slate-200/50 pb-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Tinjau & Konfirmasi Akhir</h2>
                    <p className="text-slate-500 font-medium">Pastikan seluruh isian formulir dan dokumen telah dilampirkan dengan benar.</p>
                  </div>
                  
                  <div className={`bg-gradient-to-br from-white/80 to-orange-50/80 backdrop-blur-xl border-2 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-xl transition-colors ${errors.consent ? 'border-red-400' : 'border-white'}`}>
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-neon-orange/10 rounded-full blur-[50px] pointer-events-none" />
                    <ShieldCheck size={200} className="absolute -bottom-16 -right-10 text-neon-orange/5 rotate-12 pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                      <div className="p-5 bg-white rounded-3xl shadow-lg text-neon-orange shrink-0 border border-orange-100 animate-pulse-slow">
                        <ShieldCheck size={48} />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-2xl mb-4 tracking-tight">Pernyataan Validitas Data</h3>
                        <p className="text-base text-slate-600 leading-relaxed font-medium mb-8">
                          Dengan mencentang kotak di bawah ini dan menekan tombol <strong className="text-slate-800">"Kirim Pengajuan"</strong>, saya menyatakan bahwa seluruh data dan lampiran dokumen yang saya unggah adalah <strong className="text-slate-800 border-b-2 border-neon-orange/30">asli, sah, dan dapat dipertanggungjawabkan</strong>. Apabila di kemudian hari ditemukan pemalsuan, saya bersedia menerima sanksi yang berlaku.
                        </p>
                        
                        <label className="flex items-start gap-5 cursor-pointer group p-6 bg-white/70 backdrop-blur-md rounded-2xl border-2 border-white hover:border-neon-orange/50 transition-all shadow-sm hover:shadow-lg">
                          <div className="relative flex items-center justify-center shrink-0 mt-1">
                            <input 
                              type="checkbox" 
                              name="consent"
                              checked={formData.consent}
                              onChange={handleInputChange}
                              className="peer w-8 h-8 appearance-none border-2 border-slate-300 rounded-xl checked:border-neon-orange checked:bg-neon-orange transition-all cursor-pointer shadow-inner hover:border-neon-orange" 
                            />
                            <Check size={20} strokeWidth={4} className="text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none scale-50 peer-checked:scale-100 duration-300" />
                          </div>
                          <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors select-none leading-relaxed">
                            Saya menyetujui pernyataan di atas serta bersedia mematuhi seluruh Syarat & Ketentuan dari Instansi Pemroses.
                          </span>
                        </label>
                        {errors.consent && <p className="text-red-500 text-sm font-bold mt-4 flex items-center gap-2"><AlertTriangle size={18}/> {errors.consent}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LANGKAH 4: Sukses (Pro Max Version) */}
              {step === 4 && (
                <motion.div key="step4" variants={formVariants} initial="hidden" animate="visible" className="text-center py-12 relative z-10 flex flex-col items-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="relative w-40 h-40 mb-10 group">
                    <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-[40px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30" />
                    <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center relative border-4 border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                      <CheckCircle size={80} className="text-emerald-500" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">Pengajuan Terkirim!</h2>
                  <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                    Berkas permohonan Anda untuk <strong className="text-slate-800">{service.name}</strong> telah masuk ke antrean verifikasi instansi.
                  </p>
                  
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-slate-900 p-10 rounded-[3rem] border border-slate-700 shadow-[0_20px_50px_rgba(15,23,42,0.5)] relative overflow-hidden mb-16 w-full max-w-md">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-orange/20 rounded-full blur-[60px] pointer-events-none" />
                    <div className="relative z-10">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Nomor Tiket Registrasi</p>
                      <div className="text-4xl md:text-5xl font-black text-white tracking-widest mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        REG-2026-001
                      </div>
                      <div className="inline-flex items-center justify-center w-full gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-4 rounded-2xl text-sm font-bold shadow-sm">
                        <Info size={18} className="text-neon-orange"/> Gunakan untuk melacak status
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-xl">
                    <AnimatedButton onClick={() => router.push("/lacak")} glowColor="from-cyber-red to-neon-orange" className="flex-1 bg-slate-900 text-white px-8 py-4">
                      Lacak Pengajuan
                    </AnimatedButton>
                    <AnimatedButton enableGlow={false} onClick={() => router.push("/")} className="flex-1 bg-white/80 border border-slate-200 text-slate-800 px-8 py-4">
                      Kembali ke Beranda
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- TOMBOL NAVIGASI BAWAH (ANIMATED BUTTONS) --- */}
          {step < 4 && (
            <div className="flex justify-between items-center">
              <div className={`${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <AnimatedButton enableGlow={false} onClick={handlePrev} className="bg-white/60 backdrop-blur-md text-slate-700 border-white hover:bg-white px-6 md:px-8 py-4 flex items-center gap-3">
                  <ArrowLeft size={20} /> <span className="hidden sm:inline">Sebelumnya</span>
                </AnimatedButton>
              </div>

              {step < 3 ? (
                <AnimatedButton onClick={handleNext} className="bg-slate-900 text-white px-8 md:px-12 py-4 flex items-center gap-3 text-lg">
                  Selanjutnya <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </AnimatedButton>
              ) : (
                <AnimatedButton onClick={handleSubmit} disabled={isSubmitting} glowColor="from-cyber-red to-neon-orange" className="bg-slate-900 text-white px-8 md:px-12 py-4 flex items-center gap-3 text-lg">
                  {isSubmitting ? (
                    <><Loader2 size={24} className="animate-spin" /> Memproses...</>
                  ) : (
                    <>Kirim Pengajuan <CheckCircle size={24} className="group-hover:scale-110 transition-transform" /></>
                  )}
                </AnimatedButton>
              )}
            </div>
          )}
        </div>

        {/* =========================================
            KOLOM KANAN: STICKY SIDEBAR (RINGKASAN)
        ========================================= */}
        {step < 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block lg:col-span-4 sticky top-32 space-y-8">
            
            {/* Panel Ringkasan Dark Glass */}
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.3)] border border-slate-800">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-orange/20 rounded-full blur-[60px] pointer-events-none" />
              
              <h3 className="font-black text-2xl mb-8 relative z-10 flex items-center gap-3 tracking-tight">
                <FileText size={28} className="text-neon-orange" /> Ringkasan
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Layanan Dipilih</p>
                  <p className="font-extrabold text-white leading-snug text-lg">{service.name}</p>
                </div>
                
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                    <Building size={20} className="text-slate-300" />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Instansi Pemroses</p>
                    <p className="font-bold text-slate-200 text-sm leading-snug">{service.opd}</p>
                  </div>
                </div>
                
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                    <Clock size={20} className="text-slate-300" />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Estimasi Waktu</p>
                    <p className="font-bold text-slate-200 text-sm">{service.estimatedDays} Hari Kerja</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Ceklis Kaca */}
            <div className="bg-white/60 backdrop-blur-2xl p-10 rounded-[3rem] border border-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)]">
              <h3 className="font-black text-slate-900 text-xl mb-8 flex items-center gap-3 tracking-tight">
                Ceklis Dokumen
              </h3>
              <div className="space-y-5">
                {service.requirements.map((req) => {
                  const isUploaded = !!formData.files[req.id];
                  return (
                    <div key={req.id} className="flex items-start gap-4 transition-all duration-300">
                      <div className={`mt-0.5 flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-500 shadow-sm ${isUploaded ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-emerald-500/30' : 'border-slate-300 bg-white/50 text-transparent'}`}>
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <div>
                        <p className={`text-sm font-extrabold leading-snug transition-colors duration-500 ${isUploaded ? 'text-emerald-600' : 'text-slate-700'}`}>{req.name}</p>
                        {req.isMandatory && !isUploaded && <p className="text-[10px] font-black text-cyber-red uppercase tracking-widest mt-1.5">Wajib</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}

// =========================================
// ROOT LAYOUT & WRAPPER
// =========================================
export default function FormulirPengajuan({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans selection:bg-neon-orange/30">
      
      {/* FIXED AMBIENT 3D BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyber-red/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-neon-orange/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
      </div>

      <Suspense fallback={
        <div className="w-full min-h-screen flex flex-col items-center justify-center text-neon-orange relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-orange/30 rounded-full blur-[20px] animate-pulse" />
            <Loader2 size={56} className="animate-spin mb-6 relative z-10" />
          </div>
          <p className="font-black text-slate-800 text-xl tracking-wide">Menyiapkan Formulir...</p>
        </div>
      }>
        <FormulirContent params={params} />
      </Suspense>
    </div>
  );
}