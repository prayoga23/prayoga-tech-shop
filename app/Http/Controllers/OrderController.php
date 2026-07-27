<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ProductPackage;
use App\Models\Promo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_whatsapp' => 'required|string|max:30',
            'product_package_id' => 'required|exists:product_packages,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'promo_code' => 'nullable|string|max:50',
        ]);

        $package = ProductPackage::findOrFail($request->product_package_id);

        $discountAmount = 0;
        $promoCode = null;

        if ($request->promo_code) {
            $promo = Promo::where('code', strtoupper(trim($request->promo_code)))->first();
            if ($promo && $promo->isValid() && $package->price >= $promo->min_purchase) {
                $promoCode = $promo->code;
                $discountAmount = $promo->calculateDiscount($package->price);
            }
        }

        $orderNumber = 'INV-' . date('Ymd') . '-' . strtoupper(Str::random(6));

        $order = Order::create([
            'order_number' => $orderNumber,
            'user_id' => auth()->id(),
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_whatsapp' => $request->customer_whatsapp,
            'product_package_id' => $package->id,
            'payment_method_id' => $request->payment_method_id,
            'price' => $package->price,
            'promo_code' => $promoCode,
            'discount_amount' => $discountAmount,
            'status' => 'pending',
        ]);

        return redirect()->route('order.show', $order->order_number)
            ->with('success', 'Pesanan berhasil dibuat! Silakan lakukan pembayaran.');
    }

    public function show(string $orderNumber): Response
    {
        $order = Order::with(['productPackage.product', 'paymentMethod'])
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        if ($order->user_id !== auth()->id() && (!auth()->user() || !auth()->user()->is_admin)) {
            abort(403, 'Anda tidak memiliki akses ke invoice ini.');
        }

        $groupOrders = [];
        if ($order->checkout_token) {
            $groupOrders = Order::with(['productPackage.product'])
                ->where('checkout_token', $order->checkout_token)
                ->get();
        }

        return Inertia::render('Order/Show', [
            'order' => $order,
            'groupOrders' => $groupOrders,
        ]);
    }

    public function uploadProof(Request $request, string $orderNumber): RedirectResponse
    {
        $request->validate([
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg|max:4096',
        ]);

        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        if ($order->user_id !== auth()->id() && (!auth()->user() || !auth()->user()->is_admin)) {
            abort(403, 'Anda tidak memiliki akses ke invoice ini.');
        }

        if ($order->status !== 'pending') {
            return redirect()->back()->with('error', 'Status pesanan tidak mendukung upload bukti pembayaran saat ini.');
        }

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');

            if ($order->checkout_token) {
                $siblingOrders = Order::where('checkout_token', $order->checkout_token)->get();
                foreach ($siblingOrders as $sib) {
                    if ($sib->payment_proof_path) {
                        Storage::disk('public')->delete($sib->payment_proof_path);
                    }
                    $sib->update([
                        'payment_proof_path' => $path,
                        'status' => 'paid',
                    ]);
                }
            } else {
                if ($order->payment_proof_path) {
                    Storage::disk('public')->delete($order->payment_proof_path);
                }
                $order->update([
                    'payment_proof_path' => $path,
                    'status' => 'paid',
                ]);
            }

            return redirect()->back()->with('success', 'Bukti transfer berhasil diunggah! Menunggu konfirmasi admin.');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah file bukti transfer.');
    }

    public function checkoutCart(Request $request): RedirectResponse
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_whatsapp' => 'required|string|max:30',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'promo_code' => 'nullable|string|max:50',
            'items' => 'required|array|min:1',
            'items.*.package_id' => 'required|exists:product_packages,id',
            'items.*.quantity' => 'required|integer|min:1|max:10',
        ]);

        $checkoutToken = 'CART-' . strtoupper(Str::random(10));
        
        // Calculate raw cart total and gather items
        $cartTotal = 0;
        $itemsList = [];
        foreach ($request->items as $item) {
            $package = ProductPackage::findOrFail($item['package_id']);
            $cartTotal += $package->price * $item['quantity'];
            
            for ($i = 0; $i < $item['quantity']; $i++) {
                $itemsList[] = $package;
            }
        }

        $discountAmount = 0;
        $promoCode = null;

        if ($request->promo_code) {
            $promo = Promo::where('code', strtoupper(trim($request->promo_code)))->first();
            if ($promo && $promo->isValid() && $cartTotal >= $promo->min_purchase) {
                $promoCode = $promo->code;
                $discountAmount = $promo->calculateDiscount($cartTotal);
            }
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($request, $checkoutToken, $promoCode, $discountAmount, $cartTotal, $itemsList) {
            $remainingDiscount = $discountAmount;
            $count = count($itemsList);
            
            foreach ($itemsList as $index => $package) {
                $orderNumber = 'INV-' . date('Ymd') . '-' . strtoupper(Str::random(6));
                
                // Distribute discount proportionally, remainder to last item
                if ($index === $count - 1) {
                    $itemDiscount = $remainingDiscount;
                } else {
                    $itemDiscount = (int) (($package->price / $cartTotal) * $discountAmount);
                    $remainingDiscount -= $itemDiscount;
                }

                Order::create([
                    'order_number' => $orderNumber,
                    'user_id' => auth()->id(),
                    'customer_name' => $request->customer_name,
                    'customer_email' => $request->customer_email,
                    'customer_whatsapp' => $request->customer_whatsapp,
                    'product_package_id' => $package->id,
                    'payment_method_id' => $request->payment_method_id,
                    'checkout_token' => $checkoutToken,
                    'price' => $package->price,
                    'promo_code' => $promoCode,
                    'discount_amount' => $itemDiscount,
                    'status' => 'pending',
                ]);
            }
        });

        $firstOrder = Order::where('checkout_token', $checkoutToken)->first();

        if ($firstOrder) {
            return redirect()->route('order.show', $firstOrder->order_number)
                ->with('success', 'Keranjang belanja berhasil di-checkout! Silakan lakukan pembayaran.');
        }

        return redirect()->route('dashboard')
            ->with('success', 'Keranjang belanja berhasil di-checkout!');
    }

    public function validatePromo(Request $request): JsonResponse
    {
        $request->validate([
            'code' => 'required|string',
            'total' => 'required|integer|min:0',
        ]);

        $promo = Promo::where('code', strtoupper(trim($request->code)))->first();

        if (!$promo) {
            return response()->json([
                'valid' => false,
                'message' => 'Kode kupon tidak ditemukan.',
            ]);
        }

        if (!$promo->isValid()) {
            return response()->json([
                'valid' => false,
                'message' => 'Kode kupon sudah tidak aktif atau kadaluwarsa.',
            ]);
        }

        if ($request->total < $promo->min_purchase) {
            return response()->json([
                'valid' => false,
                'message' => 'Minimum belanja untuk kupon ini adalah Rp ' . number_format($promo->min_purchase, 0, ',', '.'),
            ]);
        }

        $discount = $promo->calculateDiscount($request->total);

        return response()->json([
            'valid' => true,
            'code' => $promo->code,
            'type' => $promo->type,
            'value' => $promo->value,
            'discount' => $discount,
            'message' => 'Kupon diskon berhasil dipasang!',
        ]);
    }

    public function dashboard(): Response
    {
        $orders = Order::with(['productPackage.product', 'paymentMethod'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard', [
            'orders' => $orders,
        ]);
    }
}
