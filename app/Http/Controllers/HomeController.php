<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $categorySlug = $request->input('category');

        $productsQuery = Product::with(['category', 'packages'])
            ->where('is_active', true);

        if ($search) {
            $productsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        if ($categorySlug) {
            $productsQuery->whereHas('category', function ($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            });
        }

        // Get products and filter out ones that don't have any packages
        $products = $productsQuery->get()->filter(function ($product) {
            return $product->packages->count() > 0;
        })->values();

        $banners = \App\Models\Banner::where('is_active', true)
            ->orderBy('order_index', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Welcome', [
            'products' => $products,
            'categories' => Category::all(),
            'selectedCategory' => $categorySlug,
            'search' => $search,
            'banners' => $banners,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function katalog(Request $request): Response
    {
        $search = $request->input('search');
        $selectedCategories = $request->input('categories', []); // expected array
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $sort = $request->input('sort', 'name_asc');

        $productsQuery = Product::with(['category', 'packages'])
            ->where('is_active', true);

        if ($search) {
            $productsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        if (!empty($selectedCategories)) {
            $productsQuery->whereIn('category_id', $selectedCategories);
        }

        if ($minPrice || $maxPrice) {
            $productsQuery->whereHas('packages', function ($query) use ($minPrice, $maxPrice) {
                if ($minPrice) {
                    $query->where('price', '>=', $minPrice);
                }
                if ($maxPrice) {
                    $query->where('price', '<=', $maxPrice);
                }
            });
        }

        $products = $productsQuery->get()->filter(function ($product) {
            return $product->packages->count() > 0;
        });

        if ($sort === 'price_asc') {
            $products = $products->sortBy('min_price');
        } elseif ($sort === 'price_desc') {
            $products = $products->sortByDesc('min_price');
        } elseif ($sort === 'name_desc') {
            $products = $products->sortByDesc('name');
        } else {
            $products = $products->sortBy('name');
        }

        $products = $products->values();

        return Inertia::render('Catalog', [
            'products' => $products,
            'categories' => Category::all(),
            'filters' => [
                'search' => $search,
                'categories' => $selectedCategories,
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
                'sort' => $sort,
            ]
        ]);
    }

    public function caraPemesanan(): Response
    {
        return Inertia::render('CaraPemesanan');
    }

    public function tentangKami(): Response
    {
        return Inertia::render('TentangKami');
    }

    public function hubungiKami(): Response
    {
        return Inertia::render('HubungiKami');
    }

    public function syaratKetentuan(): Response
    {
        return Inertia::render('SyaratKetentuan');
    }

    public function kebijakanPrivasi(): Response
    {
        return Inertia::render('KebijakanPrivasi');
    }

    public function jasaPembuatan(): Response
    {
        return Inertia::render('JasaPembuatan');
    }

    public function cart(): Response
    {
        $products = Product::with(['category', 'packages'])
            ->where('is_active', true)
            ->get()
            ->filter(function ($p) {
                return $p->packages->count() > 0;
            })
            ->values();

        return Inertia::render('Cart', [
            'products' => $products,
            'paymentMethods' => \App\Models\PaymentMethod::where('is_active', true)->get()
        ]);
    }

    public function wishlist(): Response
    {
        $products = Product::with(['category', 'packages'])
            ->where('is_active', true)
            ->get()
            ->filter(function ($p) {
                return $p->packages->count() > 0;
            })
            ->values();

        return Inertia::render('Wishlist', [
            'products' => $products
        ]);
    }
}
