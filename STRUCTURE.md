# Struktur Folder dan File Movie Search App

## Struktur Folder

```
movie-search-app/
├── public/
│   └── index.html
├── src/
│   ├── components/           # Komponen UI yang dapat digunakan kembali
│   │   ├── common/          # Komponen umum (Button, Modal)
│   │   │   ├── Button.js
│   │   │   └── Modal.js
│   │   ├── movies/          # Komponen terkait film
│   │   │   ├── MovieCard.js
│   │   │   └── MovieDetail.js
│   │   ├── search/          # Komponen pencarian
│   │   │   ├── SearchBar.js
│   │   │   ├── AdvancedSearch.js
│   │   │   └── SearchHistory.js
│   │   ├── filters/         # Komponen filter
│   │   │   └── Filters.js
│   │   ├── pagination/      # Komponen pagination
│   │   │   └── Pagination.js
│   │   ├── favorites/       # Komponen favorit
│   │   │   └── FavoritesButton.js
│   │   ├── watchlist/       # Komponen watchlist
│   │   │   └── WatchlistButton.js
│   │   ├── notes/           # Komponen catatan
│   │   │   └── MovieNotes.js
│   │   ├── share/           # Komponen share
│   │   │   └── ShareButton.js
│   │   └── settings/        # Komponen pengaturan
│   │       ├── DarkModeToggle.js
│   │       └── DataManagement.js
│   ├── hooks/               # Custom React Hooks
│   │   ├── useLocalStorage.js
│   │   ├── useMovies.js
│   │   ├── useMovieCollections.js
│   │   ├── useSearchHistory.js
│   │   └── useDarkMode.js
│   ├── services/            # API Services
│   │   └── movieService.js
│   ├── utils/               # Utility Functions
│   │   ├── localStorage.js
│   │   └── filters.js
│   ├── constants/           # Constants & Configuration
│   │   └── config.js
│   ├── context/             # React Context Providers
│   │   └── AppContext.js
│   ├── App.js               # Komponen utama
│   ├── App.css              # Styling global
│   └── index.js             # Entry point
├── package.json
├── README.md
├── STRUCTURE.md
└── .gitignore
```

## Penjelasan Struktur

### 📁 components/
Komponen UI yang dipisah berdasarkan fitur:
- **common/**: Komponen dasar yang digunakan di banyak tempat
- **movies/**: Komponen untuk menampilkan film
- **search/**: Komponen untuk pencarian
- **filters/**: Komponen untuk filter dan sort
- **pagination/**: Komponen pagination
- **favorites/**: Komponen untuk sistem favorit
- **watchlist/**: Komponen untuk watchlist
- **notes/**: Komponen untuk catatan pribadi
- **share/**: Komponen untuk sharing
- **settings/**: Komponen untuk pengaturan

### 📁 hooks/
Custom React hooks untuk logika yang dapat digunakan kembali:
- `useLocalStorage`: Hook untuk localStorage
- `useMovies`: Hook untuk pencarian film
- `useMovieCollections`: Hook untuk mengelola favorites dan watchlist
- `useSearchHistory`: Hook untuk riwayat pencarian
- `useDarkMode`: Hook untuk dark mode

### 📁 services/
Layer service untuk komunikasi dengan API:
- `movieService.js`: Service untuk OMDB API

### 📁 utils/
Fungsi utility helper:
- `localStorage.js`: Utility untuk localStorage (export/import)
- `filters.js`: Utility untuk filter dan sort data

### 📁 constants/
Konstanta dan konfigurasi:
- `config.js`: API keys, constants, default values

### 📁 context/
React Context untuk state management:
- `AppContext.js`: Context provider untuk state global

## Arsitektur

1. **Separation of Concerns**: Setiap folder memiliki tanggung jawab khusus
2. **Reusability**: Komponen dan hooks dapat digunakan kembali
3. **Maintainability**: Struktur yang jelas memudahkan maintenance
4. **Scalability**: Mudah untuk menambah fitur baru

## Cara Menambah Fitur Baru

1. Buat komponen di folder `components/[feature-name]/`
2. Buat custom hook di `hooks/` jika diperlukan
3. Tambah service di `services/` jika berhubungan dengan API
4. Update constants di `constants/config.js` jika perlu
5. Integrasikan ke `App.js` atau komponen yang relevan

