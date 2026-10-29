import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";
import type { Metadata } from "next";

// Tambahkan konfigurasi metadataBase di sini
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "PortalSatu Pemerintahan",
    template: "%s | PortalSatu",
  },
  description: "Sistem Pemerintahan Berbasis Elektronik (SPBE) terpadu yang transparan dan responsif.",
  openGraph: {
    title: "PortalSatu Pemerintahan",
    description: "Sistem Pemerintahan Berbasis Elektronik (SPBE) terpadu.",
    url: "/",
    siteName: "PortalSatu",
    locale: "id_ID",
    type: "website",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 selection:bg-neon-orange/30 selection:text-white">
      
      {/* =========================================
          GLOBAL FIXED AMBIENT 3D BACKGROUND
          Dioptimalkan dengan will-change untuk performa
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-red/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-multiply will-change-transform" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-neon-orange/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply will-change-transform" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply will-change-transform" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
      </div>
      
      {/* =========================================
          NAVBAR GLOBAL
      ========================================= */}
      <Navbar />
      
      {/* =========================================
          MAIN CONTENT WRAPPER
      ========================================= */}
      <main className="flex-grow relative z-10 w-full flex flex-col">
        {children}
      </main>

      {/* =========================================
          GLOBAL FOOTER (DARK GLASSMORPHISM)
      ========================================= */}
      <footer className="relative z-10 w-full bg-slate-900 pt-20 pb-10 border-t border-slate-800 overflow-hidden">
        {/* Ornamen Background Footer */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-orange/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-red/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] bg-repeat pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Kolom 1: Brand & Info (5 Kolom) */}
            <div className="lg:col-span-5 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-red to-neon-orange p-0.5 shadow-[0_0_20px_rgba(250,77,9,0.3)] group-hover:shadow-[0_0_30px_rgba(250,77,9,0.5)] transition-shadow">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <ShieldCheck className="text-neon-orange" size={24} />
                  </div>
                </div>
                <span className="font-black text-2xl tracking-tighter text-white">
                  Portal<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-cyber-red">Satu</span>
                </span>
              </Link>
              <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                Sistem Pemerintahan Berbasis Elektronik (SPBE) terpadu. Memberikan pelayanan publik yang transparan, cepat, dan mudah diakses oleh seluruh lapisan masyarakat.
              </p>
              <div className="flex gap-4 pt-2">
                {/* Dummy Social Links */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-neon-orange hover:text-white hover:border-neon-orange transition-all cursor-pointer shadow-sm">
                    <ExternalLink size={16} />
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom 2: Tautan Cepat (3 Kolom) */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-white font-black text-lg tracking-wide uppercase">Tautan Cepat</h4>
              <ul className="space-y-4">
                {[
                  { label: "Beranda Utama", path: "/" },
                  { label: "Katalog Layanan", path: "/layanan" },
                  { label: "Lacak Pengajuan", path: "/lacak" },
                  { label: "Panduan Penggunaan", path: "#" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.path} className="text-slate-400 hover:text-neon-orange font-medium flex items-center gap-2 group transition-colors">
                      <ChevronRight size={14} className="text-slate-600 group-hover:text-neon-orange group-hover:translate-x-1 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3: Kontak & Bantuan (4 Kolom) */}
            <div className="lg:col-span-4 space-y-6">
              <h4 className="text-white font-black text-lg tracking-wide uppercase">Hubungi Kami</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-neon-orange">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Pusat Pemerintahan</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Gedung Utama SPBE, Jl. Merdeka No. 1, Ibu Kota, 12345</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-neon-orange">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Call Center (24/7)</p>
                    <p className="text-slate-400 text-sm">1500-123</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-neon-orange">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Email Resmi</p>
                    <p className="text-slate-400 text-sm">bantuan@portalsatu.go.id</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm font-medium">
              &copy; 2026 PortalSatu Pemerintahan. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
              <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}