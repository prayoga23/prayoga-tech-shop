import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Cart({ products = [], paymentMethods = [] }) {
    const { auth } = usePage().props;
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [promoCodeInput, setPromoCodeInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoMessage, setPromoMessage] = useState(null);

    const form = useForm({
        customer_name: auth.user?.name || '',
        customer_email: auth.user?.email || '',
        customer_whatsapp: '',
        payment_method_id: paymentMethods[0]?.id || '',
        promo_code: '',
        items: []
    });

    useEffect(() => {
        if (auth.user) {
            form.setData(prev => ({
                ...prev,
                customer_name: auth.user.name || '',
                customer_email: auth.user.email || '',
            }));
        }
    }, [auth.user]);

    // Load cart items from localStorage on mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const resolved = storedCart.map(item => {
            let foundPkg = null;
            let foundProd = null;

            for (const prod of products) {
                const pkg = prod.packages?.find(p => p.id === item.package_id);
                if (pkg) {
                    foundPkg = pkg;
                    foundProd = prod;
                    break;
                }
            }

            if (foundPkg && foundProd) {
                return {
                    package_id: foundPkg.id,
                    quantity: item.quantity || 1,
                    package_name: foundPkg.name,
                    product_name: foundProd.name,
                    price: foundPkg.price,
                    image_path: foundProd.image_path,
                    category_name: foundProd.category?.name || 'Paket Jasa',
                    notes: item.notes || ''
                };
            }
            return null;
        }).filter(Boolean);

        setCartItems(resolved);

        const total = resolved.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        setTotalPrice(total);

        form.setData('items', resolved.map(i => ({ package_id: i.package_id, quantity: i.quantity })));
    }, [products]);

    const updateCartInStorage = (updated) => {
        setCartItems(updated);

        const total = updated.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        setTotalPrice(total);

        const localStorageFormat = updated.map(i => ({ package_id: i.package_id, quantity: i.quantity, notes: i.notes }));
        localStorage.setItem('cart', JSON.stringify(localStorageFormat));
        window.dispatchEvent(new Event('cart-updated'));

        form.setData('items', updated.map(i => ({ package_id: i.package_id, quantity: i.quantity })));
    };

    const handleRemoveItem = (packageId) => {
        const updated = cartItems.filter(i => i.package_id !== packageId);
        updateCartInStorage(updated);
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
                    total: totalPrice
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

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert('Keranjang belanja Anda masih kosong.');
            return;
        }
        form.post(route('order.checkout-cart'), {
            onSuccess: () => {
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('cart-updated'));
            }
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

    return (
        <BuyerLayout>
            <Head title="Keranjang Pesanan Layanan - Prayoga Tech" />

            <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Keranjang Layanan</span>
                        <h1 className="text-3xl font-black text-white">Ringkasan Pesanan Software House</h1>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-xl">
                            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto text-3xl">
                                🛒
                            </div>
                            <h3 className="text-lg font-bold text-white">Keranjang Pesanan Masih Kosong</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Anda belum menambahkan paket pembuatan website atau aplikasi Android ke keranjang.
                            </p>
                            <Link
                                href={route('katalog')}
                                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                            >
                                Lihat Katalog Paket Jasa &rarr;
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Left Item List */}
                            <div className="lg:col-span-7 space-y-4">
                                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                                    <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                                        Daftar Paket Dipesan ({cartItems.length} Layanan)
                                    </h3>

                                    <div className="space-y-3">
                                        {cartItems.map((item, idx) => (
                                            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                                                <div className="space-y-1 truncate">
                                                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider block">
                                                        {item.category_name}
                                                    </span>
                                                    <h4 className="font-bold text-xs text-white truncate">{item.product_name}</h4>
                                                    <p className="text-[11px] text-cyan-300 font-semibold">{item.package_name}</p>
                                                    {item.notes && (
                                                        <p className="text-[10px] text-slate-400 italic">Brief: "{item.notes}"</p>
                                                    )}
                                                </div>

                                                <div className="text-right shrink-0 space-y-2">
                                                    <span className="font-black text-sm text-white block">{formatIDR(item.price)}</span>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.package_id)}
                                                        className="text-[10px] text-rose-400 hover:underline font-bold"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Checkout Form */}
                            <div className="lg:col-span-5 space-y-6">
                                {!auth.user ? (
                                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-3 shadow-xl">
                                        <h3 className="text-sm font-bold text-white">Login untuk Melanjutkan Checkout</h3>
                                        <p className="text-xs text-slate-400">
                                            Masuk ke akun Anda untuk menyelesaikan transaksi pemesanan layanan.
                                        </p>
                                        <div className="pt-2 flex justify-center gap-2">
                                            <Link href={route('login')} className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                                                Masuk / Login
                                            </Link>
                                            <Link href={route('register')} className="px-5 py-2 bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl">
                                                Daftar
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitOrder} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
                                        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Formulir Checkout Pesanan</h3>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Nama Pemesan</label>
                                            <input
                                                type="text"
                                                value={form.data.customer_name}
                                                onChange={(e) => form.setData('customer_name', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Email Klien</label>
                                            <input
                                                type="email"
                                                value={form.data.customer_email}
                                                onChange={(e) => form.setData('customer_email', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Nomor WhatsApp Aktif</label>
                                            <input
                                                type="text"
                                                value={form.data.customer_whatsapp}
                                                onChange={(e) => form.setData('customer_whatsapp', e.target.value)}
                                                placeholder="081234567890"
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Metode Pembayaran</label>
                                            <select
                                                value={form.data.payment_method_id}
                                                onChange={(e) => form.setData('payment_method_id', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                                            >
                                                {paymentMethods.map(pm => (
                                                    <option key={pm.id} value={pm.id}>{pm.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Promo Box */}
                                        <div className="space-y-2 pt-2 border-t border-slate-800">
                                            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Kode Kupon Promo</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={promoCodeInput}
                                                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                                                    placeholder="KODE PROMO"
                                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase"
                                                    disabled={appliedPromo !== null}
                                                />
                                                {appliedPromo ? (
                                                    <button type="button" onClick={handleRemovePromo} className="px-3 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold">Hapus</button>
                                                ) : (
                                                    <button type="button" onClick={handleApplyPromo} className="px-3 bg-indigo-600 text-white rounded-xl text-xs font-bold">Gunakan</button>
                                                )}
                                            </div>
                                            {promoMessage && (
                                                <p className={`text-[10px] font-bold ${promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{promoMessage.text}</p>
                                            )}
                                        </div>

                                        {/* Total Summary */}
                                        <div className="pt-3 border-t border-slate-800 space-y-2">
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>Subtotal:</span>
                                                <span className="font-bold text-white">{formatIDR(totalPrice)}</span>
                                            </div>
                                            {appliedPromo && (
                                                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                                                    <span>Diskon ({appliedPromo.code}):</span>
                                                    <span>-{formatIDR(appliedPromo.discount)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-sm border-t border-slate-800 pt-2">
                                                <span className="font-bold text-slate-300">Total Pembayaran:</span>
                                                <span className="font-black text-cyan-400">{formatIDR(totalPrice - (appliedPromo ? appliedPromo.discount : 0))}</span>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={form.processing || cartItems.length === 0}
                                            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-black text-xs rounded-2xl shadow-xl transition-all"
                                        >
                                            {form.processing ? 'Memproses Pesanan...' : 'Proses Pesanan Sekarang'}
                                        </button>
                                    </form>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </BuyerLayout>
    );
}
