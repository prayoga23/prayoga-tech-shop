<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pemberitahuan Bukti Pembayaran Baru</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        .header {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            padding: 24px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .badge {
            display: inline-block;
            background-color: #10b981;
            color: #ffffff;
            font-size: 12px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 20px;
            margin-top: 10px;
            text-transform: uppercase;
        }
        .content {
            padding: 28px;
        }
        .info-card {
            background-color: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 16px;
            border-radius: 6px;
            margin-bottom: 24px;
        }
        .info-card table {
            width: 100%;
            border-collapse: collapse;
        }
        .info-card td {
            padding: 6px 0;
            font-size: 14px;
        }
        .info-card td.label {
            color: #64748b;
            font-weight: 600;
            width: 40%;
        }
        .info-card td.value {
            color: #0f172a;
            font-weight: 600;
        }
        .order-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }
        .order-table th {
            background-color: #f1f5f9;
            color: #475569;
            font-size: 13px;
            text-align: left;
            padding: 10px 12px;
        }
        .order-table td {
            border-bottom: 1px solid #e2e8f0;
            padding: 12px;
            font-size: 14px;
        }
        .price-highlight {
            color: #10b981;
            font-weight: 700;
            font-size: 16px;
        }
        .proof-container {
            margin-top: 20px;
            text-align: center;
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
            border: 1px dashed #cbd5e1;
        }
        .proof-image {
            max-width: 100%;
            max-height: 400px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .btn-container {
            text-align: center;
            margin-top: 28px;
        }
        .btn {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 28px;
            font-size: 15px;
            font-weight: 600;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
        }
        .footer {
            background-color: #f1f5f9;
            padding: 16px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ config('app.name', 'Prayoga Tech') }}</h1>
            <span class="badge">Bukti Transfer Masuk</span>
        </div>
        <div class="content">
            <p style="font-size: 15px; margin-top: 0;">Halo <strong>Admin</strong>,</p>
            <p style="font-size: 14px; color: #475569;">Pelanggan telah mengunggah bukti pembayaran baru. Silakan periksa rincian di bawah ini untuk melakukan konfirmasi pesanan:</p>

            <div class="info-card">
                <table>
                    <tr>
                        <td class="label">Nomor Pesanan:</td>
                        <td class="value">#{{ $order->order_number }}</td>
                    </tr>
                    <tr>
                        <td class="label">Nama Customer:</td>
                        <td class="value">{{ $order->customer_name }}</td>
                    </tr>
                    <tr>
                        <td class="label">Email Customer:</td>
                        <td class="value">{{ $order->customer_email }}</td>
                    </tr>
                    <tr>
                        <td class="label">WhatsApp Customer:</td>
                        <td class="value">
                            <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $order->customer_whatsapp) }}" target="_blank" style="color: #2563eb; text-decoration: none;">
                                {{ $order->customer_whatsapp }} 📲
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Metode Pembayaran:</td>
                        <td class="value">{{ $order->paymentMethod->name ?? 'Transfer Bank / E-Wallet' }}</td>
                    </tr>
                    <tr>
                        <td class="label">Waktu Upload:</td>
                        <td class="value">{{ now()->setTimezone('Asia/Jakarta')->format('d M Y, H:i') }} WIB</td>
                    </tr>
                </table>
            </div>

            <h3 style="font-size: 15px; color: #1e293b; margin-bottom: 12px;">Rincian Item Pesanan</h3>
            <table class="order-table">
                <thead>
                    <tr>
                        <th>Paket / Produk</th>
                        <th style="text-align: right;">Harga</th>
                    </tr>
                </thead>
                <tbody>
                    @if(isset($groupOrders) && count($groupOrders) > 0)
                        @foreach($groupOrders as $item)
                            <tr>
                                <td>
                                    <strong>{{ $item->productPackage->product->name ?? 'Produk' }}</strong><br>
                                    <span style="font-size: 12px; color: #64748b;">{{ $item->productPackage->name ?? '' }}</span>
                                </td>
                                <td style="text-align: right; font-weight: 600;">
                                    Rp {{ number_format($item->price, 0, ',', '.') }}
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td>
                                <strong>{{ $order->productPackage->product->name ?? 'Produk' }}</strong><br>
                                <span style="font-size: 12px; color: #64748b;">{{ $order->productPackage->name ?? '' }}</span>
                            </td>
                            <td style="text-align: right; font-weight: 600;">
                                Rp {{ number_format($order->price, 0, ',', '.') }}
                            </td>
                        </tr>
                    @endif
                    <tr>
                        <td style="font-weight: 700;">TOTAL PEMBAYARAN</td>
                        <td style="text-align: right;" class="price-highlight">
                            Rp {{ number_format($totalPrice ?? $order->price, 0, ',', '.') }}
                        </td>
                    </tr>
                </tbody>
            </table>

            @if($order->payment_proof_path)
                <h3 style="font-size: 15px; color: #1e293b; margin-bottom: 12px;">Lampiran Bukti Pembayaran</h3>
                <div class="proof-container">
                    @php
                        $ext = strtolower(pathinfo($order->payment_proof_path, PATHINFO_EXTENSION));
                        $isImage = in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif']);
                    @endphp

                    @if($isImage && isset($proofUrl) && $proofUrl)
                        <img src="{{ $proofUrl }}" alt="Bukti Pembayaran #{{ $order->order_number }}" class="proof-image">
                    @else
                        <p style="font-size: 14px; color: #1e293b; margin-bottom: 8px;"><strong>Bukti Pembayaran (Dokumen PDF)</strong></p>
                        <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">File telah terlampir pada email ini atau dapat dilihat melalui tautan berikut:</p>
                        @if(isset($proofUrl) && $proofUrl)
                            <a href="{{ $proofUrl }}" target="_blank" style="display: inline-block; background-color: #e11d48; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 13px; font-weight: 600; border-radius: 6px;">
                                📄 Buka / Download PDF Bukti Pembayaran
                            </a>
                        @endif
                    @endif
                </div>
            @endif

            <div class="btn-container">
                <a href="{{ $adminOrderUrl ?? url('/admin/orders') }}" class="btn">Buka Admin Panel & Verifikasi</a>
            </div>
        </div>
        <div class="footer">
            Email notifikasi otomatis dari Sistem Penjualan Aplikasi {{ config('app.name', 'Prayoga Tech') }}.
        </div>
    </div>
</body>
</html>
