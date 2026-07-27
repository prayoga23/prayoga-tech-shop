<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminPaymentMethodController extends Controller
{
    public function index(): Response
    {
        $paymentMethods = PaymentMethod::orderBy('name', 'asc')->get();
        return Inertia::render('Admin/PaymentMethods', [
            'paymentMethods' => $paymentMethods
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'instructions' => 'nullable|string',
            'qr_code' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:10240',
            'is_active' => 'required|boolean',
        ]);

        $qrPath = null;
        if ($request->hasFile('qr_code')) {
            $qrPath = $request->file('qr_code')->store('qr_codes', 'public');
        }

        PaymentMethod::create([
            'name' => $request->name,
            'account_number' => $request->account_number,
            'account_name' => $request->account_name,
            'instructions' => $request->instructions,
            'qr_code_path' => $qrPath,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('admin.payment-methods.index')->with('success', 'Metode pembayaran berhasil ditambahkan!');
    }

    public function update(Request $request, PaymentMethod $paymentMethod): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'instructions' => 'nullable|string',
            'qr_code' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:10240',
            'is_active' => 'required|boolean',
        ]);

        $data = [
            'name' => $request->name,
            'account_number' => $request->account_number,
            'account_name' => $request->account_name,
            'instructions' => $request->instructions,
            'is_active' => $request->is_active,
        ];

        if ($request->hasFile('qr_code')) {
            // Delete old QR code
            if ($paymentMethod->qr_code_path) {
                Storage::disk('public')->delete($paymentMethod->qr_code_path);
            }
            $data['qr_code_path'] = $request->file('qr_code')->store('qr_codes', 'public');
        }

        $paymentMethod->update($data);

        return redirect()->route('admin.payment-methods.index')->with('success', 'Metode pembayaran berhasil diperbarui!');
    }

    public function destroy(PaymentMethod $paymentMethod): RedirectResponse
    {
        // Delete QR code file
        if ($paymentMethod->qr_code_path) {
            Storage::disk('public')->delete($paymentMethod->qr_code_path);
        }

        $paymentMethod->delete();

        return redirect()->route('admin.payment-methods.index')->with('success', 'Metode pembayaran berhasil dihapus!');
    }
}
