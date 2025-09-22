<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\BulkDeleteTechnologiesRequest;
use App\Http\Requests\Admin\StoreTechnologyRequest;
use App\Http\Requests\Admin\UpdateTechnologyRequest;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $technologies = Technology::orderBy('name')->get();

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
    public function store(StoreTechnologyRequest $request)
    {
        $validated = $request->validated();

        $technology = Technology::create($request->validated());

        $technology->projects()->sync($validated['projects']);

        return redirect(route('technologies.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Technology $technology)
    {
        return Inertia::render('admin/technologies/show', [
            'technology' => $technology
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Technology $technology)
    {
        return Inertia::render('admin/technologies/edit', [
            'technology' => $technology->load('projects'),
            'projects' => Project::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTechnologyRequest $request, Technology $technology)
    {
        $validated = $request->validated();

        $technology->update($validated);

        if (isset($validated['projects'])) $technology->projects()->sync($validated['projects']);

        return redirect(route('technologies.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology)
    {
        $technology->delete();

        return redirect(route('technologies.index'));;
    }

    public function bulkDelete(BulkDeleteTechnologiesRequest $request)
    {
        $deletedCount = Technology::destroy($request->getTechnologyIds());

        return;
    }
}
