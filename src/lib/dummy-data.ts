// Tipe data untuk hasil pelacakan
export type TrackingResult = {
  ticketNumber: string;
  serviceName: string;
  applicant: string;
  date: string;
  status: string;
  timeline: {
    step: number;
    title: string;
    date: string;
    desc: string;
    status: "completed" | "active" | "pending" | "error";
  }[];
};

export const dummyServices = [
  {
    id: "SRV-001",
    opd: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu",
    name: "Izin Usaha Mikro dan Kecil (IUMK)",
    description: "Pemberian izin legalitas bagi pelaku usaha mikro dan kecil untuk menjalankan kegiatan usahanya secara resmi dan terdaftar di database pemerintah daerah.",
    estimatedDays: 3,
    category: "Perizinan",
    requirements: [
      { id: "REQ-1", name: "Fotokopi KTP Pemohon", isMandatory: true },
      { id: "REQ-2", name: "Fotokopi NPWP Pribadi", isMandatory: true },
      { id: "REQ-3", name: "Surat Pengantar RT/RW", isMandatory: false },
      { id: "REQ-4", name: "Foto Lokasi Usaha (Tampak Depan & Dalam)", isMandatory: true },
    ]
  },
  {
    id: "SRV-002",
    opd: "Dinas Kependudukan dan Pencatatan Sipil",
    name: "Pencetakan Ulang KTP Elektronik",
    description: "Layanan pencetakan ulang KTP Elektronik karena hilang, rusak, atau adanya perubahan elemen data kependudukan.",
    estimatedDays: 1,
    category: "Kependudukan",
    requirements: [
      { id: "REQ-5", name: "Surat Keterangan Kehilangan dari Kepolisian", isMandatory: false },
      { id: "REQ-6", name: "KTP Asli yang Rusak (Jika Alasan Rusak)", isMandatory: false },
      { id: "REQ-7", name: "Fotokopi Kartu Keluarga (KK)", isMandatory: true },
    ]
  },
  {
    id: "SRV-003",
    opd: "Dinas Kesehatan",
    name: "Izin Praktik Tenaga Kesehatan (SIP)",
    description: "Penerbitan Surat Izin Praktik (SIP) bagi dokter, perawat, bidan, dan tenaga kesehatan lainnya yang akan berpraktik di wilayah daerah.",
    estimatedDays: 5,
    category: "Kesehatan",
    requirements: [
      { id: "REQ-8", name: "Fotokopi STR yang Dilegalisir", isMandatory: true },
      { id: "REQ-9", name: "Surat Keterangan Sehat dari Dokter Pemerintah", isMandatory: true },
      { id: "REQ-10", name: "Rekomendasi dari Organisasi Profesi", isMandatory: true },
      { id: "REQ-11", name: "Pas Foto 4x6 (2 Lembar) Latar Merah", isMandatory: true },
    ]
  },
  {
    id: "SRV-004",
    opd: "Dinas Kependudukan dan Pencatatan Sipil",
    name: "Pembuatan Akta Kelahiran Baru",
    description: "Layanan pencatatan dan penerbitan Akta Kelahiran bagi anak yang baru lahir sebagai bentuk pengakuan negara atas status individu dan kewarganegaraan.",
    estimatedDays: 2,
    category: "Kependudukan",
    requirements: [
      { id: "REQ-12", name: "Surat Keterangan Lahir dari RS/Bidan/Puskesmas", isMandatory: true },
      { id: "REQ-13", name: "Fotokopi Buku Nikah / Akta Perkawinan Orang Tua", isMandatory: true },
      { id: "REQ-14", name: "Fotokopi KTP Kedua Orang Tua", isMandatory: true },
      { id: "REQ-15", name: "Fotokopi KTP Dua Orang Saksi", isMandatory: true },
    ]
  },
  {
    id: "SRV-005",
    opd: "Dinas Pekerjaan Umum dan Penataan Ruang",
    name: "Persetujuan Bangunan Gedung (PBG)",
    description: "Perizinan yang diberikan kepada pemilik bangunan gedung untuk membangun baru, mengubah, memperluas, mengurangi, dan/atau merawat bangunan gedung sesuai standar teknis.",
    estimatedDays: 14,
    category: "Perizinan",
    requirements: [
      { id: "REQ-16", name: "Bukti Kepemilikan Hak Atas Tanah (Sertifikat)", isMandatory: true },
      { id: "REQ-17", name: "Gambar Rencana Arsitektur & Struktur Bangunan", isMandatory: true },
      { id: "REQ-18", name: "Persetujuan Lingkungan (SPPL/UKL-UPL)", isMandatory: false },
    ]
  },
  {
    id: "SRV-006",
    opd: "Dinas Tenaga Kerja",
    name: "Pendaftaran Kartu Pencari Kerja (AK-1)",
    description: "Pembuatan Kartu Kuning (AK-1) sebagai syarat untuk melamar pekerjaan di instansi pemerintah (CPNS) maupun perusahaan swasta.",
    estimatedDays: 1,
    category: "Ketenagakerjaan",
    requirements: [
      { id: "REQ-19", name: "Fotokopi KTP Daerah Setempat", isMandatory: true },
      { id: "REQ-20", name: "Fotokopi Ijazah Terakhir Dilegalisir", isMandatory: true },
      { id: "REQ-21", name: "Pas Foto 3x4 (2 Lembar) Latar Biru/Merah", isMandatory: true },
      { id: "REQ-22", name: "Sertifikat Pelatihan/Kompetensi", isMandatory: false },
    ]
  },
  {
    id: "SRV-007",
    opd: "Dinas Sosial",
    name: "Pendaftaran Data Terpadu Kesejahteraan Sosial (DTKS)",
    description: "Pendaftaran bagi warga kurang mampu untuk masuk ke dalam database DTKS guna mendapatkan program bantuan sosial dari pemerintah (PKH, BPNT, KIS).",
    estimatedDays: 7,
    category: "Sosial",
    requirements: [
      { id: "REQ-23", name: "Surat Pengantar dari Desa / Kelurahan", isMandatory: true },
      { id: "REQ-24", name: "Fotokopi Kartu Keluarga (KK)", isMandatory: true },
      { id: "REQ-25", name: "Fotokopi KTP Kepala Keluarga", isMandatory: true },
      { id: "REQ-26", name: "Foto Kondisi Rumah Tampak Depan & Dalam", isMandatory: true },
    ]
  },
  {
    id: "SRV-008",
    opd: "Dinas Pendidikan",
    name: "Izin Operasional Lembaga PAUD / TK",
    description: "Penerbitan izin resmi untuk penyelenggaraan pendidikan anak usia dini dan taman kanak-kanak.",
    estimatedDays: 10,
    category: "Pendidikan",
    requirements: [
      { id: "REQ-27", name: "Proposal Pendirian Lembaga", isMandatory: true },
      { id: "REQ-28", name: "Fotokopi Sertifikat Tanah / Surat Sewa Gedung", isMandatory: true },
      { id: "REQ-29", name: "Rekomendasi dari Pengawas TK/PAUD Kecamatan", isMandatory: true },
      { id: "REQ-30", name: "Data Tenaga Pendidik dan Kurikulum", isMandatory: true },
    ]
  },
  {
    id: "SRV-009",
    opd: "Dinas Perhubungan",
    name: "Izin Penyelenggaraan Parkir",
    description: "Pemberian izin pengelolaan fasilitas parkir di luar ruang milik jalan untuk badan usaha atau perorangan.",
    estimatedDays: 5,
    category: "Perizinan",
    requirements: [
      { id: "REQ-31", name: "Fotokopi KTP dan NPWP Penanggung Jawab", isMandatory: true },
      { id: "REQ-32", name: "Gambar Denah Lokasi dan Tata Letak Parkir", isMandatory: true },
      { id: "REQ-33", name: "Bukti Kepemilikan/Sewa Lahan", isMandatory: true },
    ]
  },
  {
    id: "SRV-010",
    opd: "Dinas Lingkungan Hidup",
    name: "Surat Pernyataan Kesanggupan Pengelolaan Lingkungan (SPPL)",
    description: "Dokumen komitmen kesanggupan penanggung jawab usaha atau kegiatan untuk mengelola dan memantau dampak lingkungan hidup.",
    estimatedDays: 4,
    category: "Lingkungan",
    requirements: [
      { id: "REQ-34", name: "Formulir Isian SPPL", isMandatory: true },
      { id: "REQ-35", name: "Fotokopi NIB (Nomor Induk Berusaha)", isMandatory: true },
      { id: "REQ-36", name: "Fotokopi KTP Pemrakarsa", isMandatory: true },
      { id: "REQ-37", name: "Foto Lokasi Usaha/Kegiatan", isMandatory: true },
    ]
  }
];

