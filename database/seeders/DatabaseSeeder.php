<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\ProductPackage;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@prayogatech.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password123'),
                'is_admin' => true,
            ]
        );

        // 2. Seed Categories (Fokus Jasa Pembuatan Aplikasi Website & Android)
        $webCategory = Category::updateOrCreate(['slug' => 'jasa-pembuatan-website'], ['name' => 'Jasa Pembuatan Website']);
        $androidCategory = Category::updateOrCreate(['slug' => 'jasa-pembuatan-android'], ['name' => 'Jasa Pembuatan Aplikasi Android']);
        $uiuxCategory = Category::updateOrCreate(['slug' => 'ui-ux-design'], ['name' => 'UI/UX Design & Prototype']);
        $maintenanceCategory = Category::updateOrCreate(['slug' => 'maintenance-cloud'], ['name' => 'Maintenance & Cloud Server']);

        // 3. Seed Products & Packages

        // --- 1. JASA PEMBUATAN WEBSITE ---
        $webProfile = Product::updateOrCreate(
            ['slug' => 'website-company-profile-landing-page'],
            [
                'category_id' => $webCategory->id,
                'name' => 'Website Company Profile & Landing Page',
                'description' => 'Jasa pembuatan website profil perusahaan, landing page promosi, sekolah, institusi, atau portofolio pribadi modern bergaransi resmi.',
                'is_active' => true,
                'badge' => 'BEST SELLER'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $webProfile->id, 'name' => 'Paket Basic - Landing Page Single Page'],
            [
                'price' => 950000,
                'duration_days' => 3,
                'description' => 'Desain modern responsive, Gratis Domain .com (1 thn), CTA WhatsApp, Form kontak, SEO basic, pengerjaan 3 hari.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $webProfile->id, 'name' => 'Paket Pro - Multi-Page Company Profile + CMS Admin'],
            [
                'price' => 1850000,
                'duration_days' => 7,
                'description' => 'Website multi halaman (Beranda, Layanan, Tentang, Portofolio, Kontak), Gratis Domain .com & Cloud Hosting 1 thn, Admin Panel CMS untuk ubah isi konten, Garansi 3 Bulan.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $webProfile->id, 'name' => 'Paket Enterprise - Custom Layout + Fast Speed + Garansi 6 Bulan'],
            [
                'price' => 3500000,
                'duration_days' => 10,
                'description' => 'Custom desain eksklusif (No Template), Animasi modern, Optimasi kecepatan 90+ PageSpeed, Multi Bahasa, Garansi 6 Bulan & Source Code.',
                'is_active' => true
            ]
        );

        $webShop = Product::updateOrCreate(
            ['slug' => 'website-toko-online-ecommerce'],
            [
                'category_id' => $webCategory->id,
                'name' => 'Website Toko Online & E-Commerce',
                'description' => 'Sistem website penjualan produk lengkap dengan katalog, keranjang belanja, penghitungan ongkir otomatis, dan manajemen produk.',
                'is_active' => true,
                'badge' => 'POPULER'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $webShop->id, 'name' => 'Paket Starter Shop - Checkout WhatsApp & Bank Direct'],
            [
                'price' => 2200000,
                'duration_days' => 7,
                'description' => 'Katalog produk unlimited, keranjang belanja, checkout via WhatsApp & Transfer Bank, Panel Admin kelola stok & pesanan, Garansi 3 bulan.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $webShop->id, 'name' => 'Paket Pro Shop - Multi Payment Gateway + Auto Ongkir'],
            [
                'price' => 4500000,
                'duration_days' => 14,
                'description' => 'Integrasi Payment Gateway (Midtrans/Xendit/QRIS), Hitung Ongkir Otomatis RajaOngkir (JNE, TIKI, POS), Laporan Penjualan Grafik, Notification Email & WA.',
                'is_active' => true
            ]
        );

        $webSystem = Product::updateOrCreate(
            ['slug' => 'aplikasi-web-custom-sistem-informasi-saas'],
            [
                'category_id' => $webCategory->id,
                'name' => 'Aplikasi Web Custom & Sistem Informasi (Laravel / React)',
                'description' => 'Pengembangan aplikasi web berbasis Laravel / React / Next.js untuk sistem kasir (POS), inventaris, CRM, ERP, akademik, atau SaaS bisnis.',
                'is_active' => true,
                'badge' => 'CUSTOM'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $webSystem->id, 'name' => 'Paket MVP System - Sistem Kasir / Inventaris / Admin Dashboard'],
            [
                'price' => 5000000,
                'duration_days' => 14,
                'description' => 'Modul autentikasi, hak akses (RBAC), fitur CRUD data lengkap, ekspor PDF/Excel, laporan analitik, database MySQL/PostgreSQL, Source Code 100%.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $webSystem->id, 'name' => 'Paket Enterprise SaaS & Custom Complex System'],
            [
                'price' => 9500000,
                'duration_days' => 21,
                'description' => 'Pengembangan aplikasi skala besar, RESTful API backend, Arsitektur modern, High Security, Multi Role, Setup VPS Dedicated & Garansi 1 Tahun.',
                'is_active' => true
            ]
        );

        // --- 2. JASA PEMBUATAN APLIKASI ANDROID ---
        $androidApp = Product::updateOrCreate(
            ['slug' => 'jasa-pembuatan-aplikasi-android-flutter-native'],
            [
                'category_id' => $androidCategory->id,
                'name' => 'Aplikasi Mobile Android (Flutter / Android Native)',
                'description' => 'Jasa pembuatan aplikasi Android berperforma tinggi, ringan, antarmuka modern, responsif untuk kebutuhan bisnis, startup, & toko online.',
                'is_active' => true,
                'badge' => 'HOT'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $androidApp->id, 'name' => 'Paket Starter Android App (WebView / App Profil)'],
            [
                'price' => 2500000,
                'duration_days' => 7,
                'description' => 'Konversi website ke aplikasi Android Native WebView / Profil App, Splash Screen, Custom Icon, Push Notification Firebase, File APK & AAB.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $androidApp->id, 'name' => 'Paket Business Android App + Upload Google Play Store'],
            [
                'price' => 4800000,
                'duration_days' => 14,
                'description' => 'Full Custom UI/UX Android App (Flutter), Integrasi REST API Backend, Autentikasi Google/OTP, Rilis Resmi di Google Play Store.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $androidApp->id, 'name' => 'Paket Enterprise Mobile Cross-Platform (Android & iOS)'],
            [
                'price' => 8500000,
                'duration_days' => 25,
                'description' => 'Support Android & iOS (Flutter Cross-Platform), Real-time Chat/Notification, Integration Payment Gateway, Source Code Lengkap & Garansi 1 Tahun.',
                'is_active' => true
            ]
        );

        $bundleWebAndroid = Product::updateOrCreate(
            ['slug' => 'bundle-website-admin-aplikasi-android-sync'],
            [
                'category_id' => $androidCategory->id,
                'name' => 'Bundle Website Admin Panel + Aplikasi Android User',
                'description' => 'Paket terpadu pembuatan Website Admin Panel untuk pengelola & Aplikasi Mobile Android untuk pelanggan yang terhubung real-time.',
                'is_active' => true,
                'badge' => 'BEST VALUE'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $bundleWebAndroid->id, 'name' => 'Paket Dual-Platform Startup (Website + Android App)'],
            [
                'price' => 6500000,
                'duration_days' => 18,
                'description' => 'Website Dashboard Admin Panel (Laravel/React) + Aplikasi Android User (Flutter), Sinkronisasi Database Realtime, Free Domain .com & Cloud Server 1 thn.',
                'is_active' => true
            ]
        );

        // --- 3. UI/UX DESIGN & PROTOTYPE ---
        $uiuxDesign = Product::updateOrCreate(
            ['slug' => 'desain-ui-ux-aplikasi-android-website-figma'],
            [
                'category_id' => $uiuxCategory->id,
                'name' => 'Desain UI/UX Aplikasi Android & Website (Figma)',
                'description' => 'Jasa perancangan tampilan antarmuka (UI) dan pengalaman pengguna (UX) aplikasi mobile & website yang ramah pengguna, modern, dan clickable prototype.',
                'is_active' => true,
                'badge' => 'DESIGN'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $uiuxDesign->id, 'name' => 'Paket UI/UX Landing Page / Mobile Screen Basic'],
            [
                'price' => 600000,
                'duration_days' => 3,
                'description' => 'Wireframe + Desain visual 5-8 Halaman Figma (Mobile/Desktop), UI Kit, Component Design & Export SVG/PNG.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $uiuxDesign->id, 'name' => 'Paket UI/UX Complete App System + Clickable Prototype'],
            [
                'price' => 1500000,
                'duration_days' => 7,
                'description' => 'Desain sistem lengkap (hingga 20 screen), Figma Interactive Clickable Prototype, Design System Guidelines, Handover untuk Developer.',
                'is_active' => true
            ]
        );

        // --- 4. MAINTENANCE & CLOUD VPS ---
        $maintenance = Product::updateOrCreate(
            ['slug' => 'jasa-maintenance-optimasi-cloud-vps-server'],
            [
                'category_id' => $maintenanceCategory->id,
                'name' => 'Jasa Maintenance, Optimasi & Cloud VPS Server',
                'description' => 'Layanan pemeliharaan sistem rutin, backup otomatis, penanganan bug, optimasi kecepatan, serta instalasi Cloud VPS server.',
                'is_active' => true,
                'badge' => 'SUPPORT'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $maintenance->id, 'name' => 'Paket Pemeliharaan Rutin Monthly (1 Bulan)'],
            [
                'price' => 350000,
                'duration_days' => 30,
                'description' => 'Backup database rutin minggu, perbaikan bug minor, pembaruan keamanan, garansi uptime 99.9%.',
                'is_active' => true
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $maintenance->id, 'name' => 'Paket Setup Server Cloud VPS + SSL + CI/CD Deploy'],
            [
                'price' => 750000,
                'duration_days' => 2,
                'description' => 'Instalasi & konfigurasi Nginx/Apache di VPS (DigitalOcean/AWS/Linode), SSL HTTPS Gratis, Optimasi Database & Domain Setup.',
                'is_active' => true
            ]
        );

        // 4. Seed Payment Methods
        PaymentMethod::updateOrCreate(
            ['name' => 'Bank BNI'],
            [
                'account_number' => '1483206378',
                'account_name' => 'Prayoga Nugroho Pangestu',
                'instructions' => 'Kirim transfer via Mobile Banking BNI, ATM, atau Internet Banking ke nomor rekening 1483206378 a.n. Prayoga Nugroho Pangestu.',
                'is_active' => true,
            ]
        );
        PaymentMethod::updateOrCreate(
            ['name' => 'Dana'],
            [
                'account_number' => '0882008684316',
                'account_name' => 'Prayoga Nugroho Pangestu',
                'instructions' => 'Kirim saldo DANA ke nomor 0882008684316 a.n. Prayoga Nugroho Pangestu.',
                'is_active' => true,
            ]
        );
        PaymentMethod::updateOrCreate(
            ['name' => 'ShopeePay'],
            [
                'account_number' => '08990703408',
                'account_name' => 'Prayoga Nugroho Pangestu',
                'instructions' => 'Kirim saldo ShopeePay ke nomor 08990703408 a.n. Prayoga Nugroho Pangestu.',
                'is_active' => true,
            ]
        );
        PaymentMethod::updateOrCreate(
            ['name' => 'GoPay'],
            [
                'account_number' => '08990703408',
                'account_name' => 'Prayoga Nugroho Pangestu',
                'instructions' => 'Kirim saldo GoPay ke nomor 08990703408 a.n. Prayoga Nugroho Pangestu.',
                'is_active' => true,
            ]
        );

        // 5. Seed General Settings
        Setting::updateOrCreate(['key' => 'whatsapp_number'], ['value' => '628123456789']);
        Setting::updateOrCreate(['key' => 'store_name'], ['value' => 'Prayoga Tech Software House']);
        Setting::updateOrCreate(['key' => 'store_logo_path'], ['value' => 'logo.png']);
        Setting::updateOrCreate(['key' => 'store_description'], ['value' => 'Penyedia Jasa Pembuatan Aplikasi Website & Android Profesional, Cepat, Terpercaya, dan Bergaransi Resmi.']);
    }
}
