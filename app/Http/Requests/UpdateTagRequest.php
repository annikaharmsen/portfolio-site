<?php

namespace App\Http\Requests;

use App\Enums\LucideIcon;
use Illuminate\Validation\Rule;

class UpdateTagRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'icon_name' => ['nullable', Rule::enum(LucideIcon::class)],
            'name' => 'nullable|string|min:1|max:255',
            'projects' => 'array|distinct|exists:projects,id',
            'category' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'icon_name.Illuminate\Validation\Rules\Enum' => 'Invalid icon selection.',
            'name.required' => 'Tag name is required.',
            'name.min' => 'Tag name cannot be empty.',
            'projects' => 'Invalid project selection.',
            'category' => 'Invalid category selected',
        ];
    }
}
