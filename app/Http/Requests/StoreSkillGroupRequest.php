<?php

namespace App\Http\Requests;

class StoreSkillGroupRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'sort_order' => 'integer',
        ];
    }
}
