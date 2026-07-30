import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Welcome({ auth, products = [], categories = [], selectedCategory, search, settings, banners = [] }) {
    const [wishlist, setWishlist] = useState([]);

    // Quick Estimator State
    const [estPlatform, setEstPlatform] = useState('web'); // 'web', 'android', 'bundle'
    const [estCategory, setEstCategory] = useState('company'); // 'company', 'shop', 'system'
    const [estFeatures, setEstFeatures] = useState({
        admin: true,
        payment: false,
        notification: false,
        multilang: false,
        domain: true,
        playstore: false
    });

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(storedWishlist);
    }, []);

    const toggleWishlist = (productId, e) => {
        e.preventDefault();
        let updatedWishlist = [...wishlist];
        if (updatedWishlist.includes(productId)) {
            updatedWishlist = updatedWishlist.filter(id => id !== productId);
        } else {
            updatedWishlist.push(productId);
        }
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);
        window.dispatchEvent(new Event('wishlist-updated'));
    };

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    // Calculate Estimator Price
    const calculateEstimatedPrice = () => {
        let base = 950000;
        if (estPlatform === 'web') {
            if (estCategory === 'company') base = 1200000;
            if (estCategory === 'shop') base = 2500000;
            if (estCategory === 'system') base = 5000000;
        } else if (estPlatform === 'android') {
            base = 3500000;
        } else if (estPlatform === 'bundle') {
            base = 6500000;
        }

        if (estFeatures.payment) base += 1000000;
        if (estFeatures.notification) base += 500000;
        if (estFeatures.multilang) base += 750000;
        if (estFeatures.playstore) base += 600000;

        return base;
    };

    const whatsappNumber = settings?.whatsapp_number || '628123456789';

    // Static Portfolios for Showcase
    const portfolioShowcase = [
        {
            title: "Website Profil Institut Darul Falah",
            type: "Website & CMS",
            tech: ["Laravel", "Tailwind", "MySQL"],
            image: "/image/website_sekolah/oke.gif",
            link: "https://indafa.ac.id/"
        },
        {
            title: "Aplikasi Reading Log SMKN 3 Malang",
            type: "Web Application",
            tech: ["PHP", "JavaScript", "Bootstrap"],
            image: "/image/website_sekolah/website-sekolah.gif",
            link: "https://readinglogsmkn3malang.com/"
        },
        {
            title: "Aplikasi Kasir POS Toko Tiga Putri",
            type: "Web & POS System",
            tech: ["Laravel", "Tailwind CSS", "POS"],
            image: "/image/kasir/foto-slide.gif"
        },
        {
            title: "AHES Maps AR Mobile App",
            type: "Android App (Flutter)",
            tech: ["Flutter", "AR Navigation", "REST API"],
            image: "/image/Frame-6.png"
        },
        {
            title: "Marketplace E-Commerce Mobile",
            type: "Android & iOS App",
            tech: ["Flutter", "Payment Gateway"],
            image: "/image/Frame-7.png"
        },
        {
            title: "AI Job Platform UI/UX Design",
            type: "Figma Prototype",
            tech: ["Figma", "UI/UX Design"],
            image: "/image/Frame-5.png"
        }
    ];

    return (
        <BuyerLayout>
            <Head title="Jasa Pembuatan Aplikasi Website & Android - Prayoga Tech Software House" />

            <div className="bg-slate-950 text-slate-100 min-h-screen">

                {/* 1. HERO SECTION */}
                <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0A0F24] to-slate-950">
                    {/* Glowing Accent Orbs */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                            {/* Left Hero Text */}
                            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span>Software House & Developer Studio Resmi</span>
                                </div>

                                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                                    Jasa Pembuatan Aplikasi <br className="hidden sm:inline" />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
                                        Website & Android
                                    </span>
                                </h1>

                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                                    Wujudkan sistem digital, toko online, portal perusahaan, hingga aplikasi mobile Android impian Anda. Diproses cepat oleh tim developer berpengalaman, desain modern, kode clean, dan bergaransi maintenance resmi.
                                </p>

                                {/* Tech Badges */}
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                                    {['Laravel', 'React.js', 'Next.js', 'Flutter', 'Android Native', 'Tailwind CSS', 'MySQL'].map((tech, idx) => (
                                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Hero Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                    <Link
                                        href={route('katalog')}
                                        className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        Lihat Paket Website & Android
                                    </Link>
                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Prayoga Tech, saya ingin konsultasi pembuatan aplikasi Website / Android.')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5 text-emerald-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.47 9.964-9.964.002-2.661-1.033-5.161-2.915-7.044C16.438 1.713 13.935.672 12 1.72c-2.661 0-5.162 1.033-7.045 2.915C3.072 6.518 2.03 9.02 2.03 11.68c-.002 1.729.547 3.42 1.587 4.908l-.997 3.642 3.72-.975zm11.367-5.228c-.302-.15-1.787-.881-2.062-.981-.275-.101-.475-.15-.675.15-.2.3-.775.981-.95 1.181-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.487-.89-.793-1.492-1.773-1.667-2.073-.175-.3-.019-.461.13-.61.135-.133.302-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.491-.51-.675-.52-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.272.496 1.707.635.717.228 1.368.196 1.883.119.574-.085 1.787-.73 2.037-1.43.25-.7.25-1.3.175-1.43-.075-.13-.275-.205-.575-.355z" />
                                        </svg>
                                        Konsultasi WA Gratis
                                    </a>
                                </div>
                            </div>

                            {/* Right Hero Card / Visual Preview */}
                            <div className="lg:col-span-5 relative">
                                <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        </div>
                                        <span className="text-[11px] font-mono text-cyan-400">Prayoga Tech Dev Studio</span>
                                    </div>

                                    {/* Feature Cards inside Hero Visual */}
                                    <div className="space-y-3">
                                        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-lg">🌐</div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-white">Website & Web App</h4>
                                                    <p className="text-[10px] text-slate-400">Laravel / React / Next.js</p>
                                                </div>
                                            </div>
                                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Free Domain .com</span>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-cyan-600/30 text-cyan-400 flex items-center justify-center font-bold text-lg">📱</div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-white">Aplikasi Android</h4>
                                                    <p className="text-[10px] text-slate-400">Flutter Cross-Platform</p>
                                                </div>
                                            </div>
                                            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">Play Store Ready</span>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">⚡</div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-white">Garansi & Source Code</h4>
                                                    <p className="text-[10px] text-slate-400">100% Hak Milik Klien</p>
                                                </div>
                                            </div>
                                            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">Garansi 1-6 Bln</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 text-center border-t border-slate-800">
                                        <p className="text-xs text-slate-400">
                                            🚀 Mulai pengerjaan dari <strong className="text-white">Rp 950.000</strong> saja!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. STATS BAR */}
                <section className="border-b border-slate-800/80 bg-slate-900/60 py-8">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="space-y-1">
                                <h3 className="text-2xl md:text-3xl font-black text-indigo-400">150+</h3>
                                <p className="text-xs text-slate-400 font-medium">Proyek Web & App Completed</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl md:text-3xl font-black text-cyan-400">99.8%</h3>
                                <p className="text-xs text-slate-400 font-medium">Tingkat Kepuasan Klien</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl md:text-3xl font-black text-emerald-400">1-6 Bulan</h3>
                                <p className="text-xs text-slate-400 font-medium">Garansi Maintenance Resmi</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl md:text-3xl font-black text-amber-400">100%</h3>
                                <p className="text-xs text-slate-400 font-medium">Source Code Hak Milik</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. CORE SERVICE CATEGORIES GRID */}
                <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-12">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Layanan Utama Kami</span>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">Spesialis Software House Website & Android</h2>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                            Pilih jenis layanan pengembangan software yang sesuai dengan kebutuhan skala bisnis Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Category Card 1 */}
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
                            <h3 className="text-base font-bold text-white mb-2">Jasa Pembuatan Website</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                Company Profile, Landing Page, E-Commerce, dan Portal Berita dengan responsive design & SEO.
                            </p>
                            <Link href={route('katalog')} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">
                                Lihat Paket Website &rarr;
                            </Link>
                        </div>

                        {/* Category Card 2 */}
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">📱</div>
                            <h3 className="text-base font-bold text-white mb-2">Aplikasi Android Mobile</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                Aplikasi Android Native & Flutter Cross-Platform modern, cepat, dan siap rilis di Google Play Store.
                            </p>
                            <Link href={route('katalog')} className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
                                Lihat Paket Android &rarr;
                            </Link>
                        </div>

                        {/* Category Card 3 */}
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all hover:-translate-y-1 group">
                            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
                            <h3 className="text-base font-bold text-white mb-2">UI/UX Design (Figma)</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                Perancangan antarmuka pengguna interaktif (clickable prototype) untuk aplikasi mobile & web.
                            </p>
                            <Link href={route('katalog')} className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1">
                                Lihat Paket UI/UX &rarr;
                            </Link>
                        </div>

                        {/* Category Card 4 */}
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                            <h3 className="text-base font-bold text-white mb-2">Maintenance & VPS Server</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                Pemeliharaan rutin, perbaikan bug, backup otomatis, serta setup cloud VPS server (Nginx/SSL).
                            </p>
                            <Link href={route('katalog')} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1">
                                Lihat Maintenance &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 4. FEATURED PRODUCTS & PACKAGES GRID */}
                <section className="py-16 bg-slate-900/60 border-y border-slate-800/80 px-4 md:px-8">
                    <div className="max-w-7xl mx-auto space-y-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Katalog Paket Pilihan</span>
                                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Paket Jasa Pembuatan Siap Pesan</h2>
                            </div>
                            <Link
                                href={route('katalog')}
                                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white rounded-xl transition-all self-start md:self-auto"
                            >
                                Lihat Semua Paket Jasa &rarr;
                            </Link>
                        </div>

                        {/* Products / Packages Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => {
                                const packageCount = product.packages?.length || 0;
                                const minPrice = product.packages && product.packages.length > 0
                                    ? Math.min(...product.packages.map(p => p.price))
                                    : 0;

                                return (
                                    <div
                                        key={product.id}
                                        className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all hover:-translate-y-1 group shadow-xl"
                                    >
                                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                                                        {product.category?.name || 'Paket Jasa'}
                                                    </span>
                                                    {product.badge && (
                                                        <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-mono text-[9px] font-black uppercase">
                                                            {product.badge}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                                                    {product.name}
                                                </h3>

                                                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-normal">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Package list preview */}
                                            <div className="space-y-2 pt-3 border-t border-slate-800/80">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pilihan Varian Paket:</p>
                                                {product.packages && product.packages.slice(0, 2).map((pkg) => (
                                                    <div key={pkg.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                                                        <div className="truncate pr-2">
                                                            <p className="font-semibold text-slate-200 truncate">{pkg.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-mono">Estimasi: {pkg.duration_days} Hari</p>
                                                        </div>
                                                        <span className="font-extrabold text-cyan-400 shrink-0">{formatIDR(pkg.price)}</span>
                                                    </div>
                                                ))}
                                                {packageCount > 2 && (
                                                    <p className="text-[10px] text-slate-400 font-medium text-center pt-1">+ {packageCount - 2} varian paket lainnya</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Footer CTA */}
                                        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
                                            <div>
                                                <span className="text-[10px] text-slate-400 block">Mulai dari</span>
                                                <span className="text-base font-black text-white">{formatIDR(minPrice)}</span>
                                            </div>

                                            <Link
                                                href={route('product.show', product.slug)}
                                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
                                            >
                                                Detail Paket &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 5. INTERACTIVE QUICK PROJECT ESTIMATOR */}
                <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                            <div className="lg:col-span-6 space-y-4">
                                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                                    Simulasi Anggaran Proyek Cepat
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-black text-white">Kalkulator Estimasi Biaya Pembuatan Application</h2>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                                    Hitung perkiraan biaya proyek website atau aplikasi Android Anda secara instan. Pilih platform dan fitur yang Anda butuhkan di samping.
                                </p>

                                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-400">Estimasi Total Biaya:</span>
                                        <span className="text-2xl font-black text-cyan-400">{formatIDR(calculateEstimatedPrice())}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-mono">
                                        *Harga bersifat estimasi awal dan dapat disesuaikan dengan brief final Anda.
                                    </p>
                                </div>

                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Halo Prayoga Tech, saya telah melakukan kalkulasi estimasi di website:\n- Platform: ${estPlatform}\n- Jenis: ${estCategory}\n- Estimasi Biaya: ${formatIDR(calculateEstimatedPrice())}\n\nSaya ingin konsultasi lebih lanjut.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all inline-flex items-center justify-center gap-2"
                                >
                                    Pesan Sesuai Estimasi Ini via WhatsApp &rarr;
                                </a>
                            </div>

                            {/* Estimator Options Form */}
                            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                                {/* Option 1: Platform */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-300 block">1. Pilih Platform Target:</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'web', label: 'Website Dev' },
                                            { id: 'android', label: 'Aplikasi Android' },
                                            { id: 'bundle', label: 'Web + Android' },
                                        ].map((p) => (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() => setEstPlatform(p.id)}
                                                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${estPlatform === p.id
                                                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                                                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                                                    }`}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Option 2: Category */}
                                {estPlatform === 'web' && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-300 block">2. Tipe Website:</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { id: 'company', label: 'Company Profile' },
                                                { id: 'shop', label: 'Toko Online' },
                                                { id: 'system', label: 'System Custom' },
                                            ].map((c) => (
                                                <button
                                                    key={c.id}
                                                    type="button"
                                                    onClick={() => setEstCategory(c.id)}
                                                    className={`py-2 px-3 text-[11px] font-bold rounded-xl border transition-all ${estCategory === c.id
                                                            ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                                                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                                                        }`}
                                                >
                                                    {c.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Option 3: Additional Features */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-300 block">3. Modul & Fitur Tambahan:</label>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        {[
                                            { key: 'payment', label: 'Payment Gateway (Midtrans)' },
                                            { key: 'notification', label: 'Push Notification / WA API' },
                                            { key: 'multilang', label: 'Multi Language System' },
                                            { key: 'playstore', label: 'Upload Google Play Store' },
                                        ].map((f) => (
                                            <label
                                                key={f.key}
                                                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${estFeatures[f.key]
                                                        ? 'bg-indigo-950/80 border-indigo-500/60 text-white'
                                                        : 'bg-slate-800/60 border-slate-700/80 text-slate-400'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={estFeatures[f.key]}
                                                    onChange={(e) => setEstFeatures({ ...estFeatures, [f.key]: e.target.checked })}
                                                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                                                />
                                                <span className="text-[11px] font-medium leading-snug">{f.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. FEATURED PORTFOLIO SHOWCASE */}
                <section className="py-16 bg-slate-900/40 border-t border-slate-800/80 px-4 md:px-8">
                    <div className="max-w-7xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Bukti Hasil Kerja</span>
                            <h2 className="text-2xl sm:text-4xl font-black text-white">Portofolio Proyek Pilihan</h2>
                            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                                Beberapa hasil pengerjaan website dan aplikasi mobile yang telah dipercaya oleh para klien kami.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {portfolioShowcase.map((item, index) => (
                                <div key={index} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
                                    <div className="h-48 bg-slate-950 overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80';
                                            }}
                                        />
                                        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full">
                                            {item.type}
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-3">
                                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.tech.map((t, i) => (
                                                <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-indigo-400 font-bold hover:underline inline-flex items-center gap-1 pt-1"
                                            >
                                                Kunjungi Demo Live &rarr;
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center pt-4">
                            <Link
                                href={route('jasa-pembuatan')}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all"
                            >
                                Lihat Portofolio & Sistem Portofolio Lengkap &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 7. WORKFLOW / STEP-BY-STEP PEMESANAN */}
                <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-12">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Alur Pengerjaan Sederhana</span>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">6 Langkah Mudah Membuat Aplikasi Anda</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                        {[
                            { step: '01', title: 'Konsultasi Brief', desc: 'Diskusi kebutuhan fitur, konsep warna, & modul aplikasi.' },
                            { step: '02', title: 'Pilih Paket', desc: 'Pilih varian paket website/android & estimasi waktu.' },
                            { step: '03', title: 'DP / Pembayaran', desc: 'Pembayaran aman via Transfer Bank / QRIS resmi.' },
                            { step: '04', title: 'Pengerjaan', desc: 'Pengembangan kode oleh tim developer berpengalaman.' },
                            { step: '05', title: 'Testing & Demo', desc: 'Review demo live aplikasi & revisi fitur.' },
                            { step: '06', title: 'Serah Terima', desc: 'Penyerahan Source Code, Domain, & Publish Play Store.' },
                        ].map((s, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
                                <span className="font-mono text-2xl font-black text-indigo-500/40 block">{s.step}</span>
                                <h3 className="text-xs font-bold text-white">{s.title}</h3>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. CALL TO ACTION BANNER */}
                <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-cyan-900 p-8 md:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
                        <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
                            Siap Mengembangkan Aplikasi Website & Android Usaha Anda?
                        </h2>
                        <p className="text-indigo-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                            Konsultasikan ide aplikasi Anda sekarang juga secara gratis. Tim konsultan software house kami siap membantu merealisasikan impian digital Anda.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Prayoga Tech, saya ingin diskusi ide pembuatan aplikasi.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                            >
                                Diskusi Proyek via WhatsApp &rarr;
                            </a>
                            <Link
                                href={route('katalog')}
                                className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-900 text-white font-extrabold text-xs rounded-2xl border border-white/20 transition-all"
                            >
                                Eksplor Katalog Paket Jasa
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </BuyerLayout>
    );
}
