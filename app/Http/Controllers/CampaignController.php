<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Campaign;
use Illuminate\Support\Facades\Auth;

class CampaignController extends Controller
{
    /**
     * Show the form for creating a new campaign.
     */
    public function create()
    {
        return Inertia::render('Campaigns/Create');
    }

    /**
     * Store a newly created campaign in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'target_amount_sol' => 'required|numeric|min:0.1',
            'deadline' => 'required|date|after:today',
            // 'image' => 'nullable|image|max:2048', // TODO: Add file upload support
        ]);

        // TODO: Handle Image Upload to S3/Storage and get URL
        $imageUrl = 'https://placehold.co/600x400/18181b/f97316?text=' . urlencode($request->title);

        $creator = Auth::user();
        $creatorWallet = $creator?->wallet_address ?? 'demo_wallet_address';

        $campaign = Campaign::create([
            'creator_wallet' => $creatorWallet,
            'title' => $request->title,
            'description' => $request->description,
            'target_amount_sol' => $request->target_amount_sol,
            'deadline' => $request->deadline,
            'image_url' => $imageUrl,
            'current_amount_sol' => 0,
            'status' => 'active',
        ]);

        // If user is authenticated, redirect to dashboard; otherwise to campaigns index
        if (Auth::check()) {
            return redirect()->route('dashboard')->with('success', 'Campaign created successfully!');
        }
        
        return redirect()->route('campaigns.index')->with('success', 'Campaign created successfully!');
    }

    public function index()
    {
        $campaigns = Campaign::where('status', 'active')->latest()->get();
        return Inertia::render('Campaigns/Index', [
            'campaigns' => $campaigns
        ]);
    }

    /**
     * Display a specific campaign.
     */
    public function show(Campaign $campaign)
    {
        return Inertia::render('Campaigns/Show', [
            'campaign' => $campaign,
        ]);
    }
}
