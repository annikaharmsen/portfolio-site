<?php

namespace Database\Seeders;

use App\Models\Education;
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
                    ['name' => 'PHP', 'category' => 'skill', 'icon_name' => 'Code2'],
                    ['name' => 'Java', 'category' => 'skill', 'icon_name' => 'Coffee'],
                    ['name' => 'HTML/CSS', 'category' => 'skill', 'icon_name' => 'Globe'],
                ],
            ],
            [
                'name' => 'Frontend',
                'sort_order' => 2,
                'tags' => [
                    ['name' => 'React 19', 'category' => 'frontend', 'icon_name' => 'Atom'],
                    ['name' => 'Redux Toolkit', 'category' => 'frontend', 'icon_name' => 'Layers'],
                    ['name' => 'TanStack Query/Router', 'category' => 'frontend', 'icon_name' => 'Route'],
                    ['name' => 'Tailwind CSS', 'category' => 'frontend', 'icon_name' => 'Paintbrush'],
                    ['name' => 'shadcn/ui', 'category' => 'frontend', 'icon_name' => 'Component'],
                    ['name' => 'Vite', 'category' => 'frontend', 'icon_name' => 'Zap'],
                ],
            ],
            [
                'name' => 'Backend',
                'sort_order' => 3,
                'tags' => [
                    ['name' => 'FastAPI', 'category' => 'backend', 'icon_name' => 'Rocket'],
                    ['name' => 'Laravel', 'category' => 'backend', 'icon_name' => 'Box'],
                    ['name' => 'Node.js', 'category' => 'backend', 'icon_name' => 'Server'],
                    ['name' => 'Fastify', 'category' => 'backend', 'icon_name' => 'Gauge'],
                    ['name' => 'Inertia.js', 'category' => 'backend', 'icon_name' => 'ArrowRightLeft'],
                    ['name' => 'n8n', 'category' => 'backend', 'icon_name' => 'Workflow'],
                ],
            ],
            [
                'name' => 'AI & ML',
                'sort_order' => 4,
                'tags' => [
                    ['name' => 'Vercel AI SDK (Anthropic)', 'category' => 'tool', 'icon_name' => 'Brain'],
                    ['name' => 'ML prediction pipelines', 'category' => 'tool', 'icon_name' => 'TrendingUp'],
                    ['name' => 'SHAP explainability', 'category' => 'tool', 'icon_name' => 'BarChart3'],
                ],
            ],
            [
                'name' => 'Data & Async',
                'sort_order' => 5,
                'tags' => [
                    ['name' => 'PostgreSQL', 'category' => 'backend', 'icon_name' => 'Database'],
                    ['name' => 'MySQL', 'category' => 'backend', 'icon_name' => 'Database'],
                    ['name' => 'SQLite', 'category' => 'backend', 'icon_name' => 'Database'],
                    ['name' => 'SQLAlchemy', 'category' => 'backend', 'icon_name' => 'Database'],
                    ['name' => 'Alembic', 'category' => 'backend', 'icon_name' => 'ArrowUpDown'],
                    ['name' => 'BullMQ', 'category' => 'backend', 'icon_name' => 'ListTodo'],
                    ['name' => 'Redis', 'category' => 'backend', 'icon_name' => 'HardDrive'],
                    ['name' => 'AWS S3', 'category' => 'tool', 'icon_name' => 'Cloud'],
                ],
            ],
            [
                'name' => 'Validation & Testing',
                'sort_order' => 6,
                'tags' => [
                    ['name' => 'Pydantic', 'category' => 'tool', 'icon_name' => 'Shield'],
                    ['name' => 'Zod', 'category' => 'tool', 'icon_name' => 'ShieldCheck'],
                    ['name' => 'OpenAPI', 'category' => 'tool', 'icon_name' => 'FileJson'],
                    ['name' => 'Pytest', 'category' => 'tool', 'icon_name' => 'FlaskConical'],
                    ['name' => 'PHPUnit', 'category' => 'tool', 'icon_name' => 'FlaskConical'],
                    ['name' => 'Vitest', 'category' => 'tool', 'icon_name' => 'FlaskConical'],
                    ['name' => 'Jest', 'category' => 'tool', 'icon_name' => 'FlaskConical'],
                ],
            ],
            [
                'name' => 'Integrations & Tools',
                'sort_order' => 7,
                'tags' => [
                    ['name' => 'Stripe', 'category' => 'tool', 'icon_name' => 'CreditCard'],
                    ['name' => 'ScrapingBee', 'category' => 'tool', 'icon_name' => 'Bug'],
                    ['name' => 'third-party REST APIs', 'category' => 'tool', 'icon_name' => 'Plug'],
                    ['name' => 'Composer', 'category' => 'tool', 'icon_name' => 'Package'],
                    ['name' => 'npm', 'category' => 'tool', 'icon_name' => 'Package'],
                    ['name' => 'Git', 'category' => 'tool', 'icon_name' => 'GitBranch'],
                    ['name' => 'Laravel Forge', 'category' => 'tool', 'icon_name' => 'Hammer'],
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
        $projects = [
            [
                'title' => 'Leucite',
                'icon_name' => 'Factory',
                'subtitle' => 'Manufacturing Data & Prediction Platform',
                'category' => 'projects',
                'label' => null,
                'description' => 'A multi-tenant platform that turns manufacturers\' production data into quality predictions and process recommendations.',
                'bullets' => [
                    'Gives manufacturers one place to pull in production data, track every run through its process stages, and predict quality outcomes before a part is finished — turning raw shop-floor data into decisions.',
                    'Recommends the input settings most likely to hit a target spec, so engineers can dial in a process instead of guessing, and flags in-progress runs that are trending out of spec before they become scrap.',
                    'Serves multiple client organizations from one secure product — each with isolated data, role-based access, and an import pipeline that ingests their existing spreadsheets and CSVs and catches bad data before it lands.',
                ],
            ],
            [
                'title' => 'Jobster',
                'icon_name' => 'Search',
                'subtitle' => 'Job Search Automation Platform',
                'category' => 'projects',
                'label' => null,
                'description' => 'A "set and forget" system that discovers, researches, and drafts applications for matching jobs — delivered through email.',
                'bullets' => [
                    'Automatically finds jobs matching a user\'s criteria, researches each role, and drafts tailored applications, all delivered straight to their inbox.',
                    'Replaces the manual grind of job hunting: users set preferences once, then receive ready-to-send applications by email with one-click action links instead of managing a dashboard.',
                    'Runs entirely in the background with self-correcting workflows, AI output checked for accuracy before it\'s used, and encrypted handling of sensitive user credentials.',
                ],
            ],
            [
                'title' => 'Shifty',
                'icon_name' => 'Calendar',
                'subtitle' => 'Automated Hospitality Scheduling Software',
                'category' => 'personal',
                'label' => 'In Progress',
                'description' => 'Automatically builds employee schedules, assigning shifts around availability, role requirements, and weekly hour limits — eliminating the back-and-forth of building schedules by hand.',
                'bullets' => [
                    'Includes a custom drag-and-drop calendar so managers can review and adjust generated schedules easily.',
                ],
            ],
            [
                'title' => 'Portfolio Website & CMS',
                'icon_name' => 'PanelLeft',
                'subtitle' => null,
                'category' => 'personal',
                'label' => '2025',
                'description' => 'Lets me manage projects, tags, and hero content through a clean admin interface instead of touching code on every update.',
                'bullets' => [
                    'Architected to stay reliable as it grows, keeping the backend and frontend automatically in sync.',
                ],
            ],
            [
                'title' => 'E-Commerce Systems',
                'icon_name' => 'ShoppingCart',
                'subtitle' => null,
                'category' => 'personal',
                'label' => '2025',
                'description' => 'Built a vanilla PHP version from first principles without a framework, implementing routing, authentication, and cart logic by hand to prove out the fundamentals.',
                'bullets' => [
                    'Designed secure, normalized data models for users, products, payments, and orders across both projects.',
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
        $associations = [
            'E-Commerce Systems' => ['PHP', 'HTML/CSS'],
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
