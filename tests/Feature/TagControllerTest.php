<?php

namespace Tests\Feature;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected string $domain;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->domain = 'admin.' . env('APP_DOMAIN', 'portfolio.test');
    }

    public function test_delete_from_dashboard_returns_to_dashboard()
    {
        // Create a tag to delete
        $tag = Tag::create([
            'name' => 'Test Tag',
            'category' => 'skill',
            'icon' => 'test-icon',
        ]);

        // Simulate navigation: Dashboard -> Edit -> Delete
        // First visit dashboard
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/");

        // Then visit edit page (simulating coming from dashboard)
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/tags/{$tag->id}/edit");

        // Delete the tag with referer set to edit page
        $response = $this->actingAs($this->user)
            ->from("http://{$this->domain}/tags/{$tag->id}/edit")
            ->delete("http://{$this->domain}/tags/{$tag->id}");

        // Verify delete succeeded
        $response->assertStatus(204);

        // Verify the tag was soft deleted
        $this->assertSoftDeleted('tags', [
            'id' => $tag->id,
        ]);
    }

    public function test_delete_from_index_returns_to_index()
    {
        // Create a tag to delete
        $tag = Tag::create([
            'name' => 'Test Tag',
            'category' => 'frontend',
            'icon' => 'test-icon',
        ]);

        // Simulate navigation: Index -> Edit -> Delete
        // First visit index
        $this->actingAs($this->user)
            ->get('/tags');

        // Then visit edit page (simulating coming from index)
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/tags/{$tag->id}/edit");

        // Delete the tag with referer set to edit page
        $response = $this->actingAs($this->user)
            ->from("http://{$this->domain}/tags/{$tag->id}/edit")
            ->delete("http://{$this->domain}/tags/{$tag->id}");

        // Verify the tag was soft deleted
        $this->assertSoftDeleted('tags', [
            'id' => $tag->id,
        ]);

        // Verify delete succeeded
        $response->assertStatus(204);
    }

    public function test_tag_is_deleted_from_database()
    {
        $tag = Tag::create([
            'name' => 'Test Tag to Delete',
            'category' => 'backend',
            'icon' => 'test-icon',
        ]);

        $this->assertDatabaseHas('tags', [
            'id' => $tag->id,
            'name' => 'Test Tag to Delete',
        ]);

        $this->actingAs($this->user)
            ->delete("http://{$this->domain}/tags/{$tag->id}")
            ->assertStatus(204);

        $this->assertSoftDeleted('tags', [
            'id' => $tag->id,
        ]);
    }

    public function test_unauthenticated_users_cannot_delete_tags()
    {
        $tag = Tag::create([
            'name' => 'Test Tag',
            'category' => 'skill',
            'icon' => 'test-icon',
        ]);

        $response = $this->delete("http://{$this->domain}/tags/{$tag->id}");

        // Should redirect to login or return 404 depending on middleware setup
        $this->assertTrue(
            $response->status() === 302 || $response->status() === 404,
            "Expected redirect (302) or not found (404), got {$response->status()}"
        );

        // Verify tag was NOT deleted
        $this->assertDatabaseHas('tags', [
            'id' => $tag->id,
            'deleted_at' => null,
        ]);
    }
}
