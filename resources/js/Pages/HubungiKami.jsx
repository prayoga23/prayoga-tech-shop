import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function HubungiKami() {
    const { settings } = usePage().props;
    const whatsappNumber = settings?.whatsapp_number || '628123456789';

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        whatsapp: '',
        service: 'Website Development',
        message: ''
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        const text = `Halo Prayoga Tech Software House,\nSaya ingin konsultasi proyek:\n- Nama: ${formState.name}\n- Email: ${formState.email}\n- WhatsApp: ${formState.whatsapp}\n- Layanan: ${formState.service}\n- Pesan: ${formState.message}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <BuyerLayout>
            <Head title="Hubungi Kami & Konsultasi Proyek - Prayoga Tech" />

            <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-10">
                    
                    <div className="text-center space-y-3">
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                            Konsultasi Bebas Biaya
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white">Hubungi Tim Developer Kami</h1>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                            Diskusikan ide pembuatan website, aplikasi mobile Android, atau integrasi sistem bisnis Anda bersama kami.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        
                        {/* Info Column */}
                        <div className="md:col-span-5 space-y-4">
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Informasi Kontak Official</h3>

                                <div className="space-y-3 text-xs">
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer Support WhatsApp:</span>
                                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline">
                                            +{whatsappNumber}
                                        </a>
                                    </div>

                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Jam Operasional Layanan:</span>
                                        <span className="text-slate-200">Senin - Sabtu: 08.00 - 22.00 WIB</span>
                                    </div>

                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Konsultasi:</span>
                                        <span className="text-cyan-400 font-mono">support@prayogatech.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Form Column */}
                        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Formulir Pesan Konsultasi Cepat</h3>

                            <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Lengkap Anda</label>
                                    <input
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="Nama Anda"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nomor WhatsApp Aktif</label>
                                    <input
                                        type="text"
                                        value={formState.whatsapp}
                                        onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })}
                                        placeholder="081234567890"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white font-mono"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Layanan Ditanyakan</label>
                                    <select
                                        value={formState.service}
                                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                                    >
                                        <option value="Website Development">Jasa Pembuatan Website</option>
                                        <option value="Aplikasi Android">Jasa Pembuatan Aplikasi Android</option>
                                        <option value="Bundle Web + Mobile">Bundle Website + Android App</option>
                                        <option value="UI/UX Design">Desain UI/UX Figma</option>
                                        <option value="Maintenance & VPS">Maintenance & Cloud VPS</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rincian Kebutuhan Proyek</label>
                                    <textarea
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="Jelaskan kebutuhan fitur atau ide aplikasi Anda..."
                                        rows={4}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                                >
                                    Kirim Pesan Konsultasi via WhatsApp &rarr;
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
}
