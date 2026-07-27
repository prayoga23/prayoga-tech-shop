<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::withCount('orders')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }
}
