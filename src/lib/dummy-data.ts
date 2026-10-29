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

// ==========================================
// DATA LAYANAN (DIPERLUAS KE 15 LAYANAN)
// ==========================================
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
    description: "Pendaftaran bagi warga kurang mampu untuk masuk ke dalam database DTKS guna mendapatkan program bantuan sosial dari pemerintah.",
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
  },
  // --- LAYANAN TAMBAHAN BARU ---
  {
    id: "SRV-011",
    opd: "Badan Pendapatan Daerah",
    name: "Izin Penyelenggaraan Reklame",
    description: "Pemberian izin untuk pemasangan reklame komersial maupun non-komersial di ruang publik untuk menjamin ketertiban dan estetika kota.",
    estimatedDays: 6,
    category: "Perizinan",
    requirements: [
      { id: "REQ-38", name: "Desain Visual Reklame", isMandatory: true },
      { id: "REQ-39", name: "Surat Izin Pemilik Titik Lokasi/Lahan", isMandatory: true },
      { id: "REQ-40", name: "Fotokopi KTP Pemohon", isMandatory: true },
    ]
  },
  {
    id: "SRV-012",
    opd: "Dinas Kependudukan dan Pencatatan Sipil",
    name: "Surat Keterangan Pindah WNI (SKPWNI)",
    description: "Dokumen resmi perpindahan domisili warga negara dari satu kabupaten/kota ke kabupaten/kota atau provinsi lain.",
    estimatedDays: 1,
    category: "Kependudukan",
    requirements: [
      { id: "REQ-41", name: "Kartu Keluarga (KK) Asli", isMandatory: true },
      { id: "REQ-42", name: "KTP Elektronik Asli", isMandatory: true },
      { id: "REQ-43", name: "Formulir F-1.03 (Surat Pindah)", isMandatory: true },
    ]
  },
  {
    id: "SRV-013",
    opd: "Dinas Kesehatan",
    name: "Izin Mendirikan Klinik Pratama",
    description: "Izin operasional bagi badan usaha maupun perorangan untuk mendirikan fasilitas pelayanan kesehatan tingkat pertama.",
    estimatedDays: 12,
    category: "Kesehatan",
    requirements: [
      { id: "REQ-44", name: "Profil Klinik & Struktur Organisasi", isMandatory: true },
      { id: "REQ-45", name: "Daftar Tenaga Medis (SIP Dokter & Perawat)", isMandatory: true },
      { id: "REQ-46", name: "MoU Limbah Medis B3", isMandatory: true },
    ]
  },
  {
    id: "SRV-014",
    opd: "Dinas Pariwisata, Pemuda dan Olahraga",
    name: "Tanda Daftar Usaha Pariwisata (TDUP)",
    description: "Perizinan wajib bagi pelaku usaha di sektor pariwisata, seperti hotel, restoran, agen perjalanan, dan tempat hiburan.",
    estimatedDays: 8,
    category: "Perizinan",
    requirements: [
      { id: "REQ-47", name: "Akte Pendirian Perusahaan (Jika Berbadan Hukum)", isMandatory: true },
      { id: "REQ-48", name: "Izin Mendirikan Bangunan (IMB/PBG) Peruntukan Usaha", isMandatory: true },
      { id: "REQ-49", name: "SPPL / Dokumen Lingkungan Hidup", isMandatory: true },
    ]
  },
  {
    id: "SRV-015",
    opd: "Dinas Pertanian dan Ketahanan Pangan",
    name: "Surat Keterangan Kesehatan Hewan (SKKH)",
    description: "Sertifikasi kesehatan hewan peliharaan atau ternak yang akan dilalulintaskan ke luar wilayah atau untuk keperluan ekspor/potong.",
    estimatedDays: 1,
    category: "Pertanian",
    requirements: [
      { id: "REQ-50", name: "Hewan Harus Dihadirkan untuk Diperiksa", isMandatory: true },
      { id: "REQ-51", name: "Buku Vaksin (Jika Ada)", isMandatory: false },
      { id: "REQ-52", name: "Fotokopi KTP Pemilik", isMandatory: true },
    ]
  }
];

