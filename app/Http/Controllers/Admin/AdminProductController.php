<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::with(['category', 'packages'])->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function create(): Response
    {
        $categories = Category::orderBy('name', 'asc')->get();
        return Inertia::render('Admin/Products/CreateEdit', [
            'categories' => $categories,
            'isEdit' => false,
            'product' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:products,name',
            'badge' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:10240',
            'is_active' => 'required|boolean',
            'packages' => 'required|array|min:1',
            'packages.*.name' => 'required|string|max:255',
            'packages.*.price' => 'required|numeric|min:0',
            'packages.*.original_price' => 'nullable|numeric|min:0',
            'packages.*.duration_days' => 'required|integer|min:1',
            'packages.*.description' => 'nullable|string|max:255',
            'packages.*.is_active' => 'required|boolean',
        ]);

        DB::transaction(function () use ($request) {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('products', 'public');
            }

            $product = Product::create([
                'name' => $request->name,
                'badge' => $request->badge,
                'slug' => Str::slug($request->name),
                'category_id' => $request->category_id,
                'description' => $request->description,
                'image_path' => $imagePath,
                'is_active' => $request->is_active,
            ]);

            foreach ($request->packages as $pkg) {
                $product->packages()->create([
                    'name' => $pkg['name'],
                    'price' => $pkg['price'],
                    'original_price' => $pkg['original_price'] ?? null,
                    'duration_days' => $pkg['duration_days'],
                    'description' => $pkg['description'] ?? null,
                    'is_active' => $pkg['is_active'],
                ]);
            }
        });

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dibuat!');
    }

    public function edit(Product $product): Response
    {
        $product->load('packages');
        $categories = Category::orderBy('name', 'asc')->get();
        return Inertia::render('Admin/Products/CreateEdit', [
            'categories' => $categories,
            'isEdit' => true,
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:products,name,' . $product->id,
            'badge' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:10240',
            'is_active' => 'required|boolean',
            'packages' => 'required|array|min:1',
            'packages.*.id' => 'nullable|integer',
            'packages.*.name' => 'required|string|max:255',
            'packages.*.price' => 'required|numeric|min:0',
            'packages.*.original_price' => 'nullable|numeric|min:0',
            'packages.*.duration_days' => 'required|integer|min:1',
            'packages.*.description' => 'nullable|string|max:255',
            'packages.*.is_active' => 'required|boolean',
        ]);

        DB::transaction(function () use ($request, $product) {
            $data = [
                'name' => $request->name,
                'badge' => $request->badge,
                'slug' => Str::slug($request->name),
                'category_id' => $request->category_id,
                'description' => $request->description,
                'is_active' => $request->is_active,
            ];

            if ($request->hasFile('image')) {
                // Delete old image
                if ($product->image_path) {
                    Storage::disk('public')->delete($product->image_path);
                }
                $data['image_path'] = $request->file('image')->store('products', 'public');
            }

            $product->update($data);

            // Sync packages
            $requestPkgIds = collect($request->packages)->pluck('id')->filter()->all();
            
            // Delete packages not present in request
            $product->packages()->whereNotIn('id', $requestPkgIds)->delete();

            // Create or update packages
            foreach ($request->packages as $pkg) {
                if (isset($pkg['id']) && $pkg['id']) {
                    ProductPackage::where('id', $pkg['id'])->update([
                        'name' => $pkg['name'],
                        'price' => $pkg['price'],
                        'original_price' => $pkg['original_price'] ?? null,
                        'duration_days' => $pkg['duration_days'],
                        'description' => $pkg['description'] ?? null,
                        'is_active' => $pkg['is_active'],
                    ]);
                } else {
                    $product->packages()->create([
                        'name' => $pkg['name'],
                        'price' => $pkg['price'],
                        'original_price' => $pkg['original_price'] ?? null,
                        'duration_days' => $pkg['duration_days'],
                        'description' => $pkg['description'] ?? null,
                        'is_active' => $pkg['is_active'],
                    ]);
                }
            }
        });

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui!');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }
        
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus!');
    }
}
