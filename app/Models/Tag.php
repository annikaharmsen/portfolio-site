<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'icon_name',
        'name',
        'category'
    ];

    protected static function booted()
    {
        static::addGlobalScope('ordered', function ($query) {
            $query->orderByRaw("
                CASE category
                    WHEN 'frontend' THEN 1
                    WHEN 'backend' THEN 2
                    WHEN 'tool' THEN 3
                    WHEN 'skill' THEN 4
                    ELSE 5
                END
            ")->orderBy('name');
        });
    }

    public function projects() {
        return $this->belongsToMany(Project::class, 'project_tags');
    }
}
