import ProjectForm from '@/components/projects/project-form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Skills } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProjectProps {
    skills: Skills;
}

export default function CreateProject({ skills }: CreateProjectProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('create_project');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Project" />
            <ProjectForm skills={skills} />
        </AppLayout>
    );
}
