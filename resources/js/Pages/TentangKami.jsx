import React from 'react';
import { Head, Link } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function TentangKami() {
    const values = [
        {
            title: '100% Legal & Aman',
            desc: 'Semua akun premium yang kami jual didaftarkan menggunakan metode pembayaran resmi dan kartu kredit legal. Aman dari blokir atau suspend.',
            icon: (
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: 'Garansi Penuh',
            desc: 'Kami memberikan jaminan garansi penuh selama masa durasi langganan paket Anda aktif. Jika ada kendala, admin siap membantu ganti unit.',
            icon: (
                <svg className="w-5 h-5 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                </svg>
            )
        },
        {
            title: 'Proses Instan',
            desc: 'Verifikasi receipt manual oleh admin dilakukan dengan cepat (biasanya 5 hingga 10 menit saja) dan akses langsung terkirim ke dashboard Anda.',
            icon: (
                <svg className="w-5 h-5 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: 'Bantuan CS Responsif',
            desc: 'Butuh bantuan setup profil, perpanjangan akun, atau klaim garansi? CS WhatsApp kami online setiap hari untuk merespons pertanyaan Anda.',
            icon: (
                <svg className="w-5 h-5 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
    ];

    return (
        <BuyerLayout>
            <Head title="Tentang Toko Akun Premium Kami" />

            <main className="max-w-4xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm text-center space-y-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 w-44 h-44 bg-indigo-600 rounded-full blur-2xl"></div>
                    
                    <span className="px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-[10px] font-black uppercase tracking-wider inline-block">
                        Siapa Kami
                    </span>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                        Penyedia Akun Premium <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Terpercaya</span>
                    </h1>

                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
                        Kami berkomitmen memberikan alternatif akses hiburan dan aplikasi penunjang kerja terbaik di Indonesia. Kami menyediakan lisensi legal dengan garansi penuh tanpa hambatan, memberikan kenyamanan maksimal bagi para pengguna personal maupun institusi.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-center font-extrabold text-slate-800 text-lg md:text-xl">Keunggulan Layanan Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((val, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex gap-4">
                                <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl shrink-0 h-11 flex items-center justify-center">
                                    {val.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-sm text-slate-800">{val.title}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </BuyerLayout>
    );
}
