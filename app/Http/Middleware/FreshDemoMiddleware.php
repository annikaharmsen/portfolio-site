<?php

namespace App\Http\Middleware;

use App\Services\DemoService;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class FreshDemoMiddleware
{
    public function __construct(private DemoService $demoService)
    {
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (config('demo.enabled') ){
            if (config('demo.reset_on_new_session')) {
                $this->handleSessionReset();
            }
            if (config('demo.reset_daily')) {
                $this->handleDailyReset();
            }
        }

        return $next($request);
    }

    /**
     * Handle demo database sesion reset logic
     */
    private function handleSessionReset(): void
    {
        $sessionId = session()->getId();
        $lastResetSession = Cache::get(config('demo.reset_session_cache_key'));

        if ($lastResetSession !== $sessionId) {
            try {
                Log::info('Demo: Detected new session start.', [
                    'session_id' => $sessionId
                ]);

                $this->demoService->reset();

                // Update last reset time and session in cache
                Cache::put( config('demo.reset_time_cache_key'), now());
                Cache::put( config('demo.reset_session_cache_key'), $sessionId, now()->addHours(24));

                Log::info('Demo: New session successfully initialized.');

            } catch (\Exception $e) {
                Log::error('Demo: Database new session reset failed.', [
                    'error' => $e->getMessage(),
                    'session_id' => $sessionId
                ]);
            }
        }
    }

    /**
     * Handle demo database daily reset logic
     */
    private function handleDailyReset(): void
    {
        $lastResetTime = Carbon::parse(Cache::get(config('demo.reset_time_cache_key')));
        $todayMidnight = Carbon::now()->startOfDay();

        if ($lastResetTime->lt($todayMidnight)) {
            try {
                Log::info('Demo: Detected new day.', [
                    'last_reset_at' => $lastResetTime
                ]);

                $this->demoService->reset();

                // Update last reset time and session in cache
                Cache::put( config('demo.reset_time_cache_key'), now());
                Cache::delete( config('demo.reset_session_cache_key'));

                Log::info('Demo: New day successfully initialized.');

            } catch (\Exception $e) {
                Log::error('Demo: Database new day reset failed.', [
                    'error' => $e->getMessage()
                ]);
            }
        }
    }
}
