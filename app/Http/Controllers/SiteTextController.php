<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSiteTextRequest;
use App\Models\SiteText;
use Inertia\Inertia;

class SiteTextController extends Controller
{
    public function edit(string $section) {
        return Inertia::render('admin/sections/edit', [
            'section' => $section,
            'texts' => SiteText::getSection($section)
        ]);
    }

    public function update(UpdateSiteTextRequest $request) {
        $validated = $request->validated();

        $path = $validated['path'];
        $text = $validated['text'];

        // (soft) delete existing record
        SiteText::where('path', $path)->delete();

        // create new record if text is not nullish
        if ($text) SiteText::create($validated);

        $section = explode('.', $path, 2)[0];

        return redirect("/sections/{$section}/edit");
    }
}
