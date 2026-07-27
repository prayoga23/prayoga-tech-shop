import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke Akun" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-extrabold text-slate-800">Masuk Dashboard</h2>
                <p className="text-xs text-slate-400 mt-1">Silakan masuk menggunakan email terdaftar Anda</p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Email Address */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="nama.email@gmail.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-600 font-semibold" />
                </div>

                {/* Password */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-slate-500 uppercase tracking-wider" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[11px] text-indigo-600 hover:text-indigo-850 font-bold transition-colors"
                            >
                                Lupa Kata Sandi?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-600 font-semibold" />
                </div>

                {/* Remember Me */}
                <div className="block pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-xs font-semibold text-slate-500">
                            Ingat saya di perangkat ini
                        </span>
                    </label>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                    <PrimaryButton className="w-full py-3 text-xs uppercase font-bold" disabled={processing}>
                        Masuk Sekarang
                    </PrimaryButton>
                </div>
            </form>

            {/* Registration Banner */}
            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
                <p className="text-xs text-slate-500 font-semibold">
                    Belum memiliki akun?{' '}
                    <Link
                        href={route('register')}
                        className="text-indigo-650 text-indigo-600 font-bold hover:text-indigo-850 underline transition-colors"
                    >
                        Daftar Akun Baru
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
