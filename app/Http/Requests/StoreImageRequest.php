<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return config('database.default') === 'demo' || auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => 'required|image|max:10240', // max 10MB
            'alt' => 'nullable|string'
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
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
