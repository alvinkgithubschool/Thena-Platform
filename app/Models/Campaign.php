<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'creator_wallet',
        'title',
        'description',
        'image_url',
        'target_amount_sol',
        'current_amount_sol',
        'deadline',
        'status',
        'on_chain_pda'
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'target_amount_sol' => 'decimal:9',
        'current_amount_sol' => 'decimal:9',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_wallet', 'wallet_address');
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }
}
