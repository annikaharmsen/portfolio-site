<?php

namespace App\Mcp\Tools;

use App\Mcp\CmsContent;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;

#[Name('create_content')]
#[Description('Create a CMS record. Validated with the admin form rules. Fields per type:
'.CmsContent::FIELDS)]
class CreateContent extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'type' => ['required', 'in:'.implode(',', CmsContent::writableTypes())],
            'data' => ['required', 'array'],
        ]);

        $record = CmsContent::create($validated['type'], $validated['data']);

        return $this->json(CmsContent::withRelations($validated['type'], $record));
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'type' => $schema->string()->enum(CmsContent::writableTypes())->required(),
            'data' => $schema->object()->description('The record\'s fields; see the tool description.')->required(),
        ];
    }
}
