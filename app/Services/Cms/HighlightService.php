<?php

namespace App\Services\Cms;

use App\Models\Highlight;
use Illuminate\Support\Facades\DB;

/**
 * Replaces the resume highlights for the admin CMS and the admin MCP server.
 */
class HighlightService
{
    /**
     * Soft-deletes every highlight, then stores the given texts in list order.
     *
     * @param  array<int, string>  $texts
     */
    public function replace(array $texts): void
    {
        DB::transaction(function () use ($texts) {
            Highlight::query()->delete();

            $now = now();
            $rows = collect($texts)
                ->values()
                ->map(fn (string $text, int $index) => [
                    'text' => $text,
                    'sort_order' => $index,
                    'created_at' => $now,
                    'updated_at' => $now,
                ])
                ->all();

            Highlight::insert($rows);
        });
    }
}