// Simulasi Data Database Pelacakan (Tracking)
export const mockTrackingData: Record<string, TrackingResult> = {
  "REG-2026-001": {
    ticketNumber: "REG-2026-001",
    serviceName: "Izin Usaha Mikro dan Kecil (IUMK)",
    applicant: "Muhammad Reza",
    date: "26 Oktober 2026",
    status: "Sedang Diproses",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "26 Okt 2026, 09:00", desc: "Berkas permohonan berhasil dikirim melalui portal.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "26 Okt 2026, 14:30", desc: "Berkas sedang diperiksa oleh petugas verifikator DPMPTSP.", status: "active" },
      { step: 3, title: "Persetujuan Pimpinan", date: "-", desc: "Menunggu otorisasi dan Tanda Tangan Elektronik (TTE).", status: "pending" },
      { step: 4, title: "Selesai", date: "-", desc: "Izin diterbitkan dan siap diunduh.", status: "pending" },
    ]
  },
  "REG-2026-002": {
    ticketNumber: "REG-2026-002",
    serviceName: "Pembuatan Akta Kelahiran Baru",
    applicant: "Budi Santoso",
    date: "24 Oktober 2026",
    status: "Selesai",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "24 Okt 2026, 10:15", desc: "Berkas permohonan berhasil dikirim melalui portal.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "24 Okt 2026, 13:00", desc: "Berkas telah diperiksa dan dinyatakan lengkap oleh Disdukcapil.", status: "completed" },
      { step: 3, title: "Persetujuan Pimpinan", date: "25 Okt 2026, 09:30", desc: "Tanda Tangan Elektronik (TTE) telah dibubuhkan oleh Kepala Dinas.", status: "completed" },
      { step: 4, title: "Selesai", date: "25 Okt 2026, 10:00", desc: "Akta Kelahiran elektronik (PDF) telah diterbitkan dan dikirim ke email pemohon.", status: "completed" },
    ]
  },
  "REG-2026-003": {
    ticketNumber: "REG-2026-003",
    serviceName: "Persetujuan Bangunan Gedung (PBG)",
    applicant: "PT. Maju Mundur Sejahtera",
    date: "20 Oktober 2026",
    status: "Perlu Perbaikan",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "20 Okt 2026, 11:20", desc: "Berkas permohonan berhasil dikirim melalui portal.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "21 Okt 2026, 15:45", desc: "Terdapat kekurangan dokumen pada Gambar Rencana Struktur. Silakan unggah ulang melalui tautan yang dikirim ke email.", status: "error" },
      { step: 3, title: "Persetujuan Pimpinan", date: "-", desc: "Menunggu otorisasi dan Tanda Tangan Elektronik (TTE).", status: "pending" },
      { step: 4, title: "Selesai", date: "-", desc: "Dokumen diterbitkan dan siap diunduh.", status: "pending" },
    ]
  },
  "REG-2026-004": {
    ticketNumber: "REG-2026-004",
    serviceName: "Izin Penyelenggaraan Parkir",
    applicant: "CV. Amanah Jaya",
    date: "25 Oktober 2026",
    status: "Menunggu TTE",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "25 Okt 2026, 08:10", desc: "Berkas permohonan berhasil dikirim melalui portal.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "26 Okt 2026, 10:00", desc: "Tim survei telah melakukan peninjauan lokasi. Berkas lengkap dan valid.", status: "completed" },
      { step: 3, title: "Persetujuan Pimpinan", date: "27 Okt 2026, 09:15", desc: "Berkas berada di meja Kepala Dinas menunggu pengesahan digital.", status: "active" },
      { step: 4, title: "Selesai", date: "-", desc: "Dokumen diterbitkan dan siap diunduh.", status: "pending" },
    ]
  },
  "REG-2026-005": {
    ticketNumber: "REG-2026-005",
    serviceName: "Pencetakan Ulang KTP Elektronik",
    applicant: "Anita Wijaya",
    date: "27 Oktober 2026",
    status: "Selesai",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "27 Okt 2026, 07:30", desc: "Berkas berhasil dikirim.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "27 Okt 2026, 08:45", desc: "Data kependudukan valid.", status: "completed" },
      { step: 3, title: "Pencetakan", date: "27 Okt 2026, 11:00", desc: "KTP Elektronik sedang dicetak.", status: "completed" },
      { step: 4, title: "Selesai", date: "27 Okt 2026, 14:00", desc: "KTP Elektronik siap diambil di Loket 3 Disdukcapil.", status: "completed" },
    ]
  }
};

