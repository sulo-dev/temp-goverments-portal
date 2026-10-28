"use client";

import { useState } from "react";
import { opdArchiveData } from "@/lib/dummy-data";
import { 
  Search, 
  Download, 
  FileText, 
  CheckCircle,
  XCircle,
  Archive,
  CalendarDays,
  Filter,
  Eye,
  FileArchive,
  X,
  Printer,
  QrCode,
  Loader2,
  Check,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function ArsipOPD() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [dateFilter, setDateFilter] = useState("Semua");
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<typeof opdArchiveData[0] | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const filteredData = opdArchiveData.filter(item => {
    const matchesStatus = statusFilter === "Semua" || item.status === statusFilter;
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());
      
    let matchesDate = true;
    if (dateFilter === "Bulan Ini") matchesDate = item.completeDate.includes("Okt");
    if (dateFilter === "Bulan Lalu") matchesDate = item.completeDate.includes("Sep");

    return matchesStatus && matchesSearch && matchesDate;
  });

  // --- FUNGSI EKSPOR REKAP PDF ---
  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;
      
      const tableRows = filteredData.map(item => `
        <tr>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">${item.id}</td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>${item.name}</strong></td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">${item.service}</td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">${item.completeDate}</td>
          <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; color: ${item.status === 'Selesai' ? '#16a34a' : item.status === 'Ditolak' ? '#dc2626' : '#64748b'};">${item.status}</td>
        </tr>
      `).join("");

      const pdfTemplate = `
        <div style="font-family: Helvetica, Arial, sans-serif; padding: 20px; color: #1e293b; background: white;">
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #cbd5e1; padding-bottom: 15px;">
            <h2 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">Laporan Rekapitulasi Arsip Dokumen</h2>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Dinas Penanaman Modal & Pelayanan Terpadu</p>
          </div>
          
          <div style="margin-bottom: 20px; font-size: 12px; color: #475569;">
            <p style="margin: 2px 0;"><strong>Filter Waktu:</strong> ${dateFilter} | <strong>Filter Status:</strong> ${statusFilter}</p>
            <p style="margin: 2px 0;"><strong>Total Data:</strong> ${filteredData.length} Dokumen | <strong>Dicetak Pada:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                <th style="padding: 12px 10px; border: 1px solid #cbd5e1;">Nomor Tiket</th>
                <th style="padding: 12px 10px; border: 1px solid #cbd5e1;">Nama Pemohon</th>
                <th style="padding: 12px 10px; border: 1px solid #cbd5e1;">Layanan</th>
                <th style="padding: 12px 10px; border: 1px solid #cbd5e1;">Waktu Selesai</th>
                <th style="padding: 12px 10px; border: 1px solid #cbd5e1;">Status Akhir</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      `;

      const opt = {
        margin:       0.5,
        filename:     'Rekap_Arsip_OPD.pdf',
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' as const }
      };
      await html2pdf().set(opt).from(pdfTemplate).save();

      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);

    } catch (error) {
      console.error("Gagal ekspor rekap:", error);
      alert("Terjadi kesalahan saat mengekspor data rekap.");
      setIsExporting(false);
    }
  };

  // --- FUNGSI CETAK ---
  const handlePrint = () => {
    window.print();
  };

  // --- FUNGSI UNDUH PDF SATUAN ---
  const handleDownload = async () => {
    if (!selectedPdf) return;
    setIsDownloading(true);

    try {
      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;
      
      const pdfTemplate = `
        <div style="font-family: Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; background-color: #ffffff; width: 100%; box-sizing: border-box;">
          <div style="text-align: center; border-bottom: 3px solid #1e293b; padding-bottom: 20px; margin-bottom: 30px;">
            <h2 style="margin: 0; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">Pemerintah Daerah</h2>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #475569; font-weight: bold;">Dinas Penanaman Modal & Pelayanan Terpadu</p>
          </div>
          
          <h3 style="text-align: center; text-decoration: underline; margin-bottom: 40px; font-size: 18px; font-weight: 900;">
            ${selectedPdf.service.toUpperCase()}
          </h3>
          
          <div style="font-size: 14px; line-height: 1.8; color: #334155; margin-bottom: 40px;">
            <p>Berdasarkan Peraturan Daerah No. 12 Tahun 2026, dengan ini memberikan persetujuan / izin kepada:</p>
            
            <table style="width: 100%; margin-left: 20px; margin-top: 15px; margin-bottom: 20px; text-align: left;">
              <tr>
                <td style="width: 150px; font-weight: bold; padding: 4px 0;">Nama Lengkap</td>
                <td>: ${selectedPdf.name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 4px 0;">No. Registrasi</td>
                <td>: ${selectedPdf.id}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 4px 0;">Tanggal Terbit</td>
                <td>: ${selectedPdf.completeDate}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 4px 0;">Status Dokumen</td>
                <td style="color: #16a34a; font-weight: bold;">: ${selectedPdf.status.toUpperCase()}</td>
              </tr>
            </table>

            <p>Dokumen ini adalah sah dan diakui secara hukum. Dilarang memalsukan, menggandakan secara ilegal, atau menyalahgunakan dokumen ini untuk tujuan yang melanggar hukum.</p>
          </div>

          <table style="width: 100%; margin-top: 60px;">
            <tr>
              <td style="width: 60%;"></td>
              <td style="width: 40%; text-align: center;">
                <p style="font-size: 12px; color: #64748b; margin-bottom: 10px; font-weight: bold;">Ditetapkan secara elektronik oleh:</p>
                <div style="display: inline-block; padding: 10px; border: 2px solid #cbd5e1; border-radius: 8px; margin-bottom: 8px;">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=VERIFIED-${selectedPdf.id}" alt="QR Code" style="width: 80px; height: 80px;" crossorigin="anonymous" />
                </div>
                <p style="font-size: 10px; font-weight: 900; color: #2563eb; margin: 0; letter-spacing: 1px;">SAH & TERSERTIFIKASI</p>
              </td>
            </tr>
          </table>
        </div>
      `;

      const opt = {
        margin:       0.5,
        filename:     `Dokumen_Resmi_${selectedPdf.id}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(pdfTemplate).save();
    } catch (error) {
      console.error("Gagal men-generate PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12 relative font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          NOTIFIKASI TOAST (Floating UI)
      ========================================= */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${exportSuccess ? "translate-y-0 opacity-100 scale-100" : "-translate-y-16 opacity-0 scale-95 pointer-events-none"}`}>
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 text-white px-6 py-4 rounded-[1.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shrink-0 shadow-inner">
            <Check size={20} strokeWidth={3} className="text-white" />
          </div>
          <div>
            <h4 className="font-black text-sm tracking-wide">Ekspor Berhasil!</h4>
            <p className="text-xs text-slate-300 font-bold mt-0.5">File Rekap_Arsip_OPD.pdf telah diunduh.</p>
          </div>
        </div>
      </div>

      {/* =========================================
          HEADER SECTION
      ========================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-3 flex items-center gap-3">
            <div className="p-3 bg-white border border-slate-200 shadow-sm rounded-2xl hidden sm:block">
              <FileArchive className="text-neon-orange" size={32} />
            </div>
            Arsip & Riwayat
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-xl">Cari, tinjau, dan unduh riwayat dokumen pengajuan yang telah diterbitkan atau ditolak.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-3 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all disabled:opacity-80 disabled:cursor-not-allowed group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            {isExporting ? (
              <><Loader2 size={20} className="animate-spin text-neon-orange relative z-10" /> <span className="relative z-10">Menyiapkan PDF...</span></>
            ) : (
              <><Download size={20} className="group-hover:text-neon-orange transition-colors relative z-10" /> <span className="relative z-10">Ekspor Rekap Data</span></>
            )}
          </button>
        </div>
      </div>

      {/* =========================================
          FILTER & SEARCH BAR (Capsule Style)
      ========================================= */}
      <div className="bg-white/70 backdrop-blur-2xl p-6 md:p-8 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-4 md:gap-6 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Search Input */}
        <div className="flex-1 relative group z-10">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-orange transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Ketik nomor tiket, nama pemohon, atau layanan..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 backdrop-blur-md border-2 border-white rounded-[1.5rem] py-4 pl-14 pr-5 text-sm font-extrabold text-slate-800 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:border-neon-orange/50 focus:ring-4 focus:ring-neon-orange/10 transition-all shadow-sm hover:border-slate-200"
          />
        </div>

        {/* Date Filter */}
        <div className="relative md:w-64 z-10 group/filter">
          <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/filter:text-neon-orange transition-colors pointer-events-none" size={20} />
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full appearance-none bg-white/80 backdrop-blur-md border-2 border-white rounded-[1.5rem] py-4 pl-12 pr-10 text-sm font-extrabold text-slate-700 focus:outline-none focus:border-neon-orange/50 focus:ring-4 focus:ring-neon-orange/10 transition-all cursor-pointer shadow-sm hover:border-slate-200"
          >
            <option value="Semua">Semua Waktu</option>
            <option value="Bulan Ini">Bulan Ini (Okt 2026)</option>
            <option value="Bulan Lalu">Bulan Lalu (Sep 2026)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative md:w-56 z-10 group/filter2">
          <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/filter2:text-neon-orange transition-colors pointer-events-none" size={20} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-white/80 backdrop-blur-md border-2 border-white rounded-[1.5rem] py-4 pl-12 pr-10 text-sm font-extrabold text-slate-700 focus:outline-none focus:border-neon-orange/50 focus:ring-4 focus:ring-neon-orange/10 transition-all cursor-pointer shadow-sm hover:border-slate-200"
          >
            <option value="Semua">Semua Status</option>
            <option value="Selesai">Selesai (Di-TTE)</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Dicabut">Dicabut</option>
          </select>
        </div>
      </div>

      {/* =========================================
          TABEL DATA (Floating Rows)
      ========================================= */}
      <div className="overflow-x-auto min-h-[400px] p-2 bg-slate-50/30">
        {filteredData.length > 0 ? (
          <table className="w-full text-left border-separate border-spacing-y-3 min-w-[1000px]">
            <thead>
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 w-48">Nomor Tiket</th>
                <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60">Pemohon & Layanan</th>
                <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 w-48">Selesai Pada</th>
                <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 text-center w-40">Status Akhir</th>
                <th className="px-6 pb-3 pt-1 border-b-2 border-slate-200/60 text-right w-44">Dokumen</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr 
                  key={idx} 
                  className="bg-white/80 hover:bg-white transition-all duration-300 group hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:scale-[1.01] relative cursor-pointer"
                >
                  {/* Tiket */}
                  <td className="px-6 py-5 rounded-l-2xl border-y border-l border-white group-hover:border-slate-100">
                    <div className="inline-flex items-center gap-2 font-black text-slate-700 bg-slate-100 border border-slate-200/60 px-3 py-2 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors shadow-sm">
                      <Archive size={14} className="text-slate-400 group-hover:text-blue-600" />
                      {item.id}
                    </div>
                  </td>
                  
                  {/* Pemohon & Layanan */}
                  <td className="px-6 py-5 border-y border-white group-hover:border-slate-100">
                    <p className="font-black text-slate-800 text-sm mb-1.5">{item.name}</p>
                    <p className="text-xs font-bold text-slate-500 truncate max-w-[300px]" title={item.service}>
                      {item.service}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 mt-2 flex items-center gap-1.5 uppercase tracking-widest">
                      <CheckCircle size={12} className="text-emerald-500" /> Verifikator: {item.verifier}
                    </p>
                  </td>
                  
                  {/* Waktu Selesai */}
                  <td className="px-6 py-5 border-y border-white group-hover:border-slate-100">
                    <div className="inline-flex items-center gap-2 font-extrabold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-sm">
                      <CalendarDays size={14} className="text-slate-400" /> {item.completeDate}
                    </div>
                  </td>
                  
                  {/* Status Akhir */}
                  <td className="px-6 py-5 text-center border-y border-white group-hover:border-slate-100">
                    <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 w-full shadow-sm ${
                      item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      item.status === 'Ditolak' ? 'bg-red-50 text-cyber-red border-red-200' :
                      'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {item.status === 'Selesai' && <CheckCircle size={14} strokeWidth={3} />}
                      {item.status === 'Ditolak' && <XCircle size={14} strokeWidth={3} />}
                      {item.status}
                    </span>
                  </td>
                  
                  {/* Dokumen / Aksi */}
                  <td className="px-6 py-5 text-right rounded-r-2xl border-y border-r border-white group-hover:border-slate-100">
                    {item.status === 'Selesai' ? (
                      <button 
                        onClick={() => setSelectedPdf(item)}
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-[0_4px_15px_rgba(15,23,42,0.2)] hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 group/btn"
                      >
                        <Eye size={16} className="group-hover/btn:scale-110 transition-transform" /> Buka PDF
                      </button>
                    ) : (
                      <span className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-black text-slate-400 italic">
                        Tidak Ada Dokumen
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* --- 3D Empty State --- */
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="relative w-32 h-32 mb-8 group cursor-default mx-auto">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[30px] animate-pulse-slow" />
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-slate-300 border-4 border-white shadow-xl relative z-10 rotate-[15deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                <Search size={56} />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Arsip Tidak Ditemukan</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto text-lg">
              Tidak ada data riwayat yang cocok dengan filter atau kata kunci pencarian Anda.
            </p>
            <button 
              onClick={() => {setSearchQuery(""); setStatusFilter("Semua"); setDateFilter("Semua");}}
              className="mt-8 px-8 py-3.5 bg-slate-900 border-2 border-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-md hover:shadow-lg transition-all text-sm active:scale-95"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>

      {/* =========================================
          MODAL: CINEMATIC PDF VIEWER
      ========================================= */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 sm:p-8 animate-fade-in-up">
          
          <style>{`
            @media print {
              body * { visibility: hidden !important; }
              #printable-area, #printable-area * { visibility: visible !important; }
              #printable-area { 
                position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background: white; box-shadow: none; border: none;
              }
            }
          `}</style>

          <div className="bg-slate-900 w-full max-w-5xl h-[90vh] sm:h-[95vh] rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] border border-slate-700/50 flex flex-col overflow-hidden relative">
            
            {/* Topbar Lightbox */}
            <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50 px-6 md:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between z-20 print:hidden gap-4">
              <div className="flex flex-col">
                <h3 className="font-black text-white flex items-center gap-3 text-lg tracking-tight">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30"><FileText size={18} /></div> 
                  Pratinjau Dokumen Final
                </h3>
                <p className="text-[11px] font-extrabold text-slate-400 mt-2 tracking-widest flex items-center gap-2 uppercase">
                  <span className="text-neon-orange">{selectedPdf.id}</span> • {selectedPdf.name}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrint}
                  className="p-3 text-slate-300 hover:text-white bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 rounded-xl transition-all hidden sm:flex items-center gap-2 text-xs font-bold active:scale-95"
                >
                  <Printer size={16} /> Cetak (Print)
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="p-3 text-white bg-blue-600 hover:bg-blue-500 border border-blue-500 hover:border-blue-400 rounded-xl transition-all hidden sm:flex items-center gap-2 text-xs font-bold shadow-[0_4px_15px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {isDownloading ? "Menyimpan..." : "Unduh PDF Resmi"}
                </button>
                <div className="w-px h-8 bg-slate-700 mx-2 hidden sm:block"></div>
                <button 
                  onClick={() => setSelectedPdf(null)}
                  className="p-3 bg-slate-800 text-slate-400 hover:bg-cyber-red hover:text-white rounded-xl transition-colors border border-slate-700 hover:border-cyber-red"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Deep Space Document Canvas */}
            <div className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-12 flex justify-center custom-scrollbar relative group">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />
              
              {/* Kertas A4 Simulasi */}
              <div id="printable-area" className="w-full max-w-2xl bg-white shadow-[0_30px_100px_rgba(0,0,0,0.7)] min-h-[800px] p-8 sm:p-16 relative z-10 mx-auto">
                
                <div className="border-b-4 border-slate-800 pb-6 mb-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full mb-4 flex items-center justify-center border-2 border-slate-200 print:border-none">
                    <ShieldCheck size={40} className="text-slate-400 print:text-slate-800" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest leading-tight">Pemerintah Daerah</h2>
                  <p className="text-sm font-bold text-slate-600">Dinas Penanaman Modal & Pelayanan Terpadu</p>
                </div>

                <h3 className="text-center font-black text-lg underline underline-offset-4 decoration-2 mb-10">{selectedPdf.service.toUpperCase()}</h3>
                
                <div className="space-y-6 text-sm font-bold text-slate-700 leading-relaxed text-justify mb-16">
                  <p>Berdasarkan Peraturan Daerah No. 12 Tahun 2026, dengan ini memberikan persetujuan / izin kepada:</p>
                  
                  <div className="pl-6 space-y-3 my-6">
                    <div className="grid grid-cols-[140px_1fr] gap-2"><span className="font-black text-slate-800">Nama Lengkap</span><span>: {selectedPdf.name}</span></div>
                    <div className="grid grid-cols-[140px_1fr] gap-2"><span className="font-black text-slate-800">No. Registrasi</span><span className="font-mono text-slate-900 bg-slate-100 px-1 py-0.5 w-fit rounded">: {selectedPdf.id}</span></div>
                    <div className="grid grid-cols-[140px_1fr] gap-2"><span className="font-black text-slate-800">Tanggal Terbit</span><span>: {selectedPdf.completeDate}</span></div>
                    <div className="grid grid-cols-[140px_1fr] gap-2"><span className="font-black text-slate-800">Status</span><span className="text-emerald-600 font-black uppercase tracking-widest">: {selectedPdf.status}</span></div>
                  </div>

                  <p>Dokumen ini adalah sah dan diakui secara hukum. Dilarang memalsukan, menggandakan secara ilegal, atau menyalahgunakan dokumen ini untuk tujuan yang melanggar hukum. Tanda Tangan Elektronik (TTE) telah diverifikasi oleh Balai Sertifikasi Elektronik (BSrE).</p>
                </div>

                <div className="absolute bottom-16 right-16 flex flex-col items-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Ditetapkan Secara Elektronik</p>
                  <div className="w-28 h-28 bg-white border-2 border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 mb-2 p-2 relative overflow-hidden shadow-sm">
                    <QrCode size={70} strokeWidth={1.5} className="text-slate-800" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent w-full h-1/2 animate-scan print:hidden"></div>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1">Sah & Tersertifikasi</p>
                </div>        
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}