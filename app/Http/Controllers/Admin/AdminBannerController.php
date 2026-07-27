<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminBannerController extends Controller
{
    public function index(): Response
    {
        $banners = Banner::orderBy('type', 'asc')
            ->orderBy('order_index', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Banners', [
            'banners' => $banners
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|max:4096',
            'type' => 'required|string|in:carousel,middle',
            'link_url' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
            'order_index' => 'required|integer',
        ]);

        $imagePath = $request->file('image')->store('banners', 'public');

        Banner::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'image_path' => $imagePath,
            'type' => $request->type,
            'link_url' => $request->link_url,
            'is_active' => $request->is_active,
            'order_index' => $request->order_index,
        ]);

        return redirect()->back()->with('success', 'Banner promosi berhasil ditambahkan!');
    }

    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:4096',
            'type' => 'required|string|in:carousel,middle',
            'link_url' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
            'order_index' => 'required|integer',
        ]);

        $data = [
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'type' => $request->type,
            'link_url' => $request->link_url,
            'is_active' => $request->is_active,
            'order_index' => $request->order_index,
        ];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($banner->image_path) {
                Storage::disk('public')->delete($banner->image_path);
            }
            $data['image_path'] = $request->file('image')->store('banners', 'public');
        }

        $banner->update($data);

        return redirect()->back()->with('success', 'Banner promosi berhasil diperbarui!');
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image_path) {
            Storage::disk('public')->delete($banner->image_path);
        }
        
        $banner->delete();

        return redirect()->back()->with('success', 'Banner promosi berhasil dihapus!');
    }
}
