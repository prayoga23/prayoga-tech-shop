<?php

use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminPaymentMethodController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminBannerController;
use App\Http\Controllers\Admin\AdminPromoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// --- BUYER / PUBLIC ROUTES ---
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');
Route::get('/katalog', [HomeController::class, 'katalog'])->name('katalog');
Route::get('/cara-pemesanan', [HomeController::class, 'caraPemesanan'])->name('cara-pemesanan');
Route::get('/tentang-kami', [HomeController::class, 'tentangKami'])->name('tentang-kami');
Route::get('/hubungi-kami', [HomeController::class, 'hubungiKami'])->name('hubungi-kami');
Route::get('/syarat-ketentuan', [HomeController::class, 'syaratKetentuan'])->name('syarat-ketentuan');
Route::get('/kebijakan-privasi', [HomeController::class, 'kebijakanPrivasi'])->name('kebijakan-privasi');
Route::get('/jasa-pembuatan', [HomeController::class, 'jasaPembuatan'])->name('jasa-pembuatan');
Route::get('/keranjang', [HomeController::class, 'cart'])->name('cart.index');
Route::get('/wishlist', [HomeController::class, 'wishlist'])->name('wishlist.index');

// --- BUYER / AUTHENTICATED ROUTES ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/checkout', [OrderController::class, 'store'])->name('order.store');
    Route::post('/checkout-cart', [OrderController::class, 'checkoutCart'])->name('order.checkout-cart');
    Route::post('/promo/validate', [OrderController::class, 'validatePromo'])->name('promo.validate');
    Route::get('/order/{order_number}', [OrderController::class, 'show'])->name('order.show');
    Route::post('/order/{order_number}/upload-proof', [OrderController::class, 'uploadProof'])->name('order.upload-proof');
    Route::get('/dashboard', [OrderController::class, 'dashboard'])->name('dashboard');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- ADMIN PANEL ROUTES ---
Route::middleware(['auth', 'verified', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Banners CRUD
    Route::get('/banners', [AdminBannerController::class, 'index'])->name('banners.index');
    Route::post('/banners', [AdminBannerController::class, 'store'])->name('banners.store');
    Route::post('/banners/{banner}', [AdminBannerController::class, 'update'])->name('banners.update');
    Route::delete('/banners/{banner}', [AdminBannerController::class, 'destroy'])->name('banners.destroy');

    // Promos CRUD
    Route::get('/promos', [AdminPromoController::class, 'index'])->name('promos.index');
    Route::post('/promos', [AdminPromoController::class, 'store'])->name('promos.store');
    Route::patch('/promos/{promo}', [AdminPromoController::class, 'update'])->name('promos.update');
    Route::delete('/promos/{promo}', [AdminPromoController::class, 'destroy'])->name('promos.destroy');
    
    // Categories CRUD
    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{category}', [AdminCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy'])->name('categories.destroy');

    // Payment Methods CRUD
    Route::get('/payment-methods', [AdminPaymentMethodController::class, 'index'])->name('payment-methods.index');
    Route::post('/payment-methods', [AdminPaymentMethodController::class, 'store'])->name('payment-methods.store');
    Route::post('/payment-methods/{paymentMethod}', [AdminPaymentMethodController::class, 'update'])->name('payment-methods.update'); // Using POST for file upload updates
    Route::delete('/payment-methods/{paymentMethod}', [AdminPaymentMethodController::class, 'destroy'])->name('payment-methods.destroy');

    // Products & Packages CRUD
    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [AdminProductController::class, 'create'])->name('products.create');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [AdminProductController::class, 'edit'])->name('products.edit');
    Route::post('/products/{product}', [AdminProductController::class, 'update'])->name('products.update'); // Using POST for file upload updates
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');

    // Orders Management
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/confirm', [AdminOrderController::class, 'confirmPayment'])->name('orders.confirm');
    Route::patch('/orders/{order}/deliver', [AdminOrderController::class, 'deliverCredentials'])->name('orders.deliver');
    Route::patch('/orders/{order}/cancel', [AdminOrderController::class, 'cancel'])->name('orders.cancel');

    // Users Management
    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');

    // Settings Management
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
});

require __DIR__.'/auth.php';
