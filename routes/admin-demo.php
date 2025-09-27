<?php

use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TechnologyController;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Technology;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

if (config('demo.allow_manual_reset')){
    Route::post('/reset', [DemoController::class, 'reset'])->name('demo.reset');
}
Route::get('/status', [DemoController::class, 'status'])->name('demo.status');

Route::get('/', function () {
    return Inertia::render('admin/dashboard', [
        'projects' => Project::ordered()->get(),
        'skills' => Skill::get(),
        'technologies' => Technology::get(),
    ]);
})->name('home');

Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])->name('projects.bulk-delete');
Route::resource('projects', ProjectController::class);

Route::delete('skills/bulk-delete', [SkillController::class, 'bulkDelete'])->name('skills.bulk-delete');
Route::resource('skills', SkillController::class);

Route::delete('technologies/bulk-delete', [TechnologyController::class, 'bulkDelete'])->name('technologies.bulk-delete');
Route::resource('technologies', TechnologyController::class);

