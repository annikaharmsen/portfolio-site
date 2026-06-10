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
            'degree' => 'Bachelor of Science in Information Technology',
            'institution' => 'Purdue University Global',
            'graduation_date' => '2025-07-01',
            'gpa' => '3.98',
            'honors' => ['Dean\'s List', 'Chancellor\'s List'],
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('educations', [
            'degree' => 'Bachelor of Science in Information Technology',
            'institution' => 'Purdue University Global',
        ]);

        $this->assertEquals(['Dean\'s List', 'Chancellor\'s List'], $education->honors);
    }

    public function test_ordered_scope(): void
    {
        Education::create([
            'degree' => 'Second',
            'institution' => 'B University',
            'graduation_date' => '2020-05-01',
            'sort_order' => 2,
        ]);
        Education::create([
            'degree' => 'First',
            'institution' => 'A University',
            'graduation_date' => '2025-07-01',
            'sort_order' => 1,
        ]);

        $ordered = Education::ordered()->get();

        $this->assertEquals('First', $ordered->first()->degree);
    }
}
