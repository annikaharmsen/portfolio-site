<?php

namespace App\Http\Requests;

use App\Enums\LucideIcon;
use Illuminate\Validation\Rule;

class StoreTagRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'icon_name' => ['required', Rule::enum(LucideIcon::class)],
            'name' => 'required|string|min:1|max:255',
            'projects' => 'array|distinct|exists:projects,id',
            'category' => 'nullable|string|max:255',
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
            'category' => 'Invalid category selected.',
        ];
    }
}