export const mockNews = [
  {
    id: 1,
    type: "Pengumuman",
    title: "Peluncuran Portal Layanan Satu Pintu V2.0",
    date: "26 Oktober 2026",
    excerpt: "Pemerintah daerah resmi meluncurkan pembaruan portal layanan publik terintegrasi untuk mempercepat dan mempermudah pengurusan administrasi masyarakat secara serba digital.",
    color: "bg-red-50 text-cyber-red border-red-100"
  },
  {
    id: 2,
    type: "Berita",
    title: "Program Pemutihan Pajak Kendaraan Bermotor Akhir Tahun",
    date: "22 Oktober 2026",
    excerpt: "Kabar gembira bagi seluruh warga! Pemerintah kembali mengadakan program pemutihan denda pajak kendaraan bermotor yang berlaku hingga akhir November 2026.",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: 3,
    type: "Berita",
    title: "Perbaikan Infrastruktur Jalan Lintas Kecamatan Dimulai",
    date: "18 Oktober 2026",
    excerpt: "Proyek perbaikan jalan dan drainase di tiga kecamatan utama telah resmi dimulai hari ini. Pengguna jalan diimbau untuk menggunakan jalur alternatif.",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: 4,
    type: "Pengumuman",
    title: "Pendaftaran Beasiswa Daerah Mahasiswa Berprestasi 2026",
    date: "15 Oktober 2026",
    excerpt: "Dinas Pendidikan resmi membuka pendaftaran beasiswa penuh bagi mahasiswa berprestasi yang berdomisili di daerah. Pendaftaran ditutup tanggal 10 November 2026.",
    color: "bg-red-50 text-cyber-red border-red-100"
  },
  {
    id: 5,
    type: "Berita",
    title: "Pemerintah Daerah Raih Penghargaan Kota Layak Anak Tingkat Nasional",
    date: "12 Oktober 2026",
    excerpt: "Berkat komitmen bersama dalam pemenuhan hak anak, pemerintah daerah kembali menorehkan prestasi membanggakan dengan meraih penghargaan bergengsi tingkat nasional.",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: 6,
    type: "Berita",
    title: "Digitalisasi Pasar Tradisional: E-Retribusi Mulai Diterapkan",
    date: "10 Oktober 2026",
    excerpt: "Dalam rangka transparansi PAD, pemerintah daerah resmi memberlakukan pembayaran retribusi pasar secara elektronik menggunakan QRIS di 5 pasar induk.",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: 7,
    type: "Pengumuman",
    title: "Lowongan PPPK Tenaga Kesehatan dan Guru Tahap II",
    date: "05 Oktober 2026",
    excerpt: "Pemerintah daerah membuka seleksi penerimaan Pegawai Pemerintah dengan Perjanjian Kerja (PPPK) untuk formasi Guru dan Tenaga Kesehatan. Simak persyaratannya di sini.",
    color: "bg-red-50 text-cyber-red border-red-100"
  }
];

