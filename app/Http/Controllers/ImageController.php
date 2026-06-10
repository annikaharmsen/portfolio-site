<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Models\Image;
use App\Services\ImageProcessingService;
use Inertia\Inertia;
use Storage;

class ImageController extends Controller
{
    public function __construct(
        private ImageProcessingService $imageProcessing,
    ) {}

    public function index()
    {
        return Inertia::render('admin/images', ['images' => Image::all()]);
    }

    public function edit(Image $image)
    {
        return Inertia::render('admin/images', ['images' => Image::all(), 'default_image_id' => $image->id]);
    }

    public function store(StoreImageRequest $request)
    {
        $validated = $request->validated();

        $url = $this->imageProcessing->processAndStore($request->file('image'));

        $img = Image::create([
            'url' => $url,
            'alt' => $validated['alt'],
        ]);

        return back()->with('defaultImage', $img);
    }

    public function update(UpdateImageRequest $request, Image $image)
    {
        $image->update($request->validated());

        return back();
    }

    public function destroy(Image $image)
    {
        Storage::disk('public')->delete(str_replace('/storage/', '', $image->url));
        $image->delete();

        return back();
    }
}
