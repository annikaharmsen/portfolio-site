<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSiteTextRequest;
use App\Models\SiteText;
use Inertia\Inertia;

class SiteTextController extends Controller
{
    public function edit() {
        return Inertia::render('admin/text/edit');
    }

    public function update(UpdateSiteTextRequest $request) {
        $validated = $request->validated();

        $submittedIDs = [];
        $section = $validated['section'];
        foreach ($validated['texts'] as $textEntry) {
            $text = SiteText::findOrNew($textEntry['id'] ?? null);
            $text->fill($text);
            $text->section = $section;
            $text->save();

            $submittedIDs[] = $text->id;
        };

        // delete texts in section not in submission
        SiteText::where('section', '=', $section)->whereNotIn('id', $submittedIDs)->delete();

        return redirect("/text/edit")->with([
            'section' => $section
        ]);
    }
}
