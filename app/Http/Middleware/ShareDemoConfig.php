<?php

namespace App\Http\Middleware;

use Cache;
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
            'allow_manual_reset' => config('demo.allow_manual_reset'),
            'reset_at' => Cache::get(config('demo.reset_time_cache_key')),
        ]);

        return $next($request);
    }
}
