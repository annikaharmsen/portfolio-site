<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\StoreSkillRequest;
use App\Http\Requests\Admin\UpdateSkillRequest;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::orderBy('name')->get();

        return Inertia::render('admin/skills/index', [
            'skills' => $skills
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/skills/create', [
            'projects' => Project::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSkillRequest $request)
    {
        $validated = $request->validated();

        $skill = Skill::create($request->validated());

        $skill->projects()->sync($validated['projects']);

        return;
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        return Inertia::render('admin/skills/show', [
            'skill' => $skill
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Skill $skill)
    {
        return Inertia::render('admin/skills/edit', [
            'skill' => $skill,
            'projects' => Project::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSkillRequest $request, Skill $skill)
    {
        $skill->update($request->validated());

        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        $skill->delete();

        return;
    }
}
