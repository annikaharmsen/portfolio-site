<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Admin MCP server
    |--------------------------------------------------------------------------
    |
    | The admin MCP endpoint (POST /mcp/admin on the admin domain) lets an MCP
    | client such as Claude Code edit the CMS content with a Sanctum token.
    | Off unless enabled: the route answers 404.
    |
    */

    'enabled' => (bool) env('MCP_ADMIN_ENABLED', false),

    // the only ability a token needs, and the only one `mcp:admin-token` grants
    'ability' => 'mcp:admin',

    // default lifetime of a token from `mcp:admin-token`
    'token_days' => (int) env('MCP_ADMIN_TOKEN_DAYS', 90),
];
