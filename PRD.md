# Product Requirements Document (PRD): Template Portal Satu Pintu Pemerintahan

## 1. Visi dan Tujuan Produk

Membangun ekosistem platform digital berbasis *template* yang terukur, modular, dan berperforma tinggi untuk mengonsolidasikan seluruh layanan publik, informasi pemerintahan, dan proses administrasi ke dalam satu pintu. Portal ini bertujuan untuk mempermudah masyarakat mengakses layanan, sekaligus merapikan tata kelola data, integrasi sistem, dan pemantauan kinerja di lingkup internal pemerintahan dengan antarmuka yang sangat modern dan futuristik.

## 2. Definisi Peran Pengguna (User Roles)

Sistem ini menggunakan *Role-Based Access Control* (RBAC) dengan tiga persona utama:

* **Masyarakat (Publik & Pemohon):** Pengguna eksternal yang menggunakan portal untuk mencari informasi pemerintahan, melihat katalog syarat layanan, mengajukan permohonan layanan publik, melacak status pengajuan, dan menyampaikan pengaduan atau aspirasi.

* **OPD (Organisasi Perangkat Daerah):** Pengguna internal (pegawai dinas, operator, verifikator, dan administrator IT) yang bertugas memverifikasi kelengkapan berkas pemohon, mengelola administrasi kepegawaian dan persuratan, menindaklanjuti pengaduan, serta mengatur integrasi data antarsistem pemerintahan.

* **Pimpinan (Kepala Daerah / Pejabat Berwenang):** Pengguna tingkat eksekutif yang berfokus pada pemantauan metrik kinerja melalui *dashboard* statistik, evaluasi laporan indikator, serta memberikan persetujuan (otorisasi) akhir terhadap permohonan layanan berdasarkan kewenangannya.

## 3. Ruang Lingkup Modul & Fitur

### A. Etalase & Akses Publik

* **Portal Publik:** Beranda utama yang menyajikan informasi pemerintahan, katalog layanan, pengumuman, agenda, direktori perangkat daerah, pencarian global, dan kanal pengaduan.

### B. Operasional Internal & Manajemen Layanan

* **Portal Internal Pemerintahan:** Fondasi akses internal terpusat (*Single Sign-On*) dengan fitur manajemen akun, pengaturan hak akses, direktori aplikasi internal, notifikasi, dan *audit log*.

* **Manajemen Proses dan Permohonan:** Modul transaksional utama (*core business*) yang mencakup form pengajuan masyarakat, penerbitan nomor registrasi pelacakan, verifikasi berkas oleh OPD, penugasan lapangan, hingga persetujuan pimpinan.

* **Modul Administrasi Khusus:** Area *back-office* untuk manajemen kepegawaian, persuratan dan disposisi, pengelolaan arsip, pelaporan sektoral, dan tindak lanjut pengaduan masyarakat.

### C. Pemantauan & Skalabilitas

* **Dashboard Monitoring:** Antarmuka visual yang menampilkan ringkasan indikator, grafik tren, tabel data, filter periode, dan fitur ekspor laporan.

* **Integrasi Sistem dan Data (API Gateway):** Panel administrator IT untuk mengatur API, pemetaan sumber data, dokumentasi, dan pemantauan keberhasilan pertukaran data antarsistem. Dilengkapi *API Gateway* internal (`/api/v1/integrations`) yang diamankan dengan *API Key* (Bearer Token) untuk konsumsi data secara *headless* oleh aplikasi dinas eksisting.

## 4. Alur Pengguna (User Flow)

### 4.1. Alur Pengguna: Masyarakat

* **Pencarian Informasi & Eksplorasi Layanan:**
  1. Mengakses beranda Portal Publik.
  2. Menggunakan fitur pencarian global untuk mencari layanan (misal: "Izin Usaha").
  3. Melihat katalog layanan dan persyaratan, mengklik detail untuk membaca syarat, estimasi waktu, dan informasi kontak perangkat daerah penanggung jawab.

* **Pengajuan Permohonan Layanan:**
  1. Melakukan autentikasi (opsional/wajib tergantung layanan).
  2. Mengakses formulir permohonan layanan.
  3. Mengisi data dan mengunggah dokumen digital sebagai kelengkapan berkas.
  4. Meninjau pratinjau formulir dan mengirimkan pengajuan.
  5. Menerima nomor registrasi pelacakan di layar dan via email/WhatsApp.

* **Pelacakan Status (Tracking) & Notifikasi:**
  1. Memasukkan nomor registrasi pada fitur pelacakan di portal.
  2. Melihat riwayat proses dan waktu penyelesaian secara visual (misal: *timeline stepper*).
  3. Menerima catatan tindak lanjut dan notifikasi jika ada berkas yang kurang atau layanan telah selesai.

* **Pengaduan dan Aspirasi:**
  1. Mengakses halaman pengaduan atau aspirasi.
  2. Memilih kategori, mengisi deskripsi, melampirkan bukti, dan mengirimkan laporan.
  3. Menerima tiket untuk melacak progres tindak lanjut dari OPD terkait setelah alur penanganannya divalidasi.

