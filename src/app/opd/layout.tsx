"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileStack, 
  Archive, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  User,
  ShieldCheck,
  Sparkles,
  Command
} from "lucide-react";

export default function OpdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const pathname = usePathname();

  // Update jam real-time statis/dinamis untuk header
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
      const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
      setCurrentTime(`${now.toLocaleDateString('id-ID', optionsDate)} • ${now.toLocaleTimeString('id-ID', optionsTime)} WITA`);
    };
    updateDateTime();
  }, []);

  // Menu Navigasi Sidebar OPD
  const navItems = [
    { name: "Ikhtisar", path: "/opd", icon: <LayoutDashboard size={20} /> },
    { name: "Antrean Pengajuan", path: "/opd/antrean", icon: <FileStack size={20} /> },
    { name: "Arsip & Riwayat", path: "/opd/arsip", icon: <Archive size={20} /> },
    { name: "Pengaturan Akun", path: "/opd/pengaturan", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          1. SIDEBAR (Desktop & Mobile Drawer)
      ========================================= */}
      {/* Overlay untuk Mobile saat Sidebar terbuka */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800/80 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 lg:static lg:flex lg:flex-col shadow-[10px_0_40px_rgba(0,0,0,0.2)] ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Sidebar Header (Brand) */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-slate-800/80 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-neon-orange/10 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-cyber-red to-neon-orange flex items-center justify-center shadow-[0_8px_20px_rgba(250,77,9,0.3)]">
              <span className="text-white font-black text-xl">P1</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black tracking-tight text-lg leading-tight flex items-center gap-1.5">
                Portal <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">OPD</span>
              </span>
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mt-0.5">Back-Office System</span>
            </div>
          </div>
          
          {/* Tombol Tutup Sidebar Mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Info Operator / OPD saat ini */}
        <div className="px-6 py-6 border-b border-slate-800/80">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-sm">
              <User size={24} className="text-blue-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-white font-black text-sm truncate tracking-tight">Admin DPMPTSP</p>
              <p className="text-emerald-400 text-[11px] font-extrabold flex items-center gap-1.5 mt-1 truncate">
                <ShieldCheck size={14} className="text-emerald-400" /> Verifikator Utama
              </p>
            </div>
          </div>
        </div>

        {/* Navigasi Utama */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Navigasi Utama</p>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-r from-neon-orange/20 to-transparent text-white border-l-4 border-neon-orange shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                }`}
              >
                {/* Efek Hover Halus */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" />
                )}
                
                <div className={`${isActive ? 'text-neon-orange drop-shadow-[0_0_10px_rgba(250,77,9,0.5)]' : 'text-slate-400 group-hover:text-white'} transition-colors`}>
                  {item.icon}
                </div>
                <span className="relative z-10">{item.name}</span>
                
                {isActive && (
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-neon-orange shadow-[0_0_8px_rgba(250,77,9,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer (Logout) */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
          <Link 
            href="/login" 
            className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl font-black text-sm transition-all group"
          >
            <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
            <span>Keluar Sistem</span>
          </Link>
        </div>
      </aside>

      {/* =========================================
          2. AREA KONTEN UTAMA
      ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar Pro Max */}
        <header className="h-24 bg-white/70 backdrop-blur-2xl border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-5">
            {/* Tombol Toggle Sidebar Mobile */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-700 hover:text-neon-orange bg-white hover:bg-orange-50 p-3 rounded-2xl transition-all border border-slate-200 shadow-sm active:scale-95"
            >
              <Menu size={22} />
            </button>

            {/* Pencarian Global Internal */}
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-4 text-slate-400 group-focus-within:text-neon-orange transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Cari nomor tiket, nama pemohon..."
                className="bg-slate-100/80 border-2 border-transparent rounded-2xl py-3 pl-12 pr-12 w-80 text-sm font-extrabold text-slate-800 focus:outline-none focus:bg-white focus:border-neon-orange/40 focus:ring-4 focus:ring-neon-orange/10 transition-all placeholder:font-medium placeholder:text-slate-400 shadow-inner"
              />
              <div className="absolute right-3.5 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 text-[10px] font-black text-slate-400 shadow-sm pointer-events-none">
                <Command size={10} /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Tanggal & Waktu Live */}
            <div className="hidden xl:block text-right mr-2 bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200/60 shadow-inner">
              <p className="text-xs font-black text-slate-800">{currentTime.split('•')[0] || 'Selasa, 27 Okt 2026'}</p>
              <p className="text-[11px] font-extrabold text-neon-orange mt-0.5">{currentTime.split('•')[1] || '07:10 WITA'}</p>
            </div>
            
            {/* Notifikasi Bell */}
            <button className="relative w-12 h-12 flex items-center justify-center text-slate-600 hover:text-neon-orange bg-white hover:bg-orange-50 rounded-2xl transition-all border border-slate-200 shadow-sm hover:shadow-md group">
              <Bell size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-3 right-3 w-3 h-3 bg-cyber-red rounded-full ring-4 ring-white animate-pulse"></span>
            </button>
            
            {/* Avatar Dropdown (Simulasi) */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <button className="w-11 h-11 rounded-2xl border-2 border-white hover:border-neon-orange overflow-hidden shadow-md transition-all hover:scale-105">
                <img src={`https://ui-avatars.com/api/?name=Admin+OPD&background=0f172a&color=fff&bold=true`} alt="Avatar" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </header>

        {/* Konten Halaman Dinamis */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 sm:p-10 relative">
          {children}
        </main>
      </div>

    </div>
  );
}