<?php

use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteText;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('portfolio', [
        'texts' => SiteText::getAll(),
        'tags' => Tag::whereNotNull('category')->orderBy('created_at', 'desc')->get(),
        'projects' => Project::with(['tags', 'hero_sections'])
                        ->where('hidden', false)
                        ->orderBy('featured', 'desc')
                        ->orderBy('date', 'desc')
                        ->get(),
        'experiences' => Experience::ordered()->get(),
    ]);
})->name('portfolio');

Route::get('/projects/{project}', function (Project $project) {
    return Inertia::render('project-page', [
        'project' => $project->load(['hero_sections', 'hero_sections.image'])
    ]);
});

// temporary: flush opcache
Route::get('/flush-opcache', function () {
    if (function_exists('opcache_reset')) {
        opcache_reset();
        return 'OPcache flushed';
    }
    return 'OPcache not available';
});

Route::get('/resume', [\App\Http\Controllers\ResumeController::class, 'download'])
    ->name('resume.download');