### 4.2. Alur Pengguna: OPD

* **Akses & Navigasi:**
  1. Melakukan login ke Portal Internal Pemerintahan.
  2. Diarahkan ke *dashboard* yang menyesuaikan dengan peran fungsional (misal: operator, verifikator, administrator).
  3. (Khusus Administrator) Melakukan manajemen akun, pengaturan hak akses, serta pengelolaan unit kerja perangkat daerah.
  4. Mengakses direktori aplikasi internal secara terpusat.

* **Pemrosesan & Verifikasi Permohonan (Back-Office):**
  1. Menerima notifikasi aktivitas permohonan layanan baru.
  2. Membuka detail berkas dan melakukan verifikasi kelengkapan dokumen masyarakat.
  3. Meneruskan berkas (disposisi) atau memberikan penugasan kepada petugas lapangan jika diperlukan.
  4. Memberikan catatan tindak lanjut ke pemohon jika ada perbaikan.
  5. Meneruskan berkas yang valid untuk persetujuan pimpinan.

* **Administrasi Internal & Pengaduan:**
  1. Mengakses Modul Administrasi Khusus untuk manajemen kepegawaian, kehadiran, dan persuratan.
  2. Menyusun perencanaan, pelaporan rutin, dan mengelola arsip digital dinas.
  3. Menindaklanjuti tiket pengaduan masyarakat di lapangan dan memperbarui statusnya di sistem.

* **Integrasi Sistem (Khusus Admin IT):**
  1. Memetakan sumber data, mengatur API, dan menetapkan mekanisme pertukaran data yang disetujui antarsistem pemerintahan.
  2. Melakukan pemantauan keberhasilan pertukaran data dan penanganan kegagalan integrasi.

### 4.3. Alur Pengguna: Pimpinan

* **Pemantauan Eksekutif (Monitoring):**
  1. Login dan otomatis diarahkan ke Dashboard Monitoring tingkat eksekutif.
  2. Memantau ringkasan indikator, grafik statistik, dan tren layanan.
  3. Memfilter data berdasarkan periode atau kategori tertentu untuk menganalisis performa tiap instansi.
  4. Melakukan ekspor laporan data jika diperlukan untuk evaluasi rapat.

* **Persetujuan Akhir (Approval):**
  1. Menerima notifikasi aktivitas tentang dokumen yang siap diotorisasi.
  2. Meninjau riwayat proses dari dokumen yang telah diverifikasi oleh OPD di modul Manajemen Permohonan.
  3. Melakukan persetujuan atau penolakan berdasarkan kewenangan (termasuk penerapan Tanda Tangan Elektronik).
  4. Sistem otomatis mencatat keputusan ke *audit log* sistem dan mengirimkan notifikasi ke masyarakat.

## 5. Pedoman Desain Antarmuka (UI/UX Design System)

Portal ini dirancang untuk mendobrak kesan kaku pada aplikasi pemerintahan dengan mengusung gaya visual **Futuristik, Modern, Glassmorphism, dan 3D UI**.

### 5.1. Palet Warna (Color Palette)
Menggunakan paduan warna kontras antara biru gelap (kepercayaan, teknologi) dengan warna-warna hangat (energi, aksi, *alertness*):
* **`#011D58` (Deep Space Navy):** Warna primer untuk latar belakang utama aplikasi, *sidebar*, tipografi dominan pada mode terang, dan fondasi untuk efek futuristik. Memberikan kesan berwibawa, aman, dan mendalam.
* **`#FA4D09` (Cyber Red-Orange):** Warna aksen utama. Digunakan untuk tombol *Call-to-Action* (CTA) utama (seperti "Ajukan Permohonan", "Setujui"), notifikasi kritis, dan elemen aktif.
* **`#FC7A0B` (Neon Orange):** Warna aksen sekunder. Ideal untuk transisi gradasi (dipadukan dengan `#FA4D09`), status *progress* berjalan (*timeline stepper*), dan interaksi *hover*.
* **`#FF9F03` (Solar Yellow-Orange):** Warna *highlight* dan tersier. Digunakan untuk efek pencahayaan (glow/shadow) pada elemen 3D, lencana (*badge*) status peringatan/menunggu, serta ilustrasi pendar cahaya.

### 5.2. Konsep Visual Utama
* **Glassmorphism (Efek Kaca):** 
  * Komponen *card* (kartu layanan, *dashboard widget*, panel navigasi) akan menggunakan latar belakang semi-transparan putih atau biru gelap dengan efek *background-blur* (kaca buram).
  * Dilengkapi dengan batas tepi (*border*) putih tipis semi-transparan (misal: `border-white/20`) untuk mempertegas batas objek agar terlihat melayang di atas *background*.
