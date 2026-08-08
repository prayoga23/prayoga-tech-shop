import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Catalog({ auth, products = [], categories = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategories, setSelectedCategories] = useState(filters.categories || []);
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [sort, setSort] = useState(filters.sort || 'name_asc');

    const handleCategoryToggle = (categoryId) => {
        let updated = [...selectedCategories];
        if (updated.includes(categoryId)) {
            updated = updated.filter(id => id !== categoryId);
        } else {
            updated.push(categoryId);
        }
        setSelectedCategories(updated);
        applyFilters({ categories: updated });
    };

    const applyFilters = (overrides = {}) => {
        const queryParams = {
            search: overrides.search !== undefined ? overrides.search : search,
            categories: overrides.categories !== undefined ? overrides.categories : selectedCategories,
            min_price: overrides.min_price !== undefined ? overrides.min_price : minPrice,
            max_price: overrides.max_price !== undefined ? overrides.max_price : maxPrice,
            sort: overrides.sort !== undefined ? overrides.sort : sort,
        };

        // Filter out empty params
        Object.keys(queryParams).forEach(key => {
            if (!queryParams[key] || (Array.isArray(queryParams[key]) && queryParams[key].length === 0)) {
                delete queryParams[key];
            }
        });

        router.get(route('katalog'), queryParams, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const resetFilters = () => {
        setSearch('');
        setSelectedCategories([]);
        setMinPrice('');
        setMaxPrice('');
        setSort('name_asc');
        router.get(route('katalog'), {}, { replace: true });
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
            <Head title="Katalog Paket Jasa Pembuatan Website & Android - Prayoga Tech" />

            <div className="bg-slate-50 text-slate-900 min-h-screen py-10 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {/* Catalog Header */}
                    <div className="text-center space-y-2">
                        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Katalog Paket Jasa</span>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Layanan Pembuatan Aplikasi Website & Android</h1>
                        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
                            Pilih varian paket layanan pengembangan software house sesuai skala proyek dan anggaran Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Sidebar Filters */}
                        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter Layanan
                                </h3>
                                <button
                                    onClick={resetFilters}
                                    className="text-[10px] text-slate-500 hover:text-indigo-600 font-extrabold uppercase transition-colors"
                                >
                                    Reset All
                                </button>
                            </div>

                            {/* Search Filter */}
                            <form onSubmit={handleSearchSubmit} className="space-y-2">
                                <label className="text-xs font-bold text-slate-800 block">Cari Kata Kunci:</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Misal: Website, E-Commerce, Android..."
                                        className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none focus:bg-white"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg transition-colors shadow-2xs"
                                    >
                                        Cari
                                    </button>
                                </div>
                            </form>

                            {/* Category Filter */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-800 block">Kategori Jasa:</label>
                                <div className="space-y-2">
                                    {categories.map((cat) => {
                                        const isSelected = selectedCategories.includes(cat.id);
                                        return (
                                            <label
                                                key={cat.id}
                                                className={`flex items-center gap-2.5 text-xs p-2.5 rounded-xl border cursor-pointer transition-all ${
                                                    isSelected 
                                                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-extrabold' 
                                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleCategoryToggle(cat.id)}
                                                    className="rounded bg-white border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="truncate">{cat.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sorting */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-800 block">Urutkan Harga:</label>
                                <select
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        applyFilters({ sort: e.target.value });
                                    }}
                                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none"
                                >
                                    <option value="name_asc">Nama (A - Z)</option>
                                    <option value="name_desc">Nama (Z - A)</option>
                                    <option value="price_asc">Harga Termurah</option>
                                    <option value="price_desc">Harga Tertinggi</option>
                                </select>
                            </div>
                        </div>

                        {/* Main Products Grid */}
                        <div className="lg:col-span-9 space-y-6">
                            
                            {/* Filter Summary */}
                            <div className="flex items-center justify-between text-xs text-slate-600 bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-2xs font-medium">
                                <span>Menampilkan <strong className="text-slate-900 font-extrabold">{products.length}</strong> Layanan Paket Pembuatan</span>
                                {selectedCategories.length > 0 && (
                                    <span className="text-indigo-600 font-bold">Filtered by {selectedCategories.length} Kategori</span>
                                )}
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-2xs">
                                    <p className="text-slate-600 text-sm">Tidak ada paket jasa yang sesuai dengan filter pencarian Anda.</p>
                                    <button
                                        onClick={resetFilters}
                                        className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 shadow-2xs"
                                    >
                                        Tampilkan Semua Layanan
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {products.map((product) => {
                                        const minPrice = product.packages && product.packages.length > 0
                                            ? Math.min(...product.packages.map(p => p.price))
                                            : 0;

                                        return (
                                            <div 
                                                key={product.id} 
                                                className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col hover:border-indigo-400 transition-all hover:-translate-y-1 group shadow-sm hover:shadow-md"
                                            >
                                                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-extrabold border border-indigo-200">
                                                                {product.category?.name || 'Paket Jasa'}
                                                            </span>
                                                            {product.badge && (
                                                                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-mono text-[9px] font-black uppercase shadow-xs">
                                                                    {product.badge}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                            {product.name}
                                                        </h3>

                                                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                                            {product.description}
                                                        </p>
                                                    </div>

                                                    {/* Varian paket list */}
                                                    <div className="space-y-2 pt-3 border-t border-slate-100">
                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Varian Paket Layanan:</p>
                                                        {product.packages && product.packages.map((pkg) => (
                                                            <div key={pkg.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span className="font-bold text-slate-800">{pkg.name}</span>
                                                                    <span className="font-black text-indigo-600">{formatIDR(pkg.price)}</span>
                                                                </div>
                                                                <p className="text-[10px] text-slate-500 leading-normal">{pkg.description}</p>
                                                                <div className="text-[9px] text-indigo-600 font-mono pt-1 flex items-center gap-1">
                                                                    <i className="fa-solid fa-bolt-lightning text-[10px] text-amber-500"></i>
                                                                    <span>Estimasi Pengerjaan: {pkg.duration_days} Hari Kerja</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                                                    <div>
                                                        <span className="text-[10px] text-slate-500 block font-medium">Mulai dari</span>
                                                        <span className="text-base font-black text-slate-900">{formatIDR(minPrice)}</span>
                                                    </div>

                                                    <Link
                                                        href={route('product.show', product.slug)}
                                                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-105"
                                                    >
                                                        Pilih & Detail Paket &rarr;
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
}
