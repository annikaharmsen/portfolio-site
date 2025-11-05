<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSiteTextRequest;
use App\Models\SiteText;
use Inertia\Inertia;

class SiteTextController extends Controller
{
    public function edit() {
        return Inertia::render('admin/text/edit', [
            'texts' => SiteText::allNested()
        ]);
    }

    public function update(UpdateSiteTextRequest $request) {
        $validated = $request->validated();

        $section = $validated['section'];
        $slot = $validated['slot'];
        $text = $validated['text'];

        // (soft) delete existing record
        SiteText::where('section', $section)->where('slot', $slot)->delete();

        // create new record if text is not nullish
        if ($text) SiteText::create($validated);

        return redirect("/text/edit")->with([
            'section' => $section
        ]);
    }
}
