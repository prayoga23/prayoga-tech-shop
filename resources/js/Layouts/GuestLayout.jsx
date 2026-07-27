import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { settings } = usePage().props;

    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-50 pt-6 sm:justify-center sm:pt-0 relative overflow-hidden font-sans">
            {/* Visual background gradient blobs */}
            <div className="absolute top-1/4 left-1/3 opacity-10 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/3 opacity-10 w-96 h-96 bg-violet-500 rounded-full blur-[100px] pointer-events-none"></div>

            {/* <div className="z-10 mb-2">
                <Link href="/" className="flex items-center gap-3">
                    {settings?.store_logo_path ? (
                        <img 
                            src={`/storage/${settings.store_logo_path}`} 
                            alt="Logo" 
                            className="h-12 max-w-[220px] object-contain" 
                        />
                    ) : (
                        <div className="flex items-center gap-3 bg-white px-5 py-3 border border-slate-200 rounded-2xl shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30 shrink-0">
                                PT
                            </div>
                            <span className="font-extrabold text-lg text-slate-800">
                                {settings?.store_name || 'Prayoga Tech'}
                            </span>
                        </div>
                    )}
                </Link>
            </div> */}

            <div className="z-10 mt-6 w-full overflow-hidden bg-white px-8 py-7 border border-slate-200 shadow-xl rounded-3xl sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
