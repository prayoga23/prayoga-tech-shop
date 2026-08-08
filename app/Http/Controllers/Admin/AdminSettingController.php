<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSettingController extends Controller
{
    public function index(): Response
    {
        $settings = [
            'store_name' => Setting::get('store_name', 'Prayoga Tech'),
            'store_description' => Setting::get('store_description', 'Penyedia Layanan Jasa Pembuatan Aplikasi & Akun Premium Terpercaya'),
            'whatsapp_number' => Setting::get('whatsapp_number', '628123456789'),
            'store_logo_path' => Setting::get('store_logo_path'),
            'social_instagram' => Setting::get('social_instagram', '#'),
            'social_tiktok' => Setting::get('social_tiktok', '#'),
            'social_x' => Setting::get('social_x', '#'),
            'admin_email' => Setting::get('admin_email', config('mail.admin_email', 'prayoga2np@gmail.com')),
            'wa_notification_enabled' => Setting::get('wa_notification_enabled', env('WA_NOTIFICATION_ENABLED', 'false')),
            'wa_meta_business_token' => Setting::get('wa_meta_business_token', env('WA_META_BUSINESS_TOKEN', '')),
            'wa_meta_phone_number_id' => Setting::get('wa_meta_phone_number_id', env('WA_META_PHONE_NUMBER_ID', '')),
            'wa_notification_recipient' => Setting::get('wa_notification_recipient', env('WA_NOTIFICATION_RECIPIENT', '628123456789')),
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'store_name' => 'required|string|max:255',
            'store_description' => 'required|string|max:1000',
            'whatsapp_number' => 'required|string|max:30',
            'store_logo' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:10240',
            'social_instagram' => 'nullable|string|max:255',
            'social_tiktok' => 'nullable|string|max:255',
            'social_x' => 'nullable|string|max:255',
            'admin_email' => 'required|email|max:255',
            'wa_notification_enabled' => 'nullable|in:true,false,1,0',
            'wa_meta_business_token' => 'nullable|string',
            'wa_meta_phone_number_id' => 'nullable|string',
            'wa_notification_recipient' => 'nullable|string|max:30',
        ]);

        Setting::set('store_name', $request->store_name);
        Setting::set('store_description', $request->store_description);
        Setting::set('whatsapp_number', $request->whatsapp_number);
        Setting::set('social_instagram', $request->social_instagram ?: '#');
        Setting::set('social_tiktok', $request->social_tiktok ?: '#');
        Setting::set('social_x', $request->social_x ?: '#');
        Setting::set('admin_email', $request->admin_email);
        Setting::set('wa_notification_enabled', $request->boolean('wa_notification_enabled') ? 'true' : 'false');
        Setting::set('wa_meta_business_token', $request->wa_meta_business_token ?: '');
        Setting::set('wa_meta_phone_number_id', $request->wa_meta_phone_number_id ?: '');
        Setting::set('wa_notification_recipient', $request->wa_notification_recipient ?: '');

        if ($request->hasFile('store_logo')) {
            $oldLogo = Setting::get('store_logo_path');
            if ($oldLogo) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldLogo);
            }
            $path = $request->file('store_logo')->store('settings', 'public');
            Setting::set('store_logo_path', $path);
        }

        return redirect()->route('admin.settings.index')->with('success', 'Pengaturan toko & notifikasi berhasil diperbarui!');
    }

    public function testEmail(Request $request): RedirectResponse
    {
        $adminEmail = Setting::get('admin_email', config('mail.admin_email', 'prayoga2np@gmail.com'));
        $dummyOrder = \App\Models\Order::with(['productPackage.product', 'paymentMethod'])->latest()->first();

        if (!$dummyOrder) {
            $dummyOrder = new \App\Models\Order([
                'order_number' => 'TEST-' . strtoupper(\Illuminate\Support\Str::random(6)),
                'customer_name' => 'John Doe (Test)',
                'customer_email' => 'customer.test@example.com',
                'customer_whatsapp' => '6281234567890',
                'price' => 150000,
                'status' => 'paid',
            ]);
        }

        try {
            \Illuminate\Support\Facades\Mail::to($adminEmail)->send(new \App\Mail\PaymentProofUploadedMail($dummyOrder));
            return redirect()->back()->with('success', "Email uji coba berhasil dikirim ke {$adminEmail} via SMTP!");
        } catch (\Throwable $e) {
            return redirect()->back()->with('error', "Gagal mengirim email uji coba: " . $e->getMessage());
        }
    }
}
