<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'icon_name',
        'title',
        'subtitle',
        'description',
        'bullets',
        'category',
        'label',
        'repo_link',
        'demo_link',
        'featured',
        'date',
        'hidden',
    ];

    protected $casts = [
        'bullets' => 'array',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('featured', 'desc')->orderBy('date', 'desc');
    }

    public function scopeForCategory($query, string $category)
    {
        return $query->where('category', $category)->orderBy('date', 'desc');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'project_tags');
    }

    public function hero_sections() {
        return $this->hasMany(ProjectHeroSection::class)->ordered();
    }
}