// ==========================================
// DATA PELACAKAN (DIPERLUAS 10 TIKET)
// ==========================================
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
  },
  "REG-2026-006": {
    ticketNumber: "REG-2026-006",
    serviceName: "Surat Keterangan Pindah WNI (SKPWNI)",
    applicant: "Andi Saputra",
    date: "28 Oktober 2026",
    status: "Ditolak",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "28 Okt 2026, 10:00", desc: "Berkas masuk ke sistem.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "28 Okt 2026, 11:30", desc: "Pengajuan ditolak. NIK pemohon berstatus ganda di database pusat. Silakan datang ke kantor Disdukcapil.", status: "error" },
      { step: 3, title: "Persetujuan Pimpinan", date: "-", desc: "-", status: "pending" },
      { step: 4, title: "Selesai", date: "-", desc: "-", status: "pending" },
    ]
  },
  "REG-2026-007": {
    ticketNumber: "REG-2026-007",
    serviceName: "Izin Penyelenggaraan Reklame",
    applicant: "PT. Promosi Gemilang",
    date: "27 Oktober 2026",
    status: "Sedang Diproses",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "27 Okt 2026, 13:20", desc: "Permohonan pemasangan billboard masuk.", status: "completed" },
      { step: 2, title: "Tinjau Lokasi", date: "28 Okt 2026, 09:00", desc: "Tim Bapenda sedang melakukan pengukuran dan verifikasi titik koordinat reklame.", status: "active" },
      { step: 3, title: "Persetujuan Pimpinan", date: "-", desc: "Menunggu penetapan tarif pajak & retribusi.", status: "pending" },
      { step: 4, title: "Selesai", date: "-", desc: "Izin dan SKRD diterbitkan.", status: "pending" },
    ]
  },
  "REG-2026-008": {
    ticketNumber: "REG-2026-008",
    serviceName: "Surat Keterangan Kesehatan Hewan (SKKH)",
    applicant: "H. Daeng Parani",
    date: "29 Oktober 2026",
    status: "Sedang Diproses",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "29 Okt 2026, 07:45", desc: "Data pengiriman 50 ekor sapi potong diterima.", status: "completed" },
      { step: 2, title: "Pemeriksaan Fisik", date: "29 Okt 2026, 10:15", desc: "Dokter Hewan Dinas sedang memeriksa sampel darah dan fisik ternak di Karantina.", status: "active" },
      { step: 3, title: "Penerbitan SKKH", date: "-", desc: "Menunggu TTE Dokter Hewan Berwenang.", status: "pending" },
    ]
  },
  "REG-2026-009": {
    ticketNumber: "REG-2026-009",
    serviceName: "Izin Operasional Lembaga PAUD / TK",
    applicant: "Yayasan Cerdas Bangsa",
    date: "15 Oktober 2026",
    status: "Menunggu TTE",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "15 Okt 2026, 09:00", desc: "Proposal masuk.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "17 Okt 2026, 14:00", desc: "Berkas lengkap.", status: "completed" },
      { step: 3, title: "Visitasi Lapangan", date: "22 Okt 2026, 10:00", desc: "Tim Dinas Pendidikan telah memverifikasi kelayakan gedung dan tenaga pengajar.", status: "completed" },
      { step: 4, title: "Persetujuan Pimpinan", date: "29 Okt 2026, 08:30", desc: "Rekomendasi teknis telah keluar, menunggu TTE Kepala Dinas.", status: "active" },
    ]
  },
  "REG-2026-010": {
    ticketNumber: "REG-2026-010",
    serviceName: "Tanda Daftar Usaha Pariwisata (TDUP)",
    applicant: "Grand Banua Hotel",
    date: "22 Oktober 2026",
    status: "Perlu Perbaikan",
    timeline: [
      { step: 1, title: "Pengajuan Diterima", date: "22 Okt 2026, 11:15", desc: "Formulir pendaftaran TDUP diterima.", status: "completed" },
      { step: 2, title: "Verifikasi Berkas", date: "25 Okt 2026, 09:45", desc: "Dokumen Persetujuan Lingkungan (SPPL) yang dilampirkan sudah kedaluwarsa. Harap perbarui dokumen di KLHK.", status: "error" },
      { step: 3, title: "Persetujuan Pimpinan", date: "-", desc: "-", status: "pending" },
      { step: 4, title: "Selesai", date: "-", desc: "-", status: "pending" },
    ]
  },
};

