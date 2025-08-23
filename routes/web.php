<?php

use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain('admin.' . env('APP_DOMAIN'))->group( function () {
    Route::resource('project', ProjectController::class);
}
);

Route::get('/', function () {
    return Inertia::render('portfolio', [
              'projects' => Project::with(['skills', 'technologies'])
                             ->orderBy('featured', 'desc')
                             ->orderBy('date', 'desc')
                             ->get()
            ]);
})->name('portfolio');
