<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->json('bullets')->nullable()->after('description');
            $table->string('category')->nullable()->after('bullets');
            $table->string('label')->nullable()->after('category');
        });

        DB::table('projects')->get()->each(function ($project) {
            $desc = $project->resume_description;
            $oldBullets = json_decode($project->resume_bullets ?? '[]', true);
            $merged = $desc ? array_merge([$desc], $oldBullets) : $oldBullets;

            $category = $project->show_on_resume ? 'projects' : null;

            DB::table('projects')->where('id', $project->id)->update([
                'bullets' => ! empty($merged) ? json_encode($merged) : null,
                'category' => $category,
            ]);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['resume_description', 'resume_tech_stack', 'resume_bullets', 'show_on_resume']);
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->text('resume_description')->nullable()->after('description');
            $table->string('resume_tech_stack')->nullable()->after('resume_description');
            $table->json('resume_bullets')->nullable()->after('resume_tech_stack');
            $table->boolean('show_on_resume')->default(false)->after('resume_bullets');
        });

        DB::table('projects')->get()->each(function ($project) {
            $bullets = json_decode($project->bullets ?? '[]', true);
            $desc = ! empty($bullets) ? array_shift($bullets) : null;

            DB::table('projects')->where('id', $project->id)->update([
                'resume_description' => $desc,
                'resume_bullets' => ! empty($bullets) ? json_encode($bullets) : null,
                'show_on_resume' => ! is_null($project->category),
            ]);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['bullets', 'category', 'label']);
        });
    }
};
