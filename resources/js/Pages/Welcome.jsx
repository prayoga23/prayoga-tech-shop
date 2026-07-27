import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Welcome({ auth, products, categories, selectedCategory, search, settings, banners = [] }) {
    const [activeBanner, setActiveBanner] = useState(0);
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(storedWishlist);
    }, []);

    // Filter banners
    const carouselBanners = banners ? banners.filter(b => b.type === 'carousel') : [];
    const middleBanners = banners ? banners.filter(b => b.type === 'middle') : [];

    // Auto-slide banner every 5 seconds
    const bannerCount = carouselBanners.length > 0 ? carouselBanners.length : 3;
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveBanner((prev) => (prev + 1) % bannerCount);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerCount]);

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

        // Dispatch update event
        window.dispatchEvent(new Event('wishlist-updated'));
    };

    const handleCategoryFilter = (slug) => {
        router.get(route('home'), {
            category: slug || undefined
        });
    };

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    // Filter products for separate sections
    const aiProducts = products.filter(p => p.category?.slug?.toLowerCase().includes('ai'));
    const streamingProducts = products.filter(p => p.category?.slug?.toLowerCase().includes('movie') || p.category?.slug?.toLowerCase().includes('stream') || p.category?.slug?.toLowerCase().includes('music'));
    const designProducts = products.filter(p => p.category?.slug?.toLowerCase().includes('design') || p.category?.slug?.toLowerCase().includes('product'));
    const generalProducts = products.slice(0, 6);

    // Helper to render category icon
    const getCategoryIcon = (slug) => {
        const lowerSlug = slug?.toLowerCase() || '';
        if (lowerSlug.includes('ai') || lowerSlug.includes('bot')) {
            return (
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
        }
        if (lowerSlug.includes('movie') || lowerSlug.includes('stream') || lowerSlug.includes('film')) {
            return (
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        }
        if (lowerSlug.includes('music') || lowerSlug.includes('lagu')) {
            return (
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            );
        }
        if (lowerSlug.includes('design') || lowerSlug.includes('edit')) {
            return (
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            );
        }
        if (lowerSlug.includes('product') || lowerSlug.includes('office')) {
            return (
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        }
        if (lowerSlug.includes('internet') || lowerSlug.includes('vpn') || lowerSlug.includes('dev')) {
            return (
                <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            );
        }
        if (lowerSlug.includes('social') || lowerSlug.includes('marketing') || lowerSlug.includes('smm')) {
            return (
                <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            );
        }
        return (
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
            </svg>
        );
    };

    // Helper to render product thumbnail background / brand badge
    const renderProductThumbnail = (product) => {
        if (product.image_path) {
            return (
                <img
                    src={`/storage/${product.image_path}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            );
        }

        const nameLower = product.name?.toLowerCase() || '';
        let bgGradient = "from-[#0B2545] to-[#1F4E79]";
        let textColor = "text-white";

        if (nameLower.includes("netflix")) {
            bgGradient = "from-red-950 via-slate-900 to-red-900";
            textColor = "text-red-500";
        } else if (nameLower.includes("spotify")) {
            bgGradient = "from-emerald-950 via-slate-900 to-emerald-900";
            textColor = "text-emerald-400";
        } else if (nameLower.includes("canva")) {
            bgGradient = "from-cyan-900 via-teal-900 to-indigo-900";
            textColor = "text-cyan-300";
        } else if (nameLower.includes("chatgpt") || nameLower.includes("claude") || nameLower.includes("ai")) {
            bgGradient = "from-purple-950 via-indigo-900 to-violet-950";
            textColor = "text-amber-300";
        } else if (nameLower.includes("disney")) {
            bgGradient = "from-sky-950 via-indigo-950 to-blue-900";
            textColor = "text-sky-300";
        } else if (nameLower.includes("youtube")) {
            bgGradient = "from-red-900 via-rose-950 to-slate-900";
            textColor = "text-red-500";
        } else if (nameLower.includes("microsoft") || nameLower.includes("office")) {
            bgGradient = "from-amber-900 via-rose-950 to-[#0B2545]";
            textColor = "text-amber-400";
        } else if (nameLower.includes("discord")) {
            bgGradient = "from-indigo-950 via-purple-900 to-slate-900";
            textColor = "text-indigo-400";
        } else if (nameLower.includes("zoom")) {
            bgGradient = "from-sky-900 via-blue-950 to-slate-900";
            textColor = "text-sky-400";
        }

        return (
            <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex flex-col items-center justify-center p-3 text-center group-hover:scale-105 transition-transform duration-300`}>
                <span className={`text-lg font-black tracking-wider ${textColor}`}>
                    {product.name.substring(0, 3).toUpperCase()}
                </span>
                <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest mt-1 line-clamp-1">
                    {product.name}
                </span>
            </div>
        );
    };

    return (
        <BuyerLayout>
            <Head title="Jual Akun & Aplikasi Premium Murah Legal" />

            {/* Hero Carousel Section */}
            <section className="bg-slate-100 py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="relative h-[220px] md:h-[350px] rounded-3xl overflow-hidden shadow-md group">
                        {carouselBanners.length > 0 ? (
                            carouselBanners.map((banner, index) => (
                                <div
                                    key={banner.id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${activeBanner === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[0.5px] z-10" />
                                    <img
                                        src={`/storage/${banner.image_path}`}
                                        alt={banner.title || 'Promo'}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16 text-white space-y-3.5 max-w-xl">
                                        <span className="self-start px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[9px] uppercase font-black tracking-widest shadow-sm">
                                            PROMOSI SPESIAL
                                        </span>
                                        {banner.title && (
                                            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-md">
                                                {banner.title}
                                            </h2>
                                        )}
                                        {banner.subtitle && (
                                            <p className="text-white/90 text-xs md:text-sm drop-shadow-sm font-medium line-clamp-2 max-w-md">
                                                {banner.subtitle}
                                            </p>
                                        )}
                                        {banner.link_url && (
                                            <div className="pt-2">
                                                {banner.link_url.startsWith('http') ? (
                                                    <a
                                                        href={banner.link_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-5 py-2.5 bg-white text-indigo-955 text-indigo-950 text-xs font-bold rounded-xl hover:bg-slate-100 shadow-lg inline-block transition-transform hover:-translate-y-0.5"
                                                    >
                                                        Lihat Detail
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={banner.link_url}
                                                        className="px-5 py-2.5 bg-white text-indigo-950 text-xs font-bold rounded-xl hover:bg-slate-100 shadow-lg inline-block transition-transform hover:-translate-y-0.5"
                                                    >
                                                        Beli Sekarang
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                {/* Slide 1 */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-indigo-700 to-violet-600 flex items-center justify-between p-8 md:p-16 transition-opacity duration-1000 ${activeBanner === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                    <div className="max-w-md text-white space-y-4">
                                        <span className="px-3 py-1 bg-white/20 border border-white/35 rounded-full text-[10px] uppercase font-bold tracking-wider">Garansi Penuh 100%</span>
                                        <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">Canva Pro, Spotify & Netflix Murah</h2>
                                        <p className="text-white/80 text-xs md:text-sm">Akses aplikasi premium legal dengan harga termurah dan proses pengiriman akses cepat.</p>
                                        <Link href={route('katalog')} className="px-5 py-2 bg-white text-indigo-900 text-xs font-bold rounded-full hover:bg-slate-100 shadow-lg inline-block">Beli Sekarang</Link>
                                    </div>
                                    <div className="hidden md:flex w-72 h-72 items-center justify-center bg-white/5 rounded-full border border-white/10 shrink-0">
                                        <svg className="w-32 h-32 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Slide 2 */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-sky-700 to-indigo-800 flex items-center justify-between p-8 md:p-16 transition-opacity duration-1000 ${activeBanner === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                    <div className="max-w-md text-white space-y-4">
                                        <span className="px-3 py-1 bg-white/20 border border-white/35 rounded-full text-[10px] uppercase font-bold tracking-wider">Layanan Instan</span>
                                        <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">Proses Cepat Kurang Dari 10 Menit</h2>
                                        <p className="text-white/80 text-xs md:text-sm">Setelah pembayaran diverifikasi, kredensial akun premium langsung terkirim ke dashboard Anda.</p>
                                        <Link href={route('katalog')} className="px-5 py-2 bg-white text-sky-900 text-xs font-bold rounded-full hover:bg-slate-100 shadow-lg inline-block">Lihat Katalog</Link>
                                    </div>
                                    <div className="hidden md:flex w-72 h-72 items-center justify-center bg-white/5 rounded-full border border-white/10 shrink-0">
                                        <svg className="w-32 h-32 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Slide 3 */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-800 flex items-center justify-between p-8 md:p-16 transition-opacity duration-1000 ${activeBanner === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                    <div className="max-w-md text-white space-y-4">
                                        <span className="px-3 py-1 bg-white/20 border border-white/35 rounded-full text-[10px] uppercase font-bold tracking-wider">Metode Transfer</span>
                                        <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">Transfer Bank & QRIS E-Wallet Lengkap</h2>
                                        <p className="text-white/80 text-xs md:text-sm">Kemudahan pembayaran menggunakan transfer manual BCA, Mandiri, Gopay, OVO, Dana, LinkAja.</p>
                                        <Link href={route('cara-pemesanan')} className="px-5 py-2 bg-white text-emerald-900 text-xs font-bold rounded-full hover:bg-slate-100 shadow-lg inline-block">Cara Bayar</Link>
                                    </div>
                                    <div className="hidden md:flex w-72 h-72 items-center justify-center bg-white/5 rounded-full border border-white/10 shrink-0">
                                        <svg className="w-32 h-32 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Slide Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                            {Array.from({ length: bannerCount }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveBanner(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${activeBanner === idx ? 'bg-white w-6' : 'bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Horizontal Category Icons Bar */}
            <section className="bg-white py-6 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex justify-center items-center gap-6 md:gap-12 flex-wrap">
                        <div
                            onClick={() => handleCategoryFilter(null)}
                            className="flex flex-col items-center gap-2.5 cursor-pointer group text-center shrink-0"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${!selectedCategory
                                    ? 'bg-indigo-50 border-indigo-600 shadow-md'
                                    : 'bg-slate-50 border-slate-100 hover:border-slate-300'
                                }`}>
                                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Semua</span>
                        </div>

                        {categories.map((cat) => {
                            const isSelected = selectedCategory === cat.slug;
                            return (
                                <div
                                    key={cat.id}
                                    onClick={() => handleCategoryFilter(cat.slug)}
                                    className="flex flex-col items-center gap-2.5 cursor-pointer group text-center shrink-0"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${isSelected
                                            ? 'bg-indigo-50 border-indigo-600 shadow-md'
                                            : 'bg-slate-50 border-slate-100 hover:border-slate-300'
                                        }`}>
                                        {getCategoryIcon(cat.slug)}
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Dynamic Content Body */}
            <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-12">

                {/* SECTION 1: Terbaru Untukmu */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-base font-extrabold text-[#0B2545]">
                                {selectedCategory ? `Katalog: ${categories.find(c => c.slug === selectedCategory)?.name}` : 'Terbaru Untukmu'}
                            </h3>
                            <div className="w-12 h-1 bg-indigo-600 rounded-full mt-1.5" />
                        </div>
                        <Link href={route('katalog')} className="text-xs text-indigo-600 font-bold hover:text-indigo-850">
                            Lihat Semua
                        </Link>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 bg-white border border-slate-200 rounded-3xl">
                            <p className="text-sm font-bold">Produk premium tidak ditemukan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                            {(selectedCategory ? products : generalProducts).map((product) => {
                                const isWished = wishlist.includes(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all group relative overflow-hidden shadow-sm"
                                    >
                                        <button
                                            onClick={(e) => toggleWishlist(product.id, e)}
                                            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 border border-slate-100 hover:scale-110 shadow-sm text-slate-400 hover:text-rose-600 transition-all shrink-0"
                                        >
                                            <svg className="w-4 h-4" fill={isWished ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>

                                        <Link href={route('product.show', product.slug)} className="block">
                                            {product.badge && (
                                                <span className="absolute top-0 left-0 bg-rose-600 text-white text-[9px] font-black px-2.5 py-1 rounded-br-xl shadow-sm z-10 uppercase">
                                                    {product.badge}
                                                </span>
                                            )}

                                            <div className="aspect-square w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                                                {renderProductThumbnail(product)}
                                            </div>

                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                                                {product.category?.name || 'Aplikasi'}
                                            </span>
                                            <h4 className="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5 group-hover:text-indigo-600 transition-colors">
                                                {product.name}
                                            </h4>
                                        </Link>

                                        <div className="border-t border-slate-100 pt-3.5 mt-3 text-left min-h-[44px]">
                                            {product.min_original_price ? (
                                                <span className="text-[10px] text-slate-400 line-through font-mono block">
                                                    {formatIDR(product.min_original_price)}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-transparent select-none font-mono block">-</span>
                                            )}
                                            <span className="text-xs font-black text-indigo-650 font-mono block mt-0.5">{formatIDR(product.min_price)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* SECTION: AI & Bot Populer */}
                {!selectedCategory && aiProducts.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-base font-extrabold text-[#0B2545]">AI & Bot Tools Populer</h3>
                                <div className="w-12 h-1 bg-purple-600 rounded-full mt-1.5" />
                            </div>
                            <Link href={route('katalog')} className="text-xs text-indigo-600 font-bold hover:text-indigo-850">
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                            {aiProducts.slice(0, 6).map((product) => {
                                const isWished = wishlist.includes(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all group relative overflow-hidden shadow-sm"
                                    >
                                        <button
                                            onClick={(e) => toggleWishlist(product.id, e)}
                                            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 border border-slate-100 hover:scale-110 shadow-sm text-slate-400 hover:text-rose-600 transition-all shrink-0"
                                        >
                                            <svg className="w-4 h-4" fill={isWished ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>

                                        <Link href={route('product.show', product.slug)} className="block">
                                            {product.badge && (
                                                <span className="absolute top-0 left-0 bg-purple-600 text-white text-[9px] font-black px-2.5 py-1 rounded-br-xl shadow-sm z-10 uppercase">
                                                    {product.badge}
                                                </span>
                                            )}

                                            <div className="aspect-square w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                                                {renderProductThumbnail(product)}
                                            </div>

                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                                                {product.category?.name || 'AI & Bot'}
                                            </span>
                                            <h4 className="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5 group-hover:text-indigo-600 transition-colors">
                                                {product.name}
                                            </h4>
                                        </Link>

                                        <div className="border-t border-slate-100 pt-3.5 mt-3 text-left min-h-[44px]">
                                            {product.min_original_price ? (
                                                <span className="text-[10px] text-slate-400 line-through font-mono block">
                                                    {formatIDR(product.min_original_price)}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-transparent select-none font-mono block">-</span>
                                            )}
                                            <span className="text-xs font-black text-indigo-650 font-mono block mt-0.5">{formatIDR(product.min_price)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* MIDDLE PROMO BANNER 1 */}
                {!selectedCategory && (
                    middleBanners && middleBanners[0] ? (
                        <div className="relative rounded-3xl overflow-hidden h-[130px] md:h-[180px] shadow-sm border border-slate-200">
                            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[0.5px] z-10" />
                            <img
                                src={`/storage/${middleBanners[0].image_path}`}
                                alt={middleBanners[0].title || 'Promo'}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-12 text-white space-y-2 md:space-y-3 max-w-lg">
                                <span className="self-start px-2 py-0.5 bg-white/20 backdrop-blur-md border border-white/30 rounded text-[9px] uppercase font-bold tracking-widest shadow-sm">
                                    PROMO SPESIAL
                                </span>
                                {middleBanners[0].title && (
                                    <h3 className="text-lg md:text-2xl font-extrabold leading-tight drop-shadow-md">
                                        {middleBanners[0].title}
                                    </h3>
                                )}
                                {middleBanners[0].subtitle && (
                                    <p className="text-white/95 text-[10px] md:text-xs leading-relaxed max-w-sm hidden sm:block drop-shadow-sm font-medium">
                                        {middleBanners[0].subtitle}
                                    </p>
                                )}
                                {middleBanners[0].link_url && (
                                    <div className="pt-1.5">
                                        {middleBanners[0].link_url.startsWith('http') ? (
                                            <a
                                                href={middleBanners[0].link_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-1.5 bg-white text-slate-900 text-[10px] font-bold rounded-lg hover:bg-slate-100 shadow-md inline-block transition-transform hover:-translate-y-0.5"
                                            >
                                                Lihat Detail
                                            </a>
                                        ) : (
                                            <Link
                                                href={middleBanners[0].link_url}
                                                className="px-4 py-1.5 bg-white text-slate-900 text-[10px] font-bold rounded-lg hover:bg-slate-100 shadow-md inline-block transition-transform hover:-translate-y-0.5"
                                            >
                                                Beli Sekarang
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-3xl overflow-hidden h-[130px] md:h-[180px] bg-gradient-to-r from-emerald-600 to-teal-500 flex items-center p-6 md:p-12 shadow-sm border border-emerald-500/10">
                            <div className="max-w-lg text-white space-y-2 md:space-y-3 z-10">
                                <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-white/20 rounded border border-white/10">Premium Design & Office</span>
                                <h3 className="text-lg md:text-2xl font-extrabold leading-tight">Akses Canva Pro & ChatGPT Plus Murah</h3>
                                <p className="text-white/80 text-[10px] md:text-xs leading-relaxed max-w-sm hidden sm:block">Maksimalkan produktivitas kerja dan desain grafis Anda dengan paket langganan murah terlengkap.</p>
                            </div>
                        </div>
                    )
                )}

                {/* SECTION 2: Streaming Populer */}
                {!selectedCategory && streamingProducts.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-base font-extrabold text-[#0B2545]">Hiburan & Streaming Populer</h3>
                                <div className="w-12 h-1 bg-indigo-600 rounded-full mt-1.5" />
                            </div>
                            <Link href={route('katalog')} className="text-xs text-indigo-600 font-bold hover:text-indigo-850">
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                            {streamingProducts.slice(0, 6).map((product) => {
                                const isWished = wishlist.includes(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all group relative overflow-hidden shadow-sm"
                                    >
                                        <button
                                            onClick={(e) => toggleWishlist(product.id, e)}
                                            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 border border-slate-100 hover:scale-110 shadow-sm text-slate-400 hover:text-rose-600 transition-all shrink-0"
                                        >
                                            <svg className="w-4 h-4" fill={isWished ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>

                                        <Link href={route('product.show', product.slug)} className="block">
                                            {product.badge && (
                                                <span className="absolute top-0 left-0 bg-rose-600 text-white text-[9px] font-black px-2.5 py-1 rounded-br-xl shadow-sm z-10 uppercase">
                                                    {product.badge}
                                                </span>
                                            )}

                                            <div className="aspect-square w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                                                {renderProductThumbnail(product)}
                                            </div>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{product.category?.name}</span>
                                            <h4 className="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5 group-hover:text-indigo-600 transition-colors">{product.name}</h4>
                                        </Link>

                                        <div className="border-t border-slate-100 pt-3.5 mt-3 text-left min-h-[44px]">
                                            {product.min_original_price ? (
                                                <span className="text-[10px] text-slate-400 line-through font-mono block">
                                                    {formatIDR(product.min_original_price)}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-transparent select-none font-mono block">-</span>
                                            )}
                                            <span className="text-xs font-black text-indigo-650 font-mono block mt-0.5">{formatIDR(product.min_price)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* MIDDLE PROMO BANNER 2 */}
                {!selectedCategory && (
                    middleBanners && middleBanners[1] ? (
                        <div className="relative rounded-3xl overflow-hidden h-[130px] md:h-[180px] shadow-sm border border-slate-200">
                            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[0.5px] z-10" />
                            <img
                                src={`/storage/${middleBanners[1].image_path}`}
                                alt={middleBanners[1].title || 'Promo'}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-12 text-white space-y-2 md:space-y-3 max-w-lg">
                                <span className="self-start px-2 py-0.5 bg-white/20 backdrop-blur-md border border-white/30 rounded text-[9px] uppercase font-bold tracking-widest shadow-sm">
                                    INFO PEMBAYARAN
                                </span>
                                {middleBanners[1].title && (
                                    <h3 className="text-lg md:text-2xl font-extrabold leading-tight drop-shadow-md">
                                        {middleBanners[1].title}
                                    </h3>
                                )}
                                {middleBanners[1].subtitle && (
                                    <p className="text-white/95 text-[10px] md:text-xs leading-relaxed max-w-sm hidden sm:block drop-shadow-sm font-medium">
                                        {middleBanners[1].subtitle}
                                    </p>
                                )}
                                {middleBanners[1].link_url && (
                                    <div className="pt-1.5">
                                        {middleBanners[1].link_url.startsWith('http') ? (
                                            <a
                                                href={middleBanners[1].link_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-1.5 bg-white text-slate-900 text-[10px] font-bold rounded-lg hover:bg-slate-100 shadow-md inline-block transition-transform hover:-translate-y-0.5"
                                            >
                                                Lihat Detail
                                            </a>
                                        ) : (
                                            <Link
                                                href={middleBanners[1].link_url}
                                                className="px-4 py-1.5 bg-white text-slate-900 text-[10px] font-bold rounded-lg hover:bg-slate-100 shadow-md inline-block transition-transform hover:-translate-y-0.5"
                                            >
                                                Info Selengkapnya
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-3xl overflow-hidden h-[130px] md:h-[180px] bg-gradient-to-r from-violet-600 to-indigo-700 flex items-center p-6 md:p-12 shadow-sm border border-violet-500/10">
                            <div className="max-w-lg text-white space-y-2 md:space-y-3 z-10">
                                <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-white/20 rounded border border-white/10">Metode Pembayaran Transfer</span>
                                <h3 className="text-lg md:text-2xl font-extrabold leading-tight">Pembayaran Mudah & Terverifikasi Manual</h3>
                                <p className="text-white/80 text-[10px] md:text-xs leading-relaxed max-w-sm hidden sm:block">Gunakan transfer manual antar rekening bank lokal dan e-wallet QRIS terlengkap untuk melakukan transaksi instan.</p>
                            </div>
                        </div>
                    )
                )}

                {/* SECTION 3: Kategori Design/Productivity */}
                {!selectedCategory && designProducts.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-base font-extrabold text-[#0B2545]">Produktivitas & Desain</h3>
                                <div className="w-12 h-1 bg-indigo-600 rounded-full mt-1.5" />
                            </div>
                            <Link href={route('katalog')} className="text-xs text-indigo-600 font-bold hover:text-indigo-850">
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                            {designProducts.slice(0, 6).map((product) => {
                                const isWished = wishlist.includes(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all group relative overflow-hidden shadow-sm"
                                    >
                                        <button
                                            onClick={(e) => toggleWishlist(product.id, e)}
                                            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 border border-slate-100 hover:scale-110 shadow-sm text-slate-400 hover:text-rose-600 transition-all shrink-0"
                                        >
                                            <svg className="w-4 h-4" fill={isWished ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>

                                        <Link href={route('product.show', product.slug)} className="block">
                                            {product.badge && (
                                                <span className="absolute top-0 left-0 bg-rose-600 text-white text-[9px] font-black px-2.5 py-1 rounded-br-xl shadow-sm z-10 uppercase">
                                                    {product.badge}
                                                </span>
                                            )}

                                            <div className="aspect-square w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                                                {renderProductThumbnail(product)}
                                            </div>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{product.category?.name}</span>
                                            <h4 className="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5 group-hover:text-indigo-600 transition-colors">{product.name}</h4>
                                        </Link>

                                        <div className="border-t border-slate-100 pt-3.5 mt-3 text-left min-h-[44px]">
                                            {product.min_original_price ? (
                                                <span className="text-[10px] text-slate-400 line-through font-mono block">
                                                    {formatIDR(product.min_original_price)}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-transparent select-none font-mono block">-</span>
                                            )}
                                            <span className="text-xs font-black text-indigo-650 font-mono block mt-0.5">{formatIDR(product.min_price)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* SECTION 4: Jasa Pembuatan Aplikasi Banner */}
                {!selectedCategory && (
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B2545] via-[#13315C] to-[#1F4E79] text-white p-8 md:p-12 shadow-xl border border-indigo-500/20">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-3 text-center md:text-left max-w-2xl">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-[#0B2545] font-black text-[10px] rounded-full uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] animate-ping" />
                                    Software House & Service
                                </span>
                                <h3 className="text-xl md:text-3xl font-extrabold leading-tight text-white">
                                    Ingin Buat Website, Mobile App atau Sistem Informasi Custom?
                                </h3>
                                <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed">
                                    Kami juga melayani jasa pembuatan aplikasi website (Laravel/React), aplikasi mobile (Android/iOS), UI/UX Figma, hingga data analyst Tableau & Python dengan garansi penuh.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                                <Link
                                    href={route('jasa-pembuatan')}
                                    className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#0B2545] font-black text-xs md:text-sm rounded-xl shadow-lg text-center transition-transform hover:-translate-y-0.5"
                                >
                                    Lihat Portofolio & Jasa
                                </Link>
                                <a
                                    href={`https://wa.me/${settings?.whatsapp_number || '628123456789'}?text=${encodeURIComponent('Halo, saya ingin konsultasi Jasa Pembuatan Aplikasi Website/Mobile.')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg text-center flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.47 9.964-9.964.002-2.661-1.033-5.161-2.915-7.044C16.438 1.713 13.935.672 12 1.72c-2.661 0-5.162 1.033-7.045 2.915C3.072 6.518 2.03 9.02 2.03 11.68c-.002 1.729.547 3.42 1.587 4.908l-.997 3.642 3.72-.975z" />
                                    </svg>
                                    Konsultasi WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </BuyerLayout>
    );
}
