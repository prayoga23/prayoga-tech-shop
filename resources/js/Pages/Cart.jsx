import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Cart({ products, paymentMethods }) {
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

    useEffect(() => {
        if (appliedPromo) {
            if (totalPrice < appliedPromo.min_purchase) {
                handleRemovePromo();
                alert('Kode kupon dibatalkan karena total belanja baru di bawah minimum pembelian.');
            } else {
                let newDiscount = 0;
                if (appliedPromo.type === 'fixed') {
                    newDiscount = Math.min(appliedPromo.value, totalPrice);
                } else {
                    newDiscount = Math.floor((appliedPromo.value / 100) * totalPrice);
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
    }, [totalPrice]);

    // Load cart items from localStorage on mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const resolved = storedCart.map(item => {
            let foundPkg = null;
            let foundProd = null;

            for (const prod of products) {
                const pkg = prod.packages.find(p => p.id === item.package_id);
                if (pkg) {
                    foundPkg = pkg;
                    foundProd = prod;
                    break;
                }
            }

            if (foundPkg && foundProd) {
                return {
                    ...item,
                    name: foundProd.name,
                    image_path: foundProd.image_path,
                    category: foundProd.category?.name,
                    packageName: foundPkg.name,
                    price: foundPkg.price,
                };
            }
            return null;
        }).filter(item => item !== null);

        setCartItems(resolved);
    }, [products]);

    // Recalculate total price when cart changes
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    }, [cartItems]);

    const updateQuantity = (packageId, delta) => {
        const updated = cartItems.map(item => {
            if (item.package_id === packageId) {
                const newQty = Math.max(item.quantity + delta, 1);
                return { ...item, quantity: newQty };
            }
            return item;
        });

        setCartItems(updated);

        const local = updated.map(item => ({
            package_id: item.package_id,
            quantity: item.quantity
        }));
        localStorage.setItem('cart', JSON.stringify(local));

        // Dispatch update event
        window.dispatchEvent(new Event('cart-updated'));
    };

    const removeFromCart = (packageId) => {
        const updated = cartItems.filter(item => item.package_id !== packageId);
        setCartItems(updated);

        const local = updated.map(item => ({
            package_id: item.package_id,
            quantity: item.quantity
        }));
        localStorage.setItem('cart', JSON.stringify(local));

        // Dispatch update event
        window.dispatchEvent(new Event('cart-updated'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            alert('Keranjang belanja Anda kosong.');
            return;
        }

        form.post(route('order.checkout-cart'), {
            onSuccess: () => {
                localStorage.removeItem('cart');
                setCartItems([]);
                handleRemovePromo();
                window.dispatchEvent(new Event('cart-updated'));
            }
        });
    };

    useEffect(() => {
        const itemsPayload = cartItems.map(item => ({
            package_id: item.package_id,
            quantity: item.quantity
        }));
        form.setData('items', itemsPayload);
    }, [cartItems]);

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
            <Head title="Keranjang Belanja Akun Premium" />

            <main className="max-w-6xl mx-auto w-full px-6 py-12">
                <div className="mb-8 border-b border-slate-200 pb-5">
                    <h1 className="text-2xl font-black text-[#0B2545]">Keranjang Belanja</h1>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">Kelola kuantitas item dan selesaikan transaksi pembelian gabungan Anda secara aman.</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl text-slate-400 font-medium max-w-3xl mx-auto shadow-sm space-y-4">
                        <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <div className="space-y-1">
                            <h3 className="font-bold text-slate-700 text-sm">Keranjang Anda Kosong</h3>
                            <p className="text-xs text-slate-500">Belum ada paket langganan yang Anda masukkan ke dalam keranjang.</p>
                        </div>
                        <Link href={route('katalog')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-xs transition-all shadow-md inline-block">
                            Belanja Sekarang
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        
                        {/* Left: Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                                    <h3 className="font-bold text-xs text-[#0B2545] uppercase tracking-wider">Daftar Belanja</h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {cartItems.map((item) => (
                                        <div key={item.package_id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50/20 transition-colors">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                                                    {item.image_path ? (
                                                        <img src={`/storage/${item.image_path}`} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="font-bold text-slate-400 text-xs">{item.name.substring(0, 2).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{item.category}</span>
                                                    <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                                                    <span className="text-[11px] text-indigo-650 font-bold block mt-0.5">{item.packageName}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-end gap-6">
                                                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl p-1 shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.package_id, -1)}
                                                        className="w-7 h-7 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-mono text-xs font-bold text-slate-800 px-1">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.package_id, 1)}
                                                        className="w-7 h-7 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <span className="font-mono font-bold text-slate-700 text-xs block">{formatIDR(item.price * item.quantity)}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.package_id)}
                                                        className="text-[10px] text-rose-600 hover:underline font-bold mt-1 block"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Checkout details */}
                        <div className="space-y-6">
                            {!auth.user ? (
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm">Autentikasi Diperlukan</h4>
                                    <p className="text-slate-500 text-[11px] leading-relaxed font-semibold">
                                        Anda harus login atau mendaftar terlebih dahulu sebelum dapat melakukan checkout keranjang belanja.
                                    </p>
                                    <div className="flex gap-2.5 pt-2 justify-center">
                                        <Link href={route('login')} className="px-4 py-2 bg-[#0B2545] hover:bg-[#13315C] text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                                            Masuk
                                        </Link>
                                        <Link href={route('register')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all">
                                            Daftar
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                                        <h3 className="font-bold text-xs text-[#0B2545] border-b border-slate-100 pb-3 uppercase tracking-wider">Form Pengiriman</h3>
                                        
                                        <div>
                                            <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                value={form.data.customer_name}
                                                onChange={(e) => form.setData('customer_name', e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Alamat Email</label>
                                            <input
                                                type="email"
                                                value={form.data.customer_email}
                                                onChange={(e) => form.setData('customer_email', e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Nomor WhatsApp Aktif</label>
                                            <input
                                                type="text"
                                                value={form.data.customer_whatsapp}
                                                onChange={(e) => form.setData('customer_whatsapp', e.target.value)}
                                                placeholder="Contoh: 08123456789"
                                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                                        <h3 className="font-bold text-xs text-[#0B2545] border-b border-slate-100 pb-3 uppercase tracking-wider">Metode Pembayaran</h3>
                                        
                                        {paymentMethods.length === 0 ? (
                                            <p className="text-slate-400 text-xs text-center py-4 bg-slate-50 rounded-xl border border-slate-100">Metode bayar tidak tersedia.</p>
                                        ) : (
                                            <div className="space-y-2.5">
                                                {paymentMethods.map(pm => {
                                                    const isSelected = form.data.payment_method_id === pm.id;
                                                    return (
                                                        <div
                                                            key={pm.id}
                                                            onClick={() => form.setData('payment_method_id', pm.id)}
                                                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                                                                isSelected 
                                                                ? 'bg-indigo-50 border-indigo-650 border-indigo-600 shadow-sm' 
                                                                : 'bg-white border-slate-200 hover:border-slate-300'
                                                            }`}
                                                        >
                                                            <div className="w-4 h-4 rounded-full border border-slate-300 bg-white flex items-center justify-center shrink-0">
                                                                {isSelected && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                                                            </div>
                                                            <span className="font-bold text-xs text-slate-850 text-slate-800">{pm.name}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3.5">
                                        {/* Promo Input Box */}
                                        <div className="border-b border-slate-100 pb-3">
                                            <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Kupon Diskon</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={promoCodeInput}
                                                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                                                    placeholder="Contoh: HEMAT10"
                                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                                                    disabled={appliedPromo !== null}
                                                />
                                                {appliedPromo ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleRemovePromo}
                                                        className="px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 rounded-xl text-[10px] font-bold transition-all"
                                                    >
                                                        Hapus
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={handleApplyPromo}
                                                        className="px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-150 rounded-xl text-[10px] font-bold transition-all"
                                                    >
                                                        Pasang
                                                    </button>
                                                )}
                                            </div>
                                            {promoMessage && (
                                                <p className={`text-[10px] mt-1 font-bold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                    {promoMessage.text}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
                                            <span>Subtotal</span>
                                            <span className="font-mono text-slate-800">{formatIDR(totalPrice)}</span>
                                        </div>

                                        {appliedPromo && (
                                            <div className="flex justify-between items-center text-xs text-emerald-600 font-bold border-t border-dashed border-slate-100 pt-2">
                                                <span>Diskon ({appliedPromo.code}):</span>
                                                <span>-{formatIDR(appliedPromo.discount)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center border-t border-slate-100 pt-3 text-sm font-black">
                                            <span className="text-[#0B2545]">Total Bayar</span>
                                            <span className="font-mono text-indigo-600">{formatIDR(totalPrice - (appliedPromo ? appliedPromo.discount : 0))}</span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={form.processing || paymentMethods.length === 0}
                                            className="w-full py-4 bg-[#0B2545] hover:bg-[#13315C] disabled:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-lg transition-colors mt-2"
                                        >
                                            {form.processing ? 'Sedang Memproses...' : 'Proses Checkout Gabungan'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </BuyerLayout>
    );
}
