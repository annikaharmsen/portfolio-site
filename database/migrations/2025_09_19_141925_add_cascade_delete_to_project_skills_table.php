<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('project_skills', function (Blueprint $table) {
            // Drop existing foreign key constraints
            $table->dropForeign(['project_id']);
            $table->dropForeign(['skill_id']);

            // Add new foreign key constraints with cascade delete
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('skill_id')->references('id')->on('skills')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_skills', function (Blueprint $table) {
            // Drop cascade foreign key constraints
            $table->dropForeign(['project_id']);
            $table->dropForeign(['skill_id']);

            // Restore original foreign key constraints without cascade
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('skill_id')->references('id')->on('skills');
        });
    }
};
