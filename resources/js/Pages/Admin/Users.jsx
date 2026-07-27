import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Users({ users }) {
    return (
        <AdminLayout title="Daftar Pelanggan">
            <Head title="Kelola Pelanggan" />

            <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm font-semibold">
                    Total: <span className="text-indigo-600 font-bold">{users.length}</span> Pelanggan Terdaftar
                </p>
            </div>

            {/* Customers Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-555 text-slate-500 text-xs uppercase tracking-wider bg-slate-50/50">
                                <th className="px-6 py-4 font-semibold">Nama Pelanggan</th>
                                <th className="px-6 py-4 font-semibold">Alamat Email</th>
                                <th className="px-6 py-4 font-semibold text-center">Jumlah Transaksi</th>
                                <th className="px-6 py-4 font-semibold text-center">Peran</th>
                                <th className="px-6 py-4 font-semibold">Terdaftar Pada</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-16 text-slate-400 font-medium">
                                        Belum ada pelanggan terdaftar.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-805 text-slate-800">{user.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">{user.email}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-650 text-slate-600 font-bold text-xs">
                                                {user.orders_count || 0} Invoice
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                                                user.is_admin 
                                                ? 'bg-indigo-50 text-indigo-800 border-indigo-200' 
                                                : 'bg-slate-100 text-slate-500 border-slate-200'
                                            }`}>
                                                {user.is_admin ? 'Admin' : 'Pelanggan'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-xs font-semibold">
                                            {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
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
