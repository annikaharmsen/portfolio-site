<?php

namespace App\Mcp\Tools;

use App\Http\Requests\SyncHighlightsRequest;
use App\Models\Highlight;
use App\Services\Cms\HighlightService;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsDestructive;

#[Name('replace_highlights')]
#[Description('Set the resume highlights. The list replaces all current highlights, in order. Read them first with list_content type highlight.')]
#[IsDestructive]
class ReplaceHighlights extends CmsTool
{
    public function handle(Request $request, HighlightService $highlights): Response
    {
        $rules = new SyncHighlightsRequest;
        $validated = $request->validate($rules->rules(), $rules->messages());

        $highlights->replace($validated['highlights']);

        return $this->json(Highlight::ordered()->pluck('text'));
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'highlights' => $schema->array()->items($schema->string())->required(),
        ];
    }
}
