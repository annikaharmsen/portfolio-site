<?php

namespace App\Services\Cms;

use App\Models\SkillGroup;
use Illuminate\Support\Facades\DB;

/**
 * Deletes skill groups for the admin CMS and the admin MCP server.
 */
class SkillGroupService
{
    /**
     * Soft-deletes the group. Its tags stay, ungrouped.
     */
    public function delete(SkillGroup $skillGroup): void
    {
        DB::transaction(function () use ($skillGroup) {
            $skillGroup->tags()->update(['skill_group_id' => null]);
            $skillGroup->delete();
        });
    }
}
