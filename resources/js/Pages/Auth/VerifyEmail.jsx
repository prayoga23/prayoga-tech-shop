import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Alamat Email" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-extrabold text-slate-800">Verifikasi Email</h2>
                <p className="text-xs text-slate-400 mt-1">Harap verifikasi email Anda untuk melanjutkan belanja</p>
            </div>

            <div className="mb-5 text-xs text-slate-500 leading-relaxed font-semibold">
                Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan ke email Anda. Jika Anda tidak menerima email tersebut, kami dengan senang hati akan mengirimkan ulang tautan baru.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda daftarkan.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between gap-4">
                    <PrimaryButton className="py-2.5 text-[10px] uppercase font-bold" disabled={processing}>
                        Kirim Ulang Email Verifikasi
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors"
                    >
                        Keluar Akun
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
