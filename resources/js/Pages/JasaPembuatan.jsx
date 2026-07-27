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
        image: "/image/1. aplikasi-reading-log-smkn-3-malang.gif",
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
    {
        title: "Analisis Big Data & Data Mining Dataset Pelanggan",
        description: "Eksplorasi data pelanggan dan segmentasi pasar menggunakan Python, Pandas, dan Scikit-Learn.",
        image: "/image/data_analyst/data-4.png",
        link: "https://www.kaggle.com/code/prayoganp09/big-data-and-data-mining",
        platform: "kaggle",
        tags: ["Python", "Pandas", "Kaggle"],
        category: "data-analyst",
    },
    {
        title: "Analisis Kepuasan Penumpang Japan Airlines",
        description: "Analisis & visualisasi data kepuasan penumpang menggunakan Tableau Public.",
        image: "/image/data_analyst/data-1.png",
        link: "https://public.tableau.com/app/profile/prayoga.nugroho.pangestu/vizzes",
        platform: "tableau",
        tags: ["Tableau", "Analytics"],
        category: "data-analyst",
    },
    { title: "Poster Desain Grafis Promosi 1", image: "/image/poster/poster-1.jpg", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 2", image: "/image/poster/poster-2.jpg", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 3", image: "/image/poster/poster-3.jpg", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 4", image: "/image/poster/poster-4.jpg", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 5", image: "/image/poster/poster-5.png", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 6", image: "/image/poster/poster-6.jpg", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 7", image: "/image/poster/poster-7.png", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 8", image: "/image/poster/poster-8.png", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 9", image: "/image/poster/poster-9.png", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 10", image: "/image/poster/poster-11.jpg", category: "graphic" },
    { title: "Poster Desain Grafis Promosi 11", image: "/image/poster/poster-12.jpeg", category: "graphic" },
];

