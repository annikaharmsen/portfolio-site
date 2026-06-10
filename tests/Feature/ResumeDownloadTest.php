<?php

namespace Tests\Feature;

use App\Models\Education;
use App\Models\Experience;
use App\Models\SkillGroup;
use App\Models\SiteText;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResumeDownloadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        SiteText::create(['path' => 'resume.name', 'text' => 'Test User']);
        SiteText::create(['path' => 'resume.location', 'text' => 'Test City']);
        SiteText::create(['path' => 'resume.phone', 'text' => '555-0100']);
        SiteText::create(['path' => 'resume.website', 'text' => 'https://example.com']);
        SiteText::create(['path' => 'resume.summary', 'text' => 'A summary.']);

        Education::create([
            'degree' => 'BS in CS',
            'institution' => 'Test University',
            'graduation_date' => '2025-05-01',
            'sort_order' => 1,
        ]);

        SkillGroup::create([
            'name' => 'Languages',
            'skills' => 'PHP, JS',
            'sort_order' => 1,
        ]);

        Experience::create([
            'title' => 'Developer',
            'company' => 'Test Corp',
            'location' => 'Remote',
            'start_date' => '2024-01-01',
            'resume_bullets' => ['Built things'],
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
