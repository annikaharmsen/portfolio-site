<?php

namespace Tests\Feature\Models;

use App\Models\Experience;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExperienceTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_experience_with_date_ranges(): void
    {
        $experience = Experience::create([
            'title' => 'Front-of-House Generalist',
            'company' => 'Tavern in the Square',
            'location' => 'Framingham, MA',
            'date_ranges' => [
                ['start' => '2023-07-01', 'end' => '2024-11-01'],
                ['start' => '2025-09-01', 'end' => null],
            ],
            'bullets' => ['Mastered multiple roles', 'Earned promotions'],
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('experiences', ['company' => 'Tavern in the Square']);
        $this->assertCount(2, $experience->date_ranges);
        $this->assertNull($experience->date_ranges[1]['end']);
        $this->assertCount(2, $experience->bullets);
    }

    public function test_formatted_date_ranges_single(): void
    {
        $exp = Experience::create([
            'title' => 'Dev', 'company' => 'Corp',
            'date_ranges' => [['start' => '2024-01-01', 'end' => '2024-12-01']],
            'sort_order' => 1,
        ]);

        $this->assertEquals('01/2024 – 12/2024', $exp->formatted_date_ranges);
    }

    public function test_formatted_date_ranges_multi_tenure(): void
    {
        $exp = Experience::create([
            'title' => 'Dev', 'company' => 'Corp',
            'date_ranges' => [
                ['start' => '2023-07-01', 'end' => '2024-11-01'],
                ['start' => '2025-09-01', 'end' => null],
            ],
            'sort_order' => 1,
        ]);

        $this->assertEquals('07/2023 – 11/2024, 09/2025 – Present', $exp->formatted_date_ranges);
    }

    public function test_ordered_scope(): void
    {
        Experience::create([
            'title' => 'Second', 'company' => 'B',
            'date_ranges' => [['start' => '2024-01-01', 'end' => null]],
            'sort_order' => 2,
        ]);
        Experience::create([
            'title' => 'First', 'company' => 'A',
            'date_ranges' => [['start' => '2023-01-01', 'end' => null]],
            'sort_order' => 1,
        ]);

        $this->assertEquals('First', Experience::ordered()->first()->title);
    }
}