* **3D UI & Depth (Dimensi & Kedalaman):**
  * Penggunaan *drop-shadow* dan *inner-shadow* yang halus berlapis-lapis untuk memberikan ilusi ketebalan pada tombol dan *card* masukan.
  * Aset visual (ikon, ilustrasi hero di Beranda, grafik *dashboard*) menggunakan render 3D bergaya *matte* atau mengkilap yang mencerminkan modernisasi layanan.
* **Futuristik & Modern:**
  * Tipografi *Sans-Serif* geometris yang bersih dan mudah dibaca (misal: Plus Jakarta Sans, Inter, atau Outfit).
  * Animasi mikro pada saat *hover*, klik, atau pemuatan halaman (transisi halus) menggunakan pustaka animasi modern.

## 6. Arsitektur Database (PostgreSQL - Neon)

### A. Kelompok Tabel Manajemen Akses & Pengguna (RBAC)
* `roles` (ID, Name) -> *'masyarakat', 'opd_operator', 'opd_verifikator', 'pimpinan', 'admin_sistem'*
* `opd_units` (ID, Nama_OPD, Kode_Instansi)
* `users` (ID, NIK, Nama_Lengkap, Email, Password_Hash, Role_ID, OPD_ID)

### B. Kelompok Tabel Modul Layanan & Katalog
* `services` (ID, OPD_ID, Nama_Layanan, Deskripsi, Estimasi_Waktu_Hari, Is_Active)
* `service_requirements` (ID, Service_ID, Nama_Dokumen, Is_Mandatory)

### C. Kelompok Tabel Transaksi & Manajemen Permohonan
* `applications` (ID, Nomor_Registrasi, User_ID, Service_ID, Status, Created_At, Updated_At)
  * *Status Enum:* 'DRAFT', 'SUBMITTED', 'VERIFICATION', 'REVISION', 'APPROVED', 'REJECTED', 'COMPLETED'
* `application_documents` (ID, Application_ID, Requirement_ID, File_URL, Status_Verifikasi)
* `application_logs` (ID, Application_ID, Actor_ID, Action, Catatan, Created_At)

### D. Kelompok Tabel Interaksi & Sistem
* `complaints` (ID, User_ID, Kategori, Deskripsi, Bukti_URL, Status_Enum, OPD_ID, Created_At)
* `notifications` (ID, User_ID, Title, Message, Type_Enum, Is_Read, Created_At)
* `system_audit_logs` (ID, Actor_ID, Action, Entity_Type, IP_Address, Created_At)

## 7. Spesifikasi Infrastruktur & Tumpukan Teknologi (Tech Stack)

* **Frontend / Fullstack:** Next.js (App Router) dengan TypeScript.
* **Styling & UI Framework:** Tailwind CSS (dengan utilitas kustom untuk kelas `backdrop-blur`, gradiasi kompleks, dan `box-shadow` 3D).
* **Animasi Mikro:** Framer Motion (untuk transisi halaman yang futuristik dan animasi *floating* pada elemen 3D).
* **Database:** PostgreSQL (Neon Serverless).
* **Data Access Layer:** Drizzle ORM atau Kysely (Optimal untuk lingkungan *edge* / Vercel tanpa isu *cold-start* berat).
* **Autentikasi:** NextAuth.js / Auth.js.
* **Object Storage (Penyimpanan Berkas):** Menggunakan *storage* yang kompatibel dengan S3 (AWS S3, Supabase Storage, atau MinIO). Dibatasi maksimal 5 MB per dokumen, ekstensi PDF, JPG, dan PNG.

## 8. Keamanan & Kepatuhan (Security & Compliance)

* **Verifikasi Identitas:** Validasi NIK pengguna (Masyarakat) dengan API Dukcapil (jika memungkinkan) sebelum akun dinyatakan aktif penuh.
* **Anti-Spam & Rate Limiting:** Implementasi CAPTCHA (Google reCAPTCHA v3 atau Cloudflare Turnstile) pada formulir publik dan login untuk mencegah *bot/spam*.
* **Kepatuhan UU PDP (Pelindungan Data Pribadi):** Terdapat *checkbox* persetujuan (*Consent*) dan Syarat & Ketentuan yang harus disetujui pemohon sebelum data pribadi dan berkasnya disimpan oleh sistem.

## 9. Kebutuhan Non-Fungsional (Non-Functional Requirements / NFR)

* **Responsivitas (Mobile-First):** Antarmuka wajib dirancang optimal untuk perangkat seluler, mengingat tingginya mobilitas pimpinan dan mayoritas masyarakat mengakses internet via *smartphone*. Efek *glassmorphism* dan 3D harus tetap ringan di *mobile*.
* **Performa:** Target *Load Time* (waktu muat) halaman di bawah 3 detik, dioptimalkan menggunakan fitur *Server Components* dari Next.js agar *render* UI yang kompleks tidak membebani peramban (browser) pengguna.
* **Aksesibilitas (WCAG):** Memastikan kontras warna antara `#011D58` dan teks putih/oranye memenuhi standar aksesibilitas bagi pengguna dengan gangguan penglihatan, serta mendukung *screen-reader*.