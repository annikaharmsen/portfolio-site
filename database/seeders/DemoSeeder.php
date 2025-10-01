<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Skill;
use App\Models\Technology;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Project
        Project::create([
            'title' => 'Example Project',
            'subtitle' => 'This is an example project entry.',
            'description' => 'This project would be displayed in the projects section of my website.',
            'icon_name' => 'Folder',
            'demo_link' => 'https://example.com',
            'repo_link' => 'https://github.com/example/repo',
            'featured' => true,
            'date' => '2025-01-01',
        ]);

        // Create Skill
        Skill::create([
            'name' => 'Example Skill',
            'icon_name' => 'BadgeCheck',
        ]);

        // Create Technology
        Technology::create([
            'name' => 'Example Technology',
            'icon_name' => 'Wrench',
        ]);
    }
}
