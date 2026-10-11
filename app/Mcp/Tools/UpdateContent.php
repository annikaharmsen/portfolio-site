<?php

namespace App\Mcp\Tools;

use App\Mcp\CmsContent;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsIdempotent;

#[Name('update_content')]
#[Description('Update a live CMS record. Send only the fields to change; they are validated with the admin form rules together with the current values. `tags` on a project and `projects` on a tag replace the whole list (use update_project_tags to add or remove a few). Fields per type:
'.CmsContent::FIELDS)]
#[IsIdempotent]
class UpdateContent extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'type' => ['required', 'in:'.implode(',', CmsContent::writableTypes())],
            'id' => ['required', 'integer'],
            'data' => ['required', 'array'],
        ]);

        $record = CmsContent::find($validated['type'], $validated['id']);

        if (! $record) {
            return $this->notFound($validated['type'], $validated['id']);
        }

        $record = CmsContent::update($validated['type'], $record, $validated['data']);

        return $this->json(CmsContent::withRelations($validated['type'], $record));
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'type' => $schema->string()->enum(CmsContent::writableTypes())->required(),
            'id' => $schema->integer()->required(),
            'data' => $schema->object()->description('Only the fields to change.')->required(),
        ];
    }
}
