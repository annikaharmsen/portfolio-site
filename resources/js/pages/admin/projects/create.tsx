import ProjectForm from '@/components/projects/form';
import { SkillGroups } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateProjectProps {
    skillGroups: SkillGroups;
    categories: string[];
}

export default function CreateProject({ skillGroups, categories }: CreateProjectProps) {
    return (
        <>
            <Head title="New Project" />
            <ProjectForm skillGroups={skillGroups} categories={categories} />
        </>
    );
}
