<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkDeleteProjectsRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Tag;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::ordered()->get();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects
        ]);
    }

    public function create() {
        return Inertia::render('admin/projects/create', [
            'tags' => Tag::all(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        $project = Project::create($validated);

        $project->tags()->sync($validated['tags']);

        return redirect("/projects/{$project->id}");
    }

    public function show(Project $project)
    {
        return Inertia::render('admin/projects/show', [
            'project' => $project->load('tags')
        ]);
    }

    public function edit(Project $project) {
        return Inertia::render('admin/projects/edit', [
            'project' => $project->load('tags'),
            'tags' => Tag::all(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update($validated);

        if (isset($validated['tags'])) $project->tags()->sync($validated['tags']);

        return redirect("/projects/{$project->id}");
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect('/projects');
    }

    public function bulkDelete(BulkDeleteProjectsRequest $request)
    {
        $deletedCount = Project::destroy($request->getProjectIds());

        return redirect('/projects');
    }
}
