<?php

namespace App\Mcp\Tools;

use App\Mcp\CmsContent;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsDestructive;

#[Name('delete_content')]
#[Description('Soft-delete a CMS record; restore_content brings it back. Deleting a skill group leaves its tags ungrouped. To only hide a project from the site, update it with hidden: true instead.')]
#[IsDestructive]
class DeleteContent extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'type' => ['required', 'in:'.implode(',', CmsContent::writableTypes())],
            'id' => ['required', 'integer'],
        ]);

        $record = CmsContent::find($validated['type'], $validated['id']);

        if (! $record) {
            return $this->notFound($validated['type'], $validated['id']);
        }

        CmsContent::delete($validated['type'], $record);

        return Response::text("Soft-deleted {$validated['type']} {$validated['id']}.");
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'type' => $schema->string()->enum(CmsContent::writableTypes())->required(),
            'id' => $schema->integer()->required(),
        ];
    }
}
