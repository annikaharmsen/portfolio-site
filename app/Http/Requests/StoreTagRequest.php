<?php

namespace App\Http\Requests;

use App\Enums\LucideIcon;
use App\Enums\TagCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class StoreTagRequest extends FormRequest
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
            'category' => Rule::enum(TagCategory::class)
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.required' => 'Icon is required.',
            'icon_name.Illuminate\Validation\Rules\Enum' => 'Invalid icon selection.',
            'name.required' => 'Name is required.',
            'name.min' => 'Name cannot be empty.',
            'projects' => 'Invalid projects selection.',
            'category' => 'Invalid category selected.'
        ];
    }
}
