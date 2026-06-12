<?php

namespace App\Http\Requests;

class SyncHighlightsRequest extends CmsRequest
{
    public function rules(): array
    {
        return [
            'highlights' => 'present|array',
            'highlights.*' => 'required|string|max:500',
        ];
    }
}
