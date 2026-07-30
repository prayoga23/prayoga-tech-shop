import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function Show({ order, groupOrders = [] }) {
    const { settings } = usePage().props;
    const [copied, setCopied] = useState(false);

    const form = useForm({
        payment_proof: null,
    });

    const isGroup = groupOrders && groupOrders.length > 0;
    const groupTotal = isGroup ? groupOrders.reduce((sum, o) => sum + o.price, 0) : order.price;
    const groupDiscount = isGroup ? groupOrders.reduce((sum, o) => sum + (o.discount_amount || 0), 0) : (order.discount_amount || 0);
    const netTotal = groupTotal - groupDiscount;

    const handleUploadProof = (e) => {
        e.preventDefault();
        if (!form.data.payment_proof) {
            alert('Silakan pilih file bukti transfer terlebih dahulu.');
            return;
        }
        form.post(route('order.upload-proof', order.order_number), {
            onSuccess: () => {
                form.reset();
            }
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(order.credentials_sent || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const getStatusBanner = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-amber-300 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-amber-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                            Menunggu Pembayaran Proyek
                        </h4>
                        Silakan lakukan transfer sebesar <strong className="font-mono text-white text-base">{formatIDR(netTotal)}</strong> ke rekening yang tertera. Unggah foto bukti transfer untuk memulai pengerjaan proyek oleh tim developer.
                    </div>
                );
            case 'paid':
                return (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 text-cyan-300 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-cyan-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                            Pembayaran Diverifikasi - Dalam Pengerjaan Proyek
                        </h4>
                        Bukti pembayaran telah dikonfirmasi! Tim software engineer kami sedang mengode aplikasi dan merancang arsitektur sistem Anda.
                    </div>
                );
            case 'completed':
                return (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-emerald-300 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-emerald-300">
                            ✓ Proyek Selesai & Serah Terima Aset
                        </h4>
                        Pengerjaan aplikasi telah selesai! Link demo, Source Code, dan kredensial akses admin diserahkan di bawah ini.
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-5 text-rose-300 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-bold text-sm mb-1.5 text-rose-300">
                            Pesanan Dibatalkan
                        </h4>
                        Pesanan ini telah dibatalkan. Silakan hubungi Customer Service kami jika ada kendala.
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <BuyerLayout>
            <Head title={`Invoice #${order.order_number} - Prayoga Tech`} />

            <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    
                    <div>
                        <Link href={route('dashboard')} className="text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors">
                            &larr; Kembali ke Riwayat Pesanan
                        </Link>
                    </div>

                    {getStatusBanner(order.status)}

                    {/* Order Details Invoice Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                            <div>
                                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Invoice Resmi Software House</span>
                                <h2 className="text-lg font-black text-white font-mono">#{order.order_number}</h2>
                            </div>
                            <span className="text-xs text-slate-400 font-mono">
                                Waktu Order: {new Date(order.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                            </span>
                        </div>

                        {/* Package Info */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detail Layanan Dipesan:</h3>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-white">{order.product_package?.product?.name}</span>
                                <span className="font-black text-cyan-400">{formatIDR(order.price)}</span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">Varian Paket: {order.product_package?.name}</p>
                            {order.notes && (
                                <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-900">Brief Klien: "{order.notes}"</p>
                            )}
                        </div>

                        {/* Payment Method Details */}
                        {order.status === 'pending' && order.payment_method && (
                            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
                                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Instruksi Pembayaran Transfer:</h3>
                                <div className="space-y-1 text-xs text-slate-300">
                                    <p className="font-bold text-white text-sm">{order.payment_method.name}</p>
                                    <p className="font-mono text-cyan-400 font-bold text-base">Rekening: {order.payment_method.account_number}</p>
                                    <p className="text-slate-400">Atas Nama: {order.payment_method.account_name}</p>
                                    {order.payment_method.instructions && (
                                        <p className="text-[11px] text-slate-400 pt-2 border-t border-indigo-900/60 leading-relaxed">{order.payment_method.instructions}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Payment Proof Upload Form */}
                        {order.status === 'pending' && (
                            <form onSubmit={handleUploadProof} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Unggah Bukti Transfer Bank / QRIS</h3>
                                <input
                                    type="file"
                                    onChange={(e) => form.setData('payment_proof', e.target.files[0])}
                                    accept="image/*"
                                    className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                                >
                                    {form.processing ? 'Mengunggah...' : 'Kirim Bukti Transfer'}
                                </button>
                            </form>
                        )}

                        {/* Completed Credentials / Live Demo & Source Code link */}
                        {order.status === 'completed' && order.credentials_sent && (
                            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                                <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Link Demo, Source Code & Akses Admin:</h3>
                                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-400 whitespace-pre-wrap">
                                    {order.credentials_sent}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="px-4 py-2 bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
                                >
                                    {copied ? '✓ Berhasil Disalin!' : 'Salin Kredensial & Link'}
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </BuyerLayout>
    );
}
