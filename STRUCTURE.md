# Struktur Folder dan File Movie Search App 📁

Dokumentasi lengkap struktur folder, file, dan arsitektur aplikasi Movie Search App.

## 📂 Struktur Folder Lengkap

```
movie-search-app/
├── public/
│   └── index.html                    # HTML utama aplikasi
│
├── src/
│   ├── components/                   # 📦 Komponen UI (terorganisir per fitur)
│   │   │
│   │   ├── common/                   # Komponen dasar yang digunakan di banyak tempat
│   │   │   ├── Button.js             # Komponen button reusable dengan variants
│   │   │   └── Modal.js              # Komponen modal reusable dengan sizes
│   │   │
│   │   ├── movies/                   # Komponen terkait dengan film
│   │   │   ├── MovieCard.js          # Kartu film dengan overlay untuk aksi
│   │   │   └── MovieDetail.js        # Modal detail lengkap dengan semua info
│   │   │
│   │   ├── search/                   # Komponen pencarian
│   │   │   ├── SearchBar.js          # Input pencarian utama dengan debounce
│   │   │   ├── AdvancedSearch.js     # Form pencarian lanjutan dengan filter
│   │   │   └── SearchHistory.js      # Komponen riwayat pencarian terakhir
│   │   │
│   │   ├── filters/                  # Komponen filter dan sorting
│   │   │   └── Filters.js            # Filter tipe, tahun, dan sorting
│   │   │
│   │   ├── pagination/               # Komponen pagination
│   │   │   └── Pagination.js         # Navigasi halaman dengan info jumlah
│   │   │
│   │   ├── favorites/                # Komponen sistem favorit
│   │   │   └── FavoritesButton.js    # Tombol favorit dengan state management
│   │   │
│   │   ├── watchlist/                # Komponen sistem watchlist
│   │   │   └── WatchlistButton.js    # Tombol watchlist dengan state management
│   │   │
│   │   ├── notes/                    # Komponen catatan pribadi
│   │   │   └── MovieNotes.js         # Input, edit, dan hapus catatan per film
│   │   │
│   │   ├── share/                    # Komponen sharing
│   │   │   └── ShareButton.js        # Menu share ke berbagai media sosial
│   │   │
│   │   └── settings/                 # Komponen pengaturan
│   │       ├── DarkModeToggle.js     # Toggle dark mode
│   │       └── DataManagement.js     # Import/Export data (backup & restore)
│   │
│   ├── hooks/                        # 🪝 Custom React Hooks
│   │   ├── useLocalStorage.js        # Hook untuk operasi localStorage
│   │   ├── useMovies.js              # Hook untuk pencarian dan fetch film
│   │   ├── useMovieCollections.js    # Hook untuk manage favorites & watchlist
│   │   ├── useSearchHistory.js       # Hook untuk manage riwayat pencarian
│   │   └── useDarkMode.js            # Hook untuk toggle dan state dark mode
│   │
│   ├── services/                     # 🔌 API Services Layer
│   │   └── movieService.js           # Service untuk komunikasi dengan OMDB API
│   │
│   ├── utils/                        # 🛠 Utility Functions
│   │   ├── localStorage.js           # Utility untuk export/import localStorage
│   │   └── filters.js                # Utility untuk filter dan sort data
│   │
│   ├── constants/                    # 📋 Constants & Configuration
│   │   └── config.js                 # API keys, constants, default values
│   │
│   ├── context/                      # 🔄 React Context Providers
│   │   └── AppContext.js             # Context provider untuk state global
│   │
│   ├── App.js                        # ⚛️ Komponen utama aplikasi
│   ├── App.css                       # 🎨 Styling global (termasuk dark mode)
│   └── index.js                      # 🚀 Entry point React
│
├── package.json                      # Dependencies dan npm scripts
├── README.md                         # Dokumentasi utama aplikasi
├── STRUCTURE.md                      # Dokumentasi struktur (file ini)
└── .gitignore                        # File yang diabaikan Git
```

## 📖 Penjelasan Detail Setiap Folder

### 📁 `components/` - Komponen UI

Semua komponen UI diorganisir berdasarkan fitur/fungsi. Setiap folder mewakili satu fitur atau kategori komponen.

#### `components/common/`
Komponen dasar yang digunakan di banyak tempat:
- **Button.js**: Komponen button reusable dengan props `variant`, `size`, `disabled`
- **Modal.js**: Komponen modal reusable dengan props `isOpen`, `onClose`, `size`, `title`

#### `components/movies/`
Komponen untuk menampilkan dan detail film:
- **MovieCard.js**: 
  - Menampilkan poster, judul, tahun, tipe
  - Overlay dengan tombol favorit, watchlist, dan detail
  - Clickable untuk membuka detail
- **MovieDetail.js**:
  - Modal dengan informasi lengkap film
  - Poster, metadata, rating, sinopsis
  - Integrasi dengan ShareButton dan MovieNotes

#### `components/search/`
Komponen untuk fungsi pencarian:
- **SearchBar.js**: Input pencarian utama dengan auto-search (debounce)
- **AdvancedSearch.js**: Form pencarian lanjutan dengan filter judul, tipe, tahun
- **SearchHistory.js**: Tampilan dan manajemen riwayat pencarian