export default function JasaPembuatan() {
    const { settings } = usePage().props;
    const [activeCategory, setActiveCategory] = useState("all");
    const [showAll, setShowAll] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(null);

    const waNumber = settings?.whatsapp_number || '628123456789';

    const categories = [
        { key: "all", label: "Semua Portofolio" },
        { key: "web", label: "Website & CMS" },
        { key: "applications", label: "Aplikasi Mobile" },
        { key: "uiux", label: "Desain UI/UX" },
        { key: "data-analyst", label: "Data Analyst & KPI" },
        { key: "graphic", label: "Desain Grafis & Poster" },
    ];

    const filtered = activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    const visibleProjects = showAll ? filtered : filtered.slice(0, 8);

    const graphicProjects = filtered;

    const openPreview = (project) => {
        const idx = graphicProjects.findIndex((p) => p.image === project.image);
        if (idx !== -1) {
            setPreviewIndex(idx);
        }
    };

    const closePreview = () => setPreviewIndex(null);

    const handleNext = useCallback(() => {
        setPreviewIndex((prev) => (prev !== null ? (prev + 1) % graphicProjects.length : null));
    }, [graphicProjects.length]);

    const handlePrev = useCallback(() => {
        setPreviewIndex((prev) =>
            prev !== null ? (prev - 1 + graphicProjects.length) % graphicProjects.length : null
        );
    }, [graphicProjects.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (previewIndex === null) return;
            if (e.key === "Escape") closePreview();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        if (previewIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [previewIndex, handleNext, handlePrev]);

    const createWaUrl = (serviceName = 'Aplikasi Website / Mobile') => {
        const message = `Halo Admin, saya berminat untuk Konsultasi & Jasa Pembuatan ${serviceName}. Mohon info penawaran harga & estimasi waktu pengerjaan. Terima kasih!`;
        return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <BuyerLayout>
            <Head title="Jasa Pembuatan Aplikasi Website & Mobile Professional - Bergaransi" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-[#0B2545] via-[#13315C] to-[#1F4E79] text-white py-16 md:py-24 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-7 space-y-6 text-center md:text-left">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                Software House & Custom Digital Solution
                            </span>

                            <h1 className="text-3xl md:text-5xl font-black leading-tight text-white tracking-tight">
                                Jasa Pembuatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-indigo-200">Aplikasi Website & Mobile</span> Terpercaya
                            </h1>

                            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                                Kami melayani pembuatan sistem informasi perusahaan, website CMS, aplikasi Android/iOS, desain UI/UX, visualisasi Data Analyst (Tableau/Python), hingga desain grafis profesional dengan harga terjangkau dan garansi pengerjaan.
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                <a
                                    href={createWaUrl('Aplikasi Custom')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs md:text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.47 9.964-9.964.002-2.661-1.033-5.161-2.915-7.044C16.438 1.713 13.935.672 12 1.72c-2.661 0-5.162 1.033-7.045 2.915C3.072 6.518 2.03 9.02 2.03 11.68c-.002 1.729.547 3.42 1.587 4.908l-.997 3.642 3.72-.975z"/>
                                    </svg>
                                    Konsultasi Proyek Gratis
                                </a>

                                <a
                                    href="#portofolio-section"
                                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs md:text-sm rounded-xl border border-white/20 transition-all"
                                >
                                    Lihat Portofolio Kami
                                </a>
                            </div>

                            {/* Key Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center md:text-left">
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-amber-300">50+</h4>
                                    <p className="text-[11px] text-slate-300 font-medium">Proyek Selesai</p>
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-sky-300">100%</h4>
                                    <p className="text-[11px] text-slate-300 font-medium">Kode Clean & Garansi</p>
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-emerald-300">Fast</h4>
                                    <p className="text-[11px] text-slate-300 font-medium">Pengerjaan Tepat Waktu</p>
                                </div>
                            </div>
                        </div>

                        {/* Banner Card Right */}
                        <div className="md:col-span-5 relative flex justify-center">
                            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5 transform hover:scale-[1.02] transition-transform">
                                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white text-lg">
                                        &lt;/&gt;
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white text-sm">Layanan Software Custom</h3>
                                        <p className="text-xs text-slate-300">Solusi Teknologi Terintegrasi</p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-xs text-slate-200 font-medium">
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Website Profil Sekolah, Kampus & Perusahaan</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Sistem Kasir (POS), Inventory & ERP Business</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Aplikasi Mobile Android & iOS (Flutter / React Native)</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>UI/UX Design Figma Prototype & Redesign</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Data Analysis, Mining & Dashboard Tableau / Python</span>
                                    </div>
                                </div>

                                <a
                                    href={createWaUrl('Diskusi Proyek')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-white text-indigo-950 font-black text-xs rounded-xl hover:bg-slate-100 shadow-md block text-center transition-colors"
                                >
                                    Tanyakan Estimasi Harga
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE CATEGORIES HIGHLIGHT */}
            <section className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Layanan Unggulan</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2545] mt-1">Apa Yang Bisa Kami Buatkan Untuk Anda?</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Service 1 */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-extrabold text-base text-slate-800 mb-2">Pembuatan Website</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                Website profil kampus/sekolah, company profile, portal berita, CMS custom, hingga e-commerce berbasis Laravel & React.
                            </p>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-extrabold text-base text-slate-800 mb-2">Aplikasi Mobile Apps</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                Aplikasi Android & iOS cross-platform menggunakan Flutter. Lengkap dengan integrasi API, database, & AR Navigation.
                            </p>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-23" />
                                </svg>
                            </div>
                            <h3 className="font-extrabold text-base text-slate-800 mb-2">UI/UX & Graphic Design</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                Perancangan desain antarmuka aplikasi di Figma yang intuitif, user-friendly, responsive, serta pembuatan poster grafis.
                            </p>
                        </div>

                        {/* Service 4 */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="font-extrabold text-base text-slate-800 mb-2">Data Analyst & KPI</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                Visualisasi data bisnis, dashboard interaktif Tableau & Laravel KPI, analisis data mining Python, serta laporan analitik.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PORTOFOLIO SECTION */}
            <section id="portofolio-section" className="py-16 bg-slate-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Hasil Karya Real</span>
                        <h2 className="text-3xl font-extrabold text-[#0B2545] mt-1">Portofolio Proyek Terakhir</h2>
                        <p className="text-xs text-slate-500 mt-2 font-medium">
                            Beberapa contoh hasil pengerjaan aplikasi website, mobile, UI/UX, dan analitik data yang telah kami selesaikan.
                        </p>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => {
                                    setActiveCategory(cat.key);
                                    setShowAll(false);
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    activeCategory === cat.key
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {visibleProjects.map((project, idx) => {
                            const isGraphic = project.category === "graphic";

                            return (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        if (isGraphic) openPreview(project);
                                    }}
                                    className={`bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative ${
                                        isGraphic ? "cursor-pointer" : ""
                                    }`}
                                >
                                    {/* Project Image */}
                                    <div className="relative overflow-hidden aspect-video bg-slate-100 border-b border-slate-100">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />

                                        {isGraphic && (
                                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Preview Full
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="font-extrabold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                {project.title}
                                            </h3>
                                            {project.description && (
                                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                                                    {project.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Tags */}
                                        {project.tags && project.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {project.tags.map((tag, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Action Links */}
                                        {(project.link || project.github || project.figma) && (
                                            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs font-bold">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-[11px]"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.figma && (
                                                    <a
                                                        href={project.figma}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors text-[11px]"
                                                    >
                                                        Figma
                                                    </a>
                                                )}
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors text-[11px] ml-auto"
                                                    >
                                                        {project.category === "data-analyst" ? "Lihat Demo" : "Buka Website"} &rarr;
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View All Button */}
                    {filtered.length > 8 && (
                        <div className="text-center mt-10">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="px-8 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-indigo-900 font-extrabold text-xs rounded-xl shadow-sm transition-all"
                            >
                                {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua Portofolio (" + filtered.length + ")"}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-16 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Keunggulan Layanan Kami</span>
                            <h2 className="text-3xl font-extrabold text-[#0B2545]">Mengapa Memilih Jasa Pembuatan Aplikasi Kami?</h2>

                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold shrink-0 mt-1">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-slate-800 text-sm">Teknologi Modern & Fast Loading</h4>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                            Menggunakan framework populer seperti Laravel, React.js, Tailwind CSS, dan Flutter untuk memastikan kecepatan dan keamanan sistem terbaik.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold shrink-0 mt-1">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-slate-800 text-sm">Garansi Maintenance & Support</h4>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                            Kami memberikan jaminan garansi perbaikan bug dan bantuan teknis pasca pengerjaan aplikasi secara responsif.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold shrink-0 mt-1">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-slate-800 text-sm">Desain Custom Responsive</h4>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                            Tampilan aplikasi dibuat menyesuaikan identitas brand Anda dan nyaman diakses melalui smartphone, tablet, maupun laptop.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="bg-gradient-to-br from-[#0B2545] to-[#13315C] rounded-3xl p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
                            <div className="space-y-3">
                                <span className="px-3 py-1 bg-amber-400 text-[#0B2545] font-black text-[10px] rounded-full uppercase tracking-wider">
                                    Pesan Sekarang
                                </span>
                                <h3 className="text-2xl font-black leading-snug">Siap Membangun Aplikasi Impian Anda?</h3>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Diskusikan kebutuhan aplikasi atau sistem informasi bisnis Anda bersama tim kami. Kami siap memberikan penawaran harga terbaik!
                                </p>
                            </div>

                            <a
                                href={createWaUrl('Konsultasi Aplikasi Website / Mobile')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs md:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489.002 9.961-4.47 9.964-9.964.002-2.661-1.033-5.161-2.915-7.044C16.438 1.713 13.935.672 12 1.72c-2.661 0-5.162 1.033-7.045 2.915C3.072 6.518 2.03 9.02 2.03 11.68c-.002 1.729.547 3.42 1.587 4.908l-.997 3.642 3.72-.975z"/>
                                </svg>
                                Chat WhatsApp Admin Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIGHTBOX MODAL */}
            {previewIndex !== null && graphicProjects[previewIndex] && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
                    onClick={closePreview}
                >
                    <button
                        onClick={closePreview}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all border border-white/20 z-20"
                    >
                        ✕
                    </button>

                    <div className="absolute top-4 left-4 text-white z-20 flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-indigo-600 text-xs font-bold">
                            Preview Gambar ({previewIndex + 1} / {graphicProjects.length})
                        </span>
                    </div>

                    {graphicProjects.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                            className="absolute left-4 text-white/80 hover:text-white bg-white/10 hover:bg-indigo-600 p-3 rounded-full transition-all border border-white/20 z-20"
                        >
                            &larr;
                        </button>
                    )}

                    <div
                        className="relative max-w-4xl max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/60"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={graphicProjects[previewIndex].image}
                            alt={graphicProjects[previewIndex].title}
                            className="max-h-[85vh] max-w-full object-contain rounded-xl select-none"
                        />
                    </div>

                    {graphicProjects.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="absolute right-4 text-white/80 hover:text-white bg-white/10 hover:bg-indigo-600 p-3 rounded-full transition-all border border-white/20 z-20"
                        >
                            &rarr;
                        </button>
                    )}
                </div>
            )}
        </BuyerLayout>
    );
}
