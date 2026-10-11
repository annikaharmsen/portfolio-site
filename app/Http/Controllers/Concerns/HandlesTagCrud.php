<?php

namespace App\Http\Controllers\Concerns;

use App\Http\Requests\BulkDeleteTagsRequest;
use App\Http\Requests\BulkUpdateTagGroupRequest;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\SkillGroup;
use App\Models\Tag;
use App\Services\Cms\TagService;

trait HandlesTagCrud
{
    public function store(StoreTagRequest $request, TagService $tags)
    {
        $tags->create($request->validated());

        if ($request->boolean('inline')) {
            return back();
        }

        return redirect()->route('tags.index');
    }

    protected function updateTag(UpdateTagRequest $request, Tag $tag)
    {
        app(TagService::class)->update($tag, $request->validated());

        return redirect()->route('tags.index');
    }

    protected function destroyTag(Tag $tag)
    {
        $tag->delete();

        return redirect()->route('tags.index');
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
