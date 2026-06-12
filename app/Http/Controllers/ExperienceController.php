<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Models\Experience;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/experience/index', [
            'experiences' => Experience::ordered()->get(),
        ]);
    }

    public function store(StoreExperienceRequest $request)
    {
        Experience::create($request->validated());

        return redirect('/experiences');
    }

    public function update(UpdateExperienceRequest $request, Experience $experience)
    {
        $experience->update($request->validated());

        return redirect('/experiences');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect('/experiences');
    }
}
