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
            'texts' => 'required|array|min:1|max:255',
            'texts.*.id' => 'nullable|integer',
            'texts.*.slot' => 'required|regex:/^[0-9]+(\.[0-9]+)*$/',
            'texts.*.text' => 'required|string|min:1',
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
            'texts.required' => 'At least one text entry is required.',
            'texts.array' => 'Text entries must be provided as a list.',
            'texts.min' => 'At least one text entry is required.',
            'texts.max' => 'You cannot add more than 255 text entries in one section.',
            'texts.*.id.integer' => 'Text ID must be a valid number.',
            'texts.*.slot.required' => 'A slot position is required for each text entry.',
            'texts.*.slot.regex' => 'Slot position must be in the format of numbers separated by dots (e.g., 1, 1.2, 1.2.3).',
            'texts.*.text.required' => 'Text content is required.',
            'texts.*.text.string' => 'Text content must be a valid text string.',
            'texts.*.text.min' => 'Text content cannot be empty.',
        ];
    }
}
