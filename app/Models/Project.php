<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'repo_link',
        'demo_link'
    ];

    public function skills() {
        return $this->hasManyThrough(Skill::class, ProjectSkill::class);
    }

    public function technologies() {
        return $this->hasManyThrough(Technology::class, ProjectTechnology::class);
    }
}
