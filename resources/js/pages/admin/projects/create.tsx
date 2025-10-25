import ProjectForm from '@/components/projects/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Tags } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProjectProps {
    tags: Tags;
}

export default function CreateProject({ tags }: CreateProjectProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('create_project');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Project" />
            <ProjectForm tags={tags} />
        </AppLayout>
    );
}
