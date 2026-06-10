<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesTagCrud;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Project;
use App\Models\Tag;
use Inertia\Inertia;

class SkillController extends Controller
{
    use HandlesTagCrud;

    public function index()
    {
        return Inertia::render('admin/skills/index', [
            'skills' => Tag::where('category', 'skill')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/skills/create', [
            'projects' => Project::all(),
        ]);
    }

    public function show(Tag $skill)
    {
        return Inertia::render('admin/skills/show', [
            'skill' => $skill,
        ]);
    }

    public function edit(Tag $skill)
    {
        return Inertia::render('admin/skills/edit', [
            'skill' => $skill->load('projects'),
            'projects' => Project::all(),
        ]);
    }

    public function update(UpdateTagRequest $request, Tag $skill)
    {
        return $this->updateTag($request, $skill);
    }

    public function destroy(Tag $skill)
    {
        return $this->destroyTag($skill);
    }
}
