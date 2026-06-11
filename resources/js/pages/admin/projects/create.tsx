import ProjectForm from '@/components/projects/form';
import { Tags } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProjectProps {
    tags: Tags;
    categories: string[];
}

export default function CreateProject({ tags, categories }: CreateProjectProps) {
    return (
        <>
            <Head title="New Project" />
            <ProjectForm tags={tags} categories={categories} />
        </>
    );
}
