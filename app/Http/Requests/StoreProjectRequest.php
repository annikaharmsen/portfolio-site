<?php

namespace App\Http\Requests;

use App\Enums\LucideIcon;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends CmsRequest
{
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
            'hidden' => 'boolean',
            'date' => 'nullable|date',
            'tags' => 'array|distinct|exists:tags,id',
            'bullets' => 'nullable|array',
            'bullets.*' => 'string',
            'category' => 'nullable|string|in:projects,personal',
            'label' => 'nullable|string|max:255',
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
            'tags' => 'Invalid tag selection.',
        ];
    }
}
