<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('educations', function (Blueprint $table) {
            $table->renameColumn('degree', 'title');
            $table->renameColumn('honors', 'bullets');
        });
    }

    public function down(): void
    {
        Schema::table('educations', function (Blueprint $table) {
            $table->renameColumn('title', 'degree');
            $table->renameColumn('bullets', 'honors');
        });
    }
};
