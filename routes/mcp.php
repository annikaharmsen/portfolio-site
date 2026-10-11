<?php

use App\Http\Middleware\EnsureAdminMcpAvailable;
use App\Http\Middleware\RequireAdminMcpAbility;
use App\Mcp\Servers\AdminServer;
use Illuminate\Support\Facades\Route;
use Laravel\Mcp\Facades\Mcp;

// loaded only inside the admin domain group (bootstrap/app.php), never on the demo or public domains
Route::middleware([
    EnsureAdminMcpAvailable::class,
    'throttle:60,1',
    'auth:sanctum',
    RequireAdminMcpAbility::class,
])->group(function () {
    Mcp::web('/mcp/admin', AdminServer::class)->name('mcp.admin');
});
