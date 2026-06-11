<?php

namespace App\Services;

use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Storage;

class ImageProcessingService
{
    public function processAndStore($uploadedFile, int $maxDimension = 1920, int $quality = 85): string
    {
        $manager = new ImageManager(new Driver);
        $image = $manager->read($uploadedFile);
        $image->scaleDown(width: $maxDimension, height: $maxDimension);

        $path = 'images/'.uniqid().'.webp';
        Storage::disk('public')->put($path, (string) $image->toWebp(quality: $quality));

        return Storage::url($path);
    }
}
