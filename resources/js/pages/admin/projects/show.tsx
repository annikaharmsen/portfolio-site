import ProjectDisplay from '@/components/projects/project-display';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Project } from '@/types/models';
import { Head } from '@inertiajs/react';

interface ShowProps {
    project: Project;
}

export default function ShowProject({ project }: ShowProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('show_project', project);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <ProjectDisplay project={project} />
        </AppLayout>
    );
}
