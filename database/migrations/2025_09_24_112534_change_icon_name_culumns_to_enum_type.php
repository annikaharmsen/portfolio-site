<?php

use App\Enums\LucideIcon;
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
        if (DB::getDriverName() !== 'sqlite') {
            // Use enum for MySQL/PostgreSQL

            Schema::table('projects', function (Blueprint $table) {
                $table->enum('icon_name', array_column(LucideIcon::cases(), 'value'))->nullable()->change();
            });

            Schema::table('skills', function (Blueprint $table) {
                $table->enum('icon_name', array_column(LucideIcon::cases(), 'value'))->nullable()->change();
            });

            Schema::table('technologies', function (Blueprint $table) {
                $table->enum('icon_name', array_column(LucideIcon::cases(), 'value'))->nullable()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Change icon_name column back to string type

        Schema::table('projects', function (Blueprint $table) {
            $table->string('icon_name')->nullable()->change();
        });

        Schema::table('skills', function (Blueprint $table) {
            $table->string('icon_name')->nullable()->change();
        });

        Schema::table('technologies', function (Blueprint $table) {
            $table->string('icon_name')->nullable()->change();
        });
    }
};
