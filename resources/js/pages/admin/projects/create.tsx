import ProjectForm from '@/components/projects/form';
import { Tags } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProjectProps {
    tags: Tags;
}

export default function CreateProject({ tags }: CreateProjectProps) {
    return (
        <>
            <Head title="New Project" />
            <ProjectForm tags={tags} />
        </>
    );
}
