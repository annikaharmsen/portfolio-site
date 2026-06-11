<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesTagCrud;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Project;
use App\Models\Tag;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    use HandlesTagCrud;

    public function index()
    {
        return Inertia::render('admin/technologies/index', [
            'technologies' => Tag::whereIn('category', ['frontend', 'backend', 'tool'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/technologies/create', [
            'projects' => Project::all(),
        ]);
    }

    public function show(Tag $technology)
    {
        return Inertia::render('admin/technologies/show', [
            'technology' => $technology,
        ]);
    }

    public function edit(Tag $technology)
    {
        return Inertia::render('admin/technologies/edit', [
            'technology' => $technology->load('projects'),
            'projects' => Project::all(),
        ]);
    }

    public function update(UpdateTagRequest $request, Tag $technology)
    {
        return $this->updateTag($request, $technology);
    }

    public function destroy(Tag $technology)
    {
        return $this->destroyTag($technology);
    }
}
