<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesTagCrud;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\Tag;
use Inertia\Inertia;

class TagController extends Controller
{
    use HandlesTagCrud;

    public function index()
    {
        return Inertia::render('admin/tags/index', [
            'tags' => Tag::with('skillGroup')->get(),
            'skillGroups' => SkillGroup::ordered()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/tags/create', [
            'projects' => Project::all(),
            'categories' => Tag::whereNotNull('category')->distinct()->pluck('category')->sort()->values(),
        ]);
    }

    public function show(Tag $tag)
    {
        return Inertia::render('admin/tags/show', [
            'tag' => $tag,
        ]);
    }

    public function edit(Tag $tag)
    {
        return Inertia::render('admin/tags/edit', [
            'tag' => $tag->load('projects'),
            'projects' => Project::all(),
            'categories' => Tag::whereNotNull('category')->distinct()->pluck('category')->sort()->values(),
        ]);
    }

    public function update(UpdateTagRequest $request, Tag $tag)
    {
        return $this->updateTag($request, $tag);
    }

    public function destroy(Tag $tag)
    {
        return $this->destroyTag($tag);
    }
}
