import ProjectList from '@/components/projects/project-list';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects } from '@/types/models';
import { Head } from '@inertiajs/react';

interface ProjectIndexProps {
    projects: Projects;
}

export default function ProjectIndex({ projects }: ProjectIndexProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('project_index');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <ProjectList projects={projects} />
        </AppLayout>
    );
}
