<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateImageRequest extends FormRequest
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
            'id' => 'required|integer|min:0',
            'url' => 'required|string|min:1',
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
