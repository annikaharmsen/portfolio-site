<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\BulkDeleteTagsRequest;
use App\Http\Requests\Admin\StoreTagRequest;
use App\Http\Requests\Admin\UpdateTagRequest;
use App\Models\Project;
use App\Models\Tag;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Tag::where('category', 'skill')->orderBy('name')->get();

        return Inertia::render('admin/skills/index', [
            'skills' => $skills
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/skills/create', [
            'projects' => Project::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();

        $skill = Tag::create($request->validated());

        $skill->projects()->sync($validated['projects']);

        return Inertia::render('loading');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $skill)
    {
        return Inertia::render('admin/skills/show', [
            'skill' => $skill
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $skill)
    {
        return Inertia::render('admin/skills/edit', [
            'skill' => $skill->load('projects'),
            'projects' => Project::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $skill)
    {
        $validated = $request->validated();

        $skill->update($validated);

        if (isset($validated['projects'])) $skill->projects()->sync($validated['projects']);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $skill)
    {
        $skill->delete();

        return Inertia::render('loading');
    }

    public function bulkDelete(BulkDeleteTagsRequest $request)
    {
        $deletedCount = Tag::destroy($request->getSkillIds());

        return back();
    }
}
