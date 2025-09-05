<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDeleteProjectsRequest;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Skill;
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
            'skills' => Skill::all()
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        $project = Project::create($validated);

        $project->skills()->sync($validated['skills']);

        return redirect(route('projects.show', [
            'project' => $project
        ]));
    }

    public function show(Project $project)
    {
        return Inertia::render('admin/projects/show', [
            'project' => $project
        ]);
    }

    public function edit(Project $project) {
        return Inertia::render('admin/projects/edit', [
            'project' => $project,
            'skills' => Skill::all()
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update($validated);

        if (isset($validated['skills'])) $project->skills()->sync($validated['skills']);

        return;
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return;
    }

    public function bulkDelete(BulkDeleteProjectsRequest $request)
    {
        $deletedCount = Project::destroy($request->getProjectIds());

        return;
    }
}
