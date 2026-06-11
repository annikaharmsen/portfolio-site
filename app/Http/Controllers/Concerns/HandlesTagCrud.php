<?php

namespace App\Http\Controllers\Concerns;

use App\Http\Requests\BulkDeleteTagsRequest;
use App\Http\Requests\BulkUpdateTagCategoryRequest;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use Inertia\Inertia;

trait HandlesTagCrud
{
    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();

        $tag = Tag::create($validated);
        $tag->projects()->sync($validated['projects']);

        return Inertia::render('loading');
    }

    protected function updateTag(UpdateTagRequest $request, Tag $tag)
    {
        $validated = $request->validated();

        $tag->update($validated);

        if (isset($validated['projects'])) {
            $tag->projects()->sync($validated['projects']);
        }

        return back();
    }

    protected function destroyTag(Tag $tag)
    {
        $tag->delete();

        return Inertia::render('loading');
    }

    public function bulkDelete(BulkDeleteTagsRequest $request)
    {
        Tag::destroy($request->getIds());

        return back();
    }

    public function bulkUpdateCategory(BulkUpdateTagCategoryRequest $request)
    {
        Tag::whereIn('id', $request->getIds())
            ->update(['category' => $request->validated()['category']]);

        return back();
    }
}
