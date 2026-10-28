"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  User, 
  Lock, 
  EyeOff, 
  Eye, 
  ArrowRight, 
  Building2, 
  Award, 
  Loader2,
  Fingerprint,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import AnimatedButton from "@/components/layout/AnimatedButton"; // <-- Import Animated Button

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validasi Input Dasar
    if (nip.length < 5 || password.length < 5) {
      setError("Kredensial tidak valid. Silakan periksa kembali NIP dan Kata Sandi Anda.");
      return;
    }

    setIsLoading(true);

    // 2. Simulasi Proses Autentikasi ke Database / API (1.5 detik)
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulasi Error: Jika password yang diketik adalah "salah123"
      if (password === "salah123") {
        setError("Kata sandi yang Anda masukkan salah. Sisa percobaan: 2");
        return;
      }

      // 3. Jika Sukses, tampilkan indikator berhasil
      setIsSuccess(true);

      // 4. Jeda sebentar untuk transisi UI yang halus, lalu Redirect sesuai Role
      setTimeout(() => {
        if (role === "opd") {
          router.push("/opd");
        } else {
          router.push("/pimpinan");
        }
      }, 800);

    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* =========================================
          AMBIENT 3D BACKGROUND (DARK MODE)
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] animate-pulse-slow mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: '2s' }} />
        {role === "pimpinan" && (
          <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[120px] animate-fade-in-up mix-blend-screen transition-opacity duration-1000" />
        )}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat" />
      </div>

      {/* =========================================
          MAIN GLASSMORPHISM CONTAINER
      ========================================= */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 animate-fade-in-up">
        
        {/* --- SISI KIRI: BRANDING (DARK GLASS) --- */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-10 md:p-12 flex flex-col justify-between border-r border-white/5 relative overflow-hidden group">
          {/* Ornamen Latar Kiri */}
          <ShieldCheck size={400} className="absolute -bottom-24 -left-24 text-white/5 -rotate-12 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-1000 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-0" />
          
          <div className="relative z-10">
            {/* Glowing Logo */}
            <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-[1.25rem] flex items-center justify-center border border-white/10 mb-8 shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-shadow duration-700">
              <ShieldCheck size={36} className="text-blue-400" />
            </div>
            
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
            {/* Security Badge */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-fit hover:bg-white/10 transition-colors cursor-default">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <Fingerprint size={24} className="text-emerald-400 animate-pulse-slow" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-0.5">Keamanan Berlapis</p>
                <p className="text-sm font-bold text-white">TTE BSrE Terverifikasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SISI KANAN: FORM LOGIN (WHITE GLASS) --- */}
        <div className="w-full md:w-7/12 bg-white/95 backdrop-blur-xl p-8 md:p-14 flex flex-col justify-center relative">
          <div className="max-w-md w-full mx-auto relative z-10">
            
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center justify-center md:justify-start gap-2 tracking-tight">
                Selamat Datang <Sparkles size={24} className={role === "opd" ? "text-blue-500" : "text-amber-500"} />
              </h2>
              <p className="text-sm font-medium text-slate-500">Silakan pilih otoritas dan masukkan kredensial Anda untuk masuk ke dalam sistem.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* 3D Role Selection Toggle dengan AnimatedButton */}
              <div className="bg-slate-100/80 p-1.5 rounded-[1.5rem] flex gap-1 relative z-10 border-2 border-white shadow-inner">
                <AnimatedButton
                  type="button"
                  onClick={() => { setRole("opd"); setError(null); setIsSuccess(false); }}
                  disabled={isLoading || isSuccess}
                  // Override efek hover khusus tombol role agar tidak mengangkat Y axis, hanya membal sedikit
                  whileHover={{ scale: 1.01 }} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold z-10 ${
                    role === "opd" 
                      ? "bg-white text-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.15)]" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Building2 size={18} className={role === "opd" ? "text-blue-500" : ""} /> Operator OPD
                </AnimatedButton>
                
                <AnimatedButton
                  type="button"
                  onClick={() => { setRole("pimpinan"); setError(null); setIsSuccess(false); }}
                  disabled={isLoading || isSuccess}
                  whileHover={{ scale: 1.01 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold z-10 ${
                    role === "pimpinan" 
                      ? "bg-white text-amber-600 shadow-[0_8px_20px_rgba(245,158,11,0.15)]" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Award size={18} className={role === "pimpinan" ? "text-amber-500" : ""} /> Pimpinan
                </AnimatedButton>
              </div>

              {/* Alert Error */}
              {error && (
                <div className="flex items-start gap-3 bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in-up">
                  <AlertCircle size={20} className="text-red-500 shrink-0" />
                  <p className="text-xs font-bold text-red-700 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Input NIP / Email */}
              <div className="space-y-2.5 group">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-slate-700">NIP / Email Instansi</label>
                <div className="relative">
                  <User className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${role === "opd" ? "text-slate-400 group-focus-within:text-blue-500" : "text-slate-400 group-focus-within:text-amber-500"}`} size={20} />
                  <input 
                    type="text"
                    required
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    disabled={isLoading || isSuccess}
                    placeholder={role === "opd" ? "admin.ptsp@pemda.go.id" : "Masukkan NIP Anda..."}
                    className={`w-full bg-slate-50/50 border-2 rounded-2xl py-4 pl-14 pr-5 text-sm font-extrabold text-slate-800 placeholder:font-medium placeholder:text-slate-300 focus:outline-none focus:bg-white transition-all shadow-inner disabled:opacity-50 ${
                      role === "opd" 
                        ? "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-200" 
                        : "border-slate-100 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-slate-200"
                    }`}
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2.5 group">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-slate-700">Kata Sandi</label>
                <div className="relative">
                  <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${role === "opd" ? "text-slate-400 group-focus-within:text-blue-500" : "text-slate-400 group-focus-within:text-amber-500"}`} size={20} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || isSuccess}
                    placeholder="••••••••••••"
                    className={`w-full bg-slate-50/50 border-2 rounded-2xl py-4 pl-14 pr-14 text-sm font-extrabold text-slate-800 focus:outline-none focus:bg-white transition-all shadow-inner tracking-widest placeholder:tracking-normal placeholder:font-medium placeholder:text-slate-300 disabled:opacity-50 ${
                      role === "opd" 
                        ? "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-200" 
                        : "border-slate-100 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-slate-200"
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || isSuccess}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className={`text-xs font-bold transition-colors ${role === "opd" ? "text-blue-600 hover:text-blue-800" : "text-amber-600 hover:text-amber-800"}`}>Lupa Kata Sandi?</a>
                </div>
              </div>

              {/* Submit AnimatedButton (Interactive States) */}
              <AnimatedButton 
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full py-4 md:py-5 rounded-2xl font-black text-white flex items-center justify-center gap-3 overflow-hidden group/btn ${
                  isSuccess 
                    ? "bg-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.4)]" // Saat berhasil, animasi disabled otomatis mematikan hover effect
                    : role === "opd" 
                      ? "bg-slate-900 hover:bg-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.4)]" 
                      : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)]"
                }`}
              >
                {!isSuccess && <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />}
                
                {isSuccess ? (
                  <span className="relative z-10 flex items-center gap-2 text-lg animate-fade-in-up">
                    <CheckCircle2 size={24} className="animate-pulse" /> Autentikasi Berhasil
                  </span>
                ) : isLoading ? (
                  <span className="relative z-10 flex items-center gap-2">
                    <Loader2 size={22} className="animate-spin" /> Memverifikasi Kredensial...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Masuk ke Sistem <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                )}
              </AnimatedButton>

            </form>

            <div className="mt-12 pt-6 border-t border-slate-200/50 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                © 2026 Portal Satu Pintu. All rights reserved.
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}