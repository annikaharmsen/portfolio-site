<?php

use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('portfolio', [
              'projects' => Project::with(['skills', 'technologies'])
                             ->orderBy('featured', 'desc')
                             ->orderBy('date', 'desc')
                             ->get()
            ]);
})->name('portfolio');


