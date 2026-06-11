<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSkillGroupRequest;
use App\Http\Requests\UpdateSkillGroupRequest;
use App\Models\SkillGroup;
use Inertia\Inertia;

class SkillGroupController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/skill-groups/index', [
            'skillGroups' => SkillGroup::with('tags')->ordered()->get(),
        ]);
    }

    public function store(StoreSkillGroupRequest $request)
    {
        SkillGroup::create($request->validated());

        return redirect()->route('skill-groups.index');
    }

    public function update(UpdateSkillGroupRequest $request, SkillGroup $skillGroup)
    {
        $skillGroup->update($request->validated());

        return redirect()->route('skill-groups.index');
    }

    public function destroy(SkillGroup $skillGroup)
    {
        $skillGroup->delete();

        return redirect()->route('skill-groups.index');
    }
}
