<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectHeroSectionsController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TechnologyController;
use App\Models\Project;
use App\Models\Tag;
use App\Services\DemoService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

if (config('demo.allow_manual_reset')){
    Route::post('/reset', function(DemoService $demoService) {
        $demoService->reset();
    })->name('demo.reset');
}

Route::get('/', function () {
    return Inertia::render('admin/dashboard', [
        'projects' => Project::ordered()->get(),
        'tags' => Tag::get(),
    ]);
})->name('demo.home');

// Project routes
Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])->name('demo.projects.bulk-delete');
Route::resource('projects', ProjectController::class)->names('demo.projects');

// Project hero section routes
Route::prefix('projects/{project}/hero-sections')
    ->name('demo.projects.hero-sections.')
    ->controller(ProjectHeroSectionsController::class)
    ->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::put('/', 'update')->name('update');
    });

// Image routes
Route::resource('images', ImageController::class)
    ->only(['index', 'edit', 'store', 'update', 'destroy'])
    ->names('demo.images');

// Tag routes
Route::delete('tags/bulk-delete', [TagController::class, 'bulkDelete'])->name('demo.tags.bulk-delete');
Route::resource('tags', TagController::class)->names('demo.tags');

// Skill routes
Route::delete('skills/bulk-delete', [SkillController::class, 'bulkDelete'])->name('demo.skills.bulk-delete');
Route::resource('skills', SkillController::class)->names('demo.skills');

// Technology routes
Route::delete('technologies/bulk-delete', [TechnologyController::class, 'bulkDelete'])->name('demo.technologies.bulk-delete');
Route::resource('technologies', TechnologyController::class)->names('demo.technologies');