export const mockAgenda = [
  {
    id: 1,
    date: "28",
    month: "Okt",
    title: "Upacara Hari Sumpah Pemuda",
    time: "07:30 WITA - Selesai",
    location: "Lapangan Rujab Bupati"
  },
  {
    id: 2,
    date: "30",
    month: "Okt",
    title: "Rapat Paripurna DPRD",
    time: "09:00 WITA - 12:00 WITA",
    location: "Gedung Utama DPRD"
  },
  {
    id: 3,
    date: "02",
    month: "Nov",
    title: "Pembukaan Festival Budaya Daerah 2026",
    time: "15:00 WITA - Selesai",
    location: "Alun-Alun Kota"
  },
  {
    id: 4,
    date: "08",
    month: "Nov",
    title: "Senam Massal & Cek Kesehatan Gratis",
    time: "06:00 WITA - 09:00 WITA",
    location: "Taman Kota Kabupaten"
  },
  {
    id: 5,
    date: "12",
    month: "Nov",
    title: "Gelar Pasar Murah Tanggap Inflasi",
    time: "08:00 WITA - 14:00 WITA",
    location: "Pelataran Pasar Sentral"
  },
  {
    id: 6,
    date: "15",
    month: "Nov",
    title: "Bimbingan Teknis Digitalisasi ASN",
    time: "09:00 WITA - 16:00 WITA",
    location: "Aula Bappeda"
  },
  {
    id: 7,
    date: "18",
    month: "Nov",
    title: "Vaksinasi Rabies Gratis untuk Hewan Peliharaan",
    time: "08:00 WITA - 15:00 WITA",
    location: "Kantor Dinas Pertanian & Peternakan"
  },
  {
    id: 8,
    date: "22",
    month: "Nov",
    title: "Pameran Inovasi Pelayanan Publik",
    time: "10:00 WITA - 20:00 WITA",
    location: "Gedung Convention Center Daerah"
  }
];

