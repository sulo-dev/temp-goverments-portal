"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import AnimatedButton from "@/components/layout/AnimatedButton";
import { 
  PenTool, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Key, 
  Fingerprint, 
  X,
  Loader2,
  CheckSquare,
  Square,
  Info,
  Building2,
  User,
  Sparkles
} from "lucide-react";

// --- DATA SIMULASI ---
const initialPendingData = [
  { id: "REG-2026-101", name: "PT. Maju Mundur", service: "Persetujuan Bangunan Gedung (PBG)", time: "27 Okt 2026, 09:15", verifier: "Admin Utama", type: "Perusahaan" },
  { id: "REG-2026-102", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", time: "27 Okt 2026, 10:30", verifier: "Verifikator Ahli", type: "Instansi" },
  { id: "REG-2026-103", name: "CV. Abadi Jaya", service: "Izin Usaha Mikro dan Kecil", time: "27 Okt 2026, 11:45", verifier: "Admin Utama", type: "Perusahaan" },
  { id: "REG-2026-104", name: "Ahmad Dahlan", service: "Pembuatan Akta Kelahiran", time: "27 Okt 2026, 14:20", verifier: "Petugas Loket 1", type: "Individu" },
  { id: "REG-2026-105", name: "Yayasan Peduli Anak", service: "Izin Pendirian Yayasan", time: "27 Okt 2026, 15:10", verifier: "Admin Utama", type: "Instansi" },
];

export default function PersetujuanPimpinan() {
  const [data, setData] = useState(initialPendingData);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  
  // State untuk Modal TTE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);

  // --- LOGIKA CHECKBOX ---
  const handleSelectAll = () => {
    if (selectedDocs.length === data.length) {
      setSelectedDocs([]); 
    } else {
      setSelectedDocs(data.map(doc => doc.id)); 
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter(docId => docId !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  // --- LOGIKA PENANDATANGANAN ---
  const handleSignDocs = () => {
    setIsSigning(true);
    // Simulasi proses kriptografi (2.5 detik)
    setTimeout(() => {
      setIsSigning(false);
      setSignSuccess(true);
      
      // Hapus dokumen yang sudah ditandatangani dari tabel setelah sukses
      setTimeout(() => {
        setSignSuccess(false);
        setIsModalOpen(false);
        setPassphrase("");
        // Hapus data dari state
        setData(prev => prev.filter(doc => !selectedDocs.includes(doc.id)));
        setSelectedDocs([]);
      }, 2500);

    }, 2500);
  };

  // --- Varian Animasi ---
  const tableVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.95, x: 50, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-8 md:space-y-10 pb-36 relative font-sans selection:bg-amber-500/30">
      
      {/* =========================================
          HEADER EKSEKUTIF
      ========================================= */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 relative z-10"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 flex items-center gap-3">
            <div className="p-3 bg-white border border-slate-200 shadow-[0_10px_20px_rgba(0,0,0,0.05)] rounded-2xl hidden sm:block">
              <PenTool className="text-amber-500" size={32} />
            </div>
            Otorisasi & TTE
          </h1>
          <p className="text-slate-500 font-bold text-lg max-w-2xl">
            Tinjau secara teliti dan bubuhkan Tanda Tangan Elektronik (TTE) Tersertifikasi pada berkas pengajuan warga yang telah divalidasi.
          </p>
        </div>
        
        {/* Lencana Keamanan Sistem */}
        <div className="bg-slate-950 border border-slate-800 p-1.5 rounded-[1.5rem] flex items-center gap-2 shadow-[0_15px_30px_rgba(15,23,42,0.2)] shrink-0">
          <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
            <ShieldCheck size={24} className="text-emerald-400" />
          </div>
          <div className="pr-5 pl-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Kriptografi</p>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              TTE Aktif <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </p>
          </div>
        </div>
      </motion.div>

      {/* =========================================
          TABEL DATA (Glassmorphism + Selected States)
      ========================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] overflow-hidden relative z-10"
      >
        <div className="p-6 md:px-10 border-b border-slate-100 bg-white/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Daftar Tunggu Pengesahan <span className="bg-amber-100 text-amber-600 text-xs px-2.5 py-1 rounded-lg ml-2 font-bold">{data.length} Berkas</span>
          </h2>
          <AnimatePresence>
            {selectedDocs.length > 0 && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-xs font-black text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200"
              >
                {selectedDocs.length} Dokumen Dipilih
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="overflow-x-auto min-h-[400px] custom-scrollbar p-2">
          <AnimatePresence mode="wait">
            {data.length > 0 ? (
              <motion.table 
                key="table"
                variants={tableVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="w-full text-left border-separate border-spacing-y-2 min-w-[1000px]"
              >
                <thead>
                  <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 pb-3 pt-1 w-16 text-center border-b-2 border-slate-200/60">
                      <button onClick={handleSelectAll} className="text-slate-400 hover:text-amber-500 transition-colors focus:outline-none flex justify-center w-full">
                        {selectedDocs.length === data.length && data.length > 0 ? <CheckSquare size={20} className="text-amber-500" /> : <Square size={20} />}
                      </button>
                    </th>
                    <th className="px-4 pb-3 pt-1 w-48 border-b-2 border-slate-200/60">Nomor Registrasi</th>
                    <th className="px-4 pb-3 pt-1 border-b-2 border-slate-200/60">Identitas & Layanan</th>
                    <th className="px-4 pb-3 pt-1 w-48 border-b-2 border-slate-200/60">Waktu Masuk</th>
                    <th className="px-6 pb-3 pt-1 text-right w-56 border-b-2 border-slate-200/60">Verifikator Ahli</th>
                  </tr>
                </thead>
                <tbody className="relative">
                  <AnimatePresence>
                    {data.map((item) => {
                      const isSelected = selectedDocs.includes(item.id);
                      return (
                        <motion.tr 
                          key={item.id} 
                          layout="position"
                          variants={rowVariants}
                          onClick={() => handleSelectOne(item.id)}
                          className={`transition-all duration-300 cursor-pointer group relative rounded-2xl ${
                            isSelected ? 'bg-amber-50/60 shadow-[0_4px_15px_rgba(245,158,11,0.05)]' : 'bg-white/50 hover:bg-white'
                          }`}
                        >
                          {/* Indikator Pilihan (Garis Kiri Emas) */}
                          <td className="relative px-6 py-5 rounded-l-2xl border-y border-l border-white/50 group-hover:border-slate-100 align-middle">
                            <div className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full transition-all duration-300 ${isSelected ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-transparent'}`} />
                            <div className={`flex justify-center transition-transform duration-300 ${isSelected ? 'text-amber-500 scale-110' : 'text-slate-300 group-hover:text-amber-400 group-hover:scale-110'}`}>
                              {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                            </div>
                          </td>

                          {/* Tiket */}
                          <td className="px-4 py-5 border-y border-white/50 group-hover:border-slate-100 align-middle">
                            <div className={`inline-flex items-center gap-2 font-black px-3 py-1.5 rounded-xl transition-all ${isSelected ? 'bg-amber-100/50 text-amber-700 shadow-sm border border-amber-200/50' : 'bg-slate-100/50 text-slate-600 border border-slate-200/50'}`}>
                              <FileText size={14} className={isSelected ? 'text-amber-500' : 'text-slate-400'} />
                              {item.id}
                            </div>
                          </td>
                          
                          {/* Pemohon & Layanan */}
                          <td className="px-4 py-5 border-y border-white/50 group-hover:border-slate-100 align-middle">
                            <div className="font-black text-slate-900 text-sm mb-1.5 flex items-center gap-2.5 tracking-tight">
                              {item.name}
                              <span className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-lg flex items-center gap-1 font-bold ${
                                item.type === 'Perusahaan' || item.type === 'Instansi' 
                                  ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                  : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              }`}>
                                {item.type === 'Perusahaan' || item.type === 'Instansi' ? <Building2 size={10}/> : <User size={10}/>}
                                {item.type}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 truncate max-w-[350px]">
                              {item.service}
                            </p>
                          </td>
                          
                          {/* Waktu */}
                          <td className="px-4 py-5 border-y border-white/50 group-hover:border-slate-100 align-middle">
                            <p className={`font-bold text-sm flex items-center gap-2 transition-colors ${isSelected ? 'text-amber-700' : 'text-slate-600'}`}>
                              <Clock size={16} className={isSelected ? 'text-amber-500' : 'text-slate-400'} /> 
                              {item.time.split(',')[0]}
                            </p>
                            <span className="text-[11px] font-bold text-slate-400 block mt-1 ml-6">{item.time.split(',')[1]}</span>
                          </td>
                          
                          {/* Verifikator */}
                          <td className="px-6 py-5 text-right rounded-r-2xl border-y border-r border-white/50 group-hover:border-slate-100 align-middle">
                            <p className="text-xs font-black text-slate-700 flex items-center justify-end gap-2">
                              <CheckCircle2 size={16} className="text-emerald-500" /> {item.verifier}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lolos Validasi</p>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </motion.table>
            ) : (
              /* --- EMPTY STATE (All Clear) --- */
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-24 text-center px-4"
              >
                <div className="relative w-32 h-32 mb-8 group cursor-default">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[30px] animate-pulse-slow" />
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-emerald-50 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                    <ShieldCheck size={56} className="text-emerald-500 drop-shadow-md" />
                    <div className="absolute top-0 right-0 w-8 h-8 bg-amber-400 rounded-full border-4 border-white flex items-center justify-center shadow-lg"><Sparkles size={14} className="text-white"/></div>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Semua Berkas Telah Selesai!</h3>
                <p className="text-slate-500 font-bold max-w-md mx-auto text-lg leading-relaxed">
                  Luar biasa! Tidak ada dokumen yang menunggu otorisasi saat ini. SLA (Service Level Agreement) Anda sempurna.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* =========================================
          FLOATING ACTION BAR (Command Center)
      ========================================= */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        selectedDocs.length > 0 ? "translate-y-0 opacity-100 scale-100" : "translate-y-24 opacity-0 scale-95 pointer-events-none"
      }`}>
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-700 p-3 sm:p-4 rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] flex items-center gap-6 sm:gap-12 w-[90vw] max-w-3xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
          
          <div className="flex items-center gap-4 pl-2">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-[1.25rem] flex items-center justify-center border border-amber-500/30 shadow-inner">
              <span className="text-amber-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">{selectedDocs.length}</span>
            </div>
            <div>
              <p className="text-white font-black text-base tracking-tight">Dokumen Terpilih</p>
              <p className="text-slate-400 text-xs font-bold mt-0.5 tracking-wide">Siap Dieksekusi & Diterbitkan</p>
            </div>
          </div>
          
          <div className="flex-1 flex justify-end pr-1">
            <AnimatedButton 
              onClick={() => setIsModalOpen(true)}
              glowColor="from-amber-500 to-orange-500"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-8 py-4.5 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(245,158,11,0.3)] text-sm"
            >
              <Fingerprint size={20} /> 
              <span>Otorisasi & TTE Masal</span>
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* =========================================
          MODAL KEAMANAN TTE (Cinematic Vault)
      ========================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 sm:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden relative border border-slate-700/50 flex flex-col"
            >
              
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />

              {/* Header Modal - Terminal Style */}
              <div className="bg-slate-950/50 border-b border-slate-800/50 px-8 py-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4 text-white">
                  <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <ShieldCheck size={28} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-black tracking-tight text-lg text-white">Protokol Otorisasi TTE</h3>
                    <p className="text-amber-500/80 text-[10px] font-black uppercase tracking-widest mt-0.5">Balai Sertifikasi Elektronik (BSrE)</p>
                  </div>
                </div>
                <button 
                  onClick={() => !isSigning && setIsModalOpen(false)}
                  disabled={isSigning}
                  className="text-slate-500 hover:text-white bg-slate-800 hover:bg-cyber-red p-2.5 rounded-xl transition-all disabled:opacity-50 border border-slate-700 hover:border-cyber-red active:scale-95"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body Modal */}
              <div className="p-8 md:p-10 relative z-10 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!signSuccess ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-10">
                        <div className="w-24 h-24 bg-slate-950 border border-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 relative shadow-inner">
                          <Key size={40} className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 border-4 border-slate-900 rounded-full flex items-center justify-center shadow-lg"><CheckCircle2 size={16} className="text-white"/></div>
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">Masukkan Passphrase</h3>
                        <p className="text-sm font-bold text-slate-400 mt-3 leading-relaxed">
                          Anda akan menandatangani <strong className="text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20 mx-1">{selectedDocs.length} dokumen</strong> secara elektronik. Dokumen yang telah di-TTE mengikat secara hukum.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="relative group/input">
                          <input 
                            type="password" 
                            placeholder="••••••••"
                            value={passphrase}
                            onChange={(e) => setPassphrase(e.target.value)}
                            disabled={isSigning}
                            autoFocus
                            className="w-full bg-slate-950 border-2 border-slate-800 rounded-[1.5rem] px-6 py-5 text-center text-3xl font-black tracking-[0.5em] text-amber-400 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all disabled:opacity-50 placeholder:text-slate-700 shadow-inner"
                          />
                        </div>

                        <div className="flex items-start gap-3 bg-blue-500/10 text-blue-400 p-4 rounded-[1.25rem] text-xs font-bold border border-blue-500/20 leading-relaxed">
                          <Info size={20} className="shrink-0 text-blue-500" />
                          Sebagai simulasi portal, ketikkan minimal 3 karakter lalu klik tombol Eksekusi di bawah.
                        </div>

                        <AnimatedButton 
                          onClick={handleSignDocs}
                          disabled={isSigning || passphrase.length < 3}
                          glowColor="from-amber-500 to-orange-500"
                          className={`w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-6 py-5 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(245,158,11,0.2)] text-base ${isSigning || passphrase.length < 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isSigning ? (
                            <>
                              <Loader2 size={24} className="animate-spin" /> 
                              <span>Mengeksekusi Hash SHA-256...</span>
                            </>
                          ) : (
                            <>
                              <Fingerprint size={24} /> 
                              <span>Sahkan & Eksekusi Kriptografi</span>
                            </>
                          )}
                        </AnimatedButton>
                      </div>
                    </motion.div>
                  ) : (
                    /* Success State (Cinematic Reveal) */
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="relative w-32 h-32 mx-auto mb-8">
                        <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-[40px] animate-pulse-slow" />
                        <div className="w-32 h-32 bg-emerald-500 rounded-[2rem] flex items-center justify-center relative z-10 shadow-[0_20px_50px_rgba(16,185,129,0.4)]">
                          <CheckCircle2 size={64} className="text-white drop-shadow-md" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Otorisasi Berhasil!</h3>
                      <p className="text-base font-bold text-slate-400 leading-relaxed max-w-sm mx-auto">
                        <strong className="text-emerald-400">{selectedDocs.length} Dokumen</strong> telah disahkan secara hukum dan diteruskan ke arsip digital pemohon.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}