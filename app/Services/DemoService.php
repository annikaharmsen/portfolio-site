<?php

namespace App\Services;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DemoService
{
    /**
     * Reset demo database
     */
    public static function reset()
    {
        try {
            Log::info('Demo: Resetting database', [
                'session_id' => session()->getId()
            ]);

            // Reset the demo database
            Artisan::call('migrate:fresh', [
                '--database' => 'demo',
                '--force' => true
            ]);

            Log::info('Demo: Database reset completed successfully');

            return true;

        } catch (\Exception $e) {
            Log::error('Demo: Database reset failed', [
                'error' => $e->getMessage()
            ]);

            return false;
        }
    }
}
