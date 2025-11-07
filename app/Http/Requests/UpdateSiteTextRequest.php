<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteTextRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow access if using demo database or if authenticated
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
            'path' => ['required', 'regex:/^(intro|about|skills|projects|contact)\.[a-z0-9_]+(\.[a-z0-9_]+)*$/'],
           'text' => 'nullable|string',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'path.required' => 'A path is required.',
            'path.regex' => 'Path must be in the format: section.slot (e.g., intro.a, about.title). Valid sections: intro, about, skills, projects, contact.',
            'text.string' => 'Text content must be a valid text string.',
        ];
    }
}
