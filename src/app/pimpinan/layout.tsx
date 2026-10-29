"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  PenTool, 
  BarChart4, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Award,
  ShieldCheck,
  Command,
  Sparkles
} from "lucide-react";

export default function PimpinanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [timeData, setTimeData] = useState({ date: "Memuat...", time: "--:--" });
  const pathname = usePathname();

  // Memastikan komponen telah di-mount (Mencegah Hydration Mismatch)
  useEffect(() => {
    setIsMounted(true);
    
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';
      setTimeData({ date: dateStr, time: timeStr });
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Menu Navigasi Sidebar Pimpinan
  const navItems = [
    { name: "Ikhtisar Eksekutif", path: "/pimpinan", icon: <LayoutDashboard size={20} /> },
    { name: "Persetujuan & TTE", path: "/pimpinan/persetujuan", icon: <PenTool size={20} /> },
    { name: "Laporan Kinerja", path: "/pimpinan/laporan", icon: <BarChart4 size={20} /> },
    { name: "Pengaturan Akun", path: "/pimpinan/pengaturan", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden font-sans selection:bg-amber-500/30">
      
      {/* =========================================
          1. MOBILE OVERLAY (Framer Motion)
      ========================================= */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* =========================================
          2. SIDEBAR (Eksekutif)
      ========================================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800/80 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 lg:static lg:flex lg:flex-col shadow-[10px_0_40px_rgba(0,0,0,0.2)] ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Sidebar Header (Brand) */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-slate-800/80 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none animate-pulse-slow" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-[0_8px_20px_rgba(245,158,11,0.3)] border border-amber-300/20">
              <Award className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black tracking-tight text-lg leading-tight flex items-center gap-1.5">
                Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">Board</span>
              </span>
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mt-0.5">Portal Pimpinan</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors active:scale-95"
          >
            <X size={22} />
          </button>
        </div>

        {/* Info Pimpinan */}
        <div className="px-6 py-6 border-b border-slate-800/80 relative">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/10 shadow-inner group cursor-default relative overflow-hidden hover:bg-white/10 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Kepala+Dinas&background=f59e0b&color=fff&bold=true" alt="Kadin" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden relative z-10">
              <p className="text-white font-black text-sm truncate tracking-tight">Kepala Dinas</p>
              <p className="text-amber-400 text-[11px] font-extrabold flex items-center gap-1.5 mt-1 truncate uppercase tracking-wider">
                <ShieldCheck size={14} className="text-amber-400" /> Otoritas Penuh
              </p>
            </div>
          </div>
        </div>

        {/* Navigasi Utama (Framer Motion LayoutId) */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar relative">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Menu Eksekutif</p>
          
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm transition-colors duration-300 relative group overflow-hidden ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {/* Highlight Animasi Fisik Fisika (Spring Layout) */}
                {isActive && (
                  <motion.div
                    layoutId="activePimpinanNav"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent border-l-4 border-amber-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-2xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {/* Hover Background Statis */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" />
                )}
                
                <div className={`${isActive ? 'text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'text-slate-400 group-hover:text-white'} transition-colors relative z-10`}>
                  {item.icon}
                </div>
                <span className="relative z-10">{item.name}</span>
                
                {isActive && (
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] z-10" />
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
            <LogOut size={20} className="group-hover:text-red-400 transition-colors group-hover:-translate-x-1" />
            <span>Keluar Sistem</span>
          </Link>
        </div>
      </aside>

      {/* =========================================
          3. AREA KONTEN UTAMA
      ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar Eksekutif */}
        <header className="h-24 bg-white/70 backdrop-blur-2xl border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-700 hover:text-amber-500 bg-white hover:bg-amber-50 p-3 rounded-2xl transition-all border border-slate-200 shadow-sm active:scale-95"
            >
              <Menu size={22} />
            </button>

            {/* Pencarian Eksekutif (Animasi Fokus Lebar) */}
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-4 text-slate-400 group-focus-within:text-amber-500 transition-colors z-10" size={18} />
              <input 
                type="text"
                placeholder="Cari laporan atau dokumen..."
                className="bg-slate-100/80 border-2 border-transparent rounded-[1.25rem] py-3.5 pl-12 pr-12 w-80 focus:w-96 text-sm font-extrabold text-slate-800 focus:outline-none focus:bg-white focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/10 transition-all duration-300 placeholder:font-medium placeholder:text-slate-400 shadow-inner relative z-0"
              />
              <div className="absolute right-3.5 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 text-[10px] font-black text-slate-400 shadow-sm pointer-events-none transition-opacity group-focus-within:opacity-0">
                <Command size={10} /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Tanggal & Waktu Live (Hydration Safe) */}
            <div className="hidden xl:block text-right mr-2 bg-slate-100/80 px-4 py-2 rounded-[1.25rem] border border-slate-200/60 shadow-inner">
              <p className="text-xs font-black text-slate-800">
                {isMounted ? timeData.date : "Memuat Tanggal..."}
              </p>
              <p className="text-[11px] font-extrabold text-amber-600 mt-0.5 uppercase tracking-widest">
                {isMounted ? timeData.time : "--:--"}
              </p>
            </div>
            
            {/* Notifikasi Bell */}
            <button className="relative w-12 h-12 flex items-center justify-center text-slate-600 hover:text-amber-500 bg-white hover:bg-amber-50 rounded-[1.25rem] transition-all border border-slate-200 shadow-sm hover:shadow-md active:scale-95 group">
              <Bell size={20} className="group-hover:scale-110 transition-transform origin-top" />
              <span className="absolute top-3 right-3 w-3 h-3 bg-cyber-red rounded-full ring-4 ring-white shadow-[0_0_10px_rgba(242,19,93,0.5)]"></span>
              {/* Ping Effect */}
              <span className="absolute top-3 right-3 w-3 h-3 bg-cyber-red rounded-full animate-ping opacity-75"></span>
            </button>
            
          </div>
        </header>

        {/* Konten Halaman Dinamis */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 sm:p-10 relative bg-[#F8FAFC]">
          {/* Subtle Ambient Background for Main Content */}
          <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
          
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>

    </div>
  );
}