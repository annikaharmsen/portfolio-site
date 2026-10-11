<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Lets through only a Sanctum token that names the admin MCP ability itself. Unlike Sanctum's ability
 * check, a wildcard (`*`) token is refused.
 */
class RequireAdminMcpAbility
{
    public function handle(Request $request, Closure $next): Response
    {
        $abilities = $request->user()?->currentAccessToken()?->abilities ?? [];

        abort_unless(in_array(config('admin-mcp.ability'), $abilities, true), 403, 'This token cannot use the admin MCP server.');

        return $next($request);
    }
}
