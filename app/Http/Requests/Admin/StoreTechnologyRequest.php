<?php

namespace App\Http\Requests\Admin;

use App\LucideIcon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTechnologyRequest extends FormRequest
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
            'name' => 'required|string|min:1|max:255',
            'projects' => 'array|distinct|exists:projects,id',
            'category' => Rule::in(['backend', 'frontend'])
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.required' => 'Icon is required.',
            'icon_name.Illuminate\Validation\Rules\Enum' => 'Invalid icon selection.',
            'name.required' => 'Technology name is required.',
            'name.min' => 'Technology name cannot be empty.',
            'projects' => 'Invalid projects selection.',
            'category' => 'Invalid category selected.'
        ];
    }
}
