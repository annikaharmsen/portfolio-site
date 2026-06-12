<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteProjectsRequest;
use App\Http\Requests\BulkUpdateProjectCategoryRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Tag;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::ordered()->get(),
            'categories' => Project::whereNotNull('category')->distinct()->pluck('category')->sort()->values(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/create', [
            'tags' => Tag::all(),
            'categories' => Project::whereNotNull('category')->distinct()->pluck('category')->sort()->values(),
            'tagCategories' => Tag::whereNotNull('category')->distinct()->pluck('category')->sort()->values(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        $project = Project::create($validated);

        $project->tags()->sync($validated['tags'] ?? []);

        if ($request->boolean('inline')) {
            return back();
        }

        return redirect("/projects/{$project->id}");
    }

    public function show(Project $project)
    {
        return Inertia::render('admin/projects/show', [
            'project' => $project->load('tags'),
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project->load('tags'),
            'tags' => Tag::all(),
            'categories' => Project::whereNotNull('category')->distinct()->pluck('category')->sort()->values(),
            'tagCategories' => Tag::whereNotNull('category')->distinct()->pluck('category')->sort()->values(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update($validated);

        if (isset($validated['tags'])) {
            $project->tags()->sync($validated['tags']);
        }

        return redirect("/projects/{$project->id}");
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect('/projects');
    }

    public function bulkDelete(BulkDeleteProjectsRequest $request)
    {
        Project::destroy($request->getIds());

        return redirect('/projects');
    }

    public function bulkUpdateCategory(BulkUpdateProjectCategoryRequest $request)
    {
        Project::whereIn('id', $request->getIds())
            ->update(['category' => $request->validated()['category']]);

        return redirect('/projects');
    }
}
