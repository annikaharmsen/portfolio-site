<?php

use App\Models\Project;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('portfolio', [
        'tags' => Tag::whereNotNull('category')->orderBy('created_at', 'desc')->get(),
        'projects' => Project::with(['tags'])
                        ->orderBy('featured', 'desc')
                        ->orderBy('date', 'desc')
                        ->get()
    ]);
})->name('portfolio');

