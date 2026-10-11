<?php

namespace App\Mcp\Tools;

use App\Http\Requests\UpdateSiteTextRequest;
use App\Services\Cms\SiteTextService;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tools\Annotations\IsIdempotent;

#[Name('set_site_text')]
#[Description('Set the site text at a path such as "intro.title" or "about.paragraph_1" (sections: intro, about, skills, projects, contact). Empty or null text removes it.')]
#[IsIdempotent]
class SetSiteText extends CmsTool
{
    public function handle(Request $request, SiteTextService $siteTexts): Response
    {
        $rules = new UpdateSiteTextRequest;
        $validated = $request->validate($rules->rules(), $rules->messages());

        $siteText = $siteTexts->set($validated['path'], $validated['text'] ?? null);

        return $siteText
            ? $this->json($siteText)
            : Response::text("Removed the text at {$validated['path']}.");
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'path' => $schema->string()->required(),
            'text' => $schema->string()->nullable(),
        ];
    }
}
