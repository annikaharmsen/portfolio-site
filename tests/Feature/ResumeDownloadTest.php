<?php

namespace Tests\Feature;

use App\Models\Education;
use App\Models\Experience;
use App\Models\SkillGroup;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResumeDownloadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        User::factory()->create([
            'name' => 'Test User',
            'location' => 'Test City',
            'phone' => '555-0100',
            'summary' => 'A summary.',
        ]);

        Education::create([
            'title' => 'BS in CS',
            'institution' => 'Test University',
            'graduation_date' => '2025-05-01',
            'sort_order' => 1,
        ]);

        $group = SkillGroup::create([
            'name' => 'Languages',
            'sort_order' => 1,
        ]);

        Tag::withoutGlobalScopes()->create([
            'name' => 'PHP',
            'category' => 'skill',
            'skill_group_id' => $group->id,
        ]);

        Experience::create([
            'title' => 'Developer',
            'company' => 'Test Corp',
            'location' => 'Remote',
            'date_ranges' => [['start' => '2024-01-01', 'end' => null]],
            'bullets' => ['Built things'],
            'sort_order' => 1,
        ]);
    }

    public function test_resume_route_returns_pdf(): void
    {
        $response = $this->get('/resume');

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/pdf');
    }

    public function test_resume_sets_download_filename(): void
    {
        $response = $this->get('/resume');

        $response->assertStatus(200);
        $this->assertStringContainsString(
            'attachment',
            $response->headers->get('content-disposition') ?? '',
        );
    }
}
