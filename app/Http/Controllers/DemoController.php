<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DemoController extends Controller
{
    /**
     * Reset demo database manually
     */
    public function reset(Request $request)
    {
        Log::info('Receiver maniual reset request');

        if (!config('demo.enabled')) {
            return response()->json(['error' => 'Demo mode not enabled'], 403);
        }

        try {
            Log::info('Demo: Manual reset triggered', [
                'session_id' => session()->getId(),
                'ip' => $request->ip()
            ]);

            // Reset the demo database
            Artisan::call('migrate:fresh', [
                '--database' => 'demo',
                '--force' => true
            ]);

            // Update cache with current session
            $sessionId = session()->getId();
            Cache::put(config('demo.cache_key'), $sessionId, now()->addHours(24));

            // Update session data
            session()->put('demo_reset_at', now()->toISOString());

            Log::info('Demo: Manual reset completed successfully');

            return response()->json([
                'success' => true,
                'message' => 'Demo data has been reset successfully!',
                'reset_at' => now()->toISOString()
            ]);

        } catch (\Exception $e) {
            Log::error('Demo: Manual reset failed', [
                'error' => $e->getMessage(),
                'session_id' => session()->getId()
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Reset failed. Please try again.'
            ], 500);
        }
    }

    /**
     * Get demo status information
     */
    public function status()
    {
        if (!config('demo.enabled')) {
            return response()->json(['demo_enabled' => false]);
        }

        return response()->json([
            'demo_enabled' => true,
            'reset_at' => session()->get('demo_reset_at'),
            'session_id' => session()->getId()
        ]);
    }
}
