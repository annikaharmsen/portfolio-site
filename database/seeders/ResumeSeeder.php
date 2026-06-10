<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\SiteText;
use Illuminate\Database\Seeder;

class ResumeSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedResumeTexts();
        $this->seedEducation();
        $this->seedSkillGroups();
        $this->seedExperienceResumeBullets();
        $this->seedProjectResumeData();
    }

    private function seedResumeTexts(): void
    {
        $texts = [
            'resume.name' => 'Annika Harmsen',
            'resume.location' => 'Southborough 01772, USA',
            'resume.phone' => '+1 (617) 916-6173',
            'resume.website' => 'https://annikaharmsen.com',
            'resume.summary' => 'Full-stack developer with strong architectural instincts and a bias toward systems built for production reliability — clean state management, robust validation, and edge cases handled from the start. Recent work spans AI-integrated job search automation, constraint-based scheduling software, and a full-stack CMS. Acquires deep fluency with unfamiliar technologies fast by pairing structured learning with direct implementation.',
        ];

        foreach ($texts as $path => $text) {
            SiteText::updateOrCreate(['path' => $path], ['text' => $text]);
        }
    }

    private function seedEducation(): void
    {
        Education::updateOrCreate(
            ['degree' => 'Bachelor of Science in Information Technology'],
            [
                'institution' => 'Purdue University Global',
                'graduation_date' => '2025-07-01',
                'gpa' => '3.98',
                'honors' => ["Dean's List", "Chancellor's List"],
                'sort_order' => 1,
            ]
        );
    }

    private function seedSkillGroups(): void
    {
        $groups = [
            ['name' => 'Languages & Runtimes', 'skills' => 'JavaScript/TypeScript, PHP, Java, HTML/CSS', 'sort_order' => 1],
            ['name' => 'Frontend', 'skills' => 'React 19, Redux Toolkit, Tailwind CSS, shadcn/ui, Vite', 'sort_order' => 2],
            ['name' => 'Backend', 'skills' => 'Laravel, Node.js, Fastify, Inertia.js, n8n', 'sort_order' => 3],
            ['name' => 'Queues & Async', 'skills' => 'BullMQ, Redis', 'sort_order' => 4],
            ['name' => 'Databases', 'skills' => 'MySQL, PostgreSQL, SQLite', 'sort_order' => 5],
            ['name' => 'AI Integration', 'skills' => 'Vercel AI SDK (Anthropic)', 'sort_order' => 6],
            ['name' => 'Validation & Schema', 'skills' => 'Zod, OpenAPI', 'sort_order' => 7],
            ['name' => 'Testing', 'skills' => 'PHPUnit, Vitest, Jest', 'sort_order' => 8],
            ['name' => 'APIs & Integrations', 'skills' => 'Stripe, ScrapingBee, and numerous third-party REST APIs (job boards, data aggregators)', 'sort_order' => 9],
            ['name' => 'Dev Tools', 'skills' => 'Composer, npm, Git, Laravel Forge', 'sort_order' => 10],
        ];

        foreach ($groups as $group) {
            SkillGroup::updateOrCreate(['name' => $group['name']], $group);
        }
    }

    private function seedExperienceResumeBullets(): void
    {
        Experience::where('company', 'Tavern in the Square')->update([
            'title' => 'Front-of-House Generalist',
            'resume_bullets' => json_encode([
                'Rotated across and rapidly mastered multiple roles, including busser, hostess, server, barback, utility personnel, and bartender, consistently adapting to high-volume service demands',
                'Earned increased responsibilities and cross-trained peers based on demonstrated reliability, professionalism, and rapid skills acquisition',
                'Delivered exceptional guest experiences with attention to detail and a personable, team-centered approach that drew consistent praise from management and patrons alike',
            ]),
        ]);

        Experience::where('company', 'Neo Bar & Restaurant')->update([
            'resume_bullets' => json_encode([
                'Adapted quickly to a new cultural and linguistic environment, supporting a fast-paced hospitality team in German',
                'Provided behind-the-scenes service assistance and full bartending coverage — adapting from large team environments to managing shifts with one to two staff members',
            ]),
        ]);
    }

    private function seedProjectResumeData(): void
    {
        $projects = [
            [
                'title' => 'Jobster - Job Search Automation Platform',
                'resume_description' => 'A "set and forget" system that discovers, researches, and drafts applications for matching jobs — delivered through email.',
                'resume_tech_stack' => null,
                'resume_bullets' => [
                    'Designed and built three end-to-end background workflows (discovery, research, drafting) using Bull + Redis queues, with idempotent state machines, schema-validated AI output, and AES-256 encrypted user credentials',
                    'Implemented an email-first interaction model where transactional emails with action links drive all post-setup user interaction, replacing a traditional dashboard with webhook-triggered queue jobs',
                    'Identified the right tools for solution requirements (Bull for job orchestration, ScrapingBee for ethical scraping, Zod for AI output validation) and used AI-assisted structured learning to acquire deep fluency with unfamiliar technologies on the fly, rather than constraining the architecture to a familiar stack',
                ],
                'show_on_resume' => true,
            ],
            [
                'title' => 'Shifty - Automatic Hospitality Employee Scheduling Software',
                'resume_description' => 'An intelligent constraint-based scheduling algorithm that automates shift assignment based on factors including employee availability, role requirements, and weekly hours',
                'resume_tech_stack' => 'MySQL, Laravel, React.js',
                'resume_bullets' => [
                    'Built on a flexible database schema supporting recurring availability rules, multi-location management, and template-based schedule generation for hospitality operations',
                    'Used domain models with value object patterns (Timeblock, RecurringTimeblock) to handle complex temporal logic including overlap detection and duration calculations',
                    'Included a custom drag-and-drop calendar interface for easy schedule management',
                ],
                'show_on_resume' => true,
            ],
            [
                'title' => 'Portfolio Website & CMS',
                'resume_description' => 'A full-stack portfolio site with a custom content management system for managing projects, tags, and hero content — with a public-facing demo environment.',
                'resume_tech_stack' => 'MySQL, PHP Laravel, Inertia.js, React.js, TypeScript, Redux Toolkit, shadcn/ui',
                'resume_bullets' => [
                    'Implemented a unified tag system using a single model with a category enum (frontend, backend, tool, skill), with separate admin UIs per category — reducing duplication while preserving UX flexibility',
                    'Used Model Typer to auto-generate TypeScript types from Laravel models, eliminating a class of type-drift bugs between backend and frontend',
                    'Built a breadcrumb navigation system with a clean declarative API (getBreadcrumbs(\'create_project\')) and automatic parent-child resolution',
                ],
                'show_on_resume' => true,
            ],
            [
                'title' => 'E-Commerce Systems',
                'resume_description' => 'Two independent e-commerce APIs — one in vanilla PHP, one in Laravel — both built from the ground up with authentication, cart/order logic, and Stripe payment integration.',
                'resume_tech_stack' => 'MySQL, PHP | PostgreSQL/MySQL, PHP Laravel, PHPUnit',
                'resume_bullets' => [
                    'Built the vanilla PHP system without framework scaffolding, implementing routing, authentication, and cart state management from first principles',
                    'Designed normalized database schemas across both projects supporting secure storage of users, products, payments, and order data',
                ],
                'show_on_resume' => true,
            ],
        ];

        foreach ($projects as $data) {
            $project = Project::withTrashed()->where('title', $data['title'])->first();

            if ($project) {
                $project->update($data);
            }
        }
    }
}
