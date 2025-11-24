<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DonationController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/login', function () {
    return redirect()->route('home');
})->name('login');

Route::get('/campaigns', [CampaignController::class, 'index'])->name('campaigns.index');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index');
    })->name('dashboard');
    
    Route::get('/dashboard/backer', function () {
        return Inertia::render('Dashboard/Backer');
    })->name('dashboard.backer');
    
    Route::post('/logout', function () {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});

// TEMP: allow public campaign creation and viewing during early prototyping
Route::resource('campaigns', CampaignController::class)->only(['create', 'store', 'show']);

// Donation route (public for testing with devnet)
Route::post('/campaigns/{campaign}/donations', [DonationController::class, 'store'])->name('donations.store');
