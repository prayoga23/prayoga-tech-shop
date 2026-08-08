import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Show({ product, paymentMethods = [] }) {
    const { auth } = usePage().props;
    const [selectedPackage, setSelectedPackage] = useState(product.packages[0] || null);
    const [wishlist, setWishlist] = useState([]);
    const [inWishlist, setInWishlist] = useState(false);
    const [projectNotes, setProjectNotes] = useState('');

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
        window.dispatchEvent(new Event('wishlist-updated'));
    };

    const handleAddToCart = () => {
        if (!selectedPackage) {
            alert('Silakan pilih varian paket terlebih dahulu.');
            return;
        }
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = storedCart.find(item => item.package_id === selectedPackage.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            storedCart.push({
                package_id: selectedPackage.id,
                quantity: 1,
                notes: projectNotes
            });
        }
        localStorage.setItem('cart', JSON.stringify(storedCart));
        window.dispatchEvent(new Event('cart-updated'));

        alert(`Paket ${selectedPackage.name} berhasil ditambahkan ke keranjang pesanan!`);
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
        notes: '',
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
            <Head title={`Detail Paket ${product.name} - Prayoga Tech`} />

            <div className="bg-slate-50 text-slate-900 min-h-screen py-10 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Back Link */}
                    <div>
                        <Link
                            href={route('katalog')}
                            className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-indigo-600 font-extrabold transition-colors"
                        >
                            &larr; Kembali ke Katalog Paket Jasa
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Info Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm relative overflow-hidden">
                                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-black text-xl shrink-0">
                                        <i className="fa-solid fa-layer-group"></i>
                                    </div>
                                    <div>
                                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-extrabold border border-indigo-200">
                                            {product.category?.name || 'Jasa Pembuatan'}
                                        </span>
                                        <h1 className="text-xl font-extrabold text-slate-900 mt-1">{product.name}</h1>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Deskripsi Layanan</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Features & Guarantee Checklist */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                                    <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Keunggulan Layanan Kami:</h4>
                                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                                        <li className="flex items-center gap-2">
                                            <i className="fa-solid fa-circle-check text-emerald-600"></i> Free Domain & Hosting (Paket Tertentu)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <i className="fa-solid fa-circle-check text-emerald-600"></i> Full Source Code & Database Hak Milik
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <i className="fa-solid fa-circle-check text-emerald-600"></i> Garansi Maintenance 1 - 6 Bulan
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <i className="fa-solid fa-circle-check text-emerald-600"></i> Desain Responsive Mobile & Tablet
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Order Form Column */}
                        <div className="lg:col-span-7">
                            {!auth.user ? (
                                <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center mx-auto text-xl">
                                        <i className="fa-solid fa-lock"></i>
                                    </div>
                                    <h3 className="text-lg font-extrabold text-slate-900">Login Terlebih Dahulu</h3>
                                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                                        Untuk melakukan pemesanan paket pembuatan aplikasi, silakan masuk ke akun Anda atau mendaftar terlebih dahulu.
                                    </p>
                                    <div className="flex justify-center gap-3 pt-2">
                                        <Link
                                            href={route('login')}
                                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
                                        >
                                            Masuk Ke Akun
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs rounded-xl transition-all"
                                        >
                                            Daftar Baru
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    {/* 1. Select Package */}
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">1</span>
                                            <h3 className="text-sm font-extrabold text-slate-900">Pilih Varian Paket Layanan</h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {product.packages.map((pkg) => {
                                                const isSelected = selectedPackage?.id === pkg.id;
                                                return (
                                                    <div
                                                        key={pkg.id}
                                                        onClick={() => handlePackageSelect(pkg)}
                                                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${isSelected
                                                                ? 'bg-indigo-50/80 border-indigo-500 shadow-sm'
                                                                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <span className="absolute top-3 right-3 text-indigo-600 font-extrabold text-xs">
                                                                ✓ Terpilih
                                                            </span>
                                                        )}
                                                        <h4 className="font-extrabold text-xs text-slate-900 pr-6">{pkg.name}</h4>
                                                        <p className="font-black text-indigo-600 text-sm mt-1.5">{formatIDR(pkg.price)}</p>
                                                        <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">{pkg.description}</p>
                                                        <div className="text-[9px] text-indigo-600 font-mono mt-2 pt-1 border-t border-slate-200">
                                                            Pengerjaan: ~{pkg.duration_days} Hari Kerja
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* 2. Client Details & Brief Notes */}
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">2</span>
                                            <h3 className="text-sm font-extrabold text-slate-900">Informasi Klien & Brief Proyek</h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-slate-700 tracking-wider mb-1.5">Nama Lengkap Pemesan</label>
                                                <input
                                                    type="text"
                                                    value={form.data.customer_name}
                                                    onChange={(e) => form.setData('customer_name', e.target.value)}
                                                    placeholder="Nama lengkap Anda"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none focus:bg-white"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-slate-700 tracking-wider mb-1.5">Email Klien (Untuk Notifikasi)</label>
                                                <input
                                                    type="email"
                                                    value={form.data.customer_email}
                                                    onChange={(e) => form.setData('customer_email', e.target.value)}
                                                    placeholder="email@domain.com"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none focus:bg-white font-mono"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-700 tracking-wider mb-1.5">Nomor WhatsApp Aktif</label>
                                            <input
                                                type="text"
                                                value={form.data.customer_whatsapp}
                                                onChange={(e) => form.setData('customer_whatsapp', e.target.value)}
                                                placeholder="Contoh: 08990703408"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none focus:bg-white font-mono"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-700 tracking-wider mb-1.5">Catatan / Brief Spesifikasi Proyek (Opsional)</label>
                                            <textarea
                                                value={projectNotes}
                                                onChange={(e) => {
                                                    setProjectNotes(e.target.value);
                                                    form.setData('notes', e.target.value);
                                                }}
                                                placeholder="Tuliskan nama domain impian, konsep warna, fitur khusus, atau catatan penting lainnya..."
                                                rows={3}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* 3. Payment Method */}
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">3</span>
                                            <h3 className="text-sm font-extrabold text-slate-900">Metode Pembayaran Resmi</h3>
                                        </div>

                                        <div className="space-y-2">
                                            {paymentMethods.map((pm) => {
                                                const isSelected = form.data.payment_method_id === pm.id;
                                                return (
                                                    <div
                                                        key={pm.id}
                                                        onClick={() => form.setData('payment_method_id', pm.id)}
                                                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${isSelected
                                                                ? 'bg-indigo-50/80 border-indigo-500'
                                                                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        <div>
                                                            <h4 className="font-extrabold text-xs text-slate-900">{pm.name}</h4>
                                                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{pm.account_number} a/n {pm.account_name}</p>
                                                        </div>
                                                        <span className="text-xs font-bold text-indigo-600">
                                                            {isSelected ? '✓ Terpilih' : 'Pilih'}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Summary & Checkout Action */}
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-600 font-medium">Paket Dipesan:</span>
                                            <span className="font-extrabold text-slate-900">{selectedPackage?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
                                            <span className="text-slate-600 font-medium">Total Investasi Proyek:</span>
                                            <span className="text-lg font-black text-indigo-600">{formatIDR(selectedPackage?.price || 0)}</span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={form.processing || !selectedPackage}
                                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-black text-xs rounded-2xl shadow-md transition-all hover:scale-[1.01]"
                                        >
                                            {form.processing ? 'Memproses Order...' : 'Pesan Layanan Ini Sekarang'}
                                        </button>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={handleAddToCart}
                                                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all"
                                            >
                                                Tambah ke Keranjang
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleToggleWishlist}
                                                className={`px-4 py-3 rounded-xl text-xs font-bold border transition-all ${inWishlist
                                                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                                                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                                                    }`}
                                            >
                                                {inWishlist ? '♥ Wishlist' : '♡ Wishlist'}
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
}
