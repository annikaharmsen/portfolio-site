<?php

namespace App\Models;

use App\Enums\SiteSection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;

class SiteText extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'section',
        'slot',
        'text'
    ];

    public function scopeOrdered($query) {
        return $query->orderBy('slot');
    }

    public function allNested() {
        $records = $this->all();
        $result = [];

        foreach(array_map(fn($case) => $case->value, SiteSection::cases()) as $section) {
            $sectionRecords = $records->where('section', '=', $section);
            // sectionRecords example:
            // [
            //     'id' => '1',
            //     'section' => 'intro' /* same for all records */,
            //     'slot' => '3.1.2',
            //     'text' => 'some text content'
            // ]

            $dottedSectionArr = [];
            foreach ($sectionRecords as $record) {
                $dottedSectionArr[$record->slot] = $record->text;
            }
            // dottedSectionArr example (all from same section):
            // [
            //     '3.1.2' => 'some text content',
            //     '1.2' => 'some other text content'
            // ]
            $result[$section] = Arr::undot($dottedSectionArr);
        }

        return $result;
        // [
        //     '3' => [
        //         '1' => [
        //             '2' => 'some text content'
        //         ]
        //     ],
        //     '1' => [
        //         '2' => 'some other text content'
        //     ]
        // ]
    }
}
