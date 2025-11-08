<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
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

    public static function getSection(string $section) {
        $records = SiteText::where('path', 'like', $section . '.%')->get();

        return SiteText::toNested($records);
    }
    public static function getAll() {
        $records = SiteText::all();

        return SiteText::toNested($records);
    }

    private static function toNested(Collection $records) {
        $dottedArr = [];
        foreach ($records as $record) {
            $dottedArr[$record->path] = $record->text;
        }

        return Arr::undot($dottedArr);
    }
}
