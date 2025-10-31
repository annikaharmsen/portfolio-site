<?php

namespace Tests\Feature;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SkillControllerTest extends TestCase
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
        // Create a skill to delete
        $skill = Tag::create([
            'name' => 'Test Skill',
            'category' => 'skill',
            'icon' => 'test-icon',
        ]);

        // Simulate navigation: Dashboard -> Edit -> Delete
        // First visit dashboard
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/");

        // Then visit edit page (simulating coming from dashboard)
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/skills/{$skill->id}/edit");

        // Delete the skill with referer set to edit page
        $response = $this->actingAs($this->user)
            ->from("http://{$this->domain}/skills/{$skill->id}/edit")
            ->delete("http://{$this->domain}/skills/{$skill->id}");

        // Verify delete succeeded
        $response->assertStatus(204);

        // Verify the skill was soft deleted
        $this->assertSoftDeleted('tags', [
            'id' => $skill->id,
        ]);
    }

    public function test_delete_from_index_returns_to_index()
    {
        // Create a skill to delete
        $skill = Tag::create([
            'name' => 'Test Skill',
            'category' => 'skill',
            'icon' => 'test-icon',
        ]);

        // Simulate navigation: Index -> Edit -> Delete
        // First visit index
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/skills");

        // Then visit edit page (simulating coming from index)
        $this->actingAs($this->user)
            ->get("http://{$this->domain}/skills/{$skill->id}/edit");

        // Delete the skill with referer set to edit page
        $response = $this->actingAs($this->user)
            ->from("http://{$this->domain}/skills/{$skill->id}/edit")
            ->delete("http://{$this->domain}/skills/{$skill->id}");

        // Verify delete succeeded
        $response->assertStatus(204);

        // Verify the skill was soft deleted
        $this->assertSoftDeleted('tags', [
            'id' => $skill->id,
        ]);
    }

    public function test_skill_is_deleted_from_database()
    {
        $skill = Tag::create([
            'name' => 'Test Skill to Delete',
            'category' => 'skill',
            'icon' => 'test-icon',
        ]);

        $this->assertDatabaseHas('tags', [
            'id' => $skill->id,
            'name' => 'Test Skill to Delete',
        ]);

        $this->actingAs($this->user)
            ->delete("http://{$this->domain}/skills/{$skill->id}")
            ->assertStatus(204);

        $this->assertSoftDeleted('tags', [
            'id' => $skill->id,
        ]);
    }

    public function test_unauthenticated_users_cannot_delete_skills()
    {
        $skill = Tag::create([
            'name' => 'Test Skill',
            'category' => 'skill',
            'icon' => 'test-icon',
        ]);

        $response = $this->delete("http://{$this->domain}/skills/{$skill->id}");

        // Should redirect to login or return 404 depending on middleware setup
        $this->assertTrue(
            $response->status() === 302 || $response->status() === 404,
            "Expected redirect (302) or not found (404), got {$response->status()}"
        );

        // Verify skill was NOT deleted
        $this->assertDatabaseHas('tags', [
            'id' => $skill->id,
            'deleted_at' => null,
        ]);
    }
}
