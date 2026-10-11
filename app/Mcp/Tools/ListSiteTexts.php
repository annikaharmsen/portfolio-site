<?php

namespace App\Mcp\Tools;

use App\Enums\SiteSection;
use App\Models\SiteText;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\Rule;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;

#[Name('list_site_texts')]
#[Description('List the site\'s editable texts as {path: text}, e.g. "intro.title". Optionally for one section.')]
#[IsReadOnly]
class ListSiteTexts extends CmsTool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'section' => ['nullable', Rule::enum(SiteSection::class)],
        ]);

        $query = SiteText::ordered();

        if (isset($validated['section'])) {
            $query->where('path', 'like', $validated['section'].'.%');
        }

        return $this->json((object) $query->pluck('text', 'path')->all());
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'section' => $schema->string()->enum(array_column(SiteSection::cases(), 'value')),
        ];
    }
}