#### `components/filters/`
Komponen untuk filter dan sorting:
- **Filters.js**: 
  - Filter tipe (Movie/Series/Episode)
  - Filter tahun (dekade)
  - Sorting (tahun, judul)
  - Tombol reset

#### `components/pagination/`
Komponen untuk navigasi halaman:
- **Pagination.js**:
  - Info jumlah hasil
  - Tombol Previous/Next
  - Nomor halaman dengan ellipsis
  - Halaman aktif ter-highlight

#### `components/favorites/`
Komponen untuk sistem favorit:
- **FavoritesButton.js**: 
  - Tombol dengan ikon hati
  - State aktif/nonaktif
  - Toggle favorit

#### `components/watchlist/`
Komponen untuk sistem watchlist:
- **WatchlistButton.js**:
  - Tombol dengan ikon plus/centang
  - State aktif/nonaktif
  - Toggle watchlist

#### `components/notes/`
Komponen untuk catatan pribadi:
- **MovieNotes.js**:
  - Input textarea untuk catatan
  - Edit dan hapus catatan
  - Tersimpan per film (IMDb ID)

#### `components/share/`
Komponen untuk sharing:
- **ShareButton.js**:
  - Menu dropdown dengan opsi share
  - Facebook, Twitter, WhatsApp, Telegram
  - Salin link ke clipboard
  - Native share API untuk mobile

#### `components/settings/`
Komponen untuk pengaturan:
- **DarkModeToggle.js**: Toggle dark mode dengan ikon matahari/bulan
- **DataManagement.js**: Import/Export data (backup & restore)

### 📁 `hooks/` - Custom React Hooks

Custom hooks untuk logika yang dapat digunakan kembali:

#### `useLocalStorage.js`
Hook untuk operasi localStorage:
- Membaca dari localStorage
- Menyimpan ke localStorage
- Auto-sync dengan state

#### `useMovies.js`
Hook untuk pencarian film:
- State: `movies`, `loading`, `error`, `totalResults`, `currentPage`
- Functions: `searchMovies()`, `resetMovies()`
- Hook: `useDebouncedSearch()` untuk debounce search term

#### `useMovieCollections.js`
Hook untuk mengelola koleksi film:
- State: `favorites`, `watchlist`
- Functions: 
  - `addToFavorites()`, `removeFromFavorites()`, `toggleFavorite()`
  - `addToWatchlist()`, `removeFromWatchlist()`, `toggleWatchlist()`
  - `isFavorite()`, `isInWatchlist()`
  - `clearFavorites()`, `clearWatchlist()`

#### `useSearchHistory.js`
Hook untuk riwayat pencarian:
- State: `history` (array)
- Functions: `addToHistory()`, `removeFromHistory()`, `clearHistory()`
- Auto-limit: Maksimal 10 item

#### `useDarkMode.js`
Hook untuk dark mode:
- State: `darkMode` (boolean)
- Function: `toggleDarkMode()`
- Auto-apply: Class ke body dan html element

### 📁 `services/` - API Services

Layer service untuk komunikasi dengan API eksternal:

#### `movieService.js`
Service untuk OMDB API:
- **searchMovies(title, page)**: Pencarian film dengan pagination
- **getMovieDetails(imdbID)**: Detail lengkap film
- **advancedSearch(params)**: Pencarian dengan filter gabungan
- Return format konsisten: `{ success, movies/data, error, totalResults }`

### 📁 `utils/` - Utility Functions

Fungsi helper yang dapat digunakan di berbagai tempat:

#### `localStorage.js`
Utility untuk localStorage:
- **getFromStorage(key, defaultValue)**: Baca dari localStorage
- **saveToStorage(key, value)**: Simpan ke localStorage
- **removeFromStorage(key)**: Hapus dari localStorage
- **exportData()**: Export semua data ke JSON string
- **importData(jsonString)**: Import data dari JSON string

#### `filters.js`
Utility untuk filter dan sort:
- **filterMovies(movies, filters)**: Filter berdasarkan tipe dan tahun
- **sortMovies(movies, sortBy)**: Sort berdasarkan kriteria
- **getTotalPages(totalItems, itemsPerPage)**: Hitung total halaman
- **paginate(array, page, itemsPerPage)**: Paginate array

### 📁 `constants/` - Constants & Configuration

Konstanta dan konfigurasi aplikasi:

#### `config.js`
Konfigurasi lengkap aplikasi:
- **API_KEY**: API key untuk OMDB API
- **API_BASE_URL**: Base URL OMDB API
- **API_URL**: URL lengkap dengan API key
- **STORAGE_KEYS**: Keys untuk localStorage
- **FILTER_OPTIONS**: Opsi untuk filter
- **SORT_OPTIONS**: Opsi untuk sorting
- **ITEMS_PER_PAGE**: Jumlah item per halaman
- **MAX_SEARCH_HISTORY**: Maksimal riwayat pencarian
- **SEARCH_DEBOUNCE_DELAY**: Delay untuk debounce (ms)

