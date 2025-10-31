<?php

use App\Models\Project;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('portfolio', [
        'tags' => Tag::whereNotNull('category')->orderBy('created_at', 'desc')->get(),
        'projects' => Project::with(['tags', 'hero_sections'])
                        ->orderBy('featured', 'desc')
                        ->orderBy('date', 'desc')
                        ->get()
    ]);
})->name('portfolio');

Route::get('/projects/{project}', function (Project $project) {
    return Inertia::render('project-page', [
        'project' => $project->load(['hero_sections', 'hero_sections.image'])
    ]);
});

Route::get('/resume', function () {
    $filename = env('RESUME_FILENAME');

    if (!$filename) {
        abort(404);
    }

    $filePath = storage_path('app/public/' . $filename);

    if (!file_exists($filePath)) {
        abort(404);
    }

    return response()->download($filePath, $filename);
})->name('resume.download');

