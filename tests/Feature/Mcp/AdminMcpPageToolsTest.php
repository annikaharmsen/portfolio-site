<?php

namespace Tests\Feature\Mcp;

use App\Mcp\Servers\AdminServer;
use App\Mcp\Tools\ListSiteTexts;
use App\Mcp\Tools\ReplaceHeroSections;
use App\Mcp\Tools\ReplaceHighlights;
use App\Mcp\Tools\SetSiteText;
use App\Models\Highlight;
use App\Models\Project;
use App\Models\ProjectHeroSection;
use App\Models\SiteText;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Mcp\Server\Testing\PendingTestResponse;
use Tests\TestCase;

class AdminMcpPageToolsTest extends TestCase
{
    use RefreshDatabase;

    private function server(): PendingTestResponse
    {
        return AdminServer::actingAs(User::factory()->create());
    }

    public function test_replace_hero_sections_updates_creates_and_soft_deletes(): void
    {
        $project = Project::create(['icon_name' => 'Code', 'title' => 'A']);
        $kept = ProjectHeroSection::create(['project_id' => $project->id, 'index' => 0, 'heading' => 'Keep', 'text' => 't']);
        $dropped = ProjectHeroSection::create(['project_id' => $project->id, 'index' => 1, 'heading' => 'Drop', 'text' => 't']);

        $this->server()->tool(ReplaceHeroSections::class, [
            'project_id' => $project->id,
            'hero_sections' => [
                ['id' => $kept->id, 'index' => 0, 'heading' => 'Kept', 'text' => 'Updated'],
                ['index' => 1, 'heading' => 'New', 'text' => 'Body'],
            ],
        ])->assertOk()->assertHasNoErrors()->assertSee(['Kept', 'New']);

        $this->assertSame(['Kept', 'New'], $project->hero_sections()->pluck('heading')->all());
        $this->assertSoftDeleted($dropped);
    }

    public function test_replace_hero_sections_validation_errors_write_nothing(): void
    {
        $project = Project::create(['icon_name' => 'Code', 'title' => 'A']);
        $existing = ProjectHeroSection::create(['project_id' => $project->id, 'index' => 0, 'heading' => 'Keep', 'text' => 't']);

        $this->server()->tool(ReplaceHeroSections::class, [
            'project_id' => $project->id,
            'hero_sections' => [
                ['index' => 0, 'heading' => '', 'text' => 'x'],
                ['index' => 0, 'heading' => 'Dup', 'text' => 'x', 'image_id' => 999],
            ],
        ])->assertHasErrors([
            'Each hero section must have a heading.',
            'Each hero section must have a unique index.',
            'The selected image does not exist.',
        ]);

        $this->assertNotSoftDeleted($existing);
        $this->assertSame(1, ProjectHeroSection::count());
    }

    public function test_set_site_text_creates_replaces_and_removes(): void
    {
        $this->server()->tool(SetSiteText::class, ['path' => 'about.title', 'text' => 'About me'])->assertOk()->assertHasNoErrors();
        $this->server()->tool(SetSiteText::class, ['path' => 'about.title', 'text' => 'About Annika'])->assertOk();

        $this->assertSame(['About Annika'], SiteText::where('path', 'about.title')->pluck('text')->all());
        $this->assertSame(1, SiteText::onlyTrashed()->where('path', 'about.title')->count());

        $this->server()->tool(SetSiteText::class, ['path' => 'about.title', 'text' => null])->assertOk()->assertSee('Removed');
        $this->assertSame(0, SiteText::where('path', 'about.title')->count());
    }

    public function test_set_site_text_rejects_an_invalid_path(): void
    {
        $this->server()->tool(SetSiteText::class, ['path' => 'footer.title', 'text' => 'x'])
            ->assertHasErrors(['Path must be in the format: section.slot']);

        $this->assertSame(0, SiteText::count());
    }

    public function test_list_site_texts_filters_by_section(): void
    {
        SiteText::create(['path' => 'intro.title', 'text' => 'Hi there']);
        SiteText::create(['path' => 'contact.email', 'text' => 'me@example.com']);

        $this->server()->tool(ListSiteTexts::class, ['section' => 'intro'])
            ->assertOk()->assertSee('Hi there')->assertDontSee('me@example.com');
    }

    public function test_replace_highlights_in_order(): void
    {
        Highlight::create(['text' => 'Old', 'sort_order' => 0]);

        $this->server()->tool(ReplaceHighlights::class, ['highlights' => ['First', 'Second']])
            ->assertOk()->assertHasNoErrors();

        $this->assertSame(['First', 'Second'], Highlight::ordered()->pluck('text')->all());
    }

    public function test_replace_highlights_validation(): void
    {
        Highlight::create(['text' => 'Old', 'sort_order' => 0]);

        $this->server()->tool(ReplaceHighlights::class, ['highlights' => [str_repeat('x', 501)]])->assertHasErrors();

        $this->assertSame(['Old'], Highlight::ordered()->pluck('text')->all());
    }
}
