<?php

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\SkillController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard', [
            'projects' => Project::orderBy('featured', 'desc')
                             ->orderBy('date', 'desc')
                             ->get()
        ]);
    })->name('home');

    Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])->name('projects.bulk-delete');
    Route::resource('projects', ProjectController::class);

    Route::resource('skills', SkillController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
