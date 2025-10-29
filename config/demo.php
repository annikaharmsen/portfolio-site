<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Demo Mode Configuration
    |--------------------------------------------------------------------------
    |
    | This configuration controls the demo mode functionality of the application.
    | When enabled, the database will be reset for each new visitor session.
    |
    */

    'enabled' => env('DEMO_MODE', false),

    'allow_manual_reset' => env('DEMO_ALLOW_MANUAL_RESET', false),
    'reset_on_new_session' => env('DEMO_RESET_ON_SESSION', false),
    'reset_daily' => env('DEMO_RESET_DAILY', false),

    'show_banner' => env('DEMO_SHOW_BANNER', true),

    // Cache key for tracking last reset session
    'reset_session_cache_key' => 'demo_last_reset_session',
    'reset_time_cache_key' => 'demo_last_reset_time',
];
