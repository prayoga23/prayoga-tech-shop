import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Dashboard({ auth, orders, settings }) {
    const [viewingCredentials, setViewingCredentials] = useState(null);

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

    return (
        <BuyerLayout>
            <Head title="Dashboard Transaksi Saya" />

            <main className="max-w-5xl mx-auto w-full px-6 py-8 md:py-12 space-y-6">
                
                {/* Dashboard Title Header */}
                <div className="mb-8 border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-[#0B2545]">Riwayat Pemesanan Saya</h1>
                        <p className="text-xs text-slate-500 mt-1.5 font-medium">Daftar seluruh riwayat pembelian akun premium, status pembayaran, dan akses kredensial Anda.</p>
                    </div>
                    <div>
                        <Link
                            href={route('home')}
                            className="px-5 py-2.5 bg-[#0B2545] hover:bg-[#13315C] text-white rounded-xl text-xs font-bold shadow-md transition-colors inline-block"
                        >
                            Belanja Lagi
                        </Link>
                    </div>
                </div>

                {/* Orders History Grid */}
                <div className="space-y-4">

                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider bg-slate-50/50">
                                        <th className="px-6 py-4.5 font-semibold">Nomor Invoice</th>
                                        <th className="px-6 py-4.5 font-semibold">Aplikasi & Paket</th>
                                        <th className="px-6 py-4.5 font-semibold">Nominal</th>
                                        <th className="px-6 py-4.5 font-semibold text-center">Status</th>
                                        <th className="px-6 py-4.5 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-600">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-16 text-slate-400 font-medium">
                                                Belum ada transaksi. Silakan checkout produk kami terlebih dahulu!
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-800">
                                                    {order.order_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <span className="font-bold text-slate-800 block">
                                                            {order.product_package?.product?.name || 'Aplikasi Dihapus'}
                                                        </span>
                                                        <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                                                            {order.product_package?.name || 'Paket Dihapus'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-mono font-bold text-slate-700">
                                                    {formatIDR(order.price)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusClass(order.status)}`}>
                                                        {translateStatus(order.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                                    {order.status === 'completed' && order.credentials_sent && (
                                                        <button
                                                            onClick={() => setViewingCredentials(order)}
                                                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-lg text-xs font-semibold border border-emerald-100 hover:border-emerald-600 transition-all shadow-sm"
                                                        >
                                                            Lihat Akses
                                                        </button>
                                                    )}
                                                    <Link
                                                        href={route('order.show', order.order_number)}
                                                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-indigo-600 hover:text-indigo-850 rounded-lg text-xs font-semibold border border-slate-200 transition-all inline-block shadow-sm"
                                                    >
                                                        Invoice
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Credentials Viewer Modal */}
            {viewingCredentials && (
                <div 
                    onClick={() => setViewingCredentials(null)}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3.5 mb-4">
                            <h3 className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Akses Akun: {viewingCredentials.product_package?.product?.name}
                            </h3>
                            <button 
                                onClick={() => setViewingCredentials(null)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="text-xs text-slate-550 text-slate-500">
                                Invoice: <strong className="text-slate-700 font-mono">{viewingCredentials.order_number}</strong> • Paket: <span className="text-indigo-650 font-bold">{viewingCredentials.product_package?.name}</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs md:text-sm text-slate-700 whitespace-pre-line leading-relaxed shadow-inner">
                                {viewingCredentials.credentials_sent}
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(viewingCredentials.credentials_sent);
                                        alert('Kredensial berhasil disalin!');
                                    }}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/10 transition-colors"
                                >
                                    Salin Kredensial
                                </button>
                                <button
                                    onClick={() => setViewingCredentials(null)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </BuyerLayout>
    );
}
