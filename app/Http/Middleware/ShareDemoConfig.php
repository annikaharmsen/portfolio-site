<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShareDemoConfig
{
    public function handle(Request $request, Closure $next)
    {
        Inertia::share('demo_config', [
            'enabled' => config('demo.enabled'),
            'show_banner' => config('demo.show_banner'),
            'reset_at' => session()->get('demo_reset_at'),
        ]);

        return $next($request);
    }
}
