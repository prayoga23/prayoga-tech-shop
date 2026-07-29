import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function PaymentMethods({ paymentMethods }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);
    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);

    const createForm = useForm({
        name: '',
        account_number: '',
        account_name: '',
        instructions: '',
        qr_code: null,
        is_active: 1,
    });

    const editForm = useForm({
        name: '',
        account_number: '',
        account_name: '',
        instructions: '',
        qr_code: null,
        is_active: 1,
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('admin.payment-methods.store'), {
            onSuccess: () => {
                createForm.reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
                setIsCreateModalOpen(false);
            }
        });
    };

    const openEditModal = (payment) => {
        setEditingPayment(payment);
        editForm.setData({
            name: payment.name,
            account_number: payment.account_number,
            account_name: payment.account_name,
            instructions: payment.instructions || '',
            qr_code: null,
            is_active: payment.is_active ? 1 : 0,
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.post(route('admin.payment-methods.update', editingPayment.id), {
            onSuccess: () => {
                editForm.reset();
                if (editFileInputRef.current) editFileInputRef.current.value = '';
                setIsEditModalOpen(false);
                setEditingPayment(null);
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus metode pembayaran ini?')) {
            router.delete(route('admin.payment-methods.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Metode Pembayaran">
            <Head title="Kelola Metode Pembayaran" />

            <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm font-semibold">
                    Konfigurasikan rekening transfer bank manual dan QRIS.
                </p>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Tambah Metode Pembayaran
                </button>
            </div>

            {/* Grid of Payment Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentMethods.length === 0 ? (
                    <div className="col-span-full bg-white border border-slate-200 rounded-2xl py-16 text-center text-slate-400 font-medium shadow-sm">
                        Belum ada metode pembayaran yang terdaftar.
                    </div>
                ) : (
                    paymentMethods.map((payment) => (
                        <div key={payment.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                            {/* Active badge */}
                            <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                payment.is_active 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}>
                                {payment.is_active ? 'Aktif' : 'Nonaktif'}
                            </span>

                            <div>
                                <h3 className="font-bold text-lg text-indigo-600 mb-4 pr-16">{payment.name}</h3>

                                <div className="space-y-3 mb-5">
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nomor Rekening</p>
                                        <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">{payment.account_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Atas Nama</p>
                                        <p className="text-sm font-bold text-slate-700 mt-0.5">{payment.account_name}</p>
                                    </div>
                                    {payment.instructions && (
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Petunjuk</p>
                                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2" title={payment.instructions}>
                                                {payment.instructions}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {payment.qr_code_path && (
                                    <div className="mb-4">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Gambar QR Code / QRIS</p>
                                        <div className="w-28 h-28 bg-slate-50 border border-slate-150 rounded-lg p-1.5 overflow-hidden flex items-center justify-center">
                                            <img 
                                                src={`/storage/${payment.qr_code_path}`} 
                                                alt="QR Code" 
                                                className="max-w-full max-h-full object-contain rounded"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2.5 border-t border-slate-100 pt-4 mt-2">
                                <button
                                    onClick={() => openEditModal(payment)}
                                    className="flex-1 py-2 bg-white hover:bg-slate-50 text-indigo-600 hover:text-indigo-850 rounded-xl text-xs font-semibold border border-slate-200 transition-colors shadow-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(payment.id)}
                                    className="px-3 py-2 bg-white hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold border border-slate-200 hover:border-rose-200 transition-all shadow-sm"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Create Payment Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-base font-bold text-slate-850 mb-4">Tambah Metode Pembayaran Baru</h3>
                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Nama Bank / E-Wallet</label>
                                    <input
                                        type="text"
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="Contoh: Bank BCA, Gopay, Dana"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                        required
                                    />
                                    {createForm.errors.name && <p className="text-rose-600 text-xs font-medium mt-1">{createForm.errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Nomor Rekening / HP</label>
                                    <input
                                        type="text"
                                        value={createForm.data.account_number}
                                        onChange={(e) => createForm.setData('account_number', e.target.value)}
                                        placeholder="Contoh: 8720192831, 0812..."
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                        required
                                    />
                                    {createForm.errors.account_number && <p className="text-rose-600 text-xs font-medium mt-1">{createForm.errors.account_number}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Nama Pemilik Rekening</label>
                                <input
                                    type="text"
                                    value={createForm.data.account_name}
                                    onChange={(e) => createForm.setData('account_name', e.target.value)}
                                    placeholder="Contoh: John Doe"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                    required
                                />
                                {createForm.errors.account_name && <p className="text-rose-600 text-xs font-medium mt-1">{createForm.errors.account_name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Petunjuk Pembayaran</label>
                                <textarea
                                    value={createForm.data.instructions}
                                    onChange={(e) => createForm.setData('instructions', e.target.value)}
                                    placeholder="Contoh: Masukkan berita transfer kode pesanan..."
                                    rows="2"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 resize-none"
                                />
                                {createForm.errors.instructions && <p className="text-rose-600 text-xs font-medium mt-1">{createForm.errors.instructions}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Upload QRIS / QR Code (Opsional)</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => createForm.setData('qr_code', e.target.files[0])}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-500 text-sm focus:outline-none file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-indigo-600 hover:file:bg-slate-200 cursor-pointer"
                                />
                                {createForm.errors.qr_code && <p className="text-rose-600 text-xs font-medium mt-1">{createForm.errors.qr_code}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Status</label>
                                <select
                                    value={createForm.data.is_active}
                                    onChange={(e) => createForm.setData('is_active', parseInt(e.target.value))}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                >
                                    <option value={1}>Aktif (Muncul saat checkout)</option>
                                    <option value={0}>Nonaktif (Sembunyikan)</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => {
                                        createForm.reset();
                                        if (fileInputRef.current) fileInputRef.current.value = '';
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

            {/* Edit Payment Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-base font-bold text-slate-850 mb-4">Ubah Metode Pembayaran</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Nama Bank / E-Wallet</label>
                                    <input
                                        type="text"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        placeholder="Contoh: Bank BCA, Gopay, Dana"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                        required
                                    />
                                    {editForm.errors.name && <p className="text-rose-600 text-xs font-medium mt-1">{editForm.errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Nomor Rekening / HP</label>
                                    <input
                                        type="text"
                                        value={editForm.data.account_number}
                                        onChange={(e) => editForm.setData('account_number', e.target.value)}
                                        placeholder="Contoh: 8720192831, 0812..."
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                        required
                                    />
                                    {editForm.errors.account_number && <p className="text-rose-600 text-xs font-medium mt-1">{editForm.errors.account_number}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Nama Pemilik Rekening</label>
                                <input
                                    type="text"
                                    value={editForm.data.account_name}
                                    onChange={(e) => editForm.setData('account_name', e.target.value)}
                                    placeholder="Contoh: John Doe"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                    required
                                />
                                {editForm.errors.account_name && <p className="text-rose-600 text-xs font-medium mt-1">{editForm.errors.account_name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-455 text-slate-500 tracking-wider mb-2">Petunjuk Pembayaran</label>
                                <textarea
                                    value={editForm.data.instructions}
                                    onChange={(e) => editForm.setData('instructions', e.target.value)}
                                    placeholder="Contoh: Masukkan berita transfer kode pesanan..."
                                    rows="2"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 resize-none"
                                />
                                {editForm.errors.instructions && <p className="text-rose-600 text-xs font-medium mt-1">{editForm.errors.instructions}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Upload QRIS / QR Code Baru (Mengganti yang lama)</label>
                                <input
                                    type="file"
                                    ref={editFileInputRef}
                                    onChange={(e) => editForm.setData('qr_code', e.target.files[0])}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-500 text-sm focus:outline-none file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-indigo-600 hover:file:bg-slate-200 cursor-pointer"
                                />
                                {editForm.errors.qr_code && <p className="text-rose-600 text-xs font-medium mt-1">{editForm.errors.qr_code}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-450 text-slate-500 tracking-wider mb-2">Status</label>
                                <select
                                    value={editForm.data.is_active}
                                    onChange={(e) => editForm.setData('is_active', parseInt(e.target.value))}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                >
                                    <option value={1}>Aktif (Muncul saat checkout)</option>
                                    <option value={0}>Nonaktif (Sembunyikan)</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => {
                                        editForm.reset();
                                        if (editFileInputRef.current) editFileInputRef.current.value = '';
                                        setIsEditModalOpen(false);
                                        setEditingPayment(null);
                                    }}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-250 hover:bg-slate-200 text-slate-605 text-slate-600 rounded-xl text-xs font-semibold border border-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-550 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/10 transition-all"
                                >
                                    {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
