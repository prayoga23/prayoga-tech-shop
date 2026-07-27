import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Kata Sandi" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-extrabold text-slate-800">Konfirmasi Akses</h2>
                <p className="text-xs text-slate-400 mt-1">Konfirmasikan kata sandi Anda demi keamanan</p>
            </div>

            <div className="mb-5 text-xs text-slate-500 leading-relaxed font-semibold">
                Ini adalah area aplikasi yang aman. Silakan konfirmasikan kata sandi Anda terlebih dahulu sebelum melanjutkan akses.
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Anda" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-600 font-semibold" />
                </div>

                <div className="pt-2 flex justify-end">
                    <PrimaryButton className="py-2.5 text-xs uppercase font-bold" disabled={processing}>
                        Konfirmasi Kata Sandi
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
