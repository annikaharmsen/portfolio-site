<?php

namespace App\Http\Requests;

class StoreImageRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'image' => 'required|image|max:10240', // max 10MB
            'alt' => 'nullable|string'
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'An image file is required.',
            'image.image' => 'The file must be an image (jpeg, png, bmp, gif, svg, or webp).',
            'image.max' => 'The image must not be larger than 10MB.',
            'alt.string' => 'The alt text must be a valid string.',
        ];
    }
}