// ==========================================
// DATA BERITA (DIPERLUAS 12 ITEM)
// ==========================================
export const mockNews = [
  { id: 1, type: "Pengumuman", title: "Peluncuran Portal Layanan Satu Pintu V2.0", date: "26 Oktober 2026", excerpt: "Pemerintah daerah resmi meluncurkan pembaruan portal layanan publik terintegrasi untuk mempercepat dan mempermudah pengurusan administrasi masyarakat secara serba digital.", color: "bg-red-50 text-cyber-red border-red-100" },
  { id: 2, type: "Berita", title: "Program Pemutihan Pajak Kendaraan Bermotor Akhir Tahun", date: "22 Oktober 2026", excerpt: "Kabar gembira bagi seluruh warga! Pemerintah kembali mengadakan program pemutihan denda pajak kendaraan bermotor yang berlaku hingga akhir November 2026.", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: 3, type: "Berita", title: "Perbaikan Infrastruktur Jalan Lintas Kecamatan Dimulai", date: "18 Oktober 2026", excerpt: "Proyek perbaikan jalan dan drainase di tiga kecamatan utama telah resmi dimulai hari ini. Pengguna jalan diimbau untuk menggunakan jalur alternatif.", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: 4, type: "Pengumuman", title: "Pendaftaran Beasiswa Daerah Mahasiswa Berprestasi 2026", date: "15 Oktober 2026", excerpt: "Dinas Pendidikan resmi membuka pendaftaran beasiswa penuh bagi mahasiswa berprestasi yang berdomisili di daerah. Pendaftaran ditutup tanggal 10 November 2026.", color: "bg-red-50 text-cyber-red border-red-100" },
  { id: 5, type: "Berita", title: "Pemerintah Daerah Raih Penghargaan Kota Layak Anak", date: "12 Oktober 2026", excerpt: "Berkat komitmen bersama dalam pemenuhan hak anak, pemerintah daerah kembali menorehkan prestasi membanggakan dengan meraih penghargaan bergengsi tingkat nasional.", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: 6, type: "Berita", title: "Digitalisasi Pasar Tradisional: E-Retribusi Mulai Diterapkan", date: "10 Oktober 2026", excerpt: "Dalam rangka transparansi PAD, pemerintah daerah resmi memberlakukan pembayaran retribusi pasar secara elektronik menggunakan QRIS di 5 pasar induk.", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: 7, type: "Pengumuman", title: "Lowongan PPPK Tenaga Kesehatan dan Guru Tahap II", date: "05 Oktober 2026", excerpt: "Pemerintah daerah membuka seleksi penerimaan Pegawai Pemerintah dengan Perjanjian Kerja (PPPK) untuk formasi Guru dan Tenaga Kesehatan. Simak persyaratannya di sini.", color: "bg-red-50 text-cyber-red border-red-100" },
  { id: 8, type: "Peringatan", title: "Waspada Cuaca Ekstrim & Potensi Banjir Genangan", date: "02 Oktober 2026", excerpt: "BMKG mengeluarkan peringatan dini curah hujan tinggi untuk 3 hari ke depan. Warga di bantaran sungai diimbau waspada dan menyiapkan langkah mitigasi.", color: "bg-orange-50 text-orange-600 border-orange-100" },
  { id: 9, type: "Berita", title: "Kunjungan Kerja Menteri Pendayagunaan Aparatur Negara", date: "28 September 2026", excerpt: "Menpan RB melakukan sidak dan peninjauan langsung ke Mal Pelayanan Publik (MPP) untuk memastikan implementasi digitalisasi layanan berjalan optimal.", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: 10, type: "Pengumuman", title: "Jadwal Pemadaman Listrik Bergilir Terkait Perawatan Gardu Induk", date: "25 September 2026", excerpt: "PLN area setempat akan melakukan pemeliharaan jaringan pada akhir pekan ini. Cek jadwal dan wilayah terdampak pada tautan berikut.", color: "bg-orange-50 text-orange-600 border-orange-100" },
  { id: 11, type: "Berita", title: "Panen Raya Padi Nusantara, Ketahanan Pangan Daerah Aman", date: "20 September 2026", excerpt: "Bupati memimpin langsung seremoni panen raya di lahan seluas 500 hektar. Surplus beras tahun ini dipastikan mampu menyokong cadangan logistik nasional.", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: 12, type: "Sosialisasi", title: "Aturan Baru Pembuatan NIB Melalui OSS RBA", date: "15 September 2026", excerpt: "DPMPTSP mengadakan bimbingan teknis virtual bagi ratusan UMKM untuk mempermudah migrasi izin usaha lama ke sistem OSS Risk-Based Approach (RBA).", color: "bg-purple-50 text-purple-600 border-purple-100" },
];

