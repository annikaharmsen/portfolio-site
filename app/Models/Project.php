<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Artisan;

class Project extends Model
{
    use SoftDeletes;
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

    public function scopeOrdered($query) {
        return $query->orderBy('featured', 'desc')->orderBy('date', 'desc');
    }

    public function skills() {
        return $this->belongsToMany(Skill::class, 'project_skills');
    }

    public function technologies() {
        return $this->belongsToMany(Technology::class, 'project_technologies');
    }
}
