import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ products }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini? Semua data paket langganan dan pesanan terkait produk ini juga akan terhapus.')) {
            const form = useForm();
            form.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Produk">
            <Head title="Kelola Produk" />

            <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm font-semibold">
                    Total: <span className="text-indigo-600 font-bold">{products.length}</span> Produk Terdaftar
                </p>
                <Link
                    href={route('admin.products.create')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Tambah Produk
                </Link>
            </div>

            {/* Products List Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider bg-slate-50/50">
                                <th className="px-6 py-4 font-semibold">Produk</th>
                                <th className="px-6 py-4 font-semibold">Kategori</th>
                                <th className="px-6 py-4 font-semibold text-center">Jumlah Paket</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-16 text-slate-400 font-medium">
                                        Belum ada produk terdaftar. Silakan tambahkan produk baru Anda.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center font-bold text-slate-400 text-xs overflow-hidden shadow-inner shrink-0">
                                                    {product.image_path ? (
                                                        <img 
                                                            src={`/storage/${product.image_path}`} 
                                                            alt={product.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        product.name.substring(0, 2).toUpperCase()
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="font-bold text-slate-800 block truncate">{product.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{product.slug}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold">
                                                {product.category?.name || 'Tanpa Kategori'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-semibold text-slate-700">{product.packages?.length || 0} Paket</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                                                product.is_active 
                                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                                : 'bg-slate-100 text-slate-500 border-slate-200'
                                            }`}>
                                                {product.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                            <Link
                                                href={route('admin.products.edit', product.id)}
                                                className="inline-block px-3 py-1.5 bg-white hover:bg-slate-50 text-indigo-600 hover:text-indigo-850 rounded-lg text-xs font-semibold border border-slate-200 transition-all shadow-sm"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold border border-slate-200 hover:border-rose-200 transition-all shadow-sm"
                                            >
                                                Hapus
                                            </button>
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
