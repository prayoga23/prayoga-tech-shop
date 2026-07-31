import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const { auth, flash, settings } = usePage().props;
    const [notifPermission, setNotifPermission] = useState(
        typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'denied'
    );
    const [pendingPaymentCount, setPendingPaymentCount] = useState(0);

    const playChimeSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const now = ctx.currentTime;
            
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(587.33, now); // D5
            gain1.gain.setValueAtTime(0.2, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.3);

            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(880, now + 0.15); // A5
            gain2.gain.setValueAtTime(0.3, now + 0.15);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(now + 0.15);
            osc2.stop(now + 0.6);
        } catch (e) {
            console.log('Audio chime error:', e);
        }
    };

    const triggerChromeNotification = (title, body, targetUrl) => {
        playChimeSound();

        const logoUrl = settings?.store_logo_path ? (settings.store_logo_path.startsWith('/') ? settings.store_logo_path : `/storage/${settings.store_logo_path}`) : '/logo.png';

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then((reg) => {
                reg.showNotification(title, {
                    body: body,
                    icon: logoUrl,
                    badge: logoUrl,
                    vibrate: [200, 100, 200, 100, 200],
                    tag: 'payment-' + Date.now(),
                    data: { url: targetUrl }
                });
            });
        } else if ('Notification' in window && Notification.permission === 'granted') {
            const notif = new Notification(title, {
                body: body,
                icon: logoUrl,
            });
            notif.onclick = () => {
                window.focus();
                window.location.href = targetUrl;
            };
        }
    };

    const requestChromeNotificationPermission = async () => {
        if (!('Notification' in window)) {
            alert('Browser Anda tidak mendukung Web Notifications.');
            return;
        }
        try {
            const permission = await Notification.requestPermission();
            setNotifPermission(permission);
            if (permission === 'granted') {
                setNotificationMessage({
                    type: 'success',
                    text: '🔔 Notifikasi Chrome berhasil diaktifkan! Bukti pembayaran baru akan muncul langsung di HP/Laptop Anda.'
                });
                setShowNotification(true);

                triggerChromeNotification(
                    '🔔 Notifikasi Chrome Aktif!',
                    'Sistem notifikasi bukti pembayaran Prayoga Tech aktif. Setiap ada transfer baru dari pembeli, notifikasi akan langsung terkirim ke HP Anda.',
                    route('admin.orders.index')
                );
            } else {
                setNotificationMessage({
                    type: 'error',
                    text: 'Izin notifikasi Chrome ditolak. Silakan izinkan notifikasi di setelan browser HP/Laptop Anda.'
                });
                setShowNotification(true);
            }
        } catch (e) {
            console.error('Error requesting notification permission:', e);
        }
    };

    useEffect(() => {
        if (flash?.success) {
            setNotificationMessage({ type: 'success', text: flash.success });
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 4000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setNotificationMessage({ type: 'error', text: flash.error });
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch((err) => console.log('SW Reg Error:', err));
        }

        const checkPendingPayments = async () => {
            try {
                const res = await fetch(route('admin.orders.check-pending'));
                if (!res.ok) return;
                const data = await res.json();
                
                setPendingPaymentCount(data.count);

                const notifiedIds = JSON.parse(localStorage.getItem('notified_payment_ids') || '[]');
                let hasNewNotif = false;

                data.orders.forEach((order) => {
                    if (!notifiedIds.includes(order.id)) {
                        const title = `💳 BUKTI PEMBAYARAN: #${order.order_number}`;
                        const body = `${order.customer_name} mengunggah bukti bayar (${order.payment_method?.name || 'Transfer'}). Klik untuk konfirmasi!`;
                        const targetUrl = route('admin.orders.show', order.id);

                        triggerChromeNotification(title, body, targetUrl);

                        setNotificationMessage({
                            type: 'success',
                            text: `💳 ${order.customer_name} telah mengirimkan bukti pembayaran! (${order.order_number})`
                        });
                        setShowNotification(true);

                        notifiedIds.push(order.id);
                        hasNewNotif = true;
                    }
                });

                if (hasNewNotif) {
                    localStorage.setItem('notified_payment_ids', JSON.stringify(notifiedIds));
                }
            } catch (err) {
                // Silent catch
            }
        };

        checkPendingPayments();
        const interval = setInterval(checkPendingPayments, 8000); // Check every 8 seconds

        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
        { name: 'Kategori', href: route('admin.categories.index'), icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
        { name: 'Produk', href: route('admin.products.index'), icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { name: 'Banner', href: route('admin.banners.index'), icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { name: 'Diskon', href: route('admin.promos.index'), icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
        { name: 'Metode Pembayaran', href: route('admin.payment-methods.index'), icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
        { name: 'Pesanan', href: route('admin.orders.index'), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { name: 'Pelanggan', href: route('admin.users.index'), icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Pengaturan', href: route('admin.settings.index'), icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ];

    const currentUrl = usePage().url;

    return (
        <div className="h-screen bg-slate-50 text-slate-800 flex overflow-hidden font-sans">
            {/* Notification alert */}
            {showNotification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 flex items-center gap-3 border ${notificationMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}>
                    <div className={`p-1.5 rounded-lg ${notificationMessage.type === 'success' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                        {notificationMessage.type === 'success' ? (
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        )}
                    </div>
                    <span className="font-semibold text-sm">{notificationMessage.text}</span>
                    <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600 ml-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Sidebar for Desktop */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform lg:translate-x-0 lg:static lg:flex lg:flex-col h-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center px-6 border-b border-slate-200 gap-3">
                    <img
                        src={settings?.store_logo_path ? (settings.store_logo_path.startsWith('/') ? settings.store_logo_path : `/storage/${settings.store_logo_path}`) : '/logo.png'}
                        alt="Logo"
                        className="h-8 max-w-[120px] object-contain shrink-0"
                        onError={(e) => { e.target.src = '/logo.png'; }}
                    />
                    <span className="font-extrabold text-lg bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent truncate">
                        {settings?.store_name || 'Prayoga Tech'}
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = currentUrl.startsWith(item.href.replace(window.location.origin, ''));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <svg
                                    className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <Link
                        href={route('home')}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all bg-slate-50"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Toko
                    </Link>
                </div>
            </aside>

            {/* Backdrop for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/20 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="sticky top-0 shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="font-bold text-base md:text-lg text-slate-800">{title}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Pending Payments Badge */}
                        <Link
                            href={route('admin.orders.index') + '?status=paid'}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                pendingPaymentCount > 0
                                    ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-sm animate-pulse'
                                    : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                            title="Bukti Transfer Perlu Konfirmasi"
                        >
                            <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="hidden sm:inline">Bukti Transfer:</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${pendingPaymentCount > 0 ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                {pendingPaymentCount}
                            </span>
                        </Link>

                        {/* Chrome Notification Permission Button */}
                        {notifPermission !== 'granted' ? (
                            <button
                                onClick={requestChromeNotificationPermission}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all shadow-sm"
                                title="Klik untuk mengaktifkan notifikasi Chrome HP/Laptop"
                            >
                                <svg className="w-4 h-4 text-indigo-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="hidden sm:inline">Aktifkan Notif Chrome HP</span>
                                <span className="sm:hidden">Notif Chrome</span>
                            </button>
                        ) : (
                            <button
                                onClick={requestChromeNotificationPermission}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold transition-all shadow-sm"
                                title="Notifikasi Chrome Aktif"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="hidden sm:inline">Notif Chrome HP (Aktif)</span>
                                <span className="sm:hidden">Notif Aktif</span>
                            </button>
                        )}

                        <div className="flex flex-col text-right hidden sm:flex">
                            <span className="text-sm font-semibold text-slate-800">{auth.user.name}</span>
                            <span className="text-xs text-indigo-600 font-semibold">Administrator</span>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-2 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-150 hover:border-rose-250"
                            title="Keluar"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
