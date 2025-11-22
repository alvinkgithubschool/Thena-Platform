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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('creator_wallet'); // Wallet address of creator
            $table->string('title');
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->decimal('target_amount_sol', 16, 9); // SOL has 9 decimals
            $table->decimal('current_amount_sol', 16, 9)->default(0);
            $table->timestamp('deadline');
            $table->enum('status', ['active', 'completed', 'expired'])->default('active');
            $table->string('on_chain_pda')->nullable(); // Program Derived Address for the campaign
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
