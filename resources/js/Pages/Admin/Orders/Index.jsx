import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ orders, selectedStatus, search }) {
    const [searchVal, setSearchVal] = useState(search);

    const statuses = [
        { label: 'Semua', value: 'all' },
        { label: 'Belum Bayar', value: 'pending' },
        { label: 'Perlu Konfirmasi', value: 'paid' },
        { label: 'Selesai', value: 'completed' },
        { label: 'Dibatalkan', value: 'cancelled' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), {
            status: selectedStatus,
            search: searchVal
        });
    };

    const handleStatusFilter = (status) => {
        router.get(route('admin.orders.index'), {
            status: status,
            search: searchVal
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
        <AdminLayout title="Daftar Pesanan / Transaksi">
            <Head title="Daftar Pesanan" />

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Status Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-slate-200 rounded-xl max-w-fit shadow-sm">
                    {statuses.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => handleStatusFilter(tab.value)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                selectedStatus === tab.value
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Cari Invoice, nama, email..."
                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-805 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 w-full md:w-64"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10"
                    >
                        Cari
                    </button>
                </form>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-550 text-slate-500 text-xs uppercase tracking-wider bg-slate-50/50">
                                <th className="px-6 py-4 font-semibold">Invoice</th>
                                <th className="px-6 py-4 font-semibold">Pelanggan</th>
                                <th className="px-6 py-4 font-semibold">Aplikasi & Paket</th>
                                <th className="px-6 py-4 font-semibold">Total Bayar</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold">Tanggal</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-16 text-slate-400 font-medium">
                                        Tidak ditemukan transaksi.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-800">{order.order_number}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="min-w-[120px]">
                                                <span className="font-bold text-slate-700 block">{order.customer_name}</span>
                                                <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{order.customer_whatsapp}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="min-w-[180px]">
                                                <span className="font-bold text-indigo-600 block">
                                                    {order.product_package?.product?.name || 'Aplikasi Dihapus'}
                                                </span>
                                                <span className="text-[11px] text-slate-500 block mt-0.5 font-semibold">
                                                    {order.product_package?.name || 'Paket Dihapus'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-bold text-slate-800">{formatIDR(order.price)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusClass(order.status)}`}>
                                                {translateStatus(order.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-xs font-semibold">
                                            {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route('admin.orders.show', order.id)}
                                                className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-indigo-600 hover:text-indigo-850 rounded-lg text-xs font-semibold border border-slate-200 transition-all inline-block shadow-sm"
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
