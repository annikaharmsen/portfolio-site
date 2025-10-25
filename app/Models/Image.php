<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    protected $fillable = [
        'url',
        'alt'
    ];

    public function projectHeroSection() {
        return $this->belongsToMany(ProjectHeroSection::class);
    }
}
