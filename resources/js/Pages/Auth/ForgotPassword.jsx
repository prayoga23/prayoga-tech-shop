import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-extrabold text-slate-800">Lupa Kata Sandi?</h2>
                <p className="text-xs text-slate-400 mt-1">Masukkan alamat email Anda untuk menerima link reset</p>
            </div>

            <div className="mb-5 text-xs text-slate-500 leading-relaxed font-semibold">
                Lupa kata sandi Anda? Tidak masalah. Beritahukan alamat email Anda yang terdaftar, dan kami akan mengirimkan tautan reset kata sandi melalui email agar Anda dapat membuat kata sandi baru.
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="nama.email@gmail.com"
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-600 font-semibold" />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                    <Link
                        href={route('login')}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        Kembali ke Login
                    </Link>
                    <PrimaryButton className="py-2.5 text-xs uppercase font-bold" disabled={processing}>
                        Kirim Link Reset
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
