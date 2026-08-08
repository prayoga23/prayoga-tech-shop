<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->is_admin) {
            return $next($request);
        }

        if ($request->user()) {
            return redirect()->route('dashboard')->with('error', 'Akses ditolak. Halaman tersebut khusus untuk Administrator.');
        }

        return redirect()->route('login')->with('error', 'Silakan login terlebih dahulu sebagai Administrator.');
    }
}
