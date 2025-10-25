import { EditButton } from '@/components/app-buttons';
import { H1 } from '@/components/headings';
import ProjectForm from '@/components/projects/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Project, Tags } from '@/types/models';
import { Head, router } from '@inertiajs/react';

interface EditProjectProps {
    project: Project;
    tags: Tags;
}

export default function EditProject({ project, tags }: EditProjectProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_project', project);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <div className="m-12 *:mb-12 md:min-w-160">
                <div className="flex items-center justify-between *:my-0">
                    <H1>Edit Project</H1>
                </div>
                <ProjectForm project={project} tags={tags} />
                <EditButton onClick={() => router.get(`/projects/${project.id}/hero-sections`)}>Edit Project Page</EditButton>
            </div>
        </AppLayout>
    );
}
