<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $totalRevenue = Order::where('status', 'completed')->sum('price');
        $totalOrdersCount = Order::count();
        $pendingOrdersCount = Order::where('status', 'pending')->count();
        $paidOrdersCount = Order::where('status', 'paid')->count();
        $totalProductsCount = Product::count();
        $totalUsersCount = User::where('is_admin', false)->count();

        $recentOrders = Order::with(['productPackage.product', 'paymentMethod'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get monthly earnings for the current year
        $completedOrdersThisYear = Order::where('status', 'completed')
            ->whereYear('created_at', date('Y'))
            ->get();

        $monthlyEarnings = [];
        foreach ($completedOrdersThisYear as $order) {
            $month = $order->created_at->format('m');
            $monthlyEarnings[$month] = ($monthlyEarnings[$month] ?? 0) + $order->price;
        }

        // Format to 12 months array
        $earningsChartData = [];
        $months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        
        foreach ($months as $index => $month) {
            $earningsChartData[] = [
                'name' => $monthNames[$index],
                'total' => (int) ($monthlyEarnings[$month] ?? 0)
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_revenue' => (int) $totalRevenue,
                'total_orders' => $totalOrdersCount,
                'pending_orders' => $pendingOrdersCount,
                'paid_orders' => $paidOrdersCount,
                'total_products' => $totalProductsCount,
                'total_users' => $totalUsersCount,
            ],
            'recentOrders' => $recentOrders,
            'earningsChartData' => $earningsChartData,
        ]);
    }
}
