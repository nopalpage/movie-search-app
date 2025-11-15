# Movie Search App 🎬

Aplikasi pencarian film yang dibangun dengan React. Menyediakan berbagai fitur lengkap untuk mencari, melihat detail, dan mengelola film favorit dengan antarmuka yang modern dan responsif.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Instalasi](#-instalasi)
- [Konfigurasi API](#-konfigurasi-api)
- [Struktur Folder](#-struktur-folder)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Fitur Teknis](#-fitur-teknis)
- [Cara Menggunakan](#-cara-menggunakan)
- [Catatan Penting](#-catatan-penting)

## ✨ Fitur

### 🎬 Pencarian Film
- **Pencarian Real-time**: Pencarian film berdasarkan judul dengan debounce untuk performa optimal
- **Riwayat Pencarian**: Riwayat pencarian yang tersimpan otomatis di localStorage (maksimal 10 item terakhir)
- **Pencarian Lanjutan**: Pencarian dengan filter gabungan (judul, tipe, tahun)
- **Auto-complete**: Klik riwayat pencarian untuk mencari ulang

### 📋 Detail Film
Modal detail lengkap dengan informasi komprehensif:
- Poster film beresolusi tinggi
- Informasi lengkap: Tahun rilis, Genre, Durasi
- Kredit film: Direktur dan Aktor utama
- Rating dari berbagai sumber:
  - IMDB Rating
  - Rotten Tomatoes
  - Metacritic
  - Sumber rating lainnya
- Sinopsis lengkap
- Link ke website resmi film

### ❤️ Favorit Film
- Simpan film ke daftar favorit dengan satu klik
- Tampilan khusus untuk melihat semua film favorit
- Penyimpanan lokal permanen (localStorage) - data tersimpan meski browser ditutup
- Indikator visual pada kartu film yang sudah difavoritkan (ikon hati merah)
- Counter jumlah favorit di header

### ➕ Watchlist
- Sistem watchlist terpisah dari favorites
- Simpan film yang ingin ditonton nanti
- Tampilan khusus untuk watchlist dengan counter
- Penyimpanan lokal permanen
- Indikator visual pada kartu film (ikon centang hijau)

### 🔍 Filter & Sort
**Filter berdasarkan:**
- Tipe film: Movie, Series, Episode, atau Semua
- Tahun rilis: Dengan preset dekade (2020-an, 2010-an, 2000-an, 1990-an, 1980-an, atau Lebih Tua)

**Urutkan berdasarkan:**
- Tahun rilis: Terlama ke Terbaru atau sebaliknya
- Judul: A-Z atau Z-A
- Default (urutan dari API)

**Fitur tambahan:**
- Reset filter dengan satu klik
- Filter dan sort bekerja bersama

### 📄 Pagination
- Pagination otomatis untuk hasil pencarian yang banyak
- Navigasi halaman yang mudah (Previous, Next, nomor halaman)
- Informasi jumlah hasil yang ditampilkan
- Auto scroll ke atas saat pindah halaman
- Ellipsis untuk halaman yang banyak
- Tampilan nomor halaman yang aktif

### 🌙 Dark Mode
- Toggle dark mode dengan satu klik (ikon matahari/bulan)
- Tersimpan otomatis di localStorage
- Transisi smooth antar tema
- Desain yang nyaman untuk mata di malam hari
- Support untuk semua komponen

### ✏️ Catatan Film
- Tambah catatan pribadi untuk setiap film
- Edit dan hapus catatan dengan mudah
- Tersimpan per film (berdasarkan IMDb ID)
- Tampil di modal detail film
- Catatan tersimpan di localStorage

### 📤 Share Film
Bagikan film ke media sosial dengan mudah:
- **Facebook**: Share langsung ke Facebook
- **Twitter**: Tweet tentang film
- **WhatsApp**: Kirim ke WhatsApp
- **Telegram**: Share ke Telegram
- **Salin Link**: Copy link IMDb film ke clipboard
- **Native Share API**: Support untuk mobile devices

### 💾 Import/Export Data
- **Export Data**: Export semua data (favorites, watchlist, notes, preferences) ke file JSON
- **Import Data**: Import data dari file JSON (restore backup)
- **Backup**: Buat backup data dengan mudah
- **Restore**: Restore data dari backup file

### 🎨 UI/UX
- **Desain Modern**: Gradient background yang menarik
- **Responsif**: Optimal untuk desktop, tablet, dan mobile
- **Hover Effects**: Efek hover yang menarik pada kartu film
- **Animasi Smooth**: Transisi dan animasi yang halus
- **Loading States**: Indikator loading saat mengambil data
- **Error Handling**: Pesan error yang informatif
- **Empty States**: Pesan yang jelas saat tidak ada data

### 💾 Penyimpanan Lokal
Semua data tersimpan di browser (localStorage):
- Riwayat pencarian (maksimal 10 item)
- Daftar favorit (tidak terbatas)
- Watchlist (tidak terbatas)
- Catatan film (per film)
- Preferensi dark mode
- Pengaturan aplikasi

## 🚀 Instalasi

### Prasyarat
- Node.js (versi 14 atau lebih baru)
- npm atau yarn

### Langkah-langkah

1. **Clone atau download repository ini**

2. **Install dependencies:**
```bash
cd movie-search-app
npm install
```

3. **Konfigurasi API Key** (lihat bagian [Konfigurasi API](#-konfigurasi-api))

4. **Jalankan aplikasi:**
```bash
npm start
```

Aplikasi akan berjalan di http://localhost:3000

## 🔑 Konfigurasi API

### Mendapatkan API Key OMDB

1. Kunjungi [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Pilih tipe API key:
   - **Free**: 1,000 request per hari (gratis)
   - **Basic**: 50,000 request per hari (berbayar)
3. Isi form registrasi dengan email Anda
4. Cek email untuk aktivasi akun
5. Login dan salin API key Anda

### Menambahkan API Key ke Aplikasi

1. Copy file `.env.example` ke `.env` (atau buat file `.env` baru di root project)
2. Buka file `.env` dan isi dengan konfigurasi API:

```env
# .env
REACT_APP_OMDB_API_KEY=abc123xyz  # ← Ganti dengan API key Anda
REACT_APP_OMDB_API_BASE_URL=http://www.omdbapi.com/  # Base URL API (opsional)
```

3. Restart development server setelah mengubah `.env`:
```bash
npm start
```

**Penting:** 
- Hanya masukkan API key-nya saja, bukan URL lengkap!
- Pastikan variable name adalah `REACT_APP_OMDB_API_KEY` (dengan prefix `REACT_APP_`)

### Contoh yang Benar:
```env
REACT_APP_OMDB_API_KEY=8bc427e5  # ✅ Benar
REACT_APP_OMDB_API_BASE_URL=http://www.omdbapi.com/  # ✅ Benar
```

### Contoh yang Salah:
```env
REACT_APP_OMDB_API_KEY=http://www.omdbapi.com/?i=tt3896198&apikey=8bc427e5  # ❌ Salah
```

**Catatan:** File `.env` sudah ditambahkan ke `.gitignore`, sehingga API key tidak akan ter-commit ke repository.

## 📁 Struktur Folder

Lihat `STRUCTURE.md` untuk detail lengkap struktur folder dan arsitektur aplikasi.

### Ringkasan Struktur:

```
movie-search-app/
├── public/
│   └── index.html              # HTML utama
├── src/
│   ├── components/             # Komponen UI (terorganisir per fitur)
│   │   ├── common/            # Komponen dasar
│   │   │   ├── Button.js      # Komponen button reusable
│   │   │   └── Modal.js       # Komponen modal reusable
│   │   ├── movies/            # Komponen film
│   │   │   ├── MovieCard.js   # Kartu film dengan overlay
│   │   │   └── MovieDetail.js # Modal detail lengkap film
│   │   ├── search/            # Komponen pencarian
│   │   │   ├── SearchBar.js   # Input pencarian utama
│   │   │   ├── AdvancedSearch.js  # Form pencarian lanjutan
│   │   │   └── SearchHistory.js   # Komponen riwayat pencarian
│   │   ├── filters/           # Komponen filter
│   │   │   └── Filters.js     # Filter dan sort
│   │   ├── pagination/        # Komponen pagination
│   │   │   └── Pagination.js  # Navigasi halaman
│   │   ├── favorites/         # Komponen favorit
│   │   │   └── FavoritesButton.js  # Tombol favorit
│   │   ├── watchlist/         # Komponen watchlist
│   │   │   └── WatchlistButton.js  # Tombol watchlist
│   │   ├── notes/             # Komponen catatan
│   │   │   └── MovieNotes.js  # Input dan tampilan catatan
│   │   ├── share/             # Komponen share
│   │   │   └── ShareButton.js # Menu share ke media sosial
│   │   └── settings/          # Komponen pengaturan
│   │       ├── DarkModeToggle.js    # Toggle dark mode
│   │       └── DataManagement.js    # Import/Export data
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useLocalStorage.js       # Hook untuk localStorage
│   │   ├── useMovies.js             # Hook untuk pencarian film
│   │   ├── useMovieCollections.js   # Hook untuk favorites & watchlist
│   │   ├── useSearchHistory.js      # Hook untuk riwayat pencarian
│   │   └── useDarkMode.js           # Hook untuk dark mode
│   ├── services/              # API Services
│   │   └── movieService.js    # Service untuk OMDB API
│   ├── utils/                 # Utility Functions
│   │   ├── localStorage.js    # Utility export/import localStorage
│   │   └── filters.js         # Utility filter dan sort data
│   ├── constants/             # Constants & Configuration
│   │   └── config.js          # API key, constants, config
│   ├── context/               # React Context Providers
│   │   └── AppContext.js      # Context untuk state global
│   ├── App.js                 # Komponen utama aplikasi
│   ├── App.css                # Styling global (termasuk dark mode)
│   └── index.js               # Entry point React
├── package.json               # Dependencies dan scripts
├── README.md                  # Dokumentasi utama (file ini)
├── STRUCTURE.md               # Dokumentasi struktur detail
└── .gitignore                 # File yang diabaikan Git
```

## 🛠 Teknologi yang Digunakan

- **React 18.2.0**: Library JavaScript untuk membangun UI
- **React DOM**: React renderer untuk web
- **OMDB API**: API untuk data film (gratis dengan batas 1000 request/hari)
- **CSS3**: Modern CSS dengan:
  - CSS Variables (untuk dark mode)
  - Animations dan transitions
  - Flexbox dan Grid
  - Media queries untuk responsive
- **LocalStorage API**: Penyimpanan data di browser
- **Web Share API**: Native share (mobile)
- **React Context API**: State management global

## 🔧 Fitur Teknis

### Arsitektur
- **Separation of Concerns**: Struktur folder yang terorganisir per fitur
- **Custom Hooks**: Logika reusable di hooks terpisah
- **Service Layer**: Abstraksi untuk API calls (mudah diubah ke API lain)
- **Context API**: State management global tanpa library eksternal
- **Utility Functions**: Helper functions terpisah dan reusable
- **Component Composition**: Komponen kecil yang dapat dikombinasikan

### Optimasi
- **Debounce**: Mengurangi jumlah request API saat mengetik
- **Pagination**: Menangani hasil pencarian yang banyak dengan efisien
- **Lazy Loading**: Modal hanya dimuat saat diperlukan
- **LocalStorage Caching**: Data tersimpan di browser untuk performa
- **Error Handling**: Try-catch di semua async operations

### Code Quality
- **Error Handling**: Error handling yang komprehensif di semua level
- **Clean Code**: Komponen kecil dan focused pada satu tanggung jawab
- **Reusability**: Komponen dan hooks dapat digunakan kembali
- **Naming Convention**: Nama yang konsisten dan jelas
- **Component Separation**: Pemisahan yang jelas antara UI dan logic

### UI/UX
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Support penuh untuk dark theme
- **Smooth Animations**: Transisi yang halus untuk semua interaksi
- **Loading States**: Feedback visual saat loading
- **Error States**: Pesan error yang informatif
- **Empty States**: Pesan yang jelas saat tidak ada data
- **Accessibility**: Semantic HTML dan keyboard navigation

## 📖 Cara Menggunakan

### Pencarian Film
1. Ketik judul film di search bar
2. Hasil akan muncul otomatis (debounce 500ms)
3. Klik kartu film untuk melihat detail
4. Gunakan filter dan sort untuk mempersempit hasil

### Menambah ke Favorit
1. Hover pada kartu film
2. Klik ikon hati (❤️) di overlay
3. Film akan tersimpan di favorites
4. Akses favorites melalui tombol "❤️ Favorit" di header

### Menambah ke Watchlist
1. Hover pada kartu film
2. Klik ikon plus (➕) di overlay
3. Film akan tersimpan di watchlist
4. Akses watchlist melalui tombol "➕ Watchlist" di header

### Menambah Catatan
1. Buka detail film
2. Scroll ke bagian "Catatan Saya"
3. Klik "📝 Tambah Catatan"
4. Ketik catatan Anda
5. Klik "💾 Simpan"

### Share Film
1. Buka detail film
2. Scroll ke bagian share
3. Klik "📤 Bagikan"
4. Pilih platform media sosial

### Import/Export Data
1. Klik ikon pengaturan (⚙️) di header
2. Klik "💾 Export Data" untuk backup
3. Atau klik "📥 Import Data" untuk restore
4. Pilih file JSON yang ingin diimport

### Dark Mode
1. Klik ikon matahari/bulan di header
2. Tema akan berubah secara instan
3. Preferensi tersimpan otomatis

## ⚠️ Catatan Penting

### API Key
- **Batas API Gratis**: 1,000 request per hari
- **Keamanan**: API key disimpan di file `.env` yang sudah di-ignore oleh Git
- **Environment Variables**: Menggunakan `REACT_APP_OMDB_API_KEY` di file `.env`
- **Cara Aman**: File `.env` sudah ditambahkan ke `.gitignore`, sehingga tidak akan ter-commit ke repository

### LocalStorage
- **Batasan**: 5-10MB per domain (cukup untuk ribuan film)
- **Browser Support**: Support di semua browser modern
- **Data Persistence**: Data tersimpan hingga user clear browser data

### Browser Compatibility
- **Chrome/Edge**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support
- **Opera**: ✅ Full support
- **Mobile Browsers**: ✅ Full support

### Performance
- **Debounce**: 500ms untuk mengurangi API calls
- **Pagination**: 12 item per halaman
- **Image Loading**: Lazy loading untuk poster film
- **Modal**: Hanya fetch detail saat modal dibuka

## 📝 Lisensi

Project ini adalah open source dan tersedia di bawah lisensi MIT.

## 🤝 Kontribusi

Kontribusi, issue, dan feature requests sangat diterima! Jangan ragu untuk membuat pull request.

## 👨‍💻 Author

Dibuat dengan ❤️ menggunakan React

---

**Happy Movie Searching! 🎬🍿**