// ==========================================
// DATA SIMULASI UNTUK DASHBOARD OPD
// ==========================================

export const opdDashboardStats = [
  { title: "Total Antrean", value: "128", trend: "+12%", trendUp: true, iconType: "file", color: "text-blue-500", bg: "bg-blue-50/50", border: "border-blue-100/50" },
  { title: "Perlu Verifikasi", value: "45", trend: "+5%", trendUp: true, iconType: "clock", color: "text-neon-orange", bg: "bg-orange-50/50", border: "border-orange-100/50" },
  { title: "Menunggu Revisi", value: "12", trend: "-2%", trendUp: false, iconType: "alert", color: "text-cyber-red", bg: "bg-red-50/50", border: "border-red-100/50" },
  { title: "Selesai Bulan Ini", value: "312", trend: "+24%", trendUp: true, iconType: "check", color: "text-emerald-500", bg: "bg-emerald-50/50", border: "border-emerald-100/50" },
];

export const opdChartData = [
  { day: "Sen", value: 45 }, { day: "Sel", value: 62 }, { day: "Rab", value: 38 },
  { day: "Kam", value: 85 }, { day: "Jum", value: 54 }, { day: "Sab", value: 20 }, { day: "Min", value: 15 }
];

export const opdTopServices = [
  { name: "Persetujuan Bangunan Gedung (PBG)", count: 145, percentage: 85, color: "from-blue-500 to-cyan-400" },
  { name: "Izin Usaha Mikro dan Kecil (IUMK)", count: 98, percentage: 65, color: "from-neon-orange to-amber-400" },
  { name: "Izin Praktik Tenaga Kesehatan", count: 76, percentage: 45, color: "from-cyber-red to-pink-500" },
  { name: "Surat Keterangan Catatan Kepolisian (Rekomendasi)", count: 52, percentage: 25, color: "from-purple-500 to-indigo-500" },
];

