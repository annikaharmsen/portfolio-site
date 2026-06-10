<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('skill_groups', function (Blueprint $table) {
            $table->dropColumn('skills');
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->foreignId('skill_group_id')
                ->nullable()
                ->after('category')
                ->constrained('skill_groups')
                ->onDelete('cascade');
        });

        $groupMap = [
            'skill' => 'Languages',
            'frontend' => 'Frontend',
            'backend' => 'Backend',
            'tool' => 'Integrations & Tools',
        ];

        foreach ($groupMap as $category => $groupName) {
            $exists = DB::table('skill_groups')->where('name', $groupName)->exists();
            if (!$exists) {
                DB::table('skill_groups')->insert([
                    'name' => $groupName,
                    'sort_order' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        foreach ($groupMap as $category => $groupName) {
            $groupId = DB::table('skill_groups')->where('name', $groupName)->value('id');
            DB::table('tags')->where('category', $category)->update(['skill_group_id' => $groupId]);
        }

        $defaultGroupId = DB::table('skill_groups')->where('name', 'Languages')->value('id');
        DB::table('tags')->whereNull('skill_group_id')->update(['skill_group_id' => $defaultGroupId]);

        Schema::table('tags', function (Blueprint $table) {
            $table->foreignId('skill_group_id')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('tags', function (Blueprint $table) {
            $table->dropConstrainedForeignId('skill_group_id');
        });

        Schema::table('skill_groups', function (Blueprint $table) {
            $table->text('skills')->nullable()->after('name');
        });
    }
};
