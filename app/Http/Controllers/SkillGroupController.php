<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSkillGroupRequest;
use App\Http\Requests\UpdateSkillGroupRequest;
use App\Models\SkillGroup;

class SkillGroupController extends Controller
{
    public function store(StoreSkillGroupRequest $request)
    {
        SkillGroup::create($request->validated());

        return redirect()->back();
    }

    public function update(UpdateSkillGroupRequest $request, SkillGroup $skillGroup)
    {
        $skillGroup->update($request->validated());

        return redirect()->back();
    }

    public function destroy(SkillGroup $skillGroup)
    {
        // nullify tags so they become ungrouped rather than being deleted
        $skillGroup->tags()->update(['skill_group_id' => null]);
        $skillGroup->delete();

        return redirect()->route('skill-groups.index');
    }
}
