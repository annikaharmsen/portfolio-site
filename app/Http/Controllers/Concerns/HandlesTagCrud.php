<?php

namespace App\Http\Controllers\Concerns;

use App\Http\Requests\BulkDeleteTagsRequest;
use App\Http\Requests\BulkUpdateTagGroupRequest;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\SkillGroup;
use App\Models\Tag;
use Inertia\Inertia;

trait HandlesTagCrud
{
    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();

        $tag = Tag::create($validated);
        $tag->projects()->sync($validated['projects']);

        return redirect()->route('tags.index');
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

    public function bulkUpdateGroup(BulkUpdateTagGroupRequest $request)
    {
        $tagIds = $request->getIds();

        // capture old groups before reassigning
        $oldGroupIds = Tag::whereIn('id', $tagIds)
            ->whereNotNull('skill_group_id')
            ->pluck('skill_group_id')
            ->unique();

        Tag::whereIn('id', $tagIds)
            ->update(['skill_group_id' => $request->validated()['skill_group_id']]);

        // delete old groups that are now empty
        SkillGroup::whereIn('id', $oldGroupIds)
            ->whereDoesntHave('tags')
            ->delete();

        return back();
    }
}
