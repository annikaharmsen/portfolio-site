<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkDeleteProjectsRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Response;
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
        return Inertia::render('admin/projects/create');
    }

    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->validated());

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
            'project' => $project
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return redirect(route('projects.show', [
            'project' => $project
        ]));
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
