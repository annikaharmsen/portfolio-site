import ProjectForm from '@/components/projects/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Skills, Technologies } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProjectProps {
    skills: Skills;
    technologies: Technologies;
}

export default function CreateProject({ skills, technologies }: CreateProjectProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('create_project');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Project" />
            <ProjectForm skills={skills} technologies={technologies} />
        </AppLayout>
    );
}
