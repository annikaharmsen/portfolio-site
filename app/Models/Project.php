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
        'date',
        'hidden',
        'resume_description',
        'resume_tech_stack',
        'resume_bullets',
        'show_on_resume',
    ];

    protected $casts = [
        'resume_bullets' => 'array',
        'show_on_resume' => 'boolean',
    ];

    public function scopeOrdered($query) {
        return $query->orderBy('featured', 'desc')->orderBy('date', 'desc');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'project_tags');
    }

    public function hero_sections() {
        return $this->hasMany(ProjectHeroSection::class)->ordered();
    }
}
