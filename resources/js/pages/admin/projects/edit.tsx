import ProjectForm from '@/components/projects/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Project, Skills, Technologies } from '@/types/models';
import { Head } from '@inertiajs/react';

interface EditProjectProps {
    project: Project;
    skills: Skills;
    technologies: Technologies;
}

export default function EditProject({ project, skills, technologies }: EditProjectProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_project', project);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <ProjectForm project={project} skills={skills} technologies={technologies} />
        </AppLayout>
    );
}
