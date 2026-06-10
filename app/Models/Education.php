<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Education extends Model
{
    use SoftDeletes;

    protected $table = 'educations';

    protected $fillable = [
        'degree',
        'institution',
        'graduation_date',
        'gpa',
        'honors',
        'sort_order',
    ];

    protected $casts = [
        'graduation_date' => 'date',
        'honors' => 'array',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('graduation_date', 'desc');
    }
}
