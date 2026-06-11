<?php

namespace Tests\Feature\Models;

use App\Models\SkillGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SkillGroupTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // clear groups seeded by migration so scope tests start clean
        SkillGroup::query()->forceDelete();
    }

    public function test_can_create_skill_group(): void
    {
        $group = SkillGroup::create([
            'name' => 'Languages',
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('skill_groups', ['name' => 'Languages']);
    }

    public function test_ordered_scope(): void
    {
        SkillGroup::create(['name' => 'Second', 'sort_order' => 2]);
        SkillGroup::create(['name' => 'First', 'sort_order' => 1]);

        $this->assertEquals('First', SkillGroup::ordered()->first()->name);
    }
}
