"use client";

import { useState } from "react";
import { 
  User, 
  ShieldCheck, 
  BellRing, 
  Smartphone, 
  Laptop, 
  Save, 
  Loader2, 
  Check, 
  Mail, 
  Lock, 
  Key,
  LogOut,
  MapPin,
  Camera,
  Settings,
  ShieldAlert
} from "lucide-react";

export default function PengaturanAkunOPD() {
  const [activeTab, setActiveTab] = useState("profil");
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
    { id: "profil", label: "Profil Pengguna", icon: <User size={20} />, desc: "Informasi pribadi dan instansi." },
    { id: "keamanan", label: "Kata Sandi & 2FA", icon: <ShieldCheck size={20} />, desc: "Keamanan lapis ganda akun." },
    { id: "notifikasi", label: "Preferensi Notifikasi", icon: <BellRing size={20} />, desc: "Atur peringatan Email/WA." },
    { id: "sesi", label: "Riwayat Aktivitas", icon: <Laptop size={20} />, desc: "Pantau perangkat terhubung." },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-12 relative font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          NOTIFIKASI TOAST (Floating Cinematic)
      ========================================= */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${saveSuccess ? "translate-y-0 opacity-100 scale-100" : "-translate-y-16 opacity-0 scale-95 pointer-events-none"}`}>
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 text-white px-6 py-4 rounded-[1.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shrink-0 shadow-inner">
            <Check size={20} strokeWidth={3} className="text-white" />
          </div>
          <div>
            <h4 className="font-black text-sm tracking-wide">Berhasil Disimpan!</h4>
            <p className="text-xs text-slate-300 font-bold mt-0.5">Preferensi akun Anda telah diperbarui.</p>
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
              <Settings className="text-neon-orange" size={32} />
            </div>
            Pengaturan Akun
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-xl">Kelola profil operator, tingkatkan keamanan, dan atur preferensi notifikasi Back-Office.</p>
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
                  <div className={`p-3.5 rounded-xl transition-all duration-500 relative z-10 ${isActive ? "bg-white/10 text-neon-orange" : "bg-slate-100 text-slate-400 group-hover:bg-orange-50 group-hover:text-neon-orange"}`}>
                    {tab.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className={`font-black text-sm tracking-tight ${isActive ? "text-white" : "text-slate-800"}`}>{tab.label}</h3>
                    <p className={`text-[11px] font-bold mt-1 tracking-wide ${isActive ? "text-slate-400" : "text-slate-500"}`}>{tab.desc}</p>
                  </div>
                  {isActive && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-neon-orange rounded-full shadow-[0_0_10px_rgba(250,77,9,0.5)]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- KONTEN PENGATURAN (Hyper-Glassmorphism Panel) --- */}
        <div className="flex-1 bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden min-h-[600px] flex flex-col relative">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-neon-orange/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex-1 flex flex-col relative z-10">
            {/* TAB 1: PROFIL PENGGUNA */}
            {activeTab === "profil" && (
              <div className="p-8 md:p-12 animate-fade-in-up flex-1">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-neon-orange border border-orange-100"><User size={20} /></div>
                  Informasi Profil
                </h2>
                
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  {/* Avatar Upload */}
                  <div className="relative group shrink-0">
                    <div className="w-36 h-36 rounded-[2rem] border-4 border-white shadow-[0_15px_30px_rgba(0,0,0,0.1)] relative overflow-hidden bg-slate-900">
                      <img src="https://ui-avatars.com/api/?name=Admin+Utama&background=0f172a&color=fff&size=200&bold=true" alt="Avatar" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm">
                        <Camera size={24} className="text-white mb-2" />
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Ubah Foto</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 transition-colors group-focus-within/input:text-slate-700">Nama Lengkap</label>
                        <input type="text" defaultValue="Admin Utama DPMPTSP" className="w-full bg-slate-50/50 border-2 border-white rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-800 focus:outline-none focus:bg-white focus:border-neon-orange/50 focus:ring-4 focus:ring-neon-orange/10 transition-all shadow-sm hover:border-slate-200" />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 flex items-center gap-1.5"><ShieldAlert size={12}/> NIP (Terkunci)</label>
                        <input type="text" defaultValue="198501262010121001" disabled className="w-full bg-slate-100/80 border-2 border-transparent rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-500 cursor-not-allowed shadow-inner opacity-70" />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 flex items-center gap-1.5 transition-colors group-focus-within/input:text-slate-700"><Mail size={12}/> Email Instansi</label>
                        <input type="email" defaultValue="admin.ptsp@pemda.go.id" className="w-full bg-slate-50/50 border-2 border-white rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-800 focus:outline-none focus:bg-white focus:border-neon-orange/50 focus:ring-4 focus:ring-neon-orange/10 transition-all shadow-sm hover:border-slate-200" />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 flex items-center gap-1.5 transition-colors group-focus-within/input:text-slate-700"><Smartphone size={12}/> WhatsApp Operator</label>
                        <input type="text" defaultValue="0812-3456-7890" className="w-full bg-slate-50/50 border-2 border-white rounded-[1.25rem] px-5 py-4 text-sm font-black text-slate-800 focus:outline-none focus:bg-white focus:border-neon-orange/50 focus:ring-4 focus:ring-neon-orange/10 transition-all shadow-sm hover:border-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: KEAMANAN */}
            {activeTab === "keamanan" && (
              <div className="p-8 md:p-12 animate-fade-in-up flex-1">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500 border border-emerald-100"><ShieldCheck size={20} /></div>
                  Kata Sandi & Keamanan
                </h2>
                
                <div className="max-w-2xl space-y-8">
                  <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
                    <h3 className="font-black text-slate-900 flex items-center gap-2.5 mb-6 text-lg tracking-tight relative z-10"><Key size={20} className="text-slate-400" /> Pembaruan Kata Sandi</h3>
                    <div className="space-y-5 relative z-10">
                      <input type="password" placeholder="Ketik Kata Sandi Saat Ini" className="w-full bg-slate-50/50 border-2 border-white hover:border-slate-200 rounded-[1.25rem] px-5 py-4 text-sm font-extrabold focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm tracking-widest placeholder:tracking-normal placeholder:font-bold placeholder:text-slate-400" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input type="password" placeholder="Kata Sandi Baru" className="w-full bg-slate-50/50 border-2 border-white hover:border-slate-200 rounded-[1.25rem] px-5 py-4 text-sm font-extrabold focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm tracking-widest placeholder:tracking-normal placeholder:font-bold placeholder:text-slate-400" />
                        <input type="password" placeholder="Konfirmasi Sandi Baru" className="w-full bg-slate-50/50 border-2 border-white hover:border-slate-200 rounded-[1.25rem] px-5 py-4 text-sm font-extrabold focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm tracking-widest placeholder:tracking-normal placeholder:font-bold placeholder:text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-emerald-950 border border-emerald-900 rounded-[2rem] shadow-[0_15px_40px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.1] bg-repeat pointer-events-none" />
                    <div className="relative z-10">
                      <h3 className="font-black text-white flex items-center gap-2.5 text-lg"><Lock size={20} className="text-emerald-400" /> Autentikasi 2 Langkah (2FA)</h3>
                      <p className="text-sm text-emerald-100/70 font-medium mt-1.5 leading-relaxed max-w-sm">Amankan login Back-Office dengan kode unik via Authenticator atau WhatsApp.</p>
                    </div>
                    <button className="relative z-10 px-6 py-3.5 bg-emerald-500 text-white rounded-xl text-sm font-black hover:bg-emerald-400 transition-colors shadow-[0_5px_15px_rgba(16,185,129,0.4)] active:scale-95 whitespace-nowrap">
                      Aktifkan 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: NOTIFIKASI */}
            {activeTab === "notifikasi" && (
              <div className="p-8 md:p-12 animate-fade-in-up flex-1">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500 border border-blue-100"><BellRing size={20} /></div>
                  Preferensi Notifikasi
                </h2>
                
                <div className="max-w-2xl space-y-4">
                  {[
                    { title: "Pengajuan Baru Masuk", desc: "Dapatkan notifikasi seketika saat warga mengirim dokumen.", email: true, wa: true },
                    { title: "Dokumen Kedaluwarsa (SLA)", desc: "Peringatan mendesak jika verifikasi melewati batas waktu.", email: true, wa: true },
                    { title: "Pimpinan Selesai TTE", desc: "Pemberitahuan saat dokumen resmi siap dicetak/diunduh.", email: false, wa: true },
                    { title: "Laporan Performa Mingguan", desc: "Rekapitulasi otomatis kinerja loket dikirim setiap Senin.", email: true, wa: false },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-black text-slate-800 text-sm tracking-tight">{item.title}</h3>
                        <p className="text-xs text-slate-500 font-bold mt-1">{item.desc}</p>
                      </div>
                      <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shrink-0 w-fit">
                        <button className={`p-2.5 rounded-xl transition-all ${item.email ? "bg-white border-2 border-blue-500 text-blue-600 shadow-sm" : "bg-transparent border-2 border-transparent text-slate-400 hover:text-slate-600"}`} title="Notifikasi Email">
                          <Mail size={18} />
                        </button>
                        <button className={`p-2.5 rounded-xl transition-all ${item.wa ? "bg-white border-2 border-green-500 text-green-600 shadow-sm" : "bg-transparent border-2 border-transparent text-slate-400 hover:text-slate-600"}`} title="Notifikasi WhatsApp">
                          <Smartphone size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: AKTIVITAS LOGIN */}
            {activeTab === "sesi" && (
              <div className="p-8 md:p-12 animate-fade-in-up flex-1">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-500 border border-purple-100"><Laptop size={20} /></div>
                  Riwayat Perangkat Terhubung
                </h2>
                
                <div className="max-w-2xl space-y-4">
                  {/* Sesi Saat Ini */}
                  <div className="p-6 bg-slate-950 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none" />
                    <div className="flex items-start sm:items-center gap-5 relative z-10">
                      <div className="w-14 h-14 bg-slate-800 border-2 border-slate-700 text-white rounded-2xl flex items-center justify-center shrink-0"><Laptop size={28}/></div>
                      <div>
                        <h3 className="font-black text-white flex items-center gap-3 text-base">
                          Windows 11 • Chrome 
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.2)]">Sesi Ini</span>
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1.5 uppercase tracking-widest"><MapPin size={12} className="text-purple-400"/> Makassar, ID <span className="text-slate-600 px-1">•</span> IP: 103.111.xxx.xx</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sesi Lain */}
                  <div className="p-6 bg-white border border-slate-200 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start sm:items-center gap-5">
                      <div className="w-14 h-14 bg-slate-50 border-2 border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center shrink-0"><Smartphone size={28}/></div>
                      <div>
                        <h3 className="font-black text-slate-800 text-base">Android • Mobile App</h3>
                        <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1.5 uppercase tracking-widest"><MapPin size={12} className="text-slate-300"/> Makassar, ID <span className="text-slate-200 px-1">•</span> 2 Hari yang lalu</p>
                      </div>
                    </div>
                    <button className="px-5 py-3 bg-red-50 text-cyber-red border border-red-100 rounded-xl text-xs font-black hover:bg-cyber-red hover:text-white transition-colors flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto">
                      <LogOut size={16} /> Cabut Akses
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- FOOTER ACTION (SAVE BUTTON) --- */}
            <div className="p-6 md:px-12 md:py-8 bg-slate-50/50 border-t border-white flex justify-end rounded-b-[3rem] mt-auto">
              <button 
                onClick={handleSave}
                disabled={isSaving || activeTab === "sesi"}
                className="w-full sm:w-auto relative overflow-hidden group/btn flex items-center justify-center gap-2.5 px-10 py-4.5 bg-slate-900 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-orange to-cyber-red opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                {isSaving ? <Loader2 size={20} className="animate-spin relative z-10" /> : <Save size={20} className="relative z-10" />}
                <span className="relative z-10">{isSaving ? "Menyimpan Proses..." : "Simpan Perubahan"}</span>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}