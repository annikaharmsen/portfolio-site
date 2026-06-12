import ProjectForm from '@/components/projects/form';
import { Tags } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProjectProps {
    tags: Tags;
    categories: string[];
    tagCategories: string[];
}

export default function CreateProject({ tags, categories, tagCategories }: CreateProjectProps) {
    return (
        <>
            <Head title="New Project" />
            <ProjectForm tags={tags} categories={categories} tagCategories={tagCategories} />
        </>
    );
}
