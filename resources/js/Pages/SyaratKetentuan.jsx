import React from 'react';
import { Head } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function SyaratKetentuan() {
    return (
        <BuyerLayout>
            <Head title="Syarat & Ketentuan Layanan" />

            <main className="max-w-3xl mx-auto w-full px-6 py-12 md:py-16 space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-3">
                    <span className="px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Hukum & Ketentuan</span>
                    <h1 className="text-3xl font-extrabold text-slate-900">Syarat & Ketentuan</h1>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                        Harap baca syarat dan ketentuan ini dengan seksama sebelum melakukan pemesanan lisensi akun premium Anda.
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">1. Ketentuan Penggunaan Akun</h3>
                        <p>
                            Pembeli berkewajiban untuk menggunakan akun premium yang diberikan sesuai dengan jenis paket yang dibeli:
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                            <li><strong>Paket Shared (Bersama)</strong>: Hanya diperbolehkan masuk (login) pada jumlah perangkat maksimal sesuai pesanan (biasanya 1 profil/device). Dilarang keras mengubah informasi profil lain, merubah password, atau mengedit detail penagihan akun bersama.</li>
                            <li><strong>Paket Private (Individu)</strong>: Hak milik penuh selama masa durasi sewa, namun tetap dilarang menggunakan akun untuk tindakan ilegal yang melanggar hukum.</li>
                        </ul>
                    </section>

                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">2. Kebijakan Garansi</h3>
                        <p>
                            Kami memberikan jaminan garansi penuh sesuai masa durasi sewa paket yang Anda beli (misal: garansi 30 hari penuh untuk paket 1 bulan) dengan syarat:
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                            <li>Pembeli tidak melanggar aturan penggunaan (seperti tidak mengubah password akun shared).</li>
                            <li>Pembeli dapat menyertakan nomor invoice pembelian yang valid saat mengajukan klaim garansi.</li>
                            <li>Klaim garansi diproses secara antrean manual melalui customer service WhatsApp dalam waktu maksimal 1x24 jam.</li>
                        </ul>
                    </section>

                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">3. Kebijakan Pembayaran</h3>
                        <p>
                            Semua transaksi dilakukan melalui transfer manual ke rekening bank lokal atau e-wallet yang kami sediakan secara resmi. Pembayaran dianggap sah apabila pembeli mengunggah bukti transfer yang valid dan berhasil diverifikasi oleh tim administrasi kami.
                        </p>
                    </section>

                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">4. Pembatalan Layanan</h3>
                        <p>
                            Kami berhak menangguhkan atau membatalkan akses akun premium Anda tanpa pengembalian dana jika pembeli terbukti secara sengaja melakukan kecurangan, merusak profil pengguna lain, atau mencoba menjual kembali akses akun tanpa izin resmi.
                        </p>
                    </section>
                </div>
            </main>
        </BuyerLayout>
    );
}
