<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Tag;
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

        Tag::create([
            'name' => 'Example Skill',
            'icon_name' => 'BadgeCheck',
        ]);
    }
}
