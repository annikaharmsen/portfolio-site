<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSiteTextRequest;
use App\Models\SiteText;
use App\Services\Cms\SiteTextService;
use Inertia\Inertia;

class SiteTextController extends Controller
{
    public function edit(string $section)
    {
        return Inertia::render('admin/sections/edit', [
            'section' => $section,
            'texts' => SiteText::getSection($section),
        ]);
    }

    public function update(UpdateSiteTextRequest $request, SiteTextService $siteTexts)
    {
        $validated = $request->validated();

        $siteTexts->set($validated['path'], $validated['text'] ?? null);

        $section = explode('.', $validated['path'], 2)[0];

        return redirect("/sections/{$section}/edit");
    }
}
