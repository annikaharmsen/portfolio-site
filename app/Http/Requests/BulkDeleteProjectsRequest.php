<?php

namespace App\Http\Requests;

class BulkDeleteProjectsRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:projects,id'
        ];
    }

    public function getProjectIds()
    {
        return $this->validated()['ids'];
    }
}
