<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('location')->nullable()->after('email');
            $table->string('phone')->nullable()->after('location');
            $table->text('summary')->nullable()->after('phone');
        });

        $user = DB::table('users')->first();
        if ($user) {
            $texts = DB::table('site_texts')
                ->whereIn('path', ['resume.location', 'resume.phone', 'resume.summary'])
                ->pluck('text', 'path');

            DB::table('users')->where('id', $user->id)->update([
                'location' => $texts->get('resume.location'),
                'phone' => $texts->get('resume.phone'),
                'summary' => $texts->get('resume.summary'),
            ]);
        }

        DB::table('site_texts')->where('path', 'like', 'resume.%')->delete();
    }

    public function down(): void
    {
        $user = DB::table('users')->first();
        if ($user) {
            $now = now();
            $entries = [
                ['path' => 'resume.name', 'text' => $user->name, 'created_at' => $now, 'updated_at' => $now],
                ['path' => 'resume.location', 'text' => $user->location, 'created_at' => $now, 'updated_at' => $now],
                ['path' => 'resume.phone', 'text' => $user->phone, 'created_at' => $now, 'updated_at' => $now],
                ['path' => 'resume.website', 'text' => config('app.url'), 'created_at' => $now, 'updated_at' => $now],
                ['path' => 'resume.summary', 'text' => $user->summary, 'created_at' => $now, 'updated_at' => $now],
            ];
            DB::table('site_texts')->insert($entries);
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['location', 'phone', 'summary']);
        });
    }
};
