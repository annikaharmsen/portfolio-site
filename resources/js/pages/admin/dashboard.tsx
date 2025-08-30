import ProjectsIndex from '@/components/admin/projects/project-list';
import { Card, CardContent } from '@/components/ui/card';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface DashboardProps {
    projects: Projects;
}
export default function Dashboard({ projects }: DashboardProps) {
    const cards = [<ProjectsIndex asCard projects={projects} />];
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('dashboard');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-flow-col">
                    {cards &&
                        cards.map((card: ReactNode) => (
                            <Card>
                                <CardContent>{card}</CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </AppLayout>
    );
}
