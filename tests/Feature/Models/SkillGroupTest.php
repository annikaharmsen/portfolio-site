<?php

namespace Tests\Feature\Models;

use App\Models\SkillGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SkillGroupTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_skill_group(): void
    {
        $group = SkillGroup::create([
            'name' => 'Languages & Runtimes',
            'skills' => 'JavaScript/TypeScript, PHP, Java, HTML/CSS',
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('skill_groups', [
            'name' => 'Languages & Runtimes',
            'skills' => 'JavaScript/TypeScript, PHP, Java, HTML/CSS',
        ]);
    }

    public function test_ordered_scope(): void
    {
        SkillGroup::create(['name' => 'Second', 'skills' => 'B', 'sort_order' => 2]);
        SkillGroup::create(['name' => 'First', 'skills' => 'A', 'sort_order' => 1]);

        $ordered = SkillGroup::ordered()->get();

        $this->assertEquals('First', $ordered->first()->name);
    }
}
