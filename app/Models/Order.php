<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'customer_name',
        'customer_email',
        'customer_whatsapp',
        'product_package_id',
        'payment_method_id',
        'checkout_token',
        'price',
        'promo_code',
        'discount_amount',
        'status',
        'payment_proof_path',
        'credentials_sent'
    ];

    protected $casts = [
        'price' => 'integer',
        'discount_amount' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function productPackage(): BelongsTo
    {
        return $this->belongsTo(ProductPackage::class);
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}
