<?php

namespace App\Services\Cms;

use App\Models\SiteText;
use Illuminate\Support\Facades\DB;

/**
 * Writes site texts for the admin CMS and the admin MCP server, from validated data.
 */
class SiteTextService
{
    /**
     * Soft-deletes the current text at the path, then stores the new one. Empty text only deletes.
     */
    public function set(string $path, ?string $text): ?SiteText
    {
        return DB::transaction(function () use ($path, $text) {
            SiteText::where('path', $path)->delete();

            return $text ? SiteText::create(['path' => $path, 'text' => $text]) : null;
        });
    }
}
