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
        // Create tags table
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('icon_name')->nullable();
            $table->string('name');
            $table->enum('category', ['frontend', 'backend', 'tool', 'skill'])->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Create project_tags pivot table
        Schema::create('project_tags', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('tag_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Migrate data from technologies to tags
        $technologies = DB::table('technologies')->get();
        foreach ($technologies as $technology) {
            $tagId = DB::table('tags')->insertGetId([
                'icon_name' => $technology->icon_name,
                'name' => $technology->name,
                // Map category: if null or 'tool', set as 'tool', otherwise keep as is
                'category' => $technology->category,
                'created_at' => $technology->created_at,
                'updated_at' => $technology->updated_at,
            ]);

            // Migrate project_technologies relationships
            $projectTechnologies = DB::table('project_technologies')
                ->where('technology_id', $technology->id)
                ->get();

            foreach ($projectTechnologies as $pt) {
                DB::table('project_tags')->insert([
                    'project_id' => $pt->project_id,
                    'tag_id' => $tagId,
                    'created_at' => $pt->created_at,
                    'updated_at' => $pt->updated_at,
                ]);
            }
        }

        // Migrate data from skills to tags
        $skills = DB::table('skills')->get();
        foreach ($skills as $skill) {
            $tagId = DB::table('tags')->insertGetId([
                'icon_name' => $skill->icon_name,
                'name' => $skill->name,
                'category' => 'skill',
                'created_at' => $skill->created_at,
                'updated_at' => $skill->updated_at,
            ]);

            // Migrate project_skills relationships
            $projectSkills = DB::table('project_skills')
                ->where('skill_id', $skill->id)
                ->get();

            foreach ($projectSkills as $ps) {
                DB::table('project_tags')->insert([
                    'project_id' => $ps->project_id,
                    'tag_id' => $tagId,
                    'created_at' => $ps->created_at,
                    'updated_at' => $ps->updated_at,
                ]);
            }
        }

        // Drop old tables
        Schema::dropIfExists('project_technologies');
        Schema::dropIfExists('project_skills');
        Schema::dropIfExists('technologies');
        Schema::dropIfExists('skills');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreate technologies table
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon_name')->nullable();
            $table->enum('category', ['backend', 'frontend'])->nullable();
            $table->timestamps();
        });

        // Recreate skills table
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('icon_name');
            $table->string('name');
            $table->timestamps();
        });

        // Recreate project_technologies pivot table
        Schema::create('project_technologies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained();
            $table->foreignId('technology_id')->constrained();
            $table->timestamps();
        });

        // Recreate project_skills pivot table
        Schema::create('project_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('skill_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Migrate data back from tags to technologies and skills
        $tags = DB::table('tags')->get();
        foreach ($tags as $tag) {
            if ($tag->category === 'skill') {
                // Migrate back to skills
                $skillId = DB::table('skills')->insertGetId([
                    'icon_name' => $tag->icon_name,
                    'name' => $tag->name,
                    'created_at' => $tag->created_at,
                    'updated_at' => $tag->updated_at,
                ]);

                // Migrate project_tags relationships back to project_skills
                $projectTags = DB::table('project_tags')
                    ->where('tag_id', $tag->id)
                    ->get();

                foreach ($projectTags as $ptag) {
                    DB::table('project_skills')->insert([
                        'project_id' => $ptag->project_id,
                        'skill_id' => $skillId,
                        'created_at' => $ptag->created_at,
                        'updated_at' => $ptag->updated_at,
                    ]);
                }
            } else {
                // Migrate back to technologies (frontend, backend, tool)
                $technologyId = DB::table('technologies')->insertGetId([
                    'icon_name' => $tag->icon_name,
                    'name' => $tag->name,
                    'category' => in_array($tag->category, ['frontend', 'backend']) ? $tag->category : null,
                    'created_at' => $tag->created_at,
                    'updated_at' => $tag->updated_at,
                ]);

                // Migrate project_tags relationships back to project_technologies
                $projectTags = DB::table('project_tags')
                    ->where('tag_id', $tag->id)
                    ->get();

                foreach ($projectTags as $ptag) {
                    DB::table('project_technologies')->insert([
                        'project_id' => $ptag->project_id,
                        'technology_id' => $technologyId,
                        'created_at' => $ptag->created_at,
                        'updated_at' => $ptag->updated_at,
                    ]);
                }
            }
        }

        // Drop new tables
        Schema::dropIfExists('project_tags');
        Schema::dropIfExists('tags');
    }
};
