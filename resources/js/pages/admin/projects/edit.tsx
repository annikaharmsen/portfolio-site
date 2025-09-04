import ProjectForm from '@/components/projects/project-form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Project, Skills } from '@/types/models';
import { Head } from '@inertiajs/react';

interface EditProjectProps {
    project: Project;
    skills: Skills;
}

export default function EditProject({ project, skills }: EditProjectProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_project', project);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <ProjectForm project={project} skills={skills} />
        </AppLayout>
    );
}
