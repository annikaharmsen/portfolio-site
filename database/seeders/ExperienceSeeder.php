<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        Experience::create([
            'title' => 'Software Engineer',
            'company' => 'Leucite',
            'location' => 'Remote',
            'date_ranges' => [['start' => '2026-06-01', 'end' => null]],
            'bullets' => [
                'Embedded directly with the client to learn how their process engineers work, gather requirements, and translate domain needs — runs, stations, process stages, and quality targets — into a concrete platform design.',
                'Owned the full delivery cycle independently — discovery, architecture, implementation, and delivery — across backend, frontend, and ML infrastructure, communicating progress and trade-offs directly with the client.',
                'Migrated the client off their legacy system, modeling their existing data and processes into the new platform so they could keep operating without disruption.',
                'Designed the platform to adapt to each organization\'s own fields, processes, and quality specs rather than forcing a one-size-fits-all structure, and selected technologies to fit the problem instead of defaulting to a familiar stack.',
            ],
            'sort_order' => 1,
        ]);

        Experience::create([
            'title' => 'Front-of-House Generalist',
            'company' => 'Tavern in the Square',
            'location' => 'Framingham, MA',
            'date_ranges' => [
                ['start' => '2023-07-01', 'end' => '2024-11-01'],
                ['start' => '2025-09-01', 'end' => null],
            ],
            'bullets' => [
                'Rapidly mastered and was promoted through multiple roles — busser, host, server, barback, utility, and bartender — consistently adapting to high-volume service demands.',
                'Earned increased responsibility and cross-trained peers based on demonstrated reliability, professionalism, and rapid skill acquisition.',
                'Delivered detail-oriented, team-centered guest experiences that drew consistent praise from management and patrons alike.',
            ],
            'sort_order' => 2,
        ]);

        Experience::create([
            'title' => 'Barkeeper & Service',
            'company' => 'Neo Bar & Restaurant',
            'location' => 'Heidelberg, Germany',
            'date_ranges' => [['start' => '2024-12-01', 'end' => '2025-07-01']],
            'bullets' => [
                'Adapted quickly to a new cultural and linguistic environment, supporting a fast-paced hospitality team entirely in German.',
                'Efficiently adjusted from a large-team environment to running shifts with one to two bartenders.',
            ],
            'sort_order' => 3,
        ]);
    }
}
