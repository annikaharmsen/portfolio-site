<?php

namespace Tests\Feature\Mcp;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminMcpTokenCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_an_expiring_token_with_only_the_mcp_ability(): void
    {
        $user = User::factory()->create(['email' => 'admin@example.com']);

        $this->artisan('mcp:admin-token', ['email' => 'admin@example.com', '--days' => 30])->assertSuccessful();

        $token = $user->tokens()->sole();
        $this->assertSame(['mcp:admin'], $token->abilities);
        $this->assertSame(now()->addDays(30)->toDateString(), $token->expires_at->toDateString());
    }

    public function test_it_revokes_only_mcp_tokens(): void
    {
        $user = User::factory()->create(['email' => 'admin@example.com']);
        $user->createToken('mcp', ['mcp:admin']);
        $user->createToken('other', ['other']);

        $this->artisan('mcp:admin-token', ['email' => 'admin@example.com', '--revoke' => true])->assertSuccessful();

        $this->assertSame(['other'], $user->tokens()->pluck('name')->all());
    }

    public function test_it_fails_for_an_unknown_user(): void
    {
        $this->artisan('mcp:admin-token', ['email' => 'nobody@example.com'])->assertFailed();
    }
}
