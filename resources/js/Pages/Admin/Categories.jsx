import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Categories({ categories }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const createForm = useForm({
        name: '',
    });

    const editForm = useForm({
        name: '',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('admin.categories.store'), {
            onSuccess: () => {
                createForm.reset();
                setIsCreateModalOpen(false);
            }
        });
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        editForm.setData({ name: category.name });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.patch(route('admin.categories.update', editingCategory.id), {
            onSuccess: () => {
                editForm.reset();
                setIsEditModalOpen(false);
                setEditingCategory(null);
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini? Semua produk dalam kategori ini akan di-set menjadi tidak memiliki kategori.')) {
            const form = useForm();
            form.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Kategori">
            <Head title="Kelola Kategori" />

            <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm font-semibold">
                    Total: <span className="text-indigo-600 font-bold">{categories.length}</span> Kategori
                </p>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Tambah Kategori
                </button>
            </div>

            {/* Categories Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider bg-slate-50/50">
                                <th className="px-6 py-4 font-semibold">Nama Kategori</th>
                                <th className="px-6 py-4 font-semibold">Slug</th>
                                <th className="px-6 py-4 font-semibold text-center">Jumlah Produk</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-650 text-slate-600">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-slate-400 font-medium">
                                        Belum ada kategori. Silakan tambahkan kategori baru.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{category.name}</td>
                                        <td className="px-6 py-4 text-slate-450 font-mono text-xs">{category.slug}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs">
                                                {category.products_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => openEditModal(category)}
                                                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-indigo-600 hover:text-indigo-850 rounded-lg text-xs font-semibold border border-slate-200 transition-all shadow-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
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

            {/* Create Category Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-2xl p-6 overflow-hidden relative">
                        <h3 className="text-base font-bold text-slate-850 mb-4">Tambah Kategori Baru</h3>
                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Nama Kategori</label>
                                <input
                                    type="text"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Streaming, Design"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                    required
                                />
                                {createForm.errors.name && (
                                    <p className="text-rose-600 text-xs font-medium mt-1.5">{createForm.errors.name}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        createForm.reset();
                                        setIsCreateModalOpen(false);
                                    }}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-250 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold border border-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-550 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/10 transition-all"
                                >
                                    {createForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-2xl p-6 overflow-hidden relative">
                        <h3 className="text-base font-bold text-slate-850 mb-4">Ubah Kategori</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Nama Kategori</label>
                                <input
                                    type="text"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Streaming, Design"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                    required
                                />
                                {editForm.errors.name && (
                                    <p className="text-rose-600 text-xs font-medium mt-1.5">{editForm.errors.name}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        editForm.reset();
                                        setIsEditModalOpen(false);
                                        setEditingCategory(null);
                                    }}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-250 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold border border-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-550 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/10 transition-all"
                                >
                                    {editForm.processing ? 'Memperbarui...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
