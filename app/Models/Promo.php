<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Promo extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'value',
        'min_purchase',
        'max_discount',
        'is_active',
        'expires_at'
    ];

    protected $casts = [
        'value' => 'integer',
        'min_purchase' => 'integer',
        'max_discount' => 'integer',
        'is_active' => 'boolean',
        'expires_at' => 'date'
    ];

    /**
     * Check if promo code is valid (active and not expired).
     */
    public function isValid(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        if ($this->expires_at && Carbon::parse($this->expires_at)->endOfDay()->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Calculate discount amount for a given order/cart total.
     */
    public function calculateDiscount(int $totalAmount): int
    {
        if ($totalAmount < $this->min_purchase) {
            return 0;
        }

        if ($this->type === 'fixed') {
            return min($this->value, $totalAmount);
        }

        // Percentage discount
        $discount = (int) (($this->value / 100) * $totalAmount);

        if ($this->max_discount) {
            $discount = min($discount, $this->max_discount);
        }

        return min($discount, $totalAmount);
    }
}
