<?php

use App\Models\Project;
use App\Models\Skill;
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
            // Check if columns exist before modifying constraints
            if (Schema::hasColumn('project_skills', 'project_id')) {
                try {
                    $table->dropForeign(['project_id']);
                } catch (Exception $e) {}

                // Add new foreign key constraints with cascade delete
                $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            } else {
                // Create column with foreign key constraint
                $table->foreignIdFor(Project::class)->constrained()->onDelete('cascade');
            }

            if (Schema::hasColumn('project_skills', 'skill_id')) {
                try {
                    $table->dropForeign(['skill_id']);
                } catch (Exception $e) {}

                // Add new foreign key constraints with cascade delete
                $table->foreign('skill_id')->references('id')->on('skills')->onDelete('cascade');
            } else {
                // Create column with foreign key constraint
                $table->foreignIdFor(Skill::class)->constrained()->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_skills', function (Blueprint $table) {
            // Drop cascade foreign key constraints
            try {
                $table->dropForeign(['project_id']);
                $table->dropForeign(['skill_id']);
            } catch (Exception $e) {}

            // Restore original foreign key constraints without cascade
            $table->foreignIdFor(Project::class);
            $table->foreignIdFor(Skill::class);
        });
    }
};
