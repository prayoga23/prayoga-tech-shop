import React from 'react';
import { Head } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function TentangKami() {
    return (
        <BuyerLayout>
            <Head title="Tentang Kami - Prayoga Tech Software House" />

            <div className="bg-slate-50 text-slate-900 min-h-screen py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-10">
                    
                    <div className="text-center space-y-3">
                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200">
                            Profil Perusahaan
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Tentang Prayoga Tech Software House</h1>
                        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
                            Mitra teknologi terpercaya dalam pembuatan aplikasi Website, aplikasi Android Mobile, dan sistem informasi custom.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm leading-relaxed text-xs sm:text-sm text-slate-700">
                        <p>
                            <strong className="text-slate-900 font-extrabold">Prayoga Tech</strong> adalah Software House & Developer Studio independen yang berdedikasi membantu perusahaan, UMKM, instansi pendidikan, dan wirausahawan dalam membangun infrastruktur teknologi informasi berkinerja tinggi.
                        </p>

                        <p>
                            Kami mengombinasikan keahlian dalam framework modern seperti <span className="text-indigo-600 font-mono font-bold">Laravel, React.js, Next.js, Tailwind CSS, dan Flutter</span> untuk menghadirkan produk digital yang tidak hanya estetis secara antarmuka, tetapi juga cepat, aman, dan mudah digunakan (user-friendly).
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                                <h3 className="text-lg font-black text-indigo-600">100% Code Quality</h3>
                                <p className="text-[11px] text-slate-600 font-medium">Kode bersih, standar industri, & mudah dikembangkan.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                                <h3 className="text-lg font-black text-cyan-600">Garansi Maintenance</h3>
                                <p className="text-[11px] text-slate-600 font-medium">Jaminan bebas bug & bantuan teknis berkala.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                                <h3 className="text-lg font-black text-emerald-600">Source Code Hak Milik</h3>
                                <p className="text-[11px] text-slate-600 font-medium">Penyerahan penuh kredensial & aset proyek.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </BuyerLayout>
    );
}