// ==========================================
// DATA AGENDA (DIPERLUAS 15 ITEM)
// ==========================================
export const mockAgenda = [
  { id: 1, date: "28", month: "Okt", title: "Upacara Hari Sumpah Pemuda", time: "07:30 WITA - Selesai", location: "Lapangan Rujab Bupati" },
  { id: 2, date: "30", month: "Okt", title: "Rapat Paripurna Penetapan APBD 2027", time: "09:00 WITA - 12:00 WITA", location: "Gedung Utama DPRD" },
  { id: 3, date: "02", month: "Nov", title: "Pembukaan Festival Budaya Daerah 2026", time: "15:00 WITA - Selesai", location: "Alun-Alun Kota" },
  { id: 4, date: "05", month: "Nov", title: "Pelantikan Pejabat Eselon III dan IV", time: "09:00 WITA - 11:30 WITA", location: "Aula Kantor Bupati" },
  { id: 5, date: "08", month: "Nov", title: "Senam Massal & Cek Kesehatan Gratis", time: "06:00 WITA - 09:00 WITA", location: "Taman Kota Kabupaten" },
  { id: 6, date: "10", month: "Nov", title: "Upacara Hari Pahlawan Nasional", time: "08:00 WITA - Selesai", location: "Taman Makam Pahlawan" },
  { id: 7, date: "12", month: "Nov", title: "Gelar Pasar Murah Tanggap Inflasi", time: "08:00 WITA - 14:00 WITA", location: "Pelataran Pasar Sentral" },
  { id: 8, date: "15", month: "Nov", title: "Bimbingan Teknis Keamanan Siber ASN", time: "09:00 WITA - 16:00 WITA", location: "Aula Dinas Kominfo" },
  { id: 9, date: "18", month: "Nov", title: "Vaksinasi Rabies Gratis untuk Hewan Peliharaan", time: "08:00 WITA - 15:00 WITA", location: "Kantor Dinas Pertanian & Peternakan" },
  { id: 10, date: "22", month: "Nov", title: "Pameran Inovasi Pelayanan Publik", time: "10:00 WITA - 20:00 WITA", location: "Gedung Convention Center Daerah" },
  { id: 11, date: "25", month: "Nov", title: "Peringatan Hari Guru Nasional", time: "07:30 WITA - 11:00 WITA", location: "Stadion Utama Daerah" },
  { id: 12, date: "28", month: "Nov", title: "Rapat Koordinasi Forkopimda Jelang Pilkada", time: "13:00 WITA - 16:00 WITA", location: "Ruang Pola Kantor Bupati" },
  { id: 13, date: "01", month: "Des", title: "Apel Siaga Bencana Alam", time: "08:00 WITA - Selesai", location: "Halaman Mako BPBD" },
  { id: 14, date: "05", month: "Des", title: "Penyerahan Bantuan Traktor Kelompok Tani", time: "10:00 WITA - 12:00 WITA", location: "Desa Agropolitan" },
  { id: 15, date: "12", month: "Des", title: "Malam Penganugerahan Warga Berprestasi 2026", time: "19:00 WITA - 22:30 WITA", location: "Ballroom Hotel Grand Pusat" },
];

