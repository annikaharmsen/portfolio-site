<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteTagsRequest;
use App\Http\Requests\BulkDeleteTechnologiesRequest;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\StoreTechnologyRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Http\Requests\UpdateTechnologyRequest;
use App\Models\Project;
use App\Models\Tag;
use App\Models\Technology;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $technologies = Tag::whereIn('category', ['frontend', 'backend', 'tool'])->get();

        return Inertia::render('admin/technologies/index', [
            'technologies' => $technologies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/technologies/create', [
            'projects' => Project::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();

        $technology = Tag::create($request->validated());

        $technology->projects()->sync($validated['projects']);

        return Inertia::render('loading');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $technology)
    {
        return Inertia::render('admin/technologies/show', [
            'technology' => $technology
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $technology)
    {
        return Inertia::render('admin/technologies/edit', [
            'technology' => $technology->load('projects'),
            'projects' => Project::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $technology)
    {
        $validated = $request->validated();

        $technology->update($validated);

        if (isset($validated['projects'])) $technology->projects()->sync($validated['projects']);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $technology)
    {
        $technology->delete();

        return Inertia::render('loading');
    }

    public function bulkDelete(BulkDeleteTagsRequest $request)
    {
        $deletedCount = Tag::destroy($request->getTechnologyIds());

        return back();
    }
}
