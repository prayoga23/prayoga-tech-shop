import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Settings({ settings }) {
    const form = useForm({
        store_name: settings.store_name || '',
        store_description: settings.store_description || '',
        whatsapp_number: settings.whatsapp_number || '',
        store_logo: null,
        social_instagram: settings.social_instagram || '#',
        social_tiktok: settings.social_tiktok || '#',
        social_x: settings.social_x || '#',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('admin.settings.update'));
    };

    return (
        <AdminLayout title="Pengaturan Toko">
            <Head title="Pengaturan Toko" />

            <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden mb-6">
                <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 w-24 h-24 bg-indigo-500 rounded-full blur-xl"></div>
                
                <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-6 font-sans">Konfigurasi Umum Toko</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Store Logo */}
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Logo Website / Toko</label>
                        <input
                            type="file"
                            onChange={(e) => form.setData('store_logo', e.target.files[0])}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-500 text-sm focus:outline-none file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-indigo-650 hover:file:bg-slate-200 cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 block mt-1">Format: PNG, JPG, JPEG, SVG, WEBP (Maks. 10MB).</span>
                        {form.errors.store_logo && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.store_logo}</p>}
                        
                        {settings.store_logo_path && !form.data.store_logo && (
                            <div className="mt-3 flex items-center gap-2.5">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Logo saat ini:</span>
                                <div className="h-10 px-3 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center">
                                    <img src={`/storage/${settings.store_logo_path}`} alt="Current Logo" className="h-7 object-contain" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Store Name */}
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Nama Website / Toko</label>
                        <input
                            type="text"
                            value={form.data.store_name}
                            onChange={(e) => form.setData('store_name', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-semibold"
                            required
                        />
                        {form.errors.store_name && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.store_name}</p>}
                    </div>

                    {/* Store Description */}
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Slogan / Deskripsi Singkat Toko</label>
                        <textarea
                            value={form.data.store_description}
                            onChange={(e) => form.setData('store_description', e.target.value)}
                            rows="3"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none font-medium"
                            required
                        />
                        {form.errors.store_description && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.store_description}</p>}
                    </div>

                    {/* WhatsApp Contact */}
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Nomor WhatsApp Admin Support</label>
                        <input
                            type="text"
                            value={form.data.whatsapp_number}
                            onChange={(e) => form.setData('whatsapp_number', e.target.value)}
                            placeholder="Gunakan kode negara, contoh: 628123456789"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-mono font-bold text-indigo-650"
                            required
                        />
                        <span className="text-[10px] text-slate-500 block mt-1.5 leading-relaxed font-semibold">
                            Masukkan nomor WhatsApp dengan awalan kode negara (tanpa tanda '+', spasi, atau strip). Contoh: <strong>628123456789</strong>. Digunakan untuk tautan tombol bantuan / chat CS.
                        </span>
                        {form.errors.whatsapp_number && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.whatsapp_number}</p>}
                    </div>

                    {/* Social Media Section */}
                    <div className="border-t border-slate-100 pt-6 space-y-4">
                        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Link Sosial Media Toko</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Instagram */}
                            <div>
                                <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Instagram Link / URL</label>
                                <input
                                    type="text"
                                    value={form.data.social_instagram}
                                    onChange={(e) => form.setData('social_instagram', e.target.value)}
                                    placeholder="https://instagram.com/username"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                />
                                {form.errors.social_instagram && <p className="text-rose-600 text-[10px] mt-1">{form.errors.social_instagram}</p>}
                            </div>

                            {/* TikTok */}
                            <div>
                                <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">TikTok Link / URL</label>
                                <input
                                    type="text"
                                    value={form.data.social_tiktok}
                                    onChange={(e) => form.setData('social_tiktok', e.target.value)}
                                    placeholder="https://tiktok.com/@username"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                />
                                {form.errors.social_tiktok && <p className="text-rose-600 text-[10px] mt-1">{form.errors.social_tiktok}</p>}
                            </div>

                            {/* X (formerly Twitter) */}
                            <div>
                                <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">X / Twitter Link / URL</label>
                                <input
                                    type="text"
                                    value={form.data.social_x}
                                    onChange={(e) => form.setData('social_x', e.target.value)}
                                    placeholder="https://x.com/username"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                />
                                {form.errors.social_x && <p className="text-rose-600 text-[10px] mt-1">{form.errors.social_x}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/10 transition-colors"
                        >
                            {form.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
