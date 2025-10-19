<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TagController;
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

Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])->name('demo.projects.bulk-delete');
Route::resource('projects', ProjectController::class)->names('demo.projects');

Route::delete('tags/bulk-delete', [TagController::class, 'bulkDelete'])->name('demo.tags.bulk-delete');
Route::resource('tags', TagController::class)->names('demo.tags');

