"use client";

import { useState } from "react";
import { 
  User, 
  ShieldCheck, 
  BellRing, 
  Laptop, 
  Save, 
  Loader2, 
  Check, 
  Fingerprint, 
  Stamp,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Settings,
  Mail,
  Smartphone,
  ShieldAlert,
  Key
} from "lucide-react";

export default function PengaturanAkunPimpinan() {
  const [activeTab, setActiveTab] = useState("tte"); // Default tab ke Sertifikat TTE
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fungsi Simulasi Simpan
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: "profil", label: "Profil Pimpinan", icon: <User size={20} />, desc: "Informasi pribadi dan jabatan." },
    { id: "tte", label: "Sertifikat Elektronik", icon: <Fingerprint size={20} />, desc: "Status TTE dan masa aktif BSrE." },
    { id: "keamanan", label: "Keamanan Akun", icon: <ShieldCheck size={20} />, desc: "Kata sandi dan autentikasi 2FA." },
    { id: "notifikasi", label: "Preferensi Peringatan", icon: <BellRing size={20} />, desc: "Notifikasi email dan WhatsApp." },
    { id: "sesi", label: "Aktivitas Login", icon: <Laptop size={20} />, desc: "Pantau perangkat terhubung." },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-12 relative font-sans selection:bg-amber-500/30">
      
      {/* =========================================
          NOTIFIKASI TOAST (Floating Cinematic)
      ========================================= */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${saveSuccess ? "translate-y-0 opacity-100 scale-100" : "-translate-y-16 opacity-0 scale-95 pointer-events-none"}`}>
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-700 text-white px-6 py-4 rounded-[1.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shrink-0 shadow-inner">
            <Check size={20} strokeWidth={3} className="text-white" />
          </div>
          <div>
            <h4 className="font-black text-sm tracking-wide">Pengaturan Diperbarui!</h4>
            <p className="text-xs text-slate-300 font-bold mt-0.5">Perubahan preferensi Anda telah disimpan.</p>
          </div>
        </div>
      </div>

      {/* =========================================
          HEADER
      ========================================= */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-3 flex items-center gap-3">
            <div className="p-3 bg-white border border-slate-200 shadow-sm rounded-2xl hidden sm:block">
              <Settings className="text-amber-500" size={32} />
            </div>
            Pengaturan Eksekutif
          </h1>
          <p className="text-slate-500 font-bold text-lg max-w-xl">Kelola profil pimpinan, perbarui sertifikat Tanda Tangan Elektronik, dan kendalikan keamanan akun.</p>
        </div>
      </div>

      {/* =========================================
          MAIN LAYOUT (Split Sidebar & Content)
      ========================================= */}
      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* --- SIDEBAR NAVIGASI PENGATURAN --- */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-3">
          <div className="bg-white/70 backdrop-blur-2xl p-3 rounded-[2rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all duration-300 text-left border-2 group relative overflow-hidden ${
                    isActive 
                      ? "bg-slate-900 border-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.2)]" 
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-100 text-slate-500"
                  }`}
                >
                  <div className={`p-3.5 rounded-xl transition-all duration-500 relative z-10 ${isActive ? "bg-white/10 text-amber-400" : "bg-slate-100 text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500"}`}>
                    {tab.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className={`font-black text-sm tracking-tight ${isActive ? "text-white" : "text-slate-800"}`}>{tab.label}</h3>
                    <p className={`text-[11px] font-bold mt-1 tracking-wide ${isActive ? "text-slate-400" : "text-slate-500"}`}>{tab.desc}</p>
                  </div>
                  {isActive && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- KONTEN PENGATURAN (Hyper-Glassmorphism Panel) --- */}
        <div className="flex-1 bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden min-h-[600px] flex flex-col relative">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex-1 flex flex-col relative z-10">
            
            {/* TAB 1: PROFIL PENGGUNA */}
            {activeTab === "profil" && (
              <div className="p-8 md:p-12 animate-fade-in-up flex-1">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 border border-amber-100"><User size={20} /></div>
                  Profil Eksekutif
                </h2>
                
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  {/* Avatar Upload */}
                  <div className="relative group shrink-0">
                    <div className="w-36 h-36 rounded-[2rem] border-4 border-white shadow-[0_15px_30px_rgba(0,0,0,0.1)] relative overflow-hidden bg-slate-900">
                      <img src="https://ui-avatars.com/api/?name=Kepala+Dinas&background=f59e0b&color=fff&size=200&bold=true" alt="Avatar" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm">
                        <Camera size={24} className="text-white mb-2" />
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Ubah Foto</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 transition-colors group-focus-within/input:text-slate-700">Nama Lengkap & Gelar</label>
                        <input type="text" defaultValue="Dr. H. Ahmad Dahlan, M.Si" className="w-full bg-slate-50/50 border-2 border-white rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-800 focus:outline-none focus:bg-white focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm hover:border-slate-200" />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 flex items-center gap-1.5"><ShieldAlert size={12}/> NIP / NRP (Terkunci)</label>
                        <input type="text" defaultValue="197508172000121001" disabled className="w-full bg-slate-100/80 border-2 border-transparent rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-500 cursor-not-allowed shadow-inner opacity-70" />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 flex items-center gap-1.5"><ShieldAlert size={12}/> Jabatan Struktural</label>
                        <input type="text" defaultValue="Kepala Dinas PMPTSP" disabled className="w-full bg-slate-100/80 border-2 border-transparent rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-500 cursor-not-allowed shadow-inner opacity-70" />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 flex items-center gap-1.5 transition-colors group-focus-within/input:text-slate-700"><Smartphone size={12}/> WhatsApp Darurat</label>
                        <input type="text" defaultValue="0811-2233-4455" className="w-full bg-slate-50/50 border-2 border-white rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-800 focus:outline-none focus:bg-white focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm hover:border-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SERTIFIKAT TTE (KHUSUS PIMPINAN) */}
            {activeTab === "tte" && (
              <div className="p-8 md:p-12 animate-fade-in-up flex-1 flex flex-col relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 border border-amber-100"><Fingerprint size={20} /></div>
                    Sertifikat Elektronik
                  </h2>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 uppercase tracking-widest shadow-sm w-fit">
                    <CheckCircle2 size={16} /> Tersertifikasi Valid
                  </span>
                </div>
                
                <div className="max-w-3xl space-y-8">
                  {/* Kartu Sertifikat BSrE (Deep Space Vault Design) */}
                  <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-10 border border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/15 transition-colors duration-1000" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />
                    
                    {/* Watermark Stempel */}
                    <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none transform -rotate-12">
                      <Stamp size={250} className="text-white" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-10">
                      <div>
                        <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1.5 drop-shadow-sm">Otoritas Penerbit Sertifikat (CA)</p>
                        <h3 className="text-white text-2xl font-black tracking-tight leading-tight">Balai Sertifikasi Elektronik (BSrE)</h3>
                        <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Badan Siber dan Sandi Negara RI</p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center border border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <Stamp size={32} className="text-white drop-shadow-md" />
                      </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 border-t border-slate-800/80 pt-8">
                      <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5">Identitas Pemilik Sertifikat</p>
                        <p className="text-white font-black text-lg">Dr. H. Ahmad Dahlan, M.Si</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5">Nomor Induk Pegawai (NIP)</p>
                        <p className="text-slate-300 font-bold text-base font-mono">197508172000121001</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5">Masa Berlaku Dimulai</p>
                        <p className="text-slate-300 font-bold text-sm">10 Januari 2025</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5">Kedaluwarsa Pada</p>
                        <p className="text-emerald-400 font-black text-sm flex items-center gap-1.5"><CheckCircle2 size={16}/> 10 Januari 2027</p>
                      </div>
                    </div>
                  </div>

                  {/* Ubah Passphrase TTE */}
                  <div className="p-8 bg-white border border-amber-100 rounded-[2.5rem] shadow-[0_10px_30px_rgba(245,158,11,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[30px] pointer-events-none" />
                    <h3 className="font-black text-slate-900 flex items-center gap-2.5 mb-6 text-lg tracking-tight relative z-10"><Key size={20} className="text-amber-500" /> Perbarui Passphrase TTE</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-5 relative z-10">
                      <input type="password" placeholder="Passphrase Baru" className="flex-1 bg-slate-50/50 border-2 border-white hover:border-slate-200 rounded-[1.25rem] px-5 py-4 text-sm font-extrabold focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm tracking-widest placeholder:tracking-normal placeholder:font-bold placeholder:text-slate-400" />
                      <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all shadow-[0_10px_20px_rgba(15,23,42,0.2)] hover:-translate-y-1 whitespace-nowrap active:scale-95">
                        Simpan Passphrase
                      </button>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-red-50 p-4 rounded-xl mt-6 border border-red-100 relative z-10">
                      <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" /> 
                      <p className="text-xs text-red-700 font-bold leading-relaxed">
                        Sangat Rahasia! Jaga kerahasiaan Passphrase Anda. Passphrase ini adalah otorisasi absolut untuk mengesahkan dokumen berkekuatan hukum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB LAINNYA (Placeholder Elegan) */}
            {(activeTab === "keamanan" || activeTab === "notifikasi" || activeTab === "sesi") && (
              <div className="flex flex-col items-center justify-center p-20 text-center relative z-10 flex-1 animate-fade-in-up">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border-2 border-slate-100 mb-6">
                  <ShieldCheck size={40} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Menu Fungsional Terpadu</h3>
                <p className="text-slate-500 font-bold text-sm mt-3 max-w-sm leading-relaxed">Pengaturan <span className="uppercase tracking-widest text-slate-800">{activeTab}</span> beroperasi selaras dengan standar keamanan tingkat tinggi yang sama seperti pada antarmuka operator.</p>
              </div>
            )}

            {/* --- FOOTER ACTION (SAVE BUTTON) --- */}
            <div className="p-6 md:px-12 md:py-8 bg-slate-50/50 border-t border-white flex justify-end rounded-b-[3rem] mt-auto">
              <button 
                onClick={handleSave}
                disabled={isSaving || activeTab === "sesi" || activeTab === "tte"}
                className="w-full sm:w-auto relative overflow-hidden group/btn flex items-center justify-center gap-2.5 px-10 py-4.5 bg-slate-900 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                {isSaving ? <Loader2 size={20} className="animate-spin relative z-10" /> : <Save size={20} className="relative z-10" />}
                <span className="relative z-10">{isSaving ? "Menyimpan Preferensi..." : "Simpan Perubahan"}</span>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}