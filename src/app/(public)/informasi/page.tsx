import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Megaphone, 
  Newspaper, 
  ChevronRight, 
  Info,
  Sparkles
} from "lucide-react";
import { mockNews, mockAgenda } from "@/lib/dummy-data";

export default function InformasiAgenda() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans selection:bg-neon-orange/30">
      
      {/* =========================================
          FIXED AMBIENT 3D BACKGROUND
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyber-red/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-neon-orange/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] right-[20%] w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[150px] mix-blend-multiply" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-24 md:py-32 min-h-screen">
        
        {/* =========================================
            HEADER SECTION
        ========================================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          {/* Floating 3D Badge */}
          <div className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-slate-800 text-sm font-extrabold mb-8 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Sparkles size={16} className="text-blue-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
              Kabar & Agenda Daerah
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
            Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Informasi Resmi</span>
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
            Dapatkan berita terkini, pengumuman resmi, serta jadwal kegiatan pemerintahan daerah secara transparan dan selalu terbarui.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =========================================
              KOLOM KIRI: BERITA & PENGUMUMAN (8 KOLOM)
          ========================================= */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
            
            <div className="flex items-center justify-between mb-2 px-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Berita Terkini</h2>
              <Link href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-white shadow-sm text-sm font-black text-slate-700 hover:text-neon-orange hover:shadow-md transition-all group">
                Lihat Semua <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-6">
              {mockNews.map((news, idx) => (
                <div 
                  key={news.id} 
                  className="bg-white/60 backdrop-blur-xl p-5 md:p-6 rounded-[2.5rem] border border-white hover:border-neon-orange/40 hover:shadow-[0_20px_50px_rgba(250,77,9,0.1)] hover:-translate-y-2 transition-all duration-500 group flex flex-col md:flex-row gap-6 lg:gap-8 cursor-pointer relative overflow-hidden"
                  style={{ animationDelay: `${0.1 * idx}s` }}
                >
                  
                  {/* Efek Refleksi Kaca */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent opacity-60 pointer-events-none z-0" />
                  
                  {/* Efek Glow Latar Belakang (Muncul saat hover) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-orange/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

                  {/* Thumbnail Placeholder 3D */}
                  <div className="w-full md:w-64 h-56 md:h-auto bg-slate-100 rounded-[1.5rem] shrink-0 overflow-hidden relative border-2 border-white shadow-inner group-hover:border-neon-orange/30 group-hover:shadow-[0_0_20px_rgba(250,77,9,0.15)] transition-all duration-500 z-10">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-700">
                      <Newspaper size={48} className="mb-2 drop-shadow-sm" />
                    </div>
                    {/* Overlay Gradient Gambar */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyber-red/30 to-neon-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Konten Berita */}
                  <div className="flex flex-col justify-center flex-grow py-2 relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm border bg-white ${news.color}`}>
                        {news.type === "Pengumuman" ? <Megaphone size={14} /> : <Newspaper size={14} />} 
                        {news.type}
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-lg border border-white">
                        <Calendar size={14} /> {news.date}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-slate-800 mb-3 group-hover:text-neon-orange transition-colors leading-snug tracking-tight">
                      {news.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                      {news.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-2 text-sm font-black text-slate-500 group-hover:text-white transition-all duration-300 bg-white border border-slate-100 px-5 py-2.5 rounded-xl group-hover:bg-gradient-to-r group-hover:from-cyber-red group-hover:to-neon-orange group-hover:border-transparent shadow-sm group-hover:shadow-[0_8px_15px_rgba(250,77,9,0.3)]">
                        Baca Selengkapnya <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================
              KOLOM KANAN: AGENDA & CTA (4 KOLOM, STICKY)
          ========================================= */}
          <div className="lg:col-span-4 sticky top-32 space-y-8 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            
            {/* --- PANEL AGENDA (GLASS) --- */}
            <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              
              {/* Ornamen Glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-neon-orange/20 rounded-full blur-[50px] pointer-events-none group-hover:bg-neon-orange/30 transition-colors duration-500" />
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent opacity-80 pointer-events-none" />
              
              <h2 className="text-2xl font-black text-slate-900 mb-8 relative z-10 tracking-tight flex items-center gap-3">
                <Calendar className="text-neon-orange" size={28} /> Agenda Resmi
              </h2>
              
              <div className="space-y-6 relative z-10">
                {mockAgenda.map((agenda, index) => (
                  <div key={agenda.id} className="group/agenda cursor-pointer">
                    <div className="flex gap-5 items-start">
                      
                      {/* Kotak Tanggal 3D */}
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-[1.25rem] bg-white border border-slate-100 text-slate-600 shrink-0 group-hover/agenda:bg-gradient-to-br group-hover/agenda:from-neon-orange group-hover/agenda:to-cyber-red group-hover/agenda:text-white group-hover/agenda:border-transparent transition-all duration-500 shadow-sm group-hover/agenda:shadow-[0_10px_20px_rgba(250,77,9,0.3)] group-hover/agenda:scale-110 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover/agenda:translate-y-0 transition-transform duration-500" />
                        <span className="text-2xl font-black leading-none relative z-10">{agenda.date}</span>
                        <span className="text-[9px] font-black uppercase mt-1 tracking-widest relative z-10">{agenda.month}</span>
                      </div>
                      
                      {/* Detail Agenda */}
                      <div className="pt-1">
                        <h4 className="font-extrabold text-slate-800 text-base mb-2 group-hover/agenda:text-neon-orange transition-colors leading-snug">
                          {agenda.title}
                        </h4>
                        <div className="space-y-2 mt-2">
                          <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                            <Clock size={14} className="text-slate-400" />
                            {agenda.time}
                          </p>
                          <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                            <MapPin size={14} className="text-cyber-red" />
                            <span className="line-clamp-1">{agenda.location}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Garis Pemisah Halus */}
                    {index < mockAgenda.length - 1 && (
                      <div className="w-full h-px bg-gradient-to-r from-slate-200/60 to-transparent mt-6"></div>
                    )}
                  </div>
                ))}
              </div>

              <Link 
                href="#" 
                className="mt-10 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black transition-all shadow-[0_10px_25px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_35px_rgba(15,23,42,0.3)] hover:-translate-y-1 group/btn"
              >
                Lihat Kalender Penuh <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* --- BANNER AJAKAN (DARK GLASS CTA) --- */}
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white shadow-[0_20px_50px_rgba(15,23,42,0.4)] relative overflow-hidden mt-8 border border-slate-800 group">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyber-red/30 rounded-full blur-[50px] pointer-events-none group-hover:bg-cyber-red/50 transition-colors duration-700" />
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Info size={28} className="text-neon-orange" />
                </div>
                
                <h3 className="font-black text-2xl mb-4 tracking-tight">Punya Aspirasi?</h3>
                <p className="text-sm text-slate-400 mb-10 leading-relaxed font-medium">
                  Sampaikan keluhan atau saran Anda terkait infrastruktur dan pelayanan publik melalui kanal pengaduan resmi secara <span className="text-white font-bold">aman dan anonim</span>.
                </p>
                
                <Link 
                  href="/pengaduan" 
                  className="relative overflow-hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyber-red to-neon-orange hover:from-neon-orange hover:to-cyber-red text-white text-sm font-black px-6 py-4 rounded-2xl transition-all shadow-[0_10px_25px_rgba(250,77,9,0.3)] hover:shadow-[0_15px_35px_rgba(250,77,9,0.5)] group/btn hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Buat Pengaduan <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}