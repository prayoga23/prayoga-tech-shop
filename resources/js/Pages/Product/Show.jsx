import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Show({ product, paymentMethods }) {
    const { auth } = usePage().props;
    const [selectedPackage, setSelectedPackage] = useState(product.packages[0] || null);
    const [wishlist, setWishlist] = useState([]);
    const [inWishlist, setInWishlist] = useState(false);

    // Load cart and wishlist from localStorage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(storedWishlist);
        setInWishlist(storedWishlist.includes(product.id));
    }, [product.id]);

    const handleToggleWishlist = () => {
        let updated = [...wishlist];
        if (updated.includes(product.id)) {
            updated = updated.filter(id => id !== product.id);
            setInWishlist(false);
        } else {
            updated.push(product.id);
            setInWishlist(true);
        }
        localStorage.setItem('wishlist', JSON.stringify(updated));
        setWishlist(updated);
        
        // Dispatch update event
        window.dispatchEvent(new Event('wishlist-updated'));
    };

    const handleAddToCart = () => {
        if (!selectedPackage) {
            alert('Silakan pilih paket terlebih dahulu.');
            return;
        }
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = storedCart.find(item => item.package_id === selectedPackage.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            storedCart.push({ package_id: selectedPackage.id, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(storedCart));
        
        // Dispatch update event
        window.dispatchEvent(new Event('cart-updated'));

        alert(`Paket ${selectedPackage.name} berhasil ditambahkan ke keranjang belanja!`);
    };

    const [promoCodeInput, setPromoCodeInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoMessage, setPromoMessage] = useState(null);

    const form = useForm({
        customer_name: auth.user?.name || '',
        customer_email: auth.user?.email || '',
        customer_whatsapp: '',
        product_package_id: product.packages[0]?.id || '',
        payment_method_id: paymentMethods[0]?.id || '',
        promo_code: '',
    });

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        form.setData('product_package_id', pkg.id);
    };

    const handleApplyPromo = async () => {
        if (!promoCodeInput.trim()) return;
        try {
            const response = await fetch(route('promo.validate'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({
                    code: promoCodeInput,
                    total: selectedPackage?.price || 0
                })
            });
            const result = await response.json();
            if (result.valid) {
                setAppliedPromo(result);
                form.setData('promo_code', result.code);
                setPromoMessage({ type: 'success', text: result.message });
            } else {
                setPromoMessage({ type: 'error', text: result.message });
            }
        } catch (err) {
            setPromoMessage({ type: 'error', text: 'Terjadi kesalahan sistem saat validasi promo.' });
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCodeInput('');
        form.setData('promo_code', '');
        setPromoMessage(null);
    };

    useEffect(() => {
        if (appliedPromo && selectedPackage) {
            if (selectedPackage.price < appliedPromo.min_purchase) {
                handleRemovePromo();
                alert('Kode kupon dibatalkan karena harga paket baru di bawah minimum pembelian.');
            } else {
                let newDiscount = 0;
                if (appliedPromo.type === 'fixed') {
                    newDiscount = Math.min(appliedPromo.value, selectedPackage.price);
                } else {
                    newDiscount = Math.floor((appliedPromo.value / 100) * selectedPackage.price);
                    if (appliedPromo.max_discount) {
                        newDiscount = Math.min(newDiscount, appliedPromo.max_discount);
                    }
                }
                setAppliedPromo(prev => ({
                    ...prev,
                    discount: newDiscount
                }));
            }
        }
    }, [selectedPackage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('order.store'));
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
            <Head title={`Beli ${product.name} Premium Murah`} />

            <main className="max-w-7xl mx-auto w-full px-6 py-8 md:py-12 z-10 relative">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href={route('home')}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Katalog
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: Product Info */}
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 w-28 h-28 bg-indigo-500 rounded-full blur-2xl"></div>
                            
                            <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-400 text-base overflow-hidden shadow-inner shrink-0">
                                    {product.image_path ? (
                                        <img 
                                            src={`/storage/${product.image_path}`} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        product.name.substring(0, 2).toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-405 text-slate-400 font-bold uppercase tracking-wider block">
                                        {product.category?.name || 'Aplikasi'}
                                    </span>
                                    <h2 className="font-extrabold text-lg text-slate-800 mt-0.5">{product.name}</h2>
                                </div>
                            </div>

                            <div className="space-y-4 text-slate-600 text-xs md:text-sm leading-relaxed">
                                <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Deskripsi Aplikasi</h3>
                                <p className="whitespace-pre-line text-slate-600 font-medium">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Form */}
                    <div className="lg:col-span-2">
                        {!auth.user ? (
                            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm space-y-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h4 className="font-extrabold text-slate-800 text-base">Autentikasi Diperlukan</h4>
                                <p className="text-slate-555 text-slate-500 text-xs md:text-sm leading-relaxed max-w-md mx-auto font-medium">
                                    Untuk membeli aplikasi premium, Anda harus login atau mendaftar terlebih dahulu. Hal ini membantu Anda memantau status pembayaran dan mengakses informasi kredensial akun yang dibeli secara aman di dashboard pribadi Anda.
                                </p>
                                <div className="flex justify-center gap-3.5 pt-4">
                                    <Link
                                        href={route('login')}
                                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                                    >
                                        Masuk / Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all"
                                    >
                                        Daftar Akun Baru
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5 mb-4">
                                        <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-extrabold flex items-center justify-center">1</span>
                                        <h3 className="text-sm font-bold text-slate-800">Pilih Paket Langganan</h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {product.packages.map((pkg) => {
                                            const isSelected = selectedPackage?.id === pkg.id;
                                            return (
                                                <div
                                                    key={pkg.id}
                                                    onClick={() => handlePackageSelect(pkg)}
                                                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                                                        isSelected
                                                            ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                                                            : 'bg-white border-slate-200 hover:border-slate-300'
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <span className="absolute top-3 right-3 text-indigo-600">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                    <h4 className="font-bold text-sm text-slate-800 pr-6">{pkg.name}</h4>
                                                    <p className="font-mono font-extrabold text-indigo-600 text-sm mt-1.5">{formatIDR(pkg.price)}</p>
                                                    {pkg.description && (
                                                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed font-medium">{pkg.description}</p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5 mb-4">
                                        <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-extrabold flex items-center justify-center">2</span>
                                        <h3 className="text-sm font-bold text-slate-800">Informasi Kontak & Pengiriman</h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Nama Penerima</label>
                                            <input
                                                type="text"
                                                value={form.data.customer_name}
                                                onChange={(e) => form.setData('customer_name', e.target.value)}
                                                placeholder="Masukkan nama lengkap"
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Alamat Email (Penting)</label>
                                            <input
                                                type="email"
                                                value={form.data.customer_email}
                                                onChange={(e) => form.setData('customer_email', e.target.value)}
                                                placeholder="alamat.email@gmail.com"
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 font-mono"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Nomor WhatsApp Aktif</label>
                                        <input
                                            type="text"
                                            value={form.data.customer_whatsapp}
                                            onChange={(e) => form.setData('customer_whatsapp', e.target.value)}
                                            placeholder="Contoh: 081234567890"
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 font-mono"
                                            required
                                        />
                                        <span className="text-[9px] text-slate-400 block mt-1.5 font-medium">Masukkan nomor WhatsApp aktif Anda untuk memudahkan koordinasi garansi atau bantuan.</span>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5 mb-4">
                                        <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-extrabold flex items-center justify-center">3</span>
                                        <h3 className="text-sm font-bold text-slate-800">Pilih Metode Pembayaran</h3>
                                    </div>

                                    {paymentMethods.length === 0 ? (
                                        <div className="p-4 text-center text-slate-400 text-xs font-medium border border-slate-100 rounded-xl bg-slate-50">
                                            Belum ada metode transfer bank yang tersedia. Harap hubungi admin.
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {paymentMethods.map((pm) => {
                                                const isSelected = form.data.payment_method_id === pm.id;
                                                return (
                                                    <div
                                                        key={pm.id}
                                                        onClick={() => form.setData('payment_method_id', pm.id)}
                                                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                                                            isSelected
                                                                ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                                                                : 'bg-white border-slate-200 hover:border-slate-350 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <div className="w-4.5 h-4.5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 bg-white">
                                                            {isSelected && <div className="w-2.5 h-2.5 bg-indigo-650 bg-indigo-600 rounded-full" />}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="font-bold text-xs text-slate-805 text-slate-800">{pm.name}</h4>
                                                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Transfer Manual • Verifikasi Admin</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                                    {/* Promo Input Box */}
                                    <div className="border-b border-slate-100 pb-4">
                                        <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Punya Kode Promo / Kupon?</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={promoCodeInput}
                                                onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                                                placeholder="Contoh: HEMAT10"
                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                                                disabled={appliedPromo !== null}
                                            />
                                            {appliedPromo ? (
                                                <button
                                                    type="button"
                                                    onClick={handleRemovePromo}
                                                    className="px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 rounded-xl text-xs font-bold transition-all"
                                                >
                                                    Hapus
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleApplyPromo}
                                                    className="px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-150 rounded-xl text-xs font-bold transition-all"
                                                >
                                                    Pasang
                                                </button>
                                            )}
                                        </div>
                                        {promoMessage && (
                                            <p className={`text-[10px] mt-1.5 font-bold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                {promoMessage.text}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400 font-semibold uppercase tracking-wider">Item Dipesan:</span>
                                        <span className="font-bold text-slate-800">{product.name} ({selectedPackage?.name})</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
                                        <span className="text-slate-400 font-semibold uppercase tracking-wider">Harga Paket:</span>
                                        <span className="font-bold text-slate-800">{formatIDR(selectedPackage?.price || 0)}</span>
                                    </div>
                                    {appliedPromo && (
                                        <div className="flex justify-between items-center text-xs text-emerald-600 font-bold border-t border-dashed border-slate-100 pt-2">
                                            <span>Potongan Diskon ({appliedPromo.code}):</span>
                                            <span>-{formatIDR(appliedPromo.discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Total Pembayaran:</span>
                                        <span className="font-mono font-extrabold text-indigo-600 text-base">
                                            {formatIDR((selectedPackage?.price || 0) - (appliedPromo ? appliedPromo.discount : 0))}
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={form.processing || !selectedPackage || paymentMethods.length === 0}
                                        className="w-full py-4 bg-[#0B2545] hover:bg-[#13315C] disabled:bg-slate-700 text-white rounded-2xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {form.processing ? 'Sedang Memproses...' : 'Beli Langsung Sekarang'}
                                    </button>

                                    <div className="flex gap-3.5 mt-4">
                                        <button
                                            type="button"
                                            onClick={handleAddToCart}
                                            disabled={!selectedPackage}
                                            className="flex-1 py-3 border border-indigo-605 border-indigo-600 hover:bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                                        >
                                            Tambah Ke Keranjang
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleToggleWishlist}
                                            className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${
                                                inWishlist 
                                                ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100' 
                                                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                                            }`}
                                            title="Simpan ke Wishlist"
                                        >
                                            <svg className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </BuyerLayout>
    );
}
