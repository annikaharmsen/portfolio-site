<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class SetDemoDatabase
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Set the default database connection to 'demo'
        Config::set('database.default', 'demo');
        DB::purge('demo');

        return $next($request);
    }
}