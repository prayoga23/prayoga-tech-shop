import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function BuyerLayout({ children }) {
    const { auth, settings } = usePage().props;
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [searchVal, setSearchVal] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const updateCounts = () => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlistCount(storedWishlist.length);
        
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = storedCart.reduce((total, item) => total + (item.quantity || 1), 0);
        setCartCount(count);
    };

    useEffect(() => {
        updateCounts();

        const handleOutsideClick = (e) => {
            if (!e.target.closest('#profile-dropdown-container')) {
                setShowProfileDropdown(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);

        window.addEventListener('cart-updated', updateCounts);
        window.addEventListener('wishlist-updated', updateCounts);
        
        return () => {
            document.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('cart-updated', updateCounts);
            window.removeEventListener('wishlist-updated', updateCounts);
        };
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        window.location.href = route('katalog') + `?search=${encodeURIComponent(searchVal)}`;
    };

    const whatsappNumber = settings?.whatsapp_number || '628990703408';
    const storeName = settings?.store_name || 'Prayoga Tech Software House';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white overflow-x-hidden w-full">
            
            {/* Top Light Modern Header */}
            <header className="sticky top-0 bg-white/95 backdrop-blur-md text-slate-900 z-50 border-b border-slate-200/80 shadow-xs w-full">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4">
                    {/* Brand Logo & Title */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
                        <img 
                            src={settings?.store_logo_path ? (settings.store_logo_path.startsWith('/') ? settings.store_logo_path : `/storage/${settings.store_logo_path}`) : '/logo.png'} 
                            alt="Logo" 
                            className="h-8 sm:h-10 max-w-[32px] sm:max-w-[190px] object-contain shrink-0" 
                            onError={(e) => { e.target.src = '/logo.png'; }}
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-xs sm:text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[110px] xs:max-w-[150px] sm:max-w-none">
                                {storeName}
                            </span>
                            <span className="text-[8px] sm:text-[10px] text-indigo-600 font-bold tracking-wider uppercase -mt-0.5 sm:-mt-1 truncate max-w-[110px] xs:max-w-[150px] sm:max-w-none">
                                Web & Android Dev Studio
                            </span>
                        </div>
                    </Link>

                    {/* Centered Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="hidden md:flex relative flex-1 max-w-lg mx-4">
                        <input
                            type="text"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Cari Jasa Pembuatan Website, Aplikasi Android, UI/UX..."
                            className="w-full bg-slate-100/90 border border-slate-200 text-slate-800 rounded-full pl-5 pr-24 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all placeholder-slate-400 shadow-inner"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold rounded-full transition-all flex items-center gap-1 shadow-md shadow-indigo-600/20"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Cari Jasa
                        </button>
                    </form>

                    {/* Right User Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold shrink-0">
                        {/* Wishlist Icon (Desktop only) */}
                        <Link 
                            href={route('wishlist.index')} 
                            className="hidden md:flex relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 items-center justify-center text-slate-600 hover:text-slate-900 transition-all shadow-2xs" 
                            title="Wishlist Layanan"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className={`absolute -top-1 -right-1 bg-rose-600 text-white font-mono text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-white shadow-md transition-all ${
                                wishlistCount > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`}>
                                {wishlistCount}
                            </span>
                        </Link>

                        {/* Cart Icon (Desktop only) */}
                        <Link 
                            href={route('cart.index')} 
                            className="hidden md:flex relative w-9 h-9 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 items-center justify-center text-indigo-600 hover:text-indigo-800 transition-all shadow-2xs" 
                            title="Keranjang Pesanan"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className={`absolute -top-1 -right-1 bg-indigo-600 text-white font-mono text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-white shadow-md transition-all ${
                                cartCount > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`}>
                                {cartCount}
                            </span>
                        </Link>

                        {/* Profile or Login */}
                        {auth.user ? (
                            <div id="profile-dropdown-container" className="relative shrink-0">
                                <button
                                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                    className="h-9 px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 flex items-center gap-2 text-slate-800 transition-all shadow-2xs"
                                    type="button"
                                >
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black uppercase shadow-xs">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <span className="max-w-[100px] truncate hidden sm:inline text-xs font-bold text-slate-800">{auth.user.name}</span>
                                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showProfileDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-slate-800">
                                        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
                                            <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-wider">Klien Terdaftar</p>
                                            <p className="text-xs font-extrabold text-slate-900 truncate mt-0.5">{auth.user.name}</p>
                                            <p className="text-[10px] text-slate-500 truncate font-mono mt-0.5">{auth.user.email}</p>
                                        </div>

                                        {auth.user.is_admin && (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50/80 transition-colors text-left"
                                            >
                                                <svg className="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Admin Dashboard
                                            </Link>
                                        )}

                                        <Link
                                            href={route('dashboard')}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-left"
                                        >
                                            <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                                            </svg>
                                            Riwayat Pesanan Proyek
                                        </Link>

                                        <Link
                                            href={route('profile.edit')}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-left"
                                        >
                                            <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Pengaturan Profil
                                        </Link>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left border-t border-slate-100 mt-1 pt-2"
                                        >
                                            <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Keluar Akun
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={route('login')} className="hidden md:inline-block px-3.5 py-1.5 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors">
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-3 sm:px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all shrink-0"
                                >
                                    Daftar Klien
                                </Link>
                            </div>
                        )}

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 border border-slate-200 shrink-0"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Sub Navigation Bar */}
                <div className="bg-slate-100/90 border-t border-slate-200/80 text-xs w-full">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 scrollbar-none">
                        <div className="flex items-center gap-6 font-bold text-slate-700">
                            <Link href={route('home')} className="hover:text-indigo-600 transition-colors">
                                Beranda
                            </Link>
                            <Link href={route('katalog')} className="hover:text-indigo-600 transition-colors">
                                Katalog Paket
                            </Link>
                            <Link href={route('cara-pemesanan')} className="hover:text-indigo-600 transition-colors">
                                Cara Pemesanan
                            </Link>
                            <Link href={route('tentang-kami')} className="hover:text-indigo-600 transition-colors">
                                Tentang Kami
                            </Link>
                            <Link href={route('hubungi-kami')} className="hover:text-indigo-600 transition-colors">
                                Hubungi Kami
                            </Link>
                        </div>
                        <a 
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Prayoga Tech, saya ingin konsultasi pembuatan aplikasi Website / Android.')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-full text-[11px] flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-600/25 shrink-0"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Konsultasi WhatsApp Gratis
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-md">
                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <input
                                type="text"
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder="Cari Jasa Pembuatan..."
                                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 text-xs"
                            />
                        </form>
                        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                            <Link href={route('home')} className="p-2.5 rounded-xl bg-slate-100 text-slate-700">Beranda</Link>
                            <Link href={route('katalog')} className="p-2.5 rounded-xl bg-slate-100 text-slate-700">Katalog Paket</Link>
                            <Link href={route('cara-pemesanan')} className="p-2.5 rounded-xl bg-slate-100 text-slate-700">Cara Pemesanan</Link>
                            <Link href={route('tentang-kami')} className="p-2.5 rounded-xl bg-slate-100 text-slate-700">Tentang Kami</Link>
                            <Link href={route('hubungi-kami')} className="p-2.5 rounded-xl bg-slate-100 text-slate-700">Hubungi Kami</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            <Link href={route('wishlist.index')} className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-between text-xs font-bold">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Wishlist
                                </span>
                                <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">{wishlistCount}</span>
                            </Link>
                            <Link href={route('cart.index')} className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-between text-xs font-bold">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Keranjang
                                </span>
                                <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">{cartCount}</span>
                            </Link>
                        </div>
                        {!auth.user && (
                            <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                                <Link href={route('login')} className="flex-1 text-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200">
                                    Masuk
                                </Link>
                                <Link href={route('register')} className="flex-1 text-center py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md">
                                    Daftar Klien
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer Software House */}
            <footer className="border-t border-slate-200 bg-white py-14 px-6 md:px-12 text-slate-600">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Column 1: Store info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img 
                                src={settings?.store_logo_path ? (settings.store_logo_path.startsWith('/') ? settings.store_logo_path : `/storage/${settings.store_logo_path}`) : '/logo.png'} 
                                alt="Logo" 
                                className="h-9 max-w-[150px] object-contain shrink-0" 
                                onError={(e) => { e.target.src = '/logo.png'; }}
                            />
                            <div>
                                <h4 className="font-extrabold text-lg text-slate-900 leading-tight">{storeName}</h4>
                                <p className="text-[10px] text-indigo-600 font-bold tracking-wider uppercase">Web & Android Software House</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            Spesialis Jasa Pembuatan Aplikasi Website & Android Profesional. Kami membantu bisnis, UMKM, instansi, dan startup mewujudkan sistem digital berkualitas tinggi, cepat, dan bergaransi resmi.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold pt-1">
                            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Garansi Maintenance & Source Code 100%
                        </div>
                    </div>

                    {/* Column 2: Layanan Kami */}
                    <div className="space-y-3">
                        <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Layanan Utama</h4>
                        <ul className="space-y-2.5 text-xs font-medium">
                            <li><Link href={route('katalog')} className="hover:text-indigo-600 transition-colors">Jasa Pembuatan Website</Link></li>
                            <li><Link href={route('katalog')} className="hover:text-indigo-600 transition-colors">Jasa Aplikasi Android (Flutter)</Link></li>
                            <li><Link href={route('katalog')} className="hover:text-indigo-600 transition-colors">Bundle Website + Mobile App</Link></li>
                            <li><Link href={route('katalog')} className="hover:text-indigo-600 transition-colors">Desain UI/UX & Prototype</Link></li>
                            <li><Link href={route('katalog')} className="hover:text-indigo-600 transition-colors">Setup Cloud VPS & Maintenance</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Informasi & Kebijakan */}
                    <div className="space-y-3">
                        <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Pusat Bantuan</h4>
                        <ul className="space-y-2.5 text-xs font-medium">
                            <li><Link href={route('cara-pemesanan')} className="hover:text-indigo-600 transition-colors">Cara Pemesanan Jasa</Link></li>
                            <li><Link href={route('tentang-kami')} className="hover:text-indigo-600 transition-colors">Tentang Kami</Link></li>
                            <li><Link href={route('hubungi-kami')} className="hover:text-indigo-600 transition-colors">Hubungi Konsultan Kami</Link></li>
                            <li><Link href={route('syarat-ketentuan')} className="hover:text-indigo-600 transition-colors">Syarat & Ketentuan Layanan</Link></li>
                            <li><Link href={route('kebijakan-privasi')} className="hover:text-indigo-600 transition-colors">Kebijakan Privasi</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Kontak & Social Media */}
                    <div className="space-y-4">
                        <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Hubungi Kami</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            Tim teknis kami siap melayani diskusi & konsultasi proyek digital Anda kapan saja.
                        </p>
                        <div className="flex flex-col gap-2 text-xs">
                            <a 
                                href={`https://wa.me/${whatsappNumber}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 text-emerald-600 hover:underline font-bold"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.47 9.964-9.964.002-2.661-1.033-5.161-2.915-7.044C16.438 1.713 13.935.672 12 1.72c-2.661 0-5.162 1.033-7.045 2.915C3.072 6.518 2.03 9.02 2.03 11.68c-.002 1.729.547 3.42 1.587 4.908l-.997 3.642 3.72-.975zm11.367-5.228c-.302-.15-1.787-.881-2.062-.981-.275-.101-.475-.15-.675.15-.2.3-.775.981-.95 1.181-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.487-.89-.793-1.492-1.773-1.667-2.073-.175-.3-.019-.461.13-.61.135-.133.302-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.491-.51-.675-.52-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.272.496 1.707.635.717.228 1.368.196 1.883.119.574-.085 1.787-.73 2.037-1.43.25-.7.25-1.3.175-1.43-.075-.13-.275-.205-.575-.355z"/>
                                </svg>
                                WhatsApp CS: +{whatsappNumber}
                            </a>
                            <span className="text-[11px] text-slate-500 font-medium">Jam Operasional: 08.00 - 22.00 WIB</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="max-w-7xl mx-auto border-t border-slate-200 mt-10 pt-6 text-center">
                    <p className="text-xs text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} {storeName}. Hak Cipta Dilindungi Undang-Undang.
                    </p>
                </div>
            </footer>
        </div>
    );
}
