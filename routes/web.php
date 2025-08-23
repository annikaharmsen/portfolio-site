<?php

use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home', [
              'projects' => Project::with(['skills', 'technologies'])->get()
            ]);
})->name('home');
