<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class ResumeSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedUserContactInfo();
        $this->seedExperience();
        $this->seedEducation();
        $this->seedSkillGroups();
        $this->seedProjectResumeData();
        $this->seedProjectTags();
    }

    private function seedUserContactInfo(): void
    {
        $user = User::first();
        if ($user) {
            $user->update([
                'location' => 'Southborough 01772, USA',
                'phone' => '+1 (617) 916-6173',
                'summary' => 'Forward-deployed full-stack developer who embeds with stakeholders, turns ambiguous requirements into shipped, tailored software. Owns the full arc — discovery, architecture, implementation, and delivery — across backend and frontend. Recent work spans a multi-tenant manufacturing data platform built directly for process engineers, AI-integrated job-search automation, and constraint-based scheduling software. Builds for production from day one with rigorous validation, security, and reliability, and acquires fluency in unfamiliar technologies fast by pairing structured learning with direct implementation.',
            ]);
        }
    }

    private function seedExperience(): void
    {
        Experience::updateOrCreate(
            ['title' => 'Software Engineer', 'company' => 'Leucite'],
            [
                'location' => 'Remote',
                'date_ranges' => [['start' => '2026-06-01', 'end' => null]],
                'bullets' => [
                    'Embedded directly with the client to learn how their process engineers work, gather requirements, and translate domain needs into a concrete platform design.',
                    'Owned the full delivery cycle independently — discovery, architecture, implementation, and delivery — across backend, frontend, and ML infrastructure, communicating progress and trade-offs directly with the client.',
                    'Migrated the client off their legacy system, modeling their existing data and processes into the new platform so they could keep operating without disruption.',
                    'Designed the platform to adapt to each organization\'s own fields, processes, and quality specs rather than forcing a one-size-fits-all structure, and selected technologies to fit the problem instead of defaulting to a familiar stack.',
                ],
                'sort_order' => 1,
            ]
        );

        Experience::updateOrCreate(
            ['title' => 'Front-of-House Generalist', 'company' => 'Tavern in the Square'],
            [
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
            ]
        );

        Experience::updateOrCreate(
            ['title' => 'Barkeeper & Service', 'company' => 'Neo Bar & Restaurant'],
            [
                'location' => 'Heidelberg, Germany',
                'date_ranges' => [['start' => '2024-12-01', 'end' => '2025-07-01']],
                'bullets' => [
                    'Adapted quickly to a new cultural and linguistic environment, supporting a fast-paced hospitality team entirely in German.',
                    'Efficiently adjusted from a large-team environment to running shifts with one to two bartenders.',
                ],
                'sort_order' => 3,
            ]
        );
    }

    private function seedEducation(): void
    {
        Education::updateOrCreate(
            ['title' => 'Bachelor of Science in Information Technology'],
            [
                'institution' => 'Purdue University Global',
                'graduation_date' => '2025-07-01',
                'gpa' => '3.98',
                'bullets' => ["Dean's List", "Chancellor's List"],
                'sort_order' => 1,
            ]
        );
    }

    private function seedSkillGroups(): void
    {
        // rename tags that changed between site versions
        Tag::where('name', 'React 19')->update(['name' => 'React.js']);

        SkillGroup::whereNotIn('name', [
            'Languages', 'Frontend', 'Backend', 'AI & ML',
            'Data & Async', 'Validation & Testing', 'Integrations & Tools',
        ])->forceDelete();

        $groups = [
            [
                'name' => 'Languages',
                'sort_order' => 1,
                'tags' => [
                    ['name' => 'JavaScript/TypeScript', 'category' => 'skill', 'icon_name' => 'FileCode2'],
                    ['name' => 'Python', 'category' => 'skill', 'icon_name' => 'Code'],
                    ['name' => 'PHP', 'category' => 'skill', 'icon_name' => 'CodeXml'],
                    ['name' => 'Java', 'category' => 'skill', 'icon_name' => 'Coffee'],
                    ['name' => 'HTML/CSS', 'category' => 'skill', 'icon_name' => 'Globe'],
                ],
            ],
            [
                'name' => 'Frontend',
                'sort_order' => 2,
                'tags' => [
                    ['name' => 'React.js', 'category' => 'tech', 'icon_name' => 'Atom'],
                    ['name' => 'Redux Toolkit', 'category' => 'tech', 'icon_name' => 'Layers'],
                    ['name' => 'TanStack Query/Router', 'category' => 'tech', 'icon_name' => 'Route'],
                    ['name' => 'Tailwind CSS', 'category' => 'tech', 'icon_name' => 'Paintbrush'],
                    ['name' => 'shadcn/ui', 'category' => 'tech', 'icon_name' => 'Component'],
                    ['name' => 'Vite', 'category' => 'tech', 'icon_name' => 'Zap'],
                ],
            ],
            [
                'name' => 'Backend',
                'sort_order' => 3,
                'tags' => [
                    ['name' => 'FastAPI', 'category' => 'tech', 'icon_name' => 'Rocket'],
                    ['name' => 'Laravel', 'category' => 'tech', 'icon_name' => 'Box'],
                    ['name' => 'Node.js', 'category' => 'tech', 'icon_name' => 'Server'],
                    ['name' => 'Fastify', 'category' => 'tech', 'icon_name' => 'Gauge'],
                    ['name' => 'Inertia.js', 'category' => 'tech', 'icon_name' => 'ArrowRightLeft'],
                    ['name' => 'n8n', 'category' => 'tech', 'icon_name' => 'Workflow'],
                ],
            ],
            [
                'name' => 'AI & ML',
                'sort_order' => 4,
                'tags' => [
                    ['name' => 'Vercel AI SDK (Anthropic)', 'category' => 'tech', 'icon_name' => 'Brain'],
                    ['name' => 'ML prediction pipelines', 'category' => 'tech', 'icon_name' => 'TrendingUp'],
                ],
            ],
            [
                'name' => 'Data & Async',
                'sort_order' => 5,
                'tags' => [
                    ['name' => 'PostgreSQL', 'category' => 'tech', 'icon_name' => 'Database'],
                    ['name' => 'MySQL', 'category' => 'tech', 'icon_name' => 'Database'],
                    ['name' => 'SQLite', 'category' => 'tech', 'icon_name' => 'Database'],
                    ['name' => 'SQLAlchemy', 'category' => 'tech', 'icon_name' => 'Database'],
                    ['name' => 'Alembic', 'category' => 'tech', 'icon_name' => 'ArrowUpDown'],
                    ['name' => 'BullMQ', 'category' => 'tech', 'icon_name' => 'ListTodo'],
                    ['name' => 'Redis', 'category' => 'tech', 'icon_name' => 'HardDrive'],
                    ['name' => 'AWS S3', 'category' => 'tech', 'icon_name' => 'Cloud'],
                ],
            ],
            [
                'name' => 'Validation & Testing',
                'sort_order' => 6,
                'tags' => [
                    ['name' => 'Pydantic', 'category' => 'tech', 'icon_name' => 'Shield'],
                    ['name' => 'Zod', 'category' => 'tech', 'icon_name' => 'ShieldCheck'],
                    ['name' => 'OpenAPI', 'category' => 'tech', 'icon_name' => 'FileJson'],
                    ['name' => 'Pytest', 'category' => 'tech', 'icon_name' => 'FlaskConical'],
                    ['name' => 'PHPUnit', 'category' => 'tech', 'icon_name' => 'FlaskConical'],
                    ['name' => 'Vitest', 'category' => 'tech', 'icon_name' => 'FlaskConical'],
                    ['name' => 'Jest', 'category' => 'tech', 'icon_name' => 'FlaskConical'],
                ],
            ],
            [
                'name' => 'Integrations & Tools',
                'sort_order' => 7,
                'tags' => [
                    ['name' => 'Stripe', 'category' => 'tech', 'icon_name' => 'CreditCard'],
                    ['name' => 'ScrapingBee', 'category' => 'tech', 'icon_name' => 'Bug'],
                    ['name' => 'third-party REST APIs', 'category' => 'tech', 'icon_name' => 'Plug'],
                    ['name' => 'Composer', 'category' => 'tech', 'icon_name' => 'Package'],
                    ['name' => 'npm', 'category' => 'tech', 'icon_name' => 'Package'],
                    ['name' => 'Git', 'category' => 'tech', 'icon_name' => 'GitBranch'],
                    ['name' => 'Laravel Forge', 'category' => 'tech', 'icon_name' => 'Hammer'],
                ],
            ],
        ];

        foreach ($groups as $groupData) {
            $tags = $groupData['tags'];
            unset($groupData['tags']);

            $group = SkillGroup::updateOrCreate(['name' => $groupData['name']], $groupData);

            foreach ($tags as $tagData) {
                Tag::updateOrCreate(
                    ['name' => $tagData['name']],
                    array_merge($tagData, ['skill_group_id' => $group->id])
                );
            }
        }
    }

    private function seedProjectResumeData(): void
    {
        Project::query()->forceDelete();

        $projects = [
            [
                'title' => 'Leucite',
                'icon_name' => 'Factory',
                'subtitle' => 'Manufacturing Data & Prediction Platform',
                'category' => 'Professional Projects',
                'label' => null,
                'description' => 'A multi-tenant platform that turns manufacturers\' production data into quality predictions and process recommendations.',
                'repo_link' => null,
                'demo_link' => null,
                'featured' => true,
                'date' => '2026-06-01',
                'bullets' => [
                    'Gives manufacturers one place to pull in production data, track every run through its process stages, and predict quality outcomes before a part is finished — turning raw shop-floor data into decisions.',
                    'Recommends the input settings most likely to hit a target spec, so engineers can dial in a process instead of guessing, and flags in-progress runs that are trending out of spec before they become scrap.',
                    'Serves multiple client organizations from one secure product — each with isolated data, role-based access, and an import pipeline that ingests their existing spreadsheets and CSVs and catches bad data before it lands.',
                ],
            ],
            [
                'title' => 'Jobster',
                'icon_name' => 'BriefcaseBusiness',
                'subtitle' => 'Job Search Automation System',
                'category' => 'Professional Projects',
                'label' => null,
                'description' => 'A "set and forget" job search automation platform that discovers, researches, and drafts applications for matching jobs — delivered entirely through email.',
                'repo_link' => null,
                'demo_link' => 'https://jobster.annikaharmsen.com',
                'featured' => true,
                'date' => '2026-04-08',
                'bullets' => [
                    'Automatically finds jobs matching a user\'s criteria, researches each role, and drafts tailored applications, all delivered straight to their inbox.',
                    'Replaces the manual grind of job hunting: users set preferences once, then receive ready-to-send applications by email with one-click action links instead of managing a dashboard.',
                    'Runs entirely in the background with self-correcting workflows, AI output checked for accuracy before it\'s used, and encrypted handling of sensitive user credentials.',
                ],
            ],
            [
                'title' => 'Shifty',
                'icon_name' => 'Utensils',
                'subtitle' => 'Automated Hospitality Scheduling Software',
                'category' => 'Personal Projects',
                'label' => 'In Progress',
                'description' => null,
                'repo_link' => 'https://github.com/annikaharmsen/shifty',
                'demo_link' => null,
                'featured' => false,
                'date' => '2025-12-07',
                'bullets' => [
                    'Automatically builds employee schedules, assigning shifts around availability, role requirements, and weekly hour limits — eliminating the back-and-forth of building schedules by hand.',
                    'Includes a custom drag-and-drop calendar so managers can review and adjust generated schedules easily.',
                ],
            ],
            [
                'title' => 'Portfolio Website & CMS',
                'icon_name' => 'Blocks',
                'subtitle' => null,
                'category' => 'Personal Projects',
                'label' => null,
                'description' => null,
                'repo_link' => 'https://github.com/annikaharmsen/portfolio-site',
                'demo_link' => 'https://admin-demo.annikaharmsen.com',
                'featured' => false,
                'date' => '2025-09-27',
                'bullets' => [
                    'Lets me manage projects, tags, and hero content through a clean admin interface instead of touching code on every update.',
                    'Architected to stay reliable as it grows, keeping the backend and frontend automatically in sync.',
                ],
            ],
            [
                'title' => 'E-Commerce Systems',
                'icon_name' => 'Aperture',
                'subtitle' => null,
                'category' => 'Educational Projects',
                'label' => null,
                'description' => null,
                'repo_link' => 'https://github.com/annikaharmsen/photoview-api',
                'demo_link' => 'https://photoview.annikaharmsen.com',
                'featured' => false,
                'date' => '2025-05-06',
                'bullets' => [
                    'Built a vanilla PHP version from first principles without a framework, implementing routing, authentication, and cart logic by hand to prove out the fundamentals.',
                    'Designed secure, normalized data models for users, products, payments, and orders.',
                ],
            ],
        ];

        foreach ($projects as $data) {
            Project::withTrashed()->updateOrCreate(
                ['title' => $data['title']],
                $data
            );
        }
    }

    private function seedProjectTags(): void
    {
        // tags that exist on the live site but not in skill groups — keyed by group name
        $extraTagsByGroup = [
            'Backend' => [
                ['name' => 'Bull Queues', 'category' => 'tech', 'icon_name' => 'ListTodo'],
                ['name' => 'Prisma', 'category' => 'tech', 'icon_name' => 'Database'],
                ['name' => 'Vercel AI SDK', 'category' => 'tech', 'icon_name' => 'Brain'],
            ],
            'Frontend' => [
                ['name' => 'JavaScript', 'category' => 'tech', 'icon_name' => 'FileCode2'],
                ['name' => 'Lucide', 'category' => 'tech', 'icon_name' => 'Sparkles'],
                ['name' => 'Tailwind', 'category' => 'tech', 'icon_name' => 'Paintbrush'],
            ],
            'Integrations & Tools' => [
                ['name' => 'Claude Code', 'category' => 'tech', 'icon_name' => 'Terminal'],
                ['name' => 'AI Integration', 'category' => 'skill', 'icon_name' => 'Brain'],
                ['name' => 'Microservice Architecture', 'category' => 'skill', 'icon_name' => 'Network'],
                ['name' => 'Queues', 'category' => 'skill', 'icon_name' => 'ListTodo'],
                ['name' => 'Web Scraping', 'category' => 'skill', 'icon_name' => 'Bug'],
                ['name' => 'Database Design', 'category' => 'skill', 'icon_name' => 'Database'],
                ['name' => 'UI/UX Design', 'category' => 'skill', 'icon_name' => 'Palette'],
                ['name' => 'Test Driven Development', 'category' => 'skill', 'icon_name' => 'FlaskConical'],
                ['name' => 'RESTful API Development', 'category' => 'skill', 'icon_name' => 'Plug'],
            ],
        ];

        foreach ($extraTagsByGroup as $groupName => $tags) {
            $groupId = SkillGroup::where('name', $groupName)->value('id');
            foreach ($tags as $tagData) {
                Tag::firstOrCreate(
                    ['name' => $tagData['name']],
                    array_merge($tagData, ['skill_group_id' => $groupId])
                );
            }
        }

        $associations = [
            'Jobster' => [
                'React.js', 'Bull Queues', 'Fastify', 'Node.js', 'PostgreSQL',
                'Prisma', 'Redis', 'Vercel AI SDK', 'AI Integration',
                'Microservice Architecture', 'Queues', 'Web Scraping',
            ],
            'Shifty' => [
                'Laravel', 'MySQL', 'PHP', 'Inertia.js', 'Test Driven Development',
            ],
            'Portfolio Website & CMS' => [
                'JavaScript', 'Lucide', 'React.js', 'shadcn/ui', 'Tailwind',
                'Laravel', 'MySQL', 'PHP', 'Claude Code', 'Inertia.js',
                'Database Design', 'UI/UX Design',
            ],
            'E-Commerce Systems' => [
                'MySQL', 'PHP', 'Database Design', 'RESTful API Development',
            ],
        ];

        foreach ($associations as $projectTitle => $tagNames) {
            $project = Project::where('title', $projectTitle)->first();
            if (! $project) {
                continue;
            }

            $tagIds = Tag::whereIn('name', $tagNames)->pluck('id');
            $project->tags()->syncWithoutDetaching($tagIds);
        }
    }
}
