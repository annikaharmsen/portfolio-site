<?php

use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain('admin.' . env('APP_DOMAIN'))->middleware('auth')->group( function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
