<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\BulkDeleteTagsRequest;
use App\Http\Requests\Admin\StoreTagRequest;
use App\Http\Requests\Admin\UpdateTagRequest;
use App\Models\Project;
use App\Models\Tag;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::orderBy('category')->orderBy('name')->get();

        return Inertia::render('admin/tags/index', [
            'tags' => $tags
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/tags/create', [
            'projects' => Project::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();

        $tag = Tag::create($request->validated());

        $tag->projects()->sync($validated['projects']);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        return Inertia::render('admin/tags/show', [
            'tag' => $tag
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        return Inertia::render('admin/tags/edit', [
            'tag' => $tag->load('projects'),
            'projects' => Project::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $validated = $request->validated();

        $tag->update($validated);

        if (isset($validated['projects'])) $tag->projects()->sync($validated['projects']);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return;
    }

    public function bulkDelete(BulkDeleteTagsRequest $request)
    {
        $deletedCount = Tag::destroy($request->getTagIds());

        return back();
    }
}
