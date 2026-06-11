<?php

namespace App\Http\Requests;

class BulkUpdateProjectCategoryRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:projects,id',
            'category' => 'required|string|max:50',
        ];
    }

    public function getIds(): array
    {
        return $this->validated()['ids'];
    }
}
