import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun Baru" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-extrabold text-slate-800">Daftar Akun</h2>
                <p className="text-xs text-slate-400 mt-1">Buat akun untuk memesan & melacak akses aplikasi premium Anda</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        placeholder="Contoh: John Doe"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1.5 text-xs text-rose-605 text-rose-600 font-semibold" />
                </div>

                {/* Email Address */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        placeholder="nama.email@gmail.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-600 font-semibold" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        placeholder="Minimal 8 karakter"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-600 font-semibold" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        placeholder="Ulangi kata sandi"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs text-rose-600 font-semibold"
                    />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                    <PrimaryButton className="w-full py-3 text-xs uppercase font-bold" disabled={processing}>
                        Daftar Akun Baru
                    </PrimaryButton>
                </div>
            </form>

            {/* Login Link Banner */}
            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
                <p className="text-xs text-slate-500 font-semibold">
                    Sudah memiliki akun?{' '}
                    <Link
                        href={route('login')}
                        className="text-indigo-650 text-indigo-600 font-bold hover:text-indigo-850 underline transition-colors"
                    >
                        Masuk / Login
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
