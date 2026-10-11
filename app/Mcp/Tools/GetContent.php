<?php

namespace App\Mcp\Tools;

use App\Mcp\CmsContent;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;

#[Name('get_content')]
#[Description('Get one CMS record with its relations: a project with its tags and hero sections, a tag with its projects and skill group, a skill group with its tags. Finds soft-deleted records too.')]
#[IsReadOnly]
class GetContent extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'type' => ['required', 'in:'.implode(',', CmsContent::types())],
            'id' => ['required', 'integer'],
        ]);

        $record = CmsContent::find($validated['type'], $validated['id'], withTrashed: true);

        if (! $record) {
            return $this->notFound($validated['type'], $validated['id']);
        }

        return $this->json(CmsContent::withRelations($validated['type'], $record));
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'type' => $schema->string()->enum(CmsContent::types())->required(),
            'id' => $schema->integer()->required(),
        ];
    }
}
