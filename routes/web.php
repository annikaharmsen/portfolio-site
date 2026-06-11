<?php

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteText;
use App\Models\SkillGroup;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('portfolio', [
        'texts' => SiteText::getAll(),
        'skillGroups' => SkillGroup::with('tags')->ordered()->get(),
        'user' => User::first(),
        'projects' => Project::with(['tags', 'hero_sections'])
            ->where('hidden', false)
            ->orderBy('featured', 'desc')
            ->orderBy('date', 'desc')
            ->get(),
        'experiences' => Experience::ordered()->get(),
        'educations' => Education::ordered()->get(),
    ]);
})->name('portfolio');

Route::get('/projects/{project}', function (Project $project) {
    return Inertia::render('project-page', [
        'project' => $project->load(['hero_sections', 'hero_sections.image']),
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

if (app()->environment('local')) {
    Route::get('/resume/preview', [\App\Http\Controllers\ResumeController::class, 'preview'])
        ->name('resume.preview');
}
