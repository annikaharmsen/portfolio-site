<?php

namespace Tests\Feature\Admin;

use App\Models\Highlight;
use App\Models\Image;
use App\Models\Project;
use App\Models\ProjectHeroSection;
use App\Models\SiteText;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * The admin web controllers' writes, which share their logic with the admin MCP server.
 */
class CmsControllersTest extends TestCase
{
    use RefreshDatabase;

    private string $admin = 'http://admin.portfolio.test';

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    public function test_store_project_creates_it_with_tags(): void
    {
        $tag = Tag::create(['icon_name' => 'Code', 'name' => 'PHP', 'category' => 'tech']);

        $this->post("{$this->admin}/projects", [
            'icon_name' => 'Code',
            'title' => 'Portfolio',
            'featured' => true,
            'tags' => [$tag->id],
        ])->assertRedirect();

        $project = Project::where('title', 'Portfolio')->firstOrFail();
        $this->assertTrue((bool) $project->featured);
        $this->assertSame([$tag->id], $project->tags->pluck('id')->all());
    }

    public function test_store_project_rejects_invalid_data(): void
    {
        $this->post("{$this->admin}/projects", ['icon_name' => 'NotAnIcon', 'title' => ''])
            ->assertSessionHasErrors(['icon_name', 'title']);

        $this->assertSame(0, Project::count());
    }

    public function test_update_project_keeps_tags_when_none_are_sent(): void
    {
        $tag = Tag::create(['icon_name' => 'Code', 'name' => 'PHP']);
        $project = Project::create(['icon_name' => 'Code', 'title' => 'Old']);
        $project->tags()->sync([$tag->id]);

        $this->put("{$this->admin}/projects/{$project->id}", ['icon_name' => 'Code', 'title' => 'New'])
            ->assertRedirect("/projects/{$project->id}");

        $project->refresh();
        $this->assertSame('New', $project->title);
        $this->assertSame([$tag->id], $project->tags->pluck('id')->all());
    }

    public function test_store_and_update_tag_sync_projects(): void
    {
        $project = Project::create(['icon_name' => 'Code', 'title' => 'A']);

        $this->post("{$this->admin}/tags", [
            'icon_name' => 'Code',
            'name' => 'Laravel',
            'category' => 'tech',
            'projects' => [$project->id],
        ])->assertRedirect();

        $tag = Tag::where('name', 'Laravel')->firstOrFail();
        $this->assertSame([$project->id], $tag->projects->pluck('id')->all());

        $this->put("{$this->admin}/tags/{$tag->id}", ['name' => 'Laravel 12', 'projects' => []])->assertRedirect();

        $tag->refresh();
        $this->assertSame('Laravel 12', $tag->name);
        $this->assertCount(0, $tag->projects);
    }

    public function test_hero_sections_update_replaces_the_projects_sections(): void
    {
        $project = Project::create(['icon_name' => 'Code', 'title' => 'A']);
        $kept = ProjectHeroSection::create(['project_id' => $project->id, 'index' => 0, 'heading' => 'Keep', 'text' => 't']);
        $dropped = ProjectHeroSection::create(['project_id' => $project->id, 'index' => 1, 'heading' => 'Drop', 'text' => 't']);

        $this->put("{$this->admin}/projects/{$project->id}/hero-sections", [
            'hero_sections' => [
                ['id' => $kept->id, 'index' => 0, 'heading' => 'Kept', 'text' => 'new text'],
                ['index' => 1, 'heading' => 'Added', 'text' => 'body'],
            ],
        ])->assertRedirect("/projects/{$project->id}/edit");

        $this->assertSame('Kept', $kept->fresh()->heading);
        $this->assertSoftDeleted($dropped);
        $this->assertSame(['Kept', 'Added'], $project->hero_sections()->pluck('heading')->all());
    }

    public function test_hero_sections_update_does_not_move_another_projects_section(): void
    {
        $project = Project::create(['icon_name' => 'Code', 'title' => 'A']);
        $other = Project::create(['icon_name' => 'Code', 'title' => 'B']);
        $foreign = ProjectHeroSection::create(['project_id' => $other->id, 'index' => 0, 'heading' => 'Theirs', 'text' => 't']);

        $this->put("{$this->admin}/projects/{$project->id}/hero-sections", [
            'hero_sections' => [['id' => $foreign->id, 'index' => 0, 'heading' => 'Mine', 'text' => 't']],
        ])->assertRedirect();

        $this->assertSame($other->id, $foreign->fresh()->project_id);
        $this->assertSame('Theirs', $foreign->fresh()->heading);
        $this->assertSame(['Mine'], $project->hero_sections()->pluck('heading')->all());
    }

    public function test_site_text_update_replaces_and_clears_text(): void
    {
        $this->put("{$this->admin}/text", ['path' => 'intro.title', 'text' => 'Hello'])
            ->assertRedirect('/sections/intro/edit');
        $this->assertSame('Hello', SiteText::where('path', 'intro.title')->value('text'));

        $this->put("{$this->admin}/text", ['path' => 'intro.title', 'text' => ''])->assertRedirect();
        $this->assertSame(0, SiteText::where('path', 'intro.title')->count());
    }

    public function test_highlights_sync_replaces_them_in_order(): void
    {
        Highlight::create(['text' => 'Old', 'sort_order' => 0]);

        $this->put("{$this->admin}/highlights", ['highlights' => ['First', 'Second']])
            ->assertRedirect();

        $this->assertSame(['First', 'Second'], Highlight::ordered()->pluck('text')->all());
        $this->assertSame(1, Highlight::onlyTrashed()->count());
    }

    public function test_image_model_is_available_for_hero_sections(): void
    {
        $image = Image::create(['url' => '/storage/images/a.png', 'alt' => 'A']);
        $project = Project::create(['icon_name' => 'Code', 'title' => 'A']);

        $this->put("{$this->admin}/projects/{$project->id}/hero-sections", [
            'hero_sections' => [['index' => 0, 'heading' => 'H', 'text' => 't', 'image_id' => $image->id]],
        ])->assertRedirect();

        $this->assertSame($image->id, $project->hero_sections()->value('image_id'));
    }
}
