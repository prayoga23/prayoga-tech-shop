import React from 'react';
import { Head } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function SyaratKetentuan() {
    return (
        <BuyerLayout>
            <Head title="Syarat & Ketentuan - Prayoga Tech" />

            <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Ketentuan Layanan</span>
                        <h1 className="text-3xl font-black text-white">Syarat & Ketentuan Layanan Pembuatan Aplikasi</h1>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed shadow-xl">
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Ruang Lingkup Pengembangan</h3>
                            <p>Seluruh pengembangan aplikasi website dan mobile Android mengacu pada brief rincian fitur yang telah disepakati saat awal pemesanan paket.</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Pembayaran & Garansi</h3>
                            <p>Pembayaran dilakukan via transfer rekening resmi. Klien mendapatkan jaminan garansi perbaikan bug (maintenance) selama 1 hingga 6 bulan sesuai paket yang dipilih.</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. Hak Cipta & Source Code</h3>
                            <p>Setelah pelunasan pembayaran dilakukan, 100% hak kepemilikan Source Code, database, serta lisensi domain/hosting diserahkan sepenuhnya kepada Klien.</p>
                        </div>
                    </div>

                </div>
            </div>
        </BuyerLayout>
    );
}
