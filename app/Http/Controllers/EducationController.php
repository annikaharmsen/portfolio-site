<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Models\Education;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/education/index', [
            'educations' => Education::ordered()->get(),
        ]);
    }

    public function store(StoreEducationRequest $request)
    {
        Education::create($request->validated());

        return redirect()->route('educations.index');
    }

    public function update(UpdateEducationRequest $request, Education $education)
    {
        $education->update($request->validated());

        return redirect()->route('educations.index');
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return redirect()->route('educations.index');
    }
}
