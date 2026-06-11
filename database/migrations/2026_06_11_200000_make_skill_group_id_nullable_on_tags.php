<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tags', function (Blueprint $table) {
            // drop the existing not-null foreign key with cascade
            $table->dropConstrainedForeignId('skill_group_id');
        });

        Schema::table('tags', function (Blueprint $table) {
            // re-add as nullable with nullOnDelete so deleting a group ungroups its tags
            $table->foreignId('skill_group_id')
                ->nullable()
                ->after('category')
                ->constrained('skill_groups')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('tags', function (Blueprint $table) {
            $table->dropConstrainedForeignId('skill_group_id');
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->foreignId('skill_group_id')
                ->nullable()
                ->after('category')
                ->constrained('skill_groups')
                ->onDelete('cascade');
        });

        // restore not-null constraint (best-effort; may fail if nulls exist)
        Schema::table('tags', function (Blueprint $table) {
            $table->foreignId('skill_group_id')->nullable(false)->change();
        });
    }
};
