<?php

namespace App\Mcp\Tools;

use App\Http\Requests\UpdateProjectHeroSectionsRequest;
use App\Models\Project;
use App\Services\Cms\HeroSectionService;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsDestructive;

#[Name('replace_hero_sections')]
#[Description('Set a project\'s hero sections (the blocks on its project page). The list replaces all of them: sections with the `id` of one of this project\'s sections are updated, sections without an id are created, and the project\'s sections left out are soft-deleted. Get the current ones with get_content type project; image ids come from list_content type image.')]
#[IsDestructive]
class ReplaceHeroSections extends CmsTool
{
    public function handle(Request $request, HeroSectionService $heroSections): Response
    {
        $rules = new UpdateProjectHeroSectionsRequest;
        $validated = $request->validate(
            ['project_id' => ['required', 'integer'], ...$rules->rules()],
            $rules->messages(),
        );

        $project = Project::find($validated['project_id']);

        if (! $project) {
            return $this->notFound('project', $validated['project_id']);
        }

        $heroSections->sync($project, $validated['hero_sections']);

        return $this->json($project->load('hero_sections.image')->hero_sections);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'project_id' => $schema->integer()->required(),
            'hero_sections' => $schema->array()->items($schema->object([
                'id' => $schema->integer()->description('An existing section of this project to update.'),
                'index' => $schema->integer()->description('Position, from 0; unique.')->required(),
                'heading' => $schema->string()->required(),
                'text' => $schema->string()->required(),
                'image_id' => $schema->integer()->nullable(),
            ]))->required(),
        ];
    }
}