export const opdRecentActivities = [
  { id: "REG-2026-088", name: "Muhammad Reza", service: "Izin Usaha Mikro dan Kecil", time: "10 menit yang lalu", status: "Baru", sla: "2 Hari" },
  { id: "REG-2026-087", name: "Siti Aminah", service: "Pendaftaran Kartu Pencari Kerja", time: "45 menit yang lalu", status: "Baru", sla: "1 Hari" },
  { id: "REG-2026-086", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", time: "1 jam yang lalu", status: "Revisi", sla: "Kedaluwarsa" },
  { id: "REG-2026-085", name: "PT. Maju Mundur", service: "Persetujuan Bangunan Gedung", time: "2 jam yang lalu", status: "Terverifikasi", sla: "Selesai" },
  { id: "REG-2026-084", name: "Budi Santoso", service: "Pembuatan Akta Kelahiran", time: "3 jam yang lalu", status: "Terverifikasi", sla: "Selesai" },
  { id: "REG-2026-083", name: "Yayasan Insan Cendekia", service: "Izin Operasional Lembaga PAUD", time: "4 jam yang lalu", status: "Baru", sla: "4 Hari" },
  { id: "REG-2026-082", name: "CV. Sentosa Makmur", service: "Izin Penyelenggaraan Parkir", time: "5 jam yang lalu", status: "Diproses", sla: "2 Hari" },
  { id: "REG-2026-081", name: "Ahmad Jaelani", service: "Pendaftaran Data Terpadu (DTKS)", time: "6 jam yang lalu", status: "Revisi", sla: "Peringatan" },
];

export const opdQueueData = [
  { id: "REG-2026-088", name: "Muhammad Reza", service: "Izin Usaha Mikro dan Kecil", date: "27 Okt 2026", time: "08:15 WITA", status: "Baru", sla: "Aman" },
  { id: "REG-2026-087", name: "Siti Aminah", service: "Pendaftaran Kartu Pencari Kerja", date: "27 Okt 2026", time: "07:30 WITA", status: "Baru", sla: "Aman" },
  { id: "REG-2026-086", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", date: "26 Okt 2026", time: "15:45 WITA", status: "Revisi", sla: "Kedaluwarsa" },
  { id: "REG-2026-085", name: "PT. Maju Mundur", service: "Persetujuan Bangunan Gedung", date: "26 Okt 2026", time: "14:20 WITA", status: "Diproses", sla: "Peringatan" },
  { id: "REG-2026-084", name: "Budi Santoso", service: "Pembuatan Akta Kelahiran", date: "26 Okt 2026", time: "10:05 WITA", status: "Diproses", sla: "Aman" },
  { id: "REG-2026-083", name: "Andi Saputra", service: "Izin Usaha Mikro dan Kecil", date: "25 Okt 2026", time: "09:30 WITA", status: "Revisi", sla: "Kedaluwarsa" },
  { id: "REG-2026-082", name: "CV. Abadi Jaya", service: "Persetujuan Bangunan Gedung", date: "25 Okt 2026", time: "16:00 WITA", status: "Selesai", sla: "Aman" },
  { id: "REG-2026-081", name: "Rina Marlina", service: "Pendaftaran Data Terpadu (DTKS)", date: "24 Okt 2026", time: "11:15 WITA", status: "Selesai", sla: "Aman" },
  { id: "REG-2026-080", name: "PT. Sumber Pangan", service: "Surat Pernyataan Lingkungan (SPPL)", date: "24 Okt 2026", time: "09:00 WITA", status: "Baru", sla: "Aman" },
  { id: "REG-2026-079", name: "Toko Serba Ada", service: "Izin Usaha Mikro dan Kecil", date: "23 Okt 2026", time: "13:40 WITA", status: "Diproses", sla: "Aman" },
  { id: "REG-2026-078", name: "H. Abdullah", service: "Pencetakan Ulang KTP Elektronik", date: "23 Okt 2026", time: "10:20 WITA", status: "Revisi", sla: "Peringatan" },
  { id: "REG-2026-077", name: "Yayasan Amal Bakti", service: "Izin Operasional Lembaga PAUD", date: "22 Okt 2026", time: "14:15 WITA", status: "Baru", sla: "Aman" },
  { id: "REG-2026-076", name: "RSUD Harapan", service: "Izin Praktik Tenaga Kesehatan", date: "22 Okt 2026", time: "08:30 WITA", status: "Diproses", sla: "Kedaluwarsa" },
];

export const opdArchiveData = [
  { id: "REG-2026-012", name: "Budi Santoso", service: "Pembuatan Akta Kelahiran", completeDate: "20 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-011", name: "CV. Abadi Jaya", service: "Persetujuan Bangunan Gedung", completeDate: "19 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-010", name: "Siti Aminah", service: "Pendaftaran Kartu Pencari Kerja", completeDate: "18 Okt 2026", status: "Ditolak", verifier: "Petugas Loket 2" },
  { id: "REG-2026-009", name: "PT. Maju Mundur", service: "Izin Usaha Mikro dan Kecil", completeDate: "15 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-008", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", completeDate: "12 Okt 2026", status: "Dicabut", verifier: "Sistem (Otomatis)" },
  { id: "REG-2026-007", name: "Andi Saputra", service: "Izin Usaha Mikro dan Kecil", completeDate: "10 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-006", name: "Toko Plastik Jaya", service: "Izin Usaha Mikro dan Kecil", completeDate: "08 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-005", name: "Yayasan Bina Insani", service: "Izin Operasional Lembaga PAUD", completeDate: "05 Okt 2026", status: "Ditolak", verifier: "Tim Teknis Diknas" },
  { id: "REG-2026-004", name: "PT. Bangun Nusantara", service: "Persetujuan Bangunan Gedung", completeDate: "02 Okt 2026", status: "Selesai", verifier: "Kadin PUPR" },
  { id: "REG-2026-003", name: "Dr. Farah Dina", service: "Izin Praktik Tenaga Kesehatan", completeDate: "01 Okt 2026", status: "Selesai", verifier: "Dinkes Pusat" },
  { id: "REG-2026-002", name: "Koperasi Tani Makmur", service: "Surat Pernyataan Lingkungan (SPPL)", completeDate: "28 Sep 2026", status: "Selesai", verifier: "DLH Loket 1" },
  { id: "REG-2026-001", name: "Johan Setiawan", service: "Pencetakan Ulang KTP Elektronik", completeDate: "25 Sep 2026", status: "Selesai", verifier: "Disdukcapil Loket" },
];

// ==========================================
// DATA SIMULASI UNTUK DASHBOARD PIMPINAN
// ==========================================

export const pimpinanStats = [
  { title: "Menunggu TTE", value: "32", trend: "Prioritas", trendUp: false, iconType: "pen", color: "text-amber-500", bg: "bg-amber-50/50", border: "border-amber-100/50" },
  { title: "Disetujui Bulan Ini", value: "485", trend: "+18%", trendUp: true, iconType: "check", color: "text-emerald-500", bg: "bg-emerald-50/50", border: "border-emerald-100/50" },
  { title: "Rata-rata SLA", value: "1.1", unit: "Hari", trend: "Optimal", trendUp: true, iconType: "activity", color: "text-blue-500", bg: "bg-blue-50/50", border: "border-blue-100/50" },
  { title: "Indeks Kepuasan", value: "4.9", unit: "/5.0", trend: "Sangat Baik", trendUp: true, iconType: "star", color: "text-purple-500", bg: "bg-purple-50/50", border: "border-purple-100/50" },
];

export const pimpinanPerformanceData = [
  { month: "Mei", approved: 320, rejected: 12 },
  { month: "Jun", approved: 350, rejected: 18 },
  { month: "Jul", approved: 310, rejected: 9 },
  { month: "Ags", approved: 420, rejected: 22 },
  { month: "Sep", approved: 390, rejected: 15 },
  { month: "Okt", approved: 485, rejected: 10 },
];

export const pimpinanPendingTTE = [
  { id: "REG-2026-101", name: "PT. Maju Mundur", service: "Persetujuan Bangunan Gedung (PBG)", time: "1 Jam yang lalu", verifier: "Admin Utama", type: "Perusahaan" },
  { id: "REG-2026-102", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", time: "2 Jam yang lalu", verifier: "Verifikator Ahli", type: "Instansi" },
  { id: "REG-2026-103", name: "CV. Abadi Jaya", service: "Izin Usaha Mikro dan Kecil", time: "3 Jam yang lalu", verifier: "Admin Utama", type: "Perusahaan" },
  { id: "REG-2026-104", name: "Ahmad Dahlan", service: "Pembuatan Akta Kelahiran", time: "5 Jam yang lalu", verifier: "Petugas Loket 1", type: "Individu" },
  { id: "REG-2026-105", name: "Yayasan Peduli Anak", service: "Izin Operasional Lembaga PAUD", time: "6 Jam yang lalu", verifier: "Admin Utama", type: "Instansi" },
  { id: "REG-2026-106", name: "PT. Sumber Konstruksi", service: "Surat Pernyataan Lingkungan (SPPL)", time: "7 Jam yang lalu", verifier: "Verifikator DLH", type: "Perusahaan" },
  { id: "REG-2026-107", name: "Dr. Indra Setiawan", service: "Izin Praktik Tenaga Kesehatan", time: "Hari ini, 08:30", verifier: "Dinkes Admin", type: "Individu" },
  { id: "REG-2026-108", name: "Koperasi Unit Desa Makmur", service: "Izin Usaha Mikro dan Kecil", time: "Hari ini, 07:15", verifier: "Admin Utama", type: "Instansi" },
  { id: "REG-2026-109", name: "Rizky Ramadhan", service: "Pendaftaran Kartu Pencari Kerja", time: "Kemarin, 16:45", verifier: "Disnaker Loket", type: "Individu" },
  { id: "REG-2026-110", name: "PT. Logistik Terpadu", service: "Izin Penyelenggaraan Parkir", time: "Kemarin, 14:20", verifier: "Dishub Verifikator", type: "Perusahaan" }
];