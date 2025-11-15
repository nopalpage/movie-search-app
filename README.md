# Movie Search App

Aplikasi pencarian film yang dibangun dengan React. Menyediakan berbagai fitur untuk mencari, melihat detail, dan mengelola film favorit.

## Fitur

### 🎬 Pencarian Film
- Pencarian film berdasarkan judul dengan debounce untuk performa optimal
- Riwayat pencarian yang tersimpan secara lokal
- Auto-complete dari riwayat pencarian sebelumnya

### 📋 Detail Film
- Modal detail lengkap dengan informasi:
  - Poster film
  - Tahun rilis, Genre, Durasi
  - Direktur dan Aktor
  - Rating dari berbagai sumber (IMDB, Rotten Tomatoes, dll)
  - Sinopsis lengkap
  - Link ke website resmi

### ❤️ Favorit Film
- Simpan film ke daftar favorit
- Tampilan khusus untuk melihat semua film favorit
- Penyimpanan lokal (localStorage) - data tersimpan meski browser ditutup
- Indikator visual pada kartu film yang sudah difavoritkan

### 🔍 Filter & Sort
- Filter berdasarkan:
  - Tipe film (Movie, Series, Episode)
  - Tahun rilis (dengan preset dekade)
- Urutkan berdasarkan:
  - Tahun rilis (Terlama/Terbaru)
  - Judul (A-Z/Z-A)
- Pencarian lanjutan dengan filter gabungan

### ➕ Watchlist
- Sistem watchlist terpisah dari favorites
- Simpan film yang ingin ditonton nanti
- Tampilan khusus untuk watchlist
- Penyimpanan lokal permanen

### 📄 Pagination
- Pagination untuk hasil pencarian yang banyak
- Navigasi halaman yang mudah
- Informasi jumlah hasil
- Auto scroll ke atas saat pindah halaman

### 🌙 Dark Mode
- Toggle dark mode dengan satu klik
- Tersimpan otomatis di localStorage
- Transisi smooth antar tema
- Desain yang nyaman untuk mata di malam hari

### ✏️ Catatan Film
- Tambah catatan pribadi untuk setiap film
- Edit dan hapus catatan
- Tersimpan per film (IMDb ID)
- Tampil di modal detail film

### 📤 Share Film
- Bagikan film ke media sosial:
  - Facebook
  - Twitter
  - WhatsApp
  - Telegram
- Salin link film
- Native share API support (mobile)

### 💾 Import/Export Data
- Export data (favorites, watchlist, notes) ke file JSON
- Import data dari file JSON
- Backup dan restore data dengan mudah

### 🎨 UI/UX
- Desain modern dan responsif
- Hover effects yang menarik
- Animasi smooth untuk semua interaksi
- Tampilan optimal untuk desktop dan mobile
- Loading states dan error handling

### 💾 Penyimpanan Lokal
- Riwayat pencarian tersimpan otomatis
- Daftar favorit tersimpan secara permanen
- Data tersimpan di browser (localStorage)

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Dapatkan API Key dari OMDB API:
   - Kunjungi http://www.omdbapi.com/apikey.aspx
   - Daftar untuk mendapatkan API key gratis
   - Buka file `src/App.js` dan ganti `'your-api-key-here'` dengan API key Anda

3. Jalankan aplikasi:
```bash
npm start
```

Aplikasi akan berjalan di http://localhost:3000

## Build untuk Production

```bash
npm run build
```

## Struktur Folder

Lihat `STRUCTURE.md` untuk detail lengkap struktur folder dan arsitektur aplikasi.

### Ringkasan Struktur:

```
src/
├── components/        # Komponen UI (terorganisir per fitur)
│   ├── common/       # Komponen dasar (Button, Modal)
│   ├── movies/       # Komponen film
│   ├── search/       # Komponen pencarian
│   ├── filters/      # Komponen filter
│   ├── pagination/   # Komponen pagination
│   ├── favorites/    # Komponen favorit
│   ├── watchlist/    # Komponen watchlist
│   ├── notes/        # Komponen catatan
│   ├── share/        # Komponen share
│   └── settings/     # Komponen pengaturan
├── hooks/            # Custom React Hooks
├── services/         # API Services
├── utils/            # Utility Functions
├── constants/        # Constants & Config
├── context/          # React Context Providers
├── App.js            # Komponen utama
├── App.css           # Styling global
└── index.js          # Entry point
```

## Teknologi yang Digunakan

- React 18.2.0
- React DOM
- OMDB API (untuk data film)
- CSS3 (Modern CSS dengan animations)
- LocalStorage (untuk penyimpanan data)

## Fitur Teknis

### Arsitektur
- **Separation of Concerns**: Struktur folder yang terorganisir per fitur
- **Custom Hooks**: Logika reusable di hooks terpisah
- **Service Layer**: Abstraksi untuk API calls
- **Context API**: State management global
- **Utility Functions**: Helper functions terpisah

### Optimasi
- Debounce pada pencarian untuk mengurangi jumlah request API
- Pagination untuk menangani hasil banyak
- Lazy loading komponen modal
- LocalStorage untuk caching data

### Code Quality
- Error handling yang komprehensif
- Clean code dengan komponen yang reusable
- Consistent naming convention
- Proper component separation

### UI/UX
- Responsive design dengan mobile-first approach
- Dark mode support
- Smooth animations dan transitions
- Loading states dan error handling
- Accessibility considerations

## Catatan

- API Key OMDB gratis memiliki batas 1000 request per hari
- Pastikan untuk tidak membagikan API key Anda secara publik

