import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Settings({ settings }) {
    const form = useForm({
        store_name: settings.store_name || '',
        store_description: settings.store_description || '',
        whatsapp_number: settings.whatsapp_number || '',
        store_logo: null,
        social_instagram: settings.social_instagram || '#',
        social_tiktok: settings.social_tiktok || '#',
        social_x: settings.social_x || '#',
        admin_email: settings.admin_email || 'prayoga2np@gmail.com',
        wa_notification_enabled: settings.wa_notification_enabled === 'true' || settings.wa_notification_enabled === true,
        wa_meta_business_token: settings.wa_meta_business_token || '',
        wa_meta_phone_number_id: settings.wa_meta_phone_number_id || '',
        wa_notification_recipient: settings.wa_notification_recipient || '628990703408',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('admin.settings.update'));
    };

    const handleTestEmail = (e) => {
        e.preventDefault();
        router.post(route('admin.settings.test-email'));
    };

    return (
        <AdminLayout title="Pengaturan Toko & Notifikasi">
            <Head title="Pengaturan Toko & Notifikasi" />

            <div className="max-w-4xl space-y-6 mb-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 w-24 h-24 bg-indigo-500 rounded-full blur-xl"></div>
                        
                        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-6 font-sans flex items-center justify-between">
                            <span>Konfigurasi Umum Toko</span>
                            <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-1 rounded-full">General Config</span>
                        </h3>

                        <div className="space-y-6">
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
                                <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Nomor WhatsApp Admin Support (Landing Page)</label>
                                <input
                                    type="text"
                                    value={form.data.whatsapp_number}
                                    onChange={(e) => form.setData('whatsapp_number', e.target.value)}
                                    placeholder="Gunakan kode negara, contoh: 628990703408"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-mono font-bold text-indigo-650"
                                    required
                                />
                                <span className="text-[10px] text-slate-500 block mt-1.5 leading-relaxed font-semibold">
                                    Masukkan nomor WhatsApp dengan awalan kode negara. Contoh: <strong>628990703408</strong>. Digunakan untuk tombol WhatsApp di halaman publik.
                                </span>
                                {form.errors.whatsapp_number && <p className="text-rose-600 text-xs font-medium mt-1">{form.errors.whatsapp_number}</p>}
                            </div>

                            {/* Social Media Section */}
                            <div className="border-t border-slate-100 pt-6 space-y-4">
                                <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Link Sosial Media Toko</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">Instagram</label>
                                        <input
                                            type="text"
                                            value={form.data.social_instagram}
                                            onChange={(e) => form.setData('social_instagram', e.target.value)}
                                            placeholder="https://instagram.com/username"
                                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">TikTok</label>
                                        <input
                                            type="text"
                                            value={form.data.social_tiktok}
                                            onChange={(e) => form.setData('social_tiktok', e.target.value)}
                                            placeholder="https://tiktok.com/@username"
                                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase text-slate-500 tracking-wider mb-1.5">X / Twitter</label>
                                        <input
                                            type="text"
                                            value={form.data.social_x}
                                            onChange={(e) => form.setData('social_x', e.target.value)}
                                            placeholder="https://x.com/username"
                                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notification Settings Card (SMTP Email & WhatsApp Meta API) */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 w-24 h-24 bg-emerald-500 rounded-full blur-xl"></div>

                        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-6 font-sans flex items-center justify-between">
                            <span className="flex items-center gap-2 text-indigo-600">
                                <i className="fa-solid fa-envelope-open-text"></i>
                                <span>Notifikasi Bukti Pembayaran (SMTP & WhatsApp)</span>
                            </span>
                            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">Push Alert</span>
                        </h3>

                        <div className="space-y-6">
                            {/* Admin Notification Email */}
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">Email Notifikasi Admin (SMTP)</label>
                                    <button
                                        type="button"
                                        onClick={handleTestEmail}
                                        className="text-xs font-semibold px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                                    >
                                        <i className="fa-solid fa-paper-plane text-indigo-500"></i>
                                        <span>Tes Kirim Email Uji Coba</span>
                                    </button>
                                </div>
                                <input
                                    type="email"
                                    value={form.data.admin_email}
                                    onChange={(e) => form.setData('admin_email', e.target.value)}
                                    placeholder="prayoga2np@gmail.com"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 font-mono font-bold text-slate-900"
                                    required
                                />
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Setiap kali pelanggan mengunggah bukti pembayaran, notifikasi rincian pesanan dan lampiran file bukti transfer akan dikirimkan secara otomatis ke alamat email ini via SMTP.
                                </p>
                                {form.errors.admin_email && <p className="text-rose-600 text-xs font-medium">{form.errors.admin_email}</p>}
                            </div>

                            {/* WhatsApp Meta Business API Settings */}
                            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-emerald-900 tracking-wider">WhatsApp Meta Business API (Opsional)</h4>
                                        <p className="text-[11px] text-emerald-700">Kirim notifikasi bukti transfer otomatis ke WhatsApp Admin.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.data.wa_notification_enabled}
                                            onChange={(e) => form.setData('wa_notification_enabled', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                    </label>
                                </div>

                                {form.data.wa_notification_enabled && (
                                    <div className="space-y-4 pt-2 border-t border-emerald-100">
                                        <div>
                                            <label className="block text-[10px] font-semibold uppercase text-emerald-800 tracking-wider mb-1">Nomor WhatsApp Penerima Alert Admin</label>
                                            <input
                                                type="text"
                                                value={form.data.wa_notification_recipient}
                                                onChange={(e) => form.setData('wa_notification_recipient', e.target.value)}
                                                placeholder="628990703408"
                                                className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-mono font-bold focus:outline-none focus:border-emerald-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-semibold uppercase text-emerald-800 tracking-wider mb-1">Meta Access Token</label>
                                                <input
                                                    type="password"
                                                    value={form.data.wa_meta_business_token}
                                                    onChange={(e) => form.setData('wa_meta_business_token', e.target.value)}
                                                    placeholder="EAA..."
                                                    className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-mono focus:outline-none focus:border-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-semibold uppercase text-emerald-800 tracking-wider mb-1">Phone Number ID</label>
                                                <input
                                                    type="text"
                                                    value={form.data.wa_meta_phone_number_id}
                                                    onChange={(e) => form.setData('wa_meta_phone_number_id', e.target.value)}
                                                    placeholder="1092837465..."
                                                    className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-mono focus:outline-none focus:border-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-floppy-disk"></i>
                            <span>{form.processing ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
