<?php

namespace App\Services\Cms;

use App\Models\Tag;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

/**
 * Writes tags (skills and technologies) for the admin CMS and the admin MCP server, from validated data.
 */
class TagService
{
    public function create(array $validated): Tag
    {
        return DB::transaction(function () use ($validated) {
            $tag = Tag::create(Arr::except($validated, ['projects', 'inline']));
            $tag->projects()->sync($validated['projects'] ?? []);

            return $tag;
        });
    }

    /**
     * Projects are replaced only when the data has a `projects` key.
     */
    public function update(Tag $tag, array $validated): Tag
    {
        return DB::transaction(function () use ($tag, $validated) {
            $tag->update(Arr::except($validated, ['projects']));

            if (array_key_exists('projects', $validated)) {
                $tag->projects()->sync($validated['projects'] ?? []);
            }

            return $tag;
        });
    }
}
