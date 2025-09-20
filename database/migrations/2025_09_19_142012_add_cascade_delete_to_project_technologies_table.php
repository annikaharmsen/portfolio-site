<?php

use App\Models\Project;
use App\Models\Technology;
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
        Schema::table('project_technologies', function (Blueprint $table) {
            // Check if columns exist before modifying constraints
            if (Schema::hasColumn('project_technologies', 'project_id')) {
                // Drop existing foreign key constraints
                $table->dropForeign(['project_technologies_project_id_foreign']);
                // Add new foreign key constraints with cascade delete
                $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            } else {
                // Create column with foreign key constraint
                $table->foreignIdFor(Project::class)->constrained()->onDelete(action: 'cascade');
            }

            if (Schema::hasColumn('project_technologies', 'technology_id')) {
                // Drop existing foreign key constraints
                $table->dropForeign(['project_technologies_technology_id_foreign']);
                // Add new foreign key constraints with cascade delete
                $table->foreign('technology_id')->references('id')->on('technologies')->onDelete('cascade');
            } else {
                // Create column with foreign key constraint
                $table->foreignIdFor(Technology::class)->constrained()->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_technologies', function (Blueprint $table) {
            // Drop cascade foreign key constraints
            $table->dropForeign(['project_id']);
            $table->dropForeign(['technology_id']);

            // Restore original foreign key constraints without cascade
            $table->foreignIdFor(Project::class);
            $table->foreignIdFor(Technology::class);
        });
    }
};
