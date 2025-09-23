<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDeleteProjectsRequest;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Technology;
use Illuminate\Support\Facades\Log;
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
            'skills' => Skill::all(),
            'technologies' => Technology::all(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        $project = Project::create($validated);

        $project->skills()->sync($validated['skills']);
        $project->technologies()->sync($validated['technologies']);

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
            'project' => $project->load('skills', 'technologies'),
            'skills' => Skill::all(),
            'technologies' => Technology::all(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update($validated);

        if (isset($validated['skills'])) $project->skills()->sync($validated['skills']);
        if (isset($validated['technologies'])) $project->technologies()->sync($validated['technologies']);

        return;
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect(route('projects.index'));;
    }

    public function bulkDelete(BulkDeleteProjectsRequest $request)
    {
        $deletedCount = Project::destroy($request->getProjectIds());

        return;
    }
}
