<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SkillGroup extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'sort_order',
    ];

    public function tags()
    {
        return $this->hasMany(Tag::class);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
