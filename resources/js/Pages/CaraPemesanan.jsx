import React from 'react';
import { Head, Link } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function CaraPemesanan() {
    const steps = [
        {
            number: '01',
            title: 'Pilih Produk & Paket',
            desc: 'Jelajahi halaman Katalog, cari aplikasi premium yang Anda inginkan (seperti Spotify, Canva, Netflix), dan pilih variasi paket durasi yang sesuai dengan kebutuhan Anda.',
            icon: (
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            number: '02',
            title: 'Tambahkan Ke Keranjang / Checkout',
            desc: 'Anda bisa menambahkan beberapa paket sekaligus ke Keranjang Belanja, atau langsung mengklik "Beli Sekarang". Masukkan nama, email, nomor WhatsApp aktif, dan pilih metode bank transfer manual.',
            icon: (
                <svg className="w-6 h-6 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            number: '03',
            title: 'Lakukan Transfer Manual',
            desc: 'Kirimkan pembayaran transfer manual Anda sesuai nominal tagihan pesanan ke nomor rekening bank atau e-wallet (BCA, Mandiri, Dana, QRIS) yang tertera pada invoice.',
            icon: (
                <svg className="w-6 h-6 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            )
        },
        {
            number: '04',
            title: 'Unggah Bukti Pembayaran',
            desc: 'Foto struk ATM atau ambil tangkapan layar (screenshot) transfer m-banking Anda, kemudian unggah berkas gambar tersebut pada formulir bukti transfer di halaman invoice Anda.',
            icon: (
                <svg className="w-6 h-6 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            number: '05',
            title: 'Dapatkan Kredensial Akses Akun',
            desc: 'Admin kami akan memverifikasi pembayaran Anda dalam waktu 5-10 menit. Setelah disetujui, informasi kredensial akun premium (email, password, profil) akan terkirim secara otomatis ke Dashboard Anda.',
            icon: (
                <svg className="w-6 h-6 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
    ];

    return (
        <BuyerLayout>
            <Head title="Panduan Cara Pemesanan Akun Premium" />

            <main className="max-w-4xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-4">
                    <span className="px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Panduan Lengkap</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Cara Melakukan Pemesanan</h1>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                        Proses transaksi di website kami sangat mudah dan terjamin aman. Ikuti 5 langkah mudah berikut ini untuk mengaktifkan akun premium Anda.
                    </p>
                </div>

                <div className="relative border-l border-indigo-100 ml-4 md:ml-8 space-y-12 py-4">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative pl-8 md:pl-12 group">
                            <div className="absolute left-0 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center font-bold text-xs text-indigo-600 shadow-md group-hover:scale-110 transition-transform">
                                {step.number}
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-extrabold text-sm md:text-base text-slate-805 text-slate-800">{step.title}</h3>
                                </div>
                                <p className="text-slate-550 text-slate-500 text-xs md:text-sm leading-relaxed font-medium pl-0.5">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="font-bold text-sm text-amber-850">Catatan Penting Garansi</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                            Harap jangan pernah mengubah email, password, atau profile milik profil pembeli lain untuk paket jenis *Shared*. Pelanggaran ketentuan ini dapat membatalkan garansi Anda secara sepihak.
                        </p>
                    </div>
                </div>
            </main>
        </BuyerLayout>
    );
}
