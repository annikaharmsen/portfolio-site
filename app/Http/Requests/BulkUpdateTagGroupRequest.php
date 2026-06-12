<?php

namespace App\Http\Requests;

class BulkUpdateTagGroupRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:tags,id',
            'skill_group_id' => 'nullable|integer|exists:skill_groups,id',
        ];
    }

    public function getIds(): array
    {
        return $this->validated()['ids'];
    }
}
