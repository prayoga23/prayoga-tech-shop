import React from 'react';
import { Head } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function KebijakanPrivasi() {
    return (
        <BuyerLayout>
            <Head title="Kebijakan Privasi" />

            <main className="max-w-3xl mx-auto w-full px-6 py-12 md:py-16 space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-3">
                    <span className="px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Keamanan & Data</span>
                    <h1 className="text-3xl font-extrabold text-slate-900">Kebijakan Privasi</h1>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                        Kami sangat menghargai kerahasiaan data pribadi Anda. Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">1. Informasi Yang Kami Kumpulkan</h3>
                        <p>
                            Saat Anda mendaftar atau melakukan transaksi pembelian di website kami, kami mengumpulkan data pribadi berupa:
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                            <li>Nama lengkap pembeli.</li>
                            <li>Alamat email untuk pengiriman informasi notifikasi.</li>
                            <li>Nomor WhatsApp aktif untuk koordinasi penanganan garansi atau bantuan cepat.</li>
                            <li>Informasi bukti transfer bank untuk kepentingan audit pembayaran manual.</li>
                        </ul>
                    </section>

                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">2. Penggunaan Informasi</h3>
                        <p>
                            Data pribadi yang kami kumpulkan semata-mata digunakan untuk kepentingan:
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                            <li>Memproses pesanan dan memverifikasi pembayaran Anda.</li>
                            <li>Mengirimkan informasi kredensial akun premium yang Anda sewa ke dashboard pribadi Anda.</li>
                            <li>Memberikan notifikasi status garansi atau jika terjadi pergantian akun sewa baru.</li>
                            <li>Menghubungi Anda melalui WhatsApp apabila terjadi kendala teknis pada akun yang dipesan.</li>
                        </ul>
                    </section>

                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">3. Perlindungan & Keamanan Data</h3>
                        <p>
                            Kami menerapkan protokol keamanan data yang ketat untuk mencegah akses tanpa izin, perubahan, atau pengungkapan informasi pribadi Anda kepada pihak ketiga. Kami tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak luar untuk kepentingan promosi/iklan.
                        </p>
                    </section>

                    <section className="space-y-2.5">
                        <h3 className="font-extrabold text-slate-800 text-sm md:text-base">4. Persetujuan Pengguna</h3>
                        <p>
                            Dengan mendaftar, melakukan transaksi, dan menggunakan layanan kami, Anda dianggap menyetujui seluruh ketentuan kebijakan privasi ini secara sadar tanpa paksaan.
                        </p>
                    </section>
                </div>
            </main>
        </BuyerLayout>
    );
}
