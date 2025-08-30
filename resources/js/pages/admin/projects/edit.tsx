import ProjectForm from '@/components/admin/projects/project-form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Project } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProps {
    project: Project;
}

export default function EditProject({ project }: CreateProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_project', project);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <ProjectForm project={project} />
        </AppLayout>
    );
}
