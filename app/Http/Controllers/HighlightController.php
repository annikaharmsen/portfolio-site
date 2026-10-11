<?php

namespace App\Http\Controllers;

use App\Http\Requests\SyncHighlightsRequest;
use App\Models\Highlight;
use App\Services\Cms\HighlightService;
use Inertia\Inertia;

class HighlightController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/highlights/index', [
            'highlights' => Highlight::ordered()->pluck('text'),
        ]);
    }

    public function sync(SyncHighlightsRequest $request, HighlightService $highlights)
    {
        $highlights->replace($request->validated()['highlights']);

        return redirect()->route('highlights.index');
    }
}
