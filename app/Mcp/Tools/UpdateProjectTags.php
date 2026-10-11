<?php

namespace App\Mcp\Tools;

use App\Models\Project;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsIdempotent;

#[Name('update_project_tags')]
#[Description('Attach tags (skills and technologies) to a project and/or detach them, keeping its other tags.')]
#[IsIdempotent]
class UpdateProjectTags extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'project_id' => ['required', 'integer'],
            'attach' => ['array', 'distinct', 'exists:tags,id'],
            'detach' => ['array', 'distinct'],
            'detach.*' => ['integer'],
        ], [
            'attach' => 'Invalid tag selection.',
        ]);

        $project = Project::find($validated['project_id']);

        if (! $project) {
            return $this->notFound('project', $validated['project_id']);
        }

        $project->tags()->syncWithoutDetaching($validated['attach'] ?? []);
        $project->tags()->detach($validated['detach'] ?? []);

        return $this->json($project->load('tags'));
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'project_id' => $schema->integer()->required(),
            'attach' => $schema->array()->items($schema->integer())->description('Tag ids to add.'),
            'detach' => $schema->array()->items($schema->integer())->description('Tag ids to remove.'),
        ];
    }
}
