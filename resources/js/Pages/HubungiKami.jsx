import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function HubungiKami() {
    const { settings } = usePage().props;
    const [formMsg, setFormMsg] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Halo admin, nama saya ${formMsg.name} (${formMsg.email}). Saya ingin bertanya: ${formMsg.message}`;
        const waLink = `https://wa.me/${settings?.whatsapp_number || '628123456789'}?text=${encodeURIComponent(text)}`;
        window.open(waLink, '_blank');
        setSent(true);
        setFormMsg({ name: '', email: '', message: '' });
    };

    return (
        <BuyerLayout>
            <Head title="Hubungi Customer Support Akun Premium" />

            <main className="max-w-5xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-4">
                    <span className="px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Layanan Hubungi</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Hubungi CS Online Kami</h1>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                        Punya pertanyaan sebelum membeli atau membutuhkan klaim garansi produk? Tim Customer Service kami siap merespons pertanyaan Anda setiap hari.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    
                    {/* Left: Contact Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                            <h3 className="font-bold text-sm text-[#0B2545] border-b border-slate-100 pb-3 uppercase tracking-wider">Detail Kontak</h3>
                            
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">WhatsApp Support</p>
                                        <a href={`https://wa.me/${settings?.whatsapp_number || '628123456789'}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 hover:underline">
                                            +{settings?.whatsapp_number || '628123456789'}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002-2v10a2 2 0 02-2 2v-10z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Alamat Email Toko</p>
                                        <p className="text-sm font-bold text-slate-700 font-mono">support@{settings?.store_name?.toLowerCase()?.replace(/\s/g, '') || 'prayogatech'}.co</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="p-2 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Jam Operasional CS</p>
                                        <p className="text-sm font-semibold text-slate-700">Setiap Hari • 09:00 - 22:00 WIB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Message Form */}
                    <div className="md:col-span-3">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-bold text-sm text-[#0B2545] border-b border-slate-100 pb-3 mb-5 uppercase tracking-wider">Kirim Pesan CS</h3>
                            
                            {sent && (
                                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                                    Pesan Anda telah siap! Mengarahkan Anda ke obrolan WhatsApp...
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={formMsg.name}
                                        onChange={(e) => setFormMsg({ ...formMsg, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Alamat Email</label>
                                    <input
                                        type="email"
                                        value={formMsg.email}
                                        onChange={(e) => setFormMsg({ ...formMsg, email: e.target.value })}
                                        placeholder="nama@email.com"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 font-mono"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Pesan Anda</label>
                                    <textarea
                                        value={formMsg.message}
                                        onChange={(e) => setFormMsg({ ...formMsg, message: e.target.value })}
                                        placeholder="Halo admin, saya ingin bertanya tentang..."
                                        rows="4"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-slate-400 resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#0B2545] hover:bg-[#13315C] text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                                >
                                    Kirim via WhatsApp
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </BuyerLayout>
    );
}
