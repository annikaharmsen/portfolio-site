<?php

use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TechnologyController;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Technology;
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
        'skills' => Skill::get(),
        'technologies' => Technology::get(),
    ]);
})->name('demo.home');

Route::delete('projects/bulk-delete', [ProjectController::class, 'bulkDelete'])->name('demo.projects.bulk-delete');
Route::resource('projects', ProjectController::class)->names('demo.projects');

Route::delete('skills/bulk-delete', [SkillController::class, 'bulkDelete'])->name('demo.skills.bulk-delete');
Route::resource('skills', SkillController::class)->names('demo.skills');

Route::delete('technologies/bulk-delete', [TechnologyController::class, 'bulkDelete'])->name('demo.technologies.bulk-delete');
Route::resource('technologies', TechnologyController::class)->names('demo.technologis');

