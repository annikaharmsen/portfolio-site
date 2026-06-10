<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return config('database.default') === 'demo' || auth()->check();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'date_ranges' => 'required|array|min:1',
            'date_ranges.*.start' => 'required|date',
            'date_ranges.*.end' => 'nullable|date',
            'bullets' => 'nullable|array',
            'bullets.*' => 'string',
            'sort_order' => 'integer',
        ];
    }
}