// ==========================================
// DATA DASHBOARD OPD
// ==========================================
export const opdDashboardStats = [
  { title: "Total Antrean", value: "342", trend: "+15%", trendUp: true, iconType: "file", color: "text-blue-500", bg: "bg-blue-50/50", border: "border-blue-100/50" },
  { title: "Perlu Verifikasi", value: "87", trend: "+8%", trendUp: true, iconType: "clock", color: "text-neon-orange", bg: "bg-orange-50/50", border: "border-orange-100/50" },
  { title: "Menunggu Revisi", value: "34", trend: "-5%", trendUp: false, iconType: "alert", color: "text-cyber-red", bg: "bg-red-50/50", border: "border-red-100/50" },
  { title: "Selesai Bulan Ini", value: "1,204", trend: "+32%", trendUp: true, iconType: "check", color: "text-emerald-500", bg: "bg-emerald-50/50", border: "border-emerald-100/50" },
];

export const opdChartData = [
  { day: "Sen", value: 145 }, { day: "Sel", value: 162 }, { day: "Rab", value: 138 },
  { day: "Kam", value: 185 }, { day: "Jum", value: 154 }, { day: "Sab", value: 45 }, { day: "Min", value: 25 }
];

export const opdTopServices = [
  { name: "Izin Usaha Mikro dan Kecil (IUMK)", count: 420, percentage: 85, color: "from-blue-500 to-cyan-400" },
  { name: "Pencetakan Ulang KTP Elektronik", count: 350, percentage: 70, color: "from-neon-orange to-amber-400" },
  { name: "Pembuatan Akta Kelahiran Baru", count: 280, percentage: 56, color: "from-emerald-400 to-green-500" },
  { name: "Persetujuan Bangunan Gedung (PBG)", count: 195, percentage: 39, color: "from-purple-500 to-indigo-500" },
  { name: "Izin Praktik Tenaga Kesehatan", count: 145, percentage: 29, color: "from-cyber-red to-pink-500" },
];

export const opdRecentActivities = [
  { id: "REG-2026-115", name: "Muhammad Reza", service: "Izin Usaha Mikro dan Kecil", time: "2 menit yang lalu", status: "Baru", sla: "3 Hari" },
  { id: "REG-2026-114", name: "PT. Maju Bersama", service: "Izin Penyelenggaraan Reklame", time: "15 menit yang lalu", status: "Terverifikasi", sla: "Selesai" },
  { id: "REG-2026-113", name: "Siti Aminah", service: "Pendaftaran Kartu Pencari Kerja", time: "45 menit yang lalu", status: "Baru", sla: "1 Hari" },
  { id: "REG-2026-112", name: "Klinik Sehat Hati", service: "Izin Klinik Pratama", time: "1 jam yang lalu", status: "Revisi", sla: "Kedaluwarsa" },
  { id: "REG-2026-111", name: "Budi Santoso", service: "Pembuatan Akta Kelahiran", time: "2 jam yang lalu", status: "Terverifikasi", sla: "Selesai" },
  { id: "REG-2026-110", name: "Hotel Banua Raya", service: "Tanda Daftar Usaha Pariwisata", time: "3 jam yang lalu", status: "Diproses", sla: "2 Hari" },
  { id: "REG-2026-109", name: "Yayasan Insan Cendekia", service: "Izin Operasional Lembaga PAUD", time: "4 jam yang lalu", status: "Baru", sla: "4 Hari" },
  { id: "REG-2026-108", name: "H. Abdullah", service: "Surat Keterangan Kesehatan Hewan", time: "5 jam yang lalu", status: "Diproses", sla: "1 Hari" },
  { id: "REG-2026-107", name: "Ahmad Jaelani", service: "Pendaftaran Data Terpadu (DTKS)", time: "6 jam yang lalu", status: "Revisi", sla: "Peringatan" },
  { id: "REG-2026-106", name: "CV. Sentosa Makmur", service: "Izin Penyelenggaraan Parkir", time: "7 jam yang lalu", status: "Terverifikasi", sla: "Selesai" },
  { id: "REG-2026-105", name: "Rina Marlina", service: "Surat Keterangan Pindah WNI", time: "8 jam yang lalu", status: "Ditolak", sla: "Selesai" },
  { id: "REG-2026-104", name: "PT. Sumber Pangan", service: "Surat Pernyataan Lingkungan (SPPL)", time: "10 jam yang lalu", status: "Diproses", sla: "Peringatan" },
];

