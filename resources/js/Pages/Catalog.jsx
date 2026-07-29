import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Catalog({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCats, setSelectedCats] = useState(filters.categories || []);
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [sort, setSort] = useState(filters.sort || 'name_asc');
    const [wishlist, setWishlist] = useState([]);

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

        // Dispatch event so layout updates its badge counts
        window.dispatchEvent(new Event('wishlist-updated'));
    };

    const handleCategoryChange = (catId) => {
        let updated = [...selectedCats];
        if (updated.includes(catId.toString())) {
            updated = updated.filter(id => id !== catId.toString());
        } else {
            updated.push(catId.toString());
        }
        setSelectedCats(updated);
    };

    const handleApplyFilters = (e) => {
        e?.preventDefault();
        router.get(route('katalog'), {
            search: search || undefined,
            categories: selectedCats.length > 0 ? selectedCats : undefined,
            min_price: minPrice || undefined,
            max_price: maxPrice || undefined,
            sort: sort || undefined,
        });
    };

    const handleResetFilters = () => {
        setSearch('');
        setSelectedCats([]);
        setMinPrice('');
        maxPrice('');
        setSort('name_asc');
        router.get(route('katalog'));
    };

    const getLogoPath = (productName) => {
        if (!productName) return null;
        const nameLower = productName.toLowerCase();
        if (nameLower.includes("canva")) return "/image/Logo Aplikasi/Canva Pro.png";
        if (nameLower.includes("chatgpt") || nameLower.includes("gpt")) return "/image/Logo Aplikasi/1. ChatGpt.png";
        if (nameLower.includes("claude")) return "/image/Logo Aplikasi/2. Claude.jpg";
        if (nameLower.includes("midjourney")) return "/image/Logo Aplikasi/3. Midjourney.png";
        if (nameLower.includes("youtube")) return "/image/Logo Aplikasi/4. Youtube Premium.webp";
        if (nameLower.includes("disney")) return "/image/Logo Aplikasi/disney-plus-logo-button-replacement-1712328257121.jpg";
        if (nameLower.includes("netflix")) return "/image/Logo Aplikasi/6. Netflix.png";
        if (nameLower.includes("spotify")) return "/image/Logo Aplikasi/Spotify_App_Logo.jpg";
        if (nameLower.includes("capcut")) return "/image/Logo Aplikasi/capcut pro.png";
        if (nameLower.includes("figma")) return "/image/Logo Aplikasi/figma.webp";
        if (nameLower.includes("hbo")) return "/image/Logo Aplikasi/HBO Max.jpg";
        if (nameLower.includes("vidio")) return "/image/Logo Aplikasi/vidio.jpg";
        if (nameLower.includes("viu")) return "/image/Logo Aplikasi/viu.webp";
        if (nameLower.includes("dramabox") || nameLower.includes("drama")) return "/image/Logo Aplikasi/Dramaboc.png";
        if (nameLower.includes("grok")) return "/image/Logo Aplikasi/super grok.png";
        if (nameLower.includes("bstation") || nameLower.includes("bilibili")) return "/image/Logo Aplikasi/bstation.png";
        if (nameLower.includes("iqiyi")) return "/image/Logo Aplikasi/iQIYI.jpg";
        return null;
    };

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

        const logoFile = getLogoPath(product.name);
        if (logoFile) {
            return (
                <div className="w-full h-full bg-slate-900/90 p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 opacity-95" />
                    <img src={logoFile} alt={product.name} className="w-16 h-16 object-contain relative z-10 drop-shadow-md" />
                </div>
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

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <BuyerLayout>
            <Head title="Katalog Lengkap Aplikasi & Akun Premium" />

            <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
                {/* Catalog Title */}
                <div className="mb-8 border-b border-slate-200 pb-5">
                    <h1 className="text-2xl font-black text-[#0B2545]">Katalog Aplikasi Premium</h1>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">Temukan seluruh varian lisensi dan paket aplikasi streaming, desain grafis, dan produktivitas terlengkap.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left Sidebar Filter Section */}
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6">

                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Filter Pencarian</h3>
                                <button onClick={handleResetFilters} className="text-[10px] text-rose-600 font-bold hover:underline">
                                    Reset
                                </button>
                            </div>

                            {/* Search */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">Kata Kunci</label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama aplikasi..."
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                                />
                            </div>

                            {/* Categories */}
                            <div className="space-y-3">
                                <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">Kategori</label>
                                <div className="space-y-2.5">
                                    {categories.map((cat) => (
                                        <label key={cat.id} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer font-medium hover:text-slate-900">
                                            <input
                                                type="checkbox"
                                                checked={selectedCats.includes(cat.id.toString())}
                                                onChange={() => handleCategoryChange(cat.id)}
                                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 w-4 h-4"
                                            />
                                            {cat.name}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price range */}
                            <div className="space-y-3">
                                <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">Rentang Harga (Rp)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="Min"
                                        className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                                    />
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Maks"
                                        className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">Urutkan</label>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="name_asc">Nama A-Z</option>
                                    <option value="name_desc">Nama Z-A</option>
                                    <option value="price_asc">Harga Termurah</option>
                                    <option value="price_desc">Harga Termahal</option>
                                </select>
                            </div>

                            <button
                                onClick={handleApplyFilters}
                                className="w-full py-2.5 bg-[#0B2545] hover:bg-[#13315C] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    </div>

                    {/* Right Product Grid */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-5 text-xs text-slate-500">
                            <span className="font-semibold">Menampilkan <strong className="text-slate-800">{products.length}</strong> produk digital</span>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl text-slate-400 font-medium">
                                <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Tidak ada produk premium yang sesuai dengan filter Anda.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                                {products.map((product) => {
                                    const isWished = wishlist.includes(product.id);
                                    const originalPrice = Math.round(product.min_price * 1.25);
                                    return (
                                        <div
                                            key={product.id}
                                            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group relative overflow-hidden shadow-sm"
                                        >
                                            {/* Heart Wishlist overlay button */}
                                            <button
                                                onClick={(e) => toggleWishlist(product.id, e)}
                                                className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 border border-slate-100 hover:scale-110 shadow-sm text-slate-400 hover:text-rose-600 transition-all shrink-0"
                                            >
                                                <svg
                                                    className="w-4.5 h-4.5"
                                                    fill={isWished ? 'currentColor' : 'none'}
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>

                                            <Link href={route('product.show', product.slug)} className="block">
                                                {/* Discount badge */}
                                                {product.badge && (
                                                    <span className="absolute top-0 left-0 bg-rose-600 text-white text-[9px] font-black px-2.5 py-1 rounded-br-xl shadow-sm z-10 uppercase">
                                                        {product.badge}
                                                    </span>
                                                )}

                                                {/* Product Image */}
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

                                            <div className="border-t border-slate-100 pt-3 mt-3 text-left min-h-[44px]">
                                                {product.min_original_price ? (
                                                    <span className="text-[10px] text-slate-400 line-through font-mono block">
                                                        {formatIDR(product.min_original_price)}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-transparent select-none font-mono block">-</span>
                                                )}
                                                <span className="text-xs font-black text-indigo-650 font-mono block mt-0.5">
                                                    {formatIDR(product.min_price)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </BuyerLayout>
    );
}
