<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Models\Image;
use Inertia\Inertia;
use Storage;

class ImageController extends Controller
{

    public function index() {
        return Inertia::render('admin/images', ['images' => Image::all()]);
    }

    public function edit(Image $image) {
        return Inertia::render('admin/images', ['images' => Image::all(), 'default_image' => $image]);
    }

    public function store(StoreImageRequest $request) {
        $validated = $request->validated();

        $path = $request->file('image')->store('images', 'public');

        $img = Image::create([
            'url'=> Storage::url($path),
            'alt' => $validated['alt'],
        ]);

        return back()->with('defaultImage', $img);
    }

    public function update(UpdateImageRequest $request, Image $image) {
        $validated = $request->validated();

        $image->update($validated);

        return back();
    }

    public function destroy(Image $image) {
          Storage::disk('public')->delete(str_replace('/storage/', '', $image->url));

          $image->delete();

          return back();
        }
}