export const opdQueueData = [
  { id: "REG-2026-115", name: "Muhammad Reza", service: "Izin Usaha Mikro dan Kecil", date: "29 Okt 2026", time: "08:15 WITA", status: "Baru", sla: "Aman" },
  { id: "REG-2026-114", name: "PT. Maju Bersama", service: "Izin Penyelenggaraan Reklame", date: "29 Okt 2026", time: "07:30 WITA", status: "Diproses", sla: "Aman" },
  { id: "REG-2026-113", name: "Andi Mappanyukki", service: "Persetujuan Bangunan Gedung", date: "28 Okt 2026", time: "15:45 WITA", status: "Revisi", sla: "Kedaluwarsa" },
  { id: "REG-2026-112", name: "Klinik Sejahtera Bersama", service: "Izin Praktik Tenaga Kesehatan", date: "28 Okt 2026", time: "14:20 WITA", status: "Diproses", sla: "Peringatan" },
  { id: "REG-2026-111", name: "Budi Santoso", service: "Pembuatan Akta Kelahiran", date: "28 Okt 2026", time: "10:05 WITA", status: "Diproses", sla: "Aman" },
  { id: "REG-2026-110", name: "Anita Wijaya", service: "Pencetakan Ulang KTP Elektronik", date: "27 Okt 2026", time: "09:30 WITA", status: "Baru", sla: "Kedaluwarsa" },
  { id: "REG-2026-109", name: "CV. Abadi Jaya", service: "Persetujuan Bangunan Gedung", date: "27 Okt 2026", time: "16:00 WITA", status: "Selesai", sla: "Aman" },
  { id: "REG-2026-108", name: "Rina Marlina", service: "Pendaftaran Data Terpadu (DTKS)", date: "26 Okt 2026", time: "11:15 WITA", status: "Selesai", sla: "Aman" },
  { id: "REG-2026-107", name: "Toko Serba Ada", service: "Izin Usaha Mikro dan Kecil", date: "26 Okt 2026", time: "09:00 WITA", status: "Baru", sla: "Aman" },
  { id: "REG-2026-106", name: "Koperasi Unit Desa", service: "Izin Usaha Mikro dan Kecil", date: "25 Okt 2026", time: "13:40 WITA", status: "Diproses", sla: "Aman" },
  { id: "REG-2026-105", name: "Daeng Parani", service: "Surat Keterangan Kesehatan Hewan", date: "25 Okt 2026", time: "10:20 WITA", status: "Revisi", sla: "Peringatan" },
  { id: "REG-2026-104", name: "Yayasan Amal Bakti", service: "Izin Operasional Lembaga PAUD", date: "24 Okt 2026", time: "14:15 WITA", status: "Baru", sla: "Aman" },
  { id: "REG-2026-103", name: "RSUD Harapan Kita", service: "Izin Praktik Tenaga Kesehatan", date: "23 Okt 2026", time: "08:30 WITA", status: "Diproses", sla: "Kedaluwarsa" },
  { id: "REG-2026-102", name: "Andi Saputra", service: "Surat Keterangan Pindah WNI", date: "22 Okt 2026", time: "11:00 WITA", status: "Baru", sla: "Peringatan" },
  { id: "REG-2026-101", name: "Ahmad Dahlan", service: "Pendaftaran Kartu Pencari Kerja", date: "22 Okt 2026", time: "09:15 WITA", status: "Diproses", sla: "Aman" },
];

