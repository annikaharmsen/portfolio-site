<?php

namespace App\Http\Requests;

class StoreHighlightRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'text' => 'required|string|max:500',
            'sort_order' => 'integer',
        ];
    }
}
