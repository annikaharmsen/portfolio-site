<?php

namespace App\Http\Requests;

class BulkDeleteTagsRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:tags,id'
        ];
    }

    public function getTagIds()
    {
        return $this->validated()['ids'];
    }
}
