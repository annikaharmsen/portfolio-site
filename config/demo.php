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

    'demo_user' => [
        'name' => env('DEMO_USER_NAME', 'Demo User'),
        'email' => env('DEMO_USER_EMAIL', 'demo@annikaharmsen.com'),
        'password' => env('DEMO_USER_PASSWORD', 'demo123'),
    ],

    'reset_on_new_session' => env('DEMO_RESET_ON_SESSION', true),

    'show_banner' => env('DEMO_SHOW_BANNER', true),

    // Cache key for tracking last reset session
    'cache_key' => 'demo_last_reset_session',
];
