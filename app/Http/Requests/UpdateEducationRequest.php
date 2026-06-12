<?php

namespace App\Http\Requests;

class UpdateEducationRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'graduation_date' => 'required|date',
            'gpa' => 'nullable|string|max:10',
            'bullets' => 'nullable|array',
            'bullets.*' => 'string',
            'sort_order' => 'integer',
        ];
    }
}
