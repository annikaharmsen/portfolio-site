<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->text('resume_description')->nullable()->after('description');
            $table->string('resume_tech_stack')->nullable()->after('resume_description');
            $table->json('resume_bullets')->nullable()->after('resume_tech_stack');
            $table->boolean('show_on_resume')->default(false)->after('resume_bullets');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['resume_description', 'resume_tech_stack', 'resume_bullets', 'show_on_resume']);
        });
    }
};
