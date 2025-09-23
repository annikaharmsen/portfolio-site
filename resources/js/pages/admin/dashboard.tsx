import ModelList from '@/components/model-list';
import { ProjectTableColumns } from '@/components/projects/project-table-columns';
import { SkillTableColumns } from '@/components/skills/skill-table-columns';
import { Card, CardContent } from '@/components/ui/card';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects, Skills } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface DashboardProps {
    projects: Projects;
    skills: Skills;
}
export default function Dashboard({ projects, skills }: DashboardProps) {
    const cards = [
        <ModelList models={projects} columns={ProjectTableColumns} resource="projects" searchBy="title" />,
        <ModelList models={skills} columns={SkillTableColumns} resource="skills" searchBy="name" />,
    ];
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('dashboard');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid h-full w-full gap-4 rounded-xl p-4 min-[1500px]:grid-cols-2">
                {cards &&
                    cards.map((card: ReactNode) => (
                        <Card className="min-w-fit">
                            <CardContent>{card}</CardContent>
                        </Card>
                    ))}
            </div>
        </AppLayout>
    );
}
