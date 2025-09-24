<?php

namespace App\Http\Requests\Admin;

use App\LucideIcon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSkillRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
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
            'projects' => 'array|distinct|exists:projects,id'
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.Illuminate\Validation\Rules\Enum' => 'Invalid icon selection.',
            'name.required' => 'Skill name is required.',
            'name.min' => 'Skill name cannot be empty.',
            'projects' => 'Invalid project selection.'
        ];
    }
}
