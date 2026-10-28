import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 selection:bg-neon-orange/30">
      
      {/* =========================================
          GLOBAL FIXED AMBIENT 3D BACKGROUND
          Ini akan menjadi dasar untuk semua halaman
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-red/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-neon-orange/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow mix-blend-multiply" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
      </div>
      
      {/* Navbar Global */}
      <Navbar />
      
      {/* Main Content Wrapper */}
      <main className="flex-grow relative z-10 w-full">
        {children}
      </main>
      
    </div>
  );
}