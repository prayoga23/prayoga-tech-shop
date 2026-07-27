import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Wishlist({ products }) {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const filtered = products.filter(p => storedWishlist.includes(p.id));
        setWishlistItems(filtered);
    }, [products]);

    const removeFromWishlist = (productId) => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const updated = storedWishlist.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updated));
        setWishlistItems(wishlistItems.filter(item => item.id !== productId));

        // Dispatch update event
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

    return (
        <BuyerLayout>
            <Head title="Wishlist Produk Favorit Saya" />

            <main className="max-w-5xl mx-auto w-full px-6 py-12">
                <div className="mb-8 border-b border-slate-200 pb-5">
                    <h1 className="text-2xl font-black text-[#0B2545]">Wishlist Saya</h1>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">Daftar produk digital premium favorit Anda yang disimpan untuk dibeli nanti.</p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl text-slate-400 font-medium max-w-3xl mx-auto shadow-sm space-y-4">
                        <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <div className="space-y-1">
                            <h3 className="font-bold text-slate-700 text-sm">Wishlist Anda Kosong</h3>
                            <p className="text-xs text-slate-500">Belum ada produk premium yang Anda tandai sebagai favorit.</p>
                        </div>
                        <Link href={route('katalog')} className="px-5 py-2.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-xs transition-all shadow-md inline-block">
                            Jelajahi Katalog
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((product) => (
                            <div key={product.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all shadow-sm group relative">
                                
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 rounded-full text-slate-400 hover:text-rose-600 transition-all shadow-sm"
                                    title="Hapus dari Wishlist"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>

                                <div>
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                                            {product.image_path ? (
                                                <img src={`/storage/${product.image_path}`} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-bold text-slate-400 text-sm">{product.name.substring(0, 2).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{product.category?.name}</span>
                                            <h3 className="font-bold text-sm text-slate-800 truncate mt-0.5">{product.name}</h3>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium mb-4">{product.description}</p>
                                </div>

                                <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-2">
                                    <div>
                                        <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Harga Mulai</span>
                                        <span className="font-mono font-bold text-slate-800 text-xs mt-0.5">{formatIDR(product.min_price)}</span>
                                    </div>
                                    <Link
                                        href={route('product.show', product.slug)}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                                    >
                                        Beli Sekarang
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </BuyerLayout>
    );
}
