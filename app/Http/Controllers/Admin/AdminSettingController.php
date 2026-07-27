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
        ]);

        Setting::set('store_name', $request->store_name);
        Setting::set('store_description', $request->store_description);
        Setting::set('whatsapp_number', $request->whatsapp_number);
        Setting::set('social_instagram', $request->social_instagram ?: '#');
        Setting::set('social_tiktok', $request->social_tiktok ?: '#');
        Setting::set('social_x', $request->social_x ?: '#');

        if ($request->hasFile('store_logo')) {
            $oldLogo = Setting::get('store_logo_path');
            if ($oldLogo) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldLogo);
            }
            $path = $request->file('store_logo')->store('settings', 'public');
            Setting::set('store_logo_path', $path);
        }

        return redirect()->route('admin.settings.index')->with('success', 'Pengaturan toko berhasil diperbarui!');
    }
}
