<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name'
    ];

    public function projects() {
        return $this->hasManyThrough(Project::class, ProjectSkill::class);
    }
}
