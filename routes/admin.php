<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectHeroSectionsController;
use App\Http\Controllers\SiteTextController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TechnologyController;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    // Dashboard route
    Route::get('/', function () {
        return Inertia::render('admin/dashboard', [
            'projects' => Project::ordered()->get(),
            'tags' => Tag::get(),
        ]);
    })->name('home');

    // Project routes
    Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])
        ->name('projects.bulk-delete');
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
    Route::resource('tags', TagController::class);

    Route::delete('skills/bulk-delete', [SkillController::class, 'bulkDelete'])
        ->name('skills.bulk-delete');
    Route::resource('skills', SkillController::class);

    Route::delete('technologies/bulk-delete', [TechnologyController::class, 'bulkDelete'])
        ->name('technologies.bulk-delete');
    Route::resource('technologies', TechnologyController::class);

    Route::get('sections/{section}/edit', [SiteTextController::class, 'edit'])
        ->name('section.edit')
        ->whereIn('section', ['intro', 'about', 'contact']);

    Route::put('text', [SiteTextController::class, 'update'])
        ->name('text.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
