<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class PaymentProofUploadedMail extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;
    public $groupOrders;
    public float $totalPrice;

    /**
     * Create a new message instance.
     */
    public function __construct(Order $order, $groupOrders = null)
    {
        $this->order = $order->loadMissing(['productPackage.product', 'paymentMethod']);
        $this->groupOrders = $groupOrders;

        if ($groupOrders && count($groupOrders) > 0) {
            $this->totalPrice = $groupOrders->sum('price');
        } else {
            $this->totalPrice = (float) $order->price;
        }
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: ' Bukti Pembayaran Baru: Pesanan #' . $this->order->order_number . ' (' . $this->order->customer_name . ')',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $proofUrl = null;
        if ($this->order->payment_proof_path) {
            $proofUrl = asset('storage/' . $this->order->payment_proof_path);
        }

        return new Content(
            view: 'emails.payment-proof',
            with: [
                'order' => $this->order,
                'groupOrders' => $this->groupOrders,
                'totalPrice' => $this->totalPrice,
                'proofUrl' => $proofUrl,
                'adminOrderUrl' => url('/admin/orders'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];

        if ($this->order->payment_proof_path && Storage::disk('public')->exists($this->order->payment_proof_path)) {
            $filePath = Storage::disk('public')->path($this->order->payment_proof_path);
            $attachments[] = Attachment::fromPath($filePath)
                ->as('bukti_pembayaran_' . $this->order->order_number . '.' . pathinfo($filePath, PATHINFO_EXTENSION))
                ->withMime(mime_content_type($filePath) ?: 'image/jpeg');
        }

        return $attachments;
    }
}
