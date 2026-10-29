"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  User, 
  EyeOff, 
  Eye, 
  ArrowRight, 
  Building2, 
  Award, 
  Loader2,
  Fingerprint,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  LockKeyhole,
  ArrowLeft
} from "lucide-react";
import AnimatedButton from "@/components/layout/AnimatedButton";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"opd" | "pimpinan">("opd");
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk alur UX Login
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Optimasi: Melakukan prefetch pada rute agar perpindahan halaman terjadi seketika
  useEffect(() => {
    router.prefetch("/opd");
    router.prefetch("/pimpinan");
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validasi Input Dasar
    if (nip.length < 5 || password.length < 5) {
      setError("Kredensial tidak valid. Silakan periksa kembali NIP dan Kata Sandi Anda.");
      return;
    }

    setIsLoading(true);

    // 2. Simulasi Proses Autentikasi
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulasi Error: Jika password yang diketik adalah "salah123"
      if (password === "salah123") {
        setError("Kata sandi yang Anda masukkan salah. Sisa percobaan: 2");
        return;
      }

      // 3. Sukses
      setIsSuccess(true);

      // 4. Jeda untuk transisi UI, lalu Redirect
      setTimeout(() => {
        if (role === "opd") {
          router.push("/opd");
        } else {
          router.push("/pimpinan");
        }
      }, 1000);

    }, 1500);
  };

  // Varian untuk animasi masuk form
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: custom * 0.1, type: "spring" as const, stiffness: 300, damping: 24 }
    })
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* =========================================
          CINEMATIC AMBIENT BACKGROUND
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen" 
        />
        
        {/* Glow dinamis berdasarkan Role */}
        <AnimatePresence>
          {role === "pimpinan" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-amber-500/30 rounded-full blur-[120px] mix-blend-screen" 
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat" />
      </div>

      {/* =========================================
          MAIN GLASSMORPHISM CONTAINER
      ========================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.8 }}
        className="w-full max-w-5xl flex flex-col md:flex-row bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden relative z-10"
      >
        
        {/* --- SISI KIRI: BRANDING (DARK GLASS) --- */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-10 md:p-14 flex flex-col justify-between border-r border-white/5 relative overflow-hidden group">
          
          <ShieldCheck size={400} className="absolute -bottom-24 -left-24 text-white/5 -rotate-12 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-1000 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-0 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Glowing Logo */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-[1.25rem] flex items-center justify-center border border-white/10 mb-10 shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-shadow duration-700 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <ShieldCheck size={36} className="text-blue-400" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
              Portal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Satu Pintu</span> <br />
              Pemerintahan
            </h1>
            
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
              Sistem integrasi layanan elektronik terpadu yang memfasilitasi verifikasi berkas, persetujuan, dan Tanda Tangan Elektronik (TTE) tersertifikasi dalam satu <strong className="text-white">platform pintar</strong>.
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-fit hover:bg-white/10 transition-colors cursor-default">
              <div className="p-2 bg-emerald-500/20 rounded-xl relative">
                <div className="absolute inset-0 bg-emerald-400/20 rounded-xl animate-ping opacity-50" />
                <Fingerprint size={24} className="text-emerald-400 relative z-10" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-0.5">Keamanan Berlapis</p>
                <p className="text-sm font-bold text-white">TTE BSrE Terverifikasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SISI KANAN: FORM LOGIN (WHITE GLASS) --- */}
        <div className="w-full md:w-7/12 bg-white/95 backdrop-blur-xl p-8 md:p-14 lg:p-16 flex flex-col justify-center relative">
          
          {/* Tombol Kembali (Untuk Tester/Warga) */}
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="absolute top-6 right-6 md:top-8 md:right-8">
            <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 py-2 px-4 rounded-full">
              <ArrowLeft size={14} /> Kembali ke Beranda
            </Link>
          </motion.div>

          <div className="max-w-md w-full mx-auto relative z-10 mt-8 md:mt-0">
            
            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 flex items-center justify-center md:justify-start gap-3 tracking-tight">
                Selamat Datang 
                <motion.div
                  animate={{ rotate: role === "pimpinan" ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles size={28} className={role === "opd" ? "text-blue-500" : "text-amber-500"} />
                </motion.div>
              </h2>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Silakan pilih otoritas dan masukkan kredensial Anda untuk mengakses dasbor sistem.
              </p>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* 3D Segmented Control untuk Pemilihan Role */}
              <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="bg-slate-100 p-1.5 rounded-[1.5rem] flex gap-1 relative z-10 border border-slate-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => { setRole("opd"); setError(null); setIsSuccess(false); }}
                  disabled={isLoading || isSuccess}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold relative z-10 transition-colors"
                >
                  {role === "opd" && (
                    <motion.div 
                      layoutId="activeRole" 
                      className="absolute inset-0 bg-white rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.15)]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${role === "opd" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
                    <Building2 size={18} /> Operator OPD
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => { setRole("pimpinan"); setError(null); setIsSuccess(false); }}
                  disabled={isLoading || isSuccess}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold relative z-10 transition-colors"
                >
                  {role === "pimpinan" && (
                    <motion.div 
                      layoutId="activeRole" 
                      className="absolute inset-0 bg-white rounded-xl shadow-[0_8px_20px_rgba(245,158,11,0.15)]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${role === "pimpinan" ? "text-amber-600" : "text-slate-500 hover:text-slate-700"}`}>
                    <Award size={18} /> Pimpinan
                  </span>
                </button>
              </motion.div>

              {/* Alert Error dengan AnimatePresence (Mencegah loncatan UI) */}
              <div className="h-auto">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div 
                      key="error"
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-3 bg-red-50 p-4 rounded-2xl border border-red-100 mb-6">
                        <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs font-bold text-red-700 leading-relaxed">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input NIP / Email */}
              <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="space-y-2.5 group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-slate-700">
                  NIP / Email Instansi
                </label>
                <div className="relative">
                  <User className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${role === "opd" ? "text-slate-400 group-focus-within:text-blue-500" : "text-slate-400 group-focus-within:text-amber-500"}`} size={20} />
                  <input 
                    type="text"
                    required
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    disabled={isLoading || isSuccess}
                    placeholder={role === "opd" ? "admin.ptsp@pemda.go.id" : "Masukkan NIP Anda..."}
                    className={`w-full bg-slate-50 border-2 rounded-2xl py-4.5 pl-14 pr-5 text-sm font-extrabold text-slate-800 placeholder:font-medium placeholder:text-slate-300 focus:outline-none focus:bg-white transition-all shadow-inner disabled:opacity-50 ${
                      role === "opd" 
                        ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300" 
                        : "border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-slate-300"
                    }`}
                  />
                </div>
              </motion.div>

              {/* Input Password */}
              <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible" className="space-y-2.5 group">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-slate-700">
                  Kata Sandi
                </label>
                <div className="relative">
                  <LockKeyhole className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${role === "opd" ? "text-slate-400 group-focus-within:text-blue-500" : "text-slate-400 group-focus-within:text-amber-500"}`} size={20} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || isSuccess}
                    placeholder="••••••••••••"
                    className={`w-full bg-slate-50 border-2 rounded-2xl py-4.5 pl-14 pr-14 text-sm font-extrabold text-slate-800 focus:outline-none focus:bg-white transition-all shadow-inner tracking-widest placeholder:tracking-normal placeholder:font-medium placeholder:text-slate-300 disabled:opacity-50 ${
                      role === "opd" 
                        ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300" 
                        : "border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-slate-300"
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || isSuccess}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-xl hover:bg-slate-200 disabled:opacity-50 outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-3">
                  <a href="#" className={`text-[11px] font-black uppercase tracking-wider transition-colors ${role === "opd" ? "text-blue-600 hover:text-blue-800" : "text-amber-600 hover:text-amber-800"}`}>
                    Lupa Kata Sandi?
                  </a>
                </div>
              </motion.div>

              {/* Submit AnimatedButton */}
              <motion.div custom={5} variants={fadeUpVariants} initial="hidden" animate="visible" className="pt-2">
                <AnimatedButton 
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className={`w-full py-5 rounded-2xl font-black text-white flex items-center justify-center gap-3 overflow-hidden group/btn transition-all duration-500 ${
                    isSuccess 
                      ? "bg-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.4)] scale-[1.02]" 
                      : role === "opd" 
                        ? "bg-slate-900 hover:bg-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.4)]" 
                        : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)]"
                  }`}
                >
                  {!isSuccess && <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />}
                  
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.span 
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 flex items-center gap-2 text-lg"
                      >
                        <CheckCircle2 size={24} className="animate-pulse" /> Autentikasi Berhasil
                      </motion.span>
                    ) : isLoading ? (
                      <motion.span 
                        key="loading"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="relative z-10 flex items-center gap-2"
                      >
                        <Loader2 size={22} className="animate-spin" /> Memverifikasi Kredensial...
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative z-10 flex items-center gap-2 text-lg"
                      >
                        Masuk ke Sistem <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </AnimatedButton>
              </motion.div>

            </form>

            <motion.div custom={6} variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-12 pt-6 border-t border-slate-200 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                © 2026 Portal Satu Pintu. Hak Cipta Dilindungi.
              </p>
            </motion.div>
            
          </div>
        </div>

      </motion.div>
    </div>
  );
}