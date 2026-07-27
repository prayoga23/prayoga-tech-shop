import React from 'react';
import { Head } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <BuyerLayout>
            <Head title="Pengaturan Profil Saya" />

            <div className="py-12 max-w-5xl mx-auto px-6">
                {/* Profile Title Header */}
                <div className="mb-8 border-b border-slate-200 pb-5">
                    <h1 className="text-2xl font-black text-[#0B2545]">Profil Saya</h1>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">Perbarui informasi profil, ganti kata sandi, atau hapus akun Anda secara mandiri.</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
}
