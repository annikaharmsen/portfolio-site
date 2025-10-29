<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectHeroSectionsRequest extends FormRequest
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
            'hero_sections' => 'required|array',
            'hero_sections.*.id' => 'nullable|integer',
            'hero_sections.*.image_id' => 'nullable|exists:images,id',
            'hero_sections.*.index' => 'required|integer|min:0|distinct',
            'hero_sections.*.heading' => 'required|string|min:1',
            'hero_sections.*.text' => 'required|string|min:1',
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
            'hero_sections.required' => 'Hero sections field is required.',
            'hero_sections.array' => 'Hero sections must be an array.',
            'hero_sections.*.id.integer' => 'The hero section ID must be a number.',
            'hero_sections.*.image_id.exists' => 'The selected image does not exist.',
            'hero_sections.*.index.required' => 'Each hero section must have an index.',
            'hero_sections.*.index.integer' => 'The index must be a number.',
            'hero_sections.*.index.min' => 'The index must be at least 0.',
            'hero_sections.*.index.distinct' => 'Each hero section must have a unique index.',
            'hero_sections.*.heading.required' => 'Each hero section must have a heading.',
            'hero_sections.*.heading.min' => 'The heading cannot be empty.',
            'hero_sections.*.text.required' => 'Each hero section must have text content.',
            'hero_sections.*.text.min' => 'The text content cannot be empty.',
        ];
    }
}
