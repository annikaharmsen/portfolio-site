import ModelList from '@/components/model-list';
import { ProjectTableColumns } from '@/components/projects/project-table-columns';
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
            <ModelList models={projects} columns={ProjectTableColumns} resource="projects" searchBy="title" />
        </AppLayout>
    );
}
