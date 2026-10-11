<?php

namespace App\Mcp\Tools;

use App\Mcp\CmsContent;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;

#[Name('list_content')]
#[Description('List CMS records of one type, in the order the site shows them (projects: featured first, then newest date). Includes hidden projects. Use `trashed` to see soft-deleted records you can restore.')]
#[IsReadOnly]
class ListContent extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'type' => ['required', 'in:'.implode(',', CmsContent::types())],
            'trashed' => ['nullable', 'in:without,with,only'],
        ]);

        $records = CmsContent::query($validated['type'], $validated['trashed'] ?? 'without')->get();

        return $this->json($records);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'type' => $schema->string()->enum(CmsContent::types())->required(),
            'trashed' => $schema->string()->enum(['without', 'with', 'only'])
                ->description('without (default): live records only; with: live and soft-deleted; only: soft-deleted only'),
        ];
    }
}
