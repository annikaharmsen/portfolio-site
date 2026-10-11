<?php

namespace App\Services\Cms;

use App\Models\Project;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

/**
 * Writes projects for the admin CMS and the admin MCP server, from data a form request has already validated.
 */
class ProjectService
{
    public function create(array $validated): Project
    {
        return DB::transaction(function () use ($validated) {
            $project = Project::create(Arr::except($validated, ['tags', 'inline']));
            $project->tags()->sync($validated['tags'] ?? []);

            return $project;
        });
    }

    /**
     * Tags are replaced only when the data has a `tags` key.
     */
    public function update(Project $project, array $validated): Project
    {
        return DB::transaction(function () use ($project, $validated) {
            $project->update(Arr::except($validated, ['tags']));

            if (array_key_exists('tags', $validated)) {
                $project->tags()->sync($validated['tags'] ?? []);
            }

            return $project;
        });
    }
}
