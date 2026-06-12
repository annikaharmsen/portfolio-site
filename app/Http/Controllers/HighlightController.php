<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHighlightRequest;
use App\Http\Requests\UpdateHighlightRequest;
use App\Models\Highlight;
use Inertia\Inertia;

class HighlightController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/highlights/index', [
            'highlights' => Highlight::ordered()->get(),
        ]);
    }

    public function store(StoreHighlightRequest $request)
    {
        Highlight::create($request->validated());

        return redirect()->route('highlights.index');
    }

    public function update(UpdateHighlightRequest $request, Highlight $highlight)
    {
        $highlight->update($request->validated());

        return redirect()->route('highlights.index');
    }

    public function destroy(Highlight $highlight)
    {
        $highlight->delete();

        return redirect()->route('highlights.index');
    }
}
