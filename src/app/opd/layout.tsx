"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Command,
  ChevronRight
} from "lucide-react";

// =========================================
// KONTEN LAYOUT (Dipisahkan agar bisa dibungkus Suspense)
// =========================================
function OpdLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState({ date: "", time: "" });
  const [isClient, setIsClient] = useState(false);
  
  // Memanggil hook rute klien di sini akan aman selama dibungkus Suspense di luar
  const pathname = usePathname();

  // Mencegah Hydration Mismatch & Update Waktu Real-Time
  useEffect(() => {
    setIsClient(true);
    
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
      const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      
      setCurrentTime({
        date: now.toLocaleDateString('id-ID', optionsDate),
        time: now.toLocaleTimeString('id-ID', optionsTime) + ' WITA'
      });
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Menu Navigasi Sidebar OPD
  const navItems = [
    { name: "Ikhtisar", path: "/opd", icon: <LayoutDashboard size={20} /> },
    { name: "Antrean Pengajuan", path: "/opd/antrean", icon: <FileStack size={20} /> },
    { name: "Arsip & Riwayat", path: "/opd/arsip", icon: <Archive size={20} /> },
    { name: "Pengaturan Akun", path: "/opd/pengaturan", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          1. SIDEBAR (Desktop & Mobile Drawer)
      ========================================= */}
      
      {/* Overlay Mobile dengan Framer Motion */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 lg:static lg:flex lg:flex-col shadow-[10px_0_40px_rgba(0,0,0,0.2)] ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Sidebar Header (Brand) */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-slate-800/80 relative overflow-hidden shrink-0">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-neon-orange/20 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyber-red/20 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-cyber-red to-neon-orange flex items-center justify-center shadow-[0_8px_20px_rgba(250,77,9,0.3)]">
              <ShieldCheck className="text-white" size={24} />
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
        <div className="px-6 py-6 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner group cursor-default hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-400/20 animate-pulse" />
              <User size={24} className="text-blue-400 relative z-10" />
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
          <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Menu Utama</p>
          
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
                {/* Latar hover animasi */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" />
                )}
                
                <div className={`${isActive ? 'text-neon-orange drop-shadow-[0_0_10px_rgba(250,77,9,0.5)]' : 'text-slate-500 group-hover:text-slate-300'} transition-colors relative z-10`}>
                  {item.icon}
                </div>
                
                <span className="relative z-10 flex-1">{item.name}</span>
                
                {/* Indikator Aktif / Panah Hover */}
                {isActive ? (
                  <motion.div layoutId="activeNavIndicator" className="absolute right-4 w-1.5 h-1.5 rounded-full bg-neon-orange shadow-[0_0_8px_rgba(250,77,9,0.8)]" />
                ) : (
                  <ChevronRight size={16} className="text-slate-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer (Logout) */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/50 shrink-0">
          <Link 
            href="/login" 
            className="flex items-center justify-center gap-3 w-full py-4 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl font-black text-sm transition-all duration-300 border border-red-500/20 hover:border-red-500 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Keluar Sistem</span>
          </Link>
        </div>
      </aside>

      {/* =========================================
          2. AREA KONTEN UTAMA
      ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Dekorasi Latar Belakang Area Utama */}
        <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-gradient-to-bl from-slate-200/50 via-slate-100/10 to-transparent -z-10 rounded-bl-full pointer-events-none" />

        {/* Topbar Pro Max */}
        <header className="h-24 bg-white/60 backdrop-blur-2xl border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          
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
                className="bg-slate-100/80 border-2 border-transparent rounded-2xl py-3.5 pl-12 pr-12 w-80 lg:w-96 text-sm font-extrabold text-slate-800 focus:outline-none focus:bg-white focus:border-neon-orange/40 focus:ring-4 focus:ring-neon-orange/10 transition-all placeholder:font-medium placeholder:text-slate-400 shadow-inner"
              />
              <div className="absolute right-3.5 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 text-[10px] font-black text-slate-400 shadow-sm pointer-events-none">
                <Command size={10} /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Tanggal & Waktu Live (Client Only untuk menghindari Hydration Error) */}
            {isClient ? (
              <div className="hidden xl:block text-right mr-2 bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200/60 shadow-inner cursor-default hover:bg-slate-100 transition-colors">
                <p className="text-xs font-black text-slate-800">{currentTime.date}</p>
                <p className="text-[11px] font-extrabold text-neon-orange mt-0.5 font-mono">{currentTime.time}</p>
              </div>
            ) : (
              <div className="hidden xl:block w-36 h-10 bg-slate-200 animate-pulse rounded-2xl mr-2" />
            )}
            
            {/* Notifikasi Bell */}
            <button className="relative w-12 h-12 flex items-center justify-center text-slate-600 hover:text-neon-orange bg-white hover:bg-orange-50 rounded-2xl transition-all border border-slate-200 shadow-sm hover:shadow-md group">
              <Bell size={20} className="group-hover:scale-110 transition-transform origin-top" />
              <span className="absolute top-3 right-3 w-3 h-3 bg-cyber-red rounded-full ring-4 ring-white animate-pulse"></span>
            </button>
            
            {/* Garis Pemisah Vertikal */}
            <div className="w-px h-8 bg-slate-200 hidden sm:block" />

            {/* Avatar Dropdown (Simulasi) */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-black text-slate-800">Admin_PTSP</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">Online</p>
              </div>
              <button className="w-11 h-11 rounded-2xl border-2 border-white hover:border-neon-orange overflow-hidden shadow-md transition-all hover:scale-105 active:scale-95 bg-slate-200">
                <img src={`https://ui-avatars.com/api/?name=Admin+OPD&background=0f172a&color=fff&bold=true`} alt="Avatar" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </header>

        {/* =========================================
            3. RENDER KONTEN HALAMAN ANAK (CHILDREN)
        ========================================= */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-10 relative z-10 scroll-smooth">
          {children}
        </main>
        
      </div>
    </div>
  );
}

// =========================================
// DEFAULT EXPORT DENGAN BUNGKUSAN SUSPENSE
// =========================================
export default function OpdLayout({ children }: { children: React.ReactNode }) {
  return (
    // Fallback UI saat suspense sedang memuat komponen rute klien
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-[1rem] bg-slate-200"></div>
          <p className="text-slate-500 font-bold">Memuat Dashboard OPD...</p>
        </div>
      </div>
    }>
      <OpdLayoutContent>{children}</OpdLayoutContent>
    </Suspense>
  );
}