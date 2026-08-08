<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Setting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppNotificationService
{
    /**
     * Send payment proof notification to Admin WhatsApp number via Meta Business Cloud API.
     */
    public static function sendPaymentProofNotification(Order $order, $groupOrders = null): bool
    {
        $enabled = Setting::get('wa_notification_enabled', env('WA_NOTIFICATION_ENABLED', 'false'));
        if ($enabled !== 'true' && $enabled !== true && $enabled !== '1') {
            return false;
        }

        $token = Setting::get('wa_meta_business_token', env('WA_META_BUSINESS_TOKEN'));
        $phoneNumberId = Setting::get('wa_meta_phone_number_id', env('WA_META_PHONE_NUMBER_ID'));
        $recipient = Setting::get('wa_notification_recipient', env('WA_NOTIFICATION_RECIPIENT', '628123456789'));

        if (!$token || !$phoneNumberId || !$recipient) {
            Log::warning('WhatsApp Meta Business API credentials missing for payment proof notification.');
            return false;
        }

        // Format recipient number (ensure 62 prefix instead of + or 0)
        $recipientClean = preg_replace('/[^0-9]/', '', $recipient);
        if (str_starts_with($recipientClean, '0')) {
            $recipientClean = '62' . substr($recipientClean, 1);
        }

        $totalPrice = $groupOrders && count($groupOrders) > 0 ? $groupOrders->sum('price') : $order->price;
        $proofUrl = $order->payment_proof_path ? asset('storage/' . $order->payment_proof_path) : '-';

        $message = "🚨 *BUKTI PEMBAYARAN MASUK*\n\n";
        $message .= "Order ID: *#" . $order->order_number . "*\n";
        $message .= "Customer: *" . $order->customer_name . "* (" . $order->customer_whatsapp . ")\n";
        $message .= "Email: " . $order->customer_email . "\n";
        $message .= "Total: *Rp " . number_format($totalPrice, 0, ',', '.') . "*\n";
        $message .= "Metode: " . ($order->paymentMethod->name ?? 'Transfer Bank') . "\n";
        $message .= "Waktu: " . now()->setTimezone('Asia/Jakarta')->format('d M Y H:i') . " WIB\n\n";
        $message .= "📸 Link Bukti Transfer:\n" . $proofUrl . "\n\n";
        $message .= "Silakan cek Dashboard Admin untuk konfirmasi pesanan.";

        try {
            $response = Http::withToken($token)
                ->post("https://graph.facebook.com/v18.0/{$phoneNumberId}/messages", [
                    'messaging_product' => 'whatsapp',
                    'to' => $recipientClean,
                    'type' => 'text',
                    'text' => [
                        'preview_url' => true,
                        'body' => $message,
                    ],
                ]);

            if ($response->successful()) {
                Log::info("WhatsApp payment proof notification sent to Admin ({$recipientClean}) for order #{$order->order_number}");
                return true;
            } else {
                Log::error("Failed to send WhatsApp notification: " . $response->body());
                return false;
            }
        } catch (\Throwable $e) {
            Log::error("WhatsApp Notification Exception: " . $e->getMessage());
            return false;
        }
    }
}
