<?php

namespace App\Http\Requests;

use App\Enums\LucideIcon;
use App\Enums\TagCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTagRequest extends FormRequest
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
            'icon_name' => ['nullable', Rule::enum(LucideIcon::class)],
            'name' => 'nullable|string|min:1|max:255',
            'projects' => 'array|distinct|exists:projects,id',
            'category' => Rule::enum(TagCategory::class)
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.Illuminate\Validation\Rules\Enum' => 'Invalid icon selection.',
            'name.required' => 'Tag name is required.',
            'name.min' => 'Tag name cannot be empty.',
            'projects' => 'Invalid project selection.',
            'category' => 'Invalid category selected'
        ];
    }
}
