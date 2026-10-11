<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSkillGroupRequest;
use App\Http\Requests\UpdateSkillGroupRequest;
use App\Models\SkillGroup;
use App\Services\Cms\SkillGroupService;

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

    public function destroy(SkillGroup $skillGroup, SkillGroupService $skillGroups)
    {
        $skillGroups->delete($skillGroup);

        return redirect()->route('skill-groups.index');
    }
}
