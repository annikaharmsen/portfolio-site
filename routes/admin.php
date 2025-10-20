<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TechnologyController;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard', [
            'projects' => Project::ordered()->get(),
            'tags' => Tag::get(),
        ]);
    })->name('home');

    Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])->name('projects.bulk-delete');
    Route::resource('projects', ProjectController::class);

    Route::delete('tags/bulk-delete', [TagController::class, 'bulkDelete'])->name('tags.bulk-delete');
    Route::resource('tags', TagController::class);

    Route::delete('skills/bulk-delete', [SkillController::class, 'bulkDelete'])->name('skills.bulk-delete');
    Route::resource('skills', SkillController::class);

    Route::delete('technologies/bulk-delete', [TechnologyController::class, 'bulkDelete'])->name('technologies.bulk-delete');
    Route::resource('technologies', TechnologyController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
