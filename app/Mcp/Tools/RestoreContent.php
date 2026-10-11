<?php

namespace App\Mcp\Tools;

use App\Mcp\CmsContent;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsIdempotent;

#[Name('restore_content')]
#[Description('Restore a soft-deleted CMS record (find them with list_content trashed: only).')]
#[IsIdempotent]
class RestoreContent extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'type' => ['required', 'in:'.implode(',', CmsContent::writableTypes())],
            'id' => ['required', 'integer'],
        ]);

        $record = CmsContent::find($validated['type'], $validated['id'], withTrashed: true);

        if (! $record) {
            return $this->notFound($validated['type'], $validated['id']);
        }

        $record->restore();

        return $this->json(CmsContent::withRelations($validated['type'], $record));
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'type' => $schema->string()->enum(CmsContent::writableTypes())->required(),
            'id' => $schema->integer()->required(),
        ];
    }
}
