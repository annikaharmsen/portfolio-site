<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SiteText extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'section',
        'slot',
        'text'
    ];

    public function scopeOrdered($query) {
        return $query->orderBy('slot');
    }
}
