<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('product_packages', function (Blueprint $table) {
            $table->bigInteger('original_price')->nullable()->after('price');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('badge')->nullable()->after('name');
        });

        Schema::table('banners', function (Blueprint $table) {
            $table->string('type')->default('carousel')->after('image_path'); // carousel, middle
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_packages', function (Blueprint $table) {
            $table->dropColumn('original_price');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('badge');
        });

        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
