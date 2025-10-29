<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectHeroSection extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'project_id',
        'image_id',
        'index',
        'heading',
        'text'
    ];

    public function scopeOrdered($query) {
        return $query->orderBy('index');
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function image() {
        return $this->belongsTo(Image::class);
    }
}
