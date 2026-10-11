<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateAdminMcpToken extends Command
{
    protected $signature = 'mcp:admin-token
        {email : The admin user the token acts as}
        {--name=claude-code : A label for the token}
        {--days= : Days until the token expires (default: config admin-mcp.token_days)}
        {--revoke : Delete this user\'s admin MCP tokens instead of creating one}';

    protected $description = 'Create (or revoke) a token for the admin MCP server at /mcp/admin';

    public function handle(): int
    {
        $user = User::where('email', $this->argument('email'))->first();

        if (! $user) {
            $this->error('No user with that email.');

            return self::FAILURE;
        }

        $ability = config('admin-mcp.ability');

        if ($this->option('revoke')) {
            $tokens = $user->tokens()->get()->filter(fn ($token) => in_array($ability, $token->abilities, true));
            $tokens->each->delete();
            $this->info("Revoked {$tokens->count()} admin MCP token(s).");

            return self::SUCCESS;
        }

        $days = (int) ($this->option('days') ?? config('admin-mcp.token_days'));

        if ($days < 1) {
            $this->error('--days must be at least 1.');

            return self::FAILURE;
        }

        $expiresAt = now()->addDays($days);
        $token = $user->createToken($this->option('name'), [$ability], $expiresAt);

        $this->line($token->plainTextToken);
        $this->info("Expires {$expiresAt->toDateString()}. Shown once: store it now.");

        return self::SUCCESS;
    }
}
