import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Promos({ promos }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        type: 'fixed',
        value: '',
        min_purchase: '0',
        max_discount: '',
        is_active: '1',
        expires_at: '',
    });

    const { data: editData, setData: setEditData, patch: patchEdit, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        code: '',
        type: 'fixed',
        value: '',
        min_purchase: '0',
        max_discount: '',
        is_active: '1',
        expires_at: '',
    });

    const formatIDR = (value) => {
        if (value === null || value === undefined) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        post(route('admin.promos.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
            }
        });
    };

    const handleEditClick = (promo) => {
        setSelectedPromo(promo);
        setEditData({
            code: promo.code,
            type: promo.type,
            value: promo.value.toString(),
            min_purchase: promo.min_purchase.toString(),
            max_discount: promo.max_discount ? promo.max_discount.toString() : '',
            is_active: promo.is_active ? '1' : '0',
            expires_at: promo.expires_at ? promo.expires_at.split('T')[0] : '',
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        patchEdit(route('admin.promos.update', selectedPromo.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                resetEdit();
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kupon diskon ini?')) {
            router.delete(route('admin.promos.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Kupon Diskon">
            <Head title="Kelola Kupon Diskon" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-xs text-slate-500 font-medium">Buat dan atur kode kupon promosi yang dapat digunakan oleh pelanggan saat checkout produk.</p>
                </div>
                <button
                    onClick={() => {
                        reset();
                        setIsAddModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-650/10 flex items-center gap-1.5 transition-all"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Kupon
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-550 text-slate-500 text-[10px] uppercase tracking-wider bg-slate-50/50">
                                <th className="px-6 py-4.5 font-semibold">Kode Kupon</th>
                                <th className="px-6 py-4.5 font-semibold">Tipe Diskon</th>
                                <th className="px-6 py-4.5 font-semibold">Nilai Diskon</th>
                                <th className="px-6 py-4.5 font-semibold">Min. Belanja</th>
                                <th className="px-6 py-4.5 font-semibold">Maks. Potongan</th>
                                <th className="px-6 py-4.5 font-semibold">Masa Berlaku</th>
                                <th className="px-6 py-4.5 font-semibold text-center">Status</th>
                                <th className="px-6 py-4.5 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-600 font-medium">
                            {promos.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-slate-400 font-medium">
                                        Belum ada kupon diskon yang dibuat.
                                    </td>
                                </tr>
                            ) : (
                                promos.map((promo) => {
                                    const isExpired = promo.expires_at && new Date(promo.expires_at).setHours(23,59,59,999) < new Date();
                                    return (
                                        <tr key={promo.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="bg-indigo-50 border border-indigo-150 text-indigo-700 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                                                    {promo.code}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-semibold">
                                                {promo.type === 'percentage' ? (
                                                    <span className="text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">Persentase</span>
                                                ) : (
                                                    <span className="text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Nominal Tetap</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-700">
                                                {promo.type === 'percentage' ? `${promo.value}%` : formatIDR(promo.value)}
                                            </td>
                                            <td className="px-6 py-4 font-mono font-bold text-slate-700">
                                                {formatIDR(promo.min_purchase)}
                                            </td>
                                            <td className="px-6 py-4 font-mono font-bold text-slate-700">
                                                {promo.max_discount ? formatIDR(promo.max_discount) : 'Tanpa Batas'}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500 font-semibold">
                                                {promo.expires_at ? (
                                                    <span className={isExpired ? 'text-rose-600 font-bold' : ''}>
                                                        {new Date(promo.expires_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        {isExpired && ' (Kadaluwarsa)'}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400 font-medium">Selamanya</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                                                    promo.is_active && !isExpired
                                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                    : 'bg-rose-50 text-rose-800 border-rose-200'
                                                }`}>
                                                    {promo.is_active && !isExpired ? 'Aktif' : 'Non-aktif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleEditClick(promo)}
                                                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-650 hover:text-slate-800 rounded-lg text-xs font-bold border border-slate-200 transition-all inline-block shadow-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(promo.id)}
                                                    className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg text-xs font-bold border border-rose-100 transition-all inline-block shadow-sm"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
                            <h3 className="text-base font-bold text-slate-800">Tambah Kupon Diskon Baru</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-semibold text-slate-600">
                            <div className="space-y-1">
                                <label>Kode Kupon (Contoh: PROMOHEBAT)</label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    placeholder="Masukkan kode kupon"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    required
                                />
                                {errors.code && <p className="text-rose-500 text-[10px]">{errors.code}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Tipe Diskon</label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="fixed">Nominal Tetap (Rupiah)</option>
                                        <option value="percentage">Persentase (%)</option>
                                    </select>
                                    {errors.type && <p className="text-rose-500 text-[10px]">{errors.type}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Nilai Diskon ({data.type === 'percentage' ? '%' : 'Rp'})</label>
                                    <input
                                        type="number"
                                        value={data.value}
                                        onChange={(e) => setData('value', e.target.value)}
                                        placeholder={data.type === 'percentage' ? '10' : '10000'}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                        required
                                    />
                                    {errors.value && <p className="text-rose-500 text-[10px]">{errors.value}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Min. Pembelian (Rupiah)</label>
                                    <input
                                        type="number"
                                        value={data.min_purchase}
                                        onChange={(e) => setData('min_purchase', e.target.value)}
                                        placeholder="0"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                        required
                                    />
                                    {errors.min_purchase && <p className="text-rose-500 text-[10px]">{errors.min_purchase}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Maks. Potongan (Rupiah - Opsional)</label>
                                    <input
                                        type="number"
                                        value={data.max_discount}
                                        onChange={(e) => setData('max_discount', e.target.value)}
                                        placeholder="Kosongkan jika tanpa batas"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                        disabled={data.type === 'fixed'}
                                    />
                                    {errors.max_discount && <p className="text-rose-500 text-[10px]">{errors.max_discount}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Masa Berlaku Kupon (Opsional)</label>
                                    <input
                                        type="date"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {errors.expires_at && <p className="text-rose-500 text-[10px]">{errors.expires_at}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Status Kupon</label>
                                    <select
                                        value={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="1">Aktif / Bisa Digunakan</option>
                                        <option value="0">Arsipkan / Non-aktif</option>
                                    </select>
                                    {errors.is_active && <p className="text-rose-500 text-[10px]">{errors.is_active}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-250 text-slate-600 rounded-xl font-bold transition-all border border-slate-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-600/10"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Kupon'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
                            <h3 className="text-base font-bold text-slate-800">Edit Kupon Diskon</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-semibold text-slate-600">
                            <div className="space-y-1">
                                <label>Kode Kupon</label>
                                <input
                                    type="text"
                                    value={editData.code}
                                    onChange={(e) => setEditData('code', e.target.value.toUpperCase())}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    required
                                />
                                {editErrors.code && <p className="text-rose-500 text-[10px]">{editErrors.code}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Tipe Diskon</label>
                                    <select
                                        value={editData.type}
                                        onChange={(e) => setEditData('type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="fixed">Nominal Tetap (Rupiah)</option>
                                        <option value="percentage">Persentase (%)</option>
                                    </select>
                                    {editErrors.type && <p className="text-rose-500 text-[10px]">{editErrors.type}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Nilai Diskon ({editData.type === 'percentage' ? '%' : 'Rp'})</label>
                                    <input
                                        type="number"
                                        value={editData.value}
                                        onChange={(e) => setEditData('value', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                        required
                                    />
                                    {editErrors.value && <p className="text-rose-500 text-[10px]">{editErrors.value}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Min. Pembelian (Rupiah)</label>
                                    <input
                                        type="number"
                                        value={editData.min_purchase}
                                        onChange={(e) => setEditData('min_purchase', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                        required
                                    />
                                    {editErrors.min_purchase && <p className="text-rose-500 text-[10px]">{editErrors.min_purchase}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Maks. Potongan (Rupiah - Opsional)</label>
                                    <input
                                        type="number"
                                        value={editData.max_discount}
                                        onChange={(e) => setEditData('max_discount', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                        disabled={editData.type === 'fixed'}
                                    />
                                    {editErrors.max_discount && <p className="text-rose-500 text-[10px]">{editErrors.max_discount}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Masa Berlaku Kupon (Opsional)</label>
                                    <input
                                        type="date"
                                        value={editData.expires_at}
                                        onChange={(e) => setEditData('expires_at', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {editErrors.expires_at && <p className="text-rose-500 text-[10px]">{editErrors.expires_at}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Status Kupon</label>
                                    <select
                                        value={editData.is_active}
                                        onChange={(e) => setEditData('is_active', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="1">Aktif / Bisa Digunakan</option>
                                        <option value="0">Arsipkan / Non-aktif</option>
                                    </select>
                                    {editErrors.is_active && <p className="text-rose-500 text-[10px]">{editErrors.is_active}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-250 text-slate-600 rounded-xl font-bold transition-all border border-slate-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-600/10"
                                >
                                    {editProcessing ? 'Menyimpan...' : 'Perbarui Kupon'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
