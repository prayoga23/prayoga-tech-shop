<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'badge',
        'slug',
        'description',
        'image_path',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = ['min_price', 'min_original_price'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function packages(): HasMany
    {
        return $this->hasMany(ProductPackage::class);
    }

    public function getMinPriceAttribute(): int
    {
        return (int) ($this->packages()->where('is_active', true)->min('price') ?? 0);
    }

    public function getMinOriginalPriceAttribute(): ?int
    {
        $minPackage = $this->packages()->where('is_active', true)->orderBy('price', 'asc')->first();
        return $minPackage ? $minPackage->original_price : null;
    }
}
