import React from 'react';
import { Head, Link } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function CaraPemesanan() {
    return (
        <BuyerLayout>
            <Head title="Cara Pemesanan Jasa Pembuatan Aplikasi Website & Android - Prayoga Tech" />

            <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-10">
                    
                    <div className="text-center space-y-3">
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                            Panduan Pemesanan Layanan
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white">Cara Pemesanan Jasa Aplikasi Website & Android</h1>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                            Proses pengembangan aplikasi digital bersama Prayoga Tech Software House dirancang sangat transparan, aman, dan mudah.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                step: "01",
                                title: "Diskusi Brief & Konsultasi Kebutuhan",
                                desc: "Klien menghubungi tim konsultan kami via WhatsApp atau memilih varian paket jasa pembuatan di katalog. Kami membantu merumuskan spesifikasi fitur, konsep UI/UX, dan domain impian Anda."
                            },
                            {
                                step: "02",
                                title: "Pemilihan Paket & Konfirmasi Pesanan",
                                desc: "Pilih varian paket layanan (Website Landing Page, Company Profile, Toko Online, Aplikasi Android Flutter, atau System Custom). Sistem akan menampilkan rincian biaya transparan tanpa biaya tersembunyi."
                            },
                            {
                                step: "03",
                                title: "Pembayaran DP / Full Payment",
                                desc: "Lakukan pembayaran awal (DP) atau pelunasan melalui transfer rekening bank resmi (BCA/Mandiri) atau QRIS. Unggah bukti pembayaran di halaman invoice untuk verifikasi otomatis."
                            },
                            {
                                step: "04",
                                title: "Proses Development Kode & UI",
                                desc: "Tim software engineer kami akan mulai mengode aplikasi (Laravel/React/Flutter), merancang database, dan menyusun tampilan antarmuka (UI) sesuai spesifikasi yang telah disepakati."
                            },
                            {
                                step: "05",
                                title: "Testing, Demo Live & Revisi",
                                desc: "Klien mendapatkan akses demo live untuk mencoba langsung seluruh fitur aplikasi. Klien dapat mengajukan revisi atau penyesuaian hingga fitur berfungsi sempurna."
                            },
                            {
                                step: "06",
                                title: "Deployment, Publish & Serah Terima",
                                desc: "Website di-publish di domain utama & cloud server, atau aplikasi Android di-upload ke Google Play Store. Kami menyerahkan 100% Source Code, kredensial admin, dan memberikan garansi maintenance."
                            }
                        ].map((s, idx) => (
                            <div key={idx} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start gap-5 hover:border-indigo-500/50 transition-all shadow-xl">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-cyan-400 font-mono font-black text-xl flex items-center justify-center shrink-0">
                                    {s.step}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-base font-bold text-white">{s.title}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-4">
                        <h3 className="text-lg font-bold text-white">Ingin Konsultasi Langsung Sekarang?</h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                            Tim teknis kami siap memberikan penawaran dan rekomendasi solusi teknologi terbaik untuk usaha Anda.
                        </p>
                        <Link
                            href={route('katalog')}
                            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-105 transition-all"
                        >
                            Lihat Katalog Paket Layanan &rarr;
                        </Link>
                    </div>

                </div>
            </div>
        </BuyerLayout>
    );
}
