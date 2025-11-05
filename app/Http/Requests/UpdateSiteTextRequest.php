<?php

namespace App\Http\Requests;

use App\Enums\SiteSection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'section' => ['required', Rule::enum(SiteSection::class)],
            'text' => 'nullable|string',
            'slot' => 'required|regex:/^[a-z]+(\.[a-z]+)*$/',
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
            'section.required' => 'A section must be selected.',
            'section.Illuminate\Validation\Rules\Enum' => 'The selected section is invalid.',
            'text.string' => 'Text content must be a valid text string.',
            'text.min' => 'Text content cannot be empty.',
            'slot.required' => 'A slot position is required.',
            'slot.regex' => 'Slot position must be in the format of lowercase letters separated by dots (e.g., a, a.b, a.b.c).',
        ];
    }
}
