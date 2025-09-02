import ProjectForm from '@/components/projects/project-form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function CreateProject() {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('create_project');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Project" />
            <ProjectForm />
        </AppLayout>
    );
}
