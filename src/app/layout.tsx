import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// 1. Optimasi Font Tingkat Lanjut
// Mengatur weight secara spesifik dan display swap untuk performa (LCP) yang lebih baik
const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap", 
});

// 2. Konfigurasi Viewport (Next.js 14+)
// Memastikan skala UI sempurna di perangkat mobile dan menetapkan warna tema browser
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 3. Metadata Dinamis & Enterprise SEO
export const metadata: Metadata = {
  title: {
    template: "%s | Portal Satu Pintu", // Akan otomatis menjadi "Nama Halaman | Portal Satu Pintu"
    default: "Portal Satu Pintu Pemerintahan",
  },
  description: "Ekosistem platform digital pemerintahan berbasis Hyper-Glassmorphism yang modern, cepat, dan terintegrasi untuk pelayanan publik.",
  keywords: ["Pemda", "Portal Satu Pintu", "Pelayanan Publik", "E-Government", "TTE", "Smart City", "DPMPTSP"],
  authors: [{ name: "Pemerintah Daerah" }],
  creator: "Tim IT Internal Pemda",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://portalsatupintu.go.id",
    title: "Portal Satu Pintu Pemerintahan",
    description: "Layanan perizinan dan non-perizinan digital terpadu.",
    siteName: "Portal Satu Pintu",
    images: [
      {
        url: "/og-image.jpg", // Pastikan Anda memiliki gambar ini di folder public/
        width: 1200,
        height: 630,
        alt: "Portal Satu Pintu Pemerintahan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Satu Pintu Pemerintahan",
    description: "Layanan perizinan dan non-perizinan digital terpadu secara real-time.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      {/* 
        Penjelasan Body Classes:
        - plusJakarta.variable & .className: Menyuntikkan font ke seluruh aplikasi
        - antialiased: Membuat render font lebih tajam di layar resolusi tinggi (macOS/iOS)
        - bg-slate-50 text-slate-900: Kanvas default yang elegan
        - selection: Modifikasi warna blok teks saat disorot kursor (Orange/Amber)
        - overflow-x-hidden: Mencegah scroll horizontal tak disengaja
      */}
      <body 
        className={`
          ${plusJakarta.variable} ${plusJakarta.className} 
          antialiased bg-slate-50 text-slate-900 
          selection:bg-amber-500/30 selection:text-amber-900
          overflow-x-hidden min-h-screen flex flex-col
        `}
      >
        {/* Opsional: Tempatkan Provider Global di sini (Misal: Toaster, NextAuthProvider, ThemeProvider) */}
        {children}
      </body>
    </html>
  );
}