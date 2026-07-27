# Prayoga Tech Shop

> **Prayoga Tech** - Platform E-Commerce Penjualan Akun & Aplikasi Premium serta Layanan Jasa Pembuatan Aplikasi Website (Laravel/React), Mobile App (Android/iOS), UI/UX Design, dan Data Analyst.

---

## 🚀 Fitur Utama

- **Katalog Produk Digital & Akun Premium**: Pilihan terlengkap dari AI & Bot (ChatGPT Plus, Claude Pro), Streaming (Netflix 4K, Disney+, Spotify), Desain (Canva Pro, CapCut, Adobe CC), dan Produktivitas (Microsoft 365, Zoom Pro).
- **Layanan Jasa Pembuatan Aplikasi**: Seksi Software House kustom untuk pemesanan website, mobile apps, UI/UX Figma, dan Data Analysis.
- **Sistem Keranjang & Checkout Transparan**: Pemesanan mudah dengan verifikasi pembayaran otomatis/manual.
- **Admin Management Panel**: Dashboard admin lengkap untuk mengelola Produk, Kategori, Banner Promo, Diskon, Metode Pembayaran, Pesanan Customer, dan Pengaturan Toko.

---

## 🛠️ Teknologi & Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React + Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL / PostgreSQL
- **Bundler**: Vite

---

## 📦 Panduan Instalasi Lokal

```bash
# 1. Clone repository
git clone https://github.com/prayoga23/prayoga-tech-shop.git
cd prayoga-tech-shop

# 2. Install dependensi PHP & Node
composer install
npm install

# 3. Konfigurasi Environment
cp .env.example .env
php artisan key:generate

# 4. Migrasi & Seeder Database
php artisan migrate:fresh --seed

# 5. Link Storage Public
php artisan storage:link

# 6. Jalankan Server Lokal
php artisan serve
npm run dev
```

---

© 2026 **Prayoga Tech**. All rights reserved.
