<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Models\Image;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Storage;

class ImageController extends Controller
{

    public function index() {
        return Inertia::render('admin/images', ['images' => Image::all()]);
    }

    public function edit(Image $image) {
        return Inertia::render('admin/images', ['images' => Image::all(), 'default_image_id' => $image->id]);
    }

    public function store(StoreImageRequest $request) {
        $validated = $request->validated();

        // process and optimize image
        $manager = new ImageManager(new Driver());
        $uploadedFile = $request->file('image');
        $image = $manager->read($uploadedFile);

        // resize large images
        $maxWidth = 1920;
        $maxHeight = 1920;

        $image->scaleDown(width: $maxWidth, height: $maxHeight);

        // generate filename
        $filename = uniqid() . '.webp';
        $path = "images/{$filename}";

        // save optimized image as WebP with 85% quality
        Storage::disk('public')->put(
            $path,
            (string) $image->toWebp(quality: 85)
        );

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
