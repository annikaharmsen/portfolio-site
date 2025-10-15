<?php

use App\Models\Project;
use App\Models\Skill;
use App\Models\Technology;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('portfolio', [
        'technologies' => Technology::whereNotNull('category')->orderBy('created_at', 'desc')->get(),
        'projects' => Project::with(['skills', 'technologies'])
                        ->orderBy('featured', 'desc')
                        ->orderBy('date', 'desc')
                        ->get()
    ]);
})->name('portfolio');

