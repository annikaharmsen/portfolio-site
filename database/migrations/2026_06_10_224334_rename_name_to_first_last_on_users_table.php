<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('users', 'name')) {
            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('name', 'first_name');
            });
        }

        if (! Schema::hasColumn('users', 'last_name')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('last_name')->after('first_name')->default('');
            });
        }

        // split existing "First Last" values
        DB::table('users')->get()->each(function ($user) {
            $parts = explode(' ', $user->first_name, 2);
            DB::table('users')->where('id', $user->id)->update([
                'first_name' => $parts[0],
                'last_name' => $parts[1] ?? '',
            ]);
        });
    }

    public function down(): void
    {
        // merge back to single name column
        DB::table('users')->get()->each(function ($user) {
            DB::table('users')->where('id', $user->id)->update([
                'first_name' => trim("{$user->first_name} {$user->last_name}"),
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('last_name');
            $table->renameColumn('first_name', 'name');
        });
    }
};
