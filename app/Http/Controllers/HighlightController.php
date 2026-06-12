<?php

namespace App\Http\Controllers;

use App\Http\Requests\SyncHighlightsRequest;
use App\Models\Highlight;
use Inertia\Inertia;

class HighlightController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/highlights/index', [
            'highlights' => Highlight::ordered()->pluck('text'),
        ]);
    }

    public function sync(SyncHighlightsRequest $request)
    {
        Highlight::query()->delete();

        $rows = collect($request->validated()['highlights'])
            ->values()
            ->map(fn (string $text, int $index) => [
                'text' => $text,
                'sort_order' => $index,
            ])
            ->all();

        Highlight::insert($rows);

        return redirect()->route('highlights.index');
    }
}
