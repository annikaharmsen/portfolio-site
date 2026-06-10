<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class CmsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return config('database.default') === 'demo' || auth()->check();
    }
}