export const opdArchiveData = [
  { id: "REG-2026-030", name: "Johan Setiawan", service: "Pencetakan Ulang KTP Elektronik", completeDate: "25 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-029", name: "PT. Promosi Gemilang", service: "Izin Penyelenggaraan Reklame", completeDate: "24 Okt 2026", status: "Selesai", verifier: "Bapenda Pusat" },
  { id: "REG-2026-028", name: "Siti Aminah", service: "Pendaftaran Kartu Pencari Kerja", completeDate: "23 Okt 2026", status: "Ditolak", verifier: "Petugas Loket 2" },
  { id: "REG-2026-027", name: "CV. Abadi Jaya", service: "Persetujuan Bangunan Gedung", completeDate: "22 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-026", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", completeDate: "20 Okt 2026", status: "Dicabut", verifier: "Sistem (Otomatis)" },
  { id: "REG-2026-025", name: "Andi Mappanyukki", service: "Izin Usaha Mikro dan Kecil", completeDate: "18 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-024", name: "Toko Plastik Jaya", service: "Izin Usaha Mikro dan Kecil", completeDate: "16 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-023", name: "Yayasan Bina Insani", service: "Izin Operasional Lembaga PAUD", completeDate: "15 Okt 2026", status: "Ditolak", verifier: "Tim Teknis Diknas" },
  { id: "REG-2026-022", name: "PT. Bangun Nusantara", service: "Persetujuan Bangunan Gedung", completeDate: "14 Okt 2026", status: "Selesai", verifier: "Kadin PUPR" },
  { id: "REG-2026-021", name: "Dr. Farah Dina", service: "Izin Praktik Tenaga Kesehatan", completeDate: "12 Okt 2026", status: "Selesai", verifier: "Dinkes Pusat" },
  { id: "REG-2026-020", name: "Koperasi Tani Makmur", service: "Surat Pernyataan Lingkungan (SPPL)", completeDate: "10 Okt 2026", status: "Selesai", verifier: "DLH Loket 1" },
  { id: "REG-2026-019", name: "H. Daeng Parani", service: "Surat Keterangan Kesehatan Hewan", completeDate: "08 Okt 2026", status: "Selesai", verifier: "Dispet Karantina" },
  { id: "REG-2026-018", name: "Budi Santoso", service: "Pembuatan Akta Kelahiran", completeDate: "05 Okt 2026", status: "Selesai", verifier: "Admin Utama" },
  { id: "REG-2026-017", name: "Hotel Banua Raya", service: "Tanda Daftar Usaha Pariwisata", completeDate: "02 Okt 2026", status: "Ditolak", verifier: "Dispar Verifikator" },
  { id: "REG-2026-016", name: "PT. Sumber Pangan", service: "Izin Usaha Mikro dan Kecil", completeDate: "28 Sep 2026", status: "Selesai", verifier: "Admin Utama" },
];

// ==========================================
// DATA DASHBOARD PIMPINAN
// ==========================================
export const pimpinanStats = [
  { title: "Menunggu TTE", value: "48", trend: "Prioritas", trendUp: false, iconType: "pen", color: "text-amber-500", bg: "bg-amber-50/50", border: "border-amber-100/50" },
  { title: "Disetujui Bulan Ini", value: "1,180", trend: "+22%", trendUp: true, iconType: "check", color: "text-emerald-500", bg: "bg-emerald-50/50", border: "border-emerald-100/50" },
  { title: "Rata-rata SLA", value: "1.2", unit: "Hari", trend: "Optimal", trendUp: true, iconType: "activity", color: "text-blue-500", bg: "bg-blue-50/50", border: "border-blue-100/50" },
  { title: "Indeks Kepuasan", value: "4.8", unit: "/5.0", trend: "Sangat Baik", trendUp: true, iconType: "star", color: "text-purple-500", bg: "bg-purple-50/50", border: "border-purple-100/50" },
];

export const pimpinanPerformanceData = [
  { month: "Mei", approved: 720, rejected: 42 },
  { month: "Jun", approved: 850, rejected: 38 },
  { month: "Jul", approved: 810, rejected: 29 },
  { month: "Ags", approved: 1020, rejected: 52 },
  { month: "Sep", approved: 990, rejected: 45 },
  { month: "Okt", approved: 1180, rejected: 30 },
];

// Diperluas menjadi 20 item untuk simulasi TTE Massal yang panjang
export const pimpinanPendingTTE = [
  { id: "REG-2026-201", name: "PT. Maju Mundur", service: "Persetujuan Bangunan Gedung (PBG)", time: "15 Menit yang lalu", verifier: "Admin Utama", type: "Perusahaan" },
  { id: "REG-2026-202", name: "Klinik Sehat Bersama", service: "Izin Praktik Tenaga Kesehatan", time: "30 Menit yang lalu", verifier: "Verifikator Ahli", type: "Instansi" },
  { id: "REG-2026-203", name: "CV. Abadi Jaya", service: "Izin Usaha Mikro dan Kecil", time: "1 Jam yang lalu", verifier: "Admin Utama", type: "Perusahaan" },
  { id: "REG-2026-204", name: "Muhammad Reza", service: "Izin Usaha Mikro dan Kecil", time: "2 Jam yang lalu", verifier: "Petugas Loket 1", type: "Individu" },
  { id: "REG-2026-205", name: "Yayasan Peduli Anak", service: "Izin Operasional Lembaga PAUD", time: "2.5 Jam yang lalu", verifier: "Admin Utama", type: "Instansi" },
  { id: "REG-2026-206", name: "PT. Sumber Konstruksi", service: "Surat Pernyataan Lingkungan (SPPL)", time: "3 Jam yang lalu", verifier: "Verifikator DLH", type: "Perusahaan" },
  { id: "REG-2026-207", name: "Dr. Indra Setiawan", service: "Izin Praktik Tenaga Kesehatan", time: "Hari ini, 11:30", verifier: "Dinkes Admin", type: "Individu" },
  { id: "REG-2026-208", name: "Koperasi Unit Desa Makmur", service: "Izin Usaha Mikro dan Kecil", time: "Hari ini, 10:15", verifier: "Admin Utama", type: "Instansi" },
  { id: "REG-2026-209", name: "Rizky Ramadhan", service: "Pendaftaran Kartu Pencari Kerja", time: "Hari ini, 09:45", verifier: "Disnaker Loket", type: "Individu" },
  { id: "REG-2026-210", name: "PT. Logistik Terpadu", service: "Izin Penyelenggaraan Parkir", time: "Hari ini, 09:20", verifier: "Dishub Verifikator", type: "Perusahaan" },
  { id: "REG-2026-211", name: "Andi Saputra", service: "Surat Keterangan Pindah WNI", time: "Kemarin, 16:40", verifier: "Kadis Dukcapil", type: "Individu" },
  { id: "REG-2026-212", name: "CV. Promosi Cemerlang", service: "Izin Penyelenggaraan Reklame", time: "Kemarin, 15:10", verifier: "Bapenda Analis", type: "Perusahaan" },
  { id: "REG-2026-213", name: "H. Daeng Parani", service: "Surat Keterangan Kesehatan Hewan", time: "Kemarin, 14:30", verifier: "Dokter Hewan Dinas", type: "Individu" },
  { id: "REG-2026-214", name: "Hotel Grand Banua", service: "Tanda Daftar Usaha Pariwisata", time: "Kemarin, 13:15", verifier: "Dispar Verifikator", type: "Perusahaan" },
  { id: "REG-2026-215", name: "Siti Aminah", service: "Pembuatan Akta Kelahiran Baru", time: "Kemarin, 11:00", verifier: "Admin Dukcapil", type: "Individu" },
  { id: "REG-2026-216", name: "Klinik Mata Nusantara", service: "Izin Mendirikan Klinik Pratama", time: "Kemarin, 10:45", verifier: "Dinkes Perizinan", type: "Instansi" },
  { id: "REG-2026-217", name: "Toko Sembako Murah", service: "Izin Usaha Mikro dan Kecil", time: "Kemarin, 09:30", verifier: "Admin Utama", type: "Individu" },
  { id: "REG-2026-218", name: "PT. Tambang Sejahtera", service: "Surat Pernyataan Lingkungan (SPPL)", time: "2 Hari lalu, 15:20", verifier: "Verifikator DLH", type: "Perusahaan" },
  { id: "REG-2026-219", name: "Yayasan Bina Insani", service: "Izin Operasional Lembaga PAUD", time: "2 Hari lalu, 14:10", verifier: "Diknas Teknis", type: "Instansi" },
  { id: "REG-2026-220", name: "Ahmad Dahlan", service: "Pencetakan Ulang KTP Elektronik", time: "2 Hari lalu, 10:05", verifier: "Dukcapil Loket 3", type: "Individu" },
];