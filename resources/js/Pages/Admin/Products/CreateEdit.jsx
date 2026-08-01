import React, { useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateEdit({ categories, isEdit, product }) {
    const fileInputRef = useRef(null);

    const form = useForm({
        name: product?.name || '',
        badge: product?.badge || '',
        category_id: product?.category_id || '',
        description: product?.description || '',
        image: null,
        is_active: product ? (product.is_active ? 1 : 0) : 1,
        packages: product?.packages?.map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            price: pkg.price,
            original_price: pkg.original_price || '',
            duration_days: pkg.duration_days,
            description: pkg.description || '',
            is_active: pkg.is_active ? 1 : 0
        })) || [
            { name: '', price: '', original_price: '', duration_days: 30, description: '', is_active: 1 }
        ]
    });

    const addPackageRow = () => {
        form.setData('packages', [
            ...form.data.packages,
            { name: '', price: '', original_price: '', duration_days: 30, description: '', is_active: 1 }
        ]);
    };

    const removePackageRow = (index) => {
        if (form.data.packages.length === 1) {
            alert('Produk minimal harus memiliki satu paket langganan.');
            return;
        }
        const updated = form.data.packages.filter((_, idx) => idx !== index);
        form.setData('packages', updated);
    };

    const handlePackageChange = (index, field, value) => {
        const updated = [...form.data.packages];
        updated[index][field] = value;
        form.setData('packages', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            form.post(route('admin.products.update', product.id));
        } else {
            form.post(route('admin.products.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Ubah Produk' : 'Tambah Produk Baru'}>
            <Head title={isEdit ? 'Ubah Produk' : 'Tambah Produk Baru'} />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Product Info Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Informasi Utama Produk</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Nama Aplikasi</label>
                            <input
                                type="text"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="Contoh: Spotify Premium, Canva Pro"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                required
                            />
                            {form.errors.name && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.name}</p>}
                        </div>

                        {/* Label Badge */}
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Label Lencana Badge (Opsional)</label>
                            <input
                                type="text"
                                value={form.data.badge}
                                onChange={(e) => form.setData('badge', e.target.value)}
                                placeholder="Contoh: BEST, PROMO, HOT, 15%"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 font-bold text-indigo-600"
                            />
                            {form.errors.badge && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.badge}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Kategori</label>
                            <select
                                value={form.data.category_id}
                                onChange={(e) => form.setData('category_id', e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {form.errors.category_id && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.category_id}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Deskripsi Produk (Fitur, S&K, Garansi)</label>
                        <textarea
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                            placeholder="Deskripsikan fitur aplikasi premium, ketentuan sharing/private, garansi dll..."
                            rows="5"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 resize-y"
                            required
                        />
                        {form.errors.description && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        {/* Image Icon upload */}
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Ikon / Logo Produk</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => form.setData('image', e.target.files[0])}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-500 text-sm focus:outline-none file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-indigo-650 hover:file:bg-slate-200 cursor-pointer"
                            />
                            {form.errors.image && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.image}</p>}
                            
                            {isEdit && product.image_path && !form.data.image && (
                                <div className="mt-3 flex items-center gap-2.5">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ikon saat ini:</span>
                                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-50 border border-slate-150">
                                        <img src={`/storage/${product.image_path}`} alt="Current" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Status Produk</label>
                            <select
                                value={form.data.is_active}
                                onChange={(e) => form.setData('is_active', parseInt(e.target.value))}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                            >
                                <option value={1}>Aktif (Tampil di katalog)</option>
                                <option value={0}>Nonaktif (Sembunyikan)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Packages Configuration Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <h3 className="text-base font-bold text-slate-800">Variasi Paket Langganan</h3>
                        <button
                            type="button"
                            onClick={addPackageRow}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-indigo-600 hover:text-indigo-850 rounded-xl text-xs font-bold transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Tambah Baris Paket
                        </button>
                    </div>

                    <div className="space-y-4">
                        {form.data.packages.map((pkg, index) => (
                            <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative flex flex-col md:flex-row gap-4 items-end shadow-inner-sm">
                                <button
                                    type="button"
                                    onClick={() => removePackageRow(index)}
                                    className="absolute top-2 right-2 md:static md:mb-2.5 p-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg transition-all shadow-sm"
                                    title="Hapus baris paket"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>

                                {/* Package Name */}
                                <div className="flex-1 w-full">
                                    <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Nama Paket</label>
                                    <input
                                        type="text"
                                        value={pkg.name}
                                        onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                                        placeholder="Contoh: Paket Basic - Single Page, Paket Pro - Multi Page"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                        required
                                    />
                                </div>

                                {/* Package Price */}
                                <div className="w-full md:w-36">
                                    <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Harga Jual (Rp)</label>
                                    <input
                                        type="number"
                                        value={pkg.price}
                                        onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                                        placeholder="15000"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 font-mono font-bold text-indigo-600"
                                        required
                                    />
                                </div>

                                {/* Package Original Price (Harga Coret) */}
                                <div className="w-full md:w-36">
                                    <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Harga Coret (Rp)</label>
                                    <input
                                        type="number"
                                        value={pkg.original_price}
                                        onChange={(e) => handlePackageChange(index, 'original_price', e.target.value)}
                                        placeholder="Contoh: 18750"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 font-mono text-slate-400 line-through"
                                    />
                                </div>

                                {/* Package Duration */}
                                <div className="w-full md:w-28">
                                    <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Durasi (Hari)</label>
                                    <input
                                        type="number"
                                        value={pkg.duration_days}
                                        onChange={(e) => handlePackageChange(index, 'duration_days', parseInt(e.target.value))}
                                        placeholder="30"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 font-mono font-semibold"
                                        required
                                    />
                                </div>

                                {/* Package Short Desc */}
                                <div className="flex-1 w-full">
                                    <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Keterangan (Opsional)</label>
                                    <input
                                        type="text"
                                        value={pkg.description}
                                        onChange={(e) => handlePackageChange(index, 'description', e.target.value)}
                                        placeholder="Contoh: Maks 1 profil, email dari admin"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                    />
                                </div>

                                {/* Package Status */}
                                <div className="w-full md:w-28">
                                    <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Status</label>
                                    <select
                                        value={pkg.is_active}
                                        onChange={(e) => handlePackageChange(index, 'is_active', parseInt(e.target.value))}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-all"
                                    >
                                        <option value={1}>Aktif</option>
                                        <option value={0}>Nonaktif</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex justify-end gap-3.5">
                    <Link
                        href={route('admin.products.index')}
                        className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-200 transition-colors shadow-sm"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 transition-colors"
                    >
                        {form.processing ? 'Menyimpan...' : 'Simpan Produk'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
