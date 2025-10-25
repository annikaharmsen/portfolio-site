import ModelList from '@/components/model-list';
import { ProjectTableColumns } from '@/components/projects/table-columns';
import { ProjectConfig } from '@/config/config';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Project, Projects } from '@/types/models';
import { Head } from '@inertiajs/react';

interface ProjectIndexProps {
    projects: Projects;
}

export default function ProjectIndex({ projects }: ProjectIndexProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('project_index');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <ModelList<Project> models={projects} columns={ProjectTableColumns} modelConfig={ProjectConfig} searchBy="title" />
        </AppLayout>
    );
}
