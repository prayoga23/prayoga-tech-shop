import React from 'react';
import { Head } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function KebijakanPrivasi() {
    return (
        <BuyerLayout>
            <Head title="Kebijakan Privasi - Prayoga Tech" />

            <div className="bg-slate-50 text-slate-900 min-h-screen py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    <div className="text-center space-y-2">
                        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Kerahasiaan Data</span>
                        <h1 className="text-3xl font-black text-slate-900">Kebijakan Privasi & Kerahasiaan Klien</h1>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
                        <p>
                            Prayoga Tech menghargai kerahasiaan data proyek, ide bisnis, dan informasi kontak seluruh klien kami.
                        </p>
                        <p>
                            Seluruh Source Code, kredensial server, dan data basis data proyek Anda dijamin tersimpan secara aman dan tidak akan disebarluaskan kepada pihak manapun.
                        </p>
                    </div>

                </div>
            </div>
        </BuyerLayout>
    );
}
