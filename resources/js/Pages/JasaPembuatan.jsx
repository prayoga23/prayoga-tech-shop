import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

const projects = [
    {
        title: "Website Institut Agama Islam Darul Falah Bondowoso",
        description: "Website profil resmi dan Sistem Manajemen Konten (CMS) untuk Universitas Institut Agama Islam Darul Falah Bondowoso.",
        image: "/image/website_sekolah/oke.gif",
        link: "https://indafa.ac.id/",
        github: "https://github.com/prayoga23/website-indafa-cms",
        tags: ["Laravel", "PHP", "CMS"],
        category: "web",
    },
    {
        title: "Aplikasi Reading Log SMKN 3 Malang",
        description: "Aplikasi manajemen log bacaan siswa berbasis web untuk SMKN 3 Malang.",
        image: "/image/website_sekolah/website-sekolah.gif",
        link: "https://readinglogsmkn3malang.com/",
        tags: ["PHP Native", "HTML", "Javascript", "CSS"],
        category: "web",
    },
    {
        title: "Aplikasi Kasir Toko Tiga Putri Dewi",
        description: "Aplikasi kasir (POS) lengkap dengan manajemen stok inventaris, transaksi penjualan, dan laporan keuangan.",
        image: "/image/kasir/foto-slide.gif",
        tags: ["Laravel", "Tailwind CSS", "POS System"],
        category: "web",
    },
    {
        title: "Inventory Management System",
        description: "Aplikasi persediaan barang perusahaan dengan antarmuka modern, laporan stok real-time, dan ekspor data.",
        image: "/image/Frame-4.png",
        tags: ["Laravel", "Tailwind CSS", "Inventory"],
        category: "web",
    },
    {
        title: "Website Resmi HMI Unesa",
        description: "Website portal dan blog resmi Himpunan Mahasiswa Informatika yang dibangun dengan Laravel framework.",
        image: "/image/project-1.png",
        link: "http://hmi-unesa.my.id/",
        github: "https://github.com/prayoga23/website-laravel-hmi",
        tags: ["Laravel", "PHP", "Blog"],
        category: "web",
    },
    {
        title: "Aplikasi Messaging & To-Do Task Manager",
        description: "Aplikasi web interaktif untuk berkirim pesan dan mengelola tugas harian tim secara real-time.",
        image: "/image/Frame-9.png",
        link: "https://aplikasi-website-simple-quicks-pray.vercel.app/",
        github: "https://github.com/prayoga23/aplikasi_website_simple_quicks_Prayoga-Nugroho_Pangestu",
        tags: ["React.js", "Tailwind CSS", "Web App"],
        category: "web",
    },
    {
        title: "AHES Maps - AR Navigation Mobile App",
        description: "Aplikasi mobile pemandu jamaah haji berbasis AR Navigation (Augmented Reality) dan Peta Interaktif.",
        image: "/image/Frame-6.png",
        tags: ["Flutter", "AR Navigation", "Mobile App"],
        category: "applications",
    },
    {
        title: "Aplikasi E-Commerce & Marketplace Mobile",
        description: "Aplikasi Android/iOS belanja online dengan checkout otomatis, dompet digital, dan pelacakan kurir.",
        image: "/image/Frame-7.png",
        tags: ["Flutter", "Mobile App", "REST API"],
        category: "applications",
    },
    {
        title: "Dashboard Analytics & System Control Monitoring",
        description: "System control panel dan dashboard monitoring performa aplikasi secara real-time.",
        image: "/image/Frame-8.png",
        tags: ["React.js", "Dashboard", "Real-time"],
        category: "applications",
    },
    {
        title: "Aplikasi AI Job Matching Platform (UI/UX)",
        description: "Desain UI/UX aplikasi AI untuk mencocokkan talenta digital Indonesia dengan pasar kerja global.",
        image: "/image/Frame-5.png",
        figma: "https://www.figma.com/design/fEyBKEW8lIr6AXTSGURNQu/Design-Aplikasi-Platform-Jarak-Jauh-PIDI-2026?node-id=2-3&t=GvGbWJKHkVLqmTXL-1",
        tags: ["Figma", "UI/UX Design", "AI App"],
        category: "uiux",
    },
    {
        title: "Analisis Kepuasan Pelanggan (Tableau)",
        description: "Analisis mendalam kepuasan penumpang berbasis segmentasi demografi menggunakan Tableau Dashboard.",
        image: "/image/data_analyst/data-2.png",
        link: "https://public.tableau.com/app/profile/prayoga.nugroho.pangestu/vizzes",
        platform: "tableau",
        tags: ["Tableau", "Data Viz", "Analytics"],
        category: "data-analyst",
    },
    {
        title: "Website KPI Dashboard Using Laravel",
        description: "Website KPI Dashboard bisnis interaktif untuk memantau performa penjualan dan metrik utama perusahaan.",
        image: "/image/data_analyst/data-7.png",
        tags: ["Data Analyst", "Laravel", "Dashboard"],
        category: "data-analyst",
    },
];

