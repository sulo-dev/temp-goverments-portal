"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import AnimatedButton from "@/components/layout/AnimatedButton";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ZoomIn, 
  Download, 
  User, 
  MapPin, 
  AlertTriangle,
  RotateCw,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Maximize2
} from "lucide-react";

// Simulasi Data Detail Pengajuan
const mockTicketDetail = {
  id: "REG-2026-088",
  applicant: "Muhammad Reza",
  nik: "7314022601040001",
  address: "Jl. Poros Rappang - Sengkang, Sidenreng Rappang, Sulawesi Selatan",
  service: "Izin Usaha Mikro dan Kecil (IUMK)",
  date: "27 Okt 2026, 08:15 WITA",
  documents: [
    { id: "doc_1", name: "KTP Elektronik", type: "KTP", status: "pending" },
    { id: "doc_2", name: "NPWP Pribadi", type: "NPWP", status: "pending" },
    { id: "doc_3", name: "Surat Pengantar RT/RW", type: "Surat", status: "pending" },
    { id: "doc_4", name: "Foto Lokasi Usaha", type: "Foto", status: "pending" },
  ]
};

export default function VerifikasiDokumen() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id as string;
  
  const [activeDoc, setActiveDoc] = useState(mockTicketDetail.documents[0]);
  const [docStatuses, setDocStatuses] = useState<Record<string, "valid" | "invalid" | "pending">>(
    mockTicketDetail.documents.reduce((acc, doc) => ({ ...acc, [doc.id]: "pending" }), {})
  );
  const [revisionNote, setRevisionNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Checkers
  const allReviewed = Object.values(docStatuses).every(status => status !== "pending");
  const needsRevision = Object.values(docStatuses).some(status => status === "invalid");
  const allValid = Object.values(docStatuses).every(status => status === "valid");

  const handleStatusChange = (docId: string, status: "valid" | "invalid") => {
    setDocStatuses(prev => ({ ...prev, [docId]: status }));
  };

  const handleSubmit = (action: "approve" | "revise") => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/opd/antrean");
    }, 1500);
  };

  // --- Animasi Varian ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 md:space-y-8 pb-12 font-sans selection:bg-neon-orange/30"
    >
      
      {/* =========================================
          HEADER: WORKSPACE NAV (Premium Glass)
      ========================================= */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/70 backdrop-blur-2xl p-6 md:px-10 md:py-8 rounded-[2.5rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-orange/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="flex items-start lg:items-center gap-5 relative z-10">
          <Link href="/opd/antrean" className="p-3.5 bg-white border border-slate-200 text-slate-500 hover:text-neon-orange hover:border-neon-orange/50 rounded-2xl transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(250,77,9,0.15)] active:scale-95 shrink-0 mt-1 lg:mt-0">
            <ArrowLeft size={22} />
          </Link>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{ticketId || mockTicketDetail.id}</h1>
              <span className="bg-blue-50/80 text-blue-600 px-3.5 py-1.5 rounded-xl text-[10px] font-black border border-blue-200/60 uppercase tracking-widest flex items-center gap-1.5 w-fit shadow-sm">
                <Sparkles size={12} className="text-blue-500" /> Verifikasi Baru
              </span>
            </div>
            <p className="text-sm font-extrabold text-slate-500 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 tracking-tight">
              <span className="flex items-center gap-1.5 text-slate-700 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-sm"><User size={14} className="text-neon-orange" /> {mockTicketDetail.applicant}</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="bg-slate-100 px-2.5 py-1.5 rounded-xl text-slate-600">{mockTicketDetail.service}</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* =========================================
          WORKSPACE: SPLIT LAYOUT (12 Columns)
      ========================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* --- KIRI: DOCUMENT VIEWER (8 Kolom) --- */}
        <motion.div variants={itemVariants} className="xl:col-span-8 bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-[600px] xl:h-[800px]">
          
          {/* Doc Tabs Scrollable (Dengan Animasi Layout Framer Motion) */}
          <div className="flex overflow-x-auto hide-scrollbar border-b-2 border-slate-100/80 bg-slate-50/50 p-4 gap-2 relative">
            {mockTicketDetail.documents.map((doc) => {
              const status = docStatuses[doc.id];
              const isActive = activeDoc.id === doc.id;
              
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveDoc(doc)}
                  className={`relative flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm font-black whitespace-nowrap transition-colors duration-300 z-10 ${
                    isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {/* Active Background Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeDocumentTab"
                      className="absolute inset-0 bg-white border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] rounded-2xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  
                  {status === "valid" ? <CheckCircle2 size={18} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]" /> :
                   status === "invalid" ? <XCircle size={18} className="text-cyber-red drop-shadow-[0_0_5px_rgba(220,38,38,0.3)]" /> :
                   <FileText size={18} className={isActive ? "text-neon-orange" : ""} />}
                  
                  {doc.name}
                </button>
              );
            })}
          </div>

          {/* Deep Space Document Canvas */}
          <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-6 md:p-10 group/canvas">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.08] bg-repeat pointer-events-none" />
            
            {/* Viewport Floating Tools */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-30 opacity-0 group-hover/canvas:opacity-100 transition-all duration-300 transform translate-x-4 group-hover/canvas:translate-x-0">
              {[
                { icon: <ZoomIn size={20} />, label: "Zoom" },
                { icon: <Maximize2 size={20} />, label: "Fullscreen" },
                { icon: <Download size={20} />, label: "Unduh", cls: "mt-4" }
              ].map((btn, i) => (
                <button key={i} title={btn.label} className={`p-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl transition-all border border-white/10 hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95 ${btn.cls || ''}`}>
                  {btn.icon}
                </button>
              ))}
            </div>

            {/* Document Switcher Animasi */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeDoc.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl aspect-[1/1.414] bg-white rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.7)] overflow-hidden relative z-10 origin-center"
              >
                {/* Dummy Document Paper Content */}
                <div className="h-32 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
                  <div className="w-20 h-20 bg-slate-200 rounded-full mr-6 border-4 border-white shadow-sm flex items-center justify-center text-slate-300 font-bold text-xs">{activeDoc.type}</div>
                  <div className="space-y-3">
                    <div className="w-64 h-5 bg-slate-300 rounded-md"></div>
                    <div className="w-40 h-4 bg-slate-200 rounded-md"></div>
                  </div>
                </div>
                <div className="p-10 md:p-14 space-y-6">
                  <div className="w-full h-8 bg-slate-100 rounded-md mb-12 flex items-center px-4 font-black text-slate-300 uppercase tracking-widest text-sm">{activeDoc.name}</div>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={`h-4 bg-slate-100 rounded-md ${i % 3 === 0 ? 'w-full' : i % 2 === 0 ? 'w-11/12' : 'w-4/5'}`}></div>
                  ))}
                  
                  <div className="mt-20 flex items-end justify-between">
                     <div className="w-32 h-40 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-black text-[10px] tracking-widest uppercase text-center p-2">Area Tanda Tangan</div>
                     <div className="w-48 h-24 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-500 flex flex-col items-center justify-center rotate-[-5deg] shadow-lg">
                       <FileText size={24} className="mb-2 opacity-50" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-center px-4 leading-tight opacity-70">Dummy {activeDoc.type}</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>
        </motion.div>

        {/* --- KANAN: PANEL VERIFIKASI (4 Kolom) --- */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* 1. Data Pemohon Card */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-2xl p-8 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-100 rounded-full blur-[40px] pointer-events-none" />
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3 text-xl tracking-tight relative z-10">
              <div className="p-2.5 rounded-xl bg-orange-50 text-neon-orange border border-orange-100"><User size={20} /></div> Data Pemohon
            </h3>
            <div className="space-y-4 text-sm relative z-10">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-1.5">Nama Lengkap</p>
                <p className="font-black text-slate-800 text-base">{mockTicketDetail.applicant}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-1.5">NIK Kependudukan</p>
                <p className="font-black text-slate-700 font-mono tracking-wider">{mockTicketDetail.nik}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-1.5">Alamat Domisili</p>
                <p className="font-bold text-slate-600 leading-relaxed flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-neon-orange" /> {mockTicketDetail.address}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. Checklist Verifikasi Card */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-2xl p-8 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)]">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3 text-xl tracking-tight">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500 border border-blue-100"><ShieldCheck size={20} /></div> Ceklis Dokumen
            </h3>
            
            <div className="space-y-4 mb-8">
              {mockTicketDetail.documents.map((doc) => {
                const isValid = docStatuses[doc.id] === "valid";
                const isInvalid = docStatuses[doc.id] === "invalid";
                
                return (
                  <div key={doc.id} className={`p-4 rounded-[1.5rem] border-2 transition-all duration-300 ${
                    isValid ? 'bg-emerald-50/50 border-emerald-200' : 
                    isInvalid ? 'bg-red-50/50 border-red-200' : 
                    'bg-slate-50 border-white shadow-sm'
                  }`}>
                    <span className={`font-black text-sm mb-3 block ${isValid ? 'text-emerald-700' : isInvalid ? 'text-red-700' : 'text-slate-700'}`}>
                      {doc.name}
                    </span>
                    <div className="flex gap-2 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
                      <button 
                        onClick={() => handleStatusChange(doc.id, "valid")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${
                          isValid 
                            ? "bg-emerald-500 text-white shadow-[0_8px_15px_rgba(16,185,129,0.3)]" 
                            : "bg-transparent text-slate-400 hover:bg-white hover:text-emerald-500 shadow-none"
                        }`}
                      >
                        <CheckCircle2 size={16} /> Valid
                      </button>
                      <button 
                        onClick={() => handleStatusChange(doc.id, "invalid")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${
                          isInvalid 
                            ? "bg-cyber-red text-white shadow-[0_8px_15px_rgba(220,38,38,0.3)]" 
                            : "bg-transparent text-slate-400 hover:bg-white hover:text-red-500 shadow-none"
                        }`}
                      >
                        <XCircle size={16} /> Tidak Valid
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Kolom Catatan Revisi dengan AnimatePresence (Smooth Expand) */}
            <AnimatePresence>
              {needsRevision && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                  animate={{ height: "auto", opacity: 1, overflow: "visible" }}
                  exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="mb-8"
                >
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest bg-slate-100 w-fit px-3 py-1.5 rounded-lg">
                    <MessageSquare size={14} className="text-cyber-red" /> Catatan Revisi Warga
                  </label>
                  <textarea 
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="Ketik catatan revisi di sini. Cth: Foto KTP blur/terpotong, mohon foto ulang..."
                    className="w-full bg-white border-2 border-red-200 rounded-[1.5rem] p-5 text-sm font-bold text-slate-700 focus:outline-none focus:border-cyber-red focus:ring-4 focus:ring-red-500/10 transition-all h-32 resize-none shadow-inner"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final Action Buttons (Smart Animated Button) */}
            <div className="pt-2">
              {!allReviewed ? (
                <div className="flex items-start gap-3 p-4 bg-amber-50/80 text-amber-700 border-2 border-amber-200/60 rounded-[1.5rem] text-[11px] font-black leading-relaxed">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={16} className="text-amber-500" />
                  </div>
                  <p className="mt-1.5">Harap periksa dan tandai status (Valid/Tidak Valid) pada seluruh dokumen di atas sebelum mengeksekusi pengajuan.</p>
                </div>
              ) : allValid ? (
                <AnimatedButton 
                  onClick={() => handleSubmit("approve")}
                  disabled={isSubmitting}
                  glowColor="from-emerald-500 to-green-400"
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-lg transition-opacity ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? <RotateCw size={22} className="animate-spin" /> : <><ShieldCheck size={22} /> Setujui & Terbitkan</>}
                </AnimatedButton>
              ) : (
                <AnimatedButton 
                  onClick={() => handleSubmit("revise")}
                  disabled={isSubmitting || !revisionNote.trim()}
                  glowColor="from-cyber-red to-red-500"
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-lg transition-opacity ${isSubmitting || !revisionNote.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? <RotateCw size={22} className="animate-spin" /> : <><AlertTriangle size={22} /> Kembalikan (Revisi)</>}
                </AnimatedButton>
              )}
            </div>
            
          </motion.div>
        </div>
      </div>
      
    </motion.div>
  );
}