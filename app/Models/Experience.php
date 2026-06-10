<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'company',
        'location',
        'date_ranges',
        'bullets',
        'sort_order',
    ];

    protected $casts = [
        'date_ranges' => 'array',
        'bullets' => 'array',
    ];

    protected $appends = ['formatted_date_ranges'];

    protected function formattedDateRanges(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->date_ranges) {
                return '';
            }

            return collect($this->date_ranges)
                ->map(function (array $range) {
                    $start = date('m/Y', strtotime($range['start']));
                    $end = $range['end'] ? date('m/Y', strtotime($range['end'])) : 'Present';

                    return "{$start} – {$end}";
                })
                ->join(', ');
        });
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
