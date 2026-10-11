<?php

namespace Tests\Feature\Mcp;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class AdminMcpAuthTest extends TestCase
{
    use RefreshDatabase;

    private const URL = 'http://admin.portfolio.test/mcp/admin';

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        config(['admin-mcp.enabled' => true]);
        $this->user = User::factory()->create();
    }

    private function rpc(string $method, array $params = [], array $headers = [], string $url = self::URL): TestResponse
    {
        return $this->postJson($url, ['jsonrpc' => '2.0', 'id' => 1, 'method' => $method, 'params' => (object) $params], $headers);
    }

    private function bearer(array $abilities = ['mcp:admin'], $expiresAt = null): array
    {
        $token = $this->user->createToken('test', $abilities, $expiresAt)->plainTextToken;

        return ['Authorization' => "Bearer {$token}"];
    }

    public function test_a_valid_token_lists_the_admin_tools(): void
    {
        $response = $this->rpc('tools/list', [], $this->bearer())->assertOk();

        $names = collect($response->json('result.tools'))->pluck('name')->all();
        $this->assertEqualsCanonicalizing([
            'list_content', 'get_content', 'create_content', 'update_content', 'delete_content', 'restore_content',
            'update_project_tags', 'replace_hero_sections', 'list_site_texts', 'set_site_text', 'replace_highlights',
        ], $names);
    }

    public function test_initialize_succeeds_with_a_valid_token(): void
    {
        $this->rpc('initialize', [
            'protocolVersion' => '2025-06-18',
            'capabilities' => (object) [],
            'clientInfo' => ['name' => 'test', 'version' => '1'],
        ], $this->bearer())
            ->assertOk()
            ->assertJsonPath('result.serverInfo.name', 'Portfolio Admin');
    }

    public function test_a_valid_token_can_call_a_write_tool_over_http(): void
    {
        $this->rpc('tools/call', [
            'name' => 'create_content',
            'arguments' => ['type' => 'project', 'data' => ['icon_name' => 'Code', 'title' => 'Via HTTP']],
        ], $this->bearer())
            ->assertOk()
            ->assertJsonPath('result.isError', false);

        $this->assertDatabaseHas('projects', ['title' => 'Via HTTP']);
    }

    public function test_no_token_is_rejected(): void
    {
        $this->rpc('tools/list')->assertUnauthorized();
    }

    public function test_an_unauthenticated_write_is_rejected_and_writes_nothing(): void
    {
        $this->rpc('tools/call', [
            'name' => 'create_content',
            'arguments' => ['type' => 'project', 'data' => ['icon_name' => 'Code', 'title' => 'Nope']],
        ])->assertUnauthorized();

        $this->assertSame(0, Project::count());
    }

    public function test_an_unauthenticated_request_without_json_accept_gets_401_not_a_login_redirect(): void
    {
        $this->call('POST', self::URL, [], [], [], ['CONTENT_TYPE' => 'application/json'], '{"jsonrpc":"2.0","id":1,"method":"tools/list"}')
            ->assertUnauthorized();
    }

    public function test_an_invalid_token_is_rejected(): void
    {
        $this->rpc('tools/list', [], ['Authorization' => 'Bearer 1|not-a-real-token'])->assertUnauthorized();
    }

    public function test_an_expired_token_is_rejected(): void
    {
        $this->rpc('tools/list', [], $this->bearer(['mcp:admin'], now()->subMinute()))->assertUnauthorized();
    }

    public function test_a_token_without_the_mcp_admin_ability_is_forbidden(): void
    {
        $this->rpc('tools/list', [], $this->bearer(['something-else']))->assertForbidden();
    }

    public function test_a_wildcard_token_is_forbidden(): void
    {
        $this->rpc('tools/list', [], $this->bearer(['*']))->assertForbidden();
    }

    public function test_a_logged_in_browser_session_is_not_enough(): void
    {
        $this->actingAs($this->user, 'web');

        $this->rpc('tools/list')->assertUnauthorized();
    }

    public function test_the_endpoint_is_hidden_when_disabled(): void
    {
        config(['admin-mcp.enabled' => false]);

        $this->rpc('tools/list', [], $this->bearer())->assertNotFound();
    }

    public function test_get_and_delete_are_hidden_too_when_disabled(): void
    {
        config(['admin-mcp.enabled' => false]);

        $this->get(self::URL)->assertNotFound();
        $this->delete(self::URL)->assertNotFound();
    }

    public function test_it_is_not_served_on_the_demo_admin_domain(): void
    {
        $this->rpc('tools/list', [], $this->bearer(), 'http://admin-demo.portfolio.test/mcp/admin')->assertNotFound();
    }

    public function test_it_is_not_served_on_the_public_domain(): void
    {
        $this->rpc('tools/list', [], $this->bearer(), 'http://portfolio.test/mcp/admin')->assertNotFound();
    }

    public function test_it_refuses_to_run_on_the_demo_database(): void
    {
        $headers = $this->bearer();
        $connection = config('database.default');
        config(['database.default' => 'demo']);

        try {
            $this->rpc('tools/list', [], $headers)->assertForbidden();
        } finally {
            config(['database.default' => $connection]);
        }
    }
}
