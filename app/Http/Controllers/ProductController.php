<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function show(string $slug): Response
    {
        $product = Product::with([
            'category',
            'packages' => function ($query) {
                $query->where('is_active', true)->orderBy('price', 'asc');
            }
        ])
        ->where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();

        $paymentMethods = PaymentMethod::where('is_active', true)->get();

        return Inertia::render('Product/Show', [
            'product' => $product,
            'paymentMethods' => $paymentMethods,
        ]);
    }
}
