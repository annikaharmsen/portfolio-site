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
        'category',
        'skill_group_id',
    ];

    protected static function booted()
    {
        static::addGlobalScope('ordered', function ($query) {
            $query->orderByRaw("
                CASE category
                    WHEN 'tech' THEN 1
                    WHEN 'skill' THEN 2
                    ELSE 3
                END
            ")->orderBy('name');
        });
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_tags');
    }

    public function skillGroup()
    {
        return $this->belongsTo(SkillGroup::class);
    }
}