### 📁 `context/` - React Context Providers

Context providers untuk state management global:

#### `AppContext.js`
Context provider utama:
- Menggabungkan semua hooks
- Menyediakan state global ke seluruh aplikasi
- Export `AppProvider` dan `useApp()` hook

### 📁 Root Files

#### `App.js`
Komponen utama aplikasi:
- Menggunakan `AppProvider` untuk context
- Mengelola view mode (search/favorites/watchlist)
- Mengintegrasikan semua komponen
- Menangani state untuk modal dan view

#### `App.css`
Styling global aplikasi:
- Reset CSS
- Variabel CSS untuk theming
- Dark mode styles
- Responsive styles
- Animations dan transitions

#### `index.js`
Entry point React:
- Import App dan render ke root element
- React.StrictMode untuk development

## 🏗 Arsitektur Aplikasi

### 1. Separation of Concerns
Setiap folder memiliki tanggung jawab khusus:
- `components/`: Hanya UI components
- `hooks/`: Hanya logic hooks
- `services/`: Hanya API calls
- `utils/`: Hanya helper functions
- `constants/`: Hanya configuration

### 2. Component Hierarchy
```
App (App.js)
├── AppProvider (Context)
│   └── AppContent
│       ├── Header
│       │   ├── SearchBar
│       │   ├── View Toggles
│       │   ├── Filters
│       │   └── SearchHistory
│       └── Main
│           ├── MovieCard[] (dengan overlay)
│           └── Pagination
│       └── Modals
│           ├── MovieDetail
│           └── AdvancedSearch
```

### 3. Data Flow
```
User Input → Component → Hook → Service → API
                                    ↓
User sees ← Component ← Hook ← Service ← API Response
```

### 4. State Management
- **Local State**: useState untuk state komponen spesifik
- **Context State**: useApp() untuk state global
- **Persisted State**: localStorage untuk data permanen

## 🔄 Cara Menambah Fitur Baru

### 1. Menambah Komponen Baru
```javascript
// src/components/[feature-name]/[ComponentName].js
import React from 'react';

function ComponentName({ props }) {
  // Component logic
  return <div>Component JSX</div>;
}

export default ComponentName;
```

### 2. Menambah Custom Hook
```javascript
// src/hooks/use[FeatureName].js
import { useState, useEffect } from 'react';

export const useFeatureName = () => {
  const [state, setState] = useState(initialValue);
  // Hook logic
  return { state, functions };
};
```

### 3. Menambah Service
```javascript
// src/services/[serviceName].js
import { API_URL } from '../constants/config';

export const serviceName = {
  methodName: async (params) => {
    const response = await fetch(`${API_URL}...`);
    const data = await response.json();
    return { success, data, error };
  },
};
```

### 4. Menambah Utility
```javascript
// src/utils/[utilityName].js
export const utilityFunction = (params) => {
  // Utility logic
  return result;
};
```

### 5. Update Constants
```javascript
// src/constants/config.js
export const NEW_CONSTANT = 'value';
```

### 6. Integrasikan ke App
```javascript
// src/App.js
import NewComponent from './components/new/NewComponent';
// Use in JSX
```

## 📝 Best Practices

### Naming Convention
- **Components**: PascalCase (e.g., `MovieCard.js`)
- **Hooks**: camelCase dengan prefix `use` (e.g., `useMovies.js`)
- **Services**: camelCase (e.g., `movieService.js`)
- **Utils**: camelCase (e.g., `localStorage.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_KEY`)

### File Organization
- Satu komponen per file
- Hook di folder hooks/
- Utility di folder utils/
- Service di folder services/
- Constants di folder constants/

### Component Structure
```javascript
// 1. Imports
import React from 'react';
import OtherComponent from './OtherComponent';

// 2. Component function
function MyComponent({ props }) {
  // 3. Hooks
  const [state, setState] = useState();
  
  // 4. Functions
  const handleClick = () => {};
  
  // 5. Render
  return <div>JSX</div>;
}

// 6. Export
export default MyComponent;
```

## 🔍 Dependency Map

```
App.js
├── AppContext (Context)
├── SearchBar, AdvancedSearch, SearchHistory (Search)
├── MovieCard, MovieDetail (Movies)
├── Filters (Filter)
├── Pagination (Pagination)
└── DarkModeToggle, DataManagement (Settings)

Hooks Dependencies:
├── useMovies → movieService
├── useMovieCollections → useLocalStorage
├── useSearchHistory → useLocalStorage
└── useDarkMode → useLocalStorage

Services Dependencies:
└── movieService → config (API_KEY, API_URL)
```

## 📊 File Statistics

- **Total Components**: 16 files
- **Total Hooks**: 5 files
- **Total Services**: 1 file
- **Total Utils**: 2 files
- **Total Constants**: 1 file
- **Total Context**: 1 file
- **Total**: ~26 source files

---

**Last Updated**: Struktur ini sesuai dengan versi terbaru aplikasi.

**Note**: Struktur ini dapat berkembang seiring dengan penambahan fitur baru. Pastikan untuk update dokumentasi ini jika ada perubahan struktur folder.
