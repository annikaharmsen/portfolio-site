<?php

namespace Tests\Feature\Models;

use App\Models\Education;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EducationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_education(): void
    {
        $education = Education::create([
            'title' => 'Bachelor of Science in Information Technology',
            'institution' => 'Purdue University Global',
            'graduation_date' => '2025-07-01',
            'gpa' => '3.98',
            'bullets' => ['Dean\'s List', 'Chancellor\'s List'],
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('educations', [
            'title' => 'Bachelor of Science in Information Technology',
            'institution' => 'Purdue University Global',
        ]);

        $this->assertEquals(['Dean\'s List', 'Chancellor\'s List'], $education->bullets);
    }

    public function test_ordered_scope(): void
    {
        Education::create([
            'title' => 'Second', 'institution' => 'B University',
            'graduation_date' => '2020-05-01', 'sort_order' => 2,
        ]);
        Education::create([
            'title' => 'First', 'institution' => 'A University',
            'graduation_date' => '2025-07-01', 'sort_order' => 1,
        ]);

        $this->assertEquals('First', Education::ordered()->first()->title);
    }
}
