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

        $path = $validated['path'];
        $text = $validated['text'];

        // (soft) delete existing record
        SiteText::where('path', $path)->delete();

        // create new record if text is not nullish
        if ($text) SiteText::create($validated);

        return redirect("/text/edit")->with([
            'section' => explode('.', $path, 2)[0]
        ]);
    }
}
