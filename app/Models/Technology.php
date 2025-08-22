<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    protected $fillable = [
        'name'
    ];

    public function projects() {
        return $this->hasManyThrough(Project::class, ProjectTechnology::class);
    }
}
