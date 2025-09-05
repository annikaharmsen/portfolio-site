<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'title' => 'required|string|min:1|max:255',
            'subtitle' => 'required|string|max:255',
            'description' => 'required|string',
            'repo_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'featured' => 'boolean',
            'date' => 'nullable|date',
            'skills' => 'array|distinct|exists:skills,id'
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.required' => 'Icon name is required.',
            'icon_name.min' => 'Icon name cannot be empty.',
            'title.required' => 'Project title is required.',
            'title.min' => 'Project title cannot be empty.',
            'repo_link.url' => 'Please enter a valid repository URL.',
            'demo_link.url' => 'Please enter a valid demo URL.',
            'skills' => 'Invalid skills selection.'
        ];
    }
}
