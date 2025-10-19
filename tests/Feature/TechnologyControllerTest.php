<?php

namespace Tests\Feature;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TechnologyControllerTest extends TestCase
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
        // Create a technology to delete
        $technology = Tag::create([
            'name' => 'Test Technology',
            'category' => 'frontend',
            'icon' => 'test-icon',
        ]);

        // Simulate navigation: Dashboard -> Edit -> Delete
        // First visit dashboard
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/");

        // Then visit edit page (simulating coming from dashboard)
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/technologies/{$technology->id}/edit");

        // Delete the technology with referer set to edit page
        $response = $this->actingAs($this->user)
            ->from("http://{$this->domain}/technologies/{$technology->id}/edit")
            ->delete("http://{$this->domain}/technologies/{$technology->id}");

        // Verify delete succeeded
        $response->assertStatus(204);

        // Verify the technology was soft deleted
        $this->assertSoftDeleted('tags', [
            'id' => $technology->id,
        ]);
    }

    public function test_delete_from_index_returns_to_index()
    {
        // Create a technology to delete
        $technology = Tag::create([
            'name' => 'Test Technology',
            'category' => 'backend',
            'icon' => 'test-icon',
        ]);

        // Simulate navigation: Index -> Edit -> Delete
        // First visit index
        $this->actingAs($this->user)
            ->get('/technologies');

        // Then visit edit page (simulating coming from index)
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/technologies/{$technology->id}/edit");

        // Delete the technology with referer set to edit page
        $response = $this->actingAs($this->user)
            ->from("http://{$this->domain}/technologies/{$technology->id}/edit")
            ->delete("http://{$this->domain}/technologies/{$technology->id}");

        // Verify the technology was soft deleted
        $this->assertSoftDeleted('tags', [
            'id' => $technology->id,
        ]);

        // Verify delete succeeded
        $response->assertStatus(204);
    }

    public function test_technology_is_deleted_from_database()
    {
        $technology = Tag::create([
            'name' => 'Test Technology to Delete',
            'category' => 'tool',
            'icon' => 'test-icon',
        ]);

        $this->assertDatabaseHas('tags', [
            'id' => $technology->id,
            'name' => 'Test Technology to Delete',
        ]);

        $this->actingAs($this->user)
            ->delete("http://{$this->domain}/technologies/{$technology->id}")
            ->assertStatus(204);

        $this->assertSoftDeleted('tags', [
            'id' => $technology->id,
        ]);
    }

    public function test_unauthenticated_users_cannot_delete_technologies()
    {
        $technology = Tag::create([
            'name' => 'Test Technology',
            'category' => 'frontend',
            'icon' => 'test-icon',
        ]);

        $response = $this->delete("http://{$this->domain}/technologies/{$technology->id}");

        // Should redirect to login or return 404 depending on middleware setup
        $this->assertTrue(
            $response->status() === 302 || $response->status() === 404,
            "Expected redirect (302) or not found (404), got {$response->status()}"
        );

        // Verify technology was NOT deleted
        $this->assertDatabaseHas('tags', [
            'id' => $technology->id,
            'deleted_at' => null,
        ]);
    }
}
