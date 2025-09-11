<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreSkillRequest extends FormRequest
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
            'icon_name' => 'required|string|min:1|max:255',
            'name' => 'required|string|min:1|max:255',
            'projects' => 'required|array|distinct|exists:projects,id'
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.required' => 'Icon name is required.',
            'icon_name.min' => 'Icon name cannot be empty.',
            'name.required' => 'Skill name is required.',
            'name.min' => 'Skill name cannot be empty.',
            'projects' => 'Invalid projects selection.'
        ];
    }
}
