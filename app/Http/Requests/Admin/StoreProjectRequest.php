<?php

namespace App\Http\Requests\Admin;

use App\LucideIcon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'icon_name' => ['required', Rule::enum(LucideIcon::class)],
            'title' => 'required|string|min:1|max:255',
            'subtitle' => 'required|string|max:255',
            'description' => 'required|string',
            'repo_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'featured' => 'boolean',
            'date' => 'nullable|date',
            'skills' => 'array|distinct|exists:skills,id',
            'technologies' => 'array|distinct|exists:technologies,id'
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.required' => 'Icon is required.',
            'icon_name.Illuminate\Validation\Rules\Enum' => 'Invalid icon selection.',
            'title.required' => 'Project title is required.',
            'title.min' => 'Project title cannot be empty.',
            'repo_link.url' => 'Please enter a valid repository.',
            'demo_link.url' => 'Please enter a valid demo URL.',
            'skills' => 'Invalid skill selection.',
            'technologies' => 'Invalid technology selection.'
        ];
    }
}
