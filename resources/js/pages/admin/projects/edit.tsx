import { H1 } from '@/components/headings';
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
            <div className="m-12 *:mb-12 md:min-w-160">
                <div className="flex items-center justify-between *:my-0">
                    <H1>Edit Project</H1>
                </div>
                <ProjectForm project={project} skills={skills} technologies={technologies} />
            </div>
        </AppLayout>
    );
}
