<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectHeroSectionsRequest;
use App\Models\Project;
use App\Models\ProjectHeroSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectHeroSectionsController extends Controller
{
    public function edit(Project $project) {
        return Inertia::render('admin/projects/hero-sections/edit', [
            'project' => $project->load( 'heroSections')
        ]);
    }

    public function update(UpdateProjectHeroSectionsRequest $request, Project $project) {
        $validated = $request->validated();

        $submittedIDs = [];
        foreach ($validated['hero_sections'] as $sectionData) {
            $section = ProjectHeroSection::findOrNew($sectionData['id'] ?? null);
            $section->fill($sectionData);
            $section->project_id = $project->id;
            $section->save();

            $submittedIDs[] = $section->id;
        };

        // Delete sections not in submission
        $project->heroSections()->whereNotIn('id', $submittedIDs)->delete();

        return back();
    }
}
