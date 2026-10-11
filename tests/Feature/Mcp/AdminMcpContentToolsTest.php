<?php

namespace Tests\Feature\Mcp;

use App\Mcp\Servers\AdminServer;
use App\Mcp\Tools\CreateContent;
use App\Mcp\Tools\DeleteContent;
use App\Mcp\Tools\GetContent;
use App\Mcp\Tools\ListContent;
use App\Mcp\Tools\RestoreContent;
use App\Mcp\Tools\UpdateContent;
use App\Mcp\Tools\UpdateProjectTags;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Mcp\Server\Testing\PendingTestResponse;
use Tests\TestCase;

class AdminMcpContentToolsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        SkillGroup::query()->forceDelete();
    }

    private function server(): PendingTestResponse
    {
        return AdminServer::actingAs(User::factory()->create());
    }

    private function project(array $attributes = []): Project
    {
        return Project::create(['icon_name' => 'Code', 'title' => 'Project', ...$attributes]);
    }

    public function test_list_content_includes_hidden_projects_in_site_order(): void
    {
        $this->project(['title' => 'Old', 'date' => '2020-01-01']);
        $this->project(['title' => 'Featured', 'featured' => true, 'date' => '2019-01-01']);
        $this->project(['title' => 'Hidden', 'hidden' => true, 'date' => '2024-01-01']);

        $response = $this->server()->tool(ListContent::class, ['type' => 'project']);

        $response->assertOk()->assertSee(['Featured', 'Hidden', 'Old']);
        $this->assertSame(['Featured', 'Hidden', 'Old'], Project::ordered()->pluck('title')->all());
    }

    public function test_list_content_trashed_only_shows_soft_deleted_records(): void
    {
        $this->project(['title' => 'Live']);
        $this->project(['title' => 'Gone'])->delete();

        $this->server()->tool(ListContent::class, ['type' => 'project', 'trashed' => 'only'])
            ->assertOk()->assertSee('Gone')->assertDontSee('Live');
    }

    public function test_get_content_returns_a_project_with_tags(): void
    {
        $project = $this->project(['title' => 'With tags']);
        $project->tags()->attach(Tag::create(['icon_name' => 'Code', 'name' => 'Laravel'])->id);

        $this->server()->tool(GetContent::class, ['type' => 'project', 'id' => $project->id])
            ->assertOk()->assertSee(['With tags', 'Laravel']);
    }

    public function test_get_content_reports_a_missing_record(): void
    {
        $this->server()->tool(GetContent::class, ['type' => 'project', 'id' => 999])
            ->assertHasErrors(['No project with id 999.']);
    }

    public function test_create_project_with_featured_hidden_date_and_tags(): void
    {
        $tag = Tag::create(['icon_name' => 'Code', 'name' => 'PHP']);

        $this->server()->tool(CreateContent::class, [
            'type' => 'project',
            'data' => [
                'icon_name' => 'Rocket',
                'title' => 'New project',
                'featured' => true,
                'hidden' => true,
                'date' => '2026-09-01',
                'tags' => [$tag->id],
            ],
        ])->assertOk()->assertHasNoErrors()->assertSee('New project');

        $project = Project::where('title', 'New project')->firstOrFail();
        $this->assertTrue((bool) $project->featured);
        $this->assertTrue((bool) $project->hidden);
        $this->assertSame('2026-09-01', substr($project->date, 0, 10));
        $this->assertSame([$tag->id], $project->tags->pluck('id')->all());
    }

    public function test_create_project_validation_errors_use_the_form_messages_and_write_nothing(): void
    {
        $this->server()->tool(CreateContent::class, [
            'type' => 'project',
            'data' => ['icon_name' => 'NotAnIcon', 'title' => '', 'repo_link' => 'not a url', 'tags' => [999]],
        ])->assertHasErrors([
            'Invalid icon selection.',
            'Project title is required.',
            'Please enter a valid repository.',
            'Invalid tag selection.',
        ]);

        $this->assertSame(0, Project::count());
    }

    public function test_create_rejects_a_read_only_type(): void
    {
        $this->server()->tool(CreateContent::class, ['type' => 'image', 'data' => ['url' => '/x.png']])
            ->assertHasErrors();
    }

    public function test_update_project_changes_only_the_given_fields(): void
    {
        $tag = Tag::create(['icon_name' => 'Code', 'name' => 'PHP']);
        $project = $this->project(['title' => 'Before', 'subtitle' => 'Keep me', 'date' => '2020-01-01']);
        $project->tags()->attach($tag->id);

        $this->server()->tool(UpdateContent::class, [
            'type' => 'project',
            'id' => $project->id,
            'data' => ['featured' => true, 'hidden' => true, 'date' => '2025-05-05'],
        ])->assertOk()->assertHasNoErrors();

        $project->refresh();
        $this->assertSame('Before', $project->title);
        $this->assertSame('Keep me', $project->subtitle);
        $this->assertTrue((bool) $project->featured);
        $this->assertTrue((bool) $project->hidden);
        $this->assertSame('2025-05-05', substr($project->date, 0, 10));
        $this->assertSame([$tag->id], $project->tags->pluck('id')->all());
    }

    public function test_update_project_validation_errors_write_nothing(): void
    {
        $project = $this->project(['title' => 'Before']);

        $this->server()->tool(UpdateContent::class, [
            'type' => 'project',
            'id' => $project->id,
            'data' => ['title' => '', 'demo_link' => 'nope'],
        ])->assertHasErrors(['Project title is required.', 'Please enter a valid demo URL.']);

        $this->assertSame('Before', $project->fresh()->title);
    }

    public function test_create_and_update_a_tag_with_projects(): void
    {
        $project = $this->project();
        $group = SkillGroup::create(['name' => 'Backend', 'sort_order' => 1]);

        $this->server()->tool(CreateContent::class, [
            'type' => 'tag',
            'data' => ['icon_name' => 'Database', 'name' => 'MySQL', 'category' => 'tech', 'skill_group_id' => $group->id, 'projects' => [$project->id]],
        ])->assertOk()->assertHasNoErrors();

        $tag = Tag::where('name', 'MySQL')->firstOrFail();
        $this->assertSame([$project->id], $tag->projects->pluck('id')->all());

        $this->server()->tool(UpdateContent::class, ['type' => 'tag', 'id' => $tag->id, 'data' => ['category' => 'skill']])
            ->assertOk()->assertHasNoErrors();
        $this->assertSame('skill', $tag->fresh()->category);
        $this->assertSame([$project->id], $tag->fresh()->projects->pluck('id')->all());
    }

    public function test_tag_validation_rejects_an_unknown_category(): void
    {
        $this->server()->tool(CreateContent::class, [
            'type' => 'tag',
            'data' => ['icon_name' => 'Database', 'name' => 'MySQL', 'category' => 'frontend'],
        ])->assertHasErrors(['Invalid category selected.']);

        $this->assertSame(0, Tag::count());
    }

    public function test_update_project_tags_attaches_and_detaches(): void
    {
        $project = $this->project();
        [$keep, $drop, $add] = collect(['Keep', 'Drop', 'Add'])
            ->map(fn ($name) => Tag::create(['icon_name' => 'Code', 'name' => $name]))->all();
        $project->tags()->attach([$keep->id, $drop->id]);

        $this->server()->tool(UpdateProjectTags::class, [
            'project_id' => $project->id,
            'attach' => [$add->id],
            'detach' => [$drop->id],
        ])->assertOk()->assertHasNoErrors();

        $this->assertEqualsCanonicalizing([$keep->id, $add->id], $project->tags()->pluck('tags.id')->all());
    }

    public function test_update_project_tags_rejects_unknown_tags(): void
    {
        $project = $this->project();

        $this->server()->tool(UpdateProjectTags::class, ['project_id' => $project->id, 'attach' => [999]])
            ->assertHasErrors(['Invalid tag selection.']);
    }

    public function test_delete_and_restore_a_project(): void
    {
        $project = $this->project();

        $this->server()->tool(DeleteContent::class, ['type' => 'project', 'id' => $project->id])->assertOk()->assertHasNoErrors();
        $this->assertSoftDeleted($project);

        $this->server()->tool(RestoreContent::class, ['type' => 'project', 'id' => $project->id])->assertOk()->assertHasNoErrors();
        $this->assertNotSoftDeleted($project);
    }

    public function test_deleting_a_skill_group_leaves_its_tags_ungrouped(): void
    {
        $group = SkillGroup::create(['name' => 'Backend', 'sort_order' => 1]);
        $tag = Tag::create(['icon_name' => 'Code', 'name' => 'PHP', 'skill_group_id' => $group->id]);

        $this->server()->tool(DeleteContent::class, ['type' => 'skill_group', 'id' => $group->id])->assertOk();

        $this->assertSoftDeleted($group);
        $this->assertNotSoftDeleted($tag);
        $this->assertNull($tag->fresh()->skill_group_id);
    }

    public function test_skill_group_create_and_update(): void
    {
        $this->server()->tool(CreateContent::class, ['type' => 'skill_group', 'data' => ['name' => 'Frontend', 'sort_order' => 2]])
            ->assertOk()->assertHasNoErrors();
        $group = SkillGroup::where('name', 'Frontend')->firstOrFail();

        $this->server()->tool(UpdateContent::class, ['type' => 'skill_group', 'id' => $group->id, 'data' => ['sort_order' => 0]])
            ->assertOk()->assertHasNoErrors();
        $this->assertSame(0, (int) $group->fresh()->sort_order);
        $this->assertSame('Frontend', $group->fresh()->name);
    }

    public function test_experience_create_update_and_validation(): void
    {
        $this->server()->tool(CreateContent::class, [
            'type' => 'experience',
            'data' => ['title' => 'Engineer', 'company' => 'Acme', 'date_ranges' => [['start' => '2024-01-01', 'end' => null]], 'bullets' => ['Built things']],
        ])->assertOk()->assertHasNoErrors();
        $experience = Experience::where('company', 'Acme')->firstOrFail();

        $this->server()->tool(UpdateContent::class, ['type' => 'experience', 'id' => $experience->id, 'data' => ['location' => 'Remote']])
            ->assertOk()->assertHasNoErrors();
        $this->assertSame('Remote', $experience->fresh()->location);
        $this->assertSame('Engineer', $experience->fresh()->title);

        $this->server()->tool(CreateContent::class, ['type' => 'experience', 'data' => ['title' => 'No dates', 'company' => 'X', 'date_ranges' => []]])
            ->assertHasErrors();
        $this->assertSame(1, Experience::count());
    }

    public function test_education_create_and_update(): void
    {
        $this->server()->tool(CreateContent::class, [
            'type' => 'education',
            'data' => ['title' => 'B.S. Computer Science', 'institution' => 'State U', 'graduation_date' => '2022-05-15'],
        ])->assertOk()->assertHasNoErrors();
        $education = Education::where('institution', 'State U')->firstOrFail();

        $this->server()->tool(UpdateContent::class, ['type' => 'education', 'id' => $education->id, 'data' => ['gpa' => '3.9']])
            ->assertOk()->assertHasNoErrors();
        $this->assertSame('3.9', $education->fresh()->gpa);
        $this->assertSame('2022-05-15', $education->fresh()->graduation_date->toDateString());
    }

    public function test_update_of_a_soft_deleted_record_is_refused(): void
    {
        $project = $this->project();
        $project->delete();

        $this->server()->tool(UpdateContent::class, ['type' => 'project', 'id' => $project->id, 'data' => ['title' => 'X']])
            ->assertHasErrors(["No project with id {$project->id}."]);
    }
}
