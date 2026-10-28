"use client";

import { useState } from "react";
// Pastikan kita mengimpor mockTrackingData dari tempat yang benar
import { TrackingResult, mockTrackingData } from "@/lib/dummy-data"; 
import { 
  Search, CheckCircle, Clock, FileText, Activity, ArrowRight, 
  ShieldCheck, Check, AlertCircle, RotateCw, Fingerprint, 
  MousePointer2, Sparkles 
} from "lucide-react";

export default function LacakPengajuan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);

  // Fungsi pencarian utama
  const executeSearch = (query: string) => {
    if (!query.trim()) return;

    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(false);

    // Simulasi delay pencarian API
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      
      // Ubah query menjadi huruf besar dan hilangkan spasi
      const formattedQuery = query.trim().toUpperCase();
      
      // Cek langsung ke "database" dummy kita
      const foundData = mockTrackingData[formattedQuery];

      if (foundData) {
        setResult(foundData); // Jika ada, tampilkan data spesifik tersebut
      } else {
        setResult(null); // Jika tidak ada, tampilkan "Tidak Ditemukan"
      }
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
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

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-24 md:py-32 min-h-screen">
        
        {/* =========================================
            HEADER SECTION
        ========================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          {/* Floating 3D Badge */}
          <div className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-slate-800 text-sm font-extrabold mb-8 hover:shadow-[0_10px_30px_rgba(250,77,9,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Sparkles size={16} className="text-neon-orange" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-cyber-red">
              Pelacakan Real-Time
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
            Lacak <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Status Laporan</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
            Masukkan Nomor Registrasi / Tiket Anda untuk memantau progres permohonan layanan publik atau pengaduan secara transparan.
          </p>
        </div>

        {/* =========================================
            SEARCH BAR (ULTRA-GLASS 3D)
        ========================================= */}
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="relative group">
            {/* Animasi Glow Background saat Fokus */}
            <div className="absolute -inset-2 bg-gradient-to-r from-neon-orange via-cyber-red to-neon-orange rounded-[3rem] blur-[30px] opacity-10 group-focus-within:opacity-40 transition duration-700 pointer-events-none" />
            
            <form onSubmit={handleFormSubmit} className="relative bg-white/70 backdrop-blur-2xl p-3 md:p-4 rounded-[2.5rem] md:rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border-2 border-white flex flex-col md:flex-row gap-4 overflow-hidden group-focus-within:border-neon-orange/50 transition-colors">
              
              <div className="flex-1 relative flex items-center">
                <div className="absolute left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 group-focus-within:text-neon-orange group-focus-within:bg-orange-50 transition-all border border-slate-100 group-focus-within:border-orange-200 shadow-sm">
                  <Search size={22} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Contoh: REG-2026-001" 
                  className="w-full bg-transparent border-none py-6 pl-24 pr-6 text-slate-800 placeholder-slate-400 text-xl md:text-2xl focus:outline-none focus:ring-0 font-black tracking-widest uppercase transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="md:w-auto w-full bg-slate-900 hover:bg-slate-800 text-white px-10 py-6 md:py-0 rounded-3xl md:rounded-full font-black text-lg transition-all shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-h-[76px] relative overflow-hidden group/btn hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-red to-neon-orange opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  {isSearching ? (
                    <><RotateCw size={24} className="animate-spin text-white" /> Memproses...</>
                  ) : (
                    <>Lacak Tiket <ArrowRight size={24} className="text-white group-hover/btn:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Quick Chips (Pencarian Cepat) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-sm font-extrabold text-slate-500 flex items-center gap-1.5 uppercase tracking-widest">
              <MousePointer2 size={16}/> Uji Coba:
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => executeSearch("REG-2026-001")}
                className="px-5 py-2.5 bg-white/60 backdrop-blur-md hover:bg-white border-2 border-white hover:border-emerald-400 hover:text-emerald-600 text-slate-600 text-xs font-black rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <FileText size={16}/> REG-2026-001 <span className="font-medium text-emerald-500">(Valid)</span>
              </button>
              <button 
                onClick={() => executeSearch("REG-2026-003")}
                className="px-5 py-2.5 bg-white/60 backdrop-blur-md hover:bg-white border-2 border-white hover:border-cyber-red hover:text-cyber-red text-slate-600 text-xs font-black rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <AlertCircle size={16}/> REG-2026-003 <span className="font-medium text-cyber-red">(Revisi)</span>
              </button>
              <button 
                onClick={() => executeSearch("INVALID-000")}
                className="px-5 py-2.5 bg-white/60 backdrop-blur-md hover:bg-white border-2 border-white hover:border-slate-500 hover:text-slate-800 text-slate-500 text-xs font-black rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Search size={16}/> INVALID-000 <span className="font-medium text-slate-400">(Kosong)</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            RESULT SECTION
        ========================================= */}
        {hasSearched && (
          <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            {result ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* --- KOLOM KIRI: TIMELINE 3D (8 KOLOM) --- */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-neon-orange/10 via-cyber-red/5 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4 relative z-10 tracking-tight">
                      <div className="p-3 rounded-2xl bg-orange-50 text-neon-orange border border-orange-100 shadow-sm">
                        <Activity size={28} />
                      </div>
                      Riwayat Pemrosesan
                    </h2>

                    {/* Vertical Timeline */}
                    <div className="relative pl-6 md:pl-10 z-10">
                      {/* Garis Latar Vertikal Lembut */}
                      <div className="absolute left-[2.35rem] md:left-[3.35rem] top-4 bottom-12 w-1.5 bg-white border border-slate-100 rounded-full z-0 shadow-inner" />

                      <div className="space-y-10 relative z-10">
                        {result.timeline.map((item, idx) => (
                          <div key={idx} className="flex gap-6 md:gap-8 group/item">
                            
                            {/* Indikator Status (Lingkaran) */}
                            <div className="relative shrink-0 mt-1">
                              <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center border-2 bg-white transition-all duration-500 shadow-sm relative z-10 ${
                                item.status === 'completed' ? 'border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' :
                                item.status === 'error' ? 'border-cyber-red text-cyber-red shadow-[0_0_15px_rgba(220,38,38,0.3)]' :
                                item.status === 'active' ? 'border-neon-orange text-neon-orange shadow-[0_0_25px_rgba(250,77,9,0.5)] scale-110' :
                                'border-slate-200 text-slate-300'
                              }`}>
                                {/* Ping Effect untuk status aktif */}
                                {item.status === 'active' && <div className="absolute inset-0 bg-neon-orange/20 rounded-[1.25rem] animate-ping" />}
                                
                                {item.status === 'completed' && <Check size={24} strokeWidth={4} className="relative z-10" />}
                                {item.status === 'error' && <AlertCircle size={24} strokeWidth={4} className="relative z-10" />}
                                {item.status === 'active' && <RotateCw size={24} strokeWidth={3} className="animate-spin-slow relative z-10" />}
                                {item.status === 'pending' && <Clock size={24} strokeWidth={3} className="relative z-10" />}
                              </div>
                              
                              {/* Garis Aktif Bercahaya (Menghubungkan antar item) */}
                              {item.status === 'completed' && idx < result.timeline.length - 1 && (
                                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-gradient-to-b from-emerald-400 to-transparent -z-10 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                              )}
                            </div>

                            {/* Konten Teks Timeline */}
                            <div className="pt-2 pb-4 flex-1">
                              <h3 className={`text-xl font-black mb-1.5 transition-colors ${
                                item.status === 'active' ? 'text-neon-orange' : 
                                item.status === 'error' ? 'text-cyber-red' :
                                item.status === 'completed' ? 'text-emerald-600' :
                                'text-slate-800'
                              }`}>
                                {item.title}
                              </h3>
                              <p className="text-[11px] font-black text-slate-400 mb-4 flex items-center gap-1.5 uppercase tracking-widest bg-white/50 inline-flex px-2 py-1 rounded-md border border-white">
                                <Clock size={12} /> {item.date}
                              </p>
                              <div className={`p-5 rounded-2xl border-2 text-sm font-bold leading-relaxed transition-all shadow-sm ${
                                item.status === 'active' ? 'bg-orange-50 border-orange-200 text-slate-800' : 
                                item.status === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 
                                'bg-white border-white text-slate-600'
                              }`}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- KOLOM KANAN: DARK GLASS TICKET (4 KOLOM) --- */}
                <div className="lg:col-span-4 sticky top-32">
                  <div className="bg-slate-900 p-8 md:p-10 rounded-[3rem] border border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.4)] relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-orange/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-neon-orange/30 transition-colors duration-700" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-repeat pointer-events-none" />
                    
                    <h3 className="font-black text-white text-2xl mb-8 relative z-10 flex items-center gap-3 tracking-tight">
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-neon-orange">
                        <ShieldCheck size={24} />
                      </div>
                      Detail Tiket
                    </h3>
                    
                    <div className="space-y-6 relative z-10">
                      {/* Nomor Resi */}
                      <div className="bg-white/5 p-6 rounded-3xl backdrop-blur-md border border-white/10 text-center shadow-inner hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Nomor Registrasi</p>
                        <p className="font-black text-neon-orange text-3xl tracking-widest drop-shadow-[0_0_10px_rgba(250,77,9,0.5)]">
                          {result.ticketNumber}
                        </p>
                      </div>
                      
                      {/* Data Info */}
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-5 backdrop-blur-md">
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Layanan Terkait</p>
                          <p className="font-extrabold text-white text-sm leading-snug">{result.serviceName}</p>
                        </div>
                        <div className="h-px bg-white/10 w-full" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Nama Pemohon</p>
                          <p className="font-extrabold text-white text-sm leading-snug">{result.applicant}</p>
                        </div>
                      </div>

                      {/* Status Terkini */}
                      <div className="pt-2">
                        <div className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border-2 font-black text-sm uppercase tracking-widest shadow-lg ${
                          result.status.toLowerCase().includes('perbaikan') ? 'bg-cyber-red/20 text-red-400 border-cyber-red/30 shadow-red-500/20' :
                          result.status.toLowerCase().includes('selesai') ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-500/20' :
                          'bg-neon-orange/20 text-neon-orange border-neon-orange/30 shadow-neon-orange/20'
                        }`}>
                          <Activity size={20} /> {result.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* --- TAMPILAN 3D ERROR / TIDAK DITEMUKAN --- */
              <div className="bg-white/60 backdrop-blur-2xl p-12 md:p-16 rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center max-w-3xl mx-auto flex flex-col items-center">
                
                {/* 3D Search Error Icon */}
                <div className="relative w-32 h-32 mb-8 group cursor-pointer">
                  <div className="absolute inset-0 bg-cyber-red/20 rounded-full blur-[30px] animate-pulse-slow" />
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-cyber-red border-4 border-white shadow-xl relative z-10 rotate-[15deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                    <Search size={56} />
                    <div className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                      <AlertCircle size={16} strokeWidth={3} />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Data Tidak Ditemukan</h2>
                <p className="text-slate-500 font-medium leading-relaxed max-w-xl text-lg">
                  Maaf, sistem tidak dapat menemukan riwayat pengajuan dengan nomor "<strong>{searchQuery.toUpperCase()}</strong>". Pastikan Anda mengetikkan nomor yang benar atau hubungi admin jika ini merupakan kendala teknis.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}