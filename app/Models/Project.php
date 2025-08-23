<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'icon_name',
        'title',
        'subtitle',
        'description',
        'repo_link',
        'demo_link',
        'featured',
        'date'
    ];

    public function skills() {
        return $this->belongsToMany(Skill::class, 'project_skills');
    }

    public function technologies() {
        return $this->belongsToMany(Technology::class, 'project_technologies');
    }
}
