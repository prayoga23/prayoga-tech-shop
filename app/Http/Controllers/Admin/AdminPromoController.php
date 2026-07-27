<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPromoController extends Controller
{
    public function index(): Response
    {
        $promos = Promo::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Promos', [
            'promos' => $promos
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:50|unique:promos,code',
            'type' => 'required|string|in:fixed,percentage',
            'value' => 'required|integer|min:1',
            'min_purchase' => 'required|integer|min:0',
            'max_discount' => 'nullable|integer|min:0',
            'is_active' => 'required|boolean',
            'expires_at' => 'nullable|date_format:Y-m-d',
        ]);

        // Force code to be uppercase
        $code = strtoupper(trim($request->code));

        Promo::create([
            'code' => $code,
            'type' => $request->type,
            'value' => $request->value,
            'min_purchase' => $request->min_purchase,
            'max_discount' => $request->max_discount,
            'is_active' => $request->is_active,
            'expires_at' => $request->expires_at,
        ]);

        return redirect()->back()->with('success', 'Kupon diskon berhasil ditambahkan!');
    }

    public function update(Request $request, Promo $promo)
    {
        $request->validate([
            'code' => 'required|string|max:50|unique:promos,code,' . $promo->id,
            'type' => 'required|string|in:fixed,percentage',
            'value' => 'required|integer|min:1',
            'min_purchase' => 'required|integer|min:0',
            'max_discount' => 'nullable|integer|min:0',
            'is_active' => 'required|boolean',
            'expires_at' => 'nullable|date_format:Y-m-d',
        ]);

        // Force code to be uppercase
        $code = strtoupper(trim($request->code));

        $promo->update([
            'code' => $code,
            'type' => $request->type,
            'value' => $request->value,
            'min_purchase' => $request->min_purchase,
            'max_discount' => $request->max_discount,
            'is_active' => $request->is_active,
            'expires_at' => $request->expires_at,
        ]);

        return redirect()->back()->with('success', 'Kupon diskon berhasil diperbarui!');
    }

    public function destroy(Promo $promo)
    {
        $promo->delete();

        return redirect()->back()->with('success', 'Kupon diskon berhasil dihapus!');
    }
}
