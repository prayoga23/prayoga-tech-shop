import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Show({ order, groupOrders = [] }) {
    const { settings } = usePage().props;
    const [copied, setCopied] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState({ type: '', text: '' });

    const form = useForm({
        payment_proof: null,
    });

    const isGroup = groupOrders && groupOrders.length > 0;
    const groupTotal = isGroup ? groupOrders.reduce((sum, o) => sum + o.price, 0) : order.price;
    const groupDiscount = isGroup ? groupOrders.reduce((sum, o) => sum + (o.discount_amount || 0), 0) : (order.discount_amount || 0);
    const netTotal = groupTotal - groupDiscount;

    // Handle flash notification
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash?.success) {
            setNotification({ type: 'success', text: flash.success });
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 4000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setNotification({ type: 'error', text: flash.error });
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleUploadProof = (e) => {
        e.preventDefault();
        if (!form.data.payment_proof) {
            alert('Silakan pilih file gambar bukti transfer terlebih dahulu.');
            return;
        }
        form.post(route('order.upload-proof', order.order_number), {
            onSuccess: () => {
                form.reset();
            }
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(order.credentials_sent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const getStatusBanner = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-800 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-amber-850">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            Menunggu Pembayaran
                        </h4>
                        Silakan lakukan pembayaran tepat sebesar <strong className="font-mono text-slate-900">{formatIDR(netTotal)}</strong> ke rekening pembayaran yang tercantum di bawah ini. Setelah transfer, silakan unggah foto bukti pembayaran Anda. {isGroup && "Satu unggahan berlaku untuk semua produk dalam transaksi ini."}
                    </div>
                );
            case 'paid':
                return (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-blue-800 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-blue-800">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Menunggu Verifikasi Admin
                        </h4>
                        Bukti pembayaran telah berhasil diunggah dan sedang diverifikasi oleh administrator. Proses verifikasi biasanya memakan waktu 5-10 menit. Akses akun premium akan muncul di halaman ini setelah dikonfirmasi.
                    </div>
                );
            case 'completed':
                return (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-800 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-emerald-800">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Pesanan Selesai / Terkirim
                        </h4>
                        Pembayaran telah dikonfirmasi dan akses akun premium Anda telah dikirimkan! Detail kredensial dapat disalin di bagian bawah halaman ini.
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-800 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-rose-800">
                            <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Pesanan Dibatalkan
                        </h4>
                        Transaksi ini telah dibatalkan oleh admin. Jika Anda merasa ini adalah kesalahan atau sudah melakukan transfer, silakan hubungi Customer Service kami.
                    </div>
                );
            default:
                return null;
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-50 text-amber-850 border-amber-200';
            case 'paid': return 'bg-blue-50 text-blue-800 border-blue-200';
            case 'completed': return 'bg-emerald-50 text-emerald-850 border-emerald-200';
            case 'cancelled': return 'bg-rose-50 text-rose-850 border-rose-205 border-rose-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
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

    const supportMessage = `Halo admin, saya ingin bertanya terkait pesanan saya dengan nomor invoice: ${order.order_number}.`;
    const waSupportLink = `https://wa.me/${settings?.whatsapp_number || '628123456789'}?text=${encodeURIComponent(supportMessage)}`;

    return (
        <BuyerLayout>
            <Head title={`Invoice ${order.order_number}`} />

            {showNotification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 flex items-center gap-3 border ${
                    notification.type === 'success' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-850' 
                    : 'bg-rose-50 border-rose-200 text-rose-850'
                }`}>
                    <span className="font-medium text-sm">{notification.text}</span>
                </div>
            )}

            <main className="max-w-4xl mx-auto w-full px-6 py-8 md:py-12 space-y-6">
                
                {getStatusBanner(order.status)}

                {/* Main Invoice Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 border-b border-slate-100 pb-6">
                        <div>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Nomor Invoice</span>
                            <h2 className="text-xl md:text-2xl font-black text-slate-800 mt-0.5">{order.order_number}</h2>
                            <span className="text-[10px] text-slate-400 font-medium block mt-1.5">
                                Dibuat Pada: {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusBadgeClass(order.status)}`}>
                                {translateStatus(order.status)}
                            </span>
                            <span className="text-[10px] text-slate-405 text-slate-400 block mt-1 sm:mt-1.5 font-semibold">Metode: {order.payment_method?.name}</span>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Rincian Pembelian</h3>
                        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/20">
                            {isGroup ? (
                                <div className="divide-y divide-slate-100">
                                    {groupOrders.map((o) => (
                                        <div key={o.id} className="p-4 flex justify-between items-center text-xs md:text-sm">
                                            <div className="min-w-0">
                                                <span className="font-bold text-slate-805 text-slate-800 block truncate">
                                                    {o.product_package?.product?.name || 'Aplikasi Premium'}
                                                </span>
                                                <span className="text-[11px] text-indigo-600 font-bold block mt-0.5">
                                                    {o.product_package?.name || 'Paket Langganan'} ({o.product_package?.duration_days} Hari)
                                                </span>
                                                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">Invoice: {o.order_number}</span>
                                            </div>
                                            <span className="font-mono font-bold text-slate-700 ml-4">{formatIDR(o.price)}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 flex justify-between items-center text-sm">
                                    <div className="min-w-0">
                                        <span className="font-bold text-slate-805 text-slate-800 block truncate">
                                            {order.product_package?.product?.name || 'Aplikasi Premium'}
                                        </span>
                                        <span className="text-xs text-indigo-650 font-semibold block mt-0.5">
                                            {order.product_package?.name || 'Paket Langganan'} ({order.product_package?.duration_days} Hari)
                                        </span>
                                    </div>
                                    <span className="font-mono font-bold text-slate-700 ml-4">{formatIDR(order.price)}</span>
                                </div>
                            )}
                             <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2.5 text-xs font-semibold text-slate-500">
                                 <div className="flex justify-between items-center">
                                     <span>Subtotal</span>
                                     <span className="font-mono text-slate-700">{formatIDR(groupTotal)}</span>
                                 </div>
                                 {groupDiscount > 0 && (
                                     <div className="flex justify-between items-center text-emerald-600 font-bold">
                                         <span>Potongan Diskon {order.promo_code && `(${order.promo_code})`}</span>
                                         <span>-{formatIDR(groupDiscount)}</span>
                                     </div>
                                 )}
                                 <div className="flex justify-between items-center border-t border-slate-100 pt-2.5 text-sm font-bold text-slate-800">
                                     <span className="text-[#0B2545]">Total Tagihan {isGroup && "Gabungan"}</span>
                                     <span className="font-mono font-black text-indigo-600 text-base">{formatIDR(netTotal)}</span>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Split details for Payment Details & Proof Upload */}
                    {order.status === 'pending' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            {/* Bank Details */}
                            <div className="p-5 bg-slate-50/60 border border-slate-200 rounded-2xl space-y-4">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Rekening Tujuan Transfer</h4>
                                <div className="space-y-3 text-xs">
                                    <div>
                                        <p className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Bank / E-Wallet</p>
                                        <p className="text-sm font-bold text-indigo-600 mt-0.5">{order.payment_method?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Nomor Rekening / HP</p>
                                        <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">{order.payment_method?.account_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Atas Nama (A.N)</p>
                                        <p className="text-sm font-semibold text-slate-800 mt-0.5">{order.payment_method?.account_name}</p>
                                    </div>
                                </div>

                                {order.payment_method?.qr_code_path && (
                                    <div className="border-t border-slate-200 pt-4">
                                        <p className="text-slate-400 font-semibold uppercase tracking-wider text-[9px] mb-2">Scan QRIS Untuk E-Wallet</p>
                                        <div className="w-36 h-36 bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-center shadow-sm">
                                            <img 
                                                src={`/storage/${order.payment_method.qr_code_path}`} 
                                                alt="QR Code Transfer" 
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Upload form */}
                            <div className="p-5 bg-slate-50/60 border border-slate-200 rounded-2xl space-y-4">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Unggah Bukti Transfer</h4>
                                <form onSubmit={handleUploadProof} className="space-y-4">
                                    <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors bg-white shadow-inner-sm">
                                        <input
                                            type="file"
                                            onChange={(e) => form.setData('payment_proof', e.target.files[0])}
                                            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-slate-100 file:text-indigo-650 hover:file:bg-slate-200"
                                            required
                                        />
                                        <p className="text-[10px] text-slate-400 mt-2">File diperbolehkan: JPEG, PNG, JPG (Maks. 4MB)</p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 transition-all"
                                    >
                                        {form.processing ? 'Sedang Mengirim...' : 'Kirim Bukti Pembayaran'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Group/Single Delivered Credentials */}
                    {isGroup ? (
                        groupOrders.some(o => o.status === 'completed' && o.credentials_sent) && (
                            <div className="space-y-4 border-t border-slate-150 pt-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kredensial Akses Akun</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {groupOrders.map(o => {
                                        if (o.status !== 'completed' || !o.credentials_sent) return null;
                                        return (
                                            <div key={o.id} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                                                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                                                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                        {o.product_package?.product?.name} ({o.product_package?.name})
                                                    </h4>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(o.credentials_sent);
                                                            alert('Kredensial akses berhasil disalin!');
                                                        }}
                                                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-550 hover:text-slate-800 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-colors shadow-sm"
                                                    >
                                                        Salin
                                                    </button>
                                                </div>
                                                <div className="bg-white border border-slate-100 rounded-xl p-4 font-mono text-xs text-slate-700 whitespace-pre-line leading-relaxed shadow-inner">
                                                    {o.credentials_sent}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    ) : (
                        order.status === 'completed' && order.credentials_sent && (
                            <div className="bg-emerald-50 border border-emerald-250 border-emerald-200 rounded-2xl p-6 space-y-4">
                                <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
                                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Akses Akun Premium Anda
                                    </h4>
                                    <button
                                        onClick={handleCopy}
                                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-500 hover:text-slate-850 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors shadow-sm"
                                    >
                                        {copied ? 'Tersalin!' : 'Salin Akses'}
                                    </button>
                                </div>
                                <div className="bg-white border border-slate-100 rounded-xl p-4 font-mono text-xs md:text-sm text-slate-700 whitespace-pre-line leading-relaxed shadow-inner">
                                    {order.credentials_sent}
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="flex justify-center pt-2">
                    <a
                        href={waSupportLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-650 rounded-2xl text-xs font-bold transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5 text-emerald-555 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Butuh Bantuan? Hubungi Admin via WhatsApp
                    </a>
                </div>
            </main>
        </BuyerLayout>
    );
}
