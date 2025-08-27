<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::orderBy('featured', 'desc')
                             ->orderBy('date', 'desc')
                             ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin.projects.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'icon_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'repo_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'featured' => 'boolean',
            'date' => 'nullable|date'
        ]);

        Project::create($validated);

        return redirect()->route('dashboard')->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
        return Inertia::render('admin.projects.show', [
            'project' => $project->load(['skills', 'technologies'])
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin.projects.edit', [
            'project' => $project->load(['skills', 'technologies'])
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'icon_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'repo_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'featured' => 'boolean',
            'date' => 'nullable|date'
        ]);

        $project->update($validated);

        return redirect()->route('dashboard')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return back()->with('success', 'Project deleted successfully.');
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:projects,id'
        ]);

        $deletedCount = Project::destroy($validated['ids']);

        return back()->with('success', "{$deletedCount} projects deleted successfully.");
    }
}
