# Panduan Setup API OMDB 🔑

Panduan lengkap untuk mendapatkan dan mengkonfigurasi API key dari OMDB API.

## 📋 Daftar Isi

- [Mendapatkan API Key](#mendapatkan-api-key)
- [Konfigurasi API Key](#konfigurasi-api-key)
- [Menguji API Key](#menguji-api-key)
- [Troubleshooting](#troubleshooting)
- [Keterbatasan API](#keterbatasan-api)

## 🔑 Mendapatkan API Key

### Langkah 1: Kunjungi Website OMDB
Buka browser Anda dan kunjungi:
**http://www.omdbapi.com/apikey.aspx**

### Langkah 2: Pilih Tipe API Key
OMDB menyediakan 2 tipe API key:

#### Free API Key (Gratis)
- ✅ Gratis untuk selamanya
- ⚠️ **Batas: 1,000 request per hari**
- ✅ Cocok untuk development dan testing
- ✅ Cocok untuk personal project

#### Basic API Key (Berbayar)
- 💰 $1 per bulan
- ✅ **Batas: 50,000 request per hari**
- ✅ Cocok untuk production
- ✅ Cocok untuk aplikasi dengan banyak pengguna

**Rekomendasi**: Mulai dengan Free API Key untuk development, upgrade jika perlu.

### Langkah 3: Daftar Akun
1. Klik "FREE" atau "BASIC" sesuai kebutuhan
2. Isi form registrasi:
   - **Name**: Nama Anda
   - **Email**: Email yang valid
   - **Password**: Password yang kuat
3. Klik "REGISTER"
4. Cek email Anda untuk aktivasi

### Langkah 4: Aktivasi Akun
1. Buka email dari OMDB
2. Klik link aktivasi
3. Setelah aktivasi, login ke website OMDB

### Langkah 5: Dapatkan API Key
1. Login di **http://www.omdbapi.com/apikey.aspx**
2. Di dashboard, Anda akan melihat API key Anda
3. **Copy API key** (contoh: `8bc427e5`)

## ⚙️ Konfigurasi API Key

### Lokasi File Konfigurasi
API key diatur di file:
**`.env`** (di root project)

### Cara Mengkonfigurasi

1. **Copy file template:**
```bash
# Di root project, copy .env.example ke .env
cp .env.example .env
```

Atau buat file `.env` baru di root project.

2. **Buka file `.env` dan isi dengan konfigurasi API:**
```env
# OMDB API Configuration
# Dapatkan API key dari: http://www.omdbapi.com/apikey.aspx
REACT_APP_OMDB_API_KEY=8bc427e5  # ← Ganti dengan API key Anda
REACT_APP_OMDB_API_BASE_URL=http://www.omdbapi.com/  # Base URL API (opsional, default sudah diset)
```

3. **Restart development server:**
```bash
# Stop server (Ctrl+C) lalu jalankan lagi
npm start
```

### ⚠️ PENTING: Format API Key

**✅ BENAR** - Hanya masukkan API key-nya saja:
```env
REACT_APP_OMDB_API_KEY=8bc427e5
```

**❌ SALAH** - Jangan masukkan URL lengkap:
```env
# ❌ JANGAN LAKUKAN INI
REACT_APP_OMDB_API_KEY=http://www.omdbapi.com/?i=tt3896198&apikey=8bc427e5
REACT_APP_OMDB_API_KEY=www.omdbapi.com/apikey=8bc427e5
REACT_APP_OMDB_API_KEY=?apikey=8bc427e5
```

### Contoh File Setelah Dikonfigurasi

**File `.env`:**
```env
# OMDB API Configuration
# Dapatkan API key dari: http://www.omdbapi.com/apikey.aspx
REACT_APP_OMDB_API_KEY=8bc427e5
REACT_APP_OMDB_API_BASE_URL=http://www.omdbapi.com/
```

**File `src/constants/config.js` (otomatis membaca dari .env):**
```javascript
// API Configuration
// Semua konfigurasi API diambil dari environment variables di file .env
export const API_KEY = process.env.REACT_APP_OMDB_API_KEY || '';
export const API_BASE_URL = process.env.REACT_APP_OMDB_API_BASE_URL || 'http://www.omdbapi.com/';
export const API_URL = `${API_BASE_URL}?apikey=${API_KEY}&`;
```

## 🧪 Menguji API Key

### Cara 1: Test di Browser
1. Buka browser
2. Ketik URL berikut (ganti `YOUR_API_KEY` dengan API key Anda):
```
http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=batman
```

3. Jika berhasil, Anda akan melihat JSON response dengan data film

### Cara 2: Test di Aplikasi
1. Setelah mengkonfigurasi API key, jalankan aplikasi:
```bash
npm start
```

2. Ketik nama film di search bar (contoh: "batman")
3. Jika API key benar, film akan muncul
4. Jika API key salah atau expired, akan muncul error

### Error yang Mungkin Muncul

#### Error: "Invalid API key!"
**Solusi**: 
- Pastikan API key sudah benar
- Pastikan hanya memasukkan key-nya saja, bukan URL
- Cek apakah API key sudah diaktivasi

#### Error: "Request limit reached!"
**Solusi**:
- Anda sudah mencapai batas 1,000 request/hari
- Tunggu sampai besok atau upgrade ke Basic API

#### Error: "Network Error" atau "Failed to fetch"
**Solusi**:
- Cek koneksi internet
- Pastikan API URL benar
- Cek apakah website OMDB sedang down

## 🔧 Troubleshooting

### Masalah: API key tidak bekerja

**Penyebab umum:**
1. API key salah atau typo
2. API key belum diaktivasi
3. API key expired atau di-reset
4. Format API key salah (memasukkan URL lengkap)

**Solusi:**
1. Double-check API key di file `.env`
2. Pastikan variable name adalah `REACT_APP_OMDB_API_KEY` (dengan prefix REACT_APP_)
3. Restart development server setelah mengubah `.env`
4. Cek email untuk aktivasi
5. Dapatkan API key baru dari dashboard
6. Pastikan format hanya key-nya saja

### Masalah: Request limit reached

**Penyebab:**
- Sudah mencapai 1,000 request/hari (Free API)

**Solusi:**
1. Tunggu sampai reset (24 jam dari request pertama hari ini)
2. Upgrade ke Basic API ($1/bulan untuk 50,000 request/hari)
3. Optimasi aplikasi untuk mengurangi request:
   - Gunakan debounce yang lebih panjang
   - Cache hasil pencarian
   - Gunakan pagination dengan benar

### Masalah: CORS Error

**Penyebab:**
- Browser memblokir request ke OMDB API

**Solusi:**
- OMDB API support CORS untuk development
- Jika masih error, gunakan proxy atau backend API

## 📊 Keterbatasan API

### Free API Key
- ✅ **1,000 request per hari**
- ✅ Gratis selamanya
- ✅ Cocok untuk development
- ⚠️ Tidak cocok untuk production dengan banyak user

### Basic API Key ($1/bulan)
- ✅ **50,000 request per hari**
- ✅ Cocok untuk production
- ✅ Priority support

### Cara Menghitung Usage

Setiap kali user:
- Mencari film → 1 request
- Membuka detail film → 1 request
- Pagination → 1 request per halaman

**Contoh:**
- 100 user mencari 5 film/hari = 500 request
- 100 user melihat detail 5 film/hari = 500 request
- **Total**: 1,000 request/hari ✅ (masih dalam limit Free API)

## 🔒 Keamanan API Key

### ⚠️ PENTING: Jangan Share API Key

**Yang PERLU dilakukan:**
- ✅ Simpan API key di file `config.js` (tidak commit ke Git)
- ✅ Gunakan environment variables untuk production
- ✅ Jangan hardcode API key di frontend jika aplikasi public

**Yang JANGAN dilakukan:**
- ❌ Commit API key ke repository public (GitHub, GitLab, dll)
- ❌ Share API key di forum atau chat
- ❌ Hardcode API key di file yang di-commit

### Cara Aman untuk Production

#### Option 1: Environment Variables (Sudah Diterapkan)
```javascript
// src/constants/config.js
export const API_KEY = process.env.REACT_APP_OMDB_API_KEY || '';
```

Setup `.env` file:
```env
REACT_APP_OMDB_API_KEY=your-api-key-here
```

✅ File `.env` sudah ditambahkan ke `.gitignore` secara otomatis

#### Option 2: Backend Proxy
Gunakan backend sebagai proxy untuk menyembunyikan API key dari frontend.

### File .gitignore
✅ File `.env` sudah ditambahkan ke `.gitignore` secara otomatis, sehingga API key tidak akan ter-commit ke repository.

File yang di-ignore:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 📞 Support

Jika masih mengalami masalah:

1. **OMDB API Documentation**: http://www.omdbapi.com/
2. **OMDB API Forum**: Cek di website OMDB
3. **GitHub Issues**: Buat issue di repository project ini

## ✅ Checklist Setup

Gunakan checklist ini untuk memastikan setup sudah benar:

- [ ] Sudah daftar akun di OMDB API
- [ ] Sudah aktivasi email
- [ ] Sudah login dan dapat API key
- [ ] Sudah copy API key
- [ ] Sudah copy file `.env.example` ke `.env`
- [ ] Sudah buka file `.env` dan isi `REACT_APP_OMDB_API_KEY` dengan API key
- [ ] Sudah pastikan format hanya key-nya saja (bukan URL)
- [ ] Sudah restart development server setelah mengubah `.env`
- [ ] Sudah test di browser (opsional)
- [ ] Sudah jalankan aplikasi dan test pencarian
- [ ] Sudah pastikan file `.env` ada di `.gitignore` (tidak akan ter-commit)

---

**Selamat! Setup API key Anda sudah selesai! 🎉**

Jika semua sudah benar, aplikasi Movie Search App Anda siap digunakan.

