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
            ['email' => 'admin@akunpremium.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password123'),
                'is_admin' => true,
            ]
        );

        // 2. Seed Categories (Referensi Astastore.id)
        $aiBot = Category::updateOrCreate(['slug' => 'ai-bot'], ['name' => 'AI & Bot']);
        $streaming = Category::updateOrCreate(['slug' => 'movie-streaming'], ['name' => 'Movie & Streaming']);
        $design = Category::updateOrCreate(['slug' => 'design-editing'], ['name' => 'Design & Editing']);
        $productivity = Category::updateOrCreate(['slug' => 'productivity'], ['name' => 'Productivity & Office']);
        $music = Category::updateOrCreate(['slug' => 'music'], ['name' => 'Music']);
        $internet = Category::updateOrCreate(['slug' => 'internet-development'], ['name' => 'Internet & Development']);
        $smm = Category::updateOrCreate(['slug' => 'social-media-marketing'], ['name' => 'Social Media Marketing']);

        // 3. Seed Products & Packages (Referensi Astastore.id)

        // --- AI & BOT CATEGORY ---
        $chatgpt = Product::updateOrCreate(
            ['slug' => 'chatgpt-plus'],
            [
                'category_id' => $aiBot->id,
                'name' => 'ChatGPT Plus (GPT-4o & DALL-E)',
                'description' => 'Dapatkan akses prioritas ke GPT-4o, pembuatan gambar AI DALL-E 3, Web Browsing, Advanced Data Analysis, dan response time super cepat.',
                'is_active' => true,
                'badge' => 'TERLARIS'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $chatgpt->id, 'name' => '1 Bulan - Shared (Batas Pemakaian Bersama)'],
            ['price' => 35000, 'duration_days' => 30, 'description' => 'Akun bersama 4-5 user, batas limit prompt sesuai kapasitas GPT-4o', 'is_active' => true]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $chatgpt->id, 'name' => '1 Bulan - Private (Akun Pribadi)'],
            ['price' => 310000, 'duration_days' => 30, 'description' => 'Akun privat khusus milik Anda sendiri, garansi penuh 30 hari', 'is_active' => true]
        );

        $claude = Product::updateOrCreate(
            ['slug' => 'claude-pro'],
            [
                'category_id' => $aiBot->id,
                'name' => 'Claude Pro AI',
                'description' => 'Akses model Claude 3.5 Sonnet & Opus dengan pemrosesan dokumen/coding berkapasitas besar dan akurasi logika terbaik.',
                'is_active' => true,
                'badge' => 'HOT'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $claude->id, 'name' => '1 Bulan - Shared Account'],
            ['price' => 45000, 'duration_days' => 30, 'description' => 'Akses akun bersama dengan garansi 30 hari', 'is_active' => true]
        );

        $midjourney = Product::updateOrCreate(
            ['slug' => 'midjourney-pro'],
            [
                'category_id' => $aiBot->id,
                'name' => 'Midjourney Pro AI',
                'description' => 'Generator gambar AI paling populer untuk kebutuhan desain grafis, ilustrasi ultra-realistis, dan seni digital.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $midjourney->id, 'name' => '1 Bulan - Shared Fast Hours'],
            ['price' => 65000, 'duration_days' => 30, 'description' => 'Akses Fast GPU Mode di server Discord privat', 'is_active' => true]
        );

        // --- MOVIE & STREAMING CATEGORY ---
        $netflix = Product::updateOrCreate(
            ['slug' => 'netflix-premium'],
            [
                'category_id' => $streaming->id,
                'name' => 'Netflix Premium Ultra HD 4K',
                'description' => 'Nonton ribuan film, serial TV, anime, dan film eksklusif tanpa batasan dengan kualitas 4K Ultra HD & HDR.',
                'is_active' => true,
                'badge' => 'POPULER'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $netflix->id, 'name' => '1 Bulan - Shared (1 Profil / 1 Device)'],
            ['price' => 28000, 'duration_days' => 30, 'description' => '1 Profil khusus berpin di akun bersama', 'is_active' => true]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $netflix->id, 'name' => '1 Bulan - Private Account (4 Screen)'],
            ['price' => 150000, 'duration_days' => 30, 'description' => 'Akun utuh punya Anda sendiri (bisa buat 5 profil)', 'is_active' => true]
        );

        $disney = Product::updateOrCreate(
            ['slug' => 'disney-premium'],
            [
                'category_id' => $streaming->id,
                'name' => 'Disney+ Premium',
                'description' => 'Akses film Marvel, Star Wars, Pixar, Disney, dan bioskop lokal Indonesia dalam resolusi hingga 4K UHD.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $disney->id, 'name' => '1 Bulan - Shared (1 Device)'],
            ['price' => 25000, 'duration_days' => 30, 'description' => 'Login via nomor HP/OTP ke 1 device', 'is_active' => true]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $disney->id, 'name' => '1 Bulan - Private (No HP Anda)'],
            ['price' => 45000, 'duration_days' => 30, 'description' => 'Diaktifkan langsung di nomor HP pribadi Anda', 'is_active' => true]
        );

        $youtube = Product::updateOrCreate(
            ['slug' => 'youtube-premium'],
            [
                'category_id' => $streaming->id,
                'name' => 'YouTube Premium & Music',
                'description' => 'Nikmati nonton video YouTube tanpa gangguan iklan, putar di latar belakang (Background Play), dan dapatkan akses YouTube Music Premium.',
                'is_active' => true,
                'badge' => 'DISKON'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $youtube->id, 'name' => '1 Bulan - Invite Family Plan (Email Anda)'],
            ['price' => 12000, 'duration_days' => 30, 'description' => 'Undangan Family Plan ke email Google pribadi Anda', 'is_active' => true]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $youtube->id, 'name' => '1 Tahun - Individual Plan'],
            ['price' => 95000, 'duration_days' => 365, 'description' => 'Langganan 1 tahun penuh tanpa perlu ganti tim family', 'is_active' => true]
        );

        $viu = Product::updateOrCreate(
            ['slug' => 'viu-premium'],
            [
                'category_id' => $streaming->id,
                'name' => 'Viu Premium VIP',
                'description' => 'Streaming Drama Korea (Drakor), Variety Show, dan Film Asia subtitle Indonesia paling update.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $viu->id, 'name' => '1 Bulan - Private Account'],
            ['price' => 15000, 'duration_days' => 30, 'description' => 'Akun privat Viu VIP 30 hari', 'is_active' => true]
        );

        $iqiyi = Product::updateOrCreate(
            ['slug' => 'iqiyi-vip'],
            [
                'category_id' => $streaming->id,
                'name' => 'iQIYI VIP Premium',
                'description' => 'Nonton Drama Tiongkok (Drachin), Anime terbaru, dan Show eksklusif iQIYI tanpa iklan dengan kualitas 1080p/4K.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $iqiyi->id, 'name' => '1 Bulan - Standard VIP'],
            ['price' => 11000, 'duration_days' => 30, 'description' => 'Akses VIP Standard iQIYI 30 hari', 'is_active' => true]
        );

        $dramabox = Product::updateOrCreate(
            ['slug' => 'dramabox-premium'],
            [
                'category_id' => $streaming->id,
                'name' => 'DramaBox Premium VIP',
                'description' => 'Nonton ribuan mini series drama romantis dan aksi viral dari DramaBox tanpa koin / unlock episode.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $dramabox->id, 'name' => '1 Bulan - VIP Full Access'],
            ['price' => 34000, 'duration_days' => 30, 'description' => 'Unlock semua episode DramaBox 30 hari', 'is_active' => true]
        );

        // --- DESIGN & EDITING CATEGORY ---
        $canva = Product::updateOrCreate(
            ['slug' => 'canva-pro'],
            [
                'category_id' => $design->id,
                'name' => 'Canva Pro',
                'description' => 'Akses ribuan template pro, Hapus Latar Belakang foto otomatis, unduh resolusi tinggi & transparansi SVG, serta akses stok foto/video premium.',
                'is_active' => true,
                'badge' => 'BEST SELLER'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $canva->id, 'name' => '1 Bulan - Undangan Email Sendiri'],
            ['price' => 10000, 'duration_days' => 30, 'description' => 'Menggunakan email Canva pribadi Anda via link invite tim', 'is_active' => true]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $canva->id, 'name' => '1 Tahun - Undangan Email Sendiri'],
            ['price' => 49000, 'duration_days' => 365, 'description' => 'Canva Pro 1 tahun penuh bergaransi replacement', 'is_active' => true]
        );

        $capcut = Product::updateOrCreate(
            ['slug' => 'capcut-pro'],
            [
                'category_id' => $design->id,
                'name' => 'CapCut Pro',
                'description' => 'Akses efek video premium, AI caption otomatis, penghilang background video cerdas, & ekspor tanpa watermark di Mobile/PC.',
                'is_active' => true,
                'badge' => 'TRENDING'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $capcut->id, 'name' => '1 Bulan - Pro Shared'],
            ['price' => 25000, 'duration_days' => 30, 'description' => 'Akses fitur CapCut Pro di 1 device', 'is_active' => true]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $capcut->id, 'name' => '1 Tahun - Pro Shared'],
            ['price' => 85000, 'duration_days' => 365, 'description' => 'CapCut Pro 1 tahun bergaransi', 'is_active' => true]
        );

        $adobe = Product::updateOrCreate(
            ['slug' => 'adobe-creative-cloud'],
            [
                'category_id' => $design->id,
                'name' => 'Adobe Creative Cloud (All Apps)',
                'description' => 'Akses 20+ aplikasi profesional Adobe (Photoshop, Illustrator, Premiere Pro, After Effects, Lightroom, Acrobat Pro) + 80GB Cloud Storage.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $adobe->id, 'name' => '1 Bulan - All Apps (Email Anda)'],
            ['price' => 75000, 'duration_days' => 30, 'description' => 'Lisensi resmi di email Adobe Anda sendiri', 'is_active' => true]
        );

        // --- PRODUCTIVITY & OFFICE CATEGORY ---
        $office = Product::updateOrCreate(
            ['slug' => 'microsoft-365'],
            [
                'category_id' => $productivity->id,
                'name' => 'Microsoft 365 + 1TB OneDrive',
                'description' => 'Akses resmi aplikasi Microsoft Office (Word, Excel, PowerPoint, Outlook) di 5 device (Windows/Mac/iOS/Android) + Penyimpanan Cloud 1TB OneDrive.',
                'is_active' => true,
                'badge' => 'BEST VALUE'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $office->id, 'name' => '1 Tahun - Custom Username (Email Baru)'],
            ['price' => 15000, 'duration_days' => 365, 'description' => 'Akun Microsoft baru dengan nama Anda sendiri + 1TB OneDrive', 'is_active' => true]
        );

        $zoom = Product::updateOrCreate(
            ['slug' => 'zoom-pro'],
            [
                'category_id' => $productivity->id,
                'name' => 'Zoom Pro (100 Peserta / Unlimited Meeting)',
                'description' => 'Meeting online tanpa batas waktu 40 menit, hingga 100 peserta, fitur Co-Host, breakout rooms, & recording cloud.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $zoom->id, 'name' => '1 Bulan - Lisensi Zoom Pro (Email Anda)'],
            ['price' => 15000, 'duration_days' => 30, 'description' => 'Di-upgrade langsung pada email akun Zoom pribadi Anda', 'is_active' => true]
        );

        $quillbot = Product::updateOrCreate(
            ['slug' => 'quillbot-premium'],
            [
                'category_id' => $productivity->id,
                'name' => 'QuillBot Premium',
                'description' => 'Alat paraphrase AI terbaik untuk menyusun karya ilmiah, tugas akhir, artikel, Grammar Checker, & Plagiarism Checker.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $quillbot->id, 'name' => '1 Bulan - Shared Account'],
            ['price' => 20000, 'duration_days' => 30, 'description' => 'Akses akun QuillBot Premium 30 hari', 'is_active' => true]
        );

        $turnitin = Product::updateOrCreate(
            ['slug' => 'turnitin-student'],
            [
                'category_id' => $productivity->id,
                'name' => 'Turnitin Student Account (No Repository)',
                'description' => 'Cek kemiripan dokumen/skripsi/tesis di Turnitin resmi tanpa tersimpan di database repositori.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $turnitin->id, 'name' => '1 Bulan - Slot Class Student'],
            ['price' => 25000, 'duration_days' => 30, 'description' => 'Bisa cek dokumen secara mandiri kapan saja', 'is_active' => true]
        );

        // --- MUSIC CATEGORY ---
        $spotify = Product::updateOrCreate(
            ['slug' => 'spotify-premium'],
            [
                'category_id' => $music->id,
                'name' => 'Spotify Premium',
                'description' => 'Streaming jutaan lagu tanpa iklan, dengarkan offline, putar acak, dan kualitas audio HD di HP, TV, dan laptop.',
                'is_active' => true,
                'badge' => 'TERLARIS'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $spotify->id, 'name' => '1 Bulan - Plan Family (Email Anda)'],
            ['price' => 15000, 'duration_days' => 30, 'description' => 'Gabung tim Family Plan pakai email Spotify Anda', 'is_active' => true]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $spotify->id, 'name' => '1 Bulan - Individual Private Account'],
            ['price' => 45000, 'duration_days' => 30, 'description' => 'Akun privat individu 100% milik Anda', 'is_active' => true]
        );

        $appleMusic = Product::updateOrCreate(
            ['slug' => 'apple-music'],
            [
                'category_id' => $music->id,
                'name' => 'Apple Music Premium',
                'description' => 'Dengarkan jutaan lagu dalam kualitas Lossless Audio dan Dolby Atmos Spatial Audio di iOS & Android.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $appleMusic->id, 'name' => '1 Bulan - Family Sharing (Apple ID)'],
            ['price' => 6000, 'duration_days' => 30, 'description' => 'Invite link ke Apple ID pribadi Anda', 'is_active' => true]
        );

        // --- INTERNET & DEVELOPMENT CATEGORY ---
        $nordvpn = Product::updateOrCreate(
            ['slug' => 'nordvpn-premium'],
            [
                'category_id' => $internet->id,
                'name' => 'NordVPN Premium',
                'description' => 'VPN super cepat untuk perlindungan privasi internet, membuka akses situs terblokir, & streaming geoblock.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $nordvpn->id, 'name' => '1 Bulan - Shared Account'],
            ['price' => 25000, 'duration_days' => 30, 'description' => 'Akses NordVPN Premium di 1 device', 'is_active' => true]
        );

        $github = Product::updateOrCreate(
            ['slug' => 'github-copilot'],
            [
                'category_id' => $internet->id,
                'name' => 'GitHub Pro & Copilot AI',
                'description' => 'Aktivasi lisensi GitHub Pro dan Asisten Koding AI GitHub Copilot di VS Code / JetBrains untuk pengembang software.',
                'is_active' => true,
                'badge' => 'PRO'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $github->id, 'name' => '1 Bulan - Copilot AI Student/Pro'],
            ['price' => 40000, 'duration_days' => 30, 'description' => 'Diaktifkan pada username GitHub pribadi Anda', 'is_active' => true]
        );

        // --- SOCIAL MEDIA MARKETING CATEGORY ---
        $discord = Product::updateOrCreate(
            ['slug' => 'discord-nitro'],
            [
                'category_id' => $smm->id,
                'name' => 'Discord Nitro (Boost Edition)',
                'description' => 'Dapatkan 2 Server Boosts, emoji kustom di mana saja, avatar bergerak, streaming HD 1080p 60fps, dan badge Nitro.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $discord->id, 'name' => '1 Bulan - Gift Link / Account'],
            ['price' => 25000, 'duration_days' => 30, 'description' => 'Dikirim via Gift Link atau aktivasi akun', 'is_active' => true]
        );

        $twitterX = Product::updateOrCreate(
            ['slug' => 'x-premium-plus'],
            [
                'category_id' => $smm->id,
                'name' => 'X PREMIUM PLUS (Twitter Blue Verified)',
                'description' => 'Dapatkan Centang Biru (Verified Checkmark), posting tulisan panjang & video 1080p, bebas iklan di For You, & akses Grok AI.',
                'is_active' => true,
                'badge' => 'VIP'
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $twitterX->id, 'name' => '1 Bulan - Aktivasi di Akun X Anda'],
            ['price' => 210000, 'duration_days' => 30, 'description' => 'Proses aktivasi langsung di akun X (Twitter) pribadi Anda', 'is_active' => true]
        );

        $igFollower = Product::updateOrCreate(
            ['slug' => 'follower-instagram'],
            [
                'category_id' => $smm->id,
                'name' => 'FOLLOWER INSTAGRAM',
                'description' => 'Layanan penambah follower Instagram real/aktif untuk meningkatkan kredibilitas akun jualan atau personal branding.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $igFollower->id, 'name' => '1.000 Follower High Quality'],
            ['price' => 25000, 'duration_days' => 365, 'description' => 'Proses pengerjaan cepat 1x24 jam, hanya butuh username (tanpa password)', 'is_active' => true]
        );

        $fbFollower = Product::updateOrCreate(
            ['slug' => 'follower-facebook'],
            [
                'category_id' => $smm->id,
                'name' => 'FOLLOWER FACEBOOK',
                'description' => 'Layanan penambah pengikut profil / fanspage Facebook secara aman tanpa membutuhkan kata sandi.',
                'is_active' => true,
            ]
        );
        ProductPackage::updateOrCreate(
            ['product_id' => $fbFollower->id, 'name' => '1.000 Follower Fanspage / Profil'],
            ['price' => 30000, 'duration_days' => 365, 'description' => 'Proses pengiriman follower bertahap & aman', 'is_active' => true]
        );

        // 4. Seed Payment Methods
        PaymentMethod::updateOrCreate(
            ['name' => 'Bank BCA'],
            [
                'account_number' => '8720192831',
                'account_name' => 'PT Prayoga Tech Indonesia',
                'instructions' => 'Kirim transfer via ATM, Mobile Banking, atau Internet Banking ke nomor rekening BCA yang tertera. Simpan struk bukti transfer untuk diunggah.',
                'is_active' => true,
            ]
        );
        PaymentMethod::updateOrCreate(
            ['name' => 'Bank Mandiri'],
            [
                'account_number' => '1310029381928',
                'account_name' => 'PT Prayoga Tech Indonesia',
                'instructions' => 'Kirim transfer via Livin by Mandiri atau ATM. Harap gunakan nominal transfer yang tepat.',
                'is_active' => true,
            ]
        );
        PaymentMethod::updateOrCreate(
            ['name' => 'E-Wallet Dana / QRIS'],
            [
                'account_number' => '081234567890',
                'account_name' => 'Prayoga Tech Official',
                'instructions' => 'Kirim saldo Dana ke nomor akun Dana di atas, atau scan QRIS yang muncul di halaman invoice.',
                'is_active' => true,
            ]
        );

        // 5. Seed General Settings
        Setting::updateOrCreate(['key' => 'whatsapp_number'], ['value' => '628123456789']);
        Setting::updateOrCreate(['key' => 'store_name'], ['value' => 'Prayoga Tech']);
        Setting::updateOrCreate(['key' => 'store_description'], ['value' => 'Penyedia Layanan Jasa Pembuatan Aplikasi Website & Mobile, UI/UX, Data Analyst, dan Akun Premium Terpercaya & Bergaransi']);
    }
}
