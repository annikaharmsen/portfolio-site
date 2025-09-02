import ProjectList from '@/components/projects/project-list';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects } from '@/types/models';
import { Head } from '@inertiajs/react';

interface ProjectsIndexProps {
    projects: Projects;
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('projects_index');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <ProjectList projects={projects} />
        </AppLayout>
    );
}
