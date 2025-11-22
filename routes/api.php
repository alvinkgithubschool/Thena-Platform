<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WalletAuthController;

Route::prefix('auth')->group(function () {
    Route::post('wallet/nonce', [WalletAuthController::class, 'requestNonce']);
    Route::post('wallet/verify', [WalletAuthController::class, 'verifySignature']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
