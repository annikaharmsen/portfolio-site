<?php

use App\Http\Middleware\EnsureAdminMcpAvailable;
use App\Mcp\Servers\AdminServer;
use Illuminate\Support\Facades\Route;
use Laravel\Mcp\Facades\Mcp;
use Laravel\Sanctum\Http\Middleware\CheckAbilities;

// loaded only inside the admin domain group (bootstrap/app.php), never on the demo or public domains
Route::middleware([
    EnsureAdminMcpAvailable::class,
    'throttle:60,1',
    'auth:sanctum',
    CheckAbilities::class.':'.config('admin-mcp.ability'),
])->group(function () {
    Mcp::web('/mcp/admin', AdminServer::class)->name('mcp.admin');
});
