<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        Experience::create([
            'title' => 'Multiple Roles',
            'company' => 'Tavern in the Square',
            'location' => 'Framingham, MA',
            'start_date' => '2023-07-01',
            'end_date' => '2024-11-01',
            'details' => <<<'MD'
                Rapidly mastered diverse roles in high-volume restaurant environment, earning increased responsibilities through demonstrated reliability and quick learning ability.

                **Key Transferable Skills:**
                - Multitasking & Priority Management
                - Problem-Solving Under Pressure
                - Team Collaboration
                - Customer-Focused Mindset
                MD,
            'sort_order' => 1,
        ]);

        Experience::create([
            'title' => 'Barkeeper & Service',
            'company' => 'Neo Bar & Restaurant',
            'location' => 'Heidelberg, Germany',
            'start_date' => '2024-12-01',
            'end_date' => null,
            'details' => <<<'MD'
                Successfully adapted to new cultural and linguistic environment while supporting a dynamic hospitality team.

                **Key Achievements:**
                - Cultural adaptability and language skills
                - Maintained service quality in team transitions
                - International work experience
                MD,
            'sort_order' => 2,
        ]);
    }
}
