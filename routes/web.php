<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CampaignController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/campaigns', [CampaignController::class, 'index'])->name('campaigns.index');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index');
    })->name('dashboard');

    Route::resource('campaigns', CampaignController::class)->only(['create', 'store']);
});
