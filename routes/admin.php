<?php

use App\Http\Controllers\EducationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectHeroSectionsController;
use App\Http\Controllers\SiteTextController;
use App\Http\Controllers\SkillGroupController;
use App\Http\Controllers\TagController;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    // Dashboard route
    Route::get('/', function () {
        return Inertia::render('admin/dashboard', [
            'projects' => Project::ordered()->get(),
            'tags' => Tag::with('skillGroup')->get(),
            'skillGroups' => SkillGroup::ordered()->get(),
        ]);
    })->name('home');

    // Project routes
    Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])
        ->name('projects.bulk-delete');
    Route::patch('projects/bulk-update-category', [ProjectController::class, 'bulkUpdateCategory'])
        ->name('projects.bulk-update-category');
    Route::resource('projects', ProjectController::class);

    // Project hero section routes
    Route::prefix('projects/{project}/hero-sections')
        ->name('projects.hero-sections.')
        ->controller(ProjectHeroSectionsController::class)
        ->group(function () {
            Route::get('/', 'edit')->name('edit');
            Route::put('/', 'update')->name('update');
        });

    // Image routes
    Route::resource('images', ImageController::class)
        ->only(['index', 'edit', 'store', 'update', 'destroy']);

    // Tag routes
    Route::delete('tags/bulk-delete', [TagController::class, 'bulkDelete'])
        ->name('tags.bulk-delete');
    Route::patch('tags/bulk-update-category', [TagController::class, 'bulkUpdateCategory'])
        ->name('tags.bulk-update-category');
    Route::resource('tags', TagController::class);

    Route::get('sections/{section}/edit', [SiteTextController::class, 'edit'])
        ->name('section.edit')
        ->whereIn('section', ['intro', 'about', 'contact']);

    Route::put('text', [SiteTextController::class, 'update'])
        ->name('text.update');

    // Skill group routes
    Route::post('skill-groups', [SkillGroupController::class, 'store'])
        ->name('skill-groups.store');
    Route::put('skill-groups/{skill_group}', [SkillGroupController::class, 'update'])
        ->name('skill-groups.update');
    Route::delete('skill-groups/{skill_group}', [SkillGroupController::class, 'destroy'])
        ->name('skill-groups.destroy');

    // Education routes
    Route::get('educations', [EducationController::class, 'index'])
        ->name('educations.index');
    Route::post('educations', [EducationController::class, 'store'])
        ->name('educations.store');
    Route::put('educations/{education}', [EducationController::class, 'update'])
        ->name('educations.update');
    Route::delete('educations/{education}', [EducationController::class, 'destroy'])
        ->name('educations.destroy');

    // Experience routes
    Route::get('experiences', [ExperienceController::class, 'index'])
        ->name('experiences.index');
    Route::post('experiences', [ExperienceController::class, 'store'])
        ->name('experiences.store');
    Route::put('experiences/{experience}', [ExperienceController::class, 'update'])
        ->name('experiences.update');
    Route::delete('experiences/{experience}', [ExperienceController::class, 'destroy'])
        ->name('experiences.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
