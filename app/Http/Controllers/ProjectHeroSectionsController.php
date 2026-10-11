<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectHeroSectionsRequest;
use App\Models\Project;
use App\Services\Cms\HeroSectionService;
use Inertia\Inertia;

class ProjectHeroSectionsController extends Controller
{
    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/hero-sections/edit', [
            'project' => $project->load(['hero_sections', 'hero_sections.image']),
        ]);
    }

    public function update(UpdateProjectHeroSectionsRequest $request, Project $project, HeroSectionService $heroSections)
    {
        $heroSections->sync($project, $request->validated()['hero_sections']);

        return redirect("/projects/{$project->id}/edit");
    }
}
