<?php

namespace App\Models;

use App\Enums\SiteSection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Log;

class SiteText extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'path',
        'text'
    ];

    public function scopeOrdered($query) {
        return $query->orderBy('path');
    }

    public static function allNested() {
        $records = SiteText::all()->sortBy('path');

        $dottedArr = [];
        foreach ($records as $record) {
            $dottedArr[$record->path] = $record->text;
        }

        return Arr::undot($dottedArr);
    }
}
