<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Technology extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'icon_name',
        'name',
        'category'
    ];

    public function projects() {
        return $this->belongsToMany(Project::class, 'project_technologies');
    }
}
