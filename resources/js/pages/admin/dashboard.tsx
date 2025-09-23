import ModelList from '@/components/model-list';
import { ProjectTableColumns } from '@/components/projects/table-columns';
import { TagTableColumns } from '@/components/tags/table-columns';
import { Card, CardContent } from '@/components/ui/card';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects, Skills, Technologies } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface DashboardProps {
    projects: Projects;
    skills: Skills;
    technologies: Technologies;
}
export default function Dashboard({ projects, skills, technologies }: DashboardProps) {
    const cards = [
        <ModelList models={projects} columns={ProjectTableColumns} resource="projects" searchBy="title" />,
        <ModelList models={skills} columns={TagTableColumns} resource="skills" searchBy="name" />,
        <ModelList models={technologies} columns={TagTableColumns} resource="technologies" searchBy="name" />,
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
