import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Dashboard({ auth, orders = [], settings }) {
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
                return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
            case 'paid':
                return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
            case 'completed':
                return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
            case 'cancelled':
                return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
            default:
                return 'bg-slate-800 text-slate-400 border-slate-700';
        }
    };

    const translateStatus = (status) => {
        switch (status) {
            case 'pending': return 'Belum Bayar';
            case 'paid': return 'Verifikasi / Dalam Pengerjaan';
            case 'completed': return 'Selesai & Serah Terima';
            case 'cancelled': return 'Dibatalkan';
            default: return status;
        }
    };

    return (
        <BuyerLayout>
            <Head title="Dashboard Pesanan Proyek Saya - Prayoga Tech" />

            <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 md:px-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    
                    {/* Header */}
                    <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Portal Klien</span>
                            <h1 className="text-2xl font-black text-white mt-1">Riwayat Pesanan Proyek Aplikasi</h1>
                            <p className="text-xs text-slate-400">Pantau status pengerjaan proyek website & aplikasi Android Anda secara real-time.</p>
                        </div>
                        <div>
                            <Link
                                href={route('katalog')}
                                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold shadow-md transition-all inline-block"
                            >
                                Pesan Proyek Baru &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider bg-slate-950/60">
                                        <th className="px-6 py-4 font-bold">Nomor Invoice</th>
                                        <th className="px-6 py-4 font-bold">Layanan Paket</th>
                                        <th className="px-6 py-4 font-bold">Investasi</th>
                                        <th className="px-6 py-4 font-bold text-center">Status Proyek</th>
                                        <th className="px-6 py-4 font-bold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 text-xs text-slate-300">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-16 text-slate-400 font-medium">
                                                Belum ada pesanan proyek. Silakan pilih paket jasa pembuatan kami di katalog!
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4 font-mono font-bold text-white">
                                                    {order.order_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <span className="font-bold text-white block">
                                                            {order.product_package?.product?.name || 'Paket Jasa'}
                                                        </span>
                                                        <span className="text-[11px] text-cyan-300 block mt-0.5 font-medium">
                                                            {order.product_package?.name || 'Varian Paket'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-black text-white">
                                                    {formatIDR(order.total_amount || order.product_package?.price || 0)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusClass(order.status)}`}>
                                                        {translateStatus(order.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <Link
                                                        href={route('order.show', order.order_number)}
                                                        className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 rounded-xl text-xs font-bold transition-all inline-block"
                                                    >
                                                        Detail & Bayar
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
            </div>
        </BuyerLayout>
    );
}
