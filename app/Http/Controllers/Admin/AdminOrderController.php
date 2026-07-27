<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminOrderController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->input('status');
        $search = $request->input('search');

        $ordersQuery = Order::with(['productPackage.product', 'paymentMethod'])
            ->orderBy('created_at', 'desc');

        if ($status && $status !== 'all') {
            $ordersQuery->where('status', $status);
        }

        if ($search) {
            $ordersQuery->where(function ($query) use ($search) {
                $query->where('order_number', 'like', '%' . $search . '%')
                    ->orWhere('customer_name', 'like', '%' . $search . '%')
                    ->orWhere('customer_email', 'like', '%' . $search . '%');
            });
        }

        $orders = $ordersQuery->get();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'selectedStatus' => $status ?? 'all',
            'search' => $search ?? '',
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load(['productPackage.product', 'paymentMethod', 'user']);
        
        $groupOrders = [];
        if ($order->checkout_token) {
            $groupOrders = Order::with(['productPackage.product'])
                ->where('checkout_token', $order->checkout_token)
                ->get();
        }

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
            'groupOrders' => $groupOrders
        ]);
    }

    public function confirmPayment(Order $order): RedirectResponse
    {
        if ($order->status !== 'pending' && $order->status !== 'paid') {
            return redirect()->back()->with('error', 'Status pesanan tidak dapat dikonfirmasi.');
        }

        if ($order->checkout_token) {
            Order::where('checkout_token', $order->checkout_token)
                ->whereIn('status', ['pending', 'paid'])
                ->update(['status' => 'paid']);
        } else {
            $order->update(['status' => 'paid']);
        }

        return redirect()->back()->with('success', 'Pembayaran berhasil dikonfirmasi! Silakan kirim kredensial untuk menyelesaikan.');
    }

    public function deliverCredentials(Request $request, Order $order): RedirectResponse
    {
        $request->validate([
            'credentials_sent' => 'required|string',
        ]);

        if ($order->status === 'completed' || $order->status === 'cancelled') {
            return redirect()->back()->with('error', 'Status pesanan tidak mendukung pengiriman akses.');
        }

        $order->update([
            'credentials_sent' => $request->credentials_sent,
            'status' => 'completed',
        ]);

        return redirect()->back()->with('success', 'Akses akun premium berhasil dikirimkan ke pembeli!');
    }

    public function cancel(Order $order): RedirectResponse
    {
        if ($order->status === 'completed' || $order->status === 'cancelled') {
            return redirect()->back()->with('error', 'Pesanan yang sudah selesai atau dibatalkan tidak bisa diubah lagi.');
        }

        $order->update(['status' => 'cancelled']);

        return redirect()->back()->with('success', 'Pesanan berhasil dibatalkan.');
    }
}
