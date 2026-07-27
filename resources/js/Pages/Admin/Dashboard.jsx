import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentOrders, earningsChartData }) {
    // Helper to format currency
    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    // Calculate max value for chart scaling
    const maxEarning = Math.max(...earningsChartData.map(item => item.total), 100000);

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
        <AdminLayout title="Overview Dashboard">
            <Head title="Admin Dashboard" />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Revenue Card */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 w-24 h-24 bg-indigo-500 rounded-full blur-xl"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Pendapatan</p>
                            <h3 className="text-2xl font-bold mt-2 text-indigo-650 text-indigo-600">{formatIDR(stats.total_revenue)}</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 w-24 h-24 bg-sky-500 rounded-full blur-xl"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Pesanan</p>
                            <h3 className="text-2xl font-bold mt-2 text-sky-600">{stats.total_orders}</h3>
                        </div>
                        <div className="p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Paid/Waiting Confirmation Card */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 w-24 h-24 bg-amber-500 rounded-full blur-xl"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Perlu Konfirmasi</p>
                            <h3 className="text-2xl font-bold mt-2 text-amber-600">{stats.paid_orders}</h3>
                        </div>
                        <div className="p-3 bg-amber-50 border border-amber-100 text-amber-605 text-amber-600 rounded-xl">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Users Card */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 w-24 h-24 bg-violet-500 rounded-full blur-xl"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Pelanggan</p>
                            <h3 className="text-2xl font-bold mt-2 text-violet-600">{stats.total_users}</h3>
                        </div>
                        <div className="p-3 bg-violet-50 border border-violet-100 text-violet-600 rounded-xl">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Split: Chart & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart (CSS Mock) */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 lg:col-span-2 flex flex-col">
                    <h3 className="text-base font-bold text-slate-800 mb-6">Grafik Pendapatan Bulanan ({new Date().getFullYear()})</h3>
                    <div className="flex-1 flex items-end justify-between gap-2 h-64 pt-6 px-2">
                        {earningsChartData.map((item) => {
                            const barHeight = (item.total / maxEarning) * 100;
                            return (
                                <div key={item.name} className="flex flex-col items-center justify-end h-full flex-1 group">
                                    <div 
                                        style={{ height: `${Math.max(barHeight, 4)}%` }} 
                                        className={`w-full max-w-[32px] rounded-t-lg transition-all duration-500 relative ${
                                            item.total > 0 
                                            ? 'bg-gradient-to-t from-indigo-600 to-violet-500 group-hover:from-indigo-500 group-hover:to-violet-400 shadow-sm' 
                                            : 'bg-slate-100'
                                        }`}
                                    >
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-indigo-900 border border-indigo-700 text-indigo-100 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-bold shadow-lg">
                                            {formatIDR(item.total)}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-semibold mt-3 shrink-0">{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Orders List */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base font-bold text-slate-800">Pesanan Terbaru</h3>
                        <Link href={route('admin.orders.index')} className="text-xs text-indigo-600 font-semibold hover:text-indigo-850">
                            Lihat Semua
                        </Link>
                    </div>

                    <div className="flex-1 space-y-4">
                        {recentOrders.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 text-sm font-medium">
                                <svg className="w-12 h-12 mb-3 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                                </svg>
                                Belum ada pesanan masuk.
                            </div>
                        ) : (
                            recentOrders.map((order) => (
                                <Link 
                                    key={order.id} 
                                    href={route('admin.orders.show', order.id)}
                                    className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 hover:bg-slate-100/50 rounded-xl hover:border-slate-200 transition-all group"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-xs text-slate-850 group-hover:text-indigo-600 transition-colors">
                                                {order.order_number}
                                            </span>
                                            <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${getStatusClass(order.status)}`}>
                                                {translateStatus(order.status)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium truncate mt-1">
                                            {order.customer_name} ({order.product_package?.product?.name})
                                        </p>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">
                                        {formatIDR(order.price)}
                                    </span>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
