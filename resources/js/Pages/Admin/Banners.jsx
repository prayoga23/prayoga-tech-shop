import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Banners({ banners }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        subtitle: '',
        image: null,
        type: 'carousel',
        link_url: '',
        is_active: '1',
        order_index: '0',
    });

    const { data: editData, setData: setEditData, post: postEdit, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        _method: 'PATCH',
        title: '',
        subtitle: '',
        image: null,
        type: 'carousel',
        link_url: '',
        is_active: '1',
        order_index: '0',
    });

    const handleAddSubmit = (e) => {
        e.preventDefault();
        post(route('admin.banners.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
            }
        });
    };

    const handleEditClick = (banner) => {
        setSelectedBanner(banner);
        setEditData({
            _method: 'PATCH',
            title: banner.title || '',
            subtitle: banner.subtitle || '',
            image: null,
            type: banner.type || 'carousel',
            link_url: banner.link_url || '',
            is_active: banner.is_active ? '1' : '0',
            order_index: banner.order_index.toString(),
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        postEdit(route('admin.banners.update', selectedBanner.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                resetEdit();
            }
        });
    };

    return (
        <AdminLayout title="Kelola Banner Promosi">
            <Head title="Kelola Banner Promosi" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-xs text-slate-500 font-medium">Unggah dan atur spanduk promosi yang akan tampil di bagian atas (Karusel) atau di bagian tengah Landing Page pembeli.</p>
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
                    Tambah Banner
                </button>
            </div>

            {banners.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-400 font-medium shadow-sm">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Belum ada banner promosi yang diunggah.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {banners.map((banner) => (
                        <div key={banner.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col group relative">
                            {/* Image Preview Container */}
                            <div className="relative aspect-[21/9] bg-slate-950 overflow-hidden">
                                <img
                                    src={`/storage/${banner.image_path}`}
                                    alt={banner.title || 'Promo Banner'}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 max-w-[80%]">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shadow-sm ${
                                        banner.is_active 
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-250' 
                                        : 'bg-slate-100 text-slate-500 border-slate-200'
                                    }`}>
                                        {banner.is_active ? 'Aktif' : 'Arsip'}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shadow-sm ${
                                        banner.type === 'middle'
                                        ? 'bg-purple-50 text-purple-800 border-purple-200'
                                        : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                    }`}>
                                        {banner.type === 'middle' ? 'Tengah' : 'Karusel'}
                                    </span>
                                    <span className="bg-slate-900/60 backdrop-blur-sm border border-white/10 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        Urutan: {banner.order_index}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{banner.title || 'Tanpa Judul'}</h4>
                                    <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">{banner.subtitle || 'Tidak ada sub-deskripsi.'}</p>
                                    {banner.link_url && (
                                        <p className="text-[10px] text-indigo-600 font-bold truncate mt-2">
                                            Link: <span className="underline font-medium">{banner.link_url}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                                    <button
                                        onClick={() => handleEditClick(banner)}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-250 text-slate-705 rounded-lg text-xs font-bold transition-all border border-slate-200 flex items-center gap-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Apakah Anda yakin ingin menghapus banner ini?')) {
                                                router.delete(route('admin.banners.destroy', banner.id));
                                            }
                                        }}
                                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg text-xs font-bold transition-all border border-rose-100 flex items-center gap-1"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
                            <h3 className="text-base font-bold text-slate-800">Tambah Banner Baru</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-semibold text-slate-600">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Judul Promosi (Opsional)</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Diskon Flash Sale"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {errors.title && <p className="text-rose-500 text-[10px]">{errors.title}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Sub-Judul (Opsional)</label>
                                    <input
                                        type="text"
                                        value={data.subtitle}
                                        onChange={(e) => setData('subtitle', e.target.value)}
                                        placeholder="Contoh: Dapatkan diskon 20%"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {errors.subtitle && <p className="text-rose-500 text-[10px]">{errors.subtitle}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Tipe Penempatan Banner</label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="carousel">Karusel Atas (Top Carousel)</option>
                                        <option value="middle">Spanduk Tengah (Middle Promo)</option>
                                    </select>
                                    {errors.type && <p className="text-rose-500 text-[10px]">{errors.type}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>File Gambar (Rasio disarankan ~21:9)</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="w-full text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-slate-100 file:text-indigo-650 hover:file:bg-slate-200"
                                        required
                                    />
                                    {errors.image && <p className="text-rose-500 text-[10px]">{errors.image}</p>}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label>Tautan Link URL (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.link_url}
                                    onChange={(e) => setData('link_url', e.target.value)}
                                    placeholder="Contoh: /katalog?search=netflix"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                />
                                {errors.link_url && <p className="text-rose-500 text-[10px]">{errors.link_url}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Status Tampil</label>
                                    <select
                                        value={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="1">Aktif / Tampilkan</option>
                                        <option value="0">Arsipkan / Sembunyikan</option>
                                    </select>
                                    {errors.is_active && <p className="text-rose-500 text-[10px]">{errors.is_active}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Urutan Penampilan (Order)</label>
                                    <input
                                        type="number"
                                        value={data.order_index}
                                        onChange={(e) => setData('order_index', e.target.value)}
                                        placeholder="0"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {errors.order_index && <p className="text-rose-500 text-[10px]">{errors.order_index}</p>}
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
                                    {processing ? 'Menyimpan...' : 'Simpan Banner'}
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
                            <h3 className="text-base font-bold text-slate-800">Edit Banner</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-semibold text-slate-600">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Judul Promosi</label>
                                    <input
                                        type="text"
                                        value={editData.title}
                                        onChange={(e) => setEditData('title', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {editErrors.title && <p className="text-rose-500 text-[10px]">{editErrors.title}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Sub-Judul</label>
                                    <input
                                        type="text"
                                        value={editData.subtitle}
                                        onChange={(e) => setEditData('subtitle', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {editErrors.subtitle && <p className="text-rose-500 text-[10px]">{editErrors.subtitle}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Tipe Penempatan Banner</label>
                                    <select
                                        value={editData.type}
                                        onChange={(e) => setEditData('type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="carousel">Karusel Atas (Top Carousel)</option>
                                        <option value="middle">Spanduk Tengah (Middle Promo)</option>
                                    </select>
                                    {editErrors.type && <p className="text-rose-500 text-[10px]">{editErrors.type}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Ganti Gambar (Opsional)</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setEditData('image', e.target.files[0])}
                                        className="w-full text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-slate-105 file:bg-slate-100 file:text-indigo-650 hover:file:bg-slate-200"
                                    />
                                    {editErrors.image && <p className="text-rose-500 text-[10px]">{editErrors.image}</p>}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label>Tautan Link URL (Opsional)</label>
                                <input
                                    type="text"
                                    value={editData.link_url}
                                    onChange={(e) => setEditData('link_url', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                />
                                {editErrors.link_url && <p className="text-rose-500 text-[10px]">{editErrors.link_url}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label>Status Tampil</label>
                                    <select
                                        value={editData.is_active}
                                        onChange={(e) => setEditData('is_active', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    >
                                        <option value="1">Aktif / Tampilkan</option>
                                        <option value="0">Arsipkan / Sembunyikan</option>
                                    </select>
                                    {editErrors.is_active && <p className="text-rose-500 text-[10px]">{editErrors.is_active}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>Urutan Penampilan (Order)</label>
                                    <input
                                        type="number"
                                        value={editData.order_index}
                                        onChange={(e) => setEditData('order_index', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                                    />
                                    {editErrors.order_index && <p className="text-rose-500 text-[10px]">{editErrors.order_index}</p>}
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
                                    {editProcessing ? 'Menyimpan...' : 'Perbarui Banner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
