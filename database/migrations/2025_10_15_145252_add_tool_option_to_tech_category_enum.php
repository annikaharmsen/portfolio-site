<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Store existing data
        $technologies = DB::table('technologies')->get(['id', 'category']);

        // Drop and recreate with new enum values
        Schema::table('technologies', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('technologies', function (Blueprint $table) {
            $table->enum('category', ['backend', 'frontend', 'tool'])->nullable();
        });

        // Restore existing data
        foreach ($technologies as $tech) {
            if ($tech->category !== null) {
                DB::table('technologies')
                    ->where('id', $tech->id)
                    ->update(['category' => $tech->category]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Store existing data (excluding 'tool' category)
        $technologies = DB::table('technologies')
            ->whereNotNull('category')
            ->where('category', '!=', 'tool')
            ->get(['id', 'category']);

        // Drop and recreate with old enum values
        Schema::table('technologies', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('technologies', function (Blueprint $table) {
            $table->enum('category', ['backend', 'frontend'])->nullable();
        });

        // Restore existing data
        foreach ($technologies as $tech) {
            DB::table('technologies')
                ->where('id', $tech->id)
                ->update(['category' => $tech->category]);
        }
    }
};
