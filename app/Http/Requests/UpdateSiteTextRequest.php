<?php

namespace App\Http\Requests;

class UpdateSiteTextRequest extends CmsRequest
{
    public function rules(): array
    {

        return [
            'path' => ['required', 'regex:/^(intro|about|skills|projects|contact)\.[a-z0-9_]+(\.[a-z0-9_]+)*$/'],
           'text' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'path.required' => 'A path is required.',
            'path.regex' => 'Path must be in the format: section.slot (e.g., intro.a, about.title). Valid sections: intro, about, skills, projects, contact.',
            'text.string' => 'Text content must be a valid text string.',
        ];
    }
}
