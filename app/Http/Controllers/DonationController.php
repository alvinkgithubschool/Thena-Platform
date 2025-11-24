<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use App\Models\Campaign;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DonationController extends Controller
{
    /**
     * Store a new donation for a campaign.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $request->validate([
            'amount_sol' => 'required|numeric|min:0.01',
            'transaction_signature' => 'required|string|unique:donations,transaction_signature',
        ]);

        // Get donor wallet (from authenticated user or fallback for MVP testing)
        $donorWallet = Auth::user()?->wallet_address ?? $request->input('donor_wallet', 'test_donor_wallet');

        // Create donation record
        $donation = Donation::create([
            'campaign_id' => $campaign->id,
            'donor_wallet' => $donorWallet,
            'amount_sol' => $request->amount_sol,
            'transaction_signature' => $request->transaction_signature,
        ]);

        // Update campaign's current amount
        $campaign->increment('current_amount_sol', $request->amount_sol);

        return response()->json([
            'success' => true,
            'donation' => $donation,
            'campaign' => $campaign->fresh(),
        ]);
    }
}
