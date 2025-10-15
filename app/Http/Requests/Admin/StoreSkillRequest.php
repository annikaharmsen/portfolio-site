<?php

namespace App\Http\Requests\Admin;

use App\Enums\LucideIcon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSkillRequest extends FormRequest
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
            'icon_name' => ['required', Rule::enum(LucideIcon::class)],
            'name' => 'required|string|min:1|max:255',
            'projects' => 'array|distinct|exists:projects,id'
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.required' => 'Icon is required.',
            'icon_name.Illuminate\Validation\Rules\Enum' => 'Invalid icon selection.',
            'name.required' => 'Skill name is required.',
            'name.min' => 'Skill name cannot be empty.',
            'projects' => 'Invalid projects selection.'
        ];
    }
}
