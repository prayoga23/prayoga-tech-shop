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
                return 'bg-amber-50 text-amber-800 border-amber-200';
            case 'paid':
                return 'bg-indigo-50 text-indigo-800 border-indigo-200';
            case 'completed':
                return 'bg-emerald-50 text-emerald-800 border-emerald-200';
            case 'cancelled':
                return 'bg-rose-50 text-rose-800 border-rose-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const translateStatus = (status) => {
        switch (status) {
            case 'pending': return 'Belum Bayar';
            case 'paid': return 'Menunggu Konfirmasi Admin';
            case 'completed': return 'Selesai & Serah Terima';
            case 'cancelled': return 'Dibatalkan';
            default: return status;
        }
    };

    return (
        <BuyerLayout>
            <Head title="Dashboard Pesanan Proyek Saya - Prayoga Tech" />

            <div className="bg-slate-50 text-slate-900 min-h-screen py-10 px-4 md:px-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Portal Klien</span>
                            <h1 className="text-2xl font-black text-slate-900 mt-1">Riwayat Pesanan Proyek Aplikasi</h1>
                            <p className="text-xs text-slate-600 font-medium">Pantau status pengerjaan proyek website & aplikasi Android Anda secara real-time.</p>
                        </div>
                        <div>
                            <Link
                                href={route('katalog')}
                                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all inline-block"
                            >
                                Pesan Proyek Baru &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider bg-slate-50 font-bold">
                                        <th className="px-6 py-4 font-extrabold">Nomor Invoice</th>
                                        <th className="px-6 py-4 font-extrabold">Layanan Paket</th>
                                        <th className="px-6 py-4 font-extrabold">Investasi</th>
                                        <th className="px-6 py-4 font-extrabold text-center">Status Proyek</th>
                                        <th className="px-6 py-4 font-extrabold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-16 text-slate-500 font-medium">
                                                Belum ada pesanan proyek. Silakan pilih paket jasa pembuatan kami di katalog!
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="px-6 py-4 font-mono font-bold text-slate-900">
                                                    {order.order_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <span className="font-extrabold text-slate-900 block">
                                                            {order.product_package?.product?.name || 'Paket Jasa'}
                                                        </span>
                                                        <span className="text-[11px] text-indigo-600 block mt-0.5 font-bold">
                                                            {order.product_package?.name || 'Varian Paket'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-black text-slate-900">
                                                    {formatIDR(order.price || order.total_amount || order.product_package?.price || order.productPackage?.price || 0)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold border ${getStatusClass(order.status)}`}>
                                                        {translateStatus(order.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <Link
                                                        href={route('order.show', order.order_number)}
                                                        className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 rounded-xl text-xs font-extrabold transition-all inline-block"
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
