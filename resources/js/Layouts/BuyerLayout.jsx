import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function BuyerLayout({ children }) {
    const { auth, settings } = usePage().props;
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [searchVal, setSearchVal] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const updateCounts = () => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlistCount(storedWishlist.length);
        
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = storedCart.reduce((total, item) => total + item.quantity, 0);
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

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
            
            {/* Top Navy Blue Header Bar */}
            <header className="sticky top-0 bg-[#0B2545] text-white z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {settings?.store_logo_path ? (
                            <img 
                                src={`/storage/${settings.store_logo_path}`} 
                                alt="Logo" 
                                className="h-9 max-w-[180px] object-contain shrink-0" 
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                                PT
                            </div>
                        )}
                        <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                            {settings?.store_name || 'Prayoga Tech'}
                        </span>
                    </Link>

                    {/* Centered Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="relative w-full md:w-[450px]">
                        <input
                            type="text"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Cari produk digital atau aplikasi premium..."
                            className="w-full bg-white border-0 text-slate-800 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-400 shadow-inner"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1 bottom-1 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1 shadow-sm"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Cari
                        </button>
                    </form>

                    {/* Right Login/Dashboard shortcuts */}
                    <div className="flex items-center gap-4 text-xs font-bold">
                        <Link 
                            href={route('wishlist.index')} 
                            className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white hover:text-indigo-200 transition-all shadow-inner" 
                            title="Wishlist"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className={`absolute -top-1 -right-1 bg-rose-600 text-white font-mono text-[9px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center border border-[#0B2545] shadow-md transition-all ${
                                wishlistCount > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`}>
                                {wishlistCount}
                            </span>
                        </Link>

                        <Link 
                            href={route('cart.index')} 
                            className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white hover:text-indigo-200 transition-all shadow-inner" 
                            title="Keranjang"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className={`absolute -top-1 -right-1 bg-indigo-500 text-white font-mono text-[9px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center border border-[#0B2545] shadow-md transition-all ${
                                cartCount > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`}>
                                {cartCount}
                            </span>
                        </Link>

                        {auth.user ? (
                            <div id="profile-dropdown-container" className="relative">
                                <button
                                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all shadow-inner relative"
                                    title="Akun Saya"
                                    type="button"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </button>

                                {showProfileDropdown && (
                                    <div className="absolute right-0 mt-2.5 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-slate-800">
                                        <div className="px-4 py-2.5 border-b border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Sudah Masuk</p>
                                            <p className="text-xs font-bold text-slate-700 truncate mt-0.5">{auth.user.name}</p>
                                            <p className="text-[9px] text-slate-400 truncate font-mono mt-0.5">{auth.user.email}</p>
                                        </div>

                                        {auth.user.is_admin && (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-indigo-650 hover:bg-indigo-50 transition-colors text-left"
                                            >
                                                <svg className="w-4 h-4 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Admin Panel
                                            </Link>
                                        )}

                                        <Link
                                            href={route('profile.edit')}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profil Saya
                                        </Link>

                                        <Link
                                            href={route('dashboard')}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                                            </svg>
                                            Riwayat Pesanan
                                        </Link>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left border-t border-slate-100 mt-1.5 pt-2"
                                        >
                                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Keluar Akun
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="text-white hover:text-indigo-200 transition-colors">
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 bg-white hover:bg-slate-100 text-indigo-900 rounded-full transition-all"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sub Navigation Links Bar */}
                <div className="bg-[#13315C] text-slate-200 border-t border-[#1F4E79]/40 text-xs">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6">
                        <div className="flex items-center gap-6">
                            <Link href={route('home')} className="hover:text-white transition-colors">Beranda</Link>
                            <Link href={route('katalog')} className="hover:text-white transition-colors">Katalog</Link>
                            <Link href={route('jasa-pembuatan')} className="hover:text-white transition-colors font-bold text-amber-300 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                Jasa Pembuatan Aplikasi
                            </Link>
                            <Link href={route('cara-pemesanan')} className="hover:text-white transition-colors">Cara Pemesanan</Link>
                            <Link href={route('tentang-kami')} className="hover:text-white transition-colors">Tentang Kami</Link>
                            <Link href={route('hubungi-kami')} className="hover:text-white transition-colors">Hubungi Kami</Link>
                        </div>
                        <a 
                            href={`https://wa.me/${settings?.whatsapp_number || '628123456789'}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-full text-[10px] tracking-wide flex items-center gap-1 transition-all"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            CS WhatsApp Online
                        </a>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1">
                {children}
            </div>

            {/* Footer matching screenshot */}
            <footer className="border-t border-slate-200 bg-white py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Store info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            {settings?.store_logo_path ? (
                                <img src={`/storage/${settings.store_logo_path}`} alt="Logo" className="h-8 object-contain shrink-0" />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-[#0B2545] flex items-center justify-center font-bold text-white shrink-0">PT</div>
                            )}
                            <h4 className="font-black text-lg text-[#0B2545]">{settings?.store_name || 'Prayoga Tech'}</h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            {settings?.store_description || 'Penyedia Layanan Langganan Akun Premium Terpercaya & Bergaransi.'} Dapatkan berbagai lisensi & langganan premium termurah secara instan.
                        </p>
                    </div>

                    {/* Column 2: Toko */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-xs text-[#0B2545] uppercase tracking-wider">Toko Kami</h4>
                        <ul className="space-y-2 text-xs text-slate-500 font-semibold">
                            <li><Link href={route('katalog')} className="hover:text-indigo-650">Katalog Akun</Link></li>
                            <li><Link href={route('jasa-pembuatan')} className="hover:text-indigo-650 text-indigo-600 font-bold">Jasa Pembuatan Aplikasi</Link></li>
                            <li><Link href={route('cara-pemesanan')} className="hover:text-indigo-650">Cara Pemesanan</Link></li>
                            <li><Link href={route('tentang-kami')} className="hover:text-indigo-650">Tentang Kami</Link></li>
                            <li><Link href={route('hubungi-kami')} className="hover:text-indigo-650">Hubungi Kami</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Privacy */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-xs text-[#0B2545] uppercase tracking-wider">Privacy</h4>
                        <ul className="space-y-2 text-xs text-slate-500 font-semibold">
                            <li><Link href={route('syarat-ketentuan')} className="hover:text-indigo-650">Syarat & Ketentuan</Link></li>
                            <li><Link href={route('kebijakan-privasi')} className="hover:text-indigo-650">Kebijakan Privacy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-xs text-[#0B2545] uppercase tracking-wider">Social Media</h4>
                        <div className="flex gap-3">
                            <a
                                href={`https://wa.me/${settings?.whatsapp_number || '628123456789'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center border border-emerald-100 transition-all shadow-sm"
                                title="WhatsApp"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.47 9.964-9.964.002-2.661-1.033-5.161-2.915-7.044C16.438 1.713 13.935.672 12 1.72c-2.661 0-5.162 1.033-7.045 2.915C3.072 6.518 2.03 9.02 2.03 11.68c-.002 1.729.547 3.42 1.587 4.908l-.997 3.642 3.72-.975zm11.367-5.228c-.302-.15-1.787-.881-2.062-.981-.275-.101-.475-.15-.675.15-.2.3-.775.981-.95 1.181-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.487-.89-.793-1.492-1.773-1.667-2.073-.175-.3-.019-.461.13-.61.135-.133.302-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.491-.51-.675-.52-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.272.496 1.707.635.717.228 1.368.196 1.883.119.574-.085 1.787-.73 2.037-1.43.25-.7.25-1.3.175-1.43-.075-.13-.275-.205-.575-.355z"/>
                                </svg>
                            </a>
                            {settings?.social_instagram && settings.social_instagram !== '#' && (
                                <a
                                    href={settings.social_instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center border border-rose-100 transition-all shadow-sm"
                                    title="Instagram"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                </a>
                            )}
                            {settings?.social_tiktok && settings.social_tiktok !== '#' && (
                                <a
                                    href={settings.social_tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-slate-50 text-slate-800 hover:bg-slate-900 hover:text-white flex items-center justify-center border border-slate-200 transition-all shadow-sm"
                                    title="TikTok"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1.65-.06 1.29-.07 1.94-.02 2.65-.58 5.37-2.44 7.28-2.24 2.22-5.73 2.79-8.59 1.45-3.05-1.4-4.53-5.01-3.41-8.19.8-2.62 3.35-4.51 6.09-4.35.03 1.34-.02 2.68-.02 4.02-1.34-.1-2.78.68-3.18 1.98-.5 1.56.36 3.46 1.96 3.82 1.62.43 3.51-.49 3.85-2.15.11-.99.06-2.01.07-3.01-.01-3.79-.01-7.57-.01-11.36zm0 0"/>
                                    </svg>
                                </a>
                            )}
                            {settings?.social_x && settings.social_x !== '#' && (
                                <a
                                    href={settings.social_x}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-slate-50 text-slate-800 hover:bg-slate-900 hover:text-white flex items-center justify-center border border-slate-200 transition-all shadow-sm"
                                    title="X"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Centered Copyright at the very bottom */}
                <div className="max-w-7xl mx-auto border-t border-slate-100 mt-10 pt-6 text-center">
                    <p className="text-xs text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} {settings?.store_name || 'Prayoga Tech'}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
