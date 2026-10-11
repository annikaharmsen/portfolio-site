<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Hides the admin MCP endpoint unless it's enabled, and refuses it on the public demo database.
 */
class EnsureAdminMcpAvailable
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless(config('admin-mcp.enabled'), 404);

        abort_if(config('database.default') === 'demo', 403, 'The admin MCP server is not available in demo mode.');

        return $next($request);
    }
}
