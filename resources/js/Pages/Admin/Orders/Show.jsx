import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ order, groupOrders = [] }) {
    const [isZoomed, setIsZoomed] = useState(false);

    const credentialForm = useForm({
        credentials_sent: order.credentials_sent || '',
    });

    const statusForm = useForm();

    const handleConfirmPayment = () => {
        if (confirm('Konfirmasi bahwa pembayaran dari pembeli telah diterima?')) {
            statusForm.patch(route('admin.orders.confirm', order.id));
        }
    };

    const handleCancelOrder = () => {
        if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
            statusForm.patch(route('admin.orders.cancel', order.id));
        }
    };

    const handleDeliverCredentials = (e) => {
        e.preventDefault();
        credentialForm.patch(route('admin.orders.deliver', order.id));
    };

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-amber-50 text-amber-800 border-amber-200';
            case 'paid':
                return 'bg-blue-50 text-blue-800 border-blue-200';
            case 'completed':
                return 'bg-emerald-50 text-emerald-800 border-emerald-200';
            case 'cancelled':
                return 'bg-rose-50 text-rose-800 border-rose-200';
            default:
                return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const translateStatus = (status) => {
        switch (status) {
            case 'pending': return 'Belum Bayar';
            case 'paid': return 'Verifikasi Admin';
            case 'completed': return 'Selesai';
            case 'cancelled': return 'Dibatalkan';
            default: return status;
        }
    };

    const waLink = `https://wa.me/${order.customer_whatsapp.replace(/[^0-9]/g, '')}`;

    const isGroup = groupOrders && groupOrders.length > 0;
    const groupTotal = isGroup ? groupOrders.reduce((sum, o) => sum + o.price, 0) : order.price;

    return (
        <AdminLayout title={`Detail Pesanan - ${order.order_number}`}>
            <Head title={`Pesanan ${order.order_number}`} />

            <div className="mb-4">
                <Link
                    href={route('admin.orders.index')}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Daftar Pesanan
                </Link>
            </div>

            {/* Split Layout: Info & Verification */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Left Side: Order & Customer Details (2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Invoice Info Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-100 pb-4">
                            <div>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nomor Pesanan</span>
                                <h2 className="text-xl font-bold text-slate-800 mt-0.5">{order.order_number}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusClass(order.status)}`}>
                                    {translateStatus(order.status)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                            <div>
                                <p className="text-slate-400 uppercase tracking-wider text-[10px]">Tanggal Dibuat</p>
                                <p className="text-slate-700 mt-1">
                                    {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 uppercase tracking-wider text-[10px]">Metode Transfer</p>
                                <p className="text-indigo-600 mt-1">{order.payment_method?.name || 'Manual Transfer'}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 uppercase tracking-wider text-[10px]">{isGroup ? "Total Tagihan Grup" : "Total Tagihan"}</p>
                                <p className="text-slate-800 font-bold mt-1 text-sm">{formatIDR(groupTotal)}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 uppercase tracking-wider text-[10px]">ID Akun Pembeli</p>
                                <p className="text-slate-600 mt-1 font-mono">{order.user_id ? `User #${order.user_id}` : 'Guest (Tanpa Akun)'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Detail Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Data Pemesan</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Nama Lengkap</span>
                                <p className="text-sm text-slate-700 font-bold mt-1">{order.customer_name}</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Alamat Email</span>
                                <p className="text-sm text-slate-700 font-bold mt-1 font-mono">{order.customer_email}</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Nomor WhatsApp</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-sm text-slate-700 font-bold font-mono">{order.customer_whatsapp}</p>
                                    <a 
                                        href={waLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="p-1 rounded bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all text-xs"
                                        title="Chat WhatsApp"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
                            Produk yang Dipesan {isGroup && `(Grup Checkout - ${groupOrders.length} Item)`}
                        </h3>
                        {isGroup ? (
                            <div className="divide-y divide-slate-100">
                                {groupOrders.map((o) => (
                                    <div key={o.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs overflow-hidden shrink-0">
                                                {o.product_package?.product?.image_path ? (
                                                    <img 
                                                        src={`/storage/${o.product_package.product.image_path}`} 
                                                        alt={o.product_package.product.name} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    o.product_package?.product?.name.substring(0, 2).toUpperCase()
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <Link href={route('admin.orders.show', o.id)} className="font-bold text-xs text-slate-800 hover:text-indigo-600 transition-colors block truncate">
                                                    {o.product_package?.product?.name}
                                                </Link>
                                                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                                                    Paket: <span className="text-indigo-650 font-bold">{o.product_package?.name}</span> • Durasi: {o.product_package?.duration_days} Hari
                                                </p>
                                                <p className="text-[9px] text-slate-400 font-mono mt-0.5">Invoice: {o.order_number}</p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="font-mono text-xs font-bold text-slate-700 block">{formatIDR(o.price)}</span>
                                            <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded border mt-1 ${getStatusClass(o.status)}`}>
                                                {translateStatus(o.status)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center font-bold text-slate-400 text-sm overflow-hidden shadow-inner shrink-0">
                                    {order.product_package?.product?.image_path ? (
                                        <img 
                                            src={`/storage/${order.product_package.product.image_path}`} 
                                            alt={order.product_package.product.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        order.product_package?.product?.name.substring(0, 2).toUpperCase()
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-slate-800">{order.product_package?.product?.name}</h4>
                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                                        Paket: <span className="text-indigo-650 font-bold">{order.product_package?.name}</span> • Durasi: {order.product_package?.duration_days} Hari
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Access Credentials Section */}
                    {order.status === 'completed' ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Akses Akun Premium Telah Dikirimkan
                            </div>
                            <div className="bg-white border border-slate-100 rounded-xl p-4 font-mono text-sm text-slate-700 whitespace-pre-line leading-relaxed shadow-inner">
                                {order.credentials_sent}
                            </div>
                        </div>
                    ) : order.status !== 'cancelled' ? (
                        /* Form to send credentials */
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Kirim Akses Akun Premium</h3>
                            <form onSubmit={handleDeliverCredentials} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                                        Detail Kredensial / Akses Akun
                                    </label>
                                    <textarea
                                        value={credentialForm.data.credentials_sent}
                                        onChange={(e) => credentialForm.setData('credentials_sent', e.target.value)}
                                        placeholder="Contoh:&#10;Email: buyer.spotify@gmail.com&#10;Password: spotifypro123&#10;Profil: Profil 2&#10;Masa Aktif: s.d 21 Agustus 2026&#10;Catatan: Harap tidak mengubah password / profile lain agar garansi tidak hangus."
                                        rows="6"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-450 resize-y"
                                        required
                                    />
                                    {credentialForm.errors.credentials_sent && (
                                        <p className="text-rose-600 text-xs font-medium mt-1">{credentialForm.errors.credentials_sent}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={credentialForm.processing}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-505 hover:bg-indigo-550 disabled:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    {credentialForm.processing ? 'Mengirim...' : 'Kirim Akses & Selesaikan Pesanan'}
                                </button>
                            </form>
                        </div>
                    ) : null}
                </div>

                {/* Right Side: Verification Actions & Proof (1 column) */}
                <div className="space-y-6">
                    {/* Actions Card */}
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Tindakan Admin</h3>
                            <div className="space-y-3">
                                {(order.status === 'pending' || order.status === 'paid') && (
                                    <button
                                        onClick={handleConfirmPayment}
                                        disabled={statusForm.processing}
                                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Konfirmasi Pembayaran Diterima
                                    </button>
                                )}
                                <button
                                    onClick={handleCancelOrder}
                                    disabled={statusForm.processing}
                                    className="w-full py-2.5 bg-white border border-slate-200 hover:bg-rose-50 text-rose-600 hover:border-rose-350 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    Batalkan Transaksi
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Proof of Payment Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Bukti Pembayaran</h3>
                        
                        {order.payment_proof_path ? (
                            <div className="space-y-3">
                                <div 
                                    onClick={() => setIsZoomed(true)} 
                                    className="border border-slate-150 bg-slate-50 rounded-xl overflow-hidden cursor-zoom-in relative aspect-[3/4] flex items-center justify-center group shadow-inner"
                                >
                                    <img 
                                        src={`/storage/${order.payment_proof_path}`} 
                                        alt="Bukti Pembayaran" 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <span className="px-3 py-1.5 bg-white/95 text-[10px] font-bold text-slate-700 rounded-lg border border-slate-200 shadow-xl">
                                            Klik untuk memperbesar
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsZoomed(true)}
                                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-650 text-slate-600 transition-colors shadow-sm"
                                >
                                    Perbesar Gambar Receipt
                                </button>
                            </div>
                        ) : (
                            <div className="py-12 text-center text-slate-400 text-xs font-medium border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                <svg className="w-10 h-10 mx-auto mb-2 text-slate-205 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Bukti transfer belum diunggah oleh pembeli.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Zoom Modal */}
            {isZoomed && order.payment_proof_path && (
                <div 
                    onClick={() => setIsZoomed(false)}
                    className="fixed inset-0 bg-slate-900/90 z-[60] flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
                >
                    <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
                        <img 
                            src={`/storage/${order.payment_proof_path}`} 
                            alt="Bukti Transfer Zoomed" 
                            className="max-w-full max-h-[85vh] object-contain rounded-lg border border-slate-200 bg-white shadow-2xl"
                        />
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                            className="absolute -top-12 right-0 px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-xl"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
