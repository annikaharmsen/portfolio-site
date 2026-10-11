<?php

use App\Http\Middleware\EnsureAdminMcpAvailable;
use App\Http\Middleware\FreshDemoMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetDemoDatabase;
use App\Http\Middleware\ShareDemoConfig;
use Illuminate\Contracts\Auth\Middleware\AuthenticatesRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::domain('admin.'.env('APP_DOMAIN'))
                ->middleware('web')
                ->group(base_path('routes/admin.php'));

            // token-authenticated, without the web middleware: no session, cookies or CSRF
            Route::domain('admin.'.env('APP_DOMAIN'))
                ->group(base_path('routes/mcp.php'));

            if (config('demo.enabled')) {
                Route::domain('admin-demo.'.env('APP_DOMAIN'))
                    ->middleware([SetDemoDatabase::class, 'web', FreshDemoMiddleware::class, ShareDemoConfig::class])
                    ->group(base_path('routes/admin-demo.php'));
            }

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        // check that the admin MCP endpoint is enabled and off the demo database before any token lookup
        $middleware->prependToPriorityList(
            before: AuthenticatesRequests::class,
            prepend: EnsureAdminMcpAvailable::class,
        );

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // MCP clients get JSON errors (401, 403, 404), never a redirect to the login page
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('mcp/*') || $request->expectsJson()
        );
    })->create();
