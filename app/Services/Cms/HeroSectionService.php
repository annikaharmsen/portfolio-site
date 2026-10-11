<?php

namespace App\Services\Cms;

use App\Models\Project;
use App\Models\ProjectHeroSection;
use Illuminate\Support\Facades\DB;

/**
 * Replaces a project's hero sections for the admin CMS and the admin MCP server, from validated data.
 */
class HeroSectionService
{
    /**
     * Sections with an `id` of this project are updated, the rest are created, and the project's sections
     * missing from the list are soft-deleted. An `id` of another project's section creates a new section.
     *
     * @param  array<int, array<string, mixed>>  $sections
     */
    public function sync(Project $project, array $sections): Project
    {
        return DB::transaction(function () use ($project, $sections) {
            $keptIds = [];

            foreach ($sections as $sectionData) {
                $section = isset($sectionData['id'])
                    ? $project->hero_sections()->find($sectionData['id'])
                    : null;
                $section ??= new ProjectHeroSection;

                unset($sectionData['id']);
                $section->fill($sectionData);
                $section->project_id = $project->id;
                $section->save();

                $keptIds[] = $section->id;
            }

            $project->hero_sections()->whereNotIn('id', $keptIds)->delete();

            return $project;
        });
    }
}
