<?php

namespace App\Http\Requests;

class UpdateImageRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required|integer|min:0',
            'url' => 'required|string|min:1',
            'alt' => 'nullable|string'
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'The image ID is required.',
            'id.integer' => 'The image ID must be a number.',
            'id.min' => 'The image ID must be at least 0.',
            'url.required' => 'The image URL is required.',
            'url.string' => 'The image URL must be a valid string.',
            'url.min' => 'The image URL cannot be empty.',
            'alt.string' => 'The alt text must be a valid string.',
        ];
    }
}
