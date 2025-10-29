import ModelList from '@/components/model-list';
import { ProjectTableColumns } from '@/components/projects/table-columns';
import { ProjectConfig } from '@/config/config';
import { Project, Projects } from '@/types/models';
import { Head } from '@inertiajs/react';

interface ProjectIndexProps {
    projects: Projects;
}

export default function ProjectIndex({ projects }: ProjectIndexProps) {
    return (
        <>
            <Head title="Projects" />
            <ModelList<Project> models={projects} columns={ProjectTableColumns} modelConfig={ProjectConfig} searchBy="title" />
        </>
    );
}
