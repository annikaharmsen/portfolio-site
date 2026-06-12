<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // expand enum to include 'tech' before updating data
        if (DB::getDriverName() === 'mysql') {
            Schema::table('tags', function (Blueprint $table) {
                $table->enum('category', ['frontend', 'backend', 'tool', 'skill', 'tech'])->nullable()->change();
            });
        }

        DB::table('tags')
            ->whereIn('category', ['frontend', 'backend', 'tool'])
            ->update(['category' => 'tech']);

        // shrink enum to final values
        if (DB::getDriverName() === 'mysql') {
            Schema::table('tags', function (Blueprint $table) {
                $table->enum('category', ['tech', 'skill'])->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        if (DB::getDriverName() === 'mysql') {
            Schema::table('tags', function (Blueprint $table) {
                $table->enum('category', ['frontend', 'backend', 'tool', 'skill'])->nullable()->change();
            });
        }
    }
};
