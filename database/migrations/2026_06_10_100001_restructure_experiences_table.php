<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->json('date_ranges')->nullable()->after('location');
            $table->json('bullets')->nullable()->after('date_ranges');
        });

        DB::table('experiences')->get()->each(function ($exp) {
            $ranges = [['start' => $exp->start_date, 'end' => $exp->end_date]];
            $bullets = $exp->resume_bullets;
            DB::table('experiences')->where('id', $exp->id)->update([
                'date_ranges' => json_encode($ranges),
                'bullets' => $bullets,
            ]);
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn(['start_date', 'end_date', 'details', 'resume_bullets']);
        });
    }

    public function down(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->date('start_date')->nullable()->after('location');
            $table->date('end_date')->nullable()->after('start_date');
            $table->text('details')->nullable()->after('end_date');
            $table->json('resume_bullets')->nullable()->after('details');
        });

        DB::table('experiences')->whereNotNull('date_ranges')->get()->each(function ($exp) {
            $ranges = json_decode($exp->date_ranges, true);
            if (! empty($ranges)) {
                DB::table('experiences')->where('id', $exp->id)->update([
                    'start_date' => $ranges[0]['start'],
                    'end_date' => $ranges[0]['end'],
                    'resume_bullets' => $exp->bullets,
                ]);
            }
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn(['date_ranges', 'bullets']);
        });
    }
};