export default function JasaPembuatan() {
    const { settings } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [previewIndex, setPreviewIndex] = useState(null);

    // Filter projects
    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    const whatsappNumber = settings?.whatsapp_number || '628990703408';

    return (
        <BuyerLayout>
            <Head title="Jasa Pembuatan Aplikasi Website & Android - Prayoga Tech" />

            <div className="bg-slate-50 text-slate-900 min-h-screen py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-3 max-w-3xl mx-auto">
                        <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200">
                            Portofolio & Konsultasi Software House
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
                            Jasa Pembuatan Aplikasi <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600">
                                Website & Android Custom
                            </span>
                        </h1>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            Jelajahi rekam jejak hasil pengerjaan proyek software house kami. Mulai dari sistem informasi perusahaan, aplikasi mobile Android, toko online, hingga desain UI/UX interaktif.
                        </p>
                    </div>

                    {/* Filter Category Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {[
                            { id: 'all', label: 'Semua Proyek', icon: 'fa-layer-group' },
                            { id: 'web', label: 'Website & Web App', icon: 'fa-globe' },
                            { id: 'applications', label: 'Aplikasi Android Mobile', icon: 'fa-mobile-screen-button' },
                            { id: 'uiux', label: 'UI/UX Design (Figma)', icon: 'fa-palette' },
                            { id: 'data-analyst', label: 'Dashboard Analytics', icon: 'fa-chart-pie' },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all border flex items-center gap-2 ${selectedCategory === cat.id
                                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-indigo-500 shadow-sm'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                <i className={`fa-solid ${cat.icon}`}></i>
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, idx) => (
                            <div
                                key={idx}
                                className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col hover:border-indigo-400 transition-all hover:-translate-y-1 group shadow-sm hover:shadow-md"
                            >
                                <div className="h-52 bg-slate-100 overflow-hidden relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 text-indigo-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-slate-100">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3 pt-1">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-2xs"
                                                >
                                                    Demo Live &rarr;
                                                </a>
                                            )}
                                            {project.figma && (
                                                <a
                                                    href={project.figma}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-2xs"
                                                >
                                                    Figma File &rarr;
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Custom Project CTA */}
                    <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 p-8 md:p-12 text-center space-y-6 shadow-xl">
                        <h2 className="text-2xl sm:text-3xl font-black text-white max-w-xl mx-auto">
                            Punya Kebutuhan Fitur Aplikasi Custom Sendiri?
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                            Kami siap membuatkan sistem khusus berbasis spesifikasi dan alur proses bisnis yang Anda minta. Konsultasikan bersama tim developer kami gratis!
                        </p>
                        <div className="pt-2">
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Prayoga Tech, saya ingin pesan pembuatan aplikasi custom.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-2xl shadow-xl transition-all inline-flex items-center gap-2"
                            >
                                <i className="fa-brands fa-whatsapp text-sm"></i>
                                <span>Chat Konsultasi WA Sekarang &rarr;</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </BuyerLayout>
    );
}
